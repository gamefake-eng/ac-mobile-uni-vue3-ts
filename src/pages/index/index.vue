<template>
	<view class="content">
		<image class="logo" src="/assets/logo.png" />
		<view class="text-area">
			<text class="title" :text="title ? 'xl' : ''">{{ title }}</text>
			<u-button type="primary" size="large" text="test" />
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref } from "vue";
const title = ref("Hello");
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}
</style>
