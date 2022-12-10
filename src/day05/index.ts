import run from "aocrunner";

interface Move {
  count: number;
  from: number;
  to: number;
}

interface Input {
  grid: string[][];
  moves: Move[];
}

// Alright, here's the deal. This is pretty gross to read. I agree.
// Thing is, it reshapes the input into the structure I want to work with
// so.... ¯\_(ツ)_/¯
const parseInput = (rawInput: string) => {
  //Split the input into the grid and moves lists
  const splitInput = rawInput.split("\n\n").map((x) => x.split("\n"));

  // split the grid every 4 characters, then trim any whitespace
  const grid = splitInput[0].map((x) => {
    return x.match(/.{1,4}/g)?.map((x) => x.trim()) ?? [];
  });

  // Rotate the grid 90 degrees clockwise, then filter out any empty strings
  const rotatedGrid = grid[0]
    .map((_, colIndex) => grid.map((row) => row[colIndex]).reverse())
    .map((x) => x.filter((x) => x.match(/[A-Z]/g)));

  // Parse the moves into an array of objects,
  // then convert the from and to values to 0 indexed numbers
  const moves = splitInput[1].map((x) => {
    const [count, from, to] = x.match(/\d+/g) ?? [];
    return {
      count: parseInt(count ?? '0'),
      from: parseInt(from) - 1, // -1 because the grid is 0 indexed
      to: parseInt(to) - 1, //Same here
    };
  });

  // Send back the rotated grid and parsed moves object array
  return { grid: rotatedGrid, moves: moves };
};

const parseMoves = (input: Input, reverse?: boolean) => {
  const { moves, grid } = input;
  moves.map((move: Move) => {
    const { count, from, to } = move;
    // Decided to just set this up to handle both parts after reading part 2
    const toMove = grid[from].splice(grid[from].length - count);
    const lifted = reverse ? toMove.reverse() : toMove;
    grid[to].push(...lifted);
  }, grid);
  return grid;
};

const getTopOfStacks = (grid: string[][]) => {
  return grid
    .map((stack) => {
      return stack[stack.length - 1];
    })
    .join("")
    .replace(/[\[\]]/g, "");
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return getTopOfStacks(parseMoves(input, true));
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return getTopOfStacks(parseMoves(input));
};

const testInput = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
