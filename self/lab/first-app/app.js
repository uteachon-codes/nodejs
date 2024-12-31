const log = require('./logger');
const path = require('path'); //built-in path module
const os = require('os'); //built-in
const fs = require('fs'); //built-in
// console.log(logger);

// logger.log('message1');
log('message1');
log(path.parse(__filename));

const totalmem = os.totalmem();
const freemem = os.freemem();

// log(`Total memory: ${totalmem}`); //log with placeholders, no need to concat
// log(`Total memory: ${freemem}`);

// const files = fs.readdirSync('./'); // sync call
// log(files);

fs.readdir('./', function name(err, files) { //async call, last arg will be call back function implmn.
    if (err) 
        log(`Error:: ${err}`);
    else
        log(`files:: ${files}`);
});

// console.log(module);