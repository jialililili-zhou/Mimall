<template>
  <div class='alipay'>
    <!-- content是一个form表单加一个script脚本，利用v-html将它渲染出来  此时页面仍然不会显示支付页面，因为返回
    的脚本没有将表单提交，此时需要我们帮助提交-->
    <div class="form" v-html="content"></div>
    <loading v-show='loadingshow'></loading>
  </div>
</template>

<script>
import Loading from '../components/Loading.vue'

export default {
  name:'AliPay',
  components:{
    Loading
  },
  data(){
    return{
      orderId: this.$route.query.orderId,
      content:'',
      loadingshow: true,
    }
  },
  mounted(){
    this.paySubmit()
  },
  methods:{
    paySubmit(){
      this.axios.post('/pay',{
        orderId:this.orderId,    //订单编号
        orderName:'快乐买买买，一起剁手吧~',     //订单名称
        amount: 20,   //支付金额
        payType: 1    //支付类型 1：支付宝  2：微信
      }).then(res=>{
        this.content = res.content     //后台返回一段html代码(form表单），将其保存
        // console.log(this.content) 
        setTimeout(()=>{
          document.forms[0].submit()      //拿到form表单提交，form表单解析需要一段时间，设个定时器
          // console.log(document.forms[0])
          this.loadingshow = false
        },100)
      })
    }
  }
}
</script>

<style>

</style>