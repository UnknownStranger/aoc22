import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput
    .split("\n\n")
    .map((elf) => elf.split("\n").map((calories) => parseInt(calories)));
};

const getCaloriesPerElf = (elfList: number[][]) => {
  return elfList
    .flatMap((elf) => {
      return elf.reduce((a, b) => a + b);
    })
    .sort((a, b) => b - a);
};

const part1 = (rawInput: string) => {
  return getCaloriesPerElf(parseInput(rawInput))[0];
};

const part2 = (rawInput: string) => {
  return getCaloriesPerElf(parseInput(rawInput))
    .slice(0, 3)
    .reduce((a, b) => a + b);
};

const testInput = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
