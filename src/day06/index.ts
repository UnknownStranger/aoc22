import run from "aocrunner";

const getPacketStartIndex = (input: string, packetSize: number): any => {
  let isFound = false;
  let index = packetSize;
  while (!isFound) {
    if (
      new Set([...input.slice(index - packetSize, index)]).size === packetSize
    ) {
      isFound = true;
      return index;
    }
    index++;
    if (index > input.length) throw new Error("No packet found");
  }
};

const part1 = (rawInput: string) => {
  return getPacketStartIndex(rawInput, 4);
};

const part2 = (rawInput: string) => {
  return getPacketStartIndex(rawInput, 14);
};

run({
  part1: {
    tests: [
      {
        input: "mjqjpqmgbljsphdztnvjfqwrcgsmlb",
        expected: 7,
      },
      {
        input: "bvwbjplbgvbhsrlpgdmjqwftvncz",
        expected: 5,
      },
      {
        input: "nppdvjthqldpwncqszvftbrmjlhg",
        expected: 6,
      },
      {
        input: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
        expected: 10,
      },
      {
        input: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw",
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: "mjqjpqmgbljsphdztnvjfqwrcgsmlb",
        expected: 19,
      },
      {
        input: "bvwbjplbgvbhsrlpgdmjqwftvncz",
        expected: 23,
      },
      {
        input: "nppdvjthqldpwncqszvftbrmjlhg",
        expected: 23,
      },
      {
        input: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
        expected: 29,
      },
      {
        input: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw",
        expected: 26,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
