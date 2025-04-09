"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_up_tabbar_item2 = common_vendor.resolveComponent("up-tabbar-item");
  const _easycom_up_tabbar2 = common_vendor.resolveComponent("up-tabbar");
  (_easycom_up_tabbar_item2 + _easycom_up_tabbar2)();
}
const _easycom_up_tabbar_item = () => "../../uni_modules/uview-plus/components/u-tabbar-item/u-tabbar-item.js";
const _easycom_up_tabbar = () => "../../uni_modules/uview-plus/components/u-tabbar/u-tabbar.js";
if (!Math) {
  (_easycom_up_tabbar_item + _easycom_up_tabbar)();
}
const _sfc_main = {
  __name: "MeTabbar",
  props: {
    curr: {
      type: Number,
      default: 0
    }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    common_vendor.onMounted(() => {
      let cacheToken = common_vendor.index.getStorageSync("token");
      if (cacheToken)
        getCart();
      tabbarVal.value = props.curr;
      actionPush();
    });
    function actionPush() {
      let userInfo = common_vendor.index.getStorageSync("userInfo");
      console.log("userInfo", userInfo);
    }
    const badge = common_vendor.ref(0);
    const getCart = async () => {
      let res = await getCartCount();
      badge.value = res.data.count;
    };
    const tabbarVal = common_vendor.ref(1);
    const onTabbar = (i, name) => {
      tabbarVal.value = i;
      switch (i) {
        case 0:
          common_vendor.index.redirectTo({
            url: `/pages/index/index`
          });
          break;
        case 1:
          common_vendor.index.redirectTo({
            url: `/pages/classify/classify`
          });
          break;
        case 2:
          common_vendor.index.redirectTo({
            url: `/pages/me/me`
          });
          break;
      }
    };
    __expose({
      getCart
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          text: "首页",
          icon: "home"
        }),
        b: common_vendor.p({
          text: "购物车",
          icon: "shopping-cart",
          badge: badge.value
        }),
        c: common_vendor.p({
          text: "我的",
          icon: "account"
        }),
        d: common_vendor.o(onTabbar),
        e: common_vendor.p({
          value: tabbarVal.value,
          fixed: true,
          zIndex: 99,
          inactiveColor: "#9d9d9d",
          activeColor: "#0184E8",
          safeAreaInsetBottom: true
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-08aab75e"]]);
wx.createComponent(Component);
