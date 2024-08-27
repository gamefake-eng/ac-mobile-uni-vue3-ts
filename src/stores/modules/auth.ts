import { defineStore } from "pinia";
import { AuthState } from "@/stores/interface/auth";

// AuthStore
export const AuthStore = defineStore({
	id: "AuthState",
	state: (): AuthState => ({
		// 当前页面的 router name，用来做按钮权限筛选
		routeName: "test",
		// 按钮权限列表
		authButtonList: {
			test: ["add", "update"]
		}
	}),
	getters: {
		// 按钮权限列表
		authButtonListGet: state => state.authButtonList
	},
	actions: {}
});
