<template>
  <!-- 弹出框弹出做过渡，用vue中的插件transition把modal都包裹起来 -->
  <transition name='slide'>
    <div class="modal" v-show='showModal'>
      <div class="mask"></div>
      <div class="modal-dialog">
        <!-- 头 -->
        <div class="modal-header">
        <span>{{title}}</span>
        <a href="javascript:;" class='icon-close' @click="cancelClick"></a>
        </div>
        <!-- 中间内容，插槽 -->
        <div class="modal-body">
          <slot name='body'></slot>
        </div>
        <!-- 底部按钮，确定取消 -->
        <div class="modal-footer">
          <a href="javasript:;" class="btn" v-if='btnType==1' @click="sureClick">{{sureText}}</a>
          <a href="javasript:;" class="btn" v-if='btnType==2' @click="cancelClick">{{cancelText}}</a>
          <div class='btn-group' v-if='btnType==3'>
            <a href="javasript:;" class="btn"  @click="sureClick">{{sureText}}</a>
            <a href="javasript:;" class="btn btn-default"  @click="cancelClick">{{cancelText}}</a>
          </div>
        </div>
      </div>
  </div>
  </transition>
</template>

<script>
export default {
  name:'modal',
  props:{
    // 弹框类型：小small,中middle,大large,表单form
    modalType:{
      type:String,
      default:'form'
    },
    // 弹框标题
    title:String,
    // 按钮类型：1确定，2取消，3确定取消
    btnType:String,
    // 确定按钮名称
    sureText:{
      type: String,
      default:'确定'
    },
    // 取消按钮名称
    cancelText:{
      type: String,
      default:'取消'
    },
    // 决定弹框要不要展示出来
    showModal:Boolean
  },
  methods:{
    sureClick(){
      this.$emit('submit')
    },
    cancelClick(){
      this.$emit('cancel')
    }
  }
}
</script>

<style lang='scss'>
@import '../assets/scss/mixin.scss';
@import '../assets/scss/config.scss';
@import '../assets/scss/base.scss';
@import '../assets/scss/Modal.scss';

</style>