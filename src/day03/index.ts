import run from "aocrunner";

const letters = [
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 97)), // a-z
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65)), // A-Z
];

const parseInput = (rawInput: string) => {
  return rawInput
    .split("\n")
    .map((rucksack) => [
      [...rucksack.slice(0, rucksack.length / 2)],
      [...rucksack.slice(rucksack.length / 2)],
    ]);
};

const searchRucksacks = (rucksacks: string[][][]) => {
  return rucksacks
    .flatMap((rucksack) => {
      return compareCompartments(rucksack[0], rucksack[1]).reduce(
        (acc, item) => acc + letters.indexOf(item) + 1,
        0,
      );
    })
    .reduce((acc, val) => acc + val, 0);
};

const compareCompartments = (left: string[], right: string[]) => {
  const duplicates = left.filter((item) => right.includes(item));
  return duplicates.filter((item, index) => duplicates.indexOf(item) === index);
};

const part1 = (rawInput: string) => {
  return searchRucksacks(parseInput(rawInput));
};

const alternateParseInput = (rawInput: string) => {
  return rawInput.split("\n").reduce((acc, item, index) => {
    if (index % 3 === 0) {
      acc.push([item]);
    } else {
      acc[acc.length - 1].push(item);
    }
    return acc;
  }, [] as string[][]);
};

const findBadges = (elfGroups: string[][]) => {
  return elfGroups.map((elfGroup) => {
    const splitGroups = elfGroup.map((elf) => [...elf]);
    return splitGroups[0].find((item) => {
      return (
        splitGroups[1].indexOf(item) !== -1 &&
        splitGroups[2].indexOf(item) !== -1
      );
    }) ?? '';
  });
};

const part2 = (rawInput: string) => {
  const badgesList = findBadges(alternateParseInput(rawInput));
  return badgesList.reduce((acc, badge) => acc + letters.indexOf(badge) + 1, 0);
};

const testInput = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
