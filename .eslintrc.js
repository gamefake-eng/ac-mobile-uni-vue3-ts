module.exports = {
	root: true,

	env: {
		node: true,
		"vue/setup-compiler-macros": true
	},

	/* 指定如何解析语法 */
	parser: "vue-eslint-parser",
	/* 优先级低于 parse 的语法解析配置 */
	parserOptions: {
		// parser: "@babel/eslint-parser", // 解决 Parsing error: Unexpected token 错误
		parser: "@typescript-eslint/parser", // 解决 Parsing error: Unexpected token 错误
		requireConfigFile: false,
		ecmaVersion: 2020,
		jsxPragma: "React",
		ecmaFeatures: {
			jsx: true
		}
	},

	plugins: ["@typescript-eslint"],

	extends: [
		"plugin:vue/vue3-essential",
		"plugin:@typescript-eslint/recommended", // TypeScript 推荐规则集
		"prettier",
		"plugin:prettier/recommended"
	],

	// "writable" 以允许重写变量，或 "readonly" 不允许重写变量
	globals: {
		XE: "readonly",
		VE_ENV: "readonly",
		VE_API: "readonly",
		uni: "writable"
	},

	rules: {
		eqeqeq: ["error", "always"], // 用 === 强制等于
		"comma-dangle": ["error", "only-multiline"],
		camelcase: "error", // 驼峰

		// eslint (http://eslint.cn/docs/rules)
		"no-unused-vars": "off", // 允许定义未使用的变量
		"no-var": "error", // 要求使用 let 或 const 而不是 var
		"no-multiple-empty-lines": ["error", { max: 1 }], // 不允许多个空行
		"no-use-before-define": "off", // 禁止在 函数/类/变量 定义之前使用它们
		"prefer-const": "off", // 此规则旨在标记使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
		"no-irregular-whitespace": "off", // 禁止不规则的空白

		"@typescript-eslint/no-namespace": "off",
		"@typescript-eslint/no-explicit-any": ["off"],
		"@typescript-eslint/no-non-null-assertion": "off",

		// vue (https://eslint.vuejs.org/rules)
		"vue/script-setup-uses-vars": "error", // 防止<script setup>使用的变量<template>被标记为未使用，此规则仅在启用该no-unused-vars规则时有效。
		"vue/v-slot-style": "error", // 强制执行 v-slot 指令样式
		"vue/no-mutating-props": "off", // 不允许组件 prop的改变
		"vue/custom-event-name-casing": "off", // 为自定义事件名称强制使用特定大小写
		"vue/attributes-order": "off", // vue api使用顺序，强制执行属性顺序
		"vue/one-component-per-file": "off", // 强制每个组件都应该在自己的文件中
		"vue/html-closing-bracket-newline": "off", // 在标签的右括号之前要求或禁止换行
		"vue/max-attributes-per-line": "off", // 强制每行的最大属性数
		"vue/multiline-html-element-content-newline": "off", // 在多行元素的内容之前和之后需要换行符
		"vue/singleline-html-element-content-newline": "off", // 在单行元素的内容之前和之后需要换行符
		"vue/attribute-hyphenation": "off", // 对模板中的自定义组件强制执行属性命名样式
		"vue/require-default-prop": "error", // 此规则要求为每个 prop 为必填时，必须提供默认值
		"vue/multi-word-component-names": "off", // 要求组件名称始终为 “-” 链接的单词
		// vue-html 结束标签
		"vue/html-self-closing": [
			"error",
			{
				html: {
					void: "always",
					normal: "never",
					component: "always"
				},
				svg: "always",
				math: "always"
			}
		]
	}
};
