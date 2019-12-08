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

const canvas = [];

for (let i = 0; i < width * height; i++) {
    layers.some(layer => {
        if (layer[i] !== '2') {
            canvas[i] = layer[i];
            return true;
        }
        return false;
    })
}

let w = 0;
for (let h = 0; h <= height; h++) {
    console.log(canvas.slice(w, w + width).join('').replace(/0/g, ' ').replace(/1/g, '#'));
    w+=width;
}
