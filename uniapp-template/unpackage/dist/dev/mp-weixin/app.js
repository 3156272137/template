"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const utils_tools = require("./utils/tools.js");
const uni_modules_uviewPlus_index = require("./uni_modules/uview-plus/index.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/classify/classify.js";
  "./pages/me/me.js";
  "./pages-sub/demo/demo.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.provide("$tools", utils_tools.tools);
  app.use(uni_modules_uviewPlus_index.uviewPlus);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
