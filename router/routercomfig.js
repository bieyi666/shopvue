import Vue from 'vue'

//导入路由模块
import VueRouter from 'vue-router'
//导入子组件
import MerchantInfo from '../components/merchant/MerchantInfo.vue'
import MerchantMain from '../components/merchant/MerchantMain.vue'
import MerchantOrder from '../components/merchant/MerchantOrder.vue'
import MerchantIncome from '../components/merchant/MerchantIncome.vue'


//Vue组件使用Vue-router组件   mark
Vue.use(VueRouter)

//配置路由数组
var routes = [
  {path: '/merchantInfo', component: MerchantInfo},
  {path: '/merchantMain', component: MerchantMain},
  {path: '/merchantOrder', component: MerchantOrder},
  {path: '/merchantIncome', component: MerchantIncome},
]


//配置路由管理器  (构造参数 传递上面的路由数组)
var router = new VueRouter({
  routes: routes
})

export default router
