const express = require('express')

const app = express()

process.env.domain = process.env.NODE_ENV == 'production' ? '5102it.cn' : 'localhost:3000'

app.set('secret', 'fdsffbfs')

app.use(require('cors')())
app.use(express.json())

app.use('/', express.static(__dirname + '/web'))

app.use('/admin', express.static(__dirname + '/admin'))

app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/uploadVideos', express.static(__dirname + '/uploadVideos'))

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3000, () => {
  console.log(`http://${process.env.domain}`)
})