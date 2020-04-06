module.exports = {
  productionSourceMap:false,
  outputDir: __dirname + '/../server/web',
  publicPath: process.env.NODE_ENV === 'production' ?
    '/' : '/',

  configureWebpack: config => {

    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      return {
        entry: './src/main-prod.js',
        externals: {
          'vue-router': 'VueRouter',
          vue: 'Vue',
          axios: 'axios',
          'dayjs': 'dayjs',
          'vue-awesome-swiper': 'VueAwesomeSwiper',
          'vue-video-player': 'VueVideoPlayer'
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