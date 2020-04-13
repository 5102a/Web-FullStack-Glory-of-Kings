const express = require('express')
const compression = require('compression')
const app = express()


app.set('secret', 'fdsffbfs')

app.use(require('cors')())
app.use(express.json())
app.use(compression())
if (process.env.NODE_ENV == 'production') {
  process.env.domain = '5102it.cn'
  require('./routes/admin/index')(app)
} else {
  process.env.domain = 'localhost:3000'
  require('./routes/admin/dev')(app)
}
// console.log(process.env.NODE_ENV == "production",process.env.NODE_ENV)

require('./plugins/db')(app)
require('./routes/web')(app)
app.use('/', express.static(__dirname + '/web'))

app.use('/admin', express.static(__dirname + '/admin'))

app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/uploadVideos', express.static(__dirname + '/uploadVideos'))


app.listen(3000, () => {
  console.log(`http://${process.env.domain}`)
})