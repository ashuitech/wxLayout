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
    
    let align = this.styleSettings.headingAlign || 'left';
    if (level === 1 && this.styleSettings.h1Align) align = this.styleSettings.h1Align;
    if (level === 2 && this.styleSettings.h2Align) align = this.styleSettings.h2Align;

    const decoration = this.styleSettings.headingDecoration || 'none';
    const spacing = this.getSpacing();
    const marginTop = spacing.headingTop;
    const marginBottom = spacing.headingBottom;
    
    let style = `color: ${color}; font-size: ${fontSize}px; font-weight: bold; margin-top: ${marginTop}; margin-bottom: ${marginBottom}; line-height: 1.4; text-align: ${align};`;
    
    let content = this.escapeHtml(block.content);
    
    // 装饰样式
    if (decoration === 'underline') {
      style += ` border-bottom: 2px solid ${color}; padding-bottom: 8px;`;
    } else if (decoration === 'left-border') {
      style += ` border-left: 4px solid ${color}; padding-left: 12px;`;
    } else if (decoration === 'center-marker' && align === 'center') {
      content = `<span style="display: inline-block; border-bottom: 2px solid ${color}; padding-bottom: 8px;">${content}</span>`;
    } else if (decoration === 'cyber-glitch') {
      style += ` text-shadow: 2px 0 0 #ff003c, -2px 0 0 #00f0ff; letter-spacing: 1px; border-left: 4px solid ${color}; padding-left: 12px;`;
    } else if (decoration === 'neon-shadow') {
      style += ` text-shadow: 0 0 5px ${color}80, 0 0 10px ${color}40; border-left: 4px solid ${color}; padding-left: 12px;`;
    } else if (decoration === 'minimal-dot') {
      content = `<span style="display: inline-block; width: 6px; height: 6px; background-color: ${color}; border-radius: 50%; margin-right: 8px; vertical-align: middle; margin-top: -2px;"></span>${content}`;
    } else if (decoration === 'wabi-sabi-underline') {
      style += ` border-bottom: 1px solid ${color}40; padding-bottom: 8px; font-weight: normal; letter-spacing: 1px;`;
    } else if (decoration === 'ink-brush') {
      content = `<span style="background: linear-gradient(180deg, transparent 60%, ${color}40 0); display: inline-block; padding: 0 4px;">${content}</span>`;
    } else if (decoration === 'song-dynasty') {
      style += ` border-top: 1px solid ${color}80; border-bottom: 1px solid ${color}80; padding: 10px 0; text-align: center; letter-spacing: 4px; font-weight: normal;`;
      align = 'center';
    } else if (decoration === 'bauhaus-block') {
      style = `color: #ffffff; font-size: ${fontSize}px; font-weight: bold; margin-top: ${marginTop}; margin-bottom: ${marginBottom}; line-height: 1.4; text-align: ${align}; background-color: ${color}; display: inline-block; padding: 6px 16px; box-shadow: 4px 4px 0px #000000; border: 2px solid #000000;`;
    } else if (decoration === 'glass-gradient') {
      style += ` border-bottom: 2px solid ${color}30; padding-bottom: 8px;`;
      content = `<span style="background: linear-gradient(135deg, ${color}, ${this.adjustColorBrightness(color, 40)}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: inline-block;">${content}</span>`;
    } else if (decoration === 'business-gold') {
      style += ` border-left: 4px solid ${color}; padding-left: 12px; position: relative;`;
      content = `${content}<span style="display: block; width: 30px; height: 2px; background-color: #c9a84c; margin-top: 8px;"></span>`;
    } else if (decoration === 'coral-gradient') {
      content = `<span style="background: linear-gradient(90deg, ${color}, #f0956a); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: inline-block; padding-bottom: 4px; border-bottom: 2px solid ${color}40;">${content}</span>`;
    }

    // 更多装饰
    if (this.styleSettings.headingBgColor) {
      style += ` background-color: ${this.styleSettings.headingBgColor}; padding: 8px 12px; border-radius: 4px;`;
    }
    if (this.styleSettings.headingBorderBottomStyle && this.styleSettings.headingBorderBottomStyle !== 'none') {
      const borderColor = this.styleSettings.headingBorderBottomColor || color;
      style += ` border-bottom: 2px ${this.styleSettings.headingBorderBottomStyle} ${borderColor}; padding-bottom: 8px;`;
    }
    if (this.styleSettings.headingPrefix) {
      content = `<span style="margin-right: 8px;">${this.escapeHtml(this.styleSettings.headingPrefix)}</span>${content}`;
    }

    return `<h${level} style="${style}">${content}</h${level}>`;
  }

  private renderParagraph(block: ContentBlock): string {
    const fontSize = this.getFontSize();
    const spacing = this.getSpacing();
    const lineHeight = spacing.lineHeight;
    const marginBottom = spacing.paragraphAfter;
    const marginTop = spacing.paragraphBefore;
    const align = this.styleSettings.paragraphAlign || 'left';
    const indent = this.styleSettings.firstLineIndent ? (this.styleSettings.indentWidth || '2em') : '0';
    const color = this.styleSettings.themeBodyColor || '#333333';
    
    return `<p style="font-size: ${fontSize}px; line-height: ${lineHeight}; margin-top: ${marginTop}; margin-bottom: ${marginBottom}; text-indent: ${indent}; color: ${color}; text-align: ${align};">${this.parseInline(block.content)}</p>`;
  }

  private renderList(block: ContentBlock): string {
    const fontSize = this.getFontSize();
    const spacing = this.getSpacing();
    const lineHeight = spacing.lineHeight;
    const marginBottom = spacing.paragraphAfter;
    const accentColor = this.styleSettings.accentColor || this.theme.styles.primaryColor;
    const bulletColor = this.styleSettings.listMarkerColor || accentColor;
    const align = this.styleSettings.paragraphAlign || 'left';
    const bodyColor = this.styleSettings.themeBodyColor || '#333333';
    const itemMarginBottom = spacing.listItemBottom;
    
    let html = '';
    const items = block.items || [];
    if (items.length === 0) return '';

    // Group items by type (ordered vs unordered) to handle mixed lists properly
    let currentType = items[0].ordered ? 'ol' : 'ul';
    let currentItems: any[] = [];

    const flush = () => {
        if (currentItems.length === 0) return;
        const isOrdered = currentType === 'ol';
        const listStyleType = isOrdered 
            ? (this.styleSettings.orderedListMarker || 'decimal')
            : (this.styleSettings.unorderedListMarker || 'disc');
        
        // CSS list-style-type mapping
        let cssListStyle: string = listStyleType;
        if (listStyleType === 'cjk-decimal') cssListStyle = 'cjk-ideographic';
        if (listStyleType === 'dash') cssListStyle = '"- "'; 
        
        const tag = isOrdered ? 'ol' : 'ul';
        html += `<${tag} style="margin-bottom: ${marginBottom}; padding-left: 20px; text-align: ${align}; list-style-type: ${cssListStyle}; color: ${bulletColor};">`;
        for (const item of currentItems) {
            html += `<li style="font-size: ${fontSize}px; line-height: ${lineHeight}; margin-bottom: ${itemMarginBottom};"><span style="color: ${bodyColor}">${this.parseInline(item.text)}</span></li>`;
        }
        html += `</${tag}>`;
        currentItems = [];
    };

    for (const item of items) {
        const itemType = item.ordered ? 'ol' : 'ul';
        if (itemType !== currentType) {
            flush();
            currentType = itemType;
        }
        currentItems.push(item);
    }
    flush();
    return html;
  }

  private renderCode(block: ContentBlock): string {
    let codeStyles = { ...this.theme.styles.codeBlock };
    
    // 代码块主题覆盖
    if (this.styleSettings.codeTheme === 'light') {
      codeStyles = { backgroundColor: '#f6f8fa', textColor: '#24292e', borderColor: '#e1e4e8' };
    } else if (this.styleSettings.codeTheme === 'dark') {
      codeStyles = { backgroundColor: '#282c34', textColor: '#abb2bf', borderColor: '#21252b' };
    } else if (this.styleSettings.codeTheme === 'github') {
       codeStyles = { backgroundColor: '#f6f8fa', textColor: '#24292e', borderColor: '#d1d5da' };
    }

    const fontSize = this.getFontSize() - 2;
    const marginBottom = this.getSpacing().paragraphAfter;
    const showLanguage = this.styleSettings.codeShowLanguage !== false;
    
    let highlightedCode = block.content;
    try {
      const result = hljs.highlight(block.content, { language: block.language || 'text' });
      highlightedCode = result.value;
    } catch (e) {
      highlightedCode = this.escapeHtml(block.content);
    }

    return `
      <section style="background-color: ${codeStyles.backgroundColor}; border: 1px solid ${codeStyles.borderColor}; border-radius: 8px; margin-bottom: ${marginBottom}; overflow: hidden;">
        ${showLanguage ? `
        <section style="background-color: ${codeStyles.borderColor}40; padding: 8px 16px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid ${codeStyles.borderColor};">
          <span style="font-size: ${fontSize}px; color: ${codeStyles.textColor}99; font-weight: bold;">${block.language || 'Code'}</span>
        </section>
        ` : ''}
        <pre style="margin: 0; padding: 16px; overflow-x: auto; font-size: ${fontSize}px; line-height: 1.6; color: ${codeStyles.textColor}; background: transparent; border: none;"><code class="code-content" style="font-family: Consolas, Monaco, monospace; background: transparent;">${highlightedCode}</code></pre>
      </section>
    `;
  }

  private renderQuote(block: ContentBlock): string {
    const accentColor = this.styleSettings.accentColor || this.theme.styles.primaryColor;
    const quoteStyles = {
      ...this.theme.styles.quote,
      borderColor: accentColor,
      backgroundColor: `${accentColor}10`
    };
    const fontSize = this.getFontSize();
    const spacing = this.getSpacing();
    const lineHeight = spacing.lineHeight;
    const marginBottom = spacing.paragraphAfter;
    
    const isCard = this.styleSettings.componentStyle === 'card';
    const hasShadow = this.styleSettings.componentShadow;
    const isRounded = this.styleSettings.componentRounded;
    
    let style = `margin-bottom: ${marginBottom}; color: ${quoteStyles.textColor};`;
    
    if (isCard) {
      style += ` background-color: ${quoteStyles.backgroundColor}; padding: 16px; border-left: 4px solid ${quoteStyles.borderColor};`;
      if (hasShadow) style += ` box-shadow: 0 2px 8px rgba(0,0,0,0.05);`;
      if (isRounded) style += ` border-radius: 8px; border-top-right-radius: 8px; border-bottom-right-radius: 8px;`;
    } else {
      // flat or minimal
      style += ` background-color: ${quoteStyles.backgroundColor}; padding: 16px; border-left: 4px solid ${quoteStyles.borderColor};`;
    }

    return `
      <blockquote style="${style}">
        <p style="font-size: ${fontSize}px; line-height: ${lineHeight}; margin: 0;">${this.parseInline(block.content)}</p>
      </blockquote>
    `;
  }

  private renderTable(block: ContentBlock): string {
    const accentColor = this.styleSettings.accentColor || this.theme.styles.primaryColor;
    const tableStyles = this.theme.styles.table;
    const fontSize = this.getFontSize();
    const marginBottom = this.getSpacing().paragraphAfter;
    const density = this.styleSettings.tableDensity || 'standard';
    const padding = density === 'compact' ? '8px' : density === 'loose' ? '16px' : '12px';
    const isStriped = this.styleSettings.tableStyle === 'striped';
    
    const headerBg = this.styleSettings.tableHeaderBgColor || accentColor;
    const stripeBg = this.styleSettings.tableStripeColor || `${accentColor}10`;

    let html = `<table style="width: 100%; border-collapse: collapse; margin-bottom: ${marginBottom}; border: 1px solid ${tableStyles.borderColor}; table-layout: fixed;">`;
    
    if (block.content.headers) {
      html += '<thead><tr>';
      for (const header of block.content.headers) {
        html += `<th style="background-color: ${headerBg}; color: #ffffff; padding: ${padding}; text-align: left; border: 1px solid ${tableStyles.borderColor}; font-size: ${fontSize}px; font-weight: bold;">${this.escapeHtml(header)}</th>`;
      }
      html += '</tr></thead>';
    }
    
    if (block.content.rows) {
      html += '<tbody>';
      block.content.rows.forEach((row: string[], index: number) => {
        const bg = isStriped && index % 2 === 1 ? `background-color: ${stripeBg};` : '';
        html += `<tr style="${bg}">`;
        for (const cell of row) {
          html += `<td style="padding: ${padding}; border: 1px solid ${tableStyles.borderColor}; font-size: ${fontSize}px; word-wrap: break-word;">${this.parseInline(cell)}</td>`;
        }
        html += '</tr>';
      });
      html += '</tbody>';
    }
    
    html += '</table>';
    return html;
  }

  private renderImage(block: ContentBlock): string {
    const marginBottom = this.getSpacing().paragraphAfter;
    const align = this.styleSettings.imageAlign || 'center';
    const width = this.styleSettings.imageWidth || '100%';
    const showCaption = this.styleSettings.imageCaption !== false;
    
    return `
      <div style="text-align: ${align}; margin-bottom: ${marginBottom};">
        <img src="${block.content.src}" alt="${block.content.alt}" style="width: ${width}; height: auto; border-radius: 8px;" />
        ${showCaption && block.content.alt ? `<p style="font-size: ${this.getFontSize() - 2}px; color: #999; margin-top: 8px; text-align: center;">${this.escapeHtml(block.content.alt)}</p>` : ''}
      </div>
    `;
  }

  private renderStep(block: ContentBlock): string {
    const fontSize = this.getFontSize();
    const spacing = this.getSpacing();
    const lineHeight = spacing.lineHeight;
    const marginBottom = spacing.paragraphAfter;
    const accentColor = this.styleSettings.accentColor || this.theme.styles.primaryColor;
    const bodyColor = this.styleSettings.themeBodyColor || '#333333';
    
    const isCard = this.styleSettings.componentStyle === 'card';
    const hasShadow = this.styleSettings.componentShadow;
    const isRounded = this.styleSettings.componentRounded;

    let containerStyle = `padding: 16px; margin-bottom: ${marginBottom}; border-left: 4px solid ${accentColor}; background-color: #f9f9f9;`;
    if (isCard) {
      if (hasShadow) containerStyle += ` box-shadow: 0 2px 8px rgba(0,0,0,0.05);`;
      if (isRounded) containerStyle += ` border-radius: 8px; border-top-right-radius: 8px; border-bottom-right-radius: 8px;`;
    }

    return `
      <div style="${containerStyle}">
        <div style="font-size: ${fontSize + 2}px; font-weight: bold; color: ${accentColor}; margin-bottom: 8px;">${this.escapeHtml(block.content.title)}</div>
        <div style="font-size: ${fontSize}px; line-height: ${lineHeight}; color: ${bodyColor};">${this.parseInline(block.content.description)}</div>
      </div>
    `;
  }

  private renderComparison(block: ContentBlock): string {
    const fontSize = this.getFontSize();
    const spacing = this.getSpacing();
    const lineHeight = spacing.lineHeight;
    const marginBottom = spacing.paragraphAfter;
    const accentColor = this.styleSettings.accentColor || this.theme.styles.primaryColor;
    const bodyColor = this.styleSettings.themeBodyColor || '#333333';
    
    const isCard = this.styleSettings.componentStyle === 'card';
    const hasShadow = this.styleSettings.componentShadow;
    const isRounded = this.styleSettings.componentRounded;

    let containerStyle = `padding: 16px; margin-bottom: ${marginBottom}; border: 1px solid ${accentColor}30; background: linear-gradient(135deg, ${accentColor}15 0%, ${accentColor}05 100%);`;
    if (isCard) {
       if (hasShadow) containerStyle += ` box-shadow: 0 2px 8px rgba(0,0,0,0.05);`;
       if (isRounded) containerStyle += ` border-radius: 8px;`;
    }

    return `
      <div style="${containerStyle}">
        <div style="font-size: ${fontSize + 2}px; font-weight: bold; color: ${accentColor}; margin-bottom: 12px;">对比分析</div>
        <div style="font-size: ${fontSize}px; line-height: ${lineHeight}; color: ${bodyColor};">${this.parseInline(block.content)}</div>
      </div>
    `;
  }

  private applyStyles(html: string): string {
    const bg = this.styleSettings.themeBackground || '#ffffff';
    const color = this.styleSettings.themeBodyColor || '#333333';
    return `
      <section style="max-width: 677px; margin: 0 auto; padding: 20px; font-family: ${this.theme.styles.bodyFont}; background-color: ${bg}; color: ${color}; border-radius: 8px;">
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
    const linkColor = this.styleSettings.linkColor || this.styleSettings.accentColor || '#576b95';
    const linkDecoration = this.styleSettings.linkUnderline ? 'underline' : 'none';
    const boldColor = this.styleSettings.boldColor ? `color: ${this.styleSettings.boldColor};` : '';
    const italicColor = this.styleSettings.italicColor ? `color: ${this.styleSettings.italicColor};` : '';
    const highlightStyle = this.styleSettings.highlightBgColor ? `background-color: ${this.styleSettings.highlightBgColor}; padding: 0 2px; border-radius: 2px;` : 'background-color: #fff59d; padding: 0 2px; border-radius: 2px;';

    return text
      .replace(/\*\*(.+?)\*\*/g, `<strong style="${boldColor}">$1</strong>`)
      .replace(/\*(.+?)\*/g, `<em style="${italicColor}">$1</em>`)
      .replace(/==(.+?)==/g, `<span style="${highlightStyle}">$1</span>`)
      .replace(/`(.+?)`/g, '<code style="background-color: #f0f0f0; padding: 2px 4px; border-radius: 3px; font-size: 0.9em;">$1</code>')
      .replace(/\[(.+?)\]\((.+?)\)/g, `<a href="$2" style="color: ${linkColor}; text-decoration: ${linkDecoration}; border-bottom: ${this.styleSettings.linkUnderline ? 'none' : `1px solid ${linkColor}40`};">$1</a>`);
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  private adjustColorBrightness(hex: string, percent: number): string {
    hex = hex.replace(/^\s*#|\s*$/g, '');
    if (hex.length === 3) {
      hex = hex.replace(/(.)/g, '$1$1');
    }
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    const adjust = (val: number) => {
      const newVal = Math.round(val * (1 + percent / 100));
      return Math.min(255, Math.max(0, newVal));
    };

    const rr = adjust(r).toString(16).padStart(2, '0');
    const gg = adjust(g).toString(16).padStart(2, '0');
    const bb = adjust(b).toString(16).padStart(2, '0');

    return `#${rr}${gg}${bb}`;
  }

  private getHeadingColor(level: number): string {
    const accentColor = this.styleSettings.accentColor;
    if (accentColor) {
      // 使用主题色作为标题色
      switch (level) {
        case 1: return accentColor;
        case 2: return accentColor;
        case 3: return accentColor;
        default: return accentColor;
      }
    }
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

  private getSpacing(): {
    lineHeight: string;
    paragraphBefore: string;
    paragraphAfter: string;
    headingTop: string;
    headingBottom: string;
    listItemBottom: string;
  } {
    // 根据 paragraphSpacing 设置统一的间距方案
    const spacing = this.styleSettings.paragraphSpacing || 'standard';
    switch (spacing) {
      case 'compact':
        return {
          lineHeight: '1.5',
          paragraphBefore: '0px',
          paragraphAfter: '12px',
          headingTop: '20px',
          headingBottom: '10px',
          listItemBottom: '4px',
        };
      case 'loose':
        return {
          lineHeight: '2',
          paragraphBefore: '0px',
          paragraphAfter: '28px',
          headingTop: '40px',
          headingBottom: '20px',
          listItemBottom: '12px',
        };
      case 'standard':
      default:
        return {
          lineHeight: '1.75',
          paragraphBefore: '0px',
          paragraphAfter: '20px',
          headingTop: '30px',
          headingBottom: '15px',
          listItemBottom: '8px',
        };
    }
  }


}
