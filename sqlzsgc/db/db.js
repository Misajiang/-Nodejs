const mysql = require('mysql')
const connects = mysql.createConnection({
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'blist'
})
connects.connect(err => {
    if (err) {
        console.log('连接失败')
    } else {
        console.log('连接成功')
    }
})
module.exports = connects