`<template>
  <div class='header'>
    <!-- 1、吸顶导航 -->
    <div class='nav-topbar'>
      <div class='container'>
        <div class='topbar-menu'>
          <a href="javescript:;">小米商城</a>
          <a href="javescript:;">MUI</a>
          <a href="javescript:;">云服务</a>
          <a href="javescript:;">协议规则</a>
        </div>
        <div class='topbar-user'>
          <a href="javescript:;" v-if='username'>{{username}}</a>
          <a href="javescript:;" v-if='!username' @click='login'>登录</a>
          <a href="javescript:;" v-if='username' @click='logout'>退出</a>
          <a href="/#/order/list" v-if='username'>我的订单</a>
          <a href="javescript:;" class='my-cart' @click='goToCart'><span class='icon-cart'></span>购物车({{cartCount}})</a>
        </div>
      </div>
    </div>

    <!-- 2、导航头部 -->
    <div class='nav-header'>
      <div class='container'>
        <!-- 2.1图标 -->
        <div class='header-logo'>
          <!-- 点击图标跳转到首页 -->
          <a href="/#/index"></a>
        </div>
        <!-- 2.2菜单 -->
        <div class='header-menu'>
          <div class='item-menu'>
            <span>小米手机</span>
            <div class='children'>
              <ul>
                <li class='product' v-for='(item,index) in phoneList' :key='index'> 
                  <!-- 新窗口打开链接  点击图片跳转到商品站页面，动态路由-->
                  <a :href="'/#/product/'+item.id" target='_blank'>
                    <div class='pro-img'>
                      <img v-lazy='item.mainImage'>
                    </div>
                    <div class='pro-name'>{{item.name}}</div>
                    <div class='pro-price'>{{item.price | currency}}</div>
                  </a>            
                </li>
              </ul>
            </div>
          </div>

          <div class='item-menu'>
            <span>RedMi红米</span>
            <div class='children'>

            </div>
          </div>

          <div class='item-menu'>
            <span>电视</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-1.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米壁画电视 65英寸</div>
                    <div class="pro-price">6999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-2.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米全面屏电视E55A</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-3.png'" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 32英寸</div>
                    <div class="pro-price">699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-4.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 55英寸</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-5.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 65英寸</div>
                    <div class="pro-price">2699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-6.png'" alt="">
                    </div>
                    <div class="pro-name">查看全部</div>
                    <div class="pro-price">查看全部</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 2.3搜索框 -->
        <div class='header-search'>
          <div class='wrapper'>
            <input type="text" name='keyword'>
            <a href="javascript:;"></a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name:'NavHeader',
  data(){
    return{
      phoneList:[],
      // username: this.$store.state.userName      //不要在data里获取state里的数据，因为数据改变data不会追踪，应该在computed计算属性中获取
    }
  },
  computed:mapState({
    username:'userName',            //登录之后，首页再从vuex里获取用户名和购物车商品数量
    cartCount:'cartCount'
    // username(){
    //   return this.$store.state.userName
    // },
    // cartCount(){
    //   return this.$store.state.cartCount
       
    // }
  }),
  filters:{
    currency(val){
      if(!val)return 0.00
      // toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。
      return '￥'+val.toFixed(2)+'元'
    }
  },
  methods:{
    login(){
      this.$router.push('/login')
    },
    logout(){
      this.axios.post('/user/logout').then(()=>{
        this.$message.success('退出成功！')
        this.$store.dispatch('saveUserName','')       //退出登录，把vuex中保存的用户名置空
        this.$store.dispatch('saveCartCount','0')     //购物车数量置为0
        this.$cookie.set('userId','',{expires:'-1'})  //cookie清空
      })
    },
    getProductList(){
      // axios用get请求时，用params传参，post不用
      this.axios.get('/products',{
        params:{
          categoryId:'100012'
        }
      }).then((res)=>{
        if(res.list.length > 6){
          this.phoneList = res.list.slice(0,6)
        }
      })
    },

    goToCart(){
      this.$router.push('/cart')
    },

    getCartCount(){
      this.axios.get('/carts/products/sum').then((res)=>{
        // to-do
        this.$store.dispatch('saveCartCount',res);
      })
    },
  },
  mounted(){
    this.getProductList();

    // 性能优化  只有从登录页面跳转过来的才需要获取购物车商品数量
    let params = this.$route.params;
    if(params &&  params.from == 'login'){
       this.getCartCount()       //实现登录退出再登录，第二次登录时用户的购物车商品数不会同步更新，需要重新发送请求，获取购物车数量
    }
 
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/base.scss';    //导入后面加分号
  @import '../assets/scss/mixin.scss';    //导入mixin方法
  @import '../assets/scss/config.scss';
  .header{
    .nav-topbar{
      height: 39px;
      line-height: 39px;
      background-color: #333333;
      color: #B0B0B0;
      .container{
        display: flex;
        justify-content: space-between;
        a{
          display:inline-block;
          color:#B0B0B0;
          margin-right: 17px;
        }
        .my-cart{
          width: 110px;
          background-color: #FF6600;
          text-align: center;
          color: #ffffff;
          margin-right: 0;
          .icon-cart{
            @include bgImg(16px,12px,'/imgs/icon-cart-checked.png');
            margin-right: 4px;  
          }
        }
      }
    }

    .nav-header{
      .container{
        position: relative;
        height: 112px;
        // 使用mixin方法
        @include flex();

        
        .header-menu{
          display:inline-block;
          width:643px;
          padding-left:209px;
          .item-menu{
            display:inline-block;
            color:#333333;
            font-weight:bold;
            font-size:16px;
            line-height:112px;
            margin-right:20px;
            span{
              cursor:pointer;
            }
            &:hover{
              color:$colorA;
              .children{
                height:220px;     //鼠标移入Menu，children高度展开
                opacity:1;
              }
            }
            .children{
              position:absolute;
              top:112px;
              left:0;
              height: 0;
              opacity: 0;
              width:1226px;
              border-top:1px solid #E5E5E5;
              box-shadow:0px 7px 6px 0px rgba(0, 0, 0, 0.11);
              z-index: 10;
              transition:all .5s;   //高度缓慢展开
              background-color: #ffffff;
              overflow: hidden;

              .product{
                position:relative;
                float:left;
                width:16.6%;
                height:220px;
                font-size:12px;
                line-height:12px;
                text-align: center;

                a{
                  display:inline-block;
                }
                img{
                  // 宽高设置一个，另一个自适应，不然可能会变形
                  width:auto;
                  height:111px;
                  margin-top:26px;
                }
                .pro-img{
                  height:137px;
                }
                .pro-name{
                  font-weight:bold;
                  margin-top:19px;
                  margin-bottom:8px;
                  color:$colorB;
                }
                .pro-price{
                  color:$colorA;
                }

                &:before{
                  content:'';
                  position: absolute;
                  top: 28px;
                  right: 0;
                  border-left: 1px solid $colorF;
                  height: 100px;
                  width: 1px;
                }
                // 最后一个竖斜杠隐藏
                &:last-child:before{
                  display:none;
                }
              }
            }
          }
        }

        .header-search{
          width:319px;
          .wrapper{
            height:50px;
            border:1px solid #E0E0E0;
            display:flex;
            align-items:center;
            input{
              border:none;
              box-sizing: border-box;
              border-right:1px solid #E0E0E0;
              width:264px;
              height:50px;
              padding-left:14px;
            }
            a{
              @include bgImg(18px,18px,'/imgs/icon-search.png');
              margin-left:17px;
            }
          }
        }
      }
    }

  }


</style>