import App from './App'
import tools from '@/utils/tools.js'
import uviewPlus from '@/uni_modules/uview-plus'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  // 注入全局工具函数
    app.provide('$tools', tools)
    app.use(uviewPlus)
	
  return {
    app
  }
}
// #endif