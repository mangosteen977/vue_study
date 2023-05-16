const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer : {
    proxy : {
      '/api' : {
        target : 'http://39.123.45.45:3002',
        changeOrigin : true,
        rewrite : (path) => path.replace(/^\/api/, ''),
        secure : false,
        ws : true
      }
    }
  }
})
