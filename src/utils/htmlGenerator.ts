import { ContentBlock, Theme, StyleSettings } from '../types';
import hljs from 'highlight.js';
import juice from 'juice';

export class HTMLGenerator {
  constructor(private theme: Theme, private styleSettings: StyleSettings) {}

  generate(blocks: ContentBlock[]): string {
    let html = '';

    for (const block of blocks) {
      html += this.renderBlock(block);
    }

    const styledHtml = this.applyStyles(html);
    const inlinedHtml = this.inlineCSS(styledHtml);

    return this.optimizeForWeChat(inlinedHtml);
  }

  private renderBlock(block: ContentBlock): string {
    switch (block.type) {
      case 'heading':
        return this.renderHeading(block);
      case 'paragraph':
        return this.renderParagraph(block);
      case 'list':
        return this.renderList(block);
      case 'code':
        return this.renderCode(block);
      case 'quote':
        return this.renderQuote(block);
      case 'table':
        return this.renderTable(block);
      case 'image':
        return this.renderImage(block);
      case 'step':
        return this.renderStep(block);
      case 'comparison':
        return this.renderComparison(block);
      default:
        return '';
    }
  }

  private renderHeading(block: ContentBlock): string {
    const level = block.level || 1;
    const color = this.getHeadingColor(level);
    const fontSize = this.getHeadingFontSize(level);
    const marginTop = this.getSpacing();
    
    return `<h${level} style="color: ${color}; font-size: ${fontSize}px; font-weight: bold; margin-top: ${marginTop}px; margin-bottom: ${marginTop / 2}px; line-height: 1.4;">${this.escapeHtml(block.content)}</h${level}>`;
  }

  private renderParagraph(block: ContentBlock): string {
    const fontSize = this.getFontSize();
    const lineHeight = this.getLineHeight();
    const marginBottom = this.getSpacing();
    
    return `<p style="font-size: ${fontSize}px; line-height: ${lineHeight}; margin-bottom: ${marginBottom}px; color: #333333;">${this.parseInline(block.content)}</p>`;
  }

  private renderList(block: ContentBlock): string {
    const fontSize = this.getFontSize();
    const lineHeight = this.getLineHeight();
    const marginBottom = this.getSpacing();
    const bulletColor = this.theme.styles.list.bulletColor;
    
    let html = `<ul style="margin-bottom: ${marginBottom}px; padding-left: 20px;">`;
    
    for (const item of block.items || []) {
      const marker = item.ordered ? '1.' : '•';
      html += `<li style="font-size: ${fontSize}px; line-height: ${lineHeight}; margin-bottom: 8px; color: ${bulletColor};">${this.parseInline(item.text)}</li>`;
    }
    
    html += '</ul>';
    return html;
  }

  private renderCode(block: ContentBlock): string {
    const codeStyles = this.theme.styles.codeBlock;
    const fontSize = this.getFontSize() - 2;
    
    let highlightedCode = block.content;
    try {
      const result = hljs.highlight(block.content, { language: block.language || 'text' });
      highlightedCode = result.value;
    } catch (e) {
      highlightedCode = this.escapeHtml(block.content);
    }

    const lines = highlightedCode.split('\n');
    const lineNumbers = lines.map((_, i) => `<span style="color: #999; user-select: none;">${i + 1}</span>`).join('\n');
    
    return `
      <div style="background-color: ${codeStyles.backgroundColor}; border: 1px solid ${codeStyles.borderColor}; border-radius: 8px; margin: ${this.getSpacing()}px 0; overflow: hidden;">
        <div style="background-color: ${codeStyles.borderColor}; padding: 8px 16px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: ${fontSize}px; color: #666;">${block.language || 'code'}</span>
          <button onclick="this.parentElement.parentElement.querySelector('.code-content').select(); document.execCommand('copy'); alert('代码已复制');" style="background: none; border: none; color: #666; cursor: pointer; font-size: ${fontSize}px;">复制</button>
        </div>
        <pre style="margin: 0; padding: 16px; overflow-x: auto; font-size: ${fontSize}px; line-height: 1.6; color: ${codeStyles.textColor};"><code class="code-content" style="font-family: Consolas, Monaco, monospace;">${highlightedCode}</code></pre>
      </div>
    `;
  }

  private renderQuote(block: ContentBlock): string {
    const quoteStyles = this.theme.styles.quote;
    const fontSize = this.getFontSize();
    const lineHeight = this.getLineHeight();
    const marginBottom = this.getSpacing();
    
    return `
      <blockquote style="background-color: ${quoteStyles.backgroundColor}; border-left: 4px solid ${quoteStyles.borderColor}; padding: 16px; margin: ${marginBottom}px 0; color: ${quoteStyles.textColor};">
        <p style="font-size: ${fontSize}px; line-height: ${lineHeight}; margin: 0;">${this.parseInline(block.content)}</p>
      </blockquote>
    `;
  }

