# Docusaurus 的 React 组件

Docusaurus 提供的 React 组件（components）。

这里的有些内容  [Docusaurus 介绍 | Docusaurus](https://docusaurus.io/zh-CN/docs) 没有（以下 * 符号注明），笔者参考了 Docusaurus 的仓库：

> [docusaurus/packages/docusaurus-theme-classic/src/theme at main · facebook/docusaurus](https://github.com/facebook/docusaurus/tree/main/packages/docusaurus-theme-classic/src/theme)

## *文档卡片

```jsx
import DocCard from '@theme/DocCard';

<DocCard item={{type:'link',href:'https://www.luogu.com.cn',label:'洛谷',description:'计算机科学教育新生态'}} />
```

import DocCard from '@theme/DocCard';

<DocCard item={{type:'link',href:'https://www.luogu.com.cn',label:'洛谷',description:'计算机科学教育新生态'}} />

## 文档卡片列表

下面这个例子显示同侧边栏内的所有项目。效果见 [前言](intro)，这里就不放了。

```jsx
import DocCardList from '@theme/DocCardList';

<DocCardList />
```

## 选项卡

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

<details>
    <summary>高级用法：选项卡之间可以同步选择</summary>


    ```jsx
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
</details>

## 内联目录

下面的注释只起到说明作用，实际写文档的时候不能写注释，否则无法通过编译。

```jsx
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