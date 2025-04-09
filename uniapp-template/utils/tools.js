import config from "./config";
export default {
	/**跳转正常路径
	 *path(页面路径)
	 * @param (type:Number)  区分分包
	 */
	toPage(path, type = 0) {
		if (type == 1) uni.navigateTo({
			url: `/pages-sub/${path}`
		});
		else uni.navigateTo({
			url: `/pages/${path}`
		});
	},

	/**跳转Tab
	 *path(页面路径)
	 */
	toTab(path, type = 0) {
		uni.switchTab({
			url: `/pages/${path}`
		});
	},

	/**跳转到页面 -> 关闭当前页面
	 *path(页面路径)
	 */
	redirectTo(path, type = 0) {
		if (type == 1) uni.redirectTo({
			url: `/pages-sub/${path}`
		});
		else uni.redirectTo({
			url: `/pages/${path}`
		});
	},
	/**跳转到页面 -> 关闭所有页面
	 *path(页面路径)
	 */
	reLaunchTo(path, type = 0) {
		if (type == 1) uni.reLaunch({
			url: `/pages-sub/${path}`
		});
		else uni.reLaunch({
			url: `/pages/${path}`
		});
	},

	/**调用uni-popup open方法
	 *必须引入uni-popup后使用
	 */
	openPopup($refs, ref) {
		$refs[ref].open()
	},

	/**调用uni-popup close方法
	 *必须引入uni-popup后使用
	 */
	closePopup($refs, ref) {
		$refs[ref].close()
	},
	/**提示框
	 *title(标题)
	 *icon(图标):  success，loading，none，error
	 *duration(延时): 0为不关闭, 毫秒数
	 *options(其它参数)
	 */
	toast(title, icon = 'none', callback = () => {}, options = {
		duration: 2000
	}) {
		uni.showToast({
			title: title || '',
			icon: icon,
			// #ifdef MP-WEIXIN
			duration: (options && options.duration) || 2000,
			image: (options && options.image) || '',
			mask: (options && options.mask) || true,
			// #endif
			success() {
				setTimeout(callback, options.duration);
			}
		});
	},

	/** 加载提示框
	 *title(标题)
	 *mask(图标): 是否显示透明蒙层，防止触摸穿透，默认：false
	 */
	showLoad(title = '加载中', mask = true) {
		uni.showLoading({
			title: title,
			mask: mask
		});
	},
	/** 关闭加载提示框 */
	hideLoad(time = 300, callback = () => {}) {
		setTimeout(() => {
			uni.hideLoading();
			callback()
		}, time)
	},

	/**提示框2
	 *title(标题)
	 *callback(执行完毕后触发函数)
	 *duration(延时): 0为不关闭, 毫秒数
	 *mask(遮罩层)
	 *icon(图标):  success，loading，none
	 */
	msg(title, callback = () => {}, duration = 1500, mask = true, icon = "none") {
		//统一提示方便全局修改
		if (Boolean(title) === false) {
			return;
		}
		uni.showToast({
			title,
			duration,
			mask,
			icon,
			success: function() {
				setTimeout(callback, duration);
			}
		})
	},

	/** 确认，取消提示框
	 */
	showModal(content,callback = () => {},opt = {
		showCancel: true
	}) {
		uni.showModal({
			title: opt?.title ? opt?.title:'提示',
			// 提示文字
			content: content,
			showCancel: opt?.showCancel ? true:false,
			cancelText: opt?.cancelText ? opt?.cancelText:'取消',
			// 确认按钮的文字自定义
			confirmText: opt?.confirmText ? opt?.confirmText:'确认',
			success: function(res) {
				if (res.confirm) {
					setTimeout(()=>callback(),opt?.time ? opt?.time:100)
				} else {
					// 执行取消后的操作
				}
			}
		})
	},


	/** 复制到剪贴板  
	 * @longpress="longpress($event,item.contactInfo)"
	 * phone 手机号
	 */
	longpress(event, phone) { // 长按一秒 + 定时器.5秒
		const pressTime = event.timeStamp; // 获取长按开始的时间戳。无效
		setTimeout(() => {
			uni.setClipboardData({
				data: phone,
				showToast: true,
				success: function() {
					uni.showToast({
						title: '复制成功',
						icon: 'none'
					});
				},
				fail: function() {
					uni.showToast({
						title: '复制失败',
						icon: 'none'
					});
				}
			});
		}, 500);
	},

	/** 下载图片或文件
	 * @param {String} url
	 * https://api.xiaoshengkeji.cn/upload/xiaosheng.xiaoshengkeji.cn/240402/15300191527.jpg
	 */
	download(url) {
		uni.showLoading({
			title: '正在下载 . . .'
		});
		const suffixArr = ['jpg', 'png', 'jpeg', 'gif']
		let suffix = url.split('.') // 拆分数组
		let suffixStr = suffix[suffix.length - 1].toLowerCase() // 取小写后缀名
		if (suffixArr.includes(suffixStr)) { // 图片
			uni.downloadFile({
				url: url,
				success: (res) => {
					if (res.statusCode === 200) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function() {
								uni.hideLoading();
								uni.showToast({
									title: "保存成功",
									icon: "none"
								});
							},
							fail: function(res) {
								wx.showModal({
									title: '提示',
									content: '需要您授权保存相册',
									showCancel: false,
									success() {
										wx.openSetting({
											success(settingdata) {
												if (settingdata.authSetting[
														'scope.writePhotosAlbum'
													]) {
													wx.showModal({
														title: '提示',
														content: '获取权限成功,再次保存图片即可成功',
														showCancel: false,
													})
												} else {
													wx.showModal({
														title: '提示',
														content: '获取权限失败，无法保存到相册',
														showCancel: false,
													})
												}

											},
											complete(comp) {
												console.log("complete", comp)
											}
										})
									}
								})

							}
						});
					}
				}
			})
		} else { // 文件
			// uni.showLoading({
			// 	title: '正在下载 . . .'
			// });
			uni.downloadFile({
				url: url,
				success: (res) => {
					if (res.statusCode === 200) {
						uni.hideLoading();

						//文件保存到本地
						uni.saveFile({
							tempFilePath: res.tempFilePath, //临时路径
							success: function(res) {
								uni.showToast({
									icon: 'success',
									mask: true,
									title: '下载成功',
									duration: 2000,
								});

								//自动打开文档查看
								setTimeout(() => {
									var filePath = res.savedFilePath;
									uni.openDocument({ //新开页面打开文档，支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx。
										filePath: filePath,
										showMenu: true,
										success: function(res) {
											console.log('打开文档成功');
										}
									});
								}, 2000)
							}
						});
					}
				},
				fail: (err) => {
					console.log(err);
					uni.showToast({
						icon: 'none',
						mask: true,
						title: '文件下载失败',
					});
				},
			})
		}
	},

	// 用户授权
	authorization() {
		uni.getSetting({
			success: (res) => {
				if (res.authSetting['scope.writePhotosAlbum']) {
					console.log('已经授权');
					// 用户已经授权
				} else {
					/* 用户未授权，发起授权请求 */
					// 第一次运行时弹出对话框，后面根据第一次的结果走对应回调
					uni.authorize({
						scope: 'scope.writePhotosAlbum',
						success: () => {
							console.log('授权成功');
						},
						fail: () => {
							// 授权失败，引导用户手动授权
							uni.showModal({
								title: '授权提示',
								content: '需打开相册权限，是否前往授权？',
								success: (res) => {
									if (res.confirm) {
										// 手动设置授权。注意该API需要通过用户点击才能触发
										uni.openSetting({
											success: (res_2) => {
												console.log('res_2',
													res_2);
											}
										})
									}
								}
							});
						}
					});
				}
			}
		});
	},

	/**prePage
	 */
	prePage() {
		let pages = getCurrentPages();
		let prePage = pages[pages.length - 2];
		// #ifdef H5
		return prePage;
		// #endif
		return prePage.$vm;
	},

	/**提示需要登录
	 *title(标题)
	 *url(页面路径)
	 */
	needLogin(title = '请登录后操作~', url = '/pages/login/index') {
		uni.showToast({
			title: title,
			icon: "none",
			duration: 500,
			success() {
				setTimeout(() => {
					try {
						uni.clearStorage();
					} catch (e) {
						//TODO handle the exception
					}
					uni.reLaunch({
						url: url
					});
				}, 500);
			}
		});
	},
	/*获取列表页码
	 *count 总条数
	 *pageSize 
	 */
	pagerCount(count, pageSize) {
		if (typeof(count) == "number") {
			if (count > 0) {
				try {
					var _pagerCount = count % pageSize == 0 ? count / pageSize : count / pageSize + 1;
					var c = _pagerCount.toFixed(0); //小数取整
					_pagerCount = c > _pagerCount ? c - 1 : c; //过滤四舍五入
					return _pagerCount;

				} catch (error) {
					return 0;
				}

			} else {
				return 0;
			}

		} else {
			return 0;
		}
	},

	/**
	 * 拼接图片
	 */
	joinImg(data) {
		return data ? config.baseURL + data : ''
	},

	/**
	 * 格式化日期  2008-20-20 12:50:00
	 * @return {Object}  format - 格式后的天时分秒对象 2008-20-20
	 */
	formatWeed(date) {
		return date.slice(0, 10)
	},

	/**
	 * 秒钟格式化
	 * @param {Number|string} t - 剩余多少秒
	 * @return {Object}  format - 格式后的天时分秒对象
	 */
	second(s) {
		s = Number(s)
		let minute = 0 // 分
		let second = 0 // 秒
		if (s > 60) {
			minute = Math.trunc(s / 60)
			second = s % 60
		} else second = s
		return minute == 0 ? `${second}秒` : `${minute}分${second}秒`
	},

	/**
	 * 中文格式化：11-23 ---> 11月23日
	 * @param {Number|string} t - 剩余多少秒
	 * @return {Object}  format - 格式后的天时分秒对象
	 */
	formatZW(str) {
		// console.log('str',str,String(str));
		// return
		// str = String(str)
		let str_ = String(str).slice(5, str.length)
		let arr = str_.split('');
		arr.splice(2, 1, '月')
		arr.splice(6, 1, '日')
		return arr.join('')
		// let str_ = str.slice(4,str.length)
		// let arr = str_.split('');
		// arr.splice(4,1,'年')
		// arr.splice(7,1,'月')
		// arr.splice(10,1,'日')
		// return arr.join('')
	},

	/**
	 * 剩余时间格式化
	 * @param {Number} t - 剩余多少秒
	 * @return {Object}  format - 格式后的天时分秒对象
	 */
	format(t) {
		let format = {
			d: '00',
			h: '00',
			m: '00',
			s: '00'
		};
		if (t > 0) {
			let d = Math.floor(t / 86400);
			let h = Math.floor((t / 3600) % 24);
			let m = Math.floor((t / 60) % 60);
			let s = Math.floor(t % 60);
			format.d = d < 10 ? '0' + d : d;
			format.h = h < 10 ? '0' + h : h;
			format.m = m < 10 ? '0' + m : m;
			format.s = s < 10 ? '0' + s : s;
		}
		return format;
	},

	/**
	 * formateDate
	 * formatDate(date, "YYYY-mm-dd HH:MM")
	 * @description 日期格式化
	 * @param { Number } date 时间戳（毫秒级）
	 * @param { String } fmt 格式 "YYYY-mm-dd HH:MM"
	 * @returns { String }
	 */
	formateDate(date, fmt) {
		let ret = null;
		let type = fmt || "YYYY-mm-dd";
		let timestr = new Date(date * 1000);
		const opt = {
			"Y+": timestr.getFullYear().toString(), // 年
			"m+": (timestr.getMonth() + 1).toString(), // 月
			"d+": timestr.getDate().toString(), // 日
			"H+": timestr.getHours().toString(), // 时
			"M+": timestr.getMinutes().toString(), // 分
			"S+": timestr.getSeconds().toString() // 秒
			// 有其他格式化字符需求可以继续添加，必须转化成字符串
		};
		for (let k in opt) {
			ret = new RegExp("(" + k + ")").exec(type);
			if (ret) {
				type = type.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")));
			};
		};
		return type;
	},

	// 获取当前时间 天
	getDate(sky = 0) {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate() + sky;
		month = month > 9 ? month : '0' + month;
		day = day > 9 ? day : '0' + day;
		return `${year}-${month}-${day}`;
	},

	/**
	 * formatName
	 * @description 格式化用户名
	 * @param { String } name
	 * @returns { String }
	 */
	formatName(name) {
		name = name.trim();
		let newStr;
		if (name.length && name.length < 3) {
			newStr = name.substr(0, 1) + "*";
		} else if (name.length > 2) {
			let nchar = "";
			for (let i = 0, len = name.length - 2; i < len; i++) {
				nchar += "*";
			}
			newStr = name.substr(0, 1) + nchar + name.substr(-1, 1);
		} else {
			newStr = name;
		}
		return newStr;
	},

	/**
	 * formatMobile
	 * @description 格式化手机号码
	 * @param { String } mobile
	 * @returns { String }
	 */
	formatMobile(mobile) {
		mobile = String(mobile).trim();
		let newStr;
		if (mobile.length && mobile.length == 11) {
			let nchar = "";
			for (let i = 0, len = mobile.length - 7; i < len; i++) {
				nchar += "*";
			}
			newStr = mobile.substr(0, 3) + nchar + mobile.substr(-4);
		} else {
			newStr = mobile;
		}
		return newStr;
	},

	/**
	 * 打电话
	 * @param {String<Number>} phoneNumber - 数字字符串
	 */
	callPhone(phoneNumber = '') {
		let num = phoneNumber.toString()
		uni.makePhoneCall({
			phoneNumber: num,
			fail(err) {
				console.log('makePhoneCall出错', err)
			},
		});
	},

	/**格式化富文本字体和样式
	 *str 富文本
	 */
	resetRichtextStyle(str) {
		let that = this;
		// 移除<img>标签的style、width 和 height 属性
		let newContent = str?.replace(/<img[^>]*>/gi, function(match, capture) {
			match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
			match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
			match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
			return match;
		});
		// 为<img>标签添加特定样式
		newContent = newContent?.replace(/\<img/gi,
			'<img class="richtext-img" style="display: block;width: 100%;height: auto;"');
		// 替换<img>标签style属性中的width
		// newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
		// 	match = match.replace(/width:[^;]+;/gi, 'max-width:100%;');
		// 	return match;
		// });
		// 移除所有的 <br> 标签：
		newContent = newContent?.replace(/<br[^>]*\/>/gi, '');
		// 移除 <p> 标签中的 style 属性：
		newContent = newContent?.replace(/<p[^>]*>/gi, function(match, capture) {
			match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
			return match;
		});
		// 为所有 <p> 标签添加特定的样式：
		newContent = newContent?.replace(/\<p/gi,
			'<p class="richtext-p" style="font-size: 14px;line-height: 26px;color: #fff;font-weight: 400; text-indent: 2em;"'
		);
		return newContent;
	},

	/*
	 *数组对象去重
	 */
	removedup(arr, batch) {
		if (!Array.isArray(arr)) return arr; // 判断类型
		if (arr.length == 0) return []; // 判断是否为空

		let obj = {};
		let uniqueArr = arr.reduce(function(total, item) {
			obj[item[batch]] ? '' : (obj[item[batch]] = true && total.push(item));
			return total;
		}, []);
		return uniqueArr;
	},

	/** 
	 * 安卓app-上传
	 */
	chooseFile(callback, acceptType) {
		var CODE_REQUEST = 1000;
		var main = plus.android.runtimeMainActivity();
		if (plus.os.name == 'Android') {
			// console.log("666");
			var Intent = plus.android.importClass('android.content.Intent');
			var intent = new Intent(Intent.ACTION_GET_CONTENT);
			intent.addCategory(Intent.CATEGORY_OPENABLE);
			if (acceptType) {
				intent.setType(acceptType);
			} else {
				intent.setType("*/*");
			}
			main.onActivityResult = (requestCode, resultCode, data) => {
				if (requestCode == CODE_REQUEST) {
					const uri = data.getData();
					plus.android.importClass(uri);
					const Build = plus.android.importClass('android.os.Build');
					const isKitKat = Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT;
					const DocumentsContract = plus.android.importClass('android.provider.DocumentsContract');
					if (isKitKat && DocumentsContract.isDocumentUri(main, uri)) {
						if ("com.android.externalstorage.documents" == uri.getAuthority()) {
							console.log("6666");
							var docId = DocumentsContract.getDocumentId(uri);
							var split = docId.split(":");
							var type = split[0];

							if ("primary" == type) {
								var Environment = plus.android.importClass('android.os.Environment');
								callback(Environment.getExternalStorageDirectory() + "/" + split[1]);
							} else {
								var System = plus.android.importClass('java.lang.System');
								var sdPath = System.getenv("SECONDARY_STORAGE");
								if (sdPath) {
									callback(sdPath + "/" + split[1]);
								}
							}
						} else if ("com.android.providers.downloads.documents" == uri.getAuthority()) {
							var id = DocumentsContract.getDocumentId(uri);
							var ContentUris = plus.android.importClass('android.content.ContentUris');
							var contentUri = ContentUris.withAppendedId(
								// Uri.parse("content://downloads/public_downloads"), Long.valueOf(id));
								Uri.parse("content://downloads/public_downloads"), id);
							callback(getDataColumn(main, contentUri, null, null));
						} else if ("com.android.providers.media.documents" == uri.getAuthority()) {
							var docId = DocumentsContract.getDocumentId(uri);
							var split = docId.split(":");
							console.log(split);
							var type = split[0];
							console.log(type);
							var MediaStore = plus.android.importClass('android.provider.MediaStore');
							if ("image" == type) {
								contentUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
							} else if ("video" == type) {
								contentUri = MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
							} else if ("audio" == type) {
								contentUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
							} else {
								contentUri = MediaStore.Files.getContentUri("external");
							}

							console.log(contentUri);
							var selection = "_id=?";
							var selectionArgs = new Array();
							selectionArgs[0] = split[1];

							callback(getDataColumn(main, contentUri, selection, selectionArgs));
						}
					} else if ("content" == uri.getScheme()) {
						callback(getDataColumn(main, uri, null, null));
					} else if ("file" == uri.getScheme()) {
						callback(uri.getPath());
					}
				}
			}
			main.startActivityForResult(intent, CODE_REQUEST);
		}
	},
	getDataColumn(main, uri, selection, selectionArgs) {
		plus.android.importClass(main.getContentResolver());
		let cursor = main.getContentResolver().query(uri, ['_data'], selection, selectionArgs,
			null);
		plus.android.importClass(cursor);
		if (cursor != null && cursor.moveToFirst()) {
			var column_index = cursor.getColumnIndexOrThrow('_data');
			var result = cursor.getString(column_index)
			cursor.close();
			return result;
		}
		return null;
	},

	/**
	 * @description H5+下载App
	 * @param downloadUrl:App下载链接
	 * @param progressCallBack:下载进度回调
	 */
	downloadApp(downloadUrl = '', progressCallBack = () => {}) {
		return new Promise((resolve, reject) => {
			// 创建下载任务。plus.downloader.createDownload控制台打印不出，
			const downloadTask = uni.downloadFile({
				url: downloadUrl,
				success: (download) => {
					resolve(download.tempFilePath)
				},
				fail: (err) => {
					reject('fail')
					uni.showToast({
						title: '下载失败',
						duration: 1500,
						icon: "none"
					});
				}
			})
			// 进度条
			downloadTask.onProgressUpdate((res) => {
				progressCallBack(res.progress)
				// if (res.progress >= 10) { // 满足测试条件，取消下载任务。
				// 	downloadTask.abort();
				// }
			});
		})
	},

	/**
	 * @description H5+安装App
	 */
	installApp(fileName, callBack = () => {}) {
		//注册广播监听app安装情况
		this.onInstallListening(callBack);

		// 将本地URL路径转换成平台绝对路径
		let url = plus.io.convertLocalFileSystemURL(fileName)
		// 开始安装
		plus.runtime.install(url, {
			force: true // 强制安装,不进行版本号的校验
		}, () => {
			// 成功跳转到安装界面
			plus.runtime.restart(); //更新成功启动
		}, function(error) {
			console.log('error', error);
			// uni.showToast({
			// 	title: '安装失败',
			// 	duration: 1500,
			// 	icon: "none"
			// });
			uni.showToast({
				title: "更新失败，将跳转下载页面",
				icon: "none",
				duration: 1000
			})
			setTimeout(function() {
				plus.runtime.openURL(appUrl);
			}, 2000)
		})
	},

	/**
	 * @description 注册广播监听APP是否安装成功
	 * @param callBack:安装成功回调函数
	 */
	onInstallListening(callBack = () => {}) {
		// 获取activity实例对象
		let mainActivity = plus.android.runtimeMainActivity();
		// 生成广播接收器
		let receiver = plus.android.implements('io.dcloud.android.content.BroadcastReceiver', {
			onReceive: (context, intent) => { //接收广播回调 
				// console.log('触发广播',context, intent);
				plus.android.importClass(intent);
				mainActivity.unregisterReceiver(receiver); //取消监听
				callBack()
			}
		});
		let IntentFilter = plus.android.importClass('android.content.IntentFilter');
		let Intent = plus.android.importClass('android.content.Intent');
		let filter = new IntentFilter();
		filter.addAction(Intent.ACTION_PACKAGE_ADDED); //监听APP安装     
		filter.addDataScheme("package");
		mainActivity.registerReceiver(receiver, filter); //注册广播
	},

	/** 防抖。将多次执行变为最后一次执行
	 * @example <button @click="onClick">点击</button>
	 *	const onClick = debounce(function (){ 业务代码 },1000,true)
	 */
	debounce(fn, delay = 300, immediate = false) {
		/* 立即执行：立即执行。如果在n 秒内重复触发,会执行两次【第一次：立即执行。第二次：等待时间结束执行】 */
		let timer = null
		let isInvoke = false
		return function(...ages) {
			if (timer) clearTimeout(timer)

			// 判断是否需要立即执行
			if (immediate && !isInvoke) {
				fn.apply(this, ages)
				isInvoke = true
			} else {
				// 延迟执行
				timer = setTimeout(() => {
					// 外部传入的真正要执行的函数
					fn.apply(this, ages)
					isInvoke = false
				}, delay)
			}
		}
	},

	/** 节流。将多次执行变成每隔一段时间执行
	 * @example <button @click="onClick">点击</button>
	 *	const onClick = throttle(function (){ 业务代码 },1000)
	 */
	throttle(fn, delay) {
		let timer;
		return function() {
			if (timer) return;
			timer = setTimeout(() => {
				fn.apply(this, arguments);
				timer = null
			}, delay)
		}
	},
	/** 
	 * 热更新
	 */
	wgtdownload(url) {
		uni.downloadFile({
			url,
			success: (downloadResult) => {
				if (downloadResult.statusCode === 200) {
					plus.runtime.install(downloadResult.tempFilePath, {
						force: false
					}, function() {
						plus.runtime.restart();
					}, function(e) {
						console.error('install fail...');
					});
				}
			},
			fail(err) {
				uni.showToast({
					title: '下载失败',
					duration: 1500,
					icon: "none"
				});
			}
		});
	}
}