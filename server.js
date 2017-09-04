var net = require('net');

// Server will be created as soon as the client is connected
var server = net.createServer(function(connection){
    console.log('Client created!')

    connection.on('end', function(){
        console.log('Client Connection end')
    });

    connection.write('Hello world\n');
    connection.pipe(connection);
})

server.listen(8080, function(){
    console.log('server is listening');
}); 