---
tags: [csharp, standard]
---

# C# 代码规范

简单记录一下 C# 的代码规范。（不断更新…）

## 例子

```csharp
public class MagicClass { // 魔法类
    private int _magicNumber;
    public int MagicNumber { get; set; }
    
    public int MagicMethod(int number, int anotherNumber) {
        int magicSum = number + anotherNumber;
        return number + magicSum; 
    }
    public enum MagicEnum {
        ValueA, ValueB, ValueC
    }
}
```

下面说明具体的原则。

## 命名

- 私有字段：下划线 + 小驼峰
- 公有字段、属性：大驼峰
- 方法：方法名、实参、内部变量都用小驼峰
- 枚举：枚举名、枚举值都用大驼峰

## 其他规范

- 单行注释：空格 + `//` + 空格 + 具体内容
- 属性声明和方法声明之间留空行
- 尽量用公有属性而不是字段（`const` 或 `readonly` 除外）

## 参考

- [.NET 编码约定 - C# | Microsoft Learn](https://learn.microsoft.com/zh-cn/dotnet/csharp/fundamentals/coding-style/coding-conventions)
- [C# Coding Style](https://github.com/dotnet/runtime/blob/main/docs/coding-guidelines/coding-style.md)