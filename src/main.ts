import { createSSRApp } from "vue";
import App from "./App.vue";
// unocss
import "uno.css";
// pinia store
import pinia from "@/stores/index";
// uview
import uviewPlus from "uview-plus";
// directives
import directives from "@/directives/index";
// awaitTo
import to from "./utils/awaitTo";
import type { ToFunction } from "./utils/awaitTo";
// rewriteUniFn
import { toast, RewriteFn, showErrorToast } from "./utils/rewriteUniFn";
// tool
import tool, { ICommontsFunc } from "./utils/common";

// 类型声明
declare module "@vue/runtime-core" {
	interface ComponentCustomProperties {
		/**
		 * 工具类
		 */
		$tool: ICommontsFunc;
		/**
		 * 微信小程序状态栏高度
		 */
		$statusBarHeight: number;
		/**
		 * 处理async抛异常
		 */
		$to: ToFunction;
		/**
		 * 重写 wx.showToast 方法
		 */
		$toast: RewriteFn["toast"];
		$showErrorToast: RewriteFn["showErrorToast"];
	}
}

export function createApp() {
	const app = createSSRApp(App);

	// 重写 showToast 方法
	app.config.globalProperties.$toast = toast;
	app.config.globalProperties.$showErrorToast = showErrorToast;
	app.config.globalProperties.$to = to as ToFunction;
	app.config.globalProperties.$tool = tool;
	app.config.globalProperties.$statusBarHeight = uni.getSystemInfoSync().statusBarHeight as number;

	app.use(pinia);
	app.use(uviewPlus);
	app.use(directives);
	return {
		app
	};
}
