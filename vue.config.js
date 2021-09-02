const { default: dist } = require("vuex-persistedstate");

module.exports = {
  devServer:{       //在nodeJs下搭建起服务器，用于项目的运行和调试
    host:'localhost',
    port:8080,
    //open:true,      devServer以后是否自动打开浏览器
    //inline:true,    代码保存以后是否自动刷新页面
    proxy:{
      '/api':{      /*devServer 会自动对 path 为 /api 开头的 api 做代理转发，而 path 不是 /api 开头的就不会进行处理。
                      例：foo://example.com:8042/over/there?name=ferret#nose  path是从端口号后到？前，因此axios的baseurl设置要注意*/
        target:'http://mall-pre.springboot.cn',     //代理服务器，我们要访问的服务器
        changeOrigin:true,      //将主机头的来源更改为目标url，是否允许跨域
        pathRewrite:{
          '/api':''
        }
      }
    }
  },
  publicPath:'',              //基本目录,设置空或./可被部署在任意位置，默认为/，publicPath 设置的是部署应用包的基本 URL，不是项目打包出来的文件存放的位置
  outputDir:'dist',           //打包输出文件夹的名称
  //assetsDir: ''             设置放置打包静态资源 (js、css、img、fonts) 的文件名称，相对于outputDir
  indexPath:'index2.html',    //设置放置打包html 的文件名称，相对于outputDir
  // lintOnSave:false,
  // filenameHashing:true     生成的静态资源是否在它们的文件名中生成hash，有利于浏览器缓存机制
  productionSourceMap: false,     //是否生成map，有map源码开放，不安全
  chainWebpack:(config)=>{            //删除预加载，真正做到按需加载
    config.plugins.delete('prefetch');
  },

}