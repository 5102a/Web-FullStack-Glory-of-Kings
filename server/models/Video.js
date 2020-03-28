const mongoose = require('mongoose')


const schema = new mongoose.Schema({
  title: {
    type: String
  },
  img: {
    type: String
  },
  watch: {
    type: String
  },
  // url:{
  //   type:String
  // },
  src:{
    type:String
  },
  categories: [{
    type: mongoose.SchemaTypes.ObjectId,ref:'Category'
  }],

},{
  timestamps:true
})



module.exports = mongoose.model('Video', schema)