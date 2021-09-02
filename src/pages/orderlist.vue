<template>
  <div class='orderlist'>
    <order-header title='订单列表'>
      <template v-slot:tip><span>请谨防钓鱼链接或诈骗电话，了解更多</span></template>
    </order-header>

    <div class="container">
      <div class="wrapper">
        <div class="order-box">
          <loading v-if='showLoading'></loading>
          <div class="order" v-for='(item,index) in list' :key='index'>
            <!-- 标题 -->
            <div class="order-title clearfix">
              <div class="item-info fl">
                {{item.createTime}}<span>|</span>{{item.receiverName}}<span>|</span>
                订单号：{{item.orderNo}}<span>|</span>{{item.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{item.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <!-- 内容 -->
            <div class="order-content clearfix">
                <div class="good-box fl">
                  <div class="good-list" v-for='(i,index) in item.orderItemVoList' :key='index'>
                    <div class="good-img">
                      <img v-lazy='i.productImage' alt="">
                    </div>
                    <div class="good-name">
                      <div class="p-name">{{i.productName}}</div>
                      <div class="p-money">{{i.totalPrice+'x'+i.quantity}}元</div>
                    </div>
                  </div>
                </div>
                <!-- 20:已付款 10未付款 -->
                <div class="good-state fr" v-if='item.status == 20'>
                  <a href="javascript:;">{{item.statusDesc}}</a>
                </div>
                <div class="good-state fr" v-else>
                  <a href="javascript:;" @click='goPay(item.orderNo)'>{{item.statusDesc}}</a>
                </div>
            </div>
          </div>
        </div>
        <!-- 第一种方式：分页器  pageSize:每一页的数量（Number类型） total:总数量  current-change函数：页数发生变化时调用，会有一个参数传递过来（当前页数）-->
          <el-pagination v-if="true" class="pagination" background layout="prev, pager, next"
            :pageSize="pageSize" :total="total" @current-change="handleChange">
          </el-pagination>
          <!-- 第二种方式： 点击按钮加载更多 -->
          <div class='load-more' v-if='false'>
            <el-button type='primary' :loading='btnloading' @click='loadMore'>加载更多</el-button>
          </div>

          <!-- 第三种方式：滚动加载更多  v-infinite-scroll:滚动时触发  infinite-scroll-disabled：true时不能滚动  infinite-scroll-distance:离底部还有多少距离触发滚动-->
          <div class='scroll-more' v-infinite-scroll='scrollMore' infinite-scroll-disabled='busy' infinite-scroll-distance="410" v-if='false'>
            <img src="/imgs/loading-svg/loading-spinning-bublles.svg" alt="" v-show='sloading'>
          </div>
          
        <!-- 在没有订单记录时显示  条件：服务器返回的list为空 -->
        <no-data v-if='!showLoading && list.length == 0'></no-data>
      </div>  
    </div>
  </div>
</template>

<script>
import OrderHeader from '../components/OrderHeader.vue'
import Loading from '../components/Loading.vue'
import NoData from '../components/NoData.vue'

import { Pagination,Button } from 'element-ui'        //element-ui组件
import infiniteScroll from "vue-infinite-scroll";     //插件，滚动加载更多

export default {
  name:'OrderList',
  components:{
    OrderHeader,
    Loading,
    NoData,
    [Pagination.name]:Pagination,       //动态加载变量   分页器加载  直接写不能识别，会报错
    [Button.name]:Button,       //动态加载变量  按钮点击加载
  },
  directives: {
      infiniteScroll
    },
  data(){
    return{
      list:[],
      showLoading:true,
      pageSize: 10,
      total:0,
      pageNum:1,
      btnloading: false,      //加载按钮
      busy:false,           //滚动加载，是否触发  true:禁用  false:开启
      sloading:false        //加载图片是否显示
    }
  },
  mounted(){
    this.getOrderList()
  },
  methods:{
    getOrderList(){
      this.busy = true
      this.btnloading = true
      this.axios.get('/orders',{
        params:{
          pageSize: 5,
          pageNum: this.pageNum
        }
      }).then(res=>{
        this.btnloading = false
        // this.list = this.list.concat(res.list),
        this.list = res.list
        this.total = res.total
        this.showLoading = false
        this.busy = false
      }).catch(()=>{
        this.showLoading = false
      })
    },
    goPay(orderNo){
      this.$router.push({
        path:'/order/pay',
        query:{
          orderNo
        }
      })
    },
    // 第一种方法：分页器  切换页面时会触发 回调参数pageNum：当前页
    handleChange(pageNum){
      this.pageNum = pageNum,
      this.getOrderList()
    },
    // 第二种方法：按钮点击加载
    loadMore(){
      this.pageNum++
      this.getOrderList()
    },
    // 第三种方法：滚动加载
    scrollMore(){
      this.busy = true
      setTimeout(()=>{
        this.pageNum++
        this.getList()
      },500)

    },
    // 请求订单列表，专门给scrollMore使用
    getList(){
      this.sloading = true
      this.axios.get('/orders',{
        params:{
          pageSize: 5,
          pageNum: this.pageNum
        }
      }).then(res=>{
        this.list = this.list.concat(res.list),
        this.showLoading = false
        if(res.hasNextPage){        //判断是否还有下一页
          this.busy = false
          this.sloading = true
        }else{
          this.busy = true      //没有，滚动禁用
          this.sloading = false
        }
      })
    },
  }
}
</script>

<style lang='scss'>
@import '../assets/scss/mixin.scss';
@import '../assets/scss/config.scss';

.orderlist{
  .wrapper{
    background-color:$colorJ;
    padding-top:33px;
    padding-bottom:110px;
    .order-box{
      .order{
        @include border();
        background-color:$colorG;
        margin-bottom:31px;
        &:last-child{
          margin-bottom:0;
        }
        .order-title{
          @include height(74px);
          background-color:$colorK;
          padding:0 43px;
          font-size:16px;
          color:$colorC;
          .item-info{
            span{
              margin:0 9px;
            }
          }
          .money{
            font-size:26px;
            color:$colorB;
          }
        }
        .order-content{
          padding:0 43px;
          .good-box{
            width:88%;
            .good-list{
              display: flex;
              align-items: center;
              height:145px;
              .good-img{
                width:112px;
                img{
                   width:100%;
                }
              }
              .good-name{
                font-size:20px;
                color:$colorB;
              }
            }
          }
          .good-state{
            @include height(145px);
            font-size: 20px;
            color:$colorA;
            a{
              color:$colorA;
            }
          }
        }
      }
    }
    .pagination{
      text-align: right;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active{
      background-color: #FF6600;
    }
    .load-more{
      text-align: center;
    }
    .el-button--primary{
      background-color: #FF6600;
      border-color: #FF6600;
    }
    .load-more,.scroll-more{
      text-align: center;
    }
  }
}

</style>