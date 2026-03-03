# 微信公众号自动排版工具 - 主题定制指南

## 目录

1. [主题系统架构](#主题系统架构)
2. [主题配置详解](#主题配置详解)
3. [创建自定义主题](#创建自定义主题)
4. [样式属性说明](#样式属性说明)
5. [主题最佳实践](#主题最佳实践)
6. [主题调试技巧](#主题调试技巧)
7. [主题分享与发布](#主题分享与发布)

## 主题系统架构

### 主题数据结构

```typescript
interface Theme {
  id: string;           // 主题唯一标识
  name: string;         // 主题名称
  description: string;   // 主题描述
  styles: ThemeStyles;  // 主题样式配置
}

interface ThemeStyles {
  primaryColor: string;           // 主色调
  headingFont: string;           // 标题字体
  bodyFont: string;               // 正文字体
  headingColors: {                // 标题颜色
    h1: string;
    h2: string;
    h3: string;
  };
  paragraphSpacing: 'compact' | 'standard' | 'loose';  // 段落间距
  fontSize: 'small' | 'medium' | 'large';              // 字号
  codeBlock: {                   // 代码块样式
    backgroundColor: string;
    textColor: string;
    borderColor: string;
  };
  quote: {                       // 引用样式
    backgroundColor: string;
    textColor: string;
    borderColor: string;
  };
  table: {                       // 表格样式
    headerBackgroundColor: string;
    headerTextColor: string;
    borderColor: string;
  };
  list: {                        // 列表样式
    bulletColor: string;
  };
}
```

### 主题渲染流程

1. **主题加载**：从配置文件读取主题数据
2. **样式应用**：根据主题配置生成CSS样式
3. **HTML生成**：将样式内联到HTML元素
4. **微信适配**：优化为微信公众号兼容格式

## 主题配置详解

### 基础配色

#### 主色调 (primaryColor)

**作用**：主题的核心颜色，影响多个元素

**影响范围**：
- 强调色选择器默认值
- 步骤说明边框
- 对比分析渐变
- 部分标题颜色

**推荐色值**：
```typescript
// 红色系
'#FF5733'  // 活力红
'#E74C3C'  // 珊瑚红

// 蓝色系
'#3498DB'  // 天蓝
'#2980B9'  // 深蓝
'#1a5490'  // 商务蓝

// 绿色系
'#2ECC71'  // 翠绿
'#27AE60'  // 森绿

// 紫色系
'#9B59B6'  // 紫罗兰
'#8E44AD'  // 深紫

// 橙色系
'#F39C12'  // 橙色
'#E67E22'  // 深橙

// 中性色
'#333333'  // 深灰
'#666666'  // 中灰
'#999999'  // 浅灰
```

### 字体配置

#### 标题字体 (headingFont)

**推荐字体**：
```typescript
// 系统字体
'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

// 中文字体
'"Microsoft YaHei", "PingFang SC", "Microsoft YaHei UI", sans-serif'

// 衬线字体
'"Georgia", "Times New Roman", "Times", serif'

// 等宽字体
'"Consolas", "Monaco", "Courier New", monospace'

// 组合字体
'"Helvetica Neue", Helvetica, Arial, "PingFang SC", "Microsoft YaHei", sans-serif'
```

#### 正文字体 (bodyFont)

**选择原则**：
- 优先使用系统字体，提升加载速度
- 考虑中英文混排的兼容性
- 确保在不同设备上的一致性

### 标题颜色 (headingColors)

**颜色层次**：
```typescript
headingColors: {
  h1: '#000000',  // 一级标题：最深
  h2: '#333333',  // 二级标题：中等
  h3: '#666666',  // 三级标题：较浅
}
```

**设计原则**：
- 从深到浅，形成视觉层次
- 与主色调协调
- 确保可读性

### 代码块样式 (codeBlock)

**配置示例**：
```typescript
codeBlock: {
  backgroundColor: '#f5f5f5',  // 浅色背景
  textColor: '#333333',        // 深色文字
  borderColor: '#e0e0e0',      // 边框颜色
}
```

**深色主题示例**：
```typescript
codeBlock: {
  backgroundColor: '#0d1117',  // 深色背景
  textColor: '#c9d1d9',        // 浅色文字
  borderColor: '#30363d',      // 边框颜色
}
```

### 引用样式 (quote)

**配置示例**：
```typescript
quote: {
  backgroundColor: '#f9f9f9',  // 背景色
  textColor: '#666666',        // 文字颜色
  borderColor: '#e0e0e0',      // 左侧边框颜色
}
```

**设计要点**：
- 背景色与正文区分
- 左侧边框突出
- 文字颜色稍浅

### 表格样式 (table)

**配置示例**：
```typescript
table: {
  headerBackgroundColor: '#1a5490',  // 表头背景
  headerTextColor: '#ffffff',       // 表头文字
  borderColor: '#d0dce8',           // 边框颜色
}
```

**设计要点**：
- 表头与内容区分
- 边框清晰
- 文字对比度足够

### 列表样式 (list)

**配置示例**：
```typescript
list: {
  bulletColor: '#333333',  // 列表符号颜色
}
```

## 创建自定义主题

### 步骤一：确定主题定位

**问题清单**：
- 目标读者是谁？
- 内容类型是什么？
- 想要传达什么感觉？
- 与其他主题的区别是什么？

**主题类型**：
- 技术文档型
- 商务专业型
- 文艺优雅型
- 活力时尚型
- 极简主义型

### 步骤二：选择配色方案

#### 单色方案
```typescript
const monochromaticTheme = {
  primaryColor: '#3498DB',
  headingColors: {
    h1: '#2980B9',
    h2: '#3498DB',
    h3: '#5DADE2'
  },
  // 其他颜色基于主色调调整
}
```

#### 互补色方案
```typescript
const complementaryTheme = {
  primaryColor: '#3498DB',  // 蓝色
  // 使用橙色作为强调
  codeBlock: {
    backgroundColor: '#FEF5E7',
    textColor: '#E67E22',
    borderColor: '#F5CBA7'
  }
}
```

#### 三色方案
```typescript
const triadicTheme = {
  primaryColor: '#3498DB',  // 蓝色
  // 使用紫色和绿色作为辅助
  quote: {
    borderColor: '#9B59B6',  // 紫色
    backgroundColor: '#F4ECF7',
    textColor: '#8E44AD'
  },
  table: {
    headerBackgroundColor: '#2ECC71',  // 绿色
    headerTextColor: '#ffffff',
    borderColor: '#A9DFBF'
  }
}
```

### 步骤三：配置字体

```typescript
const theme = {
  headingFont: '"Microsoft YaHei", "PingFang SC", sans-serif',
  bodyFont: '"Microsoft YaHei", "PingFang SC", sans-serif',
  // ...
}
```

### 步骤四：设置各元素样式

#### 完整示例

```typescript
const customTheme: Theme = {
  id: 'custom-theme',
  name: '自定义主题',
  description: '我的个性化主题',
  styles: {
    primaryColor: '#3498DB',
    headingFont: '"Microsoft YaHei", "PingFang SC", sans-serif',
    bodyFont: '"Microsoft YaHei", "PingFang SC", sans-serif',
    headingColors: {
      h1: '#2C3E50',
      h2: '#34495E',
      h3: '#7F8C8D'
    },
    paragraphSpacing: 'standard',
    fontSize: 'medium',
    codeBlock: {
      backgroundColor: '#F8F9FA',
      textColor: '#2C3E50',
      borderColor: '#DEE2E6'
    },
    quote: {
      backgroundColor: '#F8F9FA',
      textColor: '#495057',
      borderColor: '#3498DB'
    },
    table: {
      headerBackgroundColor: '#3498DB',
      headerTextColor: '#FFFFFF',
      borderColor: '#DEE2E6'
    },
    list: {
      bulletColor: '#3498DB'
    }
  }
};
```

### 步骤五：测试主题

#### 测试内容

创建包含所有元素类型的测试文档：

```markdown
# 一级标题测试
## 二级标题测试
### 三级标题测试

这是普通段落，用于测试正文字体和颜色。

**粗体文本**和*斜体文本*测试。

- 无序列表项1
- 无序列表项2

1. 有序列表项1
2. 有序列表项2

> 这是引用内容，测试引用样式。

\`\`\`javascript
function test() {
  console.log('代码块测试');
}
\`\`\`

| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 内容1 | 内容2 | 内容3 |

**步骤一**：测试步骤说明样式
**步骤二**：测试步骤说明样式

**对比分析**：测试对比分析样式
```

#### 测试检查清单

- [ ] 标题层次清晰
- [ ] 正文可读性好
- [ ] 代码块对比度足够
- [ ] 引用样式突出
- [ ] 表格样式美观
- [ ] 列表符号清晰
- [ ] 整体风格统一
- [ ] 微信公众号兼容

## 样式属性说明

### 颜色值格式

#### 十六进制 (Hex)
```typescript
'#FF5733'    // 6位，推荐
'#F53'       // 3位，不推荐
'#FF5733CC'  // 8位，带透明度
```

#### RGB/RGBA
```typescript
'rgb(255, 87, 51)'
'rgba(255, 87, 51, 0.8)'
```

#### 颜色名称
```typescript
'red'
'blue'
'green'
```

### 字体属性

#### 字体族
```typescript
// 无衬线字体
'sans-serif'
'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

// 衬线字体
'serif'
'"Georgia", "Times New Roman", serif'

// 等宽字体
'monospace'
'"Consolas", "Monaco", monospace'
```

#### 字体栈
```typescript
// 优先使用系统字体
'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'

// 优先使用中文字体
'"Microsoft YaHei", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", sans-serif'

// 组合字体栈
'"Helvetica Neue", Helvetica, Arial, "PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", sans-serif'
```

### 间距属性

#### 段落间距
```typescript
'compact'   // 12px，紧凑
'standard'  // 20px，标准
'loose'     // 28px，宽松
```

#### 内边距和外边距
```typescript
// 代码块
padding: '16px'
margin: '20px 0'

// 引用
padding: '16px'
margin: '20px 0'

// 表格单元格
padding: '12px'
```

### 字号属性

#### 预设字号
```typescript
'small'   // 14px
'medium'  // 16px，推荐
'large'   // 18px
```

#### 标题字号
```typescript
// 基于正文字号自动计算
h1: baseSize + 8
h2: baseSize + 4
h3: baseSize + 2
```

### 边框属性

#### 边框样式
```typescript
border: '1px solid #e0e0e0'  // 实线边框
border: '2px dashed #e0e0e0' // 虚线边框
border: '4px solid #3498DB'  // 粗边框
```

#### 圆角
```typescript
borderRadius: '4px'   // 小圆角
borderRadius: '8px'   // 中圆角
borderRadius: '16px'  // 大圆角
```

## 主题最佳实践

### 配色原则

#### 60-30-10 法则
```typescript
const theme = {
  // 60% 主色（背景、正文）
  bodyFont: '#333333',
  
  // 30% 辅助色（标题、边框）
  headingColors: {
    h1: '#2C3E50',
    h2: '#34495E'
  },
  
  // 10% 强调色（按钮、链接）
  primaryColor: '#3498DB'
}
```

#### 对比度要求
- 正文与背景对比度 ≥ 4.5:1
- 大标题与背景对比度 ≥ 3:1
- 确保可访问性

#### 颜色数量限制
- 主色：1-2种
- 辅助色：2-3种
- 强调色：1种
- 总数不超过5种

### 字体选择

#### 可读性优先
```typescript
// ✅ 推荐
bodyFont: '"Microsoft YaHei", "PingFang SC", sans-serif'

// ❌ 不推荐
bodyFont: '"Comic Sans MS", cursive'
```

#### 字体大小层级
```typescript
// 建议的字号层级
h1: 24-32px
h2: 20-24px
h3: 18-20px
正文: 14-18px
小字: 12-14px
```

#### 行高设置
```typescript
// 推荐行高
标题: 1.2-1.4
正文: 1.6-1.8
代码: 1.5-1.6
```

### 间距设计

#### 一致性原则
```typescript
// 使用统一的间距单位
const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px'
}
```

#### 视觉节奏
```typescript
// 垂直节奏
段落间距: 20px
标题间距: 24px
元素间距: 16px
```

### 微信公众号适配

#### 限制使用
- 避免使用外部CSS
- 避免使用JavaScript
- 避免使用复杂动画
- 避免使用不支持的HTML5标签

#### 兼容性处理
```typescript
// ✅ 支持的标签
div, p, h1-h6, ul, ol, li, table, tr, td, th, img, blockquote, pre, code

// ❌ 不支持的标签
section, article, aside, nav, header, footer, main, figure, figcaption
```

#### 图片处理
```typescript
// 响应式图片
img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

## 主题调试技巧

### 开发者工具

#### Chrome DevTools
1. 右键点击元素 → 检查
2. 查看计算后的样式
3. 实时修改样式测试

#### 微信公众号编辑器
1. 粘贴生成的HTML
2. 查看实际效果
3. 调整不满意的样式

### 调试流程

#### 1. 本地预览
```bash
npm run dev
```

#### 2. 测试所有元素
- 标题层级
- 段落样式
- 列表样式
- 代码块
- 引用
- 表格
- 图片

#### 3. 微信测试
1. 复制HTML到微信公众号
2. 在不同设备上预览
3. 检查兼容性

#### 4. 迭代优化
- 根据测试结果调整
- 重复测试
- 确认最终效果

### 常见问题

#### 颜色不显示
**原因**：颜色值格式错误
**解决**：使用标准的十六进制格式

```typescript
// ❌ 错误
primaryColor: 'red'

// ✅ 正确
primaryColor: '#FF0000'
```

#### 字体不生效
**原因**：字体名称错误或字体不支持
**解决**：使用系统字体或Web安全字体

```typescript
// ❌ 错误
headingFont: 'MyCustomFont'

// ✅ 正确
headingFont: '"Microsoft YaHei", sans-serif'
```

#### 微信显示异常
**原因**：使用了不支持的CSS属性
**解决**：使用内联样式，避免复杂CSS

```typescript
// ❌ 错误
style="display: flex; justify-content: center;"

// ✅ 正确
style="text-align: center;"
```

## 主题分享与发布

### 主题文件结构

```typescript
// themes/my-theme.ts
export const myTheme: Theme = {
  id: 'my-theme',
  name: '我的主题',
  description: '主题描述',
  styles: {
    // 主题配置
  }
};
```

### 主题文档

创建主题说明文档：

```markdown
# 主题名称

## 主题描述

详细描述主题的特点和适用场景。

## 预览图

[主题预览图]

## 配色方案

- 主色：#3498DB
- 辅助色：#2C3E50
- 强调色：#E74C3C

## 适用场景

- 技术文档
- 商务报告
- ...

## 使用方法

1. 导入主题
2. 应用主题
3. 调整参数
```

### 主题发布

#### GitHub发布
1. 创建主题仓库
2. 提交主题文件
3. 编写README
4. 发布Release

#### NPM发布
```bash
npm init
npm publish
```

#### 社区分享
- 在技术社区分享
- 提供使用教程
- 收集用户反馈

## 主题示例库

### 简约主题

```typescript
{
  id: 'minimal',
  name: '简约风格',
  description: '简洁大方，黑白灰配色',
  styles: {
    primaryColor: '#333333',
    headingFont: '-apple-system, BlinkMacSystemFont, sans-serif',
    bodyFont: '-apple-system, BlinkMacSystemFont, sans-serif',
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
}
```

### 商务主题

```typescript
{
  id: 'business',
  name: '商务风格',
  description: '专业稳重，蓝色系配色',
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
}
```

### 科技主题

```typescript
{
  id: 'tech',
  name: '科技风格',
  description: '现代科技感，深色主题',
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
}
```

---

祝您创建出精美的主题！