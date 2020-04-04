<template>
  <html style="width:100vw;height:100vh;">
    <canvas id="canvas"></canvas>

    <!-- <div class="mask">
      搞我
    </div> -->
    <div class="checking">
      登录验证中
      <img
        src="https://multer-1258613188.cos.ap-shanghai.myqcloud.com/uploads/1.png"
        alt=""
      />
      <img
        src="https://multer-1258613188.cos.ap-shanghai.myqcloud.com/uploads/2.png"
        alt=""
      />
      <img
        src="https://multer-1258613188.cos.ap-shanghai.myqcloud.com/uploads/3.png"
        alt=""
      />
    </div>

    <div class="login">
      <form action="">
        <ul class="login-check">
          <li>登录</li>
          <li>
            <label class="iconfont icon-wo" for="na"></label
            ><input id="na" v-model="model.username" />
          </li>
          <li>
            <label class="iconfont icon-suo" for="pass"></label
            ><input type="password" v-model="model.password" id="pass" />
          </li>
          <li>
            <label class="iconfont icon-yuechi" for="ch"></label
            ><input v-model="checked" id="ch" />
            <span @click="getCheck">{{ check }}</span>
          </li>

          <li>
            <button type="submit">
              NEXT DOOR
            </button>
          </li>
        </ul>
      </form>
    </div>
    <!-- <el-card header="请先登录" class="login-card">
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
    </el-card> -->
  </html>
</template>

