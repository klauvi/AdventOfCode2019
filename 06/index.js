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
const parentArray = child => {
  let parent = map[child].parent;
  const arr = [];
  while (parent !== 'COM') {
    arr.push(parent);
    parent = map[parent].parent;
  }
  return arr;
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

const you = parentArray('YOU');
const san = parentArray('SAN');

let common = 'COM';
you.some(orb => {
  if (san.indexOf(orb) === -1) {
    return false;
  }
  common = orb;
  return true;
});

console.log(san.indexOf(common) + you.indexOf(common));
