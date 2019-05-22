'use strict';

const fs = require('fs');

let args = process.argv;

if(args.length < 2){
  console.error('Not enough args');
  return;
}

let sourceFile = args[2];

fs.readFile(`${sourceFile}`, (err, data) => {
  if (err) throw err;
  let randomVal = Math.random();
  console.log(data.toString());

  fs.writeFile('./files/test.txt', randomVal, err => {
    if (err) throw err;
    fs.readFile('./files/test.txt', (err, data) => {
      if (err) throw err;
      console.log(data.toString());
    });
  });
});
