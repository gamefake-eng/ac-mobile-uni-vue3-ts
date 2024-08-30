import { config } from "@/config/config";
import http from "../http";

export type UploadFileTypes = {
	fileUrl: string; // 缓存路径
	chunk: any; // 文件主体
	upload_id: string; // 上传唯一id length:16
	file_name: string; // 文件名
	content_type: string; // 文件类型
	index: number; // 排序
	total: number; //
};

class Files {
	// 文件上传
	upload(data: UploadFileTypes, url = "files") {
		const params = {
			...data,
			url,
			fileUrl: data.fileUrl
		};

		const token = uni.getStorageSync(config.TOKEN_STORAGE_KEY);

		return new Promise<any>((resolve, reject) => {
			uni.request({
				url: `${import.meta.env.VITE_BASE_URL}files?index=${
					params.index
				}&total=${params.total}&file_name=${params.file_name}&content_type=${params.content_type}&upload_id=${params.upload_id}`,
				method: "POST",
				header: {
					"content-type": "application/octet-stream",
					[config.TOKEN_KEY]: `${config.TOKEN_BASE} ${token}`
				},
				// mode: 'cors', // 如果跨域，开启该配置
				data: params.chunk, // block为通过wx.getFileSystemManager().readFile得到的分块数据
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				}
			});
		});
	}

	// 文件合并
	merge(data: { upload_id: string; file_name: string; content_type: string }) {
		return http.post<any>(`/pan/file-merge`, { ...data });
	}

	// 文件快传
	quickFile(md5: string) {
		return http.get<any>(`files`, {
			hash: md5
		});
	}
}

export default new Files();
