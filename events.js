var events = require("events");

var eventEmitter = new events.EventEmitter();

var connectionEvent1 = function connection1(){
    console.log('Connection event 1');

    eventEmitter.emit('data_recieved')
}

var connectionEvent2 = function connection2(){
    console.log('Connection event 2');

    eventEmitter.emit('data_recieved')
}

eventEmitter.on('connection', connectionEvent1);
eventEmitter.addListener('connection', connectionEvent2);

var event_count = events.EventEmitter.listenerCount(eventEmitter, 'connection');
console.log('Event count = ', event_count);

eventEmitter.once('data_recieved', function(){
    console.log('Data received only once');
})

eventEmitter.emit('connection');

eventEmitter.removeListener('connection', connectionEvent1);
var event_count = events.EventEmitter.listenerCount(eventEmitter, 'connection');
console.log('Event count = ', event_count);

eventEmitter.emit('connection');

console.log('The end');