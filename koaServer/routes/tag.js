const router = require('koa-router')()
const tagInfo = require('./../contorllers/tag')

router.prefix('/tag')

router.get('/', async (ctx, next) => {
  let result = await tagInfo.findAll(ctx);
  ctx.body = result;
})

router.get('/:id', async (ctx, next) => {
  let result = await tagInfo.findById(ctx);
  ctx.body = result;
})

router.post('/', async (ctx, next) => {
  let result = await tagInfo.add(ctx);
  ctx.body = result;
})

router.put('/', async (ctx, next) => {
  let result = await tagInfo.update(ctx);
  ctx.body = result;
})

router.delete('/:id', async (ctx, next) => {
  let result = await tagInfo.del(ctx);
  ctx.body = result;
})

module.exports = router
