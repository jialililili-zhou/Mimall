<template>
  <div id='app'>
    <router-view> </router-view>
  </div>
</template>

<script>
export default {
  name:'app',
  mounted(){
    // 性能优化：若能获取到userId就说明当前是登录状态，才会获取用户名和商品数
    if(this.$cookie.get('userId')){
      this.getUser()
      this.getCartCount()
    }
  },
  methods:{
    // 问题：vuex里的数据是在内存中保存的，页面刷新后内存中保存的数据会消失，vuex里的数据也会消失
    // 解决：=>在app.vue里，实现首页刷新时重新向服务端请求数据，再动态更新vuex数据

    // 单页面开发，都是在一个页面内进行跳转，所以app.vue里面的mounted只有在首次进来时才会调用，其他跳转都不会调用
    // 如：先登录再退出再登录，app.vue就不会调用，所以依然会存在第二次登陆时获取不到用户名和商品数量的问题
    // 解决：在navheader组件内，重新实现刷新时向服务端请求数据
    getUser(){
      this.axios.get('/user').then(res=>{
        // 先从服务端获取数据，之后保存到vuex里  首页刷新时再从vuex里拿取数据
        this.$store.dispatch('saveUserName',res.username);
      })
    },
    getCartCount(){
      this.axios.get('/carts/products/sum').then((res)=>{
        this.$store.dispatch('saveCartCount',res);
      })
    }
  },
  
}
</script>

<style lang='scss'>
  @import './assets/scss/reset.scss';
  @import './assets/scss/config.scss';
  @import './assets/scss/button.scss';      //全局引入按钮样式 
</style>