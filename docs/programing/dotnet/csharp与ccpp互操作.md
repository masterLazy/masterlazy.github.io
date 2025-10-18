---
tags: [ccpp, csharp, dotnet]
---

# C# 与 C/C++ 互操作

本文介绍 C# 与 C/C++ 互操作的方法，尤重点介绍 P/Invoke。

## 为什么要互操作？

主要有两个原因：

- 用 C/C++ 编写算法核心代码，提高程序性能。
- 有一些库 / API 需要通过 C/C++ 调用。

## 两种方法

主要有两种方法：C++/CLI 和 P/Invoke。

### P/Invoke

P/Invoke（Platform Invoke，平台调用）严格来讲可以用来调用一切外部库（如 `.dll`、`.lib`）。但我们重点关注调用 C/C++。大概过程是：

- 用正常的 C/C++ 来编写代码。但注意写 C++ 时要按 C 导出，即 `extern "C"`。否则符号名会被修改，不好操作。
- 把 C/C++ 代码编译成 `.dll`。
- 在 C# 中写一个 “桥接” 类，用 `DllImport` 来导入 `.dll` 中的符号。（其实好像可以使用自动生成器来完成这一点）

P/Invoke 只能调用 C 风格的函数，而不能实现 “调用 C++ 中的类” 这样的需求。

### C++/CLI

> C++/CLI 是由 Microsoft 创建的一种语言规范，用于扩展 C++ 以支持 .NET 平台。它取代了托管 C++，成为连接本机 C++ 代码与托管 .NET 代码的桥梁。通过 C++/CLI，开发者可以在 .NET 应用程序中使用现有的 C++ 库，或者用 C++ 编写新的 .NET 应用程序和组件。
>
> C++/CLI 仅支持 Windows 平台，主要用于开发运行在 .NET 框架上的应用程序，而不适用于 WinUI 或 UWP 应用的开发。
>
> *摘自：[C++/CLI - Bing 搜索](https://cn.bing.com/search?q=C%2B%2B%2FCLI)*

C++/CLI 相当于微软发明的一种新语言，在 C++ 中加入了托管要素。好处是 C# 可以直接调用，不用写 P/Invoke 胶水代码。而且可以优雅地实现“调用 C++ 中的类” 这样的需求。

坏处呢？这个新的语言很复杂，既需要开发者熟悉 C++ 还要熟悉 C#，还有多出来的奇妙语法。

本篇不会介绍 C++/CLI，因为它太复杂了，笔者另开了一篇来介绍它：[C++/CLI](https://www.cnblogs.com/mLazy/p/19127088)。

## P/Invoke

以下例子摘自 [Microsoft Learn](https://learn.microsoft.com/zh-cn/dotnet/standard/native-interop/pinvoke)（笔者进行了翻译）：

```csharp
using System;
using System.Runtime.InteropServices;

public partial class Program
{
    // 导入 user32.dll（包含了我们需要的函数），
    // 并定义（与 .dll 中的本地函数）对等的方法
    [LibraryImport("user32.dll", StringMarshalling = StringMarshalling.Utf16, SetLastError = true)]
    private static partial int MessageBoxW(IntPtr hWnd, string lpText, string lpCaption, uint uType);

    public static void Main(string[] args)
    {
        // 像普通的托管方法一样调用
        MessageBoxW(IntPtr.Zero, "Command-line message box", "Attention!", 0);
    }
}
```

### `LibraryImport` 还是 `DllImport`

你可能会发现网上有的例子中用的是 `DllImport`，下面简单说明区别：

- `LibraryImport` 在 .NET 7 及之后的版本支持，`DllImport` 从 .NET Framework 1.1 就支持。
- 两者包含的字段不同。
- 据说 `LibraryImport` 更好一些

> - 在生成的代码中，在 .NET 7 之前使用的是 `DllImport`。 此声明使用 `extern` 关键字向运行时指示这是一个外部方法，并且在调用它时，运行时应会在 `DllImport` 属性中指定的非托管二进制文件中找到它。
>
> *摘自：[平台调用 (P/Invoke) - .NET | Microsoft Learn](https://learn.microsoft.com/zh-cn/dotnet/standard/native-interop/pinvoke)*

读者可以自行比较：[LibraryImport](https://learn.microsoft.com/zh-cn/dotnet/api/system.runtime.interopservices.libraryimportattribute)、[DllImport](https://learn.microsoft.com/zh-cn/dotnet/api/system.runtime.interopservices.dllimportattribute)。

### 构造和属性详解

下面我们还是用 `LibraryImport`，其常用的属性如下；其构造函数传递的字符串为 `LibraryName` 属性赋值。

| 字段              | 说明                                                         |
| ----------------- | ------------------------------------------------------------ |
| LibraryName       | 要导入的库的名称。在 Windows 平台上就是要导入的 `.dll`，Mac 是 `.dylib`，Linux 是 `.so.6`，等等。 |
| EntryPoint        | 要调用的入口点的名称，也就是要调用的函数名。此属性不用显示指定，默认会用和 C# 中声明的方法使用同样的名称。 |
| StringMarshalling | 指定如何将字符串参数封送给要调用的函数。此属性的类型是 [StringMarshalling 枚举](https://learn.microsoft.com/zh-cn/dotnet/api/system.runtime.interopservices.stringmarshalling)，有 `Custom`、`Utf8`、`Utf16` 三个枚举值。 |
| SetLastError      | 指定被调用函数返回之前会设置 `error`（Windows 平台上的`SetLastError()` 或其他平台上的 `errno`）。 |

### 参考

- [平台调用 (P/Invoke) - .NET | Microsoft Learn](https://learn.microsoft.com/zh-cn/dotnet/standard/native-interop/pinvoke) 以及相关 Microsoft Learn 文档
- [C#中的DllImport和LibraryImport有什么区别？ - 知乎](https://zhuanlan.zhihu.com/p/720752571)