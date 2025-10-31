---
tags: [ccpp, stack, ramble]
---
# C++ GUI 选型记

## 前言

若干年前，我入门了 C++，写了一个控制台贪吃蛇，觉得自己逐渐理解一切……

“我想创建 GUI！” 于是漫长的选型过程开始了。

### 概念

还是有必要阐释一下这几个概念：

- GUI：图形用户界面，其实是很宽泛的概念，图形化的程序界面都算。
- UI：用户界面，我觉得更强调 “和用户交互”，比如一个按钮、一个输入框等。
- 绘图库：只提供绘制（或者图形渲染服务），你可以用它画一个三角形、矩形，可以显示图片，但是做 UI 有点难。
- UI 库：提供 UI 功能，一方面是不需要自己画按钮，另一方面是提供事件处理等服务。

## EasyX

我第一个用的是 EasyX，当时用它写了蛮多程序的。

主页：[EasyX Graphics Library for C++](https://easyx.cn/)

文档：[EasyX 文档 - 基本说明](https://docs.easyx.cn/zh-cn/intro)

<div className='group'>
    <Img src='https://easyx.cn/f/a/0/0/6/setup-vc2010-4.1.png' invertable>
        图自：https://easyx.cn/setup
    </Img>
</div>



EasyX 是一个绘图库，这意味着它是没有 UI 功能的。但是 EasyX 非常简单！如果你是刚学会 `printf()` 或者 `cout <<` 的初学者，你一定会觉得上手 EasyX 很轻松。就看这个例子吧：

```cpp
// 自 https://www.luogu.com.cn/article/9eazh2lm，略有修改
#include <easyx.h>
int main() {
    initgraph(480,600); // 初始化窗口
    setlinecolor(WHITE);
    setfillcolor(RED);
    fillrectangle(150, 60, 200, 85); // 画一个矩形
    Sleep(5000);
    closegraph(); // 关闭窗口
    return 0;
}
```

我曾用 EasyX 写过蛮多程序的，如今仅仅是注视着这些程序的名字，就令我十分怀念：

```
贝塞尔曲线、单摆、单摆2、物理-粒子撞圆柱阵、五子棋、樱花树
```

当时我甚至用 EasyX 写了一个小小的、简陋的 UT 同人小游戏，可惜现在找不到了。

EasyX 默认是没有抗锯齿的，需要自己实现。

EasyX 带来了无尽的绘图的乐趣。但是没有 UI 功能，和用户的交互很有限。

## Windows API

事实上直接使用 Windows API 做 GUI 是很折磨且不明智的。

当时我看的教程：[【SDK开发】《Windows程序设计》](https://www.bilibili.com/video/BV1us411A7UE/)

> 你可能注意到了，那个视频讲的是 “Windows SDK”。两者的区别比较微妙，我这里想强调我直接使用那些 API 接口来编程，所以写的是 Windows API。

确实，你可以用 Windows API 来创建窗口、控件。虽然自己写一遍窗口过程挺折磨的（实际上原本开发 GUI 不需要管这么多底层过程的）。这里放一段创建控件的代码，我们鉴赏一下：

```cpp
// 创建轨道条
hTrackbar[0] = CreateWindow(TRACKBAR_CLASS,
    L"",
    WS_CHILD | WS_VISIBLE | TBS_NOTICKS,
    0, 0, 0, 0,
    hWnd, (HMENU)4,
    NULL, NULL);
// 设置
SendMessage(hTrackbar[0], TBM_SETRANGEMIN, true, 0.5 * 2); // 设置最小值
SendMessage(hTrackbar[0], TBM_SETRANGEMAX, true, 150 * 2); // 设置最大值
SendMessage(hTrackbar[0], TBM_SETPOS, true, 1 * 2); // 设置默认值
```

可以看到，我为了设置这个轨道条的属性，还要手动发送消息，现在看来真是十分繁琐。可就是这么繁琐的实现方法，我也用了一段时间，写了几个程序。

比如这个：[自制程序-八种排序的可视化](https://www.bilibili.com/video/BV1YQ4y1Q78m/)（上面的代码片段就摘自这个程序）

### GDI (和 GDI+)

Windows API 提供的绘图功能实际上叫做 GDI（Graphics Device Interface，图形设备接口）。

GDI 是 “历史悠久” 的图形组件，事实上已经过时了。GDI 也没有抗锯齿。而且其十分低级，比如需要自己实现 “双缓冲机制”。

## Direct2D

Direct2D 是一个绘图库，没有 UI 功能。但如果你使用 Visual C++，可以把它和 Windows API 搭配使用。Direct2D 的绘图更加强大，抗锯齿什么的自然不在话下。（当然比 GDI 强）

当时我看的教程：[Direct2D Tutorial](https://www.bilibili.com/video/BV125411V74f/)（是的这个是英文的，当时我居然看得下去）

直接用 Direct2D 的 API 还绘图显然也不太方便。当时我跟着那个教程搭建了一个自己的包装，像是这样：

```cpp
class Graphics
{
private:
	ID2D1Factory* pFactory;				// Direct2D的接口
	IDWriteFactory* pWriteFactory;		// DirectWrite的接口
	ID2D1RenderTarget* pRenderTarget;	// 渲染目标
    // ...
public:
    void draw_line(float x1, float y1, float x2, float y2, Brush_t* brush, float lineWidth = 1);

    // 绘制矩形
    void draw_rectangle(float left, float top, float right, float bottom, Brush_t* brush, float lineWidth = 1);
    void fill_rectangle(float left, float top, float right, float bottom, Brush_t* brush);

    // 绘制圆角矩形
    void draw_r_rectangle(float left, float top, float right, float bottom, float r, Brush_t* brush, float lineWidth = 1);
    void fill_r_rectangle(float left, float top, float right, float bottom, float r, Brush_t* brush);

    // 绘制椭圆
    void draw_ellipse(float x, float y, float width, float height, Brush_t* brush, float lineWidth = 1);
    void fill_ellipse(float x, float y, float width, float height, Brush_t* brush);

    // 绘制正圆
    void draw_circle(float x, float y, float r, Brush_t* brush, float lineWidth = 1);
    void fill_circle(float x, float y, float r, Brush_t* brush);
    
    // ...
}
```

实际上，当时我基本上是按照 EasyX 的方式来封装这些接口。基于我自己封装的接口，我也写了几个程序：

```
三体问题渐进解、手写数字识别（搭配 TensorFlow）、探索复平面
```

我记得我还尝试过用 Direct2D 重写我的 “五子棋” 程序，不过好像没有做完。

## OpenGL（GLFW）

我尝试过学习这个，想学的原因是跨平台。可是没学会，也许是因为太复杂了吧。

OpenGL 也是绘图库，仍然没有 UI 功能。

## MFC

当时在学 Windows API 的时候就注意到 MFC 了。我没有用 MFC 构建过什么程序，基本上。

事实上，MFC 是蛮旧的框架了，并不适合开发新的软件。

## Qt

大名鼎鼎的 Qt，我光是安装就费了半天，因为 SDK 很大。Qt 有自己的 Qt Creator，但是我当时用不惯。于是我开始用 Visual Studio 写代码，用 Qt Creator 构建，勉强还行。我觉得 Qt 做出来的 UI 并不好看。事实上可以用 QSS 来自定义控件样式。当时我上网找了模板，也尝试自己搓，但是始终不满意。最终，我没有深入去学 Qt。

> 似乎现在有 QML 这样高级的东西了？我没有深入研究过，读者可以研究一下。

## 尾声...

好难找到合适的技术。我还尝试了：

- wxWidgets
- ImGui
- FLTK
- 别的什么…

…但总不是很满意。后来我认定了，用 C++ 开发 GUI 注定是痛苦的。

后来我又探索了 Dart（写了代码）、C#（写了代码）、Java（没写代码）的 GUI，后来选定了 C# + WPF 的方案。目前来说，这仍是我采用的技术栈。