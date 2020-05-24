const mongoose = require('mongoose')


const schema = new mongoose.Schema({

  username: {
    type: String
  },
  password: {
    type: String,
    select: false,
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
  },
  description: {
    type: String,
    default: ''
  },
  role: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Role',
    default: null
  }]
})



module.exports = mongoose.model('AdminUser', schema)