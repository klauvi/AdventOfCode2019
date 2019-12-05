const fs = require('fs');

const readInput = (file = 'input') => fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8');

const input = readInput();

const ops = input.split(',').map(Number);
let i = 0;
const id = 5;

const val = mode => (mode === 0 ? ops[ops[i++]] : ops[i++]);

const computer = {
  // add
  1: mode => {
    const [a, b, dest] = [val(mode[0]), val(mode[1]), ops[i++]];
    ops[dest] = a + b;
  },
  // multiply
  2: mode => {
    const [a, b, dest] = [val(mode[0]), val(mode[1]), ops[i++]];
    ops[dest] = a * b;
  },
  // input
  3: () => (ops[ops[i++]] = id),
  // output
  4: mode => console.log(val(mode[0])),
  // jump-if-true
  5: mode => (i = val(mode[0]) !== 0 ? val(mode[1]) : ++i),
  // jump-if-false
  6: mode => (i = val(mode[0]) === 0 ? val(mode[1]) : ++i),
  // less than
  7: mode => {
    const [a, b, dest] = [val(mode[0]), val(mode[1]), ops[i++]];
    ops[dest] = a < b ? 1 : 0;
  },
  // equals
  8: mode => {
    const [a, b, dest] = [val(mode[0]), val(mode[1]), ops[i++]];
    ops[dest] = a === b ? 1 : 0;
  }
};

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
  computer[instruction](mode);
}
