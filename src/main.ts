import { createSSRApp } from "vue";
import App from "./App.vue";
// unocss
import "uno.css";
// pinia store
import pinia from "@/stores/index";
// uview
import uviewPlus from "uview-plus";

export function createApp() {
	const app = createSSRApp(App);
	app.use(pinia);
	app.use(uviewPlus);
	return {
		app
	};
}
