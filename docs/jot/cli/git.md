# Git

Git 是一个开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。

## Clone - 克隆

```bash
# 从指定 url 克隆
git clone <url>

# 克隆到指定目录
git clone <url> <dir>

# 克隆指定分支
git clone --branch <branch-name> <url>
```

## Branch - 分支

```bash
# 列出所有本地分支
git branch

# 列出所有分支 (包括远程分支)
git branch -a

# 删除分支 (有确认)
git branch -d <branch-name>

# 删除分支 (无确认!!)
git branch -D <branch-name>
```

## Checkout - 签出

```bash
# 切换分支
git checkout <branch-name>

# 撤销分支切换
git checkout -

# 创建并切换分支
git checkout -b <branch-name>
```
```bash
# 撤销未暂存的本地更改 (恢复到最后的提交的状态)
git checkout -- <file>

# 撤销所有未暂存的本地更改
git checkout .
```

## Add - 暂存

将文件的修改添加到 Git 的暂存区，以便在下一次提交时包含这些更改。

```bash
# 暂存某文件的更改
git add <file>

# 暂存所有本地更改
git add .
```

## Commit - 提交

```bash
# 创建提交 (使用默认编辑器编辑 commit msg)
git commit

# 创建提交并指定 commit msg
git commit -m <msg>

# 覆盖上一个提交 (修改)
git commit --amend
```

## Push - 推送

```bash
# 推送到远程仓库
git push
git push <remote-name> <branch-name>
git push <remote-name> <local-branch-name>:<remote-branch-name>

# 强制推送 (force-update)
git push --force

# 推送到指定远程分支 (并使本地分支跟踪指定的远程分支)
git push --set-upstream <remote-name> <branch-name>

# 删除远程分支
git push <remote-name> -d <branch-name>
```

## Reset - 重置

```bash
# 放弃暂存的本地更改
git reset HEAD <file>

# 放弃所有暂存的本地更改
git reset HEAD

# 回到前一次提交的状态
git reset --hard HEAD^
```