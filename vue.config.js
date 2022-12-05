const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, //如果为false，就是取消eslint规则的检查
  publicPath: './',
  devServer: {
    proxy: { //配置多个代理
      "/testIp": {
        target: "http://101.201.49.201:3000",//10.85.++222.39
        changeOrigin: true,
        // ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          "^/testIp": "/"
        }
      },
    }
  }

})
