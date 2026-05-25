export interface ContentBlock {
  type: 'heading' | 'paragraph' | 'list' | 'code' | 'quote' | 'table' | 'image' | 'step' | 'comparison';
  content: any;
  level?: number;
  language?: string;
  items?: any[];
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  styles: ThemeStyles;
  settings?: StyleSettings;
}

export interface ThemeStyles {
  primaryColor: string;
  headingFont: string;
  bodyFont: string;
  headingColors: {
    h1: string;
    h2: string;
    h3: string;
  };
  paragraphSpacing: 'compact' | 'standard' | 'loose';
  fontSize: 'small' | 'medium' | 'large';
  codeBlock: {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
  };
  quote: {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
  };
  table: {
    headerBackgroundColor: string;
    headerTextColor: string;
    borderColor: string;
  };
  list: {
    bulletColor: string;
  };
}

export interface StyleSettings {
  accentColor: string;

  // 主题整体
  themeId?: string;
  themeBackground?: string;
  themeBodyColor?: string;

  // 段落
  paragraphSpacing?: 'compact' | 'standard' | 'loose';
  fontSize: 'small' | 'medium' | 'large';
  headingAlign?: 'left' | 'center' | 'right';
  paragraphAlign?: 'left' | 'center' | 'right';

  // 排版
  lineHeight?: string;
  paragraphSpacingBefore?: string;
  paragraphSpacingAfter?: string;
  firstLineIndent?: boolean;
  indentWidth?: string;

  // 文本装饰
  boldColor?: string;
  italicColor?: string;
  highlightBgColor?: string; // for ==text==

  // 标题
  headingDecoration?: 'none' | 'underline' | 'left-border' | 'center-marker' | 'cyber-glitch' | 'neon-shadow' | 'minimal-dot' | 'wabi-sabi-underline' | 'ink-brush' | 'song-dynasty' | 'bauhaus-block' | 'glass-gradient' | 'business-gold' | 'coral-gradient' | 'h1-underline';
  headingNumbering?: boolean;
  h1Align?: 'left' | 'center' | 'right';
  h2Align?: 'left' | 'center' | 'right';
  headingBgColor?: string;
  headingBorderBottomStyle?: 'none' | 'solid' | 'dashed' | 'dotted';
  headingBorderBottomColor?: string;
  headingPrefix?: string;

  // 列表
  unorderedListMarker?: 'disc' | 'circle' | 'square' | 'dash';
  orderedListMarker?: 'decimal' | 'cjk-decimal'; // 1. or 一、
  listMarkerColor?: string;

  // 组件
  componentStyle?: 'flat' | 'card' | 'minimal';
  componentShadow?: boolean;
  componentRounded?: boolean;

  // 链接
  linkUnderline?: boolean;
  linkColor?: string;

  // 图片
  imageAlign?: 'left' | 'center' | 'right';
  imageWidth?: '100%' | '80%' | 'auto';
  imageCaption?: boolean;

  // 表格
  tableStyle?: 'simple' | 'striped' | 'bordered';
  tableDensity?: 'compact' | 'standard' | 'loose';
  tableHeaderBgColor?: string;
  tableStripeColor?: string;

  // 代码块
  codeTheme?: 'light' | 'dark' | 'github';
  codeShowLanguage?: boolean;
  codeShowLineNumbers?: boolean;
}
