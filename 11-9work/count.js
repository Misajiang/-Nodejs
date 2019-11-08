let startTime = new Date().getTime();
let sum = 0;
for(let i = 0;i<1456789056;i++){
    sum+=i;
}
let endTime = new Date().getTime();

let timer = endTime - startTime + '';

process.send(timer)

process.on('message',(msg) =>{
    console.log(msg)
})