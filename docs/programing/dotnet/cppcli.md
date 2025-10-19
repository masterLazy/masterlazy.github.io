---
tags: [ccpp, csharp, dotnet]
---
# C++/CLI

> C++/CLI 仅在 Windows 上受支持。

C++/CLI 是微软在 C++ 的基础上发明的一个语言（相当于 C++ 的超集），它扩展了 C++ 以支持 .NET；同时还可用于 [C# 与 C/C++ 互操作](csharp与ccpp互操作)。

> 微软似乎不太建议新的项目使用 C++/CLI：
>
> “对于新项目，我们建议探索现代第三方替代方案，例如 [https://github.com/dotnet/ClangSharp](https://github.com/dotnet/ClangSharp) 或 [https://www.swig.org/](https://www.swig.org/)，它们提供更大的灵活性并更好地与当前语言和运行时功能保持一致。”
>
> *摘自：[使用 C++/CLI 进行 .NET 编程 |Microsoft Learn](https://learn.microsoft.com/en-us/cpp/dotnet/dotnet-programming-with-cpp-cli-visual-cpp)，由 Edge 翻译*

相比 C++，C++/CLI 加了一堆乱七八糟的语法，用来和 CLR 打交道。本篇会详细介绍这些语法。

## 先决条件

使用 C++/CLI 前需要进行额外配置：

> 安装 Visual Studio C++ 工作负载时，默认情况下不安装 C++/CLI。 若要在安装 Visual Studio 后安装组件，请通过选择 Windows “开始”菜单并搜索 **Visual Studio 安装程序**打开 Visual Studio 安装程序。 选择安装的 Visual Studio 版本旁边的“修改”按钮。 选择“单个组件”选项卡。向下滚动到“编译器、生成工具和运行时”部分，然后选择“适用于 v143 生成工具的 C++/CLI 支持（最新版本）”。 选择“修改”以下载所需的文件并更新 Visual Studio。
>
> *摘自：[使用 C++/CLI 进行 .NET 编程 | Microsoft Learn](https://learn.microsoft.com/zh-cn/cpp/dotnet/dotnet-programming-with-cpp-cli-visual-cpp)*

配置完后，你应该会在 Visual Studio 的 “新建项目” 发现这些多出来的项目：

![](https://i.ibb.co/vtFqRCj/2025-10-04-210037.jpg)

“CLR” 指的是 Common Language Runtime（公共语言运行时）。总之就是我们想要的 C++/CLI。

> C++/CLI 中的 CLI 指的是 Common Language Infrastructure（公共语言基础设施）。不要和 Command-Line Interface（命令行界面）搞混了。
>
> 欲详细了解，可参考：[.NET学习笔记 -- 那堆名词到底是啥（CLR、CLI、CTS、CLS、IL、JIT） - 红心李 - 博客园](https://www.cnblogs.com/xiekeli/p/4680846.html)

- 如果你只是想写一个程序，和 C# 没关系，就选 “CLR 控制台应用”；
- 如果你想要与 C# 交互，就选 “CLR 类库”；
- 如果选择 “CLR 空项目”，你需要手动配置 “引用” 才能正常使用 .NET 功能（例如添加 `mscorlib`、`System` 等）。

（另外还要注意 .NET 和 .NET Framework 的区别。）

C++/CLI 项目会启用编译指令 `/clr`。这可以在 “配置属性 > C/C++ > 常规 > 公共语言运行时支持” 中找到。

## 使用 BCL

在 C++/CLI 中使用 BCL 和 C# 十分类似，除了命名空间相关语法稍有不同：

```cpp
using namespace System; // C# 中是 using System;
int main() {
	Console::WriteLine("Hello, world!");
	return 0;
}
```

## 定义托管类、托管结构体

这一节要介绍的内容实际上与下一节紧密相关。C++ 的类、结构体不能在 GC 堆上分配。为了在 GC 堆上分配，必须定义托管类、托管结构体。

其语法与 C# 类似，这里仅举两个例子：

```cpp
ref class MyRefClass {
    
}; // C++ 是需要分号的
```

```cpp
value class MyValueClass {
    
};
```

## 使用 GC 堆

C++/CLI 支持了和 C# 类似的自动内存管理功能，允许我们愉快地使用 GC（Garbage Collection，垃圾回收器）。具体来说，我们会通过特定的语法在 GC 堆（Garbage Collected Heap）上申请内存。这样申请的对象，其会在引用计数归零后由 GC 自动回收。

让我们看两个例子吧：

```cpp
int^ i = gcnew int;
MyRefClass^ c = gcnew MyRefClass();
```

我们用 C++/CLI 关键字 `gcnew` 在 GC 堆上分配内存，语法和 `new` 类似。在 GC 堆上分配内存的类型必须为托管类型，其包括：

- 基础类型，如 `int`（实际上会这里会被隐式转换为 `System.Int32`）；
- 托管类、托管结构体（见上一小节）。

我们得到的这个 `int^`，称为 “**句柄**（handle）”。句柄的行为和指针类似（但不支持指针算术），请看这个例子：

```cpp
using namespace System;
int main() {
	int^ i = gcnew int;
	Console::WriteLine(i);
	Console::WriteLine(*i);
	i = 13;
	Console::WriteLine(i);
	Console::WriteLine(*i);
	*i = 17;
	Console::WriteLine(i);
	Console::WriteLine(*i);
	return 0;
}
```

其中 `*i` 可以看作是对句柄的解引用。此程序的输出：

```text
0
0
13
13
17
17
```

从中可以发现使用 `*i` 和 `i` 赋值是等价的。使用 .NET 相关方法时也是等价的，但对于标准 C++ 函数则不是，例如使用标准输出流：

```cpp
std::cout << *i;
```

这是因为 `i` 的类型是 `int^`（句柄），STL 显然不支持，而 `*i` 就是 `int`，STL显然支持。

### 跟踪引用（Tracking Reference）

C++/CLI 引入了跟踪引用运算符（Tracking Reference Operator），即 `%`，Microsoft 给出的介绍如下：

> 跟踪引用有以下特征。
>
> - 将一个对象分配至跟踪引用将导致对象的引用计数增加。
> - 原生引用（`&`）是 `*` 解引用的结果。跟踪引用（`%`）是 `^` 解引用的结果。只要你有一个对象的 `%`（跟踪引用），此对象就会在内存中保持活动状态（stay alive）。
> - 成员访问符（`.`）用于访问成员。
> - 跟踪引用是对值类型和句柄有效的类型（例如 `String^`）。（注：这句话应该是说跟踪引用可以传参给值类型和句柄。）
> - 跟踪引用不能被分配为 `nullptr`。跟踪引用可根据需要分配给多个有效对象。
> - 跟踪引用运算符（`%`）不能用作一元取址运算符。（注：即 `%` 不能像 `&` 那样用于取址。）
>
> *摘自：[Tracking Reference Operator (C++/CLI and C++/CX) | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/extensions/tracking-reference-operator-cpp-component-extensions)，由笔者翻译*

请看例子：

```cpp
int^ i = gcnew int;
int% myRef = *i; // 将 i 解引用并赋给 myRef
int^% handleRef = i; // handleRef 是句柄的引用

int^ j = myRef; // "跟踪引用是对值类型和句柄有效的类型"
```

## 参考

- [使用 C++/CLI 进行 .NET 编程 | Microsoft Learn](https://learn.microsoft.com/zh-cn/cpp/dotnet/dotnet-programming-with-cpp-cli-visual-cpp)
- [适用于 .NET 和 UWP 的组件扩展 | Microsoft Learn](https://learn.microsoft.com/zh-cn/cpp/extensions/component-extensions-for-runtime-platforms)

> 微软真坑，居然把同样主题的内容放在两个地方。这两个文档互相引用，笔者查阅的时候很麻烦。