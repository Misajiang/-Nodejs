const dbs = require('./db')
module.exports = (sql, params = []) => {
    return new Promise((resolve, reject) => {
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