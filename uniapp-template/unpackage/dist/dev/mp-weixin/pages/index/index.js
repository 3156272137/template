"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_MeTabbar2 = common_vendor.resolveComponent("MeTabbar");
  _easycom_MeTabbar2();
}
const _easycom_MeTabbar = () => "../../components/MeTabbar/MeTabbar.js";
if (!Math) {
  _easycom_MeTabbar();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.inject("$tools");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          curr: 0
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
