import * as fs from "fs";
const input = fs.readFileSync("/dev/stdin", "utf8");

const [c500, c100, c50, total] = input.split("\n").map((line) => parseInt(line, 10));
if (total % 100 === 50 && c50 === 0) {
  console.log(0);
  process.exit(0);
}

const c500max = Math.min(Math.floor(total / 500), c500);
const c100max = Math.min(Math.floor(total / 100), c100);
const c50max = Math.min(Math.floor(total / 50), c50);

let count = 0;
Array.from({ length: c500max + 1 }).forEach((_, i) => {
  Array.from({ length: c100max + 1 }).forEach((_, j) => {
    Array.from({ length: c50max + 1 }).forEach((_, k) => {
      if (500 * i + 100 * j + 50 * k === total) {
        count++;
      }
    });
  });
});

console.log(count);
