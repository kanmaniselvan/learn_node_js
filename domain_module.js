var eventEmitter = require('events');
var domain = require('domain');

var emitter1 = new eventEmitter.EventEmitter();

domain1 = domain.create();
domain1.on('error', function(error){
    console.log('Error caught - handled by domain: '+error.message);
})

// binding the event to the domain
domain1.add(emitter1);

emitter1.on('error',function(err){
    console.log("listener handled this error ("+err.message+")");
 });

 emitter1.emit('error', new Error('To be handled by listener')); 

 // remove all the listeners of emitter1
 emitter1.removeAllListeners('error');
 
 // Now domain should handle it.
 emitter1.emit('error', new Error('To be handled by domain1')); 

 var domain2 = domain.create();
 
 domain2.on('error', function(err){
    console.log("domain2 handled this error ("+err.message+")");
 });

 domain1.remove(emitter1);

 domain2.run(function(){
     var emitter2 = new eventEmitter.EventEmitter();
     emitter2.emit('error', new Error('domain2 will handle this as i\m implicit'))
 })
 
 // No domain or event listener to handle it.
 emitter1.emit('error', new Error('out of my control dude')); 