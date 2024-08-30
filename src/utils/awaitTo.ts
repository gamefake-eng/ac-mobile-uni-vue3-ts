/**
 * 替换 await 中的try-catch 的；
 * 通过封装 Promise的调用，将 error 和 data 以数组[error,resolveData]形式返回,实现类似try-catch的效果
 * @param promise promise
 * @param errorExt errorExt - Additional Information you can pass to the err object
 * @returns { Promise }
 */

export type ToFunction = <T, U = any>(promise: Promise<T>, errorExt?: object) => Promise<[U, undefined] | [null, T]>;

export function to<T, U = any>(promise: Promise<T>, errorExt?: object): Promise<[U, undefined] | [null, T]> {
	return promise
		.then<[null, T]>((data: T) => [null, data])
		.catch<[U, undefined]>((err: U) => {
			if (errorExt) {
				let parsedError = Object.assign({}, err, errorExt);
				return [parsedError, undefined];
			}

			return [err, undefined];
		});
}

export default to;
