# 字符串：KMP 延伸

先回忆一下基本 KMP 的写法：

```cpp
string s, p;
int nxt[MAXN + 1]; // nxt[i] 表示 p[0...i-1] 的最长公共前后缀长度
void initNxt() {
    for (int i = 1; i < p.size(); i++) {
        int j = nxt[i];
        while (j and p[i] != p[j]) j = nxt[j];
        if (p[i] == p[j]) nxt[i + 1] = j + 1;
        else nxt[i + 1] = 0;
    }
}
bool kmp() {
    int j = 0;
    for (int i = 1; i < s.size(); i++) {
        while (j and s[i] != p[j]) j = nxt[j]; // 失配，连续往前跳
        if (s[i] == p[j]) { // 可以匹配
            if (++j == p.size()) return true; // 模板串匹配结束
        }
    }
    return false;
}
```

我们接下来对此算法进行扩展。

## 最小前缀划分

见：[P8112 [Cnoi2021] 符文破译](https://www.luogu.com.cn/problem/P8112)。大意如下：

给定一个串 $S$ 和模板串 $P$，求是否能用若干个 $P$ 的**非空前缀**覆盖 $S$。若可能，输出最小需要的前缀数量；若不可能，输出 `Fake`。

举个例子：$S=\text{abacabac}$，$P=\text{abacabc}$，那么我们可以用两次 $P$ 的前缀覆盖 $S$：$\text{abac}+\text{abac}$。

---

这题非常适合用 KMP 来做。

- 首先，如何判断 $S$ 是否能被覆盖呢？和一般的 KMP 不同，通常我们只是要求 $S$ 中包含 $P$ 就行了，而现在是要求 $S$ 中处处是 $P$ 的前缀。我们做 KMP 时，每次失配就会把 $j$ 往前跳，或者说是把 $P$ 往后移。如果我们跳若干次，还是发现失配，那么说明做不到用 $P$ 的前缀覆盖 $S$。我们直接返回 -1。

- 考虑可以用 $P$ 的前缀覆盖 $S$，如何找到最小划分数？首先先验条件是保证可以覆盖，那么要让划分数最小，就要尽量**复用**覆盖。
  
  > 可以结合下面两组数据思考（我通过对拍找到的）：
  > 
  > $T=\text{aa},S=\text{aaaa}.$
  > 
  > $T=\text{aabb},S=\text{aaaab}$
  
  我们每次失配的时候，会尝试往前跳一个 border，然后尝试继续匹配。然而这并不一定是最优的。考虑上面的第二组数据，我们将得到：
  
  ```
  aa[a]ab    Fail!   aa[a]ab            aaa[a]b    Fail!    aaa[a]b
  aa[b]b    ======>   a[a]bb   ======>   aa[b]b   ======>     a[a]bb   ...
  ```
  
  注意到，我们第一次失配后的跳跃并不是最优的。如何避免这样的 “浪费” 跳跃呢？我们维护一个 `last` 记录上次匹配最后一个字符位置。如果当前匹配的起点在上次成功匹配的终点之后，我们才让 `ans++`。
  
  - 那这时候就有人会说了，万一我们第二次跳太多，和上一次成功匹配的段中间空了一段，怎么办呢？
    
    > TODO: 待证明这种情况不存在。

```cpp
int anotherKmp() {
    int ans = 1, j = 0, last = -1; // last 是上次匹配最后一个字符位置
    for (int i = 1; i < s.size(); i++) {
        while (j and s[i] != p[j]) j = nxt[j];
        if (s[i] == p[j]) j++;
        else return -1;
        if (i - j > last) { // 当前匹配的起点在上次匹配的终点之后
            ans++;
            last = i - 1;
        } 
    }
    return ans;
}
```
