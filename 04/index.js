const lower = 134564;
const higher = 585159;

const check = str => {
  let ok = true;
  let double = false;
  str.split('').reduce((prev, current) => {
    if (current < prev) {
      ok = false;
    }
    if (current === prev) {
      double = true;
    }
    return current;
  }, 0);
  return ok && double;
};

let total = 0;
for (let i = lower; i <= higher; i++) {
  if (check(i.toString())) {
    total++;
  }
}
console.log(total);
