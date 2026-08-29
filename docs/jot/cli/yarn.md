# Yarn

Yarn 是 Facebook 发布的一款取代 npm 的 Node.js 包管理工具，也是 mNotebook 使用的管理工具。

## 安装 & 卸载 Yarn

```bash
npm install -g yarn      # 安装
npm uninstall -g yarn    # 卸载
```

## 安装依赖

```bash
yarn                   # 安装依赖包
yarn install --force    # 强制重新下载依赖包
```

## 管理依赖

```bash
yarn add <package>           # 添加指定的依赖包
yarn global add <package>    # 添加依赖包 (全局)
```

```bash
yarn remove <package>           # 移除指定的依赖包
yarn global remove <package>    # 移除依赖包 (全局)
```

```bash
yarn upgrade <package>    # 更新指定的依赖包
```

## 构建

```bash
yarn build    # 构建项目
```

## 启动

```bash
# 启动开发服务器
yarn start
yarn start --port <port>
yarn start --host <host> --port <port>

# 从构建启动项目
yarn serve
yarn serve --port <port>
yarn serve --host <host> --port <port>
```