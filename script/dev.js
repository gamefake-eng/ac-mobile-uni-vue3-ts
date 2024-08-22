// script/dev.js
const inquirer = require("inquirer");
const shell = require("shelljs"); // 执行文件操作
const config = [
	{
		name: "H5",
		value: "pnpm run dev:h5"
	},
	{
		name: "微信小程序",
		value: "pnpm run dev:mp-weixin"
	}
];

inquirer
	.prompt([
		{
			type: "list",
			name: "buildScript",
			message: "请选择你要编译的环境",
			choices: config
		}
	])
	.then(answers => {
		if (!answers.buildScript) return;
		shell.exec(answers.buildScript);
	});
