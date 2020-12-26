import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import Router from '../router/routercomfig.js'
// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.use(Element)

//图片上传地址
Vue.prototype.$upload = "http://localhost:8080/shop/ImageUpload.action";
// 图片地址
Vue.prototype.$host = "http://localhost:8080/img/";
// 引用axios，并设置基础URL为后端服务api地址
Axios.defaults.baseURL = "http://localhost:8080/shop/"
//axios，每次ajax请求携带cookies
// axios.defaults.withCredentials = true
// 将API方法绑定到全局
Vue.prototype.$axios = Axios

let vue1 = new Vue({
  el: '#app',
  render: h => h(App),
  //路由挂载
  router: Router
})

//默认地址
vue1.$router.replace({
  path: '/mainPage',
})

/**
 * 给JS的数组对象定义一个函数，用于查找指定的元素在数组中的位置，即索引
 * @param val 要查找的对象
 * @returns {number} 索引，没查到返回 -1
 */
Array.prototype.indexOf = function (val) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === val) return i;
  }
  return -1;
};

/**
 * 给JS的数组对象定义一个函数，用于删除指定条件的元素
 * @param attribute 属性
 * @param conditions 条件
 * 即 arr.age(属性) === 1(条件)
 * @returns {[]} 被删除的元素数组
 */
Array.prototype.remove = function (attribute, conditions) {
  let length = this.length;
  let result = []
  for (let i = 0, j = 0; i < length; i++, j++) {
    if (this[j][attribute] === conditions) {
      result.push(this[j]);
      this.splice(j, 1);
      j--;
    }
  }
  return result;
};

/**
 * 给JS的数组对象定义一个函数，用于查询指定条件的元素
 * @param attribute
 * @param conditions
 * @returns {{size: number, row: []}} 数量, 数组对象
 */
Array.prototype.search = function (attribute, conditions) {
  let result = {row: [], size: 0}
  for (let i = 0; i < this.length; i++) {
    if (this[i][attribute] === conditions) {
      result.row.push(this[i]);
      result.size++;
    }
  }
  return result;
};
