const fs = require('fs');
var exec = require('child_process').exec;
const schedule = require('node-schedule');

function createBackup(
    host='localhost',
    port=27017,
    dest=new Date().toDateString().replace(/ /g,'-').toLowerCase()){

    if(!fs.existsSync(dest)){
        fs.mkdirSync(dest,{recursive:true})
    }
    
    const cmd = `mongodump --host ${host} --port ${port} --out ./backup/${dest}`;

    exec(cmd, function (error, stdout, stderr) {
        if(error){
            console.log("error",error)
        }

        if(!error){
            console.log(`Database backup created at ./backup/${dest}`)
        }
    })
}

module.exports = {createBackup}
