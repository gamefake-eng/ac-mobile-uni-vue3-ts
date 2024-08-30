<template>
	<view class="content" p="x-2">
		<view>
			<view p="y-2" text="2xl">uview-plus使用</view>
			<view>
				<u-button type="primary" size="large" text="uview-plus" />
			</view>
		</view>
		<view>
			<view p="y-2" text="2xl">unocss使用</view>
			<view> text="2xl" p="y-2" </view>
		</view>
		<view>
			<view p="y-2" text="2xl">Pinia使用</view>
			<u-button type="primary" size="large" text="getStoreData" @tap="getStoreData" />
		</view>
		<view>
			<view p="y-2" text="2xl">axios请求</view>
			<view @tap="getUserInfo"> 查看getUserInfo方法 </view>
		</view>
		<view>
			<view p="y-2" text="2xl">文件上传</view>
			<uni-file-picker @select="handleUploadSelect" ref="files" :auto-upload="false" />
			<u-button type="primary" size="large" text="上传文件" @tap="upload" />
		</view>
	</view>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from "vue";
import type { ComponentInternalInstance } from "vue";
// pinia
import { GlobalStore } from "@/stores";
// 接口
import { loginApi } from "@/api";
// 文件上传
import { useFiles } from "@/hooks/useUploadFile";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const globalStore = GlobalStore();

const getStoreData = () => {
	uni.showToast({
		title: "默认主题色：" + globalStore.themeConfig.primary
	});
};

const getUserInfo = async () => {
	const [err, res] = await proxy!.$to(
		loginApi.login({
			mobile: "13811112222",
			password: "123456"
		})
	);

	if (err) {
		uni.hideLoading();

		proxy!.$toast({ title: "获取数据失败", icon: "none" });

		proxy!.$showErrorToast(proxy!.$toast, err);

		return;
	}

	console.log(res!.data);
};

// *** 上传文件

const imageValue = ref<any[]>([]);

const handlerUploadData = async (data: any[]) => {
	// 转换名称
	data.forEach(file => {
		file.name = `${Date.now()}${file.name}`;
	});
};

const handleUploadSelect = (files: any[]) => {
	imageValue.value = files;
};

const upload = () => {
	handleUploadMessage(imageValue.value);
};

const { handleUploadMessage } = useFiles([], handlerUploadData, proxy!.$tool.uuid);
</script>

<style></style>
