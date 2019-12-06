const fs = require('fs');

const readInput = (file = 'input') => fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8');

const input = readInput();

const lines = input.split('\n');

const map = {};
const orbs = new Set();

const countParents = child => {
  let parent = map[child].parent;
  let count = 1;
  while (parent !== 'COM') {
    parent = map[parent].parent;
    count++;
  }
  return count;
};

lines.forEach(line => {
  const [a, b] = line.split(')');
  if (!map[a]) {
    map[a] = { children: [b], parent: 'COM' };
  } else {
    map[a].children.push(b);
  }
  if (!map[b]) {
    map[b] = { children: [], parent: a };
  } else {
    map[b].parent = a;
  }
  orbs.add(b);
});

let total = 0;
orbs.forEach(orb => (total += countParents(orb)));
console.log(total);
