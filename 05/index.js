const fs = require('fs');

const readInput = (file = 'input') => fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8');

const input = readInput();

const ops = input.split(',').map(Number);
let i = 0;
const start = 1;

while (true) {
  const opCode = ops[i++];
  if (opCode === 99) {
    break;
  }
  const instruction = opCode % 100;
  const mode = [
    Math.floor(opCode / 100) % 10,
    Math.floor(opCode / 1000) % 10,
    Math.floor(opCode / 10000) % 10
  ];
  switch (instruction) {
    case 3:
      ops[ops[i++]] = start;
      break;
    case 4:
      console.log(ops[ops[i++]]);
      break;
    default:
      const a = mode[0] === 0 ? ops[ops[i++]] : ops[i++];
      const b = mode[1] === 0 ? ops[ops[i++]] : ops[i++];
      ops[ops[i++]] = instruction === 1 ? a + b : a * b;
  }
}
