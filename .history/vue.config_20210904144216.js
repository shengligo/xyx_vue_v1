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
