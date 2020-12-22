import Vue from 'vue'

//导入路由模块
import VueRouter from 'vue-router'
//导入子组件
/*主*/
import MainPage from '../components/home/MainPage.vue'
//子
import Login from "../components/home/Login";
import Register from "../components/home/Register";


//商品详情
import MainDetailed from "../components/home/MainDetailed";
//用户中心
import UserCenter from "../components/user/UserCenter";
//个人中心
import MineCenter from "../components/user/child/MineCenter";
//账号信息
import AccountInfo from "../components/user/child/AccountInfo.vue";
//账号安全
//地址管理
import AddressManagement from "../components/user/child/AddressManagement.vue";

//主
import Merchant from '../components/merchant/Merchant.vue'
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
    /*redirect:'/login',*/
    //首页子路由
    children: [
      {
        //登录
        path: '/login',
        component: Login
      },
      {
        //注册
        path: '/register',
        component: Register
      }
    ]
  },
  {
    path: '/mainDetailed',component: MainDetailed
  },
/*  {
    //登录
    path: '/login', component: Login,
    //首页子路由
    children: [
    ]
  },*/
  {
    //用户中心
    path: '/userCenter', component: UserCenter, redirect: '/mineCenter',
    //用户子理由
    children: [
      {
        //个人中心
        path: '/mineCenter',
        component: MineCenter
      },
      {
        //账号信息
        path: '/accountInfo',
        component: AccountInfo
      },
      {
        //地址管理
        path: '/addressManagement',
        component: AddressManagement
      }
    ]
  },
  {
    //商户中心
    path: '/merchant', component: Merchant, redirect: '/merchantMain',
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
