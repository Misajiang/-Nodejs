const dbs = require('../db/db')
let query = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        // console.log(sql)
        dbs.query(sql, params, ((err, data) => {
            if (err) {
                reject({
                    mag: 'error',
                    err
                })
            } else {
                resolve({
                    mag: 'success',
                    data
                })
            }
        }))
    })
}
module.exports = () => {
    return async(ctx, next) => {
        ctx.mysql = {}
        ctx.mysql.query = query
        await next()
    }
}