  private renderTable(block: ContentBlock): string {
    const tableStyles = this.theme.styles.table;
    const fontSize = this.getFontSize();
    const marginBottom = this.getSpacing();
    
    let html = `<table style="width: 100%; border-collapse: collapse; margin: ${marginBottom}px 0; border: 1px solid ${tableStyles.borderColor};">`;
    
    if (block.content.headers) {
      html += '<thead><tr>';
      for (const header of block.content.headers) {
        html += `<th style="background-color: ${tableStyles.headerBackgroundColor}; color: ${tableStyles.headerTextColor}; padding: 12px; text-align: left; border: 1px solid ${tableStyles.borderColor}; font-size: ${fontSize}px; font-weight: bold;">${this.escapeHtml(header)}</th>`;
      }
      html += '</tr></thead>';
    }
    
    if (block.content.rows) {
      html += '<tbody>';
      for (const row of block.content.rows) {
        html += '<tr>';
        for (const cell of row) {
          html += `<td style="padding: 12px; border: 1px solid ${tableStyles.borderColor}; font-size: ${fontSize}px;">${this.parseInline(cell)}</td>`;
        }
        html += '</tr>';
      }
      html += '</tbody>';
    }
    
    html += '</table>';
    return html;
  }

  private renderImage(block: ContentBlock): string {
    const marginBottom = this.getSpacing();
    return `
      <div style="text-align: center; margin: ${marginBottom}px 0;">
        <img src="${block.content.src}" alt="${block.content.alt}" style="max-width: 100%; height: auto; border-radius: 8px;" />
        ${block.content.alt ? `<p style="font-size: ${this.getFontSize() - 2}px; color: #999; margin-top: 8px;">${this.escapeHtml(block.content.alt)}</p>` : ''}
      </div>
    `;
  }

  private renderStep(block: ContentBlock): string {
    const fontSize = this.getFontSize();
    const lineHeight = this.getLineHeight();
    const marginBottom = this.getSpacing();
    const accentColor = this.styleSettings.accentColor;
    
    return `
      <div style="background-color: #f9f9f9; border-left: 4px solid ${accentColor}; padding: 16px; margin: ${marginBottom}px 0; border-radius: 4px;">
        <div style="font-size: ${fontSize + 2}px; font-weight: bold; color: ${accentColor}; margin-bottom: 8px;">${this.escapeHtml(block.content.title)}</div>
        <div style="font-size: ${fontSize}px; line-height: ${lineHeight}; color: #333;">${this.parseInline(block.content.description)}</div>
      </div>
    `;
  }

  private renderComparison(block: ContentBlock): string {
    const fontSize = this.getFontSize();
    const lineHeight = this.getLineHeight();
    const marginBottom = this.getSpacing();
    const accentColor = this.styleSettings.accentColor;
    
    return `
      <div style="background: linear-gradient(135deg, ${accentColor}15 0%, ${accentColor}05 100%); border: 1px solid ${accentColor}30; padding: 16px; margin: ${marginBottom}px 0; border-radius: 8px;">
        <div style="font-size: ${fontSize + 2}px; font-weight: bold; color: ${accentColor}; margin-bottom: 12px;">对比分析</div>
        <div style="font-size: ${fontSize}px; line-height: ${lineHeight}; color: #333;">${this.parseInline(block.content)}</div>
      </div>
    `;
  }

  private applyStyles(html: string): string {
    return `
      <section style="max-width: 677px; margin: 0 auto; padding: 20px; font-family: ${this.theme.styles.bodyFont};">
        ${html}
      </section>
    `;
  }

  private inlineCSS(html: string): string {
    const css = this.generateCSS();
    return juice(`<style>${css}</style>${html}`, {
      removeStyleTags: false,
      preserveImportant: true
    });
  }

  private generateCSS(): string {
    return `
      section {
        word-wrap: break-word;
        overflow-wrap: break-word;
      }
      img {
        max-width: 100% !important;
        height: auto !important;
      }
      pre {
        white-space: pre-wrap;
        word-wrap: break-word;
      }
      code {
        font-family: Consolas, Monaco, 'Courier New', monospace;
      }
      table {
        word-wrap: break-word;
      }
    `;
  }

  private optimizeForWeChat(html: string): string {
    return html
      .replace(/<section[^>]*>/gi, '<section>')
      .replace(/<!DOCTYPE[^>]*>/gi, '')
      .replace(/<html[^>]*>/gi, '')
      .replace(/<\/html>/gi, '')
      .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '')
      .replace(/<body[^>]*>/gi, '')
      .replace(/<\/body>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .trim();
  }

  private parseInline(text: string): string {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code style="background-color: #f0f0f0; padding: 2px 4px; border-radius: 3px; font-size: 0.9em;">$1</code>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color: #576b95; text-decoration: none;">$1</a>');
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  private getHeadingColor(level: number): string {
    switch (level) {
      case 1: return this.theme.styles.headingColors.h1;
      case 2: return this.theme.styles.headingColors.h2;
      case 3: return this.theme.styles.headingColors.h3;
      default: return this.theme.styles.headingColors.h3;
    }
  }

  private getHeadingFontSize(level: number): number {
    const baseSize = this.getFontSize();
    switch (level) {
      case 1: return baseSize + 8;
      case 2: return baseSize + 4;
      case 3: return baseSize + 2;
      default: return baseSize;
    }
  }

  private getFontSize(): number {
    switch (this.styleSettings.fontSize) {
      case 'small': return 14;
      case 'medium': return 16;
      case 'large': return 18;
      default: return 16;
    }
  }

  private getLineHeight(): number {
    return 1.8;
  }

  private getSpacing(): number {
    switch (this.styleSettings.paragraphSpacing) {
      case 'compact': return 12;
      case 'standard': return 20;
      case 'loose': return 28;
      default: return 20;
    }
  }
}