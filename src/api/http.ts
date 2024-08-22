/**
 * import.meta.env.VITE_BASE_URL：.env文件配置BASE_URL接口地址
 * 接口重发：config:{ retry: 5, retryDelay: 1000 }
 * loading：config:{ loading: true} // loading加载效果不能与重发一起存在
 */

import { TOKEN_STORAGE_KEY, TOKEN_KEY, TOKEN_BASE } from "@/config/config";
import axios, { Axios, AxiosResponseError } from "axios-miniprogram";

const http: Axios = axios;

http.defaults.timeout = 20000;

// 接口重发记录
const configRetry: any = {};

// 刷新token后需要重发的列表
const refreshTokenList: any[] = [];

// 请求base路径
http.defaults.baseURL = import.meta.env.VITE_BASE_URL;
// import.meta.env.VITE_BASE_URL
http.defaults.headers = {
	"content-Type": "application/json"
};

http.interceptors.request.use(
	config => {
		// 所有请求都携带token
		const token = uni.getStorageSync(TOKEN_STORAGE_KEY);
		config.headers = {
			...config.headers,
			[TOKEN_KEY]: `${TOKEN_BASE} ${token}`
		};

		// 请求方式为 get 加上接口重发
		if (config.method === "get") {
			config.retry = 2;
			config.retryDelay = 500;
		}

		console.log("发送之前操作config", config);

		// loading
		if (config.loading && !config.retry) uni.$emit("showLoading");

		// 发送之前操作config
		return config;
	},
	(err: any) => {
		if (err.status !== 200) {
			// 处理错误
			console.log("处理错误", err.status);
		}

		uni.$emit("hideLoading");
		return Promise.reject(err);
	}
);
/**
 * 响应拦截
 */
http.interceptors.response.use(
	(response: any) => {
		// 对拿到的数据做一些额外操作操作 (如无权限,直接跳转首页)
		const { code, message } = response.data;
		console.log("响应拦截", response);
		if (code !== 0) {
			if (message) {
				console.log("响应拦截message", message);
			}
			// 走catch逻辑
			return Promise.reject(response.data);
		}

		// 清空接口重发记录操作
		configRetry[response.config.url] = 0;

		// 返回前操作
		return response.data;
	},
	async function axiosRetryInterceptor(err: any) {
		uni.$emit("hideLoading");

		const token = uni.getStorageSync(TOKEN_STORAGE_KEY);
		const config = err.config;
		// 重置token
		config.headers[TOKEN_KEY] = `${TOKEN_BASE} ${token}`;

		console.log("进入接口重发:", configRetry, configRetry[config.url], err.response);

		// token过期 重新登陆
		if (err.response && err.response.status === 401) {
			console.log(`token过期 重新登陆`, token);

			// await useRefreshToken();
		}

		// If config does not exist or the retry option is not set, reject
		if (!config || !config.retry) return Promise.reject(err);

		// Set the variable for keeping track of the retry count
		configRetry[config.url] = configRetry[config.url] || 0;

		// Check if we've maxed out the total number of retries
		if (configRetry[config.url] >= config.retry) {
			// Reject with the error
			return Promise.reject(err);
		}

		// Increase the retry count
		configRetry[config.url] += 1;

		// Create new promise to handle exponential backoff
		var backoff = new Promise(function (resolve) {
			setTimeout(function () {
				resolve(undefined);
			}, config.retryDelay || 1);
		});

		// Return the promise in which recalls axios to retry the request
		return backoff.then(function () {
			console.log("接口重发成功", config.url);
			return axios(config);
		});
	}
);

/**
 * 错误处理
 */
export default http;
