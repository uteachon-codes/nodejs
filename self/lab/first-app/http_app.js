const EventEmitter = require('events');
// const emitter = new EventEmitter();

// Register a listener
// emitter.on('messageLogged', (arg) => {
//     console.log('Listener Called', arg);
// });

const Logger = require('./logger');
const logger =  new Logger();
logger.on('messageLogged', (args) => {
    console.log('Logger called', args);
})

logger.log('message')

// Raise an event, plus optional meta data
// emitter.emit('messageLogged', {id: 1, url: 'http://'});

// event arguments

