const express = require('express')
const router = require('./routes/router')
const art = require('express-art-template')
const bodyParser = require('body-parser')
const app = express()

app.use('/public', express.static('./public'))
app.use('/node_modules', express.static('./node_modules'))
app.engine('html', art)
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

const POST = 3000
app.listen(POST, () => console.log('success'))

app.use(router)