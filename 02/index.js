const fs = require('fs');

const readInput = (file = 'input') => fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8');

const input = readInput();

const run = (noun, verb) => {
  const ops = input.split(',').map(Number);
  ops[1] = noun;
  ops[2] = verb;
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
  return ops[0];
};
console.log(run(12, 2));

const expect = 19690720;

for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    const result = run(i, j);
    if (result === expect) {
      console.log(i, j, 100 * i + j);
      break;
    }
  }
}
