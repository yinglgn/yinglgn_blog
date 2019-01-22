const router = require('koa-router')()
const usersInfo = require('./../contorllers/usersInfo')

router.prefix('/users')

router.get('/getInfo', async (ctx, next) => {
  let result = await usersInfo.findUser(ctx);
  ctx.body = result;
})

router.get('/:userId', async (ctx, next) => {
  let result = await usersInfo.findUserById(ctx);
  ctx.body = result;
})

module.exports = router
