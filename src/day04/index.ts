import run from "aocrunner";

const parseInput = (rawInput: string) => {
  //Split input into pairs
  return rawInput.split("\n").map((elfPair) => {
    // split pairs into individual elves
    return elfPair.split(",").map((elf) => {
      //split elves into ranges
      return elf.split("-").map((range) => {
        return parseInt(range); // ensure the ranges are numbers and not strings
      });
    });
  });
};

const findFullOverlap = (elfPairs: number[][][]) => {
  return elfPairs.filter((elfPair) => {
    return fullyOverlappedCheck(elfPair);
  }).length;
};

const fullyOverlappedCheck = (elfPair: number[][]) => {
  return (
    (elfPair[0][0] <= elfPair[1][0] && elfPair[0][1] >= elfPair[1][1]) || // is elf1 start and end within elf2 range
    (elfPair[0][0] >= elfPair[1][0] && elfPair[0][1] <= elfPair[1][1]) // is elf2 start and end within elf1 range
  );
};

const findPartialOverlap = (elfPairs: number[][][]) => {
  return elfPairs.filter((elfPair) => {
    return partialOverlapCheck(elfPair);
  }).length;
};

const partialOverlapCheck = (elfPair: number[][]) => {
  return (
    (elfPair[0][0] >= elfPair[1][0] && elfPair[0][0] <= elfPair[1][1]) || //is elf1 start in elf2 range
    (elfPair[0][1] >= elfPair[1][0] && elfPair[0][1] <= elfPair[1][1]) || //is elf1 end in elf2 range
    (elfPair[1][0] >= elfPair[0][0] && elfPair[1][0] <= elfPair[0][1]) || //is elf2 start in elf1 range
    (elfPair[1][1] >= elfPair[0][0] && elfPair[1][1] <= elfPair[0][1]) //is elf2 end in elf1 range
  );
};

const part1 = (rawInput: string) => {
  return findFullOverlap(parseInput(rawInput));
};

const part2 = (rawInput: string) => {
  return findPartialOverlap(parseInput(rawInput));
};

const testInput = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
