// 类型声明
export interface ICommontsFunc {
	copy: (data: any) => any;

	padZero: (num: number) => string | number;

	getCurRoute: () => string;

	getRandomCode(length?: number): string | false;

	uuid(len?: number, radix?: number): string;

	uniqueFunc(arr: Array<any>, uniId: string): Array<any>;

	getNowDate(show: boolean): string;

	/**
	 * 转换时间格式 formatDate(new Date(),"yyyy-MM-dd hh:mm:ss")
	 */
	formatDate(date: Date, fmt?: string, isShowWeek?: boolean): string;

	deleteEmptyAttr(obj: any): any;

	downFile(href: string): void;

	randomNum(min: number, max: number): number;

	filterArr(keys: Array<string>, val: string, arr: Array<any>): any[];

	timeDiff(time: string | number, isFull?: boolean): number;

	removeFileSuffix(str: string): string;

	getFileSuffix(str: string): string;

	fileSizeFormatConversion(size: number): string;

	getImageSrc(id: string): string;

	queryObjConversionUrlParams(query: any): string;

	getAllDate(dates?: number): {
		firstHalfYearRange: string[];
		secondHalfYearRange: string[];
	};

	weeklyDates(formattedHalfYearDates: string[]): string[][];

	isWeekend(dateString: string): boolean;

	isSaturday(dateString: string): boolean;
}

function padLeftZero(str: string) {
	return ("00" + str).substr(str.length);
}

