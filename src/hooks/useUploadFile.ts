/* eslint-disable camelcase */
import { reactive } from "vue";
import { fileApi } from "@/api";

// 操作文件上传
import CryptoJS from "crypto-js";
import mime from "mime";
import { config } from "@/config/config";
// TOOL
import TOOL from "@/utils/common";
// toast
import { toast } from "@/utils/rewriteUniFn";

export type DirectFileTypes = {
	url: string; // 接口地址
	fileUrl: string; // 本地文件路径
	name?: string; // 文件名称
	[key: string]: unknown; // 携带的参数
};

/**
 * 处理文件上传
 * @param list 默认文件列表
 * @param uid 上传文件id方法
 * @param sliceSize 文件切片大小限制 默认 8MB
 * @param isSingle 是否单文件上传
 * @returns
 */
export const useFiles = <T>(
	list: T[] = [],
	cb: (data: any) => void,
	uid: (len?: number, radix?: number) => string,
	sliceSize?: number,
	isSingle?: boolean
) => {
	const state = reactive<{ list: T[] }>({
		list: list // 现有文件列表
	});

	let sz = sliceSize || config.FILE_SLICE_SIZE;

	// 文件直传
	const directFile = (data: DirectFileTypes): Promise<any> => {
		const base = import.meta.env.VITE_BASE_URL;
		return new Promise((resolve, reject) => {
			const token = uni.getStorageSync("token");

			uni.uploadFile({
				url: base + data.url,
				filePath: data.fileUrl, //本地文件路径
				name: data.name ? data.name : "circleImg",
				formData: data, //其他参数
				header: {
					"Content-Type": "multipart/form-data",
					[config.TOKEN_KEY]: `${config.TOKEN_BASE} ${token}`
				},
				success: res => {
					resolve(res);
				},
				fail: err => {
					reject(err);
				}
			});
		});
	};

	/**
	 * Uploader文件上传组件
	 * @param evt 文件属性
	 */
	const handleUploadMessage = async (evt: any) => {
		console.log("Uploader文件上传组件参数", evt);

		// 单文件上传处理
		const files = isSingle ? [evt.tempFiles] : evt.tempFiles;

		uni.$emit("showLoading", "上传文件中...");

		try {
			let resData: any[] = [];

			for (let i = 0; i < files.length; i++) {
				let file = files[i];

				// wx读取文件信息
				const res: UniApp.ReadFileSuccessCallbackResult = (await readFileAsync({
					filePath: file.url as string
				})) as any;
				// 文件流
				let data = res.data as ArrayBuffer;

				// tempFilePath为微信文件选择器返回的临时路径
				const mimeType = mime.getType(file.url);

				// 初始化参数
				file.mimeType = mimeType;
				file.index = 0;
				file.total = 1;
				file.upload_id = uid && uid(16);
				// 文件名称 不能获取到文件名称使用wechat_随机名称
				file.name = file.name || `wechat_${TOOL.getRandomCode(10)}${file.url.slice(file.url.lastIndexOf("."), file.url.length)}`;

				// cb(resData);
				// uni.$emit("hideLoading");

				// return;

				const uint8Array = new Uint8Array(data);
				const message = CryptoJS.lib.WordArray.create(uint8Array);
				const md5 = CryptoJS.MD5(message).toString(); // hash

				// 处理快传
				await handlerQuickUpload(md5)
					.then(res => {
						console.log("文件快传", res);

						toast({
							icon: "none",
							title: "上传成功"
						});

						// 快传使用 上传时的文件名
						res.data.file_name = file.name;

						// 返回值
						resData.push(res.data);

						// uni.$emit("hideLoading");
					})
					.catch(async err => {
						// 文件不能快传
						if (err?.code === 1) {
							// 8m切片
							if (file.size > sz) {
								file.index = 0;
								file.total = Math.ceil(file.size / sz); // 切片个数

								let res: any = {} as any;
								while (file.index < file.total) {
									let start = file.index * sz;
									let end = (file.index + 1) * sz;
									end = end > data.byteLength ? data.byteLength : end;

									// await 等待前一个文件上传完毕
									res = await upload(file, data.slice(start, end));

									file.index++;
								}

								// 执行合并接口
								res = await merge(file);

								if (res.data) {
									resData.push(res.data);
								}
							} else {
								let res: any = await upload(file, data);

								// 执行合并接口
								res = await merge(file);

								// 快传使用 上传时的文件名
								res.data.file_name = file.name;

								resData.push(res.data);
							}
						}

						// uni.$emit("hideLoading");
					});
			}

			console.log("Uploader文件上传完毕-进入回调函数", resData);
			cb(resData);
			uni.$emit("hideLoading");
		} catch (error) {
			console.error("Uploader文件上传完毕-error", error);
			uni.$emit("hideLoading");

			toast({
				icon: "none",
				title: "文件上传失败"
			});
		}
	};

	// 封装 readFile
	function promisify(func: (option: UniApp.ReadFileOption) => void) {
		return (args: UniApp.ReadFileOption = {} as UniApp.ReadFileOption) =>
			new Promise((resolve, reject) => {
				func(
					Object.assign(args, {
						success: resolve,
						fail: reject
					})
				);
			});
	}

	// 在使用readFile的地方调用readFileAsync即可
	const readFileAsync = (option: UniApp.ReadFileOption) => {
		// #ifdef MP-WEIXIN
		return promisify(uni.getFileSystemManager().readFile)(option);
		// #endif

		// #ifdef APP

		// #endif

		// #ifdef WEB
		uni.request({
			// 本地文件
			url: option.filePath,
			success(res) {
				console.log("内容", res);
			}
		});

		return promisify(uni.getFileInfo)(option);
		// #endif
	};

	// 文件上传
	const upload = async (file: any, data: any) => {
		return await fileApi.upload({
			fileUrl: file.url as string,
			chunk: data,
			upload_id: file.upload_id,
			file_name: file.name,
			content_type: file.mimeType, // 文件类型
			index: file.index, // 排序
			total: file.total //
		});
	};

	// 文件合并
	const merge = async (file: any) => {
		return await fileApi.merge({
			upload_id: file.upload_id,
			file_name: file.name,
			content_type: file.mimeType // 文件类型
		});
	};

	// 文件快速上传
	const handlerQuickUpload = async (md5: string) => {
		return await fileApi.quickFile(md5);
	};

	return {
		list: state.list,
		upload,
		directFile,
		handleUploadMessage,
		readFileAsync
	};
};
