# Yarn

Yarn 是 Facebook 发布的一款取代 npm 的 Node.js 包管理工具，也是 mNotebook 使用的管理工具。

## 安装 & 卸载 Yarn

```bash
# 安装
npm install -g yarn

# 卸载
npm uninstall -g yarn
```

## 安装依赖

```bash
# 安装依赖包
yarn
yarn install

# 强制重新下载依赖包
yarn install --force
```

## 管理依赖

```bash
# 添加指定的依赖包
yarn add <pkg-name>

# 添加依赖包 (全局)
yarn global add <pkg-name>
```

```bash
# 移除指定的依赖包
yarn remove <pkg-name>

# 移除依赖包 (全局)
yarn global remove <pkg-name>
```

```bash
# 更新指定的依赖包
yarn upgrade <pkg-name>
```

## 构建

```bash
# 构建项目
yarn build
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