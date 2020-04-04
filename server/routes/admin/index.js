module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../../models/AdminUser')

  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')

  const multerCos = require('../../plugins/multerCos')
  const imgUpLoad = multerCos({
    dir: 'uploads',
    flag: 'file',
    onProgress: function (data) {
      // console.log(data);
    },
          mk:function(){}
  })
  const videoUpLoad = multerCos({
    dir: 'uploadVideos',
    flag: 'file',
    onProgress: function (data) {
      // console.log(data)
    },
          mk:function(){}
  })

  const router = express.Router()
  //保存分类
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    // console.dir(req.body)
    res.send(model)
  })
  //编辑分类
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  //删除分类
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  //获取分类列表
  router.get('/', async (req, res) => {
    const queryOptions = {}

    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    } else if (req.Model.modelName === 'Menu') {
      queryOptions.populate = ['parent', {
        path: 'children',
        populate: {
          path: 'children'
        }
      }]
    } else if (req.Model.modelName === 'Role') {
      queryOptions.populate = ['manage', {
        path: 'children',
        populate: ['manage', {
          path: 'children',
          populate: ['manage', {
            path: 'children',
          }]
        }]
      }]
    } else if (req.Model.modelName === 'AdminUser') {
      queryOptions.populate ='role'
    }
    const items = await req.Model.find()
      .setOptions(queryOptions)
      .limit(1000)
    // console.log(items);

    // const p=await req.Model.find().setOptions(queryOptions)
    // console.log(p);

    res.send(items)
  })
  //获取编辑的分类
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  app.use(
    '/admin/api/rest/:resource',
    authMiddleware(),
    resourceMiddleware(),
    router
  )

  app.use(
    '/admin/api/upload',
    authMiddleware(),
    async (req, res) => {
      imgUpLoad(req, res,function (err) {
        const file = req.files[0]
        // console.log(file);
        res.send(file)
      })
    }

  )

  app.use(
    '/admin/api/uploadVideo',
    authMiddleware(),
    async (req, res) => {
      videoUpLoad(req, res, function (err) {
        // console.log(req.files);
        const file = req.files[0]
        res.send(file)
      })
    }

  )

  app.post('/admin/api/login', async (req, res) => {
    // console.dir(req)
    const {
      username,
      password
    } = req.body

    const user = await AdminUser.findOne({
      username
    }).select('+password')
    assert(user, 422, '用户不存在')

    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')

    const token = jwt.sign({
        id: user._id
      },
      app.get('secret')
    )
    const userPower = await AdminUser.findOne({
      username
    }).populate([{
      path: 'role',
      populate: [{path:'children',populate:[{path:'children',populate:['manage','children']},'manage']},'manage']
    }])
   console.log(JSON.stringify(userPower))
    let arr=[]
    function getManage(user,arr){
      if(!user) return
      if((user instanceof Array)&&user.length){
        for (let n = 0; n < user.length; n++) {
          getManage(user[n],arr)
        }
      }else{
        if(user.manage){
          user.manage.forEach(i=>{
            arr.push(i)
          })
        }
        if(user.children&&user.children.length){
          getManage(user.children,arr)
        }
        return 
      }
    }
    getManage(userPower.role,arr)
    let manage=arr.reduce((pre,item)=>{
      let p=pre.every(i=>{
        if(i&&i.name==item.name) return false
        return true
      })
      if(p){
        pre.push(item)
      }
      return pre
    },[])
    
    const role=JSON.stringify(userPower.role)
    // console.log(role);
    manage=JSON.stringify(manage)
    res.send({
      token,
      manage,
      role
    })
  })

  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}