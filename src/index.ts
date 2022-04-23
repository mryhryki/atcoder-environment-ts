import * as fs from "node:fs";
const input = fs.readFileSync("/dev/stdin", "utf8");

const [firstLine, secondLine, text] = input.split("\n");
const firstNum = parseInt(firstLine, 10);
const [secondNumText, thirdNumText] = secondLine.trim().split(" ");
const secondNum = parseInt(secondNumText, 10);
const thirdNum = parseInt(thirdNumText, 10);

console.log("%d %s", firstNum + secondNum + thirdNum, text.trim());
