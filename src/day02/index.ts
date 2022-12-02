import run from "aocrunner";

interface ScoreValues {
  [key: string]: {
    [key: string]: number;
  };
}

interface SelectionMap {
  [key: string]: string;
}

const scoreValues: ScoreValues = {
  selection: {
    rock: 1,
    paper: 2,
    scissors: 3,
  },
  result: {
    loss: 0,
    draw: 3,
    win: 6,
  },
};

const matchupMap: { [key: string]: { [key: string]: string } } = {
  win: {
    rock: "paper",
    paper: "scissors",
    scissors: "rock",
  },
  loss: {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  },
  draw: {
    rock: "rock",
    paper: "paper",
    scissors: "scissors",
  },
};

const opponentMap: SelectionMap = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

const myMap: SelectionMap = {
  X: "rock",
  Y: "paper",
  Z: "scissors",
};

const myAlternateMap: SelectionMap = {
  X: "loss",
  Y: "draw",
  Z: "win",
};

const splitMatches = (strategy: string) => {
  return strategy.split("\n").map((match) => match.split(" "));
};

const parseStrategy = (strategy: string): number => {
  let myScore = 0;
  splitMatches(strategy).map((match) => {
    myScore += calculateScore(myMap[match[1]], opponentMap[match[0]]);
  });
  return myScore;
};

const calculateScore = (myChoice: string, opponentChoice: string) => {
  const myScore = scoreValues.selection[myChoice];
  const matchBonus =
    scoreValues.result[determineWinner(myChoice, opponentChoice)];
  return myScore + matchBonus;
};

const determineWinner = (myChoice: string, opponentChoice: string): string => {
  if (myChoice === opponentChoice) {
    return "draw";
  }
  if (myChoice === "rock") {
    return opponentChoice === "scissors" ? "win" : "loss";
  }
  if (myChoice === "scissors") {
    return opponentChoice === "paper" ? "win" : "loss";
  }
  if (myChoice === "paper") {
    return opponentChoice === "rock" ? "win" : "loss";
  }
  throw new Error("Error in determining winner");
};

const parseAlternateStrategy = (strategy: string): number => {
  let myScore = 0;
  splitMatches(strategy).map((match) => {
    const outcome = match[1];
    const opponentSelection = opponentMap[match[0]];
    const mySelection = matchupMap[myAlternateMap[outcome]][opponentSelection];
    myScore +=
      scoreValues.result[myAlternateMap[match[1]]] +
      scoreValues.selection[mySelection];
  });
  return myScore;
};

const part1 = (rawInput: string) => {
  return parseStrategy(rawInput);
};

const part2 = (rawInput: string) => {
  return parseAlternateStrategy(rawInput);
};

const testInput = `A Y
B X
C Z`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
