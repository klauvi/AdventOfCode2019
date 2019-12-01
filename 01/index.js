const fs = require('fs');

const readInput = (file = 'input') => fs.readFileSync(`${file}.txt`, 'utf-8');

const values = readInput()

const getFuelReq = mass => Math.floor(mass / 3) - 2;

const part1 = values.split('\n').reduce((acc, value) => acc += getFuelReq(value), 0);

console.log(part1);