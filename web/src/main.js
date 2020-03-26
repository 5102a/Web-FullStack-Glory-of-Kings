import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './assets/scss/style.scss'
import './assets/font-awesome/css/font-awesome.min.css'

import router from './router'

import ListCard from './components/ListCard.vue'
Vue.component('m-list-card',ListCard)
import Card from './components/Card.vue'
Vue.component('m-card',Card)

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

Vue.use(VueAwesomeSwiper)
Vue.use(VideoPlayer)


import axios from 'axios'
Vue.prototype.$http=axios.create({
  baseURL:process.env.VUE_APP_API_URL||'/web/api'
  // baseURL:'http://localhost:3000/web/api'
})





new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
