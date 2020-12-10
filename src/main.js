import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'

Vue.use(Element)

// 引用axios，并设置基础URL为后端服务api地址
Axios.defaults.baseURL = "http://localhost:8080/shop/"
//axios，每次ajax请求携带cookies
// axios.defaults.withCredentials = true
// 将API方法绑定到全局
Vue.prototype.$axios = Axios


new Vue({
  el: '#app',
  render: h => h(App)
})
