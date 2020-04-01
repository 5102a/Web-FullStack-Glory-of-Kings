<template>
  <div class="home">
    <img alt="Vue logo" src="https://multer-1258613188.cos.ap-shanghai.myqcloud.com/uploads/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
