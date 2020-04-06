const mongoose = require('mongoose')


const schema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  children: {
    type: Array,
    default: []
  },
  nodes: {
    type: Array,
    default: []
  }
})


module.exports = mongoose.model('Power', schema)