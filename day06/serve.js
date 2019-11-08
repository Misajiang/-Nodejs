const http = require('http')
const fs = require('fs')
const serve = http.createServer((req, res) => {
    if (req.url === '/json') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ code: 1, title: 'aaaa' }))
    } else if (req.url === '/txt') {
        res.writeHead(200, { 'Content-type': 'text/plain' })
        res.end('text')
    } else if (req.url === '/jpg') {
        let imgurl = fs.readFileSync('./1.jpg')
        res.writeHead(200, { 'Content-Type': 'image/jpeg' })
        res.end(imgurl);
    }
})
serve.listen(process.env.PORT || 3000, () => {
    console.log('3000')
})