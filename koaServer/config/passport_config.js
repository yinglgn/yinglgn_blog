const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const usersModel = require("./../db/base").usersModel

// 用户名密码验证策略
passport.use(new LocalStrategy(
  async function(username, password, done) {
    let user = await usersModel.findOne({
      where: {
        username: username
      },
      attributes: ['id', 'username', 'password']
    });
    if (!user) {
      return done(null, false, { message: '未知用户' });
    }
    if (user.password != password) {
      return done(null, false, { message: '密码错误' });
    }
    return done(null, user);
  }
));


// serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中
passport.serializeUser(function(user, done) {
  done(null, user)
})


// deserializeUser 在每次请求的时候将从 session 中读取用户对象
passport.deserializeUser(function(user, done) {
  return done(null, user)
})

module.exports = passport
