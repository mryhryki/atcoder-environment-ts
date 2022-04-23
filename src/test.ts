import * as fs from "node:fs/promises";
import * as path from "node:path";
import { execSync } from "node:child_process";

const TestDataDir = path.resolve(process.cwd(), "temp", "testdata");
const TestDataFilePattern = new RegExp("(.+)[.](input|output)[.]txt$");

const decoder = new TextDecoder();
const readFile = (filePath: string): Promise<string> =>
  fs.readFile(filePath).then((buffer) => decoder.decode(buffer).trim());

interface DataSet {
  [key: string]: {
    inputFile: string;
    output: string;
  };
}

const execTest = async (): Promise<void> => {
  const files = await fs.readdir(TestDataDir);

  const dataset: DataSet = {};
  await Promise.all(
    files
      .filter((file) => TestDataFilePattern.test(file))
      .map(async (file) => {
        const matches = file.match(TestDataFilePattern);
        if (matches == null) return;
        const [, key, type] = matches;
        dataset[key] ??= { inputFile: "", output: "" };
        if (type == "input") {
          dataset[key].inputFile = path.resolve(TestDataDir, file);
        } else if (type == "output") {
          dataset[key].output = await readFile(path.resolve(TestDataDir, file));
        } else {
          throw new Error(`Unknown type: ${type}`);
        }
      })
  );

  // Check Dataset
  Object.entries(dataset).forEach(([key, { inputFile, output }]) => {
    if (inputFile === "") throw new Error(`[${key}] input file not found`);
    if (output === "") throw new Error(`[${key}] output data is empty`);
  });

  // Run code with test data
  Object.entries(dataset).forEach(([key, { inputFile, output }]) => {
    console.log(`##### Test: ${key} #####`);
    const stdout = decoder.decode(execSync(`cat ${inputFile} | node ./temp/index.js`)).trim();
    const success: boolean = stdout === output;
    console.log(`Result: ${success ? "SUCCESS" : "Failed..."}`);
    if (!success) {
      console.log("");
      console.log("[Expect]");
      console.log(output);
      console.log("");
      console.log("[Actual]");
      console.log(stdout);
    }
    console.log("");
  });
};

execTest()
  .catch(console.error)
  .finally(() => console.log("---------------------------------------------"));
