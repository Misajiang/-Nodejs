const http = require('http');

const child_process = require('child_process');

const server = http.createServer();

const cpulen = require('os').cpus().length;

server.listen(3000)

let workers = {};

function createProcess(){
    let worker = child_process.fork('./worker.js'); //

    console.log("打印创建之间的",worker.pid);

    worker.send('server',server);

    workers[worker.pid] = worker;
    //捕获异常重启
    worker.on('message',info => {
        console.log("error",info.pid);
        delete workers[worker.pid];
        worker.kill();
        createProcess()
    })

    //结束进程，重启
    worker.on('exit',() => {
        delete workers[worker.pid];
        createProcess()
    })
}

for(let i = 0;i<cpulen;i++){
    createProcess()
}