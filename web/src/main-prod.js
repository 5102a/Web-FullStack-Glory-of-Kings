import Vue from 'vue'
import App from './App.vue'
import http from 'network/http'
import router from './router'

import 'assets/scss/style.scss'

Vue.config.productionTip = false
Vue.prototype.$http=http

//自定义组件注册
import ListCard from 'components/ListCard.vue'
import Card from 'components/Card.vue'
Vue.component('m-list-card',ListCard)
Vue.component('m-card',Card)

//第三方组件注册
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueVideoPlayer from 'vue-video-player'

Vue.use(VueAwesomeSwiper)
Vue.use(VueVideoPlayer)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
