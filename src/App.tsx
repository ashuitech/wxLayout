import { useState, useEffect } from 'react';
import { MarkdownParser } from './utils/markdownParser';
import { HTMLGenerator } from './utils/htmlGenerator';
import { themes } from './constants/themes';
import { Theme, StyleSettings } from './types';
import Editor from './components/Editor';
import Preview from './components/Preview';
import ThemeSelector from './components/ThemeSelector';
import StyleControls from './components/StyleControls';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Copy, Download, FileText, Eye } from 'lucide-react';
import Toast from './components/Toast';
import ConfirmDialog from './components/ConfirmDialog';
import { themes as defaultThemes } from './constants/themes';

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

### 表格示例
| 功能 | 传统方式 | 本工具 |
|------|---------|--------|
| 排版时间 | 30分钟 | 3秒 |
| 样式一致性 | 难以保证 | 完美一致 |
| 主题切换 | 需要重新排版 | 一键切换 |

开始体验吧！在左侧编辑器中输入您的Markdown内容，右侧将实时预览排版效果。`;

function App() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [html, setHtml] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<Theme>(defaultThemes[0]);
  const [customThemes, setCustomThemes] = useState<Theme[]>([]);
  const [styleSettings, setStyleSettings] = useState<StyleSettings>({
    accentColor: themes[0].styles.primaryColor,
    paragraphSpacing: 'standard',
    fontSize: 'medium',
    headingAlign: 'left',
    paragraphAlign: 'left',
    lineHeight: '1.75',
    paragraphSpacingBefore: '0px',
    paragraphSpacingAfter: '20px',
    firstLineIndent: false,
    indentWidth: '2em',
    headingDecoration: 'none',
    headingNumbering: false,
    componentStyle: 'card',
    componentShadow: false,
    componentRounded: true,
    linkUnderline: false,
    linkColor: themes[0].styles.primaryColor,
    imageAlign: 'center',
    imageWidth: '100%',
    imageCaption: true,
    tableStyle: 'striped',
    tableDensity: 'standard',
    codeTheme: 'dark',
    codeShowLanguage: true,
    codeShowLineNumbers: false
  });
  const [toast, setToast] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [themeToDelete, setThemeToDelete] = useState<string | null>(null);

  useEffect(() => {
    generateHtml();
  }, [markdown, selectedTheme, styleSettings]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wx-custom-themes');
      if (saved) {
        const list = JSON.parse(saved) as Theme[];
        setCustomThemes(list);
      }
    } catch {}
  }, []);

  const generateHtml = () => {
    try {
      const parser = new MarkdownParser();
      const blocks = parser.parse(markdown);
      const generator = new HTMLGenerator(selectedTheme, styleSettings);
      const generatedHtml = generator.generate(blocks);
      setHtml(generatedHtml);
    } catch (err) {
      console.error('生成HTML失败:', err);
    }
  };

  const handleCopy = async () => {
    try {
      const plain = (() => {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || '';
      })();
      if (navigator.clipboard && (window as any).ClipboardItem) {
        const data = new (window as any).ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([plain], { type: 'text/plain' })
        });
        await navigator.clipboard.write([data]);
        setToast('已复制为富文本，可直接粘贴到公众号');
        return;
      }
      const temp = document.createElement('div');
      temp.style.position = 'fixed';
      temp.style.left = '-9999px';
      temp.contentEditable = 'true';
      temp.innerHTML = html;
      document.body.appendChild(temp);
      const range = document.createRange();
      range.selectNodeContents(temp);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
      document.execCommand('copy');
      document.body.removeChild(temp);
      sel?.removeAllRanges();
      setToast('已复制为富文本，可直接粘贴到公众号');
    } catch (err) {
      console.error('复制失败:', err);
      setToast('复制失败，请手动复制预览内容');
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
    if (theme.settings) {
      setStyleSettings(theme.settings);
    } else {
      setStyleSettings(prev => ({
        ...prev,
        accentColor: theme.styles.primaryColor
      }));
    }
  };

  const handleThemeStylesChange = (styles: Theme['styles']) => {
    setSelectedTheme(prev => ({ ...prev, styles }));
  };

  const handleSaveCustomTheme = (name: string) => {
    const id = `custom-${Date.now()}`;
    const theme: Theme = {
      id,
      name: name || '自定义主题',
      description: '用户自定义主题',
      styles: { ...selectedTheme.styles },
      settings: { ...styleSettings }
    };
    const next = [...customThemes, theme];
    setCustomThemes(next);
    try {
      localStorage.setItem('wx-custom-themes', JSON.stringify(next));
    } catch {}
    setToast('已保存为新主题');
  };

  const handleDeleteTheme = (themeId: string) => {
    setThemeToDelete(themeId);
    setShowDeleteConfirm(true);
  };

  const executeDeleteTheme = () => {
    if (!themeToDelete) return;
    
    const next = customThemes.filter(t => t.id !== themeToDelete);
    setCustomThemes(next);
    try {
      localStorage.setItem('wx-custom-themes', JSON.stringify(next));
    } catch {}
    
    if (selectedTheme.id === themeToDelete) {
      handleThemeChange(defaultThemes[0]);
    }
    setToast('已删除主题');
    setShowDeleteConfirm(false);
    setThemeToDelete(null);
  };

  const allThemes = [...defaultThemes, ...customThemes];

  return (
    <div className="flex flex-col h-screen bg-[#e8f0ec]">
      <Header />
      <Toast message={toast} onClose={() => setToast(null)} />
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="删除主题"
        message={`确定要删除主题"${allThemes.find(t => t.id === themeToDelete)?.name}"吗？此操作无法撤销。`}
        onConfirm={executeDeleteTheme}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setThemeToDelete(null);
        }}
      />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 flex flex-col min-h-0 p-4 gap-4">
          {/* Toolbar */}
          <div className="panel-card px-4 py-2.5 flex items-center gap-2 flex-shrink-0" style={{ zIndex: 10 }}>
            <ThemeSelector
              themes={allThemes}
              selectedTheme={selectedTheme}
              onThemeChange={handleThemeChange}
              onDeleteTheme={handleDeleteTheme}
            />
            <StyleControls
              settings={styleSettings}
              onChange={setStyleSettings}
              theme={selectedTheme}
              onThemeStylesChange={handleThemeStylesChange}
              onSaveCustomTheme={handleSaveCustomTheme}
            />
            <div className="flex-1" />
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-slate-600 bg-white border border-slate-200 rounded-[10px] cursor-pointer hover:bg-slate-50 hover:border-slate-300"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">导出HTML</span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-white bg-[#1a5c3a] rounded-[10px] cursor-pointer hover:bg-[#145230] shadow-md"
            >
              <Copy className="w-4 h-4" />
              <span>复制内容</span>
            </button>
          </div>

          {/* Editor + Preview */}
          <div className="flex-1 flex gap-4 min-h-0">
            {/* Editor panel */}
            <div className="w-1/2 panel-card flex flex-col min-h-0">
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 flex-shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h2 className="text-sm font-semibold text-slate-700">Markdown 编辑器</h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                    {markdown.length} 字
                  </span>
                </div>
              </div>
              <Editor value={markdown} onChange={setMarkdown} />
            </div>

            {/* Preview panel */}
            <div className="w-1/2 panel-card flex flex-col min-h-0">
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 flex-shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center">
                    <Eye className="w-4 h-4 text-teal-600" />
                  </div>
                  <h2 className="text-sm font-semibold text-slate-700">实时预览</h2>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-xs text-slate-400">实时同步</span>
                </div>
              </div>
              <Preview html={html} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
