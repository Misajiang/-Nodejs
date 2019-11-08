#! /usr/bin/env node

const child_process = require('child_process')
const fs = require('fs')
const path = require('path')
let wather = fs.watch('./serve.js')

let childProcess = createProcess()

function createProcess() {
    let fileName = process.argv[2] ? path.join(__dirname, process.argv[2]) : ''
    let child = child_process.spawn('node', [fileName]) //创建子进程
    if (fs.existsSync(fileName)) {
        child.stdout.on('data', data => {
            console.log(data)
        })
        child.stderr.on('data', data => {
            console.log(data)
        })
        return child
    } else {
        console.log('文件名错误')
    }

}
wather.on('change', () => {
    console.log('serve文件改变了')
        // 杀死子进程
    childProcess.kill();
    childProcess = createProcess();
    // 创建一个新的子进程

})