<template>
    <view class="tabbar-home">
        <!-- 拱形区域 -->
        <view class="arched"></view>
        <view class="arched-bg"></view>
        <!-- 盒子 -->
        <view class="tabbar-container" v-if="true">
            <view class="tabbar-item" v-for="(item, index) in tabbarList" :class="[item.centerItem ? ' center-item' : '']" @click="changeItem(item)">
                <view class="item-top">
                    <view class="item-bg-img" :class="[currentItem == item.id ? 'item-bg-active' : '']">
                    	<image :src="currentItem == item.id ? item.selectIcon : item.icon"></image>
                    </view>
                </view>
                <view class="item-bottom" :class="[currentItem == item.id ? 'item-active' : '']">
                    <text>{{ item.text }}</text>
                </view>
            </view>
        </view>
    </view>
</template>
<script setup>
import { defineProps, onMounted, ref } from 'vue'
const props = defineProps({
    curr: {
        type: Number,
        default: 0,
    },
})
const currentItem = ref(0)
const tabbarList = ref([
    {
        id: 0,
        path: '/pages/index/index',
        icon: '/static/tabBar/home.png',
        selectIcon: '/static/tabBar/home-act.png',
        text: '数据',
        centerItem: false,
    },
    {
        id: 1,
        path: '/pages/classify/classify',
        icon: '/static/tabBar/shop.png',
        selectIcon: '/static/tabBar/shop-act.png',
        text: '订单',
        centerItem: true,
    },
    {
        id: 2,
        path: '/pages/me/me',
        icon: '/static/tabBar/me.png',
        selectIcon: '/static/tabBar/me-act.png',
        text: '我的',
        centerItem: false,
    }
])
const emit = defineEmits(['change'])
function changeItem(item) {
    currentItem.value = item.id
	uni.redirectTo({  //
		url: item.path
	});
}
 
onMounted(() => {
    currentItem.value = props.curr
    // 非微信小程序需隐藏原生tabBar（微信小程序已通过"custom": true配置项隐藏原生tabbar）
    if (process.env.VUE_APP_PLATFORM != 'mp-weixin') {
        uni.hideTabBar()
    }
})
</script>
 
<style lang="scss" scoped>
.tabbar-home {
    z-index: 20090;
    height: 100rpx;
    position: fixed;
    left: 0;
    bottom: 0;
    box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
    width: 100%;
    box-sizing: content-box;
    padding-bottom: env(safe-area-inset-bottom) !important;
}
view {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
 
.tabbar-container {
    position: absolute;
    bottom: 0rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    /* box-shadow: 0 0 5px    #8d6c36; */
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 5rpx 0;
    color: #8d6c36;
    height: 100%;
    padding-bottom: env(safe-area-inset-bottom) !important;
    box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
    background-color: rgba(255, 255, 255, 1);
    z-index: inherit;
}
 
.tabbar-container .tabbar-item {
    width: 20%;
    height: 80rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}
 
.tabbar-container .item-active {
    color: #0183E5;
}
 
.tabbar-container .center-item {
    display: block;
    position: relative;
    // margin-top: 20rpx;
	// border: 1px solid red;
}
 
.tabbar-container .tabbar-item .item-top {
    width: 60rpx;
    height: 60rpx;
    // padding: 10rpx;
    background: #ffffff;
}
 
.tabbar-container .center-item .item-top {
    flex-shrink: 0;
    // width: 100%;
	width: 120rpx;
    height: 120rpx;
    position: absolute;
    top: -70rpx;
	left: 50%;
	transform: translateX(-50%);
    border-radius: 50%;
    // box-shadow: 0 0 5px #999;
	display: flex;
	align-items: center;
	justify-content: center;
}

.tabbar-container .center-item .item-top .item-bg-img{
	// width: 100rpx;
	// height: 100rpx;
	padding: 16rpx;
	border-radius: 50%;
	background-color: #0183E5; ;  //#F7A532 #f3d9a6  #2053FE
	// margin-bottom: 20rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.tabbar-container .center-item .item-top .item-bg-active{
	background-color: #F7A532;
}
 
.tabbar-container .tabbar-item .item-top image {
    width: 40rpx;
    height: 40rpx;
}
 
.tabbar-container .center-item .item-top image {
    width: 70rpx;
    height: 70rpx;
	object-fit: cover;
	// border: 1px solid red;
}
 
.tabbar-container .tabbar-item .item-bottom {
    font-size: 26rpx;
    width: 100%;
}
 
.tabbar-container .center-item .item-bottom {
    position: absolute;
    bottom: 0;
}

.arched {
    width: 120rpx;
    height: 120rpx;
    left: 50%;
    top: -42rpx;
    position: absolute;
    transform: translateX(-50%);
    border-radius: 50%;
    box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
    // background-color: rgba(255, 255, 255, 1);
	// background-color: rgba(255, 126, 34, 1.0);
    // border: 2rpx solid rgba(0, 0, 0, 0.1);
    z-index: 20089;
}
.arched-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 20089;
    background-color: rgba(255, 255, 255, 1);
}
</style>