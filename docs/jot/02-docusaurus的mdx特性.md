# Docusaurus 的 MD(X) 特性

Docusaurus 中特别的 Markdown 语法，按照笔者的使用频率排序。

这里的很多内容都摘自 [Docusaurus 介绍 | Docusaurus](https://docusaurus.io/zh-CN/docs)。

## 代码块

Docusaurus 提供了代码块标题、行号、高亮支持。

````markdown
```jsx title='/src/components/HelloCodeTitle.js' showLineNumbers
function HelloCodeTitle(props) {
  // highlight-next-line
  return <h1>Hello, {props.name}</h1>;
}
```
````
注：像上面这样，代码块中包括了 ` ``` `，应该用 ` ```` ` 开始这一个代码块。

```jsx title='/src/components/HelloCodeTitle.js' showLineNumbers
function HelloCodeTitle(props) {
  // highlight-next-line
  return <h1>Hello, {props.name}</h1>;
}
```

## 告示

```markdown
:::note[Your Title **with** some _Markdown_ `syntax`!]

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::
```

:::note[Your Title **with** some _Markdown_ `syntax`!]

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

总共有 `note`、`tip`、`info`、`warning`、`danger`。告示可以嵌套。

## 文档卡片

使用前需要引入 React 组件。

```jsx
import DocCardList from '@theme/DocCardList';

<DocCardList />
```

这个语法会显示同侧边栏内的所有项目。效果请见 [前言](intro)，这里就不放了。

## 更好看的 `<details>`

````markdown
<details>
  <summary>Toggle me!</summary>

  This is the detailed content

  ```js
  console.log("Markdown features including the code block are available");
  ```

  You can use Markdown here including **bold** and _italic_ text, and [inline link](https://docusaurus.io)
</details>
````

<details>
  <summary>Toggle me!</summary>

  This is the detailed content

  ```js
  console.log("Markdown features including the code block are available");
  ```

  You can use Markdown here including **bold** and _italic_ text, and [inline link](https://docusaurus.io)
</details>

## 选项卡

使用前需要引入 React 组件。

```markdown
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="apple" label="Apple" default>
    This is an apple 🍎
  </TabItem>
  <TabItem value="orange" label="Orange">
    This is an orange 🍊
  </TabItem>
  <TabItem value="banana" label="Banana">
    This is a banana 🍌
  </TabItem>
</Tabs>
```

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="apple" label="Apple" default>
    This is an apple 🍎
  </TabItem>
  <TabItem value="orange" label="Orange">
    This is an orange 🍊
  </TabItem>
  <TabItem value="banana" label="Banana">
    This is a banana 🍌
  </TabItem>
</Tabs>

---

选项卡之间可以同步选择：

```markdown
<Tabs groupId="operating-systems">
  <TabItem value="win" label="Windows">Use Ctrl + C to copy.</TabItem>
  <TabItem value="mac" label="macOS">Use Command + C to copy.</TabItem>
</Tabs>

<Tabs groupId="operating-systems">
  <TabItem value="win" label="Windows">Use Ctrl + V to paste.</TabItem>
  <TabItem value="mac" label="macOS">Use Command + V to paste.</TabItem>
</Tabs>
```

<Tabs groupId="operating-systems">
  <TabItem value="win" label="Windows">Use Ctrl + C to copy.</TabItem>
  <TabItem value="mac" label="macOS">Use Command + C to copy.</TabItem>
</Tabs>

<Tabs groupId="operating-systems">
  <TabItem value="win" label="Windows">Use Ctrl + V to paste.</TabItem>
  <TabItem value="mac" label="macOS">Use Command + V to paste.</TabItem>
</Tabs>

## 内联目录

使用前需要引入 React 组件。下面的注释只起到说明作用，实际写文档的时候不能写注释，否则无法通过编译。

```tsx
import TOCInline from '@theme/TOCInline';

<TOCInline
  // Only show h2 and h4 headings
  toc={toc.filter((node) => node.level === 2 || node.level === 4)}
  minHeadingLevel={2}
  // Show h4 headings in addition to the default h2 and h3 headings
  maxHeadingLevel={4}
/>
```

import TOCInline from '@theme/TOCInline';

<TOCInline
  toc={toc.filter((node) => node.level === 2 || node.level === 4)}
  minHeadingLevel={2}
  maxHeadingLevel={4}
/>

#### 这是一个 h4 标题