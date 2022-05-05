import * as fs from "fs";
const input = fs.readFileSync("/dev/stdin", "utf8");

const [N, A, B] = input
  .trim()
  .split(" ")
  .map((line) => parseInt(line, 10));

const total = Array.from({ length: N })
  .map((_, i) => i + 1)
  .filter((n) => {
    const sum = n
      .toString(10)
      .split("")
      .reduce((t, n) => t + parseInt(n, 10), 0);
    return A <= sum && sum <= B;
  })
  .reduce((total, n) => total + n, 0);

console.log(total);
