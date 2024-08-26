# ac-mobile-uni-vue3-ts

## 介绍

一套完整，规范的基于vue3，TypeScript，pinia，unocss，uview-plus，vite，eslint，commitlint，uniapp的工程环境


## 项目功能 🔨

## 架构目录文件说明 📚

- .husky git提交钩子
- api 接口管理
- assets 静态资源
- components 公共组件
- config 项目配置
- hooks 自定义hooks
- pages 页面
- stores 状态管理
- utils 工具类
- types 全局类型定义
- uni_modules uni市场插件
- .csscomb.json css代码格式化配置
- .eslintrc.js eslint配置
- .prettierrc.js prettier配置
- commitlint.config.js git提交规范配置
- lint-staged.config.js lint-staged配置
- unocss.config.ts unocss配置

## 依赖

- Node.js >= 16 （基础环境）
- Vue 3.2.45 （基础环境）
- Uni-app 3.0.0-3490 （基础环境）
- Typescript 4.9.4 （基础环境）
- babel-eslint 10.1.0 （代码格式）
- eslint 8.6.0 （代码格式）
- prettier 3.3.3 （代码格式）
- sass 1.77.8 （样式）
- vue-i18n 9.1.9（国际化）
- vite 5.2.8（基础环境）
- husky 9.1.5 （代码提交规范）
- lint-staged 15.2.9 （代码提交规范）
- commitlint 19.4.0 （代码提交规范）
- commitizen 4.3.0 （代码提交规范）
- cz-git 1.9.4 （代码提交规范）
- pinia 2.2.2 （状态管理）
- axios-miniprogram 2.7.2 （网络请求）
- unocss 0.55.7 （样式）
- unocss-applet 0.8.2 （样式）
- unplugin-auto-import 0.18.2 （自动导入）
- @vitejs/plugin-vue-jsx 4.0.1 （jsx）
- inquirer 8.0.0 （命令行交互）
- shelljs 0.8.5 （命令行交互）
- uview-plus 3.3.27 （ui组件库）
- dayjs 1.11.13 （时间处理）

## 安装使用步骤 📔

- Clone:

``` bash
git clone https://xxxx.git
```

- Install：

``` bash
pnpm i

#  安装失败，请升级 nodejs 到 16 以上，或尝试使用以下命令：
pnpm install --registry=https://registry.npm.taobao.org
```

- Run：

``` bash
pnpm run dev
# or
npm run dev
```

- Lint：

``` bash
pnpm run lint
```

- Commit：

``` bash
pnpm run commit
```

## 使用说明

1. 使用vscode进行开发，安装Prettier、eslint插件
2. git 提交规范，参考commitlint.config.js文件
	> feat: 🚀 新功能
	> fix: 🧩 修复缺陷
	> docs: 📚 文档变更
	> style: 🎨 代码格式（不影响功能，例如空格、分号等格式修正）
	> refactor: ♻️ 代码重构（不包括 bug 修复、功能新增）
	> perf: ⚡️ 性能优化
	> test: ✅ 测试或已有测试改动
	> build: 📦️ 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）
	> ci: 🎡 修改 CI 配置、脚本
	> revert: ⏪️ 回滚 commit
	> chore: 🔨 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）

3. 命令行使用git cz进行提交 `pnpm run commit`