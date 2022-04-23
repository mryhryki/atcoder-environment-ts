import * as fs from "fs";
const input = fs.readFileSync("/dev/stdin", "utf8");

const [first, second] = input.split(" ");
const result = parseInt(first, 10) * parseInt(second, 10);

console.log(result % 2 === 0 ? "Even" : "Odd");
