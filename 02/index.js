const fs = require('fs');

const readInput = (file = 'input') => fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8');

const input = readInput();

const ops = input.split(',').map(Number);

let i = 0;

while (true) {
  const op = ops[i++];
  if (op === 99) {
    break;
  }
  const pos1 = ops[i++];
  const pos2 = ops[i++];
  const res = ops[i++];
  ops[res] = op === 1 ? (ops[res] = ops[pos1] + ops[pos2]) : ops[pos1] * ops[pos2];
}

console.log(ops[0]);
