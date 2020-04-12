module.exports = (app) => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://moba:10086@127.0.0.1:27017/node-vue-moba', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
  })

  require('require-all')(__dirname + '/../models')
}
