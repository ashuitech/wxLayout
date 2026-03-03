import { Theme } from '../types';

export const themes: Theme[] = [
  {
    id: 'minimal',
    name: '简约风格',
    description: '简洁大方，适合技术文档',
    styles: {
      primaryColor: '#333333',
      headingFont: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      bodyFont: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      headingColors: {
        h1: '#000000',
        h2: '#333333',
        h3: '#666666'
      },
      paragraphSpacing: 'standard',
      fontSize: 'medium',
      codeBlock: {
        backgroundColor: '#f5f5f5',
        textColor: '#333333',
        borderColor: '#e0e0e0'
      },
      quote: {
        backgroundColor: '#f9f9f9',
        textColor: '#666666',
        borderColor: '#e0e0e0'
      },
      table: {
        headerBackgroundColor: '#f5f5f5',
        headerTextColor: '#333333',
        borderColor: '#e0e0e0'
      },
      list: {
        bulletColor: '#333333'
      }
    }
  },
  {
    id: 'business',
    name: '商务风格',
    description: '专业稳重，适合商务内容',
    styles: {
      primaryColor: '#1a5490',
      headingFont: '"Microsoft YaHei", "PingFang SC", sans-serif',
      bodyFont: '"Microsoft YaHei", "PingFang SC", sans-serif',
      headingColors: {
        h1: '#1a5490',
        h2: '#2c6eb5',
        h3: '#4a8bc7'
      },
      paragraphSpacing: 'standard',
      fontSize: 'medium',
      codeBlock: {
        backgroundColor: '#f0f4f8',
        textColor: '#1a5490',
        borderColor: '#d0dce8'
      },
      quote: {
        backgroundColor: '#f0f4f8',
        textColor: '#1a5490',
        borderColor: '#1a5490'
      },
      table: {
        headerBackgroundColor: '#1a5490',
        headerTextColor: '#ffffff',
        borderColor: '#d0dce8'
      },
      list: {
        bulletColor: '#1a5490'
      }
    }
  },
  {
    id: 'tech',
    name: '科技风格',
    description: '现代科技感，适合技术文章',
    styles: {
      primaryColor: '#00d4ff',
      headingFont: '"Consolas", "Monaco", monospace',
      bodyFont: '"Segoe UI", "Roboto", sans-serif',
      headingColors: {
        h1: '#00d4ff',
        h2: '#00a8cc',
        h3: '#007a99'
      },
      paragraphSpacing: 'standard',
      fontSize: 'medium',
      codeBlock: {
        backgroundColor: '#0d1117',
        textColor: '#c9d1d9',
        borderColor: '#30363d'
      },
      quote: {
        backgroundColor: '#161b22',
        textColor: '#8b949e',
        borderColor: '#30363d'
      },
      table: {
        headerBackgroundColor: '#0d1117',
        headerTextColor: '#00d4ff',
        borderColor: '#30363d'
      },
      list: {
        bulletColor: '#00d4ff'
      }
    }
  },
  {
    id: 'literary',
    name: '文艺风格',
    description: '优雅文艺，适合文学内容',
    styles: {
      primaryColor: '#8b4513',
      headingFont: '"Georgia", "Times New Roman", serif',
      bodyFont: '"Georgia", "Times New Roman", serif',
      headingColors: {
        h1: '#8b4513',
        h2: '#a0522d',
        h3: '#cd853f'
      },
      paragraphSpacing: 'loose',
      fontSize: 'medium',
      codeBlock: {
        backgroundColor: '#faf0e6',
        textColor: '#8b4513',
        borderColor: '#deb887'
      },
      quote: {
        backgroundColor: '#faf0e6',
        textColor: '#8b4513',
        borderColor: '#deb887'
      },
      table: {
        headerBackgroundColor: '#8b4513',
        headerTextColor: '#ffffff',
        borderColor: '#deb887'
      },
      list: {
        bulletColor: '#8b4513'
      }
    }
  },
  {
    id: 'vibrant',
    name: '活力风格',
    description: '色彩鲜明，适合年轻读者',
    styles: {
      primaryColor: '#ff6b6b',
      headingFont: '"Microsoft YaHei", "PingFang SC", sans-serif',
      bodyFont: '"Microsoft YaHei", "PingFang SC", sans-serif',
      headingColors: {
        h1: '#ff6b6b',
        h2: '#ee5a5a',
        h3: '#dd4949'
      },
      paragraphSpacing: 'standard',
      fontSize: 'medium',
      codeBlock: {
        backgroundColor: '#fff0f0',
        textColor: '#ff6b6b',
        borderColor: '#ffb3b3'
      },
      quote: {
        backgroundColor: '#fff0f0',
        textColor: '#ff6b6b',
        borderColor: '#ff6b6b'
      },
      table: {
        headerBackgroundColor: '#ff6b6b',
        headerTextColor: '#ffffff',
        borderColor: '#ffb3b3'
      },
      list: {
        bulletColor: '#ff6b6b'
      }
    }
  }
];

export const getThemeById = (id: string): Theme | undefined => {
  return themes.find(theme => theme.id === id);
};