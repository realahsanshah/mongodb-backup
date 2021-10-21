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

Creating Backup

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

