# ac-mobile-uni-vue3-ts

## 介绍

一套完整，规范的基于vue3，TypeScript，pinia，unocss，uview-plus，vite，eslint，commitlint，uniapp的工程环境


## 项目功能 🔨

- 使用 Vue3.2 + TypeScript 开发，单文件组件＜ script setup ＞
- 采用 Vite5 作为项目开发、打包工具（配置自动导入、TSX 语法）
- 使用 Pinia 替代 Vuex， 集成 Pinia 持久化插件
- 使用 axios-miniprogram 对 Axios 整个二次封装 （请求拦截、常用请求封装……）
- 基于 uview-plus 作为 UI 组件库，集成常用组件、插件
- 常用自定义指令开发（权限、节流、防抖） [🈲微信小程序不支持自定义指令，需要在小程序中使用时将其去除]
- 使用 Prettier 统一格式化代码，集成 Eslint、csscomb 代码校验规范
- 使用 husky、lint-staged、commitlint、commitizen、cz-git 规范提交信息

## 架构目录文件说明 📚

```text
ac-mobile-uni-vue3-ts
├─ .husky                 # husky 配置文件
├─ .vscode                # VSCode 推荐配置
├─ public                 # 静态资源文件（该文件夹不会被打包）
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ config              # 全局配置项
│  ├─ directives          # 全局指令文件
│  ├─ hooks               # 常用 Hooks 封装
│  ├─ stores              # pinia store
│  ├─ styles              # 全局样式文件
│  ├─ typings             # 全局 ts 声明
│  ├─ uni_modules         # uniapp 插件管理
│  ├─ utils               # 常用工具库
│  ├─ pages               # 项目所有页面
│  ├─ App.vue             # 项目主组件
│  ├─ env.d.ts            # 指定 ts 识别 vue
│  └─ main.ts             # 项目入口文件
├─ .env                   # vite 常用配置
├─ .env.development       # 开发环境配置
├─ .env.production        # 生产环境配置
├─ .eslintignore          # 忽略 Eslint 校验
├─ .eslintrc.js           # Eslint 校验配置文件
├─ .gitignore             # 忽略 git 提交
├─ .prettierignore        # 忽略 Prettier 格式化
├─ .prettierrc.js         # Prettier 格式化配置
├─ .csscomb.json          # csscomb 样式格式化配置
├─ commitlint.config.js   # git 提交规范配置
├─ index.html             # 入口 html
├─ lint-staged.config     # lint-staged 配置文件
├─ package-lock.json      # 依赖包包版本锁
├─ package.json           # 依赖包管理
├─ README.md              # README 介绍
├─ tsconfig.json          # typescript 全局配置
└─ unocss.config.ts       # unocss 配置文件
└─ vite.config.ts         # vite 全局配置文件
```

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