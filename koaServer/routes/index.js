const router = require('koa-router')()
const usersInfo = require('./../contorllers/usersInfo')
const passport = require('./../config/passport_config')
const retCode = require('./../utils/retcode')

router.post('/login', function (ctx, next) {
  return passport.authenticate('local', function (err, user, info, status) {
      if (user) {
        ctx.body = {
          code: retCode.Success
        }
        return ctx.login(user)
      } else {
        ctx.body = {
          code: retCode.UsernameOrPasswordError,
          message: '用户名或者密码错误，请重新输入！'
        }
      }
  })(ctx, next)
})

/**
 * 认证登出
 */
router.get('/logout', function (ctx, next) {
  ctx.logout()
  ctx.body = {
    code: retCode.Success
  }
})

// 以下为自定义需要身份认证的路由
router.get('/test', function (ctx, next) {
    ctx.body = '认证通过'
})


router.get('/register', async (ctx, next) => {
  let result = await usersInfo.register(ctx);
  ctx.body = result;
})

module.exports = router
