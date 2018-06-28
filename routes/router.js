const express = require('express')
const index = require('../controllers/index')
const user = require('../controllers/user')
const router = express.Router()

module.exports = router
// 配置路由
// 首页
router.get('/', index.showIndex)

// 用户
router.get('/signin', user.showSignin)
      .post('/signin', user.handleSignin)
      .get('/signup', user.showSignup)
      .post('/signup', user.handleSignup)
      .get('/signout', user.handleSignout)