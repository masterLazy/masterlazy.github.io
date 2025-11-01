---
tags: [ ramble ]
---

# ⭐ 关于 mNotebook

> 名字来源：**m**asterLazy's **Notebook**。

谈谈关于 mNotebook 的想法。

## 初衷

手写笔记，笔者认为最大的缺点就是修改困难，无论是涂改带还是铅笔都不方便。用数字方式组织笔记就好得多。很久以前笔者用 Word 整理笔记，但是 Word 的格式之类的调起来很麻烦，如果要嵌入数学公式那更麻烦。后来笔者决定用 Markdown 记笔记，这样可以专注于内容，显示效果也不赖。

笔者之前一直用 Typora 打笔记，存在本地，问题就是要在不同设备上看笔记有点麻烦。而且 Typora 更多是编辑内容，没有一些高级的组织功能。Docusaurus 的文档组织功能就很强大，而且它还支持自定义 React 组件，可玩性很高。

总之，这就是一份 “最精致” 的笔记了。毕竟笔记肯定是要常看的，做得精致一点才有想看的欲望。mNotebook 中笔者 “塞了很多小细节”——一些笔者认为可以提升（主要是笔者自己）阅读体验的东西，见下面。

## 增强功能

下面是一些笔者为 mNotebook 编写的增强功能。一些功能以 React 组件提供，已经预导入，无需额外配置。

### `.group`

推荐用此 class 修饰 `<div>`，使之成为一个 “卡片组”，可以自动根据显示宽度排布子项目（从左往右排，空间不足则换行）。一个典型的应用是排版图片。

```markdown
<div className='group'>
    <div className='card'>1</div>
    <div className='card card-big' >2</div>
    <div className='card'>3</div>
    <div className='card'>4</div>
    <div className='card card-big'>5</div>
    <div className='card card-big'>6</div>
    <div className='card card-big'>7</div>
    <div className='card'>8</div>
</div>
```
效果：
<style>{`
.card {
    width: 6rem;
    height: 6rem;
    background: var(--ifm-color-primary-paler);
    border: var(--ifm-color-primary) solid 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
}
.card-big { width: 12rem; }
`}</style>
<div className='group'>
    <div className='card'>1</div>
    <div className='card card-big' >2</div>
    <div className='card'>3</div>
    <div className='card'>4</div>
    <div className='card card-big'>5</div>
    <div className='card card-big'>6</div>
    <div className='card card-big'>7</div>
    <div className='card'>8</div>
</div>

---

### `<ColorDot>`

一个带有颜色的小圆点，用于颜色编码。默认的大小是 `1rem`，其带有轻微的阴影。

```markdown
<ColorDot color='var(--ifm-color-primary-darkest)' />
<ColorDot color='var(--ifm-color-primary-darker)' />
<ColorDot color='var(--ifm-color-primary-dark)' />
<ColorDot color='var(--ifm-color-primary)' />
<ColorDot color='var(--ifm-color-primary-light)' />
<ColorDot color='var(--ifm-color-primary-lighter)' size='1.5rem' />
<ColorDot color='var(--ifm-color-primary-lightest)' />
```

效果：
<ColorDot color='var(--ifm-color-primary-darkest)' />
<ColorDot color='var(--ifm-color-primary-darker)' />
<ColorDot color='var(--ifm-color-primary-dark)' />
<ColorDot color='var(--ifm-color-primary)' />
<ColorDot color='var(--ifm-color-primary-light)' />
<ColorDot color='var(--ifm-color-primary-lighter)' size='1.5rem' />
<ColorDot color='var(--ifm-color-primary-lightest)' />

---

### `<Highlight>`

类似荧光笔的高光效果，已适配深色模式。注意：这个组件不要独自成行（$\LaTeX$ 除外），否则可能会出现排版异常。

```markdown
这段话中的一些<Highlight>词语</Highlight>被高亮了。
```
效果：这段话中的一些<Highlight>词语</Highlight>被高亮了。

---

### `<Img>`

**强烈推荐**的图片插入方式。除了可以指定常规 `<img>` 的 `src`、`alt`，还可以：
- 添加属性 `invertable`，以在深色模式下反转图片颜色。
- 在其子元素中指定图片的描述，此描述将居中显示于图片下方。
- 指定 `maxHeight`，默认是 `23rem`。

另外，这样插入的图片还将拥有边框。

```markdown title='快速复制'
<div className='group'>
    <Img src='' invertable>
    </Img>
</div>
```

```markdown
<div className='group'>
    <Img src='/img/math/quadratic-curves.webp' invertable>
    $\text{Fig. 1: Quadratic curves}$
    </Img>
    <Img src='/img/math/ellipse-1.webp' invertable>
    $\text{Fig. 2: Ellipse}$
    </Img>
</div>
```
效果：
<div className='group'>
    <Img src='/img/math/quadratic-curves.webp' invertable>
    $\text{Fig. 1: Quadratic curves}$
    </Img>
    <Img src='/img/math/ellipse-1.webp' invertable>
    $\text{Fig. 2: Ellipse}$
    </Img>
</div>