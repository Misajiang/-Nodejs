##sql语句##
1.增（写接口用post）：
    insert into <> (字段名1，字段2) 
    values(？,？)//values 有几个字段写几个
    添加/注册{//逻辑
        1.容错处理
            通过：2.查找此人是否存在 是的话：前端响应：此人已存在
                                 否的话  就添加
            未通过：前端响应，参数有误
    }

2.删除(get接口)
sql语句:delete <表名> where 字段名=？
获取id
let {id} =ctx.query;
 1)容错处理
 if(id||id==0){

 }
 3.修改(post接口,传id)
 sql ：updata <表名> set 字段名1=？,字段名2... where id=?,[所有字段名]
4.查


sql:select <字段名> * from <表名> where 字段名=？
5.模糊搜索
1）获取key值关键字
3）如果没传全部查询
如果传了按字段查询
sql:select *  from <表名> where 字段 like '%${key}%' %任意字符
6.分页  pagenum 页码   limit 每页的条数
sql:select * from <表名> limit 起始下标。每页条数
select count(*) from <表名>  查询总条数
默认数据   let {pagenum=1，limit=2}=ctx.query
let startIndex=(pagenum-1)*limit  //起始下标


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
