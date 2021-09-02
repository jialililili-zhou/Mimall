<template>
  <div class='index'>
    <div class='container'>
      <!-- 1、轮播加菜单 -->
      <div class='swiper-box'>
        <!-- 1.1、导航菜单 -->
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <!-- 防止点击跳转 -->
              <a href="javascript:;">手机 电话卡</a>    
              <div class="children">
                <ul v-for='(item,index) in menuList' :key="index">  
                  <li v-for='(i,index) in item' :key='index'>
                    <!-- 检查i是否有值，若有值就渲染数组里的数据，若没有就默认渲染小米9，点击页面不跳转 -->
                    <a :href="i? '/#/product'+i.id : ''">
                      <img :src="i ? i.img : '/imgs/item-box-1.png'" alt="">
                      {{i ? i.name : '小米9'}}
                    </a>

                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插线板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
            </li>
          </ul>
        </div>
        <!-- 1.2、轮播图 -->
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in slideList" :key='index'>
            <a :href="'/#/product/'+item.id"><img :src="item.img" alt=""></a>
          </swiper-slide>
          <!-- Optional controls -->
          <!-- 分页器，下面的小圆点 -->
          <div class="swiper-pagination"  slot="pagination"></div>
          <!-- 上一页 < -->
          <div class="swiper-button-prev" slot="button-prev"></div>
          <!-- 下一页 >-->
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
       <!-- 2、广告位 -->
      <div class='ads-box'>
        <a :href="'/#/product'+item.id" v-for='(item,index) in adsList' :key='index'>
        <!-- 下面图片的地址本来就是变量，就不用单引号了 -->
          <img v-lazy="item.img" alt="">
        </a>
      </div>
      <div class="banner">
        <a href="/#/product/30">
        <!-- v-bind指令，里面一定是变量，地址是字符串，用单引号引起来 -->
          <img v-lazy="'/imgs/banner-1.png'" alt="">
        </a>
      </div>
    </div>
    <!-- 3、商品图 -->
      <div class="product-box">
        <div class="container">
          <h2>手机</h2>
        <div class='wrapper'>
          <div class="banner-left">
            <a href="/#/product/35"><img v-lazy="'/imgs/mix-alpha.jpg'" alt=""></a>
          </div>
          <div class="list-box">
            <div class="list" v-for='(item,index) in phoneList' :key='index'>
              <div class="item" v-for='(i,index1) in item' :key='index1'>
                <!-- 动态绑定class，后面跟对象{} -->
                <span :class="{'new-pro':index1%2==0} ">{{index1 % 2 == 0 ? '新品':'秒杀'}}</span>
                <div class="item-img">
                  <img v-lazy="i.mainImage" alt="">
                </div>
                <div class="item-info">
                  <h3>{{i.name}}</h3>
                  <p>{{i.subtitle}}</p>
                  <!-- 点击购物车，携带商品id跳转到购物车页面 -->
                  <p class='price' @click='addCart(i.id)'>{{i.price}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

    <service-bar></service-bar>
    <!-- 5、加入购物车显示出来的弹框 -->
    <Modal title="提示" 
      sureText="查看购物车" 
      btnType="1" 
      modalType="middle"
      :showModal="showModal"
      @submit='goToCart'
      @cancel='cancel'>
      <!-- 插槽使用：外面用template模板包围，slot:模板名称 -->
      <template v-slot:body><p>商品添加成功！</p></template>
      </Modal>

  </div>
</template>

<script>
import ServiceBar from '../components/ServiceBar.vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import Modal from '../components/Modal.vue'

export default {
  name:'Index',
  components:{
    ServiceBar,
    swiper,
    swiperSlide,
    Modal
  },
  data(){
    return{
      // 轮播图设置
      swiperOption:{
        autoplay:true,
        loop:true,
        effect:'cube',   //轮播动画
        cubeEffect: {
         shadowOffset: 100,
         shadowScale: 0.6
        },
        pagination: {
          el: '.swiper-pagination',
          clickable:true      //点击小圆点图片跟着切换
        },
        // 控制< >点击，切换图片
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      },
      // 获取轮播图图片等信息，本地模拟，没有接口
      slideList:[
        {
          id:'42',
          img:'/imgs/slider/slide-1.jpg'
        },
        {
          id:'45',
          img:'/imgs/slider/slide-2.jpg'
        },
        {
          id:'46',
          img:'/imgs/slider/slide-3.jpg'
        },
        {
          id:'',
          img:'/imgs/slider/slide-4.jpg'
        },
        {
          id:'',
          img:'/imgs/slider/slide-5.jpg'
        }
      ],
      // menuitem鼠标移入展开,共有6行4列，所以menulist大数组里一共有6个数组，每个数组里又各有4个对象，循环两次
      menuList:[
          [
            {
              id:30,
              img:'/imgs/item-box-1.png',
              name:'小米CC9',
            },{
              id:31,
              img:'/imgs/item-box-2.png',
              name:'小米8青春版',
            },{
              id:32,
              img:'/imgs/item-box-3.jpg',
              name:'Redmi K20 Pro',
            },{
              id:33,
              img:'/imgs/item-box-4.jpg',
              name:'移动4G专区',
            }
          ],
          [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]
      ],
      // 广告位图片
      adsList:[
          {
            id:33,
            img:'/imgs/ads/ads-1.png'
          },{
            id:48,
            img:'/imgs/ads/ads-2.jpg'
          },{
            id:45,
            img:'/imgs/ads/ads-3.png'
          },{
            id:47,
            img:'/imgs/ads/ads-4.jpg'
          }
      ],
      phoneList:[],
      showModal: false
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    // 页面刚加载时，先从服务端相应接口请求数据，将其渲染出来
    init(){
      this.axios.get('/products',{
        params:{
          categoryId:'100012',
          pageSize:14
        }
      }).then((res)=>{
        // slice不会改变原数组，splice会改变原数组
        res.list = res.list.slice(6,14)
        this.phoneList = [res.list.slice(0,4),res.list.slice(4,8)]
      })
    },

    // 加入购物车=>先选中商品，点击添加购物车携带商品id向服务端请求数据，返回结果中包含购物车商品数量，将其自动更新到vuex中
    addCart(id){
      this.axios.post('/carts',{
        productId:id,
        selected:true     //添加购物车默认选中
      }).then((res)=>{
        this.showModal = true
        this.$store.dispatch('saveCartCount',res.cartTotalQuantity)    //同步跟新购物车数量
      }).catch(()=>{
        this.showModal = true
      })
    },

    goToCart(){
      this.$router.push('/cart')
    },
    
    cancel(){
      this.showModal = false
    }
  }
}
</script>

<style lang='scss'>
@import '../assets/scss/mixin.scss';
@import '../assets/scss/config.scss';
@import '../assets/scss/base.scss';

 .index{
    .swiper-box{
      .nav-menu{
        position:absolute;
        width:264px;
        height:451px;
        z-index:9;
        padding:26px 0;
        // 背景透明，不能直接设置opacity，这样连里面的字都会透明
        background-color:#55585a7a;
        box-sizing:border-box;
        .menu-wrap{
          .menu-item{
            height:50px;
            line-height:50px;
            a{
              // 子绝父相
              position:relative;
              display:block;
              font-size:16px;
              color:#ffffff;
              padding-left:70px;
              &:after{
                content:' ';
                // 后面添加箭头，绝对定位，子绝父相
                position:absolute;
                right:30px;
                top:17.5px;
                @include bgImg(10px,15px,'/imgs/icon-arrow.png');
              }
            }
            &:hover{
              background-color:$colorA;
              .children{
                display: block;
              }
            }
            .children{
              display: none;
              position: absolute;
              top: 0;
              left: 264px; 
              width: 962px;
              height: 451px;
              background-color:$colorG;
              border: 1px solid $colorH;
              ul{
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 75px;
                padding-left: 0;
                li{
                  height: 75px;
                  line-height: 75px;
                  flex: 1;
                  img{
                    width:42px;
                    height:35px;
                    vertical-align:middle;
                    margin-right:15px;
                  }
                  a{
                    color: $colorB;
                    font-size:14px;
                  }
                }
              }
            }
          }
        }
      }

      .swiper-container {
        height: 451px;
        .swiper-button-prev{
          left:274px;
        }
        img{
          width:100%;
          height:100%;
        }
      }  
    }
    .ads-box{
      @include flex();
      margin-top:14px;
      margin-bottom:31px;
      img{
        width:296px;
        height:167px;
      }
    }
    .banner{
      margin-bottom:50px;
      img{
        width: 1226px;
      }
    }
    .product-box{
      background-color:$colorJ;
      padding:30px 0 50px;
      h2{
        font-size:$fontF;
        height:21px;
        line-height:21px;
        color:$colorB;
        margin-bottom:20px;
      }
      .wrapper{
        display: flex;
        .banner-left{
          margin-right:16px;
          img{
            width:224px;
            height:619px;
          }
        }
        .list-box{
          .list{
            @include flex();
            width:986px;
            margin-bottom:14px;
            .item{
              width:236px;
              height:302px;
              background-color:$colorG;
              text-align:center;
              span{
                display:inline-block;
                width:67px;
                height:24px;
                font-size:14px;
                line-height:24px;
                color:$colorG;
                &.new-pro{
                  background-color:#7ECF68;
                }
                &.kill-pro{
                  background-color:#E82626;
                }
              }
              .item-img{
                img{
                  width:100%;
                  height:185px;
                }
              }
              .item-info{
                h3{
                  font-size: $fontJ;
                  color: $colorB;
                  line-height:$fontJ;
                  font-weight:bold;
                }
                p{
                  color:$colorD;
                  line-height:13px;
                  margin:6px auto 13px;
                }
                .price{
                  color:#F20A0A;
                  font-size:$fontJ;
                  font-weight:bold;
                  cursor:pointer;
                  &:after{
                    @include bgImg(22px,22px,'/imgs/icon-cart-hover.png');
                    content:' ';
                    margin-left:5px;
                    vertical-align: middle;
                  }
                }
              }
            }
          }
        }
      }
      
    }
 }
</style>