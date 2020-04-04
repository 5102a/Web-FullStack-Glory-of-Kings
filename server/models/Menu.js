const mongoose = require('mongoose')


const schema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  level: {
    type: Number, //1,2,3 菜单等级1最高
    default: 1
  },
  index: {
    type: String,
    default: ''
  },

  // parent: { //父级id
  //   type: mongoose.SchemaTypes.ObjectId,
  //   ref: 'Menu',
  //   default:null
  // },
  children: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Menu',
    default: null
  }]
})

//当前约束的虚拟字段
// schema.virtual('children', {
//   localField: '_id',    //当前字段（id）
//   foreignField: 'parent',  //匹配连接的表的字段（children）
//   justOne: false,  //匹配多个
//   ref: 'Menu'  //连接的表
// })


module.exports = mongoose.model('Menu', schema)