module.exports = app => {
  const express = require('express')
  const jwt= require('jsonwebtoken')
  const assert= require('http-assert')
  const AdminUser = require('../../models/AdminUser')

  const authMiddleware=require('../../middleware/auth')
  const resourceMiddleware=require('../../middleware/resource')

  const router = express.Router()
  //保存分类
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
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
  router.get('/',async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find()
      .setOptions(queryOptions)
      .limit(1000)
    res.send(items)
  })
  //获取编辑的分类
  router.get('/:id', async (req, res) => {
    
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  app.use('/admin/api/rest/:resource',authMiddleware(),resourceMiddleware(),router)
  const multer = require('multer')
  const upload = multer({
    dest: __dirname + '/../../uploads'
  })
  app.use('/admin/api/upload',authMiddleware() ,upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)

  })

  app.post('/admin/api/login', async (req, res) => {
    // console.dir(req)
    const {
      username,
      password
    } = req.body

    const user = await AdminUser.findOne({
      username
    }).select('+password')
    assert(user,422,'用户不存在')

    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid,422,'密码错误')

    const token=jwt.sign({id:user._id},app.get('secret'))
    res.send({token})

  })


  app.use(async (err,req,res,next)=>{
    res.status(err.statusCode||500).send({
      message:err.message,
    })
  })
}