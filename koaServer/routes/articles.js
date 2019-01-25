const router = require('koa-router')()
const articlesInfo = require('./../contorllers/articles')

router.prefix('/articles')

router.get('/', async (ctx, next) => {
  let result = await articlesInfo.findAll(ctx);
  ctx.body = result;
})

router.get('/:id', async (ctx, next) => {
  let result = await articlesInfo.findById(ctx);
  ctx.body = result;
})

router.post('/', async (ctx, next) => {
  let result = await articlesInfo.add(ctx);
  ctx.body = result;
})

router.put('/', async (ctx, next) => {
  let result = await articlesInfo.update(ctx);
  ctx.body = result;
})

router.delete('/:id', async (ctx, next) => {
  let result = await articlesInfo.del(ctx);
  ctx.body = result;
})

module.exports = router
