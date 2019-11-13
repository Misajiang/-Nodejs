//链接数据库里的数据

const mysql = require('mysql')
const connects = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    port: '3306',
    password: 'root',
    database: 'userlist'
})
connects.connect((err) => {
    if (err) {
        console.log('链接失败')
    } else {
        console.log('连接成功')
    }
})
module.exports = connects