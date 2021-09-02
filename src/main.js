import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'       //一定要引入样式

import store from './store'
import router from './router'
import env from '../env'

import App from './App.vue'
Vue.use(VueAxios,axios)
Vue.use(VueLazyLoad,{
  loading:'/imgs/loading-svg/loading-cubes.svg'     //img,png格式的图片放大会失真，svg放大不会失真
})
Vue.use(VueCookie)

Vue.prototype.$message = Message

// mock开关
// const mock = false;
// if(mock){
//   require('./mock/api');
// }

// baseURL的设置依据前端跨域的方式做调整
// 1、代理方式  /a/b : /api/a/b => /a/b    将api置空
// 配合vue.config.js
axios.defaults.baseURL = '/api'       //这样所有路由的路径前面都加上了/api，配合vue.config.js文件，就可以实现跨域

// 2、CORS，jsonp跨域，baseURL完整，配合env.js
// axios.defaults.baseURL = 'http://test-www.imooc.com/api'
axios.defaults.timeout = 8000

// 根据环境变量的不同设置不同的URL
// axios.defaults.baseURL = env.baseURL

// interceptor：axios的拦截器，可以对请求和相应进行拦截
// -----------接口错误拦截
// -----------use接受两个参数，第一个是业务状态拦截，第二个是http状态码拦截
// 当支付完成，再次点击支付按钮时，会抛出500错误，属于http状态码错误，需要在第二个参数里进行拦截
axios.interceptors.response.use(function(response){
  let res = response.data                   //拦截器对返回数据做的一层封装
  let path = location.hash
  if(res.status == 0){
    return res.data                        //这里返回的才是真实的数据
  }else if(res.status == 10){
    // 其他页面需要在刷新以后跳转到登录页面，首页不需要
    if(path != '#/index'){
      // 这里不能用this.$router.push(url),因为路由是挂载到vue实例上的，这里拿不到vue实例
      window.location.href = '/#/login'      //失败未登录跳到登录页面，当前页面跳转
    }
    return Promise.reject(res)    //错误抛出，不然还是会进入到then
    
  }else{    //登录名错误，会抛出状态码1，进入下面代码
    Message.warning(res.msg)                       //真正错误
    return Promise.reject(res)
  }
},(error)=>{
  let res = error.response
  Message.error(res.data.message)
  return Promise.reject(error)      //抛出异常，让请求的响应接口不进入到then中
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')


// 在axios中设置自定义请求头，要用到请求拦截器，在所有发出的请求里都加上自定义header
/*axios.interceptors.request.use(
  config => {
    // console.log(config)
    // 自定义header信息（比如token）
    // console.log("请求拦截器添加userId-----------",sessionStorage.userId)
    if(!config.headers['userId']){
      config.headers['userId'] = sessionStorage.userId;
    }
    // console.log(config)
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
*/
