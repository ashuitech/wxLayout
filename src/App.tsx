import React, { useState, useEffect } from 'react';
import { MarkdownParser } from './utils/markdownParser';
import { HTMLGenerator } from './utils/htmlGenerator';
import { themes } from './constants/themes';
import { Theme, StyleSettings } from './types';
import Editor from './components/Editor';
import Preview from './components/Preview';
import ThemeSelector from './components/ThemeSelector';
import StyleControls from './components/StyleControls';
import Header from './components/Header';
import { Copy, Download, FileText } from 'lucide-react';

const defaultMarkdown = `# 欢迎使用微信公众号自动排版工具

这是一款功能完善的Markdown到微信公众号的自动排版工具，支持多种内容类型和主题风格。

## 主要功能

### 1. 智能Markdown解析
- 支持标题、段落、列表、代码块等多种内容类型
- 自动识别步骤说明、对比分析等特殊格式
- 完美兼容GFM (GitHub Flavored Markdown)标准

### 2. 丰富的主题系统
内置5套专业主题：
- **简约风格**：简洁大方，适合技术文档
- **商务风格**：专业稳重，适合商务内容
- **科技风格**：现代科技感，适合技术文章
- **文艺风格**：优雅文艺，适合文学内容
- **活力风格**：色彩鲜明，适合年轻读者

### 3. 微信公众号完美适配
- CSS自动内联，解决样式丢失问题
- 特殊标签自动转换
- 代码块语法高亮和行号显示
- 一键复制功能

## 使用示例

### 步骤说明
**步骤一**：在左侧编辑器输入Markdown内容
**步骤二**：选择喜欢的主题风格
**步骤三**：调整样式参数
**步骤四**：点击复制按钮，粘贴到微信公众号

### 代码示例
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`

### 重点引用
> 这是一段引用内容，用于强调重要信息。
> 支持多行引用，自动应用主题样式。

### 对比分析
**对比分析**：传统排版工具需要手动调整格式，而本工具可以实现一键自动排版，效率提升10倍以上。

### 表格示例
| 功能 | 传统方式 | 本工具 |
|------|---------|--------|
| 排版时间 | 30分钟 | 3秒 |
| 样式一致性 | 难以保证 | 完美一致 |
| 主题切换 | 需要重新排版 | 一键切换 |

### 列表示例
- 支持无序列表
- 支持有序列表
- 支持嵌套列表
1. 第一步
2. 第二步
3. 第三步

开始体验吧！在左侧编辑器中输入您的Markdown内容，右侧将实时预览排版效果。`;

function App() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [html, setHtml] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0]);
  const [styleSettings, setStyleSettings] = useState<StyleSettings>({
    accentColor: themes[0].styles.primaryColor,
    paragraphSpacing: 'standard',
    fontSize: 'medium'
  });

  useEffect(() => {
    generateHtml();
  }, [markdown, selectedTheme, styleSettings]);

  const generateHtml = () => {
    const parser = new MarkdownParser();
    const blocks = parser.parse(markdown);
    const generator = new HTMLGenerator(selectedTheme, styleSettings);
    const generatedHtml = generator.generate(blocks);
    setHtml(generatedHtml);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(html);
      alert('已复制到剪贴板！现在可以粘贴到微信公众号编辑器了。');
    } catch (err) {
      console.error('复制失败:', err);
      alert('复制失败，请手动复制预览区域的内容。');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'article.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleThemeChange = (theme: Theme) => {
    setSelectedTheme(theme);
    setStyleSettings(prev => ({
      ...prev,
      accentColor: theme.styles.primaryColor
    }));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/2 flex flex-col border-r border-gray-200">
          <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-600" />
              <h2 className="font-semibold text-gray-800">Markdown 编辑器</h2>
            </div>
          </div>
          <Editor value={markdown} onChange={setMarkdown} />
        </div>

        <div className="w-1/2 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-600" />
              <h2 className="font-semibold text-gray-800">实时预览</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                下载
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <Copy className="w-4 h-4" />
                复制到剪贴板
              </button>
            </div>
          </div>
          <Preview html={html} />
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <ThemeSelector
              themes={themes}
              selectedTheme={selectedTheme}
              onThemeChange={handleThemeChange}
            />
            <div className="flex-1">
              <StyleControls
                settings={styleSettings}
                onChange={setStyleSettings}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;