import { defineStore, createPinia } from "pinia";
import type { GlobalState, ThemeConfigProps } from "./interface/index";
import { DEFAULT_PRIMARY } from "@/config/config";
import piniaPersistConfig from "@/config/piniaPersist";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const GlobalStore = defineStore({
	// id: 必须的，在所有 Store 中唯一
	id: "GlobalState",
	// state: 返回对象的函数
	state: (): GlobalState => ({
		// token
		token: "",
		// userInfo
		userInfo: "",
		// language
		language: "",
		// themeConfig
		themeConfig: {
			// 默认 primary 主题颜色
			primary: DEFAULT_PRIMARY,
			// 深色模式
			isDark: false
		}
	}),
	getters: {},
	actions: {
		// setToken
		setToken(token: string) {
			this.token = token;
		},
		// setUserInfo
		setUserInfo(userInfo: any) {
			this.userInfo = userInfo;
		},
		// updateLanguage
		updateLanguage(language: string) {
			this.language = language;
		},
		// setThemeConfig
		setThemeConfig(themeConfig: ThemeConfigProps) {
			this.themeConfig = themeConfig;
		}
	},
	persist: piniaPersistConfig("GlobalState")
});

// piniaPersist(持久化)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
