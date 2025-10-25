---
tags: [ ramble ]
---

# 关于 mNotebook

> 名字来源：**m**asterLazy's **Notebook**。

谈谈关于 mNotebook 的想法。

## 初衷

手写笔记，笔者认为最大的缺点就是修改困难，无论是涂改带还是铅笔都不方便。用数字方式组织笔记就好得多。很久以前笔者用 Word 整理笔记，但是 Word 的格式之类的调起来很麻烦，如果要嵌入数学公式那更麻烦。后来笔者决定用 Markdown 记笔记，这样可以专注于内容，显示效果也不赖。

笔者之前一直用 Typora 打笔记，存在本地，问题就是要在不同设备上看笔记有点麻烦。而且 Typora 更多是编辑内容，没有一些高级的组织功能。Docusaurus 的文档组织功能就很强大，而且它还支持自定义 React 组件，可玩性很高。

总之，这就是一份 “最精致” 的笔记了。毕竟笔记肯定是要常看的，做得精致一点才有想看的欲望。mNotebook 中笔者 “塞了很多小细节”，一些笔者认为可以提升（主要是笔者自己）阅读体验的东西，见下面。

## 增强功能

下面是一些笔者为 mNotebook 编写的增强功能。

### `.invertable-img`

应用此 class 的 `<img>` 会在暗色模式下反转亮度，例如：

```tsx
<img src="/img/favicon.ico" className='invertable-img' style={{width:'128px'}} />
```

效果：<img src="/img/favicon.ico" className='invertable-img' style={{width:'128px'}} />

### `@site/src/components/Highlight`

类似荧光笔的高光效果，已适配深色模式。

```tsx
import Highlight from '@site/src/components/Highlight';

<Highlight>注意：</Highlight>这个组件不要在<Highlight>单行</Highlight>内使用，否则可能会出现<Highlight>排版异常</Highlight>！
<Highlight>$\sum_{i=1}^ni=(1+n)\times n/2$</Highlight>
```

import Highlight from '@site/src/components/Highlight';

效果：<Highlight>注意：</Highlight>这个组件不要在<Highlight>单行</Highlight>内使用，否则可能会出现<Highlight>排版异常</Highlight>！

### `@site/src/components/ColorDot`

一个带有颜色的小圆点，用于颜色编码。

```tsx
import ColorDot from '@site/src/components/ColorDot';

<ColorDot color='var(--ifm-color-primary-darkest)' /> <ColorDot color='var(--ifm-color-primary-darker)' /> <ColorDot color='var(--ifm-color-primary-dark)' /> <ColorDot color='var(--ifm-color-primary)' /> <ColorDot color='var(--ifm-color-primary-light)' /> <ColorDot color='var(--ifm-color-primary-lighter)' />  <ColorDot color='var(--ifm-color-primary-lightest)' />
```

import ColorDot from '@site/src/components/ColorDot';

效果：<ColorDot color='var(--ifm-color-primary-darkest)' /> <ColorDot color='var(--ifm-color-primary-darker)' /> <ColorDot color='var(--ifm-color-primary-dark)' /> <ColorDot color='var(--ifm-color-primary)' /> <ColorDot color='var(--ifm-color-primary-light)' /> <ColorDot color='var(--ifm-color-primary-lighter)' />  <ColorDot color='var(--ifm-color-primary-lightest)' />