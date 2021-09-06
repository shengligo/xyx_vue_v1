module.exports = {

  publicPath: './', // 基本路径
  configureWebpack: (config) => {

    if (process.env.NODE_ENV === 'production') {// 为生产环境修改配置...
      config.mode = 'production';
      config["performance"] = {//打包文件大小配置
        "maxEntrypointSize": 10000000,
        "maxAssetSize": 30000000
      }
    }
  },
  devServer: {
    proxy:{
      '/api':{
        target: 'http://10.1.2.85:8091/',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }



}
  // devServer: {
  //   proxy: {
  //     //   '/api': { //指定 路径 要 跨域请求地址
  //     //   // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
  //     //   // 将/api开头的url转发到target上。
  //     //   target: 'http://10.1.2.85:8091/',//跨域请求地址
  //     //   changeOrigin: true, //虚拟的站点需要更管origin
  //     //   ws: true, // 代理websockets
  //     //   secure: true, // 如果是https接口，需要配置这个参数
  //     //   pathRewrite: {
  //     //   // 顾名思义，将/api重写为 / 此时url变为 http://192.168.101.110:8888/ 而不是 http://192.168.101.110:8888/api
  //     //   '^/api': ''
  //     //   }
  //     // }
  //     '/api':{
  //         ws:false ,
  //         target:'http://10.1.2.85:8091',
  //         changeOrigin:true,
  //         pathRewrite:{
  //           '^/api': ''
  //         }
  //     }
  //   }
  // }

  // proxyTable: {
  //   // '/api/saas-organization/': {
  //   //   target: ALY,
  //   //   changeOrigin: true // 跨域和突破网站对爬虫的禁止，一般建议配置
  //   //   // pathRewrite: { '^/api/saas-organization/': '/saas-organization/' } // 路径重写
  //   // },
  //   '/api': {
  //     target: TEST,
  //     changeOrigin: true,
  //     pathRewrite: { '^/api': '' }
  //   }
  // }



// module.exports = {
//   serve: {

//     // Paths
//     assetsSubDirectory: 'static',
//     assetsPublicPath: '/',
//     proxyTable: {
//       '/api':{
//         target:'http://localhost:8091', //后期可以改
//         changeOrigin:true,
//         pathRewrite:{
//           '^/api': ''
//         }
//       }
//     }, //配置跨域支持


