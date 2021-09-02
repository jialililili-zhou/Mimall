<template>
  <div class="nav-bar" :class="{'is_Fixed':isFixed}">
    <div class="container">
      <div class="pro-title">
        {{title}}
      </div>
      <div class="pro-param">
        <a href="javascript:;">概述</a><span>|</span>
        <a href="javascript:;">参数</a><span>|</span>
        <a href="javascript:;">用户评价</a>
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'productParams',
  data(){
    return{
      isFixed: false
    }
  },
  props:{
    title:String
  },
  mounted(){
    window.addEventListener('scroll',this.initHeight)
  },
  methods:{
    initHeight(){
      //前两种获取一般浏览器滚动高度，后一种是ie浏览器方法
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      this.isFixed = scrollTop > 152 ? true : false
    }
  },
  destroyed(){
    window.removeEventListener('scroll',this.initHeight,false)      //注意传三个参数，第三个默认false
  }
}
</script>

<style lang='scss'>
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
 .nav-bar{
   height:70px;
    line-height:70px;
    border-top:1px solid $colorH;
    background-color:$colorG;
    z-index: 10;
    &.is_Fixed{
      position:fixed;
      top: 0;
      box-shadow: 0 5px 5px $colorE;
      width: 100%;
    }
    .container{
      @include flex();
      .pro-title{
        font-size:$fontH;
        color:$colorB;
        font-weight:bold;
      }
      .pro-param{
        font-size:$fontJ;
        span{
          margin:0 10px;
        }
        a{
          color:$colorC;
        }
      }
    }
 }
</style>