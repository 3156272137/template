<template>
	<view class="">
		index
		<MeTabbar :curr="0"></MeTabbar>
	</view>
	
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		ref,
		inject
	} from 'vue'
	import {} from '@/api/index.js'
	
	const tools = inject("$tools")
</script>

<style lang="scss" scoped>
</style>