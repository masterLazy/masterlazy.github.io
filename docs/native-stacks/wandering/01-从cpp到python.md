---
tags: [python, ccpp]
---
# 从 C++ 到 Python

带 C++ 程序员快速上手 Python。

## 一、注释

```python
# 单行注释

'''多行注释'''

"""多行注释"""
```

## 二、字符串

```python
'Hello, python!'
# 单、双引号都可以，没有区别
# 倾向于用单引号
```

## 三、I/O与变量

```python
# 输出
print('Hello, python!')
# Python句末可以没有分号
# 倾向于用没有分号

# 输入
a = input() # Python变量无需声明
b = input('Enter b: ') # 提示用户要输入的内容
```

## 四、基本数据类型及其转换

在本节中，无特殊说明的引用都摘自 [Python六大基本数据类型](https://blog.csdn.net/xieminglu/article/details/124260040)，略有删改。更多信息可以看看原文。

### 数字（number）

数字又分为 int，float，complex（复数） 三种。（Python 2 中还有 long，在 Python 3 中已取消。）又有 bool（值为 `True` 或 `False`），它是 int 的子类。

> 复数（complex）由实数部分和虚数部分构成，可以用a + bj，或者 complex(a, b) 表示， 复数的实部 a 和虚部 b 都是浮点型。
> 在 Python 中定义整数的大小没有限制，可以是一个无限大的整数，比如：
> a  = 123456789123456789
> 如果数字的长度过长时，可以使用下划线作为分隔符，比如：
> a  = 123_345_789_123_456_789
>
> 其他进制的整数：
> 十进制：不能以0开头
> 二进制：以0b开头
> 八进制：以0o开头
> 十六进制：以0x开头
> 但是注意，所有以其他进制定义的整数，输出结果均为十进制

```python
# 创建
i = 1
f = 1.0
z = 1 + 2j # 不是1 + 2i
```

> int(x)：将x转换为一个整数。
>
> float(x)：将x转换到一个浮点数。
>
> complex(x)：将x转换到一个复数，实数部分为 x，虚数部分为 0。
>
> complex(x, y)：将 x 和 y 转换到一个复数，实数部分为 x，虚数部分为 y。

### 字符串（string）

Python 中没有字符类型。

```python
# 创建
str 'hello'
```

以下内容摘自 [python截取字符串(字符串切片)](https://www.cnblogs.com/xujiecnblogs/p/16732743.html)，略有改动。

```python
s = 'python'
print(s)            # 输出：python
# 从前面截取
print(s[1])         # 输出：y，根据下标取字符
print(s[:])         # 输出：python，从头取到尾 
print(s[1:])        # 输出：ython，下标1开始，取到结尾
print(s[0:2])       # 输出：py，下标0开始，取到下标2，顾头不顾尾，所有不包含下标2
print(s[0:100])     # 输出：python，束位置即使超出字符串实际长度，也不影响正常切片操作
# 从后面截取
print(s[-1])        # 输出：n，根据下标取字符
print(s[-1:-3])     # 无输出，切片要遵循从左向右切的规则
print(s[-3:-1])     # 输出：ho，从下标-3开始，取到下标-1，顾头不顾尾，所有不包含下标-1
```

### 列表（list）

列表的截取方法与字符串差不多。

```python
# 创建
a = [1,2,3]
b = [3,2,1]

# 访问（其实就是截取）
print(a[0])#输出：1

# 运算
print(a + b) # 输出：[1, 2, 3, 3, 2, 1]，把b拼接到a末尾
print(a * 2) # 输出：[1, 2, 3, 1, 2, 3]，把a重复两遍

# 检查是否包含某元素
print(1 in a) # 输出：True

# 函数
print(len(a)) # 输出：3，a的长度
print(min(a)) # 输出：1，a中的最小值
print(max(a)) # 输出：3，a中的最大值
```

### 元组（tuple）

> 一个不可变的序列
> 创建tuple元组，使用()，多个值之间用逗号隔开，注意()括号可以省略不写，但是如果tuple元组中的元素只有一个时，也必须使用，元素才能证明是一个tuple类型的变量

```python
#创建
t1 = (1,2,3)
t2 = 1,2,3
```

### 集合（set）

### 字典（dictionary）

以上两者本文不介绍。

### 类型检查

```python
print(type('hello')) # 输出：<class 'str'>
```

## 五、基本运算

Python 中没有 `++` 和 `--`。

| 语句                    | 含义     | 语句                    | 含义  |
| ----------------------- | -------- | ----------------------- | ----- |
| `a // b`（有`a //= b`） | 整数除法 | `a ** b`（有`a **= b`） | $a^b$ |
| `!=` 或 `<>`            | 不等于   | `and`                   | 与    |
| `or`                    | 或       | `not`                   | 非    |

没提到的与 C++ 一样。

```python
print(1 + 1) # 输出：2
print(1.0 + 1.0) # 输出：2.0
print('1' + '1') # 输出：11
```

```python
# A+B Problem.py
a = input('Enter a: ')
b = input('Enter b: ')
print(int(a) + int(b))
```

## 六、控制语句

Python 与 C++ 的区别：

- 没有括号，但是末尾要加 `:`。
- 没有大括号，靠缩进区分。

### if、else

```python
# even-odd.py
a = input('Enter a number: ')
if int(a) % 2 == 0:
	print('even')
else:
	print('odd')
```

### while

```python
# while.py
i = 0
while i < 100:
    print(i)
    i += 1
```

### for

```python
# for.py
for a in 'hello':
    print(a)
```

还可以搭配 `range()` 使用。

#### range()

> ### 函数语法
>
> ```
> range(start, stop[, step])
> ```
>
> 参数说明：
>
> - start: 计数从 start 开始。默认是从 0 开始。例如range（5）等价于range（0， 5）;
> - stop: 计数到 stop 结束，**但不包括 stop**。例如：range（0， 5） 是[0, 1, 2, 3, 4]没有5
> - step：步长，默认为1。例如：range（0， 5） 等价于 range(0, 5, 1)
>
> _摘自 [Python range() 函数用法](https://www.runoob.com/python/python-func-range.html)_

```python
# sum.py
sum = 0
for i in range(101):
    sum+=i
print(sum)
```

输出：

```
5050
```

### break、continue

略。

## 七、函数

```python
# 定义
def func(a, b): # 与控制语句一样，此处要加冒号
	return a + b # 可以不return，此时将自动return None

# 调用
print(func(1, 2)) # 输出：3
print(func(a = 1, b = 2)) # 输出同上
print(func('a', 'b')) # 输出：ab
```

以下内容摘自 [python基础知识之函数的定义及用法](https://blog.csdn.net/MXB1220/article/details/127112918)。

``` python
# 拆包
def func():
    return 11,22,33   # 当返回结果有多个值时，会以元组的形式返回
 
c1 = func()
print(c1)    # 返回的是一个元组（11,22,33）
 
a,b,c =func()   # 可以通过变量把返回的元组进行拆包，接收对应的值，a接收了11,b接收了22，c接收了33
print(a,b,c)   # 返回对应的元素11,22,33
```

## 八、模块

Python 的一大优点就是其拥有大量、优质的库。

### pip

在 Python 中安装库可以使用 pip。Python 内置 pip。以下是它的使用教程。

#### 检查更新

建议每次使用 pip 前先要检查更新。打开 PowerShell。如果你没有设置环境变量的话，需要在 `python.exe` 的目录下打开。（比如 Python3.31 的目录是 `C:\Users\Administrator\AppData\Local\Programs\Python\Python311\`。）

在 PowerShell 中输入：

```
python -m pip install --upgrade pip
```

#### 安装库

以安装 numpy 为例，在 PowerShell 中输入：

```
pip install numpy
```

#### 镜像源

在国内使用 pip 下载会很慢。使用镜像源可以大大提高速度。这里以中国科学技术大学的（推荐）为例。

仍以安装 numpy 为例，在 PowerShell 中输入：

```
pip install -i https://pypi.mirrors.ustc.edu.cn/simple numpy
```

如果想将该镜像源设为默认源，则在 PowerShell 中输入：

```
pip config set global.index-url https://pypi.mirrors.ustc.edu.cn/simple
```

其他优秀的镜像源还有清华大学的：`https://pypi.tuna.tsinghua.edu.cn/simple`、阿里云的 `https://mirrors.aliyun.com/pypi/simple`。

### 在 Python 中导入和使用模块

以 numpy 为例：

```python
# 导入模块
import numpy
# 测试一下
arr = numpy.array([0,1,2,3]) # 通过“numpy.”来调用numpy中的内容
print(arr)
```

还可以这样写，减少代码键入量：

```python
import numpy as np # 将np作为numpy的别名

arr = np.array([0,1,2,3]) # 这里只用写“np.”
print(arr)
```

如果只想导入类中的某个内容，可以这样写：

```python
from numpy import array

arr = array([0,1,2,3])
print(arr)
```

## 九、别的一些什么东西

### 格式化字符串

如：

```python
s = 'a = %d, b = %d' % (a,b)
```

这方面好像和 `printf()` 是一样的。