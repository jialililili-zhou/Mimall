import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 性能优化，路由按需加载  import ES7语法，需要安装@babel/plugin-syntax-dynamic-import 插件
// home,index等都是一个函数，不会立即执行，只有在访问时才会执行 

// 路由会打包成几个js后缀的文件，但不是实际意义上的js文件，实际上浏览器还是会预加载，在浏览器空闲的时候加载
// 解决：在vue.config.js里配置chainWebpack，避免预加载
import Home from '../pages/home.vue'
import Index from '../pages/index.vue'

const Detail = () => import ('../pages/detail')
const Product = () => import ('../pages/product')

const Cart = () => import ('../pages/cart')

const Order = () => import ('../pages/order')
const OrderConfirm = () => import ('../pages/orderconfirm')
const OrderList = () => import ('../pages/orderlist') 
const OrderPay = () => import ('../pages/orderpay')
const AliPay = () => import ('../pages/alipay')

const login = () => import ('../pages/login')

const routes = [
  //home组件包括index,detail,product三个组件
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    children:[
      {
        path: 'index',
        name: 'index',
        component: Index
      },
      {
        path: 'detail/:id',  //动态路由
        name: 'detail',
        component: Detail
        //  resolve=>require(['../pages/detail.vue'],resolve)       //第二种按需加载，类似于Promise函数，不会立即执行，访问时加载[]内路径的组件，通过resolve抛出
      },
      {
        path: 'product/:id',   //动态路由
        name: 'product',
        component: Product
      },
    ]
      
  },
  //购物车单独拿出来
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  //order组件包含orderlist,orderpay,ordercomfirm三个组件
  {
    path: '/order',
    name: 'order',
    component: Order,
    children:[
      {
        path: 'list',
        name: 'order-list',
        component: OrderList
      },
      {
        path: 'confirm',  
        name: 'order-confirm',
        component: OrderConfirm
      },
      {
        path: 'pay',  
        name: 'order-pay',
        component: OrderPay
      },
      {
        path: 'alipay',  
        name: 'alipay',
        component: AliPay
      },
    ]
      
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },

]

const router = new VueRouter({
  routes
})

export default router
