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
  read:{
    type:Boolean,
    default:false
  },
  write:{
    type:Boolean,
    default:false
  },
  children: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Menu',
    default: null
  }]
})

module.exports = mongoose.model('Menu', schema)