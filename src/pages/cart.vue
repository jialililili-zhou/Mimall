<template>
  <div class='cart'>
    <!-- 1、顶部 -->
    <order-header title='我的购物车'>
      <template v-slot:tip><span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span></template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <!-- 2、中间内容 -->
        <div class="cart-box">
          <!-- 2.1、头部标题 -->
          <ul class="cart-item-header">
            <li class="col-1"><span class='checkbox' :class="{'checked':allChecked}" @click='toggleAll'></span>全选</li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <!-- 2.2、商品数量详情 -->
          <ul class="cart-item-list">
            <li class='cart-item' v-for='(item,index) in list' :key='index'>
              <!-- 2.1选择框 -->
              <div class="item-check" >
                <span class="checkbox" :class="{'checked':item.productSelected}" @click="updateCart(item,'')"></span>
              </div>
              <!-- 2.2商品名称 -->
              <div class="item-name">
                <img :src="item.productMainImage" alt="">
                <span>{{item.productName+','+item.productSubtitle}}</span>
              </div>
              <!-- 2.3商品价格 -->
              <div class="item-price">{{item.productPrice}}</div>
              <!-- 2.4商品数量 -->
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updateCart(item,'-')">-</a>
                  <span>{{item.quantity}}</span>
                  <a href="javascript:;" @click="updateCart(item,'+')">+</a>
                </div>
              </div>
              <!-- 2.5小计 -->
              <div class="item-total">{{item.productTotalPrice}}</div>
              <!-- 2.6删除商品 -->
              <div class="item-del" @click='delProduct(item)'></div>
            </li>
          </ul>
        </div>
        <!-- 3、底部结算 -->
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/#/index">继续购物</a>
            共<span>{{list.length}}</span>件商品，已选择<span>{{checkedNum}}</span>件
          </div>
          <div class="total fr">
            合计：<span>{{cartTotalPrice}}</span>元
            <a href="javascript:;" class="btn" @click='order'>去结算</a>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from '../components/OrderHeader.vue'
import NavFooter from '../components/NavFooter.vue'
import ServiceBar from '../components/ServiceBar.vue'
import { Message } from 'element-ui'

export default {
  name:'Cart',
  components:{
    OrderHeader,
    NavFooter,
    ServiceBar
  },
  data(){
    return{
      list:[],              //商品列表,list.length是总长度
      allChecked: true,    //是否全选
      cartTotalPrice: 0,    //总金额
      checkedNum: 0,        //选中商品数量
    }
  },
  mounted(){
    this.getCartList()
  },
  methods:{
    getCartList(){
      this.axios.get('/carts').then(res=>{
        this.renderData(res)
      })
    },

    renderData(res){
      this.list = res.cartProductVoList || []
      this.allChecked = res.selectedAll
      this.cartTotalPrice = res.cartTotalPrice
      this.checkedNum = this.list.filter(item=>item.productSelected).length     //返回只包含选中商品的数组
    },

    // 全选全不选
    toggleAll(){

      // 全选接口：/carts/selectAll，全不选接口：/carts/unSelectAll  两个接口的方法都是put,都会返回更新之后的购物车数组
      let path = this.allChecked ? '/carts/unSelectAll' : '/carts/selectAll'
      this.axios.put(path).then(res=>{
        // 拿到新购物车列表数据，重新渲染
        this.renderData(res)
      })
    },
    
    // 控制购物车商品数量的加减和单个商品的选中状态
    updateCart(item,type){
      let quantity = item.quantity,
          selected = item.productSelected
      if(type == '+'){
        if(quantity > item.productStock){      //先判断商品数量是否超过库存
          this.$message.warning('超过库存')
          return
        }
        ++quantity                            //num++会先赋值，在下一次循环中数量才+1
      }else if(type == '-'){
        if(quantity == 1){
          this.$message.warning('不能再减少了')
          return
        }
        --quantity
      }else{
        selected = !item.productSelected
      }
      this.axios.put("/carts/"+item.productId,{
        quantity,
        selected
      }).then(res=>{
        this.renderData(res)
      })
    },
    // 删除商品
    delProduct(item){
      let id = item.productId
      this.axios.delete('/carts/'+id).then(res=>{
        this.$message.success('删除成功！')
        this.renderData(res)
      })
    },
    // 结算
    order(){
      let isChecked = this.list.every(item=>!item.productSelected)      //购物车里的每一件都没选中
      if(!isChecked){
        this.$router.push('/order/confirm')
      }else{
        this.$message.warning('购物车为空！')
      }
    }
  }
}
</script>

// 更改购物车内商品的状态，都是先进行加减删除等操作，再将操作后的数据发到服务端，再把服务端返回的结果重新更新购物车

<style lang='scss'>
  .cart{
    .wrapper{
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:114px;
      .cart-box{
        background-color:#fff;
        font-size:14px;
        color:#999999;
        text-align:center;
        .checkbox{
          display: inline-block;
          width: 22px;
          height: 22px;
          border: 1px solid #E5E5E5;
          vertical-align: middle;
          margin-right: 17px;
          cursor:pointer;
          &.checked{
            background:url('/imgs/icon-gou.png') #FF6600 no-repeat center;
            background-size:16px 12px;
            border:none;
          }
        }
        .cart-item-header{
          display:flex;
          height: 79px;
          line-height: 79px;
          .col-1{
            flex:1;
          }
          .col-2{
            flex:2;
          }
          .col-3{
            flex:3;
          }
        }
        .cart-item-list{
          .cart-item{
            display:flex;
            align-items:center;
            height:125px;
            border-top:1px solid #E5E5E5;
            font-size:16px;
            .item-check{
              flex:1;
            }
            .item-name{
              flex:3;
              font-size: 18px;
              color: #333333;
              display: flex;
              align-items: center;
              img{
                width:80px;
                height:80px;
                vertical-align:middle;
              }
              span{
                margin-left: 30px;
              }
            }
            .item-price{
              flex:1;
              color:#333333;
            }
            .item-num{
              flex:2;
              .num-box{
                display:inline-block;
                width:150px;
                height:40px;
                line-height:40px;
                border:1px solid #E5E5E5;
                font-size:14px;
                a{
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
                span{
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
              }
            }
            .item-total{
              flex:1;
              color:#FF6600;
            }
            .item-del{
              flex:1;
              width:14px;
              height:12px;
              background:url('/imgs/icon-close.png') no-repeat center;
              background-size:contain;
              cursor:pointer;
            }
          }
        }
      }
      .order-wrap{
        font-size:14px;
        color: #666666;
        margin-top: 20px;
        height: 50px;
        line-height: 50px;
        .cart-tip{
          margin-left: 29px;
          a{
            color: #666666;
            margin-right:37px;
          }
          span{
            color:#FF6600;
            margin:0 5px;
          }
        }
        .total{
          font-size:14px;
          color:#FF6600;
          span{
            font-size:24px;
          }
          a{
            width:202px;
            height:50px;
            line-height:50px;
            font-size:18px;
            margin-left:37px;
          }
        }
      }
    }
  }
</style>