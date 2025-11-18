---
tags: [unfinished]
---
# Tarjan 求 SCC

Tarjan 算法可以在 $O(n+m)$ 的时间复杂度下求出一个图的 [强连通分量](连通相关问题#强连通分量)。

:::note
Tarjan 求 SCC 的算法，老师说是目前能接触到的最复杂的算法。这种算法在一篇获图灵奖的论文中发表，其原理非常复杂。

实际操作中当成黑箱来用就可以了。
:::

## 过程

Tarjan 算法中需要额外给图中每个节点 $u$ 维护以下变量：

- $\text{dfn}_u$：做 DFS 时 $u$ 被访问的次序，即 DFS 序。

- $\text{low}_u$：在 $u$ 的子树中，能够回溯到的、最早的已经在栈里的节点。（这个栈在下文解释）设以 $u$ 为根的子树为 $\text{Subtree}_u$，则 $\text{low}_u$ 定义为以下节点的 $\text{dfn}$ 的最小值：
  
  - $\text{Subtree}_u$ 中的节点。
  
  - 从 $\text{Subtree}_u$ 通过一条不在搜索树上的边能到达的节点。

同时我们还要维护一个栈 $\text{stk}[]$ （用数组实现）。实际写代码的时候，为了方便知道一个节点是否在栈中，我们还要维护一个数组 $\text{inStk}[]$。

下面讲解如何维护 $\text{low}_u$（难点）：

## 参考

- [强连通分量 - OI Wiki # Tarjan 算法](https://oi-wiki.org/graph/scc/#tarjan-%E7%AE%97%E6%B3%95)