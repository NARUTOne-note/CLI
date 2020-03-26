/*
 * @File: index.js
 * @Project: cook-cli
 * @File Created: Friday, 1st November 2019 11:33:09 am
 * @Author: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com)
 * -----
 * @Last Modified: Friday, 1st November 2019 11:33:18 am
 * @Modified By: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com>)
 * -----
 * @Copyright <<projectCreationYear>> - 2019 ***, ***
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
 *     |      | 代码无BUG！！！
 *     |      ┗━━━┓
 *     |            ┣┓
 *     |            ┏┛
 *     ┗┓┓ ┏━┳┓┏┛
 *      |┫┫   |┫┫
 *      ┗┻┛   ┗┻┛
 */

// CLI main
// @link https://juejin.im/post/5db9bbc0518825646350037c?utm_source=gold_browser_extension

import program from 'commander'; // 命令
import execa from 'execa'; // 调用外部命令
import inquirer from 'inquirer'; // 问答式互动
import ora from 'ora'; // 进度
import Listr from 'listr'; // 步骤
import chalk from 'chalk'; // 颜色输出
import boxen from 'boxen'; // 边框
import updateNotifier from 'update-notifier'; // 更新
import pkg from '../package.json';

export function cookCli (args) {
  checkVersion();
  // 提供version
  program.version(pkg.version, '-V, --version').usage('<command> [options]');

  // 功能
  program
    .command('start <food>')
    .option('-f, --fruit <name>', 'Fruit to be added')
    .description('Start cooking food')
    .action(function(food, option) {
      console.log(`run start command`);
      console.log(`argument: ${food}`);
      console.log(`option: fruit = ${option.fruit}`);
    });
  
  program
    .command('npm-version')
    .description('Display npm version')
    .action(async function() {
      const { stdout } = await execa('npm -v');
      console.log('Npm version:', stdout);
    });
  
  program
    .command('ask')
    .description('Ask some questions')
    .action(async function(option) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is your name?'
        },
        {
          type: 'confirm',
          name: 'isAdult',
          message: 'Are you over 18 years old?'
        },
        {
          type: 'checkbox',
          name: 'favoriteFrameworks',
          choices: ['Vue', 'React', 'Angular'],
          message: 'What are you favorite frameworks?'
        },
        {
          type: 'list',
          name: 'favoriteLanguage',
          choices: ['Chinese', 'English', 'Japanese'],
          message: 'What is you favorite language?'
        }
      ]);
      console.log('your answers:', answers);
    });
  
  program
    .command('wait')
    .description('Wait 5 secords')
    .action(async function(option) {
      const spinner = ora('Waiting 5 seconds').start();
      let count = 5;
      
      await new Promise(resolve => {
        let interval = setInterval(() => {
          if (count <= 0) {
            clearInterval(interval);
            spinner.stop();
            resolve();
          } else {
            count--;
            spinner.text = `Waiting ${count} seconds`;
          }
        }, 1000);
      });
    });

  program
    .command('steps')
    .description('some steps')
    .action(async function(option) {
      const tasks = new Listr([
        {
          title: 'Run step 1',
          task: () =>
            new Promise(resolve => {
              setTimeout(() => resolve('1 Done'), 1000);
            })
        },
        {
          title: 'Run step 2',
          task: () =>
            new Promise((resolve) => {
              setTimeout(() => resolve('2 Done'), 1000);
            })
        },
        {
          title: 'Run step 3',
          task: () =>
            new Promise((resolve, reject) => {
              setTimeout(() => reject(new Error('Oh, my god')), 1000);
            })
        }
      ]);

      await tasks.run().catch(err => {
        console.error(err);
      });
    });

  program.parse(args);
  
  console.log("I like cooking !");
  console.log(chalk.yellow('I like cooking'));
  console.log(boxen(chalk.yellow('I like cooking'), { padding: 1 }));
}

function checkVersion() {
  const notifier = updateNotifier({ pkg, updateCheckInterval: 0 });

  if (notifier.update) {
    notifier.notify();
  }
}