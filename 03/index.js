const fs = require('fs');

const readInput = (file = 'input') => fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8');

const input = readInput();

let shortest = Infinity;
let stepcount = Infinity;

const [line1, line2] = input.split('\n');

const grid = {};
const steps = {};
const adders = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, 1],
  D: [0, -1]
};

let x = 0;
let y = 0;
let step = 0;

line1.split(',').forEach(instr => {
  const dir = instr.slice(0, 1);
  const length = +instr.slice(1);
  [...Array(length).keys()].forEach(_ => {
    x += adders[dir][0];
    y += adders[dir][1];
    step++;
    const key = `${x};${y}`;
    grid[key] = true;
    steps[key] = steps[key] ? steps[key] : step;
  });
});

x = 0;
y = 0;
step = 0;
line2.split(',').forEach(instr => {
  const dir = instr.slice(0, 1);
  const length = +instr.slice(1);
  [...Array(length).keys()].forEach(_ => {
    x += adders[dir][0];
    y += adders[dir][1];
    step++;
    const key = `${x};${y}`;
    if (grid[key]) {
      if (stepcount > step + steps[key]) {
        stepcount = step + steps[key];
      }
      const current = Math.abs(x) + Math.abs(y);
      if (current < shortest) {
        shortest = current;
      }
    }
  });
});

console.log(shortest);
console.log(stepcount);
