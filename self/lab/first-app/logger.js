const EventEmitter = require('events');
// const emitter = new EventEmitter();

let url = 'http://mylogger.io/log';

class Logger extends EventEmitter {
    log(message) {
        // send an http request
        console.log(message);
    
        // Raise an event, plus optional meta data
        this.emit('messageLogged', {id: 1, url: 'http://'});
    }
}

// module.exports.log = log; // export whole object

module.exports = Logger; // just export function log

// module.exports.log2 = log2;
// module.exports.endPoint = url;