---
tags: [csharp]
---



# C# 空引用

C# 的引用类型（如 `string`）可以被赋值为 `null`，表示**空引用**。此时的引用并不指向任何对象。对空引用解引用会引发  `NullPointerException` 异常。例如：

```csharp
string str = null;
Console.WriteLine(str.Length);
/* Unhandled exception. System.NullReferenceException: Object reference not set to an instance of an object. */
```

本文将介绍程序中处理 `null` 的有关事宜。

## `null` 判断

首先是朴素的判断方法：

```csharp
if (str == null) {
    // ...
} else {
    // ...
}
```

### 使用模式匹配

模式匹配（C# 7.0 开始引入）据说性能更好。如果要判断的对象重载了 `==`（`!=`），那么使用 `==`（`!=`）来判断是否为 `null` 就比较危险。模式匹配的语法如下：

```csharp
if (str is null) {
    // ...
} // 也可以用 else，这里只是为了演示
if (str is not null) {
    // ...
}
```

建议优先使用模式匹配。

## 可空类型修饰符 `?`

前文提到，只有引用类型可以被赋值为 `null`。对于值类型（如 `int`），我们可以在类型后面加上“可空类型修饰符”来使其可空：

```csharp
int? i = null; // OK
```

### 明示可空

虽然引用类型不需要额外声明都可以为空，但从设计哲学的角度讲，我们声明了一个变量，就说明“期望它不是空的”；如果某变量确实有可能出现空引用，应该用可空类型修饰符来明示这一点。

这将有助于提示开发者合适需要检查是否为空引用、何时可以放心解引用。编译器也可以做更多编译期的静态检查，帮助排查空引用导致的问题。

```csharp
string str0 = null; // 警告：将 null 文本或可能的 null 值转换为不可为 null 类型。
string? str = null; // OK
```

类似地，假如我们有函数：

```csharp
private static void foo(string str) {}
```

如果我们尝试传入 `null`，会触发警告：

```csharp
string? nullStr = null;
foo(nullStr); // 警告：可能传入 null 引用实参。
```

这时因为我们声明 `foo` 时表达了“期望传入非空实参”。如果想表达“传入的实参可以为空”，则需要修改声明：

```csharp
private static void foo(string? str) {}
```

对于类的引用类型成员，如果我们在退出构造函数时无法保证其值不为空，也应该用可空类型修饰符修饰。

## Null 包容运算符 `!`

有时，我们希望让编译器相信某变量是非空的（通常是为了抑制警告），那么就可以用 null 包容运算符来明示这一点：

```csharp
string? nullStr = null;
foo(nullStr!); // 没有警告
```

## Null 条件运算符 `?.` `?[]`

Null 条件运算符用于简化一些 `null` 判断逻辑。请看下面的例子：

```csharp
var len = str?.Length; // len 是 int?
```

此代码等价于：

```csharp
int? len;
if (str != null) len = str.Length;
else len = null;
```

如果我们不使用 `?.`，在执行 `str.Length` 的时候可能会对空引用解引用。而使用 `?.` 就避免了此问题。

类似地，`?[]` 用法如下：

```csharp
var i = numbers?[0];
```

此代码等价于：

```csharp
int? i;
if (numbers != null) i = numbers[0];
else i = null;
```

### Null 条件访问表达式分配

从 C# 14 开始，允许对引用类型使用 null 条件访问表达式（`?.` 和 `?[]`）分配。例如：

```csharp
person?.FirstName = "Scott";
messages?[5] = "five";
```

## Null 合并运算符 `??` `??=`

Null 合并运算符用于简化  `null` 值的检查。如果左侧的操作数不为 `null`，则返回该值；如果为 `null`，则返回右侧的操作数的值。例如：

```csharp
var c = a ?? b; // a, b 是 int
```

此代码等价于：

```csharp
int? c;
if (a != null) c = b;
else c = a;
```

类似地，还有 `??=`，这里就不展开了。

## 参考

- [详解在C#中的NULL - 知乎](https://zhuanlan.zhihu.com/p/693521583)
- [可以为 null 的值类型 - C# reference | Microsoft Learn](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/builtin-types/nullable-value-types)
- [!（null 包容）运算符 - C# reference | Microsoft Learn](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/operators/null-forgiving)
- [成员访问和 Null 条件运算符和表达式： - C# reference | Microsoft Learn](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/operators/member-access-operators)
- [?? 和 ??= 运算符 - Null 合并操作符 - C# reference | Microsoft Learn](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/operators/null-coalescing-operator)