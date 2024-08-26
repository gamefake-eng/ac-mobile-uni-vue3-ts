import { defineConfig, presetAttributify, presetIcons, transformerDirectives, transformerVariantGroup } from "unocss";
import type { Preset, SourceCodeTransformer } from "unocss";

import { presetApplet, presetRemRpx, transformerAttributify } from "unocss-applet";

const isH5 = process.env.UNI_PLATFORM === "h5";

const courseColors = [
	"rose",
	"pink",
	"fuchsia",
	"purple",
	"violet",
	"indigo",
	"blue",
	"cyan",
	"teal",
	"emerald",
	"green",
	"lime",
	"yellow",
	"amber",
	"orange",
	"red"
];

// uni-app，mp-开头的平台为小程序
const isApplet = process.env?.UNI_PLATFORM?.startsWith("mp-") ?? false;

const presets: Preset[] = [];
const transformers: SourceCodeTransformer[] = [];

if (isApplet) {
	presets.push(presetApplet());
	presets.push(presetRemRpx());
	transformers.push(transformerAttributify({ ignoreAttributes: ["block"] }));
} else {
	presets.push(presetApplet());
	presets.push(presetAttributify());
	// h5模式，将rpx转换为rem
	presets.push(presetRemRpx({ mode: "rpx2rem" }));
}

export default defineConfig({
	shortcuts: {
		"bg-base": "bg-gray-100 dark:bg-dark",
		"bg-base-second": "bg-white dark:bg-dark-100",
		"color-base": "text-gray-700 dark:text-white/80",
		"color-base-second": "text-gray-400 dark:text-gray-500/50",
		"text-primary": "text-blue-500",
		"border-base": "border border-gray-200 dark:border-gray/50",
		"bg-primary": "bg-light-blue-500 dark:bg-light-blue-600/80",
		"flex-center": "flex items-center justify-center",
		"flex-between": "flex justify-between",
		"flex-algin": "flex items-center",
		"flex-col-end": "flex flex-col justify-end",
		"footer-btn-fixed": "fixed w-100% bottom-0 left-0 p-4",
		"transform-x-center": "transform-translate-x-(-1/2) left-1/2",
		"transform-center": "translate-(-1/2) left-1/2 top-1/2",
		"absolute-center": "absolute translate-(-1/2) left-1/2 top-1/2",
		"absolute-level__center": "absolute translate-x-(-1/2) left-1/2",
		"absolute-right": "absolute translate-Y-(-1/2) right-4 top-1/2",
		"fixed-top": "fixed w-100% top-0 left-0",
		"fixed-bottom": "fixed w-100% bottom-0 left-0",
		"border-list__bottom": "b-b-1 b-b-gray-1 b-b-solid",
		"border-list__bottom2": "b-b-1 b-b-gray-2 b-b-solid"
	},
	presets: [
		presetIcons({
			scale: 1.2,
			extraProperties: {
				display: "inline-block",
				"vertical-align": "middle"
			}
		}),
		...presets
	],
	theme: {
		// 解决小程序不支持 * 选择器
		preflightRoot: ["page,::before,::after"]
	},
	transformers: [
		transformerDirectives(),
		transformerVariantGroup(),
		// Don't change the following order
		...transformers
	],
	rules: [
		[/^m-(\d+)$/, ([, d]) => ({ margin: `${+d / 4}rem` })],
		[/^p-(\d+)$/, match => ({ padding: `${+match[1] / 4}rem` })],
		[/^fw-(\d+)$/, ([, d]) => ({ "font-weight": `${+d * 100}` })],

		[
			"p-safe",
			{
				padding: "env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)"
			}
		],
		["pt-safe", { "padding-top": "env(safe-area-inset-top)" }],
		["pb-safe", { "padding-bottom": "env(safe-area-inset-bottom)" }]
	],
	safelist: [...courseColors.map(c => `bg-${c}`), ...courseColors.map(c => `bg-${c}-3`), ...courseColors.map(c => `text-${c}-5`)]
});
