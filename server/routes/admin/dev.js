module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../../models/AdminUser')
  // require('./plugins/db')(app)
  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')

  const svgCaptcha = require('svg-captcha-color')({
    size: 22, // 字体大小
    width: 70, // 验证码宽度
    height: 25, // 验证码高度
    total: 4, // 验证码长度
    chars: 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', // 验证码字符，由于0O1I易混淆，因此不推荐使用
    background: '#66CCFF00', // 验证码背景颜色
    // expreg: /\.(ttf|woff|otf)$/, // 验证码字体匹配表达式
  })

  const multer = require('multer')
  const upload = multer({
    dest: __dirname + '/../../uploads'
  })
  const uploadVideo = multer({
    dest: __dirname + '/../../uploadVideos'
  })

  const router = express.Router()
  //保存分类
  router.post('/', async (req, res) => {
    if (req.body.getMenu) {
      const token = String(req.headers.authorization || '')
        .split(' ')
        .pop()
      const { id } = jwt.verify(token, req.app.get('secret'))
      // model为用户数据
      const model = await req.Model.findById(id).populate({
        path: 'role',
        populate: [
          'manage',
          {
            path: 'children',
            populate: [
              'manage',
              {
                path: 'children',
                populate: ['manage', 'children']
              }
            ]
          }
        ]
      })
      // arr为用户拥有角色中全部权限的集合，包括重复
      const arr = []

      function get(roles, arr) {
        if (roles && roles.length) {
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].manage) {
              arr.push(roles[i].manage)
            }
            if (roles[i].children && roles[i].children.length) {
              get(roles[i].children, arr)
            }
          }
        }
      }
      get(model.role, arr)
      // console.log(arr)
      // menu为去除重复权限后的，用户真实具有的权限
      const menu = []
      //合并同权限名
      function merge(arr) {
        if (arr && arr.length) {
          arr.reduce((pre, i) => {
            if (i) {
              let p = pre.some(n => {
                if (n && n.name == i.name) return true
                return false
              })
              if (!p) {
                pre.push(i)
              }
            }
            return pre
          }, menu)
        }
      }
      merge(arr)

      //合并重复项中，read和write的值，优先取true
      function mer(a, b) {
        a.write = a.write || b.write
        a.read = a.read || b.read
        if (!a.children || !a.children.length) return
        for (let i in a.children) {
          mer(a.children[i], b.children[i])
        }
      }
      // menus取出所有权限下的菜单权限集合，包括重复-来自不同权限集合可能会有交集权限
      let menus = menu.map(i => {
        return i.children
      })
      let last = []
      menus.forEach(i => {
        if (i && i.length) {
          i.forEach(x => {
            last.push(x)
          })
        }
      })
      // last,最终拥有的全部权限
      let re = last.reduce((pre, i) => {
        if (pre.length) {
          let flag = pre.some(n => {
            if (n && n.name == i.name) {
              mer(n, i)
              return true
            }
            return false
          })
          if (!flag) {
            pre.push(i)
          }
        } else {
          pre.push(i)
        }
        return pre
      }, [])
      // console.log(model);
      res.send(re)
    } else {
      const model = await req.Model.create(req.body)
      // console.dir(req.body)
      res.send(req.body)
    }
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
      queryOptions.populate = [
        'parent',
        {
          path: 'children',
          populate: {
            path: 'children'
          }
        }
      ]
    } else if (req.Model.modelName === 'Role') {
      queryOptions.populate = [
        'manage',
        {
          path: 'children',
          populate: {
            path: 'children',
            populate: {
              path: 'children'
            }
          }
        }
      ]
    } else if (req.Model.modelName === 'AdminUser') {
      queryOptions.populate = 'role'
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

  app.use(
    '/admin/api/rest/:resource',
    authMiddleware(),
    resourceMiddleware(),
    router
  )

  app.use(
    '/admin/api/upload',
    authMiddleware(),
    upload.single('file'),
    async (req, res) => {
      const file = req.file
      file.url = `http://${process.env.domain}/uploads/${file.filename}`
      // console.log(file);
      res.send(file)
    }
  )

  app.use(
    '/admin/api/uploadVideo',
    authMiddleware(),
    uploadVideo.single('file'),
    async (req, res) => {
      const video = req.file
      // video.filename = video.filename + '.' + /\/(.+)/.exec(video.mimetype)[1]
      video.url = `http://${process.env.domain}/uploadVideos/${video.filename}`
      //console.log(video);
      res.send(video)
    }
  )

  app.post('/admin/api/login', async (req, res) => {
    if (req.body.check) {
      res.set('Content-Type', 'image/svg+xml')
      res.send(svgCaptcha())
    } else {
      const { username, password } = req.body
      const user = await AdminUser.findOne({
        username
      }).select('+password')
      assert(user, 422, '用户不存在')

      const isValid = require('bcrypt').compareSync(password, user.password)
      assert(isValid, 422, '密码错误')

      const token = jwt.sign(
        {
          id: user._id
        },
        app.get('secret')
      )
      res.send({
        token
      })
    }
  })

  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}
