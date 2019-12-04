const lower = 134564;
const higher = 585159;

const check = str => {
  let ok = true;
  let double = false;
  let onlydouble = false;
  str.split('').reduce((prev, current) => {
    if (current < prev) {
      ok = false;
    }
    if (current === prev) {
      double = true;
    }
    return current;
  }, 0);
  if (/00/.test(str) && !/000/.test(str)) onlydouble = true;
  if (/11/.test(str) && !/111/.test(str)) onlydouble = true;
  if (/22/.test(str) && !/222/.test(str)) onlydouble = true;
  if (/33/.test(str) && !/333/.test(str)) onlydouble = true;
  if (/44/.test(str) && !/444/.test(str)) onlydouble = true;
  if (/55/.test(str) && !/555/.test(str)) onlydouble = true;
  if (/66/.test(str) && !/666/.test(str)) onlydouble = true;
  if (/77/.test(str) && !/777/.test(str)) onlydouble = true;
  if (/88/.test(str) && !/888/.test(str)) onlydouble = true;
  if (/99/.test(str) && !/999/.test(str)) onlydouble = true;
  return ok && double && onlydouble;
};

let total = 0;
for (let i = lower; i <= higher; i++) {
  if (check(i.toString())) {
    total++;
  }
}
console.log(total);
