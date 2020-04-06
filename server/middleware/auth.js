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
    let baseUrl = /(\/[a-z_]+)$/g.exec(req.baseUrl)[1]
    //匹配角色
    function matchPower(url, userRole,mode) { //user==roles 每个role有manage和children
      return userRole.some(ro => {
        if (ro.manage) { //如果有权限，匹配url
          if(matchUrl(ro.manage, url, mode)) return true
        }
        if (ro.children && ro.children.length) { //如果有权限，匹配url
          if(matchPower(url,ro.children)) return true
        }
        return false
      })
    }
    //匹配url
    function matchUrl(manage, url, mode) { //匹配url
      let isFind = false
      if (manage.children&&manage.children.length) {
        let child = manage.children
        for (let i = 0; i < child.length; i++) {
          if(child[i].children){
            if(matchUrl(child[i],url,mode)){
              isFind = true
              break
            }
          }
          if(child[i].index){
            // console.log(child[i].index);
            if (child[i].index.includes(url) && child[i][mode]) {
              isFind = true
              break
            }
          }
          
        }
      }
      return isFind
    }
    // console.log(/(\/[a-z_]+)$/g.exec(req.baseUrl));
    
    // console.log(matchPower(baseUrl, req.body.user.role));
    let pass=false
    if(req.method=='GET'){
      pass=matchPower(baseUrl, req.body.user.role,'read')
    }else if(req.body.getMenu){
      pass=true
    }else{
      pass=matchPower(baseUrl, req.body.user.role,'write')
    }
    if(!pass){
      assert(null, 302, '您无权操作')
    }
    // res.data= req.user
    // console.dir(JSON.stringify(res.data))

    await next()
  }
}