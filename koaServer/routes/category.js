const router = require('koa-router')()
const categoryInfo = require('./../contorllers/category')

router.prefix('/category')

router.get('/', async (ctx, next) => {
  let result = await categoryInfo.findAll(ctx);
  ctx.body = result;
})

router.get('/:id', async (ctx, next) => {
  let result = await categoryInfo.findById(ctx);
  ctx.body = result;
})

router.post('/', async (ctx, next) => {
  let result = await categoryInfo.add(ctx);
  ctx.body = result;
})

router.put('/', async (ctx, next) => {
  let result = await categoryInfo.update(ctx);
  ctx.body = result;
})

router.delete('/:id', async (ctx, next) => {
  let result = await categoryInfo.del(ctx);
  ctx.body = result;
})

module.exports = router
