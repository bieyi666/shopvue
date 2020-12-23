import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import Router from '../router/routercomfig.js'

import 'lib-flexible/flexible.js'

Vue.use(Element)

// 图片地址
Vue.prototype.$host = "http://  :8080/img/";
// 引用axios，并设置基础URL为后端服务api地址
Axios.defaults.baseURL = "http://localhost:8080/shop/"
//axios，每次ajax请求携带cookies
// axios.defaults.withCredentials = true
// 将API方法绑定到全局
Vue.prototype.$axios = Axios



var vue1=new Vue({
  el: '#app',
  render: h => h(App),
  //路由挂载
  router: Router
})

//默认地址
vue1.$router.replace({
  path: '/mainPage',
})
