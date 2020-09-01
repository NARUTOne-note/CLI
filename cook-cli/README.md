# cook-cli

> CLI DEMO

[美味的 CLI](https://juejin.im/post/6844903984994615310?utm_source=gold_browser_extension)

## use

```bash
# install

npm i

# run
# 在本地环境注册一个 cook CLI
npm link
cook

```

## 基本术语

- 命令（command）和子命令（subcommand）

```sh
# cook 即为命令
cook

# start 即为 cook 的 子命令
cook start
```

- 命令选项（options）

```sh
# -V 为简写模式（short flag）的选项（注意：只能一个字母，多个字母代表多个选项）
cook -V

# --version 为全写模式（long name）的选项
cook --version
```

- 命令参数（argument）

```sh
# source.js 和 target.js 都为 cp 命令的参数
cp source.js target.js
```

> 其实，子命令也是命令的参数

## 记录

`esm` 这个模块，它的作用是让我们可以在 js 源代码中直接使用 ECMAScript modules 规范加载模块，即直接使用 import 和 export。上面 src/index.js 的代码中能直接写 export 得益于该模块。
