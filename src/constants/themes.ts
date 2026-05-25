import { Theme } from '../types';

export const themes: Theme[] = [
  {
    id: 'obsidian',
    name: '赛博幻影',
    description: '霓虹炫光，未来科技，赛博朋克美学',
    styles: {
      primaryColor: '#00F0FF',
      headingFont: '"JetBrains Mono", "PingFang SC", -apple-system, sans-serif',
      bodyFont: '"PingFang SC", -apple-system, "Helvetica Neue", sans-serif',
      headingColors: {
        h1: '#FFFFFF',
        h2: '#00F0FF',
        h3: '#FF003C'
      },
      paragraphSpacing: 'standard',
      fontSize: 'medium',
      codeBlock: {
        backgroundColor: '#0D0D0D',
        textColor: '#00F0FF',
        borderColor: '#1A1A1A'
      },
      quote: {
        backgroundColor: '#111111',
        textColor: '#E0E0E0',
        borderColor: '#00F0FF'
      },
      table: {
        headerBackgroundColor: '#1A1A1A',
        headerTextColor: '#00F0FF',
        borderColor: '#333333'
      },
      list: {
        bulletColor: '#FF003C'
      }
    },
    settings: {
      accentColor: '#00F0FF',
      paragraphSpacing: 'standard',
      fontSize: 'medium',
      lineHeight: '1.85',
      paragraphSpacingBefore: '0px',
      paragraphSpacingAfter: '22px',
      firstLineIndent: false,
      indentWidth: '2em',
      headingDecoration: 'cyber-glitch',
      headingNumbering: false,
      headingAlign: 'left',
      paragraphAlign: 'left',
      componentStyle: 'card',
      componentShadow: true,
      componentRounded: false,
      linkUnderline: true,
      linkColor: '#FF003C',
      imageAlign: 'center',
      imageWidth: '100%',
      imageCaption: true,
      tableStyle: 'bordered',
      tableDensity: 'standard',
      codeTheme: 'dark',
      codeShowLanguage: true,
      codeShowLineNumbers: true,
      themeBackground: '#050505',
      themeBodyColor: '#E0E0E0',
      boldColor: '#00F0FF',
      highlightBgColor: '#ff003c40',
      themeId: 'obsidian',
    } as any
  },
  {
    id: 'aurora',
    name: '极简侘寂',
    description: '温润雅致，自然留白，侘寂极简风',
    styles: {
      primaryColor: '#8C7A6B',
      headingFont: '"PingFang SC", "Noto Sans SC", -apple-system, sans-serif',
      bodyFont: '"PingFang SC", "Noto Sans SC", -apple-system, sans-serif',
      headingColors: {
        h1: '#2C2A29',
        h2: '#4A4643',
        h3: '#8C7A6B'
      },
      paragraphSpacing: 'loose',
      fontSize: 'medium',
      codeBlock: {
        backgroundColor: '#F7F5F0',
        textColor: '#4A4643',
        borderColor: '#E8E4DB'
      },
      quote: {
        backgroundColor: '#F2F0EB',
        textColor: '#5C5855',
        borderColor: '#8C7A6B'
      },
      table: {
        headerBackgroundColor: '#F7F5F0',
        headerTextColor: '#2C2A29',
        borderColor: '#E8E4DB'
      },
      list: {
        bulletColor: '#8C7A6B'
      }
    },
    settings: {
      accentColor: '#8C7A6B',
      paragraphSpacing: 'loose',
      fontSize: 'medium',
      lineHeight: '2.0',
      paragraphSpacingBefore: '0px',
      paragraphSpacingAfter: '26px',
      firstLineIndent: false,
      indentWidth: '2em',
      headingDecoration: 'minimal-dot',
      headingNumbering: false,
      headingAlign: 'left',
      paragraphAlign: 'left',
      componentStyle: 'minimal',
      componentShadow: false,
      componentRounded: true,
      linkUnderline: false,
      linkColor: '#8C7A6B',
      imageAlign: 'center',
      imageWidth: '100%',
      imageCaption: true,
      tableStyle: 'simple',
      tableDensity: 'loose',
      codeTheme: 'light',
      codeShowLanguage: false,
      codeShowLineNumbers: false,
      themeBackground: '#FAF9F7',
      themeBodyColor: '#4A4643',
      boldColor: '#2C2A29',
      highlightBgColor: '#e8ddd060',
      themeId: 'aurora',
    } as any
  },
  {
    id: 'ink',
    name: '宋韵雅集',
    description: '传统宋体，水墨留香，中式古典美学',
    styles: {
      primaryColor: '#3B2E2A',
      headingFont: '"Noto Serif SC", "Songti SC", "STSong", serif',
      bodyFont: '"Noto Serif SC", "Songti SC", "STSong", serif',
      headingColors: {
        h1: '#1A1615',
        h2: '#3B2E2A',
        h3: '#796859'
      },
      paragraphSpacing: 'loose',
      fontSize: 'medium',
      codeBlock: {
        backgroundColor: '#F5F4F1',
        textColor: '#3B2E2A',
        borderColor: '#D5CFC4'
      },
      quote: {
        backgroundColor: '#F0EEE9',
        textColor: '#4A413D',
        borderColor: '#3B2E2A'
      },
      table: {
        headerBackgroundColor: '#3B2E2A',
        headerTextColor: '#F9F8F6',
        borderColor: '#D5CFC4'
      },
      list: {
        bulletColor: '#796859'
      }
    },
    settings: {
      accentColor: '#3B2E2A',
      paragraphSpacing: 'loose',
      fontSize: 'medium',
      lineHeight: '2.2',
      paragraphSpacingBefore: '0px',
      paragraphSpacingAfter: '30px',
      firstLineIndent: true,
      indentWidth: '2em',
      headingDecoration: 'song-dynasty',
      headingNumbering: false,
      headingAlign: 'center',
      paragraphAlign: 'justify',
      componentStyle: 'flat',
      componentShadow: false,
      componentRounded: false,
      linkUnderline: true,
      linkColor: '#796859',
      imageAlign: 'center',
      imageWidth: '80%',
      imageCaption: true,
      tableStyle: 'simple',
      tableDensity: 'loose',
      codeTheme: 'light',
      codeShowLanguage: false,
      codeShowLineNumbers: false,
      themeBackground: '#F9F8F6',
      themeBodyColor: '#3B2E2A',
      boldColor: '#1A1615',
      highlightBgColor: '#d5cfc460',
      themeId: 'ink',
    } as any
  },
  {
    id: 'nordic',
    name: '摩登包豪斯',
    description: '几何色块，极致功能，现代包豪斯风',
    styles: {
      primaryColor: '#003B99',
      headingFont: '"Helvetica Neue", "PingFang SC", sans-serif',
      bodyFont: '"Helvetica Neue", "PingFang SC", sans-serif',
      headingColors: {
        h1: '#000000',
        h2: '#003B99',
        h3: '#D91122'
      },
      paragraphSpacing: 'standard',
      fontSize: 'medium',
      codeBlock: {
        backgroundColor: '#F4F4F4',
        textColor: '#1A1A1A',
        borderColor: '#000000'
      },
      quote: {
        backgroundColor: '#FFFFFF',
        textColor: '#1A1A1A',
        borderColor: '#003B99'
      },
      table: {
        headerBackgroundColor: '#003B99',
        headerTextColor: '#FFFFFF',
        borderColor: '#000000'
      },
      list: {
        bulletColor: '#D91122'
      }
    },
    settings: {
      accentColor: '#003B99',
      paragraphSpacing: 'standard',
      fontSize: 'medium',
      lineHeight: '1.7',
      paragraphSpacingBefore: '0px',
      paragraphSpacingAfter: '20px',
      firstLineIndent: false,
      indentWidth: '2em',
      headingDecoration: 'bauhaus-block',
      headingNumbering: false,
      headingAlign: 'left',
      paragraphAlign: 'left',
      componentStyle: 'flat',
      componentShadow: true,
      componentRounded: false,
      linkUnderline: false,
      linkColor: '#003B99',
      imageAlign: 'center',
      imageWidth: '100%',
      imageCaption: true,
      tableStyle: 'bordered',
      tableDensity: 'standard',
      codeTheme: 'github',
      codeShowLanguage: true,
      codeShowLineNumbers: false,
      themeBackground: '#FFFFFF',
      themeBodyColor: '#1A1A1A',
      boldColor: '#000000',
      highlightBgColor: '#FFD700',
      themeId: 'nordic',
    } as any
  },
  {
    id: 'sakura',
    name: '琉璃流光',
    description: '全息渐变，玻璃质感，潮流视觉体验',
    styles: {
      primaryColor: '#722ED1',
      headingFont: '"PingFang SC", "Noto Sans SC", sans-serif',
      bodyFont: '"PingFang SC", "Noto Sans SC", sans-serif',
      headingColors: {
        h1: '#1F1F1F',
        h2: '#722ED1',
        h3: '#F5319D'
      },
      paragraphSpacing: 'standard',
      fontSize: 'medium',
      codeBlock: {
        backgroundColor: '#F9F0FF',
        textColor: '#531DAB',
        borderColor: '#E8D6F9'
      },
      quote: {
        backgroundColor: '#FCFAFF',
        textColor: '#531DAB',
        borderColor: '#722ED1'
      },
      table: {
        headerBackgroundColor: '#722ED1',
        headerTextColor: '#FFFFFF',
        borderColor: '#E8D6F9'
      },
      list: {
        bulletColor: '#F5319D'
      }
    },
    settings: {
      accentColor: '#722ED1',
      paragraphSpacing: 'standard',
      fontSize: 'medium',
      lineHeight: '1.8',
      paragraphSpacingBefore: '0px',
      paragraphSpacingAfter: '24px',
      firstLineIndent: false,
      indentWidth: '2em',
      headingDecoration: 'glass-gradient',
      headingNumbering: false,
      headingAlign: 'left',
      paragraphAlign: 'left',
      componentStyle: 'card',
      componentShadow: true,
      componentRounded: true,
      linkUnderline: false,
      linkColor: '#722ED1',
      imageAlign: 'center',
      imageWidth: '100%',
      imageCaption: true,
      tableStyle: 'striped',
      tableDensity: 'standard',
      codeTheme: 'light',
      codeShowLanguage: true,
      codeShowLineNumbers: false,
      themeBackground: '#F4F0FF',
      themeBodyColor: '#391085',
      boldColor: '#1F1F1F',
      highlightBgColor: '#F5319D20',
      themeId: 'sakura',
    } as any
  }
];

export const getThemeById = (id: string): Theme | undefined => {
  return themes.find(theme => theme.id === id);
};
