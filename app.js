const express = require('express')
const router = require('./routes/router')
const app = express()

const POST = 3000
app.listen(POST, () => console.log('success'))

app.use(router)