import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";

// 自动导入插件
import AutoImport from "unplugin-auto-import/vite";

export default async () => {
	const Unocss = (await import("unocss/vite")).default;
	const { presetAttributify } = await import("unocss");

	return defineConfig({
		plugins: [
			uni(),
			Unocss({
				presets: [presetAttributify()]
			}),
			AutoImport({ imports: ["vue", "uni-app"] }),
			vueJsx()
		],
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src")
			}
		}
	});
};