<script>
export default {
  data() {
    return {
      check: '',
      checked: '',
      model: {}
    }
  },
  methods: {
    async login() {
      // console.log('ok');
      const res = await this.$http.post('login', this.model)
      sessionStorage.token = res.data.token
      sessionStorage.manage = res.data.manage
      sessionStorage.role = res.data.role
      // console.log(res.data);
      
      return true
    },
    getCheck() {
      const chars =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      let char = ''
      for (let i = 0; i < 4; i++) {
        char += chars.charAt(~~(Math.random() * chars.length - 1))
      }
      this.check = char
    },
    bgd() {
      ///////////canvas参数
      let can = document.querySelector('#canvas')
      let h = document.querySelector('html')
      can.width = h.offsetWidth
      can.height = h.offsetHeight
      //创建画布
      let ctx = can.getContext('2d')
      let lastX = 0,
        lastY = 0,
        clientX = 0,
        clientY = 0,
        count = 0
      let firstX,
        firstY,
        isDown = false
      ///////////////////////其他ui
      let sub = document.querySelector('form button')
      let login = document.querySelector('.login')
      let checking = document.querySelector('.checking')
      let inputs = document.querySelectorAll('input')
      /////聚焦变色
      inputs.forEach(item => {
        // console.dir(item);
        item.addEventListener('focus', () => {
          item.style.background = '#0af8'
          item.style.color = '#fff'
          item.parentElement.style.color = '#fff'
        })
        item.addEventListener('blur', () => {
          item.style.background = '#0af0'
          item.style.color = '#0de'
          item.parentElement.style.color = '#0de'
        })
      })
      /////登录按钮
      sub.addEventListener('click', e => {
        e.preventDefault()
        login.setAttribute('class', 'login change')
        checking.setAttribute('class', 'checking showCheck')
        setTimeout(() => {
          const str = this.checked.trim().toLowerCase()
          const str1 = this.check.trim().toLowerCase()
          if (str != str1) {
            setTimeout(() => {
              this.$message({
                type: 'warning',
                message: '验证码错误'
              })
              this.getCheck()
            }, 1500)
          } else {
            setTimeout(() => {
              this.login().then(
                () => {
                  login.innerHTML = '登录成功'
                  this.$message({
                    type: 'success',
                    message: `欢迎 ${this.model.username} 回来！`
                  })
                  setTimeout(() => {
                    this.$router.push('/')
                    h.style.background = '#fff'
                  }, 500)
                },
                // () => this.getCheck()
              )
            }, 1500)
          }
          login.setAttribute('class', 'login ')
          checking.setAttribute('class', 'checking ')
        }, 3000)
      })

      /////////////////////监听html的鼠标移动
      let pointX, pointY, moveX, moveY //生成点的位置
      h.addEventListener('mousemove', e => {
        // console.log(e.clientX);
        ///用于控制全局点跟随鼠标方向移动
        clientX = e.clientX ///记录鼠标当前位置
        clientY = e.clientY
        ////触发频率及按下条件
        if (count > 5 && isDown) {
          //向点集合添加点，创建点
          pointX = e.clientX + (Math.random() - 0.5) * 100
          pointY = e.clientY + (Math.random() - 0.5) * 100
          arrPoints.push(createPoint(pointX, pointY))
          const len = arrPoints.length
          if (len > 100) {
            //最多存在100个点
            for (let i = 0; i < len - 100; i++) {
              setTimeout(() => {
                arrPoints.splice(50, 1) //从70~100+ 作为变动点
              }, Math.random() * 200)
            }
          }
          count = 0
        }
        count++
        if (!firstX && !firstY) {
          //第一次才进来
          firstX = e.clientX //鼠标第一次进入窗口的坐标
          firstY = e.clientY
          lastX = e.clientX //第一次==最后一次
          lastY = e.clientY
        } else {
          //之后
          moveX = e.clientX - lastX //当前位置-上一次位置，作为点需要移动的系数
          moveY = e.clientY - lastY
          arrPoints.forEach(item => {
            //遍历每个点，使每个点随鼠标移动
            item.speedX += moveX / (800 * ((Math.random() / 10) * 9 + 0.1)) //计算速度
            item.speedY += moveY / (800 * ((Math.random() / 10) * 9 + 0.1))
          })
          lastX = e.clientX
          lastY = e.clientY
        }
      })

      //////////监听画布上的点击
      can.addEventListener('mousedown', e => {
        isDown = true
        const downX = e.clientX + (Math.random() - 0.5) * 80
        const downY = e.clientY + (Math.random() - 0.5) * 80
        arrPoints.push(createPoint(downX, downY)) //没移动时按下也产生一个点
      })
      //////////监听在画布上的鼠标松开
      can.addEventListener('mouseup', () => {
        isDown = false
      })
      //记录所有点数据
      let arrPoints = []
      //获取随机颜色  ///太花了不要
      // function getColor(a = [255, 255], r = [0, 255], g = [0, 255], b = [0, 255]) {
      //   r = Math.random() * (r[1] - r[0]) + r[0]
      //   g = Math.random() * (g[1] - g[0]) + g[0]
      //   b = Math.random() * (b[1] - b[0]) + b[0]
      //   a = Math.random() * (a[1] - a[0]) + a[0]
      //   return `rgba(${~~r},${~~g},${~~b},${~~a})`
      // }
      ///////创建一个点
      function createPoint(x1, y1) {
        let curW, curH
        const color = '#30bbdd'
        const r = ~~(5 + (Math.random() - 0.5) * 2) //圆半径
        const speedX = (((Math.random() - 0.5) * 1) / 5).toFixed(4) * 4 //点的初始速度
        const speedY = (((Math.random() - 0.5) * 1) / 5).toFixed(4) * 4
        if (x1 == undefined) {
          //随机生成点
          const cw = ~~(can.width * Math.random()) ///随机位置生成点
          const ch = ~~(can.height * Math.random())
          curW = cw + speedX
          curH = ch + speedY
        } else {
          //给定位置生成点
          curW = x1 + speedX
          curH = y1 + speedY
        }
        //开始画图
        ctx.beginPath()
        ctx.arc(curW, curH, r, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.closePath()
        ctx.fill()
        return {
          curW,
          curH,
          color,
          r,
          speedX,
          speedY,
          distanceX: curW, //用于记录移动
          distanceY: curH
        }
      }

      //计算点与点距离
      function getDistance(x1, y1, x2, y2) {
        return ~~Math.sqrt(
          Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2)
        )
      }
      //生成全部连线
      function putLines(arrPoints) {
        const len = arrPoints.length
        for (let i = 0; i < len; i++) {
          //循环所有点，通过插入算法
          for (let j = len - 1; j >= 0; j--) {
            const p1 = arrPoints[i], //记录2个点
              p2 = arrPoints[j],
              disPoint = getDistance(p1.curW, p1.curH, p2.curW, p2.curH)
            /////判断距离来决定连线       ///且圆属性邻居圆
            if (
              disPoint > p1.r + p2.r &&
              disPoint < 100 &&
              p1.r - 1 < p2.r < p1.r + 1
            ) {
              ctx.beginPath()
              ctx.moveTo(p1.curW, p1.curH)
              ctx.lineTo(p2.curW, p2.curH)
              ctx.strokeStyle = '#30bbdd'
              ctx.lineWidth = (p1.r / disPoint) * 10 //线宽
              ctx.closePath()
              ctx.stroke()
            }
          }
        }
      }

      //检测全部点，更新
      function putPoints(arrPoints) {
        arrPoints.forEach((item, i) => {
          //判断当前点的速度是否到达下限，重新计算速度
          if (item.speedX > 0.01 && item.speedY > 0.01) {
            item.speedX -= item.speedX / 100 //减速效果
            item.speedY -= item.speedY / 100
          }
          item.curW += item.speedX
          item.curH += item.speedY

          if (
            item.curW > can.width ||
            item.curH > can.height ||
            item.curW < 0 ||
            item.curH < 0
          ) {
            //判断点是否出边界
            arrPoints.splice(i, 1, createPoint()) //删除点,再重新随机生成
          }
          ctx.beginPath()
          ctx.arc(item.curW, item.curH, item.r, 0, 2 * Math.PI)
          ctx.fillStyle = '#10a0ee'
          ctx.closePath()
          ctx.fill()
        })
      }

      /////////初始化全部点，生成给定数量点
      function putPointsInit(num) {
        ctx.globalCompositeOperation = 'destination-over' //覆盖叠加模式
        ctx.globalAlpha = 0.7 ///全局透明度
        for (let i = 0; i < num; i++) {
          arrPoints.push(createPoint())
        }
      }

      function show() {
        if (
          clientX > can.width / 2 - 150 &&
          clientX < can.width / 2 + 150 &&
          clientY > can.height / 2 - 200 &&
          clientY < can.height / 2 + 200
        ) {
          login.style = 'opacity:1' //显示登录框
        } else {
          login.style = 'opacity:1' //显示登录框
        }
      }

      function render() {
        ///渲染函数
        ctx.clearRect(0, 0, can.width, can.height) //更新前清屏再绘
        can.width = h.offsetWidth //实时监听html的变换，可有可无
        can.height = h.offsetHeight
        show()
        putPoints(arrPoints) //更新点位置
        putLines(arrPoints) //更新线
        window.requestAnimationFrame(render) ///尾递归循环
      }

      //-----------启动-------------//
      putPointsInit(80) //初始化点，生成点
      window.requestAnimationFrame(render) ///渲染之前调用
    }
  },
  mounted() {
    this.getCheck()
    this.bgd()
  }
}
</script>
>

