/*
 * @File: main.js
 * @Project: scffold-cli
 * @File Created: Thursday, 26th March 2020 11:15:53 am
 * @Author: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com)
 * -----
 * @Last Modified: Thursday, 26th March 2020 1:59:19 pm
 * @Modified By: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com>)
 * -----
 * @Copyright <<projectCreationYear>> - 2020 ***, ***
 * @fighting: code is far away from bug with the animal protecting
 *  ┏┓      ┏┓
 *  ┏┛┻━━━┛┻┓
 *  |           |
 *  |     ━    |
 *  |  ┳┛ ┗┳ |
 *  |          |
 *  |     ┻   |
 *  |           |
 *  ┗━┓     ┏━┛
 *     |      | 神兽保佑 🚀🚀🚀
 *     |      | 代码无BUG ！！！
 *     |      ┗━━━┓
 *     |            ┣┓
 *     |            ┏┛
 *     ┗┓┓ ┏━┳┓┏┛
 *      |┫┫   |┫┫
 *      ┗┻┛   ┗┻┛
 */

import program from 'commander';
import updateNotifier from 'update-notifier'; // 更新
import symbol from 'log-symbols';
import chalk from 'chalk';
import pkg from '../package.json';

function checkVersion() {
  const notifier = updateNotifier({ pkg, updateCheckInterval: 0 });

  if (notifier.update) {
    notifier.notify();
  }
}

checkVersion();

/**
 * 命令列表
 */
const actionMap = {
   // 启动项目
  dev: {
    description: '本地启动项目',
    usages: [
        'meet-cli dev',
    ],
    options: [
        {
            flags: '-p --port <port>',
            description: '端口',
            defaultValue: 3000
        }
    ],
    alias: 'd'
  }
};

// 添加命令
Object.keys(actionMap).forEach(action => {

  // 设置命令选项
  if (actionMap[action].options) {
    Object.keys(actionMap[action].options).forEach(option => {
      let obj = actionMap[action].options[option];
      program.option(obj.flags, obj.description, obj.defaultValue);
    });
  }

  program
    .command(action) // 添加命令名称
    .description(actionMap[action].description)
    .alias(actionMap[action].alias) // 定义命令的别名 
    .action(() => { // 定义命令的回调函数
      switch (action) {
        // 到这里具体命令实现逻辑还空缺，我们先打日志，看下命令处理情况
        case 'dev':
          console.log(symbol.success, chalk.blue("端口"), chalk.green(program.port));
          break;
        default:
          break;
      }
    })
});


// 项目版本
program
    .version(require('../package.json').version, '-v --version')
    .parse(process.argv);

/**
 * cli命令后不带参数的时候，输出帮助信息
 */
if (!process.argv.slice(2).length) {
    program.outputHelp();
}