const fs = require('fs');

const readInput = (file = 'input') => fs.readFileSync(`${file}.txt`, 'utf-8');

const values = readInput()

const getFuelReq = mass => Math.floor(mass / 3) - 2;

const part1 = values.split('\n').reduce((acc, value) => acc += getFuelReq(value), 0);

console.log(part1);


const part2 = values.split('\n').reduce((acc, value) => {
    let fuel = getFuelReq(value);
    acc += fuel;
    while ((fuel = getFuelReq(fuel)) > 0) {
        acc += fuel;
    }
    return acc;
}, 0);

console.log(part2);