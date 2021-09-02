//----------接口环境设置

// 仅针对CORS和jsonp跨域，代理跨域，直接设置vue.config.js

let baseURL

// process.env.NODE_ENV可以获取当前nodejs进程里的一些环境变量，项目是在nodejs环境下运行的
switch(process.env.NODE_ENV){
  case 'development':
    baseURL = 'http://dev-mall-pre.springboot.cn/api';        //开发
    break;
  case 'test':
    baseURL = 'http://test-mall-pre.springboot.cn/api';       //测试
    break;
  case 'prod':
    baseURL = 'http://mall-pre.springboot.cn/api';            //生产
    break;
  default:
    baseURL = 'http://mall-pre.springboot.cn/api'
    break
}

export default{
  baseURL
}