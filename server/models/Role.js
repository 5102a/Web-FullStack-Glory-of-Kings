const mongoose = require('mongoose')


const schema = new mongoose.Schema({
  name: {
    type: String,
    default:''
  },
  children:[{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Role',
    default:null
  }],
  power:{
    type:Number,
    default:1
  },
  id:{
    type:Number,
    default:0
  },
  manage:{//直接权限
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Power',
    default:null
  }
})

module.exports = mongoose.model('Role', schema)