import { createSSRApp } from "vue";
import App from "./App.vue";
// pinia store
import pinia from "@/stores/index";

export function createApp() {
	const app = createSSRApp(App);
	app.use(pinia);
	return {
		app
	};
}
