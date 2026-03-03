import { marked } from 'marked';
import { ContentBlock } from '../types';

export class MarkdownParser {
  constructor() {
    this.setupMarkedOptions();
  }

  private setupMarkedOptions() {
    marked.setOptions({
      gfm: true,
      breaks: true,
      headerIds: false,
      mangle: false
    });
  }

  parse(markdown: string): ContentBlock[] {
    const blocks: ContentBlock[] = [];
    const lines = markdown.split('\n');
    let currentBlock: Partial<ContentBlock> | null = null;
    let codeBlockLines: string[] = [];
    let inCodeBlock = false;
    let codeLanguage = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith('```')) {
        if (inCodeBlock) {
          blocks.push({
            type: 'code',
            content: codeBlockLines.join('\n'),
            language: codeLanguage || 'text'
          });
          codeBlockLines = [];
          inCodeBlock = false;
          codeLanguage = '';
        } else {
          inCodeBlock = true;
          codeLanguage = line.substring(3).trim();
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockLines.push(line);
        continue;
      }

      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        if (currentBlock) {
          blocks.push(this.finalizeBlock(currentBlock));
        }
        blocks.push({
          type: 'heading',
          content: headingMatch[2],
          level: headingMatch[1].length
        });
        continue;
      }

      const imageMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imageMatch) {
        if (currentBlock) {
          blocks.push(this.finalizeBlock(currentBlock));
        }
        blocks.push({
          type: 'image',
          content: {
            alt: imageMatch[1],
            src: imageMatch[2]
          }
        });
        continue;
      }

      const stepMatch = line.match(/^\d+\.\s+\*\*(.+?)\*\*\s*:\s*(.*)$/);
      if (stepMatch) {
        if (currentBlock) {
          blocks.push(this.finalizeBlock(currentBlock));
        }
        blocks.push({
          type: 'step',
          content: {
            title: stepMatch[1],
            description: stepMatch[2]
          }
        });
        continue;
      }

      const comparisonMatch = line.match(/^\*\*对比分析\*\*:\s*(.+)$/);
      if (comparisonMatch) {
        if (currentBlock) {
          blocks.push(this.finalizeBlock(currentBlock));
        }
        blocks.push({
          type: 'comparison',
          content: comparisonMatch[1]
        });
        continue;
      }

      const quoteMatch = line.match(/^>\s*(.*)$/);
      if (quoteMatch) {
        if (currentBlock && currentBlock.type !== 'quote') {
          blocks.push(this.finalizeBlock(currentBlock));
        }
        if (!currentBlock || currentBlock.type !== 'quote') {
          currentBlock = {
            type: 'quote',
            content: []
          };
        }
        (currentBlock.content as string[]).push(quoteMatch[1]);
        continue;
      }

      const listMatch = line.match(/^(\s*[-*+]|\s*\d+\.)\s+(.*)$/);
      if (listMatch) {
        if (currentBlock && currentBlock.type !== 'list') {
          blocks.push(this.finalizeBlock(currentBlock));
        }
        if (!currentBlock || currentBlock.type !== 'list') {
          currentBlock = {
            type: 'list',
            items: []
          };
        }
        const isOrdered = /^\s*\d+\./.test(listMatch[1]);
        (currentBlock.items as any[]).push({
          text: listMatch[2],
          ordered: isOrdered
        });
        continue;
      }

      const tableMatch = line.match(/^\|(.+)\|$/);
      if (tableMatch) {
        if (currentBlock && currentBlock.type !== 'table') {
          blocks.push(this.finalizeBlock(currentBlock));
        }
        if (!currentBlock || currentBlock.type !== 'table') {
          currentBlock = {
            type: 'table',
            content: {
              headers: [],
              rows: []
            }
          };
        }
        const cells = tableMatch[1].split('|').map(cell => cell.trim());
        if (cells.every(cell => /^-+$/.test(cell))) {
          continue;
        }
        if ((currentBlock.content as any).headers.length === 0) {
          (currentBlock.content as any).headers = cells;
        } else {
          (currentBlock.content as any).rows.push(cells);
        }
        continue;
      }

      if (line.trim() === '') {
        if (currentBlock) {
          blocks.push(this.finalizeBlock(currentBlock));
          currentBlock = null;
        }
        continue;
      }

      if (!currentBlock) {
        currentBlock = {
          type: 'paragraph',
          content: []
        };
      }

      if (currentBlock.type === 'paragraph') {
        (currentBlock.content as string[]).push(line);
      }
    }

    if (currentBlock) {
      blocks.push(this.finalizeBlock(currentBlock));
    }

    return blocks;
  }

  private finalizeBlock(block: Partial<ContentBlock>): ContentBlock {
    if (block.type === 'paragraph' && Array.isArray(block.content)) {
      return {
        type: 'paragraph',
        content: block.content.join('\n')
      };
    }
    if (block.type === 'quote' && Array.isArray(block.content)) {
      return {
        type: 'quote',
        content: block.content.join('\n')
      };
    }
    return block as ContentBlock;
  }

  parseInlineMarkdown(text: string): string {
    return marked.parseInline(text) as string;
  }
}