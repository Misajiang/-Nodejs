const koa = require('koa')
const bodyparser = require('koa-bodyparser')
const router = require('koa-router')()
const query = require('./db/query')
const static = require('koa-static')
const path = require('path')

const app = new koa()
    // 1.处理静态文件
app.use(static(path.join(process.cwd(), 'public')))
    // 2.处理post传递的参数
app.use(bodyparser())
    // 3.配置路由url
app.use(router.routes())
app.use(router.allowedMethods())
    // 错误：出现404  路径输错了
router.get('/api/userlist', async(ctx, next) => { //查询
    // sql查询
    let data = await query('select * from ulist')
    ctx.body = data

    // await new Promise((resolve, reject) => {
    //     dbs.query('select * from ulist', ((error, data) => {
    //         if (error) {
    //             reject(error)
    //             console.log(error)
    //         } else {
    //             resolve(data)
    //             ctx.body = data
    //         }
    //     }))
    // })
})
router.post('/api/add', async(ctx, next) => { //添加
        // You have an error in your SQL syntax; sql语法错误
        let { username, password, address, phone } = ctx.request.body
        if (username && password && phone) { //1.容错处理，判断参数有没有：
            let tel = await query('select * from ulist where phone=?', [phone])
                // console.log(tel)
            if (tel.data.length) { //根据数据中有没有你输入的手机号，有的话就表示已存在
                ctx.body = {
                    code: 0,
                    mag: '该昵称已存在'
                }
            } else { //没有的话就创建：
                let timedata = new Date() //更新当前时间
                let data = await query('insert into ulist (username,password,address,phone,timedata)values (?,?,?,?,?)', [username, password, address, phone, timedata])

                if (data.mag === 'error') {
                    ctx.body = {
                        code: 0,
                        mag: error
                    }
                } else {
                    ctx.body = {
                        code: 2,
                        mag: '添加成功'
                    }
                }


            }

        } else { //没有符合的话，就响应
            ctx.body = {
                code: 1,
                mag: '信息不完整'
            }
        }

    })
    //删除  sql语句:delete <表名> where 字段名=？

router.get('/api/delete', async ctx => {
        let { id } = ctx.query
        let ids = await query('select * from ulist where id=?', [id])
            // console.log(id)
            //判断id是否存在
        if (id || id === 0) {
            try {
                await query('delete from ulist where id=?', [id])
                ctx.body = {
                    code: 1,
                    mag: '删除成功'
                }
            } catch (e) {
                ctx.body = {
                    code: 0,
                    mag: e.error
                }
            }
        } else {
            ctx.body = {
                code: 2,
                mag: '参数不完整'
            }
        }
    })
    //改  updata <表名> set 字段名1=？,字段名2... where id=?,[所有字段名]
router.post('/api/updata', async ctx => {
    let { id, username, password, address, phone } = ctx.request.body
    if (id && username && password && phone) {
        try {
            let timedata = new Date()
            await query('update ulist set username=?,password=?,address=?,phone=?,timedata=? where id=?', [username, password, address, phone, timedata, id])
            ctx.body = {
                code: 1,
                mag: '修改成功'
            }

        } catch (e) {
            ctx.body = {
                code: 2,
                mag: e.error
            }
        }
    } else {
        ctx.body = {
            code: 0,
            mag: '参数缺失'
        }
    }

})

app.listen(process.env.PORT || 3000, () => {
    console.log('成功');
});