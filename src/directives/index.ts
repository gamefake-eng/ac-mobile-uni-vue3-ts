import { App } from "vue";
import auth from "./modules/auth";
import debounce from "./modules/debounce";
import throttle from "./modules/throttle";

const directivesList: any = {
	auth,
	debounce,
	throttle
};

const directives = {
	install: function (app: App<Element>) {
		Object.keys(directivesList).forEach(key => {
			// 注册所有自定义指令
			app.directive(key, directivesList[key]);
		});
	}
};

export default directives;
