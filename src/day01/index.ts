import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const getCaloriesPerElf = (input: string) => {
  const arrayOfSums: number[] = [];
  let currentSum = 0;
  input.split("\n").map((value, index, array) => {
    if (value) {
      currentSum += parseInt(value);
    }
    if (!value || index === array.length - 1) {
      arrayOfSums.push(currentSum);
      currentSum = 0;
    }
  });
  return arrayOfSums;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return Math.max(...getCaloriesPerElf(input));
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return getCaloriesPerElf(input)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b);
};

const testInput = `1000
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
