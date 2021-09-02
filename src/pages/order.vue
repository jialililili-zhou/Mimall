// orderlist,orderconfirm,orderpay,Alipay共用order页面

<template>
<!-- template内要先用div包裹起来，再在div内定义组件和标签 -->
  <div>
    <!-- <order-header :title='title'>
      <template v-slot:tip><span>{{tips}}</span></template>
    </order-header> -->
    <!-- 占位，order的子路由显示的地方 -->
    <router-view></router-view>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>  
</template>

<script>
// import OrderHeader from '../components/OrderHeader.vue'
import ServiceBar from '../components/ServiceBar.vue'
import NavFooter from '../components/NavFooter.vue'

export default {
  name:'Order',
  components:{
    // OrderHeader,
    ServiceBar,
    NavFooter
  },
  data(){
    return{
      title:'',
      tips:''
    }
  },
  // 只有第一次从其他路由进入到order路由才会调用mounted，而order子路由内部的跳转不会调用mounted，
  // 所以有可能会出现进入到某个子页面title不改变的情况
  // 解决：将orderheader的title和tips放在子路由内部确定
  mounted(){
    // 不同的页面orderheader内容不一样，需要获取路由地址，根据路由地址填写不同的title和tips
  //   let path = this.$route.path
  //   if(path == '/order/confirm'){
  //     this.title = '订单确认'
  //     this.tips = '请认真填写收货地址'
  //   }else if(path == '/order/list'){
  //     this.title = '订单列表'
  //     this.tips = '请谨防钓鱼链接或诈骗电话，了解更多>'
  //   }else if(path = '/order/pay'){
  //     this.title = '订单支付'
  //     this.tips = '请谨防钓鱼链接或诈骗电话，了解更多>'
  //   }
  }
}
</script>

<style>

</style>