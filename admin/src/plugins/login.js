export default function (can,h) {  }{
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
  let firstX, firstY, isDown = false
  ///////////////////////其他ui
  let sub = document.querySelector('form button')
  let login = document.querySelector('.login')
  let check = document.querySelector('.check')
  /////登录按钮
  sub.addEventListener('click', (e) => {
    e.preventDefault()
    login.setAttribute('class', 'login change')
    check.setAttribute('class', 'check showCheck')
    setTimeout(() => {
      login.innerHTML = '登录成功'
      login.setAttribute('class', 'login ')
      check.setAttribute('class', 'check ')
    }, 5000)
  })
  /////////////////////监听html的鼠标移动
  let pointX, pointY, moveX, moveY //生成点的位置
  h.addEventListener('mousemove', (e) => { ///用于控制全局点跟随鼠标方向移动
    clientX = e.clientX ///记录鼠标当前位置
    clientY = e.clientY
    ////触发频率及按下条件
    if (count > 10 && isDown) {
      //向点集合添加点，创建点
      pointX = e.clientX + (Math.random() - 0.5) * 100
      pointY = e.clientY + (Math.random() - 0.5) * 100
      arrPoints.push(createPoint(pointX, pointY))
      const len = arrPoints.length
      if (len > 100) { //最多存在100个点
        for (let i = 0; i < len - 100; i++) {
          setTimeout(() => {
            arrPoints.splice(50, 1) //从70~100+ 作为变动点
          }, Math.random() * 200)
        }
      }
      count = 0
    }
    count++
    if (!firstX&&!firstY) { //第一次才进来
      firstX = e.clientX //鼠标第一次进入窗口的坐标
      firstY = e.clientY
      lastX = e.clientX //第一次==最后一次
      lastY = e.clientY
    } else { //之后
      moveX = (e.clientX - lastX) //当前位置-上一次位置，作为点需要移动的系数
      moveY = (e.clientY - lastY)
      arrPoints.forEach((item) => { //遍历每个点，使每个点随鼠标移动
        item.speedX += (moveX / (800 * (Math.random() / 10 * 9 + 0.1))) //计算速度
        item.speedY += (moveY / (800 * (Math.random() / 10 * 9 + 0.1)))
      })
      lastX = e.clientX
      lastY = e.clientY
    }
  })

  //////////监听画布上的点击
  can.addEventListener('mousedown', (e) => {
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
    const speedX = ((Math.random() - 0.5) * 1 / 5).toFixed(4) * 4 //点的初始速度
    const speedY = ((Math.random() - 0.5) * 1 / 5).toFixed(4) * 4
    if (x1 == undefined) { //随机生成点
      const cw = ~~(can.width * Math.random()) ///随机位置生成点
      const ch = ~~(can.height * Math.random())
      curW = cw + speedX
      curH = ch + speedY
    } else { //给定位置生成点
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
      distanceY: curH,
    }
  }


  //计算点与点距离
  function getDistance(x1, y1, x2, y2) {
    return ~~(Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2)))
  }
  //生成全部连线
  function putLines(arrPoints) {
    const len = arrPoints.length
    for (let i = 0; i < len; i++) { //循环所有点，通过插入算法
      for (let j = len - 1; j >= 0; j--) {
        const p1 = arrPoints[i], //记录2个点
          p2 = arrPoints[j],
          disPoint = getDistance(p1.curW, p1.curH, p2.curW, p2.curH)
        /////判断距离来决定连线       ///且圆属性邻居圆
        if (disPoint > p1.r + p2.r && disPoint < 100 && p1.r - 1 < p2.r < p1.r + 1) {
          ctx.beginPath()
          ctx.moveTo(p1.curW, p1.curH)
          ctx.lineTo(p2.curW, p2.curH)
          ctx.strokeStyle = '#30bbdd'
          ctx.lineWidth = p1.r / disPoint * 10 //线宽
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

      if (item.curW > can.width || item.curH > can.height || item.curW < 0 ||
        item.curH < 0) { //判断点是否出边界
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
    ctx.globalCompositeOperation = "destination-over" //覆盖叠加模式
    ctx.globalAlpha = 0.7 ///全局透明度
    for (let i = 0; i < num; i++) {
      arrPoints.push(createPoint())
    }
  }


  /////////聚光灯///有点low
  function light() {
    let color = [ //4个聚光灯位置和颜色
      [10, 10, 'rgba(0,0,0,30)'],
      [can.width - 10, 10, 'rgba(0,0,0,30)'],
      [10, can.height - 10, 'rgba(0,0,0,30)'],
      [can.width - 10, can.height - 10, 'rgba(0,0,0,30)']
    ]
    for (let i = 0; i < color.length; i++) {
      if (clientX > can.width / 2 - 150 && clientX < can.width / 2 + 150 && clientY > can.height / 2 - 200 &&
        clientY < can.height / 2 + 200) { //判断鼠标是否在登录框区域
        ///////////////
        login.style = 'opacity:1' //显示登录框
        ctx.beginPath()
        ctx.fillStyle = color[i][2] //灯的颜色
        ctx.arc(color[i][0], color[i][1], 10, 0, 2 * Math.PI) //画灯
        ctx.strokeStyle = 'rgb(10,90,dd)' //灯边框线的颜色
        ctx.lineWidth = 10
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        //////变换前保存
        ctx.save()
        ctx.beginPath()
        const grd = ctx.createLinearGradient(color[i][0], color[i][1], clientX, clientY) //渐变
        grd.addColorStop(0, '#fffa') //渐变
        grd.addColorStop(0.95, '#000a')
        grd.addColorStop(1, '#fffa')
        ctx.lineWidth = 15
        ctx.moveTo(color[i][0], color[i][1])
        ctx.lineTo(clientX, clientY)
        ctx.shadowColor = '#30a0ddaa' //阴影颜色
        ctx.shadowBlur = 500
        ctx.strokeStyle = grd
        ctx.fillStyle = grd
        ctx.lineCap = 'round'
        ctx.closePath()
        ctx.stroke()
        ctx.restore()
      } else {
        login.style = 'opacity:0' //不显示登录框
      }
    }
  }

  function render() { ///渲染函数
    ctx.clearRect(0, 0, can.width, can.height) //更新前清屏再绘
    //can.width = h.offsetWidth     //实时监听html的变换，可有可无
    //can.height = h.offsetHeight
    light() //更新聚光灯
    putPoints(arrPoints) //更新点位置
    putLines(arrPoints) //更新线
    window.requestAnimationFrame(render) ///尾递归循环
  }

  //-----------启动-------------//
  putPointsInit(80) //初始化点，生成点
  light() ///生成聚光灯
  window.requestAnimationFrame(render) ///渲染之前调用
}