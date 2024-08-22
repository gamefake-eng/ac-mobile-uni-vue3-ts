export interface RewriteFn {
	/**
	 * showToast
	 */
	toast: <T extends UniApp.ShowToastOptions = UniApp.ShowToastOptions>(
		option: T
	) => UniApp.PromisifySuccessResult<T, UniApp.ShowToastOptions>;

	/**
	 * 重写uni showToast 错误提示方法
	 */
	showErrorToast: (toastFn: (options: UniApp.ShowToastOptions) => void, err: Error) => void;
}

/**
 * 重写uni showToast 方法
 */
export function toast<T extends UniApp.ShowToastOptions = UniApp.ShowToastOptions>(
	option: T
): UniApp.PromisifySuccessResult<T, UniApp.ShowToastOptions> {
	// 重写延迟时间
	option.duration = 5000;
	option.icon = "none";

	return uni.showToast(option);
}

/**
 * 重写uni showToast 错误提示方法
 */
export const showErrorToast = (toastFn: (options: UniApp.ShowToastOptions) => void, err: any) => {
	let errStr = err.response?.data.message;
	toastFn({ icon: "none", title: errStr ? errStr : (err.message as string) });
};
