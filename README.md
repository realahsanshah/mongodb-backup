# Mongodb Backup

## What can it do ?
A package to backup or restore your MongoDB data to your system. You can also set a schedule to automatically create backup of MongoDB database.

## Getting Started

Using npm:

```bash
$ npm install mongodb-backup-dump
```

Using bower:

```bash
$ bower install mongodb-backup-dump
```

Using yarn:

```bash
$ yarn add mongodb-backup-dump
```

## Working Example

### Creating Backup

```js 
const mongodbBackup = require('mongodb-backup-dump');

/*
  Backup of your local MongoDB data will be created in ./backup/${currentDate}  
*/
mongodbBackup.createBackup();


const host = '192.168.1.08';
const port = 27017;
const backupDest = 'myBackup'
/* All params are optional having default values as following:
    host = 127.0.0.1 i.e localhost
    port = 27017
    backupDest = currentDate
*/
mongodbBackup.createBackup(host, port, backupDest);


```


### Restoring Backup

const mongodbBackup = require('mongodb-backup-dump');

/*
  Backup of your local MongoDB data will be created in ./backup/${currentDate}  
*/
mongodbBackup.restoreBackup('./myBackup');


const host = '192.168.1.08';
const port = 27017;
/* Host and port params are optional having default values as following:
    host = 127.0.0.1 i.e localhost
    port = 27017
*/
mongodbBackup.restoreBackup('./myBackup',host, port);


```

### Schedule Backup

const mongodbBackup = require('mongodb-backup-dump');

/*
  Backup of your local MongoDB data will be created in ./backup/${currentDate}  
*/
mongodbBackup.scheduleBackup('* * 1 * * *');


const cronScheduler = '* * 1 * * *';
const host = '192.168.1.08';
const port = 27017;
const backupDest = 'myBackup';

/* All params are optional having default values as following:
    cronScheduler = * * 1 * * * // will run on 1 AM every day
    host = 127.0.0.1 i.e localhost
    port = 27017
    backupDest = //scheduling date
*/
mongodbBackup.scheduleBackup(cronScheduler,host, port, backupDest);
```

### Cron-style Scheduling

The cron format consists of:
```
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59)
```

Examples with the cron format:




