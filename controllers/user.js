const userModel = require('../models/user')
const md5 = require('blueimp-md5')


exports.showSignin = (req, res) => {
  res.render('signin.html')
}
exports.handleSignin = (req, res) => {
  res.send('handleSignin')
}
exports.showSignup = (req, res) => {
  res.render('signup.html')
}
exports.handleSignup = (req, res) => {
  userModel.getByEmail(req.body.email, (err, user) => {
    if (err) {
      return res.json({
        code: 500,
        msg: '服务器内部错误'
      })
    }
    if (user) {
      return res.json({
        code: 401,
        msg: '邮箱已存在'
      })
    }
    userModel.getByNickname(req.body.nickname, (err, user) => {
      if (err) {
        return res.json({
          code: 500,
          msg: '服务器内部错误'
        })
      }
      if (user) {
        return res.json({
          code: 402,
          msg: '昵称已存在'
        })
      }
      req.body.createdAt = new Date();
      req.body.password = md5(req.body.password);
      userModel.createUser(req.body, (err, isOK) => {
        if (isOK) {
          return res.json({
            code: 200,
            msg: '注册成功'
          })
          // console.log(isOK);
        } else {
          res.json({
            code: 403,
            msg: '注册失败'
          })
        }
      })
    })
  })
}
exports.handleSignout = (req, res) => {
  res.send('handleSignout')
}