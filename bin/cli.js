#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name('ag-kit')
  .description('CLI to initialize Antigravity Kit in your project')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize .agent folder in the current directory')
  .option('-f, --force', 'Overwrite existing .agent folder')
  .action(async (options) => {
    const sourceDir = path.resolve(__dirname, '../.agent');
    const targetDir = path.resolve(process.cwd(), '.agent');

    console.log(chalk.blue('🚀 Initializing Antigravity Kit...'));

    if (!fs.existsSync(sourceDir)) {
      console.error(chalk.red(`Error: Source directory not found at ${sourceDir}`));
      console.error(chalk.yellow('Make sure you have installed the package correctly.'));
      process.exit(1);
    }

    if (fs.existsSync(targetDir) && !options.force) {
      const answer = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: 'The .agent folder already exists. Do you want to overwrite it?',
          default: false,
        },
      ]);

      if (!answer.overwrite) {
        console.log(chalk.yellow('Operation cancelled.'));
        return;
      }
    }

    const spinner = ora('Copying .agent folder...').start();

    try {
      await fs.copy(sourceDir, targetDir);
      spinner.succeed(chalk.green('Successfully initialized .agent folder!'));
      console.log('\nNext steps:');
      console.log(chalk.cyan('1. Read the .agent/ARCHITECTURE.md file'));
      console.log(chalk.cyan('2. Configure your environment'));
      console.log(chalk.cyan('3. Start using agents with your AI assistant'));
    } catch (err) {
      spinner.fail(chalk.red('Failed to copy .agent folder'));
      console.error(err);
    }
  });

program
  .command('status')
  .description('Check antgravity-kit status')
  .action(() => {
    const targetDir = path.resolve(process.cwd(), '.agent');
    if (fs.existsSync(targetDir)) {
        console.log(chalk.green('✅ Antigravity Kit is installed in this project.'));
    } else {
        console.log(chalk.yellow('❌ Antigravity Kit is NOT installed in this directory.'));
        console.log('Run ' + chalk.cyan('ag-kit init') + ' to install.');
    }
  });

program.parse(process.argv);