<style scoped>


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li {
  list-style: none;
}

html {
  background: linear-gradient(45deg, #08a, #04a);
  overflow: hidden;
}

.login {
  position: absolute;
  opacity: 0;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -200px;
  padding-top: 10px;
  width: 300px;
  height: 400px;
  background: linear-gradient(
    45deg,
    #0ac,
    #06c 95%,
    rgba(255, 255, 255, 0) 5px
  );
  transition-duration: 1s;
  transition-delay: 300ms;
  border-radius: 3px;
  box-shadow: -15px 15px 10px 1px #333;
  text-align: center;
  color: rgba(200, 200, 200, 0.8);
}

form {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 280px;
  height: 380px;
  justify-content: center;
  flex-wrap: wrap;
  z-index: 1;
}

form li:nth-child(1) {
  padding: 20px;
  user-select: none;
  color: #fff;
}

form label {
  position: relative;
  top: 3px;
  width: 25px;
  transition-duration: 1s;
}

form li:not(:nth-child(1)) {
  position: relative;
  padding: 15px;
  z-index: 2;
  width: 250px;
}

form input {
  justify-self: center;
  background-color: rgba(150, 150, 150, 0);
  border: 0;
  margin-left: 5px;
  width: 150px;
  height: 25px;
  flex: 1;
  font-size: 16px;
  transition-duration: 1s;
}

#ch {
  width: 80px;
}
#ch + span {
  display: inline-block;
  width: 70px;
  font-weight: 500;
  user-select: none;
  cursor: pointer;
}

form button {
  user-select: none;
  outline: none;
  cursor: pointer;
  margin-top: 20px;
  width: 120px;
  height: 30px;
  border-radius: 20px;
  border: 2px solid #cef;
  color: #fff;
  font-weight: 700;
  transition-duration: 500ms;
  background: linear-gradient(0deg, #0af, #0af);
}

form button:hover {
  transform: scale(1.1, 1.1);
}

form button:active {
  transition-duration: 100ms;
  transform: scale(0.9, 0.9);
}


.change {
  transform: translateX(-300px) scale(0.4);
}

.checking {
  position: absolute;
  opacity: 0;
  transform: scale(0);
  transition-duration: 500ms;
  transition-delay: 500ms;
  color: rgba(221, 192, 192, 0.849);
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -200px;
  padding-top: 10px;
  width: 300px;
  height: 400px;
  text-align: center;
  animation: check 2s infinite backwards;
  box-shadow: 0px 0px 20px 5px #0cf;
  background: linear-gradient(45deg, #08c, #05d);
}

.checking img:nth-child(1) {
  position: absolute;
  top: 20px;
  left: 10px;
  width: 280px;
  margin-top: 50px;
}

.checking img:nth-child(2) {
  position: absolute;
  top: 79px;
  left: 90px;
  width: 100px;
  animation: check1 1s infinite alternate;
}

.checking img:nth-child(3) {
  position: absolute;
  top: 105px;
  left: 115px;
  width: 50px;
  animation: check2 1s infinite alternate;
}

.showCheck {
  transform: scale(1);
  opacity: 1;
}

.hidden {
  display: none;
}

.check {
  display: inline-block;
  background-color: rgb(94, 87, 87);
  border: 0;
  margin-left: 5px;
  width: 150px;
  height: 25px;
  flex: 1;
  box-shadow: 0px 0px 1px 1px rgb(130, 130, 130) inset;
  color: rgba(221, 207, 207, 0.849);
}

#canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
@keyframes check1 {
  from {
    transform: rotateZ(0deg);
  }

  to {
    transform: rotateZ(720deg);
  }
}

@keyframes check2 {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(45px);
  }
}

@keyframes show {
  from {
    opacity: 0;
    transform: scale(0, 0) rotate(720deg);
  }
  to {
    opacity: 1;
    transform: scale(1, 1) rotate(0deg);
  }
}
</style>
