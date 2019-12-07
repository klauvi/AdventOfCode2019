const fs = require('fs');

const readInput = (file = 'input') => fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8');

const input = readInput();

let ops = input.split(',').map(Number);
let i = 0;

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
  3: id => (ops[ops[i++]] = id),
  // output
  4: mode => val(mode[0]),
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

const thrusters = {
  A: {
    phase: 4,
    input: 0,
    output: 0
  },
  B: {
    phase: 3,
    input: 0,
    output: 0
  },
  C: {
    phase: 2,
    input: 0,
    output: 0
  },
  D: {
    phase: 1,
    input: 0,
    output: 0
  },
  E: {
    phase: 0,
    input: 0,
    output: 0
  }
}

const run = (phase, power) => {
  let first = true;
  i = 0;
  ops = input.split(',').map(Number);
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
    if (instruction === 3) {
      computer[instruction](first ? phase : power);
      first = false;
    } else if (instruction === 4) {
      return computer[instruction](mode);
    } else {
      computer[instruction](mode);
    }
  }
}

let max = 0;

const combinations = readInput('combinations').split('\n');
combinations.forEach(c => {
  const pow = run(+c[0], run(+c[1], run(+c[2], run(+c[3], run(+c[4], 0)))));
  max = pow > max ? pow : max;
})

console.log(max);
