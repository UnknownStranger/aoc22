import run from "aocrunner";

interface Folders {
  [key: string]: number;
}

const parseInput = (rawInput: string) => {
  return rawInput.split("\n");
};

// Trying to add comments to explain, adding them after the fact they seem pretty obvious
// maybe moving forward I'll add them as I go. I doubt it though.
const parseCommands = (commandList: string[]) => {
  const currentDir: string[] = [];
  let folders: Folders = {};
  commandList.map((command) => {
    if (command[0] === "$") {
      folders = handleCD(command, currentDir, folders); // Commands start with $
    } else if (command.split(" ")[0] !== "dir") {
      // Files don't start with dir
      folders = handleFile(command, currentDir, folders);
    }
    return;
  });
  return folders;
};

const handleCD = (command: string, currentDir: string[], folders: Folders) => {
  const commandParts = command.split(" ");
  // If the command is cd, we need to update the current directory
  if (commandParts[1] === "cd") {
    // If the command is cd .., we need to pop the current directory
    // effectively going up a level
    if (commandParts[2] === "..") {
      currentDir.pop();
      return folders;
    }
    // otherwise we need to add the new directory to the current directory
    // and add it to our folders list
    // Storing it as a full path prevents issues with duplicate names in different directories
    const folderName = commandParts[2];
    if (currentDir.length === 0) currentDir.push("root");
    else currentDir.push(currentDir[currentDir.length - 1] + "/" + folderName);
    folders[currentDir[currentDir.length - 1]] = 0;
  }
  return folders;
};

const handleFile = (
  command: string,
  currentDir: string[],
  folders: Folders,
) => {
  const fileSize = command.split(" ")[0];
  currentDir.map((dir) => {
    // Add the file size to the current directory
    // and all parent directories
    folders[dir] += Number(fileSize);
  });
  return folders;
};

const directorySum100k = (folders: Folders) => {
  return (
    Object.values(folders)
      // Filter out folders that are less than 100k
      .filter((v) => v <= 100000)
      // Sum the remaining folders
      .reduce((a, b) => a + b, 0)
  );
};

const part1 = (rawInput: string) => {
  return directorySum100k(parseCommands(parseInput(rawInput)));
};

const freeSpace = (folders: Folders, minimumSize: number): number => {
  return (
    Object.values(folders)
      // Filter out folders that are less than required free space
      .filter((item) => item >= minimumSize)
      // Return the smallest folder
      .sort((a, b) => a - b)[0]
  );
};

const part2 = (rawInput: string) => {
  const folders = parseCommands(parseInput(rawInput));
  // The drive is always 70MB
  // The required free space is always 30MB
  // The required free space is the difference between the drive size and the
  // sum of all folders and the required free space
  const requiredSpace = Math.abs(70000000 - folders.root - 30000000);
  return freeSpace(folders, requiredSpace);
};

const testInput = `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 24933642,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
