# WPF Fluent 使用指南

:::info

本文基于 .NET10 编写。

:::

从 .NET9 开始，WPF 开始支持部分 [Fluent 2](https://fluent2.microsoft.design/) 控件。.NET10 又提供了更完善的支持。Fluent2 相比 WPF 的默认主题要好看得多（似乎主要对于 Win10 用户，因为 Win11 中默认主题似乎就是类似 Fluent2 的。这方面笔者未深究。）

Microsoft Store 中可以找到一款软件：[WPF Gallery](https://apps.microsoft.com/detail/9ndlx60wx4kq)。可以在其中体验 WPF 对 Fluent2 的支持。同时其也是很好的开发参考。

除了使用 .NET SDK 提供的组件，一些第三方开发者也编写了 WPF 主题插件（如 [iNKORE-NET/UI.WPF.Modern](https://github.com/iNKORE-NET/UI.WPF.Modern)），这不在本文讨论范围内。

## 启用 Fluent 主题

在 App.xaml 加入下面 `<ResourceDictionary>` 中的内容即可：

```xml
<Application.Resources>
    <ResourceDictionary>
        <!--Fluent-->
        <ResourceDictionary.MergedDictionaries>
            <ResourceDictionary Source="pack://application:,,,/PresentationFramework.Fluent;component/Themes/Fluent.xaml" />
        </ResourceDictionary.MergedDictionaries>
    </ResourceDictionary>
</Application.Resources>
```

## 按钮

如下图，左侧是强调（Accent）按钮，右侧是默认的按钮样式。

<Img>

![_image (728×440)](https://fluent2.microsoft.design/_image?href=https%3A%2F%2Ffluent2websitecdn.azureedge.net%2Fcdn%2Fbutton6.GuDqDYc9.webp)

</Img>

要启用强调按钮，只需像下面这样设置 `Style`：

```xml
<Button Style="{DynamicResource AccentButtonStyle}" Content="WPF Accent Button" />
```

或者，如果你希望在 Code-behind 中设置强调样式，也可以这样写：

```csharp
btn.SetResourceReference(StyleProperty, "AccentButtonStyle");
```

按钮的默认样式是 `DefaultButtonStyle`。

## GridView 右键菜单

由于 .NET 10 SDK 内部的一些 bug（大概），在为 GridView 设置右键菜单（ContextMenu）时会丢失 Fluent 样式。

参考 [How to set ContextMenu for GridView without breaking Fluent Theme?](https://github.com/dotnet/wpf/discussions/11133) 这个讨论，可以用下面的方式确保 Fluent 样式正确启用：

```xml
<ListView ItemsSource="{Binding Source={StaticResource EmployeeInfoDataSource}}">
    <!--Menu-->
    <ListView.ItemContainerStyle>
        <!-- highlight-next-line -->
        <Style TargetType="ListViewItem" BasedOn="{StaticResource {x:Static GridView.GridViewItemContainerStyleKey}}">
            <Setter Property="ContextMenu">
                ...
            </Setter>
        </Style>
    </ListView.ItemContainerStyle>
    <!--List-->
    <ListView.View>
        ...
    </ListView.View>
</ListView>
```

