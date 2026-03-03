# 微信公众号自动排版工具

一款功能完善的微信公众号文章自动排版工具，支持Markdown到微信公众号HTML的一键转换。

## 功能特性

### 核心功能

- **智能Markdown解析**：支持8种内容类型（标题、段落、列表、代码块、引用、表格、图片、步骤说明、对比分析）
- **5套专业主题**：简约、商务、科技、文艺、活力风格
- **实时预览**：编辑器与预览区域同步更新
- **一键复制**：直接复制到微信公众号编辑器
- **样式定制**：强调色、段落间距、字号可调

### 技术特性

- CSS自动内联，完美适配微信公众号编辑器
- 代码块语法高亮、行号显示、复制功能
- 支持GFM (GitHub Flavored Markdown)标准
- 高性能解析，1000字文章处理时间<3秒

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 http://localhost:3000 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 使用说明

### 基本操作流程

1. **输入内容**：在左侧Markdown编辑器中输入或粘贴文章内容
2. **选择主题**：在底部选择喜欢的主题风格
3. **调整样式**：根据需要调整强调色、段落间距、字号
4. **复制结果**：点击"复制到剪贴板"按钮，粘贴到微信公众号编辑器

### 支持的Markdown语法

#### 标题
```markdown
# 一级标题
## 二级标题
### 三级标题
```

#### 段落
```markdown
这是普通段落文本。
支持**粗体**和*斜体*。
```

#### 列表
```markdown
- 无序列表项1
- 无序列表项2

1. 有序列表项1
2. 有序列表项2
```

#### 代码块
```markdown
\`\`\`javascript
function hello() {
  console.log('Hello World');
}
\`\`\`
```

#### 引用
```markdown
> 这是一段引用内容
> 支持多行引用
```

#### 表格
```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 内容1 | 内容2 | 内容3 |
```

#### 图片
```markdown
![图片描述](图片URL)
```

#### 步骤说明
```markdown
**步骤一**：这是步骤描述
**步骤二**：这是另一个步骤描述
```

#### 对比分析
```markdown
**对比分析**：这是对比内容描述
```

## 主题系统

### 内置主题

1. **简约风格**：简洁大方，适合技术文档
2. **商务风格**：专业稳重，适合商务内容
3. **科技风格**：现代科技感，适合技术文章
4. **文艺风格**：优雅文艺，适合文学内容
5. **活力风格**：色彩鲜明，适合年轻读者

### 样式控制

- **强调色**：支持16进制色值输入和色板选择
- **段落间距**：紧凑/标准/宽松三档预设
- **字号**：小/中/大三档预设

## 浏览器兼容性

支持以下现代浏览器：
- Chrome 80+
- Firefox 75+
- Edge 80+
- Safari 13+

## 技术栈

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Marked (Markdown解析)
- Highlight.js (代码高亮)
- Juice (CSS内联)

## 项目结构

```
wxAutoChange/
├── src/
│   ├── components/       # React组件
│   │   ├── Editor.tsx   # Markdown编辑器
│   │   ├── Preview.tsx  # 实时预览
│   │   ├── ThemeSelector.tsx  # 主题选择器
│   │   ├── StyleControls.tsx   # 样式控制面板
│   │   └── Header.tsx   # 页面头部
│   ├── constants/       # 常量定义
│   │   └── themes.ts    # 主题配置
│   ├── types/           # TypeScript类型定义
│   │   └── index.ts
│   ├── utils/           # 工具函数
│   │   ├── markdownParser.ts   # Markdown解析引擎
│   │   └── htmlGenerator.ts    # HTML生成器
│   ├── App.tsx          # 主应用组件
│   ├── main.tsx         # 应用入口
│   └── index.css        # 全局样式
├── public/              # 静态资源
├── index.html           # HTML模板
├── package.json         # 项目配置
├── tsconfig.json        # TypeScript配置
├── vite.config.ts       # Vite配置
└── tailwind.config.js   # Tailwind配置
```

## 开发指南

### 添加新主题

在 `src/constants/themes.ts` 中添加新的主题配置：

```typescript
{
  id: 'your-theme-id',
  name: '主题名称',
  description: '主题描述',
  styles: {
    primaryColor: '#000000',
    // ... 其他样式配置
  }
}
```

### 扩展Markdown解析

在 `src/utils/markdownParser.ts` 中扩展解析逻辑，支持新的内容类型。

### 自定义HTML生成

在 `src/utils/htmlGenerator.ts` 中自定义HTML生成逻辑，实现特殊的样式效果。

## 性能优化

- 使用虚拟滚动处理长文本
- 代码分割和懒加载
- CSS内联优化
- 防抖处理实时预览

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request！