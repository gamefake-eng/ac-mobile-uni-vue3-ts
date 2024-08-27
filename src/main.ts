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

export function createApp() {
	const app = createSSRApp(App);
	app.use(pinia);
	app.use(uviewPlus);
	app.use(directives);
	return {
		app
	};
}
