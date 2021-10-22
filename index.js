const fs = require('fs');
var exec = require('child_process').exec;
var CronJob = require('cron').CronJob;


function createBackup(
    host='localhost',
    port=27017,
    dest=dest = new Date().toISOString()
    ){

    if(!fs.existsSync(`./backup/${dest}`)){
        fs.mkdirSync(`./backup/${dest}`,{recursive:true})
    }
    
    const cmd = `mongodump --host ${host} --port ${port} --out ./backup/${dest}`;

    exec(cmd,{maxBuffer: 1024 * 100 * 1024} , function (error, stdout, stderr) {
        if(error){
            console.log("error",error)
        }

        if(!error){
            console.log(`Database backup created at ./backup/${dest}`)
        }
    })
}

function restoreBackup(
    src,
    host='localhost',port=27017){

    if (!src) {
        console.log('Please provide a valid dump destination')
    }

    if(!fs.existsSync(src)){
        console.log(`Cannot find directory ${src}`);
    }
    const cmd = `mongorestore  --host ${host} --port ${port} --dir ${src}`;

    exec(cmd,{maxBuffer: 1024 * 100 * 1024} ,function (error) {
        if(error){
            console.log("error",error)
        }

        if(!error){
            console.log(`Database backup restored from src`)
        }
    })

}

function scheduleBackup(
    cronScheduler = '* * 1 * * *',
    host = 'localhost',
    port = 27017,
    dest = ''
) {
    new CronJob(cronScheduler,function() {
        dest = new Date().toISOString();
        createBackup(host,port,dest)
      })
}

module.exports = {
    createBackup,
    restoreBackup,
    scheduleBackup,
}
