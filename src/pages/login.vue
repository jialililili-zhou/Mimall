<template>
  <div class="login">
    <!-- 1、顶部图片 -->
    <div class="container">
      <a href="/#/index"><img src="/imgs/login-logo.png" alt=""></a>
    </div>
    <!-- 2、注册框 -->
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">帐号登录</span><span class="sep-line">|</span><span>扫码登录</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入帐号" v-model="username">
          </div>
          <div class="input">
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>
          <div class="btn-box">
            <!-- 全局引入button样式，btn为小号按钮 -->
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms" @click="register">手机短信登录/注册</div>
            <div class="reg" @click="register">立即注册<span>|</span>忘记密码？</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 3、底部内容 -->
    <div class="footer">
      <div class="footer-link">
        <a href="https://www.imooc.com/u/1343480" target="_blank">河畔一角主页</a><span>|</span>
        <a href="https://coding.imooc.com/class/113.html" target="_blank">Vue全栈课程</a><span>|</span>
        <a href="https://coding.imooc.com/class/236.html" target="_blank">React全家桶课程</a><span>|</span>
        <a href="https://coding.imooc.com/class/343.html" target="_blank">微信支付专项课程（H5+小程序/云+Node+MongoDB）</a>
      </div>
      <p class="copyright">Copyright ©2019 mi.futurefe.com All Rights Reserved.</p>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name:'login',
  data(){
    return{
      username:'',
      password:'',
      userId:''         //前后端交互，彼此不认识，一般通过cookie来认证，这里用userId当作cookie来做认证
    }
  },
  methods:{
    // 用户名和购物车一样，都是用户进行点击购物车或输入用户名登录以后，先把数据送到服务端，再把服务端返回的最新数据同步更新到vuex中
    login(){
      // let username = this.username
      // let password = this.password
      let {username,password} = this              //ES6解构，username和passwor本身是挂载到vue实例上的，可用this获得
      this.axios.post('/user/login',{
        username,
        password
      }).then((res)=>{
        this.$cookie.set('userId',res.id,{expires:'session'})      //设置一个名为userId值为res.id的cookie，expires表示期限
        // this.$store.dispatch('saveUserName',username)
        this.saveUserName(res.username)          //登录成功将用户名存放到vuex中，全局共享
        this.$router.push({
          name:'index',                         //登录成功跳转到首页   
          params:{
            from:'login'      //name和params传参一起使用，path和query传参一起使用
          }
        })     
      })
    },
    ...mapActions(['saveUserName']),
    register(){
      this.axios.post('/user/register',{
        username:'jialili',
        password:'123456',
        email:'jialili@163.com'
      }).then((res)=>{
        alert("注册成功！")
      })
    }
  }
}
</script>

<style lang='scss'>
  .login{
    &>.container{     //&:scss中表示父类，>是子代选择器
      height:113px;
      img{
        width:auto;
        height:100%;
      } 
    }
    .wrapper{
      background:url('/imgs/login-bg.jpg') no-repeat center;
      .container{
        height:576px;
        position:relative;
        .login-form{
          box-sizing: border-box;
          padding-left: 31px;
          padding-right: 31px;
          width:410px;
          height:510px;
          background-color:#ffffff;
          position:absolute;
          bottom:29px;
          right:0;
          h3{
            line-height:23px;
            font-size:24px;
            text-align:center;
            margin:40px auto 49px;
            .checked{
              color:#FF6600;
            }
            .sep-line{
              margin:0 32px;
            }
          }
          .input{      
            display:inline-block;
            width:348px;
            height:50px;
            border:1px solid #E5E5E5;
            margin-bottom:20px;
            input{
              box-sizing: border-box;
              width: 100%;
              height: 100%;
              border: none;
              padding-left: 18px;
            }
          }
          .btn{
            width:100%;
            line-height:50px;
            margin-top:10px;
            font-size:16px;
          }
          .tips{
            margin-top:14px;
            display:flex;
            justify-content:space-between;
            font-size:14px;
            cursor:pointer;
            .sms{
              color:#FF6600;
            }
            .reg{
              color:#999999;
              span{
                margin:0 7px;
              }
            }
          }
        }
      }
    }
    .footer{
      height:100px;
      padding-top:60px;
      color:#999999;
      font-size:16px;
      text-align:center;
      .footer-link{
        a{
          color:#999999;
          display:inline-block;
        }
        span{
          margin:0 10px;
        }
      }
      .copyright{
        margin-top:13px;
      }
    }
  }
</style>