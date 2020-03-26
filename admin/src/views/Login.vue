<template>
  <div>
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login" inline label-position="right" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="model.username" style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input type="password" v-model="model.password" style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="验证码">
          <el-input v-model="checked" clearable style="width:140px"></el-input>
        </el-form-item>

        <ul class="check" @click="getCheck">
          <li>{{check[0]}}</li>
          <li>{{check[1]}}</li>
          <li>{{check[2]}}</li>
          <li>{{check[3]}}</li>
        </ul>

        <el-form-item>
          <el-button type="primary" native-type="submit" style="margin-left:100px">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      check: '',
      checked: '',
      model: {},
    }
  },
  methods: {
    async login () {
      const str = this.checked.trim()
      const str1 = this.check.trim()
      if (str != str1) {
        this.$message({
          type: 'warning',
          message: '验证码错误'
        })
        this.getCheck()
        return
      }
      const res = await this.$http.post('login', this.model)
      localStorage.token = res.data.token
      this.$router.push('/')
      this.$message({
        type: 'success',
        message: '登录成功'
      })
    },
    getCheck () {
      const chars = '0123456789abcdefghijklmnopqrstuvwxyz'
      let char = ''
      for (let i = 0; i < 4; i++) {
        char += chars.charAt(~~(Math.random() * chars.length - 1))
      }
      this.check = char
    }

  },
  mounted () {
    this.getCheck()
  }

}
</script>
>

<style>
.check>li {
  list-style: none;
  float: left;
  margin-left: 8px;
}
.check>li:nth-child(1) {
  animation: check1 2s ease infinite alternate;
  color: rgb(179, 206, 228);
}
.check>li:nth-child(2) {
  animation: check1 2s ease-in infinite alternate-reverse;
  color: rgb(15, 21, 27);
}
.check>li:nth-child(3) {
  animation: check1 2s ease-in-out infinite alternate;
  color: rgb(184, 247, 39);
}
.check>li:nth-child(4) {
  animation: check1 2s ease-out infinite alternate-reverse;
  color: rgb(206, 28, 22);
}
.login-card {
  width: 25rem;
  margin: 5rem auto;
}

.check {
  margin: 0;
  padding: 0;
  display: inline-block;
  user-select: none;
  font-size: 45px;
  text-align: center;
  width: 150px;
  height: 70px;
  background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584807480014&di=31dc4af3bd676dda4521efa7a2df537d&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3D96262c65f7246b607b0eb27cdbf81a35%2F33ac2bc79f3df8dcf92ffda7cc11728b4710285c.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
@keyframes check1 {
  from {
    transform: translate(5px,-8px) rotate(-30deg) ;
    opacity: 0.5;
  }
  to {
    transform: translate(-5px,8px) rotate(30deg);
    opacity: 1;
  }
}
</style>
