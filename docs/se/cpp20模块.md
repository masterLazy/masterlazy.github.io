---
tags: [c-cpp]
---

# C++ 20 模块

模块（modules）是 C++ 20 引入的一项新特性，提供了一种新的源代码组织模式，有望提升编译速度，同时提升开发体验。

本文编写时，不是所有编译器对此特性的支持都达到了 product-ready 的程度。MSVC 对模块的支持最好，各标准库都能以模块形式导入。但是仍有小小的瑕疵，主要是如果一个模块文件出了报错，整个模块内的所有文件的 IntelliSense 功能都会受影响。

点[这里](#模块带来的改观)直接跳转到新特性介绍。

## 引入

一般来说，在 C/C++ 中，我们使用 `#include` 来导入头文件。`#include` 是一个预处理指令，其原理简单粗暴，就是把目标头文件复制到 `#include` 处。预处理时每次都要进行这样的复制操作，这就拖慢了编译时间。当然，这还会导致下面的这些问题：

### 依赖问题

请看下面的例子：

<div className='column'>

```cpp
// Magic.h
#pragma once
#include <iostream>

void SayHello() {
    std::cout << "Hello!" << std::endl;
}
```

```cpp
// A.cpp
#include "Magic.h"

void SayHelloTwice() {
    SayHello();
    SayHello();
}
```

</div>

```cpp
// main.cpp
#include "Magic.h"

int main() {
    SayHello();
    return 0;
}
```

以上代码不能通过编译。笔者使用的 MSVC 报错如下：

```bash
LNK2005	"void __cdecl SayHello(void)" (?SayHello@@YAXXZ) 已经在 A.obj 中定义
LNK1169	找到一个或多个多重定义的符号
```

通常来说，我们不把函数的定义和声明都写在一个文件里就是因为这样。为了避免报错，我们得把 `Magic.h` 拆开：

<div className='column'>

```cpp
// Magic.h
#pragma once
#include <iostream>

void SayHello();
```

```cpp
// Magic.cpp
#include "Magic.h"

void SayHello() {
    std::cout << "Hello!" << std::endl;
}
```

</div>

这大概是 C/C++ 独有的代码组织模式吧。笔者实在是认为这样“分裂”的开发方式很不直观。每个函数的签名要写两次，编码和重构都不方便。

### 命名污染

按照传统的 `#include` 方式，目标头文件的所有符号都会被“导入”，包括宏定义等。这样不利于保持封装性，而且还会造成命名污染问题。使用命名空间可以一定程度上避免此问题（但命名空间不能隔离宏）。一个经典的例子就是 `windows.h`，其包含了很多宏定义，使用此头文件时可能会“意外”导入，造成一些奇妙的错误。

## 模块带来的改观

说了这么多，“模块”这个新特性是如何解决问题的？其关键在于新引入的三个关键字：`module`、`export`、`import`。

要使用模块来组织文件，需要把文件后缀名改成 `.ixx`。每个 `.ixx` 就称为“C++模块接口单元”。在 `.ixx` 中可以直接声明并定义函数，不需要分离。而且无需担心“单一定义规则”。这是由于**模块独立于导入它们的源文件进行编译**。也就是说，导入它们的源文件仅仅是引用了符号，并不真正“拥有”这个模块的代码。就好像只导入了 `.h` 中的声明，但是没有导入 `.cpp` 中的定义一样。

> 模块消除了或减少与头文件使用相关的许多问题。 它们通常会**减少编译时间**，有时会显著减少。 模块中声明的宏、预处理器指令和非导出名称在模块外部不可见。 它们对导入模块的翻译单元的编译没有影响。 **可以按任何顺序导入模块**，而无需考虑宏重新定义。 导入翻译单元中的声明不参与导入模块中的重载解析或名称查找。 编译一次模块后，结果将存储在描述所有导出的类型、函数和模板的二进制文件中。 **编译器可以比头文件更快地处理该文件**。 而且，编译器可以在项目中导入模块的每个位置**重复使用**它。
>
> *摘自 [C++中的模块概述 | Microsoft Learn](https://learn.microsoft.com/zh-cn/cpp/cpp/modules-cpp?view=msvc-170#module-partitions)，粗体是笔者加的*

### `module`

`.ixx` 文件中需要包含 `module` 声明，以指定文件内容属于命名模块（放在**文件开头**）。例如：

```cpp
module ModuleA;
```

`.ixx` 文件的剩下内容，语法与正常的 C++ 相同。

### `export`

`export` 用来指定导出什么内容。也就是说，我们可以精确控制导出什么、不导出什么，可以实现更精细化的控制。

首先，一般来说，每个 `.ixx` 文件需要包含至少一个 `export module` 声明，用于导出当前的模块（放在**文件开头**）。一般来说，一个 `.ixx` 中就导出一个模块。例如：

```cpp
export module ModuleA;
```

然后可以在需要导出的符号前使用 `export` 关键字修饰。`export` 可以修饰类、结构体、函数、变量、命名空间。当 `export` 应用于命名空间时，将导出命名空间中的所有符号。以下是一个例子：

```cpp
// ModuleA.ixx
export module ModuleA;

namespace ModuleA_NS {
    // 下面两个符号会被导出
    export int f();
    export double d();
    // 此符号不会被导出
    double internal_f();
}
```

非导入名称对于导入模块的代码而言不可见：

```cpp
import ModuleA;

int main() {
  ModuleA_NS::f(); // OK
  ModuleA_NS::d(); // OK
  ModuleA_NS::internal_f(); // error C2065: 'internal_f': undeclared identifier
}
```

### `import`

`import` 用来导入模块。 `import` 声明必须出现在 `module` 声明之后以及任何 `#include` 指令之后，但必须出现在文件中的任何声明之前。其实上面的那个例子已经给出了 `import` 的基本用法了。

值得注意的是，`import` 不能循环引用，必须保证引用关系是一个有向无环图。一个文件中的 `import` 语句，其先后顺序是无关紧要的。

### 模块分区

C++ 20 提供了一种“线性、并列”的模块分区模式，允许把一个模块拆分成若干个分区。分区不能嵌套。分区的关键语法是 `:`。

> 模块分区类似于模块，但以下情况除外：
>
> - 它共享整个模块中所有声明的所有权。
> - 分区接口文件导出的所有名称均由主接口文件导入和导出。
> - 分区的名称必须以模块名称开头，后跟冒号 （`:`）。
> - 任何分区中的声明在整个模块中可见。
> - 无需采取特殊预防措施来避免单定义规则（ODR）错误。 可以在一个分区中声明名称（函数、类等），并在另一个分区中定义它。
>
> *摘自 [C++中的模块概述 | Microsoft Learn](https://learn.microsoft.com/zh-cn/cpp/cpp/modules-cpp?view=msvc-170#module-partitions)*

例如笔者有一个模块 `Dew`，其分区就用 `Dew:String`，`Dew:Object` 来表示。每个分区可以在一个单独的文件中编写，并以这种表示法来声明，例如：

<div className='column'>

```cpp
// String.ixx
export module Dew:String;
// ...
```

```cpp
// Object.ixx
export module Dew:Object;
// ...
```

</div>

然后再创建一个 `Dew.ixx`，作为整个模块的“门面”：

```cpp
// Dew.ixx
export module Dew;
export import :String;
export import :Object;
```

用户在导入 `Dew` 时，仍用 `import Dew;`，不会感受到分区的存在（就像导入了单个 `.ixx` 一样）。不过用户确实可以导入特定的的某一个分区（而不是整个模块）。

## 参考

- [C++中的模块概述 | Microsoft Learn](https://learn.microsoft.com/zh-cn/cpp/cpp/modules-cpp?view=msvc-170)
- [模块，导入，导出 | Microsoft Learn](https://learn.microsoft.com/zh-cn/cpp/cpp/import-export-module?view=msvc-170)（本文中的部分文字和代码摘编自此）

还可以看看：

- [比较标头单元、模块和预编译标头 | Microsoft Learn](https://learn.microsoft.com/zh-cn/cpp/build/compare-inclusion-methods?view=msvc-170)

