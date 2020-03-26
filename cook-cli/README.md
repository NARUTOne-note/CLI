# cook-cli

> CLI DEMO

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
