const http = require('http')
const serve = http.createServer(() => {

})
setTimeout(() => {
    console.log(process.uptime())
}, 3000)
serve.listen(process.env.PORT || 3000, () => {
    console.log('sucess')
    console.log(process.pid)
})