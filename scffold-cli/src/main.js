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
import create from './create'; // 项目创建
import init from './init'; // 项目初始化
import dev from './dev'; // 项目启动
import build from './build'; //项目打包

/**
 * 命令列表
 */

let actionMap = {
  // 项目创建
  create: {
    description: "创建新项目",
    usages: [ // 使用方法
      "scffold-cli create projectName"
    ],
    alias: "c"  // 命令简称
  },

  // 项目初始化
  init: {
    description: '初始化项目',
    usages: [
      'scffold-cli init',
    ],
    alias: 'i'
  },
   // 启动项目
  dev: {
    description: '本地启动项目',
    usages: [
        'scffold-cli dev',
    ],
    options: [
        {
            flags: '-p --port <port>',
            description: '端口',
            defaultValue: 3000
        }
    ],
    alias: 'd'
  },
  //打包
  build: {
      description: '服务端项目打包',
      usages: [
          'scffold-cli build',
      ],
      alias: 'b'
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
        case 'create':
          create(...process.argv.slice(3)); // http://nodejs.cn/api/process.html#process_process_argv
          break;
        case 'init':
          init();
          break;
        case 'dev':
          dev(program.port);
          break;
        case 'build':
          build();
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
 * scffold-cli命令后不带参数的时候，输出帮助信息
 */
if (!process.argv.slice(2).length) {
    program.outputHelp();
}