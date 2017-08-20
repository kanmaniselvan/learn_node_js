var buff1 = new Buffer(12);
buff1.write('Hello World!');

console.log(buff1, buff1.toString());

var buff2 = new Buffer(12);
buff1.write('Hellew World!');

console.log(buff1.equals(buff2), buff1.compare(buff2))

buff3 = new Buffer(12)

buff1.copy(buff3)
buff3.write('xx', 3, 1)

console.log(buff3.toString(), buff1.toString());

console.log('Sliced:' + buff1.slice(2, 6));

