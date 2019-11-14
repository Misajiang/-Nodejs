const router = require('koa-router')()

// 在查的时候把分页做了
router.get('/api/userlist', async(ctx, next) => { //查询

    // sql查询
    try {
        let totle = await ctx.mysql.query('select count(*) from ulist')
        console.log(totle)
        let { pageNum = 1, limit = 2 } = ctx.query
        let startIndex = (pageNum - 1) * limit;
        console.log(startIndex)
        let data = await ctx.mysql.query(`select * from ulist limit ${startIndex},${limit}`)

        ctx.body = {
            code: 1,
            data,
            totle: totle.data[0]['count(*)']
        }
    } catch (e) {
        console.log(111)
        ctx.body = {
            code: 0,
            mag: e
        }
    }

})
router.post('/api/add', async(ctx, next) => { //添加

    let { username, password, address, phone } = ctx.request.body
    if (username && password && phone) { //1.容错处理，判断参数有没有：
        let tel = await ctx.mysql.query('select * from ulist where phone=?', [phone])
            // console.log(tel)
        if (tel.data.length) { //根据数据中有没有你输入的手机号，有的话就表示已存在
            ctx.body = {
                code: 0,
                mag: '该昵称已存在'
            }
        } else { //没有的话就创建：
            let timedata = new Date() //更新当前时间
            let data = await ctx.mysql.query('insert into ulist (username,password,address,phone,timedata)values (?,?,?,?,?)', [username, password, address, phone, timedata])

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
router.get('/api/delete', async ctx => { //删除
    let { id } = ctx.query
    console.log(id)
    let ids = await ctx.mysql.query('select * from ulist where id=?', [id])
        // console.log(id)
        //判断id是否存在
    if (id || id === 0) {
        try {
            console.log(id);

            await ctx.mysql.query('delete from ulist where id=?', [id])
            console.log(id);
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
router.post('/api/updata', async ctx => { //改变
    let { id, username, password, address, phone } = ctx.request.body
    if (id && username && password && phone) {
        try {
            let timedata = new Date()
            await ctx.mysql.query('update ulist set username=?,password=?,address=?,phone=?,timedata=? where id=?', [username, password, address, phone, timedata, id])
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
module.exports = router