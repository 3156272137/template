<template>
	<view class="tabbar-box">
		<up-tabbar :value="tabbarVal" @change="onTabbar" :fixed="true" :zIndex="99" inactiveColor="#9d9d9d"
			activeColor="#0184E8" :safeAreaInsetBottom="true">
			<up-tabbar-item text="首页" icon="home"></up-tabbar-item>
			<up-tabbar-item text="购物车" icon="shopping-cart" :badge="badge"></up-tabbar-item>
			<up-tabbar-item text="我的" icon="account"></up-tabbar-item>
		</up-tabbar>
	</view>
</template>

<script setup>
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app'
	import {
		ref,
		inject,
		computed,
		reactive,
		onMounted
	} from 'vue'
	// import webPush from '../../utils/uniapp-push.js'
	// import config from "../../utils/config.js";
	// import tools from '../../utils/tools.js'

	const props = defineProps({
		curr: {
			type: Number,
			default: 0
		}
	})

	onMounted(() => {
		let cacheToken = uni.getStorageSync('token')
		// 登录状态才能查看购物车数据
		if (cacheToken) getCart()
		tabbarVal.value = props.curr
		actionPush()
	})

	function actionPush() {
		let userInfo = uni.getStorageSync('userInfo')
		console.log('userInfo', userInfo)
		// if (!getApp().globalData.wssConnection && userInfo.wholesale_id) {
		// 	getApp().globalData.wssConnection = new webPush({
		// 		url: config.wss, // websocket地址
		// 		app_key: config.wss_app_key,
		// 		// auth: '/plugin/webman/push/auth' // 订阅鉴权(仅限于私有频道)
		// 	});
		// 	console.log('connection')
		// 	console.log(getApp().globalData.wssConnection)
		// }
		// if (getApp().globalData.wssConnection) {
		// 	let user_channel_zone = getApp().globalData.wssConnection.subscribe('wholesale_' + userInfo.wholesale_id);
		// 	user_channel_zone.on('message', function(data) {
		// 		console.log('data 监听信息')
		// 		console.log(data)
		// 		//存在订单ID
		// 		if (data.type == 1 && data.all_order_id) {
		// 			uni.showModal({
		// 				content: '接收到代购订单，是否立即支付',
		// 				showCancel: false,
		// 				confirmText: '前往支付',
		// 				success: res => {
		// 					tools.toPage('orderDetail/orderDetail?all_order_id=' + data.all_order_id, 1)
		// 				}
		// 			});
		// 		}
		// 	});
		// }
	}


	const badge = ref(0)
	const getCart = async () => {
		let res = await getCartCount()
		badge.value = res.data.count
	}

	const tabbarVal = ref(1)
	const onTabbar = (i, name) => {
		tabbarVal.value = i

		switch (i) {
			case 0:
				uni.redirectTo({
					url: `/pages/index/index`
				});
				break;
			case 1:
				uni.redirectTo({
					url: `/pages/classify/classify`
				});
				break;
			case 2:
				uni.redirectTo({
					url: `/pages/me/me`
				});
				break
		}
	}

	defineExpose({
		getCart
	})
</script>

<style lang="scss" scoped>
	.tabbar-box {
		padding-bottom: 100rpx;
	}
</style>