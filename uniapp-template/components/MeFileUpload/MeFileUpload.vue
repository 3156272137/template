<template>
	<view class="container-image">
		<view class="item-box" v-for="(item,i) in filePathsList" :key="i">
			<view class="img-box">
				<image :src="item.imgUrl" mode="aspectFill"></image>
			</view>
			<view class="close" v-if="closeFlag" @click="onDel(i)">
				<uni-icons type="closeempty" color="#fff" size="16"></uni-icons>
			</view>
		</view>
		<view class="upload" @click="select" v-if="filePathsList.length < limit">
			<uni-icons type="plusempty" color="#333" size="30"></uni-icons>
		</view>
	</view>
</template>

<script>
	import config from "../../utils/config.js"
	export default {
		name: "file-picker-app",
		props: {
			limit: {
				type: Number,
				default: 1
			},
			fileList: {
				type: Array,
				default: []
			},
			closeFlag:{
				type : Boolean,
				default: true
			}
		},
		data() {
			return {
				// 回显的图片
				filePathsList: []
			};
		},
		watch:{
			fileList(newVal,oldVal){
				if(newVal.length > 0) {
					this.filePathsList = this.fileList
				}
			}
		},
		mounted() {},
		methods: {
			select(e) {
				const that = this
				uni.showLoading({
					title: '上传中...',
					mask: true
				})
				uni.chooseImage({
					count: that.limit, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						res.tempFiles.map((el) => {
							that.upFileImg(el.path)
						})
					},
					fail() {
						uni.hideLoading()
					}
				});

			},
			// 上传
			upFileImg(img_arr) {
				console.log('img_arr',img_arr);
				uni.uploadFile({
					url: `${config.baseURL}/supplierAuthApi/config/uplFile`,
					filePath: img_arr,
					name: 'file', // 字段名
					header:{
						token: uni.getStorageSync('token') ? uni.getStorageSync('token') : ''
					},
					formData: {
						'Content-Type': 'application/json;charset=utf-8'
					},
					success: (uploadFileRes) => {
						let {data:{data}} = JSON.parse(uploadFileRes.data)						
						let obj = {
							name: '',
							extname: '',
							url: data.storage_path,
							imgUrl:  data.url
						}
						this.filePathsList.push(obj)
						uni.hideLoading()
						// 返回给父组件
						this.$emit("imageUrl", this.filePathsList)
					},
					fail: (e) => {
						uni.hideLoading()
						uni.showToast({
							title: '上传失败，请刷新重试！',
							icon: 'none'
						})
					},
				})
			},
			// 删除图片
			onDel(index) {
				this.filePathsList = this.filePathsList.filter((el, i) => i != index)
				this.$nextTick(() => {
					this.$emit("imageUrl", this.filePathsList)
				})
			},
			reset() {}
		}
	}
</script>

<style lang="scss" scoped>
	.container-image {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex;

		// flex-direction: column;
		.upload {
			width: 200rpx;
			height: 200rpx;
			border-radius: 20rpx;
			border: 1px solid rgb(238, 238, 238);
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.item-box {
			margin-right: 20rpx;
			margin-bottom: 10rpx;
			position: relative;

			.img-box {
				width: 200rpx;
				height: 200rpx;

				image {
					border-radius: 10rpx;
					width: 100%;
					height: 100%;
				}
			}

			.close {
				position: absolute;
				top: 2%;
				right: 2%;
				width: 50rpx;
				height: 50rpx;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: rgba(0, 0, 0, .3);
			}
		}
	}
</style>