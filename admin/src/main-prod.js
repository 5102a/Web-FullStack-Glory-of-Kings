import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from 'network/http'

import 'assets/css/style.css'


Vue.prototype.$http=http
Vue.config.productionTip = false


Vue.mixin({
  computed:{
    uploadUrl(){
      return this.$http.defaults.baseURL+'/upload'
    },
    uploadVideoUrl(){
      return this.$http.defaults.baseURL+'/uploadVideo'
    }
  },
  methods:{
    getAuthHeaders(){
      return {
        Authorization: `Bearer ${sessionStorage.token}`,
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
