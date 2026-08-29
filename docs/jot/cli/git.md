# Git

Git 是一个开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。

先简单介绍一下 Git 如何工作：它用一若干个提交（commit）节点来记录仓库历史，每个提交用唯一的哈希标识（下面的 `<commit>` 填的就是提交哈希）。若干个分支连在一起，就成为一条分支（branch），一个仓库（repository）可以有一个或多个分支。OS 里的仓库目录称为工作树（worktree），用户要先把工作树内的更改添加到暂存区（stage），再从暂存区创建提交（commit）。

## 仓库与分支管理

### 基本

```bash
git init      # 在当前目录下创建仓库
git status    # 查看仓库当前状态
```

### clone - 克隆

```bash
git clone <url>          # 从指定 url 克隆
git clone <url> <dir>    # 克隆到指定目录
git clone --branch <branch> <url>    # 克隆指定分支
```

### branch - 分支

查看分支信息。

```bash
git branch                     # 列出所有本地分支
git branch -a                  # 列出所有分支 (包括远程分支)

git branch -d <branch-name>    # 删除分支 (有确认)
git branch -D <branch-name>    # 删除分支 (无确认!!)
```

### checkout - 签出

签出的意思就是切换分支，本质上是移动 HEAD 指针。

```bash
git checkout <branch>           # 切换分支
git checkout -                  # 切换到上一个分支
git checkout -b <new-branch>    # 创建新分支并切换

git checkout <tag>              # 签出到指定的标签
git checkout <hash>             # 签出到指定的提交
```

### push - 推送

```bash
# 推送到远程仓库
git push
git push <remote> <branch>
git push <remote> <local-branch>:<remote-branch>

git push --tags                  # 推送标签

git push --force                 # 强制推送
git push --force-with-lease      # 强制推送，如果远程存在他人的提交则失败

git push --set-upstream <remote> <branch>    # 推送到指定远程仓库 (并使本地分支跟踪远程分支)

git push <remote> -d <branch>    # 删除远程分支
```

## 更改与回退

### add - 暂存

将文件的修改添加到 Git 的暂存区，以便在下一次提交时包含这些更改。

```bash
git add <file>    # 暂存某文件的更改
git add .         # 暂存所有更改
```

### commit - 提交

```bash
git commit             # 创建提交 (使用默认编辑器编辑信息)
git commit -m <msg>    # 创建提交并指定信息
git commit --amend     # 覆盖上一个提交 (修改)
```

### tag - 标签

```bash
git tag             # 创建标签 (使用默认编辑器编辑信息)
git tag -m <msg>    # 创建标签并指定信息
```

### reset - 重置

将仓库回退到某一次提交的版本。

```bash
git reset HEAD <file>    # 放弃暂存的本地更改
git reset HEAD           # 放弃所有暂存的本地更改
git reset <commit>       # 回退到指定提交
```

`git reset` 可以指定以下三种模式，默认是 `--mixed`：

- `--soft ` ：移动 HEAD，缓存区不变，工作树不变。
- `--mixed`：移动 HEAD，清空缓存区，工作树不变。
- `--hard `：移动 HEAD，清空缓存区，**重置工作树到指定提交的状态**。