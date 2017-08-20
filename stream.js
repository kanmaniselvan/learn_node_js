var fs = require('fs');
var zlib = require('zlib');
var dir = 'tmp';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

var data = '';

var readStream = fs.createReadStream('input.txt');
var writerStream = fs.createWriteStream('tmp/output.txt');

readStream.on('data', function(chunk){
    data += chunk
});

readStream.on('end', function(chunk){
    console.log("file data", data, '--- writing');

    // write after reading
    writerStream.write(data, 'utf8')
    writerStream.end();
    
    writerStream.on('finish', function(){
        console.log("Write completed.");    
    });    
});

readStream.on('error', function(error){
    console.log(error.stac);
});

writerStream.on('error', function(error){
    console.log(error.stac);    
});

// //==== Piping === //
var secondWriterStream = fs.createWriteStream('tmp/output2.txt');
readStream.pipe(secondWriterStream);

// == Piping in chains //
var secondReaderStream;
compressedZipWriteStream = fs.createWriteStream('tmp/output2.txt.gz')
secondWriterStream.on('finish', function(){
    console.log('Creating GZip');
    secondReaderStream = fs.createReadStream('tmp/output2.txt')
    secondReaderStream.pipe(zlib.createGzip()).pipe(compressedZipWriteStream);
})

compressedZipWriteStream.on('finish', function(){
    console.log('Unzipping GZip');
    compressedFileReadStream = fs.createReadStream('tmp/output2.txt.gz')
    compressedFileReadStream.pipe(zlib.createGunzip()).pipe(fs.createWriteStream('tmp/output3.txt'))
});

console.log('Done!!');