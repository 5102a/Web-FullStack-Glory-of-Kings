module.exports = option => {
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../models/AdminUser')

  return async (req, res, next) => {
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请先登录')
    const {
      id
    } = jwt.verify(token, req.app.get('secret'))
    assert(id, 401, '请先登录')

    response.setHeader("X-Frame-Options","SAMEORIGIN")

    req.body.user = await await AdminUser.findById(id).populate({
      path: 'role',
      populate: ['manage', {
        path: 'children',
        populate: ['manage', {
          path: 'children',
          populate: ['manage', 'children']
        }]
      }]
    })
    // console.log(req.body.user.role[0]);
    // console.log(req.baseUrl);

    let baseUrl = /(\/[a-zA-Z_]+)$/g.exec(req.baseUrl)[1]

    let roles = req.body.user.role

    function manage(roles, url, mode) {
      if (roles && roles.length) {
        for (let i = 0; i < roles.length; i++) {
          //每个角色
          let role = roles[i]
          if (role.manage && role.manage.children && role.manage.children.length) { //有权限集合
            //遍历权限集合查看是否有权限
            if (matchPower(role.manage.children, url, mode)) return true
          } else if (role.children && role.children.length) {
            if (manage(role.children, url, mode)) return true
          }
        }
      }
      return false
    }

    function matchPower(child, url, mode) {
      for (let i = 0; i < child.length; i++) {
        if (child[i].index.includes(url) && child[i][mode]) {
          return true
        }
        if (child[i].children && child[i].children.length) {
          if (matchPower(child[i].children, url, mode)) return true
        }
      }
      return false
    }
    // console.log(baseUrl, req.baseUrl);

    // console.log(manage(roles, baseUrl, 'write'))

    // console.log(/(\/[a-z_]+)$/g.exec(req.baseUrl));

    // console.log(matchPower(baseUrl, req.body.user.role));

    let pass = false
    if (req.method == 'GET') {
      pass = manage(roles, baseUrl, 'read')

    } else {
      if (req.method == 'POST' && req.baseUrl == '/admin/api/rest/admin_users' && req.body.getMenu) {
        pass = true
      } else {
        pass = manage(roles, baseUrl, 'write')
      }
    }
    if (!pass) {
      assert(null, 405, '您无权操作')
    }
    // res.data= req.user
    // console.dir(JSON.stringify(res.data))

    await next()
  }
}