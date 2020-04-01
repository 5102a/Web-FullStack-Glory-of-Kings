module.exports = {

  outputDir: __dirname + '/../server/web',
  publicPath: process.env.NODE_ENV === 'production' ?
    '/' : '/',

  configureWebpack: config => {

    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.plugins[2].options.isProd = true
      return {
        entry: './src/main-prod.js',
        externals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          axios: 'axios',
          'dayjs': 'dayjs',
          'vue-awesome-swiper': 'VueAwesomeSwiper',
          'vue-video-player': 'VideoPlayer'
        },
        resolve: {
          //文件夹别名
          alias: {
            "assets": "@/assets",
            "components": "@/components",
            "views": "@/views",
            "common": "@/common",
            "network": "@/network"
          }
        }
      }
    } else {
      // 为开发环境修改配置...
      config.plugins[2].options.isProd = false
      return {
        entry: './src/main-dev.js',
        resolve: {
          //文件夹别名
          alias: {
            "assets": "@/assets",
            "components": "@/components",
            "views": "@/views",
            "common": "@/common",
            "network": "@/network"
          }
        }
      }
    }
  }

}