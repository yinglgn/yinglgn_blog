const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session')
const passport = require(__dirname + '/config/passport_config')

const index = require('./routes/index')
const users = require('./routes/users')
const articles = require('./routes/articles')
const category = require('./routes/category')
const tag = require('./routes/tag')

// error handler
onerror(app)

// middlewares
app.use(bodyparser())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 启用认证路由
app.proxy = true

//session
app.keys = ['some secret hurr'];   /*cookie的签名*/
const CONFIG = {
    key: 'yinglgn', /** 默认 */
    maxAge: 3600000,  /*  cookie的过期时间        【需要修改】  */
    overwrite: true, /** (boolean) can overwrite or not (default true)    没有效果，默认 */
    httpOnly: true, /**  true表示只有服务器端可以获取cookie */
    signed: true, /** 默认 签名 */
    rolling: true, /** 在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false） 【需要修改】 */
    renew: false, /** (boolean) renew session when session is nearly expired      【需要修改】*/
};
app.use(session(CONFIG, app))
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(articles.routes(), articles.allowedMethods())
app.use(category.routes(), category.allowedMethods())
app.use(tag.routes(), tag.allowedMethods())

//登录拦截器
app.use( async(ctx, next) => {
  console.info(ctx.isAuthenticated())
  if (ctx.isAuthenticated()) {
    next();
  }else {
    var arr = ctx.request.url.split('/');// 解析用户请求的路径
    for (var i = 0, length = arr.length; i < length; i++) {// 去除 GET 请求路径上携带的参数
      arr[i] = arr[i].split('?')[0];
    }
    if (arr.length > 1 && (arr[1] == 'user' || arr[1] == 'register' || arr[1] == 'login' || arr[1] == 'logout')) {// 判断请求路径是否为根、登录、注册、登出，如果是不做拦截
      next();
    } else {  // 登录拦截
      ctx.throw(401)
    }
  }
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
