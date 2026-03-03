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
  paragraphSpacing: 'compact' | 'standard' | 'loose';
  fontSize: 'small' | 'medium' | 'large';
}