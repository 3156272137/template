/**
 * 获取当前地址
 */
const getLocation1 = () => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      altitude: true,
      highAccuracyExpireTime: 0,
      isHighAccuracy: true,
      type: 'gcj02',
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        resolve('')
      }
    })
  })
}

const getLocation = () => {
  return new Promise((resolve, reject) => {
    wx.getFuzzyLocation({
      type: 'gcj02',
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        resolve('')
      }
    })
  })
}

/**
 * 检查用户权限
 * @param {string} scope 权限
 */
const checkAuth = (scope) => {
  const scopeList = {
    'scope.userInfo': '用户信息',
    'scope.userLocation': '地理位置',
    'scope.writePhotosAlbum': '相册',
    'scope.camera': '摄像头'
  }

  let isAuth = 0 // 授权情况 0.从未授权 1.授权成功 2.授权失败
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success({
        authSetting
      }) {
        // 从未授权
        if (!authSetting.hasOwnProperty(scope)) {
          wx.authorize({
            scope,
            success() {
              resolve()
            },
            fail() {
              reject()
            }
          })
        } else {
          // 授权成功
          if (authSetting[scope]) {
            resolve()
          } else {
            // 授权失败
            wx.showModal({
              title: '授权提示',
              content: `检测到您未打开${scopeList[scope]}权限，是否去设置打开`,
              success: (res) => {
                if (res.confirm) {
                  wx.openSetting()
                } else {
                  reject()
                }
              }
            })
          }
        }
      }
    })
  })
}

/**
 * 获取随机字符串
 * e 表示长度，默认32位
 */
function randomString(e) {
  e = e || 32;
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n
}

/**
 * 判断空对象
 */
function isEmptyObj(obj) {
  for (var key in obj) {
    if ({}.hasOwnProperty.call(obj, key)) return false;
  }
  return true;
}

/**
 * 监听网络变化
 */
function onNetworkStatusChange() {
  wx.onNetworkStatusChange(function (res) {
    console.log(res.isConnected)
    if (!res.isConnected) {
      wx.showToast({
        title: '当前无网络连接',
        icon: 'none'
      })
    }
  })
}

/**
 * 获取url参数
 * @param {*} variable 
 */
function getQueryVariable(url, variable) {
  var query = url.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return (false);
}

// 设置购物车角标
function setCartNum(num) {
  getApp().globalData.cartNum = Number(num)
  if (Number(num) > 0) {
    wx.setTabBarBadge({
      index: 3,
      text: num.toString(),
      fail() {}
    })
  } else {
    wx.removeTabBarBadge({
      index: 3,
      fail() {

      }
    })
  }
}


/** 防抖。将多次执行变为最后一次执行
 * @example <button @click="onClick">点击</button>
 *	const onClick = debounce(function (){ 业务代码 },1000,true)
 */
function debounce(fn, delay = 300, immediate = false) {
  /* 立即执行：立即执行。如果在n 秒内重复触发,会执行两次【第一次：立即执行。第二次：等待时间结束执行】 */
  let timer = null
  let isInvoke = false
  return function (...ages) {
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
}

/** 节流。将多次执行变成每隔一段时间执行
 * @example <button @click="onClick">点击</button>
 *	const onClick = throttle(function (){ 业务代码 },1000)
 */
function throttle(fn, delay) {
  let timer;
  return function () {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null
    }, delay)
  }
}

export {
  getLocation,
  checkAuth,
  randomString,
  isEmptyObj,
  onNetworkStatusChange,
  getQueryVariable,
  setCartNum,
  debounce,
  throttle
};