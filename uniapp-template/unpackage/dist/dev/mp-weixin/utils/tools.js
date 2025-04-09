"use strict";
const common_vendor = require("../common/vendor.js");
const utils_config = require("./config.js");
const tools = {
  /**跳转正常路径
   *path(页面路径)
   * @param (type:Number)  区分分包
   */
  toPage(path, type = 0) {
    if (type == 1)
      common_vendor.index.navigateTo({
        url: `/pages-sub/${path}`
      });
    else
      common_vendor.index.navigateTo({
        url: `/pages/${path}`
      });
  },
  /**跳转Tab
   *path(页面路径)
   */
  toTab(path, type = 0) {
    common_vendor.index.switchTab({
      url: `/pages/${path}`
    });
  },
  /**跳转到页面 -> 关闭当前页面
   *path(页面路径)
   */
  redirectTo(path, type = 0) {
    if (type == 1)
      common_vendor.index.redirectTo({
        url: `/pages-sub/${path}`
      });
    else
      common_vendor.index.redirectTo({
        url: `/pages/${path}`
      });
  },
  /**跳转到页面 -> 关闭所有页面
   *path(页面路径)
   */
  reLaunchTo(path, type = 0) {
    if (type == 1)
      common_vendor.index.reLaunch({
        url: `/pages-sub/${path}`
      });
    else
      common_vendor.index.reLaunch({
        url: `/pages/${path}`
      });
  },
  /**调用uni-popup open方法
   *必须引入uni-popup后使用
   */
  openPopup($refs, ref) {
    $refs[ref].open();
  },
  /**调用uni-popup close方法
   *必须引入uni-popup后使用
   */
  closePopup($refs, ref) {
    $refs[ref].close();
  },
  /**提示框
   *title(标题)
   *icon(图标):  success，loading，none，error
   *duration(延时): 0为不关闭, 毫秒数
   *options(其它参数)
   */
  toast(title, icon = "none", callback = () => {
  }, options = {
    duration: 2e3
  }) {
    common_vendor.index.showToast({
      title: title || "",
      icon,
      duration: options && options.duration || 2e3,
      image: options && options.image || "",
      mask: options && options.mask || true,
      success() {
        setTimeout(callback, options.duration);
      }
    });
  },
  /** 加载提示框
   *title(标题)
   *mask(图标): 是否显示透明蒙层，防止触摸穿透，默认：false
   */
  showLoad(title = "加载中", mask = true) {
    common_vendor.index.showLoading({
      title,
      mask
    });
  },
  /** 关闭加载提示框 */
  hideLoad(time = 300, callback = () => {
  }) {
    setTimeout(() => {
      common_vendor.index.hideLoading();
      callback();
    }, time);
  },
  /**提示框2
   *title(标题)
   *callback(执行完毕后触发函数)
   *duration(延时): 0为不关闭, 毫秒数
   *mask(遮罩层)
   *icon(图标):  success，loading，none
   */
  msg(title, callback = () => {
  }, duration = 1500, mask = true, icon = "none") {
    if (Boolean(title) === false) {
      return;
    }
    common_vendor.index.showToast({
      title,
      duration,
      mask,
      icon,
      success: function() {
        setTimeout(callback, duration);
      }
    });
  },
  /** 确认，取消提示框
   */
  showModal(content, callback = () => {
  }, opt = {
    showCancel: true
  }) {
    common_vendor.index.showModal({
      title: (opt == null ? void 0 : opt.title) ? opt == null ? void 0 : opt.title : "提示",
      // 提示文字
      content,
      showCancel: (opt == null ? void 0 : opt.showCancel) ? true : false,
      cancelText: (opt == null ? void 0 : opt.cancelText) ? opt == null ? void 0 : opt.cancelText : "取消",
      // 确认按钮的文字自定义
      confirmText: (opt == null ? void 0 : opt.confirmText) ? opt == null ? void 0 : opt.confirmText : "确认",
      success: function(res) {
        if (res.confirm) {
          setTimeout(() => callback(), (opt == null ? void 0 : opt.time) ? opt == null ? void 0 : opt.time : 100);
        }
      }
    });
  },
  /** 复制到剪贴板  
   * @longpress="longpress($event,item.contactInfo)"
   * phone 手机号
   */
  longpress(event, phone) {
    event.timeStamp;
    setTimeout(() => {
      common_vendor.index.setClipboardData({
        data: phone,
        showToast: true,
        success: function() {
          common_vendor.index.showToast({
            title: "复制成功",
            icon: "none"
          });
        },
        fail: function() {
          common_vendor.index.showToast({
            title: "复制失败",
            icon: "none"
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
    common_vendor.index.showLoading({
      title: "正在下载 . . ."
    });
    const suffixArr = ["jpg", "png", "jpeg", "gif"];
    let suffix = url.split(".");
    let suffixStr = suffix[suffix.length - 1].toLowerCase();
    if (suffixArr.includes(suffixStr)) {
      common_vendor.index.downloadFile({
        url,
        success: (res) => {
          if (res.statusCode === 200) {
            common_vendor.index.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function() {
                common_vendor.index.hideLoading();
                common_vendor.index.showToast({
                  title: "保存成功",
                  icon: "none"
                });
              },
              fail: function(res2) {
                common_vendor.wx$1.showModal({
                  title: "提示",
                  content: "需要您授权保存相册",
                  showCancel: false,
                  success() {
                    common_vendor.wx$1.openSetting({
                      success(settingdata) {
                        if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                          common_vendor.wx$1.showModal({
                            title: "提示",
                            content: "获取权限成功,再次保存图片即可成功",
                            showCancel: false
                          });
                        } else {
                          common_vendor.wx$1.showModal({
                            title: "提示",
                            content: "获取权限失败，无法保存到相册",
                            showCancel: false
                          });
                        }
                      },
                      complete(comp) {
                        console.log("complete", comp);
                      }
                    });
                  }
                });
              }
            });
          }
        }
      });
    } else {
      common_vendor.index.downloadFile({
        url,
        success: (res) => {
          if (res.statusCode === 200) {
            common_vendor.index.hideLoading();
            common_vendor.index.saveFile({
              tempFilePath: res.tempFilePath,
              //临时路径
              success: function(res2) {
                common_vendor.index.showToast({
                  icon: "success",
                  mask: true,
                  title: "下载成功",
                  duration: 2e3
                });
                setTimeout(() => {
                  var filePath = res2.savedFilePath;
                  common_vendor.index.openDocument({
                    //新开页面打开文档，支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx。
                    filePath,
                    showMenu: true,
                    success: function(res3) {
                      console.log("打开文档成功");
                    }
                  });
                }, 2e3);
              }
            });
          }
        },
        fail: (err) => {
          console.log(err);
          common_vendor.index.showToast({
            icon: "none",
            mask: true,
            title: "文件下载失败"
          });
        }
      });
    }
  },
  // 用户授权
  authorization() {
    common_vendor.index.getSetting({
      success: (res) => {
        if (res.authSetting["scope.writePhotosAlbum"]) {
          console.log("已经授权");
        } else {
          common_vendor.index.authorize({
            scope: "scope.writePhotosAlbum",
            success: () => {
              console.log("授权成功");
            },
            fail: () => {
              common_vendor.index.showModal({
                title: "授权提示",
                content: "需打开相册权限，是否前往授权？",
                success: (res2) => {
                  if (res2.confirm) {
                    common_vendor.index.openSetting({
                      success: (res_2) => {
                        console.log(
                          "res_2",
                          res_2
                        );
                      }
                    });
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
    return prePage.$vm;
  },
  /**提示需要登录
   *title(标题)
   *url(页面路径)
   */
  needLogin(title = "请登录后操作~", url = "/pages/login/index") {
    common_vendor.index.showToast({
      title,
      icon: "none",
      duration: 500,
      success() {
        setTimeout(() => {
          try {
            common_vendor.index.clearStorage();
          } catch (e) {
          }
          common_vendor.index.reLaunch({
            url
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
    if (typeof count == "number") {
      if (count > 0) {
        try {
          var _pagerCount = count % pageSize == 0 ? count / pageSize : count / pageSize + 1;
          var c = _pagerCount.toFixed(0);
          _pagerCount = c > _pagerCount ? c - 1 : c;
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
    return data ? utils_config.config.baseURL + data : "";
  },
  /**
   * 格式化日期  2008-20-20 12:50:00
   * @return {Object}  format - 格式后的天时分秒对象 2008-20-20
   */
  formatWeed(date) {
    return date.slice(0, 10);
  },
  /**
   * 秒钟格式化
   * @param {Number|string} t - 剩余多少秒
   * @return {Object}  format - 格式后的天时分秒对象
   */
  second(s) {
    s = Number(s);
    let minute = 0;
    let second = 0;
    if (s > 60) {
      minute = Math.trunc(s / 60);
      second = s % 60;
    } else
      second = s;
    return minute == 0 ? `${second}秒` : `${minute}分${second}秒`;
  },
  /**
   * 中文格式化：11-23 ---> 11月23日
   * @param {Number|string} t - 剩余多少秒
   * @return {Object}  format - 格式后的天时分秒对象
   */
  formatZW(str) {
    let str_ = String(str).slice(5, str.length);
    let arr = str_.split("");
    arr.splice(2, 1, "月");
    arr.splice(6, 1, "日");
    return arr.join("");
  },
  /**
   * 剩余时间格式化
   * @param {Number} t - 剩余多少秒
   * @return {Object}  format - 格式后的天时分秒对象
   */
  format(t) {
    let format = {
      d: "00",
      h: "00",
      m: "00",
      s: "00"
    };
    if (t > 0) {
      let d = Math.floor(t / 86400);
      let h = Math.floor(t / 3600 % 24);
      let m = Math.floor(t / 60 % 60);
      let s = Math.floor(t % 60);
      format.d = d < 10 ? "0" + d : d;
      format.h = h < 10 ? "0" + h : h;
      format.m = m < 10 ? "0" + m : m;
      format.s = s < 10 ? "0" + s : s;
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
    let timestr = new Date(date * 1e3);
    const opt = {
      "Y+": timestr.getFullYear().toString(),
      // 年
      "m+": (timestr.getMonth() + 1).toString(),
      // 月
      "d+": timestr.getDate().toString(),
      // 日
      "H+": timestr.getHours().toString(),
      // 时
      "M+": timestr.getMinutes().toString(),
      // 分
      "S+": timestr.getSeconds().toString()
      // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(type);
      if (ret) {
        type = type.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
      }
    }
    return type;
  },
  // 获取当前时间 天
  getDate(sky = 0) {
    const date = /* @__PURE__ */ new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate() + sky;
    month = month > 9 ? month : "0" + month;
    day = day > 9 ? day : "0" + day;
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
  callPhone(phoneNumber = "") {
    let num = phoneNumber.toString();
    common_vendor.index.makePhoneCall({
      phoneNumber: num,
      fail(err) {
        console.log("makePhoneCall出错", err);
      }
    });
  },
  /**格式化富文本字体和样式
   *str 富文本
   */
  resetRichtextStyle(str) {
    let newContent = str == null ? void 0 : str.replace(/<img[^>]*>/gi, function(match, capture) {
      match = match.replace(/style="[^"]+"/gi, "").replace(/style='[^']+'/gi, "");
      match = match.replace(/width="[^"]+"/gi, "").replace(/width='[^']+'/gi, "");
      match = match.replace(/height="[^"]+"/gi, "").replace(/height='[^']+'/gi, "");
      return match;
    });
    newContent = newContent == null ? void 0 : newContent.replace(
      /\<img/gi,
      '<img class="richtext-img" style="display: block;width: 100%;height: auto;"'
    );
    newContent = newContent == null ? void 0 : newContent.replace(/<br[^>]*\/>/gi, "");
    newContent = newContent == null ? void 0 : newContent.replace(/<p[^>]*>/gi, function(match, capture) {
      match = match.replace(/style="[^"]+"/gi, "").replace(/style='[^']+'/gi, "");
      return match;
    });
    newContent = newContent == null ? void 0 : newContent.replace(
      /\<p/gi,
      '<p class="richtext-p" style="font-size: 14px;line-height: 26px;color: #fff;font-weight: 400; text-indent: 2em;"'
    );
    return newContent;
  },
  /*
   *数组对象去重
   */
  removedup(arr, batch) {
    if (!Array.isArray(arr))
      return arr;
    if (arr.length == 0)
      return [];
    let obj = {};
    let uniqueArr = arr.reduce(function(total, item) {
      obj[item[batch]] ? "" : obj[item[batch]] = total.push(item);
      return total;
    }, []);
    return uniqueArr;
  },
  /** 
   * 安卓app-上传
   */
  chooseFile(callback, acceptType) {
    var CODE_REQUEST = 1e3;
    var main = plus.android.runtimeMainActivity();
    if (plus.os.name == "Android") {
      var Intent = plus.android.importClass("android.content.Intent");
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
          const Build = plus.android.importClass("android.os.Build");
          const isKitKat = Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT;
          const DocumentsContract = plus.android.importClass("android.provider.DocumentsContract");
          if (isKitKat && DocumentsContract.isDocumentUri(main, uri)) {
            if ("com.android.externalstorage.documents" == uri.getAuthority()) {
              console.log("6666");
              var docId = DocumentsContract.getDocumentId(uri);
              var split = docId.split(":");
              var type = split[0];
              if ("primary" == type) {
                var Environment = plus.android.importClass("android.os.Environment");
                callback(Environment.getExternalStorageDirectory() + "/" + split[1]);
              } else {
                var System = plus.android.importClass("java.lang.System");
                var sdPath = System.getenv("SECONDARY_STORAGE");
                if (sdPath) {
                  callback(sdPath + "/" + split[1]);
                }
              }
            } else if ("com.android.providers.downloads.documents" == uri.getAuthority()) {
              var id = DocumentsContract.getDocumentId(uri);
              var ContentUris = plus.android.importClass("android.content.ContentUris");
              var contentUri = ContentUris.withAppendedId(
                // Uri.parse("content://downloads/public_downloads"), Long.valueOf(id));
                Uri.parse("content://downloads/public_downloads"),
                id
              );
              callback(getDataColumn(main, contentUri, null, null));
            } else if ("com.android.providers.media.documents" == uri.getAuthority()) {
              var docId = DocumentsContract.getDocumentId(uri);
              var split = docId.split(":");
              console.log(split);
              var type = split[0];
              console.log(type);
              var MediaStore = plus.android.importClass("android.provider.MediaStore");
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
      };
      main.startActivityForResult(intent, CODE_REQUEST);
    }
  },
  getDataColumn(main, uri, selection, selectionArgs) {
    plus.android.importClass(main.getContentResolver());
    let cursor = main.getContentResolver().query(
      uri,
      ["_data"],
      selection,
      selectionArgs,
      null
    );
    plus.android.importClass(cursor);
    if (cursor != null && cursor.moveToFirst()) {
      var column_index = cursor.getColumnIndexOrThrow("_data");
      var result = cursor.getString(column_index);
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
  downloadApp(downloadUrl = "", progressCallBack = () => {
  }) {
    return new Promise((resolve, reject) => {
      const downloadTask = common_vendor.index.downloadFile({
        url: downloadUrl,
        success: (download) => {
          resolve(download.tempFilePath);
        },
        fail: (err) => {
          reject("fail");
          common_vendor.index.showToast({
            title: "下载失败",
            duration: 1500,
            icon: "none"
          });
        }
      });
      downloadTask.onProgressUpdate((res) => {
        progressCallBack(res.progress);
      });
    });
  },
  /**
   * @description H5+安装App
   */
  installApp(fileName, callBack = () => {
  }) {
    this.onInstallListening(callBack);
    let url = plus.io.convertLocalFileSystemURL(fileName);
    plus.runtime.install(url, {
      force: true
      // 强制安装,不进行版本号的校验
    }, () => {
      plus.runtime.restart();
    }, function(error) {
      console.log("error", error);
      common_vendor.index.showToast({
        title: "更新失败，将跳转下载页面",
        icon: "none",
        duration: 1e3
      });
      setTimeout(function() {
        plus.runtime.openURL(appUrl);
      }, 2e3);
    });
  },
  /**
   * @description 注册广播监听APP是否安装成功
   * @param callBack:安装成功回调函数
   */
  onInstallListening(callBack = () => {
  }) {
    let mainActivity = plus.android.runtimeMainActivity();
    let receiver = plus.android.implements("io.dcloud.android.content.BroadcastReceiver", {
      onReceive: (context, intent) => {
        plus.android.importClass(intent);
        mainActivity.unregisterReceiver(receiver);
        callBack();
      }
    });
    let IntentFilter = plus.android.importClass("android.content.IntentFilter");
    let Intent = plus.android.importClass("android.content.Intent");
    let filter = new IntentFilter();
    filter.addAction(Intent.ACTION_PACKAGE_ADDED);
    filter.addDataScheme("package");
    mainActivity.registerReceiver(receiver, filter);
  },
  /** 防抖。将多次执行变为最后一次执行
   * @example <button @click="onClick">点击</button>
   *	const onClick = debounce(function (){ 业务代码 },1000,true)
   */
  debounce(fn, delay = 300, immediate = false) {
    let timer = null;
    let isInvoke = false;
    return function(...ages) {
      if (timer)
        clearTimeout(timer);
      if (immediate && !isInvoke) {
        fn.apply(this, ages);
        isInvoke = true;
      } else {
        timer = setTimeout(() => {
          fn.apply(this, ages);
          isInvoke = false;
        }, delay);
      }
    };
  },
  /** 节流。将多次执行变成每隔一段时间执行
   * @example <button @click="onClick">点击</button>
   *	const onClick = throttle(function (){ 业务代码 },1000)
   */
  throttle(fn, delay) {
    let timer;
    return function() {
      if (timer)
        return;
      timer = setTimeout(() => {
        fn.apply(this, arguments);
        timer = null;
      }, delay);
    };
  },
  /** 
   * 热更新
   */
  wgtdownload(url) {
    common_vendor.index.downloadFile({
      url,
      success: (downloadResult) => {
        if (downloadResult.statusCode === 200) {
          plus.runtime.install(downloadResult.tempFilePath, {
            force: false
          }, function() {
            plus.runtime.restart();
          }, function(e) {
            console.error("install fail...");
          });
        }
      },
      fail(err) {
        common_vendor.index.showToast({
          title: "下载失败",
          duration: 1500,
          icon: "none"
        });
      }
    });
  }
};
exports.tools = tools;
