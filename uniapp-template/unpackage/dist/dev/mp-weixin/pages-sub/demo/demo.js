"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "demo",
  setup(__props) {
    common_vendor.inject("$tools");
    return (_ctx, _cache) => {
      return {};
    };
  }
};
wx.createPage(_sfc_main);
