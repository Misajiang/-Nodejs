const koa = require('koa')
const app = new koa()
const static = require('koa-static')
const path = require('path')
const bodyparser = require('koa-bodyparser')
const router = require('koa-router')()
const query = require('./db/query')
app.use(static(path.join(process.cwd(), 'public')))
app.use(bodyparser())
app.use(router.routes())
app.use(router.allowedMethods())
router.get('/api/list', async(ctx) => {
    let data = await query('select * from bannerlist')
    ctx.body = data;
})
app.listen(process.env.PORT || 3000, () => {
    console.log('启动成功！');
})