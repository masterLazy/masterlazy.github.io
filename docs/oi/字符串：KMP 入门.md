# 字符串：KMP 入门

KMP 类算法主要围绕 border 这一概念展开，并根据 border 的性质、引理等设计算法。

虽然说理解 KMP 不一定要会 border，但是我觉得掌握 border 之后可以对 KMP 算法进行扩展，解决更多问题。

**本文中字符串的索引从 0 开始。** 因为 `std::string` 下表是从 0 开始的。

## 什么是 Border

Border 直译就是边框。对于一个字符串 $S$，其 border 是指这样一个子串 $s_1\not=S$，其既是 $S$ 的前缀，又是 $S$ 的后缀，比如：

$$
\fbox{ababc}\space abc\space\fbox{ababc}
$$

上图中框起来的就是 $S$ 的第一个 border。border 不一定是极大的，比如：$\fbox{ab}\space abcabcabc\space\fbox{ab}$ 这也是一个 border。border 也可以是重叠的前后缀。

我们可以得到 border 的两个小性质：

- 如果 $A,B$ 都是 $S$ 的 border，且 $|A|\lt|B|$，那么 $A$ 是 $B$ 的 border。以下是一个例子：
  
  $$
  \fbox{\fbox{ab}\space ab}\space abc\space\fbox{ab\space\fbox{ab}}
  $$
  
  上图中 $ab$、$abab$ 都是整个字符串的 border，显然也满足 $ab$ 是 $abab$ 的 border。

- 对于一个串 $S$，其所有 border 构成的集合记为 $B(S)$，设 $A$ 是 $S$ 最大的 border，那么有：
  
  $$
  B(S)=A\cup B(A).
  $$
  
  这就是说，我们可以递归地求出 $S$ 的 border 集合。

## 基础 KMP 算法

KMP 算法做这样一件事：给定两个串 $S$、$P$，求 $P$ 是否是 $S$ 的一个子串。其时间复杂度在任何情况下都是 $O(n+m)$，其中 $n,m$ 分别是串 $S,P$ 的长度。这样的问题也叫**字符串的模式匹配**。

KMP 的思想是**避免回溯**。让我们看下面的例子：

$S=\fbox{abab}abx$

$P=\fbox{abab}x$

我们做模式匹配时，会用会用两个指针：$i,j$，分别遍历 $S,P$。如图 $i=3$，$j=3$。每次我们发现 $S[i]=P[j]$ 时，就让 $i\leftarrow i+1$，$j\leftarrow j+1$。

如上图所示，我们匹配了前 4 个字符，当匹配到第 5 个字符时，发生了**失配**。对于朴素的匹配算法，我们可能会考虑让 $i$ 返回当前匹配段的起点，往后移一个位置，同时让 $j$ 回到 0。也就是尝试在以下位置继续匹配：

$S=a\space\space\fbox{b}\space ababx$

$P=\quad \fbox{a}\space babx$

但是这样效率太慢了，相当于我们之前匹配的串的信息被浪费了。KMP 的思想是：**让 $i$ 永不回溯**。那怎么办呢？结合我们前面对 border 的铺垫，可以发现，$abab$ 这段匹配的串，其有一个 border $ab$。所以我们可以这样做：

$S=ab\space\fbox{ab}\space abx$

$P=\quad\space\fbox{ab}abx$ 

这样我们没有移动 $i$，而是让 $j$ 往前移。利用匹配串存在 border，或者说存在相同的前后缀这一信息，我们可以减少很多比较次数。注意和上面的 border 略有不同，我们这里希望找到最大的 border，即**最长公共前后缀**。

怎么维护最长公共前后缀呢？

### next 数组

我们引入 $\text{next}$ 数组：$\text{next}[k]$ 表示串 $P$ 中 $[0,k-1]$ 子段中最长公共前后缀的长度，也就是前 $k$ 个字符组成的子串的最长公共前后缀长度。

所以我们要想知道 $[0,k]$ 最长公共前后缀的长度，自然就是访问 $\text{next}[k+1]$ 咯。

**注意：** 这意味着 $\text{next}$ 数组有效的范围是 $\text{next}[1]\to\text{next}[n+1]$。

我们要在做模式匹配之前**预处理** $\text{next}$ 数组，考虑通过递推求 $\text{next}$ 数组：

- 初始条件：$\text{next}[1]=0$，从 $k=1$ 开始循环，当 $k=|P|$ 时退出循环。

- 假设我们刚刚求好了 $\text{next}[k]$，现在求 $\text{next}[k+1]$。首先我们让 $i=\text{next}[k]$，这样我们就让 $i$ 指向了 $[0,k-1]$ 子段的最长公共前缀的下一个字符，如果这个字符和 $P[k]$ 匹配，就可以组成 $[0,k]$，也就是 $\text{next}[k+1]$ 的新 · 最大公共前后缀。
  
  - 如果 $P[i]=P[k]$，意味着公共前后缀可以扩展，所以令 $\text{next}[k+1]=\text{next}[k]+1$。
  
  - 如果 $P[i]\not=P[k]$，那么我们要让 $i$ 往前移，缩小范围。怎么知道往前移多少呢？我们知道以 $i$ 结尾的公共前后串长度为 $\text{next}[i]$。所以我们令 $i\leftarrow next[i]$，尝试判断 $P[i]=P[k]?$，如果等式不成立，我们接着跳。
    
    - 当然也得有个边界条件，那就是当 $i=0$ 时停止。
    
    - 不管什么时候停止跳跃，我们都检测一下 $P[i]=P[k]?$，如果成立就令 $\text{next}[k+1]=i+1$，否则 $\text{next}[k+1]=0$。

代码：

```cpp
int nxt[MAXN + 1];
void initNxt(const string& p) {
    int i = 0;
    for (int k = 1; k < p.size(); k++) {
        i = nxt[k];
        if (p[i] == p[k]) {
            nxt[k + 1] = nxt[k] + 1;
        } else {
            while (i and p[i] != p[k]) i = nxt[i];
            if (p[i] == p[k]) nxt[k + 1] = i + 1;
            else nxt[k + 1] = 0;
        }
    }
}
```

为了减少码量也可以这样写，是等价的：

```cpp
void initNxt(const string& p) {
    int i = 0;
    for (int k = 1; k < p.size(); k++) {
        i = nxt[k];
        while (i and p[i] != p[k]) i = nxt[i];
        if (p[i] == p[k]) nxt[k + 1] = i + 1;
        else nxt[k + 1] = 0;
    }
}
```

### KMP 本体

刚才 $\text{next}$ 数组的计算应该是最复杂的部分了。处理完 $\text{next}$，做 KMP 就如履平地了，直接看代码吧：

```cpp
void kmp(const string& s, const string& p) {
    int j = 0;
    for (int i = 0; i < s.size(); i++) {
        // 当前失配，尝试跳跃
        while (j and s[i] != p[j]) {
            j = nxt[j];
        }
        // 当前匹配
        if (s[i] == p[j]) {
            if (++j == p.size()) { // 到头了
                cout << i - p.size() + 2 << '\n'; // 输出答案；题目的字符串索引是从 1 开始的
            }
        }
    }
}
```

唉，好像也不是很简单。其实是有很多妙处的，以后再记吧。
