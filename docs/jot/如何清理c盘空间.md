# 如何清理 C 盘空间

:::note

此指南是根据我的情况编写的，同样适用于技术栈类似的**开发人员**。

:::

:::tip

定期清理程序缓存是个好习惯。

:::

笔者曾因 C 盘占用越来越多而苦恼，最近终于找到了罪魁祸首：各种**软件包的缓存**。清理下面这些软件包即可大幅释放 C 盘空间。

## NuGet

### 查看 & 更改缓存位置

```bash
dotnet nuget locals all --list
```

由于我已经更改了缓存位置，我的输出如下：

```
http-cache: D:\NuGet\v3-cache
global-packages: D:\NuGet\packages
temp: D:\NuGet\NuGetScratch
plugins-cache: D:\NuGet\plugins-cache
```

| 文件夹            | 用途                                                         | 环境变量                   |
| ----------------- | ------------------------------------------------------------ | -------------------------- |
| `http-cache`      | Visual Studio 包管理器 (NuGet 3.x+) 和 `dotnet` 工具存储此缓存中下载包的副本（另存为 `.dat` 文件），这些副本被组织到每个包源的子文件夹中。 未展开包，且缓存中有 30 分钟的到期时间。 | `NUGET_HTTP_CACHE_PATH`    |
| `global-packages` | NuGet 安装任何下载包的位置。                                 | `NUGET_PACKAGES`           |
| `temp`            | NuGet 在各操作期间在其中存储临时文件的文件夹。               | `NUGET_SCRATCH`            |
| `plugins-cache`   | NuGet 存储来自操作声明请求的结果的文件夹。                   | `NUGET_PLUGINS_CACHE_PATH` |

如果要更改缓存位置，只需要在系统设置内创建上述四个**环境变量**，填入新的缓存位置即可。如果需要，还可以把旧的缓存的文件分别粘贴到新位置。

### 清理缓存

```bash
# 清除所有缓存
dotnet nuget locals all --clear
# 仅清除全局包
dotnet nuget locals global-packages --clear
```

## Conda

### 清理缓存

可以先运行下面的命令，查看 Conda 缓存的使用情况。该命令会模拟清理过程，但不会实际删除文件。

```bash
conda clean --dry-run --all
```

如果确认要清理，可以执行：

```bash
conda clean --all
```

这会删除未使用的包、tarball 文件、索引缓存等，释放大量空间。

## Pip

### 查看缓存信息

```bash
pip cache info
pip cache list
pip cache dir
```

### 清理缓存

```bash
pip cache purge
```

## 参考

- [Nuget包缓存存放位置迁移 - jack_Meng - 博客园](https://www.cnblogs.com/mq0036/p/18755134)
- Bing 搜索的 AI 智能内容
