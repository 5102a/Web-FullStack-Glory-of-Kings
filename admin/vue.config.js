module.exports = {

  outputDir: __dirname + '/../server/admin',
  publicPath: process.env.NODE_ENV === 'production' ?
    '/admin' : '/',

  configureWebpack: config => {

    
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.plugins[2].options.isProd=true
      return {
        entry: './src/main-prod.js',
        externals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          axios: 'axios',
          'vue2-editor':'VueEditor'
        },
        resolve: {
          //文件夹别名
          alias: {
            "assets": "@/assets",
            "components": "@/components",
            "plugins": "@/plugins",
            "views": "@/views",
            "common": "@/common",
            "network": "@/network"
          }
        }
      }
    } else {
      // 为开发环境修改配置...
      config.plugins[2].options.isProd=false
      return {
        entry: './src/main-dev.js',
        resolve: {
          //文件夹别名
          alias: {
            "assets": "@/assets",
            "components": "@/components",
            "plugins": "@/plugins",
            "views": "@/views",
            "common": "@/common",
            "network": "@/network"
          }
        }
      }
    }
  }

}

// module.exports = {
//   //输出目录
//   outputDir: __dirname + '/../server/admin',
//   //文件公共路径
//   publicPath: process.env.NODE_ENV === 'production' ?
//     '/admin' : '/',
//   //入口文件
//   entry: process.env.NODE_ENV === 'production' ?
//     './main-prod.js' : './main-dev.js',
//   configureWebpack: {
//     resolve: {
//       //文件夹别名
//       alias: {
//         "assets": "@/assets",
//         "components": "@/components",
//         "plugins": "@/plugins",
//         "views": "@/views",
//         "common": "@/common",
//         "network": "@/network",
//       }
//     }
//   }
// }