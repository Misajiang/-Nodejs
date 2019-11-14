const koa = require('koa')
const bodyparser = require('koa-bodyparser')
const router = require('./routers/index')
const query = require('./middleware/query')
const static = require('koa-static')
const path = require('path')


const app = new koa()
    // 1.处理静态文件
app.use(static(path.join(process.cwd(), 'public')))
    // 2.处理post传递的参数
app.use(bodyparser())
app.use(query())
    // 3.配置路由url
app.use(router.routes())
app.use(router.allowedMethods())
    // 错误：出现404  路径输错了





app.listen(process.env.PORT || 3000, () => {
    console.log('成功');
});