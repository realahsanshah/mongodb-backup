const fs = require("fs");
var exec = require("child_process").exec;
var CronJob = require("cron").CronJob;
require("dotenv").config();

function createBackup(
  host = "localhost",
  port = 27017,
  dest = (dest = new Date().toISOString())
) {
  if (!fs.existsSync(`./backup/${dest}`)) {
    fs.mkdirSync(`./backup/${dest}`, { recursive: true });
  }

  const cmd = `mongodump --host ${host} --port ${port} --out ./backup/${dest}`;

  exec(cmd, { maxBuffer: 1024 * 100 * 1024 }, function (error, stdout, stderr) {
    if (error) {
      console.log("error", error);
    }

    if (!error) {
      console.log(`Database backup created at ./backup/${dest}`);
    }
  });
}

function restoreBackup(src, host = "localhost", port = 27017) {
  if (!src) {
    console.log("Please provide a valid dump destination");
    return;
  }

  if (!fs.existsSync(src)) {
    console.log(`Cannot find directory ${src}`);
    return;
  }
  const cmd = `mongorestore  --host ${host} --port ${port} --dir ${src}`;

  exec(cmd, { maxBuffer: 1024 * 100 * 1024 }, function (error) {
    if (error) {
      console.log("error", error);
    }

    if (!error) {
      console.log(`Database backup restored from ${src}`);
    }
  });
}

function scheduleBackup(
  cronScheduler = "0 1 * * *",
  host = "localhost",
  port = 27017,
  dest = ""
) {
  const job = new CronJob(cronScheduler, function () {
    dest = new Date().toISOString();
    createBackup(host, port, dest);
  });

  job.start();
  console.log(`Backup scheduled with cron pattern: ${cronScheduler}`);
}

dest = new Date().toISOString();
const host = process.env.HOST;
const port = process.env.PORT;
console.log(`Starting backup service with host: ${host}, port: ${port}`);
createBackup(host, port, dest);

// scheduleBackup("0 0 1 * * *", host, port, dest);

// schedule backup on 01:50 PM (UTC)
scheduleBackup("0 50 1 * * *", host, port, dest);

process.stdin.resume();

process.on('SIGINT', () => {
  console.log('Backup service shutting down...');
  process.exit(0);
});