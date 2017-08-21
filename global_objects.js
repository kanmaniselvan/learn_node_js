console.log("Dir name", __dirname)

console.log("File Name", __filename)

function printRun(){
    console.log('Hello there');
}

var timeout = setTimeout(printRun, 1000);

clearTimeout(timeout);

var interval = setInterval(printRun, 1000);

// clearInterval(interval);


