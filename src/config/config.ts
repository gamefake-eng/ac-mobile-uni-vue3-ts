// ? 全局不动配置项 只做导出不做修改

// * 首页地址（默认）
export const HOME_URL = "/pages/home/index";

// * 登录页地址（默认）
export const LOGIN_URL = "/pages/login/login";

// * 默认主题颜色
export const DEFAULT_PRIMARY = "#009688";

// * 高德地图 key
export const AMAP_MAP_KEY = "";

// * 百度地图 key
export const BAIDU_MAP_KEY = "";

export const TOKEN_STORAGE_KEY = "";

export const TOKEN_KEY = "";

export const TOKEN_BASE = "";

export const config = {
	// TOKEN 本地存储key
	TOKEN_STORAGE_KEY: "token",

	// TOKEN 请求头
	TOKEN_KEY: "Authorization",

	// token 携带地址前缀
	TOKEN_BASE: "bearer",

	// TOKEN 刷新时间状态本地存储key string
	TOKEN_REFRESH_STORAGE_KEY: "refresh_ttl",

	// 用户退出登录状态本地存储key 0 1
	USER_LOGOUT_STORAGE_KEY: "user_logout",

	// 用户常用视图习惯本地存储key
	USER_COMMON_VIEW_STORAGE_KEY: "user_view",

	// 用户信息本地存储key
	USER_INFO_STORAGE_KEY: "user_info",

	// 角色 type
	ROLE_LIST: {
		staff: 0,
		supplier: 1
	},

	// 文件上传路径
	FILE_PATH: "",

	// 文件大小限制 默认 100MB
	FILE_MAX_SIZE: 1024 * 1024 * 100,

	// 文件切片大小限制 默认 8MB
	FILE_SLICE_SIZE: 1024 * 1024 * 8,

	// 文件上传数量限制
	FILE_MAX_COUNT: 9,

	// 预定员工餐提示框 本地存储key
	STAFF_MEAL_TIP_STORAGE_KEY: "staff_meal_tip",

	// 预定员工餐提示框过期时间 30天
	STAFF_MEAL_TIP_EXPIRE: 30
};
