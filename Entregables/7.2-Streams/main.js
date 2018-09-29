/*  Universidad Cenfotec
    Maestria en Ciberseguridad
    Creado por: izamora@ucenfotec.ac.cr

    Ejemplo 8.2: Pipe Streams
*/

/// PIPING
/*var fs = require("fs");

// Create a readable stream
var readerStream = fs.createReadStream('a-wing.txt');

// Create a writable stream
var writerStream = fs.createWriteStream('j-type-327.txt');

// Se lee input.txt y se agrega la data a output.txt
readerStream.pipe(writerStream);*/

// Salvar el pipe TODO.
// Ejericio: trate de salvar el texto en un nuevo archivo



var concat = require('concat-files');

concat([
  'a-wing.txt',
  'j-type-327.txt'
], 'test.txt', function(err) {
  if (err) throw err
  console.log('done');
});


// fin de codigo

console.log("Program Ended");
