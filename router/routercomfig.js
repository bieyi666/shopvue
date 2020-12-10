import Vue from 'vue'

//导入路由模块
import VueRouter from 'vue-router'
//导入子组件
/*主*/
import MainPage from '../components/home/MainPage.vue'
import Merchant from '../components/merchant/Merchant.vue'
import UserCenter from "../components/user/UserCenter";

/*子*/
import MerchantInfo from '../components/merchant/MerchantInfo.vue'
import MerchantMain from '../components/merchant/MerchantMain.vue'
import MerchantOrder from '../components/merchant/MerchantOrder.vue'
import MerchantIncome from '../components/merchant/MerchantIncome.vue'


//Vue组件使用Vue-router组件   mark
Vue.use(VueRouter)

//配置路由数组
var routes = [
  {
    //首页
    path: '/mainPage', component: MainPage,
    //首页子路由
    children:[]
  },
  {
    //用户中心
    path: '/userCenter', component: UserCenter,
    //用户子理由
    children:[]
  },
  {
    //商户中心
    path: '/merchant', component: Merchant,redirect:'/merchantMain',
    //商户子路由
    children: [
      {
        path: '/merchantInfo',
        component: MerchantInfo
      },
      {
        path: '/merchantMain',
        component: MerchantMain
      },
      {
        path: '/merchantOrder',
        component: MerchantOrder
      },
      {
        path: '/merchantIncome',
        component: MerchantIncome
      }
    ]
  },
]


//配置路由管理器  (构造参数 传递上面的路由数组)
var router = new VueRouter({
  routes: routes
})

export default router
