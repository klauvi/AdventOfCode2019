const fs = require('fs');

const readInput = (file = 'input') => fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8');

const input = readInput();

const width = 25;
const height = 6;

const layers = input.match(/.{1,150}/g);

let fewest = Infinity;
let result = 0;

layers.forEach(layer => {
    const zero = (layer.match(/0/g) || []).length;
    const one = (layer.match(/1/g) || []).length;
    const two = (layer.match(/2/g) || []).length;
    if (zero < fewest) {
        fewest = zero;
        result = one * two;
    }
});
console.log(result);
