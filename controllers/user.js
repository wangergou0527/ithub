const db = require('./db_mysql')
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
  db.query('select * from `users` where `email`=?', req.body.email, (err, results) => {
    if (err) return res.send('服务器内部错误')
    console.log(results)
    if (results.length > 0) return res.json({
      code: 401,
      msg: '邮箱已存在'
    })
    db.query('select * from `users` where `nickname`=?', req.body.nickname, (err, results) => {
      if (results.length > 0) return res.json({
        code: 402,
        msg: '昵称已存在'
      })
      req.body.createdAt = new Date()
      req.body.password = md5(req.body.password)
      db.query('insert into `users` set ?', req.body, (err, results) => {
        if (err) return res.send('服务器内部错误')
        if (results.affectedRows === 1) {
          return res.json({
            code: 200,
            msg: '注册成功'
          }) 
        } else {
          return res.json({
            code: 500,
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