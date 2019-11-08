const http = require('http');

const child_process = require('child_process');

const server = http.createServer((req,res) => {
    if(req.url === '/count'){
        
        let childProcess = child_process.fork('./count.js');

        childProcess.on('message',(timer) => {
            res.end(timer)
        })   
        
        childProcess.send('主进程的数据')
    }
})

server.listen(3000)