export default <ICommontsFunc>{
	// 拷贝
	copy(data: any) {
		return JSON.parse(JSON.stringify(data));
	},

	// 加0
	padZero(num: number) {
		return num < 10 ? "0" + num : num;
	},

	// 当前路由
	getCurRoute() {
		let routes = getCurrentPages();
		let curRoute = routes[routes.length - 1] && routes[routes.length - 1].route;

		return curRoute;
	},

	// 随机ID
	getRandomCode(length = 20) {
		if (length > 0) {
			let data = [
				"0",
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"9",
				"A",
				"B",
				"C",
				"D",
				"E",
				"F",
				"G",
				"H",
				"I",
				"J",
				"K",
				"L",
				"M",
				"N",
				"O",
				"P",
				"Q",
				"R",
				"S",
				"T",
				"U",
				"V",
				"W",
				"X",
				"Y",
				"Z",
				"a",
				"b",
				"c",
				"d",
				"e",
				"f",
				"g",
				"h",
				"i",
				"j",
				"k",
				"l",
				"m",
				"n",
				"o",
				"p",
				"q",
				"r",
				"s",
				"t",
				"u",
				"v",
				"w",
				"x",
				"y",
				"z"
			];
			let nums = "";
			for (let i = 0; i < length; i++) {
				let r = parseInt(Math.random() * 61 + "");
				nums += data[r];
			}
			return nums;
		} else {
			return false;
		}
	},

	// 随机ID 指定长度和基数
	uuid(len = 16, radix = 16) {
		let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
		let uuid: any[] = [],
			i;
		radix = radix || chars.length;

		if (len) {
			// Compact form
			for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
		} else {
			// rfc4122, version 4 form
			let r;

			// rfc4122 requires these characters
			uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
			uuid[14] = "4";

			// Fill in random data.  At i==19 set the high bits of clock sequence as
			// per rfc4122, sec. 4.1.5
			for (i = 0; i < 36; i++) {
				if (!uuid[i]) {
					r = 0 | (Math.random() * 16);
					uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
				}
			}
		}

		return uuid.join("");
	},

	/**
	 * 数组对象去重
	 * @param {*} arr 数组
	 * @param {*} uniId 唯一字段
	 * @returns {Array<any>}
	 */
	uniqueFunc(arr: Array<any>, uniId: string): Array<any> {
		const res = new Map();
		return arr.filter(item => !res.has(item[uniId]) && res.set(item[uniId], 1));
	},

	// show 添加 - 间隔时间
	getNowDate(show = true) {
		let date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
		let resDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
		return show ? year + "-" + month + "-" + resDate : year + "" + month + "" + resDate;
	},

	/**
	 * 转换时间格式 formatDate(new Date(),"yyyy-MM-dd hh:mm:ss")
	 * @param date
	 * @param fmt "yyyy-MM-dd hh:mm:ss"
	 * @param isShowWeek 是否显示周
	 * @returns
	 */
	formatDate(date: Date, fmt = "yyyy-MM-dd hh:mm:ss", isShowWeek = false) {
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		let week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][date.getDay()];
		let o: any = {
			"M+": date.getMonth() + 1,
			"d+": date.getDate(),
			"h+": date.getHours(),
			"m+": date.getMinutes(),
			"s+": date.getSeconds()
		};
		for (let k in o) {
			if (new RegExp(`(${k})`).test(fmt)) {
				let str = o[k] + "";
				fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
			}
		}
		return isShowWeek ? week : fmt;
	},

	// 删除空的搜索项 deleteEmptyAttr({a:"213",b:""}) :{a: '213'}
	deleteEmptyAttr(obj: any) {
		return Reflect.ownKeys(obj)
			.filter(item => {
				return typeof obj[item] !== "string" ? true : obj[item].trim();
			})
			.reduce((acc: any, cur) => {
				acc[cur] = obj[cur];
				return acc;
			}, {});
	},

	// 下载文件
	downFile(href: string) {
		// 创建a标签
		let eleLink = document.createElement("a");
		eleLink.style.display = "none";
		eleLink.href = href;
		// 触发点击
		document.body.appendChild(eleLink);
		eleLink.click();
		// 然后移除
		document.body.removeChild(eleLink);
	},

	/*
	 * 获取随机数字
	 * @param {int} min 最小值
	 * @param {int} max 最大值
	 * @return int
	 */
	randomNum(min: number, max: number) {
		return Math.floor(Math.random() * (max - min) + min);
	},

	/**
	 * 筛选数组
	 * @return Array<any> 筛选结果
	 */
	filterArr(keys: Array<string>, val: string, arr: Array<any>) {
		if (keys.length <= 0) {
			return arr;
		}

		return arr.filter(item => {
			for (let key in keys) {
				let i = keys[key];
				if (item[i] && (item[i] + "").indexOf(val) > -1) {
					return true;
				}
			}

			return false;
		});
	},

	/**
	 * 计算时间差 正数提前 负数表示超期
	 * @param {string | number} time 时间
	 * @return number
	 */
	timeDiff(time: string | number, isFull = false) {
		let now = new Date(isFull ? "" : this.formatDate(new Date(), "yyyy-MM-dd"));
		let t = new Date(time);

		return +now - +t;
	},

	/**
	 * get文件后缀
	 * @return string
	 */
	getFileSuffix(str: string): string {
		return str.slice(str.lastIndexOf("."));
	},

	/**
	 * 去除文件后缀
	 * @return string
	 */
	removeFileSuffix(str: string): string {
		return str.slice(0, str.lastIndexOf("."));
	},

	/**
	 * 文件大小格式转换
	 * 0b 1kb 2mb 3gb
	 * @return string
	 */
	fileSizeFormatConversion(size: number) {
		let temp = size;
		let i = 0;

		const sizeInUp = (s: number) => s / 1024;

		while (temp > 1024) {
			temp = sizeInUp(temp);
			i++;
		}

		const sizeKey: { [key: number]: string } = {
			0: `${temp.toFixed(2)}B`,
			1: `${temp.toFixed(2)}K`,
			2: `${temp.toFixed(2)}M`,
			3: `${temp.toFixed(2)}G`
		};

		return sizeKey[i];
	},

	/**
	 * 获取图片地址
	 * @param id
	 * @returns
	 */
	getImageSrc(id: string) {
		return `${import.meta.env.VITE_BASE_URL}file_out/image/${id}`;
	},

	/**
	 * query对象转化格式 {id:1,type:"my"} => id=1&type=my
	 * @param query {}
	 * @returns string
	 */
	queryObjConversionUrlParams(query: any) {
		return Object.entries(query)
			.map(_ => `${_[0]}=${_[1]}`)
			.join("&");
	},

	/**
	 *
	 * 获取dates月份的全部日期 前半年和后半年
	 */
	getAllDate(dates = 6): {
		firstHalfYearRange: string[];
		secondHalfYearRange: string[];
	} {
		// 获取当前日期
		const currentDate = new Date();

		// 创建一个空数组来存储日期
		const firstHalfYearRange: string[] = [];
		const secondHalfYearRange: string[] = [];

		// 计算前半年的日期
		const sixMonthsAgo = new Date(currentDate);
		sixMonthsAgo.setMonth(currentDate.getMonth() - dates);

		// 格式化日期并返回数组
		const formatDate = (date: Date) => {
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, "0");
			const day = String(date.getDate()).padStart(2, "0");
			return `${year}-${month}-${day}`;
		};

		// 添加前半年的日期到数组
		while (sixMonthsAgo <= currentDate) {
			firstHalfYearRange.push(formatDate(new Date(sixMonthsAgo)));
			sixMonthsAgo.setDate(sixMonthsAgo.getDate() + 1);
		}

		// 清除当天日期
		firstHalfYearRange.pop();

		// 计算后半年的日期
		const sixMonthsLater = new Date(currentDate);
		sixMonthsLater.setMonth(currentDate.getMonth() + dates);

		// 添加后半年的日期到数组
		while (currentDate <= sixMonthsLater) {
			secondHalfYearRange.push(formatDate(new Date(currentDate)));
			currentDate.setDate(currentDate.getDate() + 1);
		}

		// 格式化日期并返回数组
		return { firstHalfYearRange, secondHalfYearRange };
	},

	// 是否是周末
	isWeekend(dateString): boolean {
		const date = new Date(dateString);
		const dayOfWeek = date.getDay();
		return dayOfWeek === 0 || dayOfWeek === 6;
	},

	// 是否是周六
	isSaturday(dateString): boolean {
		const date = new Date(dateString);
		const dayOfWeek = date.getDay();
		return dayOfWeek === 6;
	},

	// 格式转换 周日为第一天
	weeklyDates(formattedHalfYearDates: string[]): string[][] {
		// 创建一个二维数组来存储按周分组的日期
		const weeklyDates: string[][] = [];

		// 初始化当前周的起始日期
		let currentWeekStart = formattedHalfYearDates[0];

		// 遍历日期数组并按周分组
		formattedHalfYearDates.forEach((date, index) => {
			// 如果日期跨年，则将当前周的结束日期设置为前一天
			if (date < currentWeekStart) {
				currentWeekStart = date;
			}

			// 如果日期是周末或者是最后一个日期，表示一周结束
			if (isSaturday(date) || index === formattedHalfYearDates.length - 1) {
				weeklyDates.push(getWeekDates(currentWeekStart, date));

				// 更新下一周的起始日期
				currentWeekStart = getNextWeekStartDate(date);
			}
		});

		// 判断日期是否是周六
		function isSaturday(dateString: string) {
			const date = new Date(dateString);
			const dayOfWeek = date.getDay();
			return dayOfWeek === 6;
		}

		// 获取下一周的起始日期
		function getNextWeekStartDate(dateString: string) {
			const date = new Date(dateString);
			date.setDate(date.getDate() + 1); // 增加一天
			while (date.getDay() !== 1) {
				date.setDate(date.getDate() + 1); // 找到下周的第一个星期一
			}
			return date.toISOString().substr(0, 10);
		}

		// 获取一周内的日期数组
		function getWeekDates(startDate: string, endDate: string) {
			const weekDates: string[] = [];
			const currentDate = new Date(startDate);
			while (currentDate <= new Date(endDate)) {
				weekDates.push(currentDate.toISOString().substr(0, 10));
				currentDate.setDate(currentDate.getDate() + 1);
			}

			return weekDates;
		}

		return weeklyDates;
	}
};
