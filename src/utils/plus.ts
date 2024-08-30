export const storage = (addr: string, data: string) => {
	return new Promise((resolve, reject) => {
		plus.io.requestFileSystem(
			plus.io.PUBLIC_DOCUMENTS, // 程序公用文档目录常量
			(fs: any) => {
				// 创建或打开文件, fs.root是根目录操作对象,直接fs表示当前操作对象
				fs.root.getFile(
					addr,
					{
						create: true // 文件不存在则创建
					},
					(fileEntry: any) => {
						// 文件在手机中的路径
						//console.log(fileEntry.fullPath)
						fileEntry.createWriter((writer: any) => {
							// 写入文件成功完成的回调函数
							// 向文件中写入数据
							writer.write(JSON.stringify(data));
							writer.onwrite = (e: any) => {
								resolve(e.target.fileName);
							};
						});
					},
					(e: any) => {
						console.log("getFile failed: " + e.message);
						reject(e);
					}
				);
			},
			e => {
				console.log(e.message);
			}
		);
	});
};
export const read = (addr: string) => {
	return new Promise((resolve, reject) => {
		plus.io.requestFileSystem(
			plus.io.PUBLIC_DOCUMENTS,
			(fs: any) => {
				fs.root.getFile(
					addr,
					{
						create: false
					},
					(fileEntry: any) => {
						fileEntry.file(function (file: any) {
							console.log("文件大小:" + file.size + "-- 文件名:" + file.name);
							//创建读取文件对象
							let fileReader = new plus.io.FileReader();
							//以文本格式读取文件数据内容
							fileReader.readAsText(file, "utf-8");
							//文件读取操作完成时的回调函数
							fileReader.onloadend = function (evt: any) {
								resolve(evt.target.result);
							};
						});
					},
					(e: any) => {
						reject(e);
					}
				);
			},
			e => {
				reject(e);
			}
		);
	});
};
