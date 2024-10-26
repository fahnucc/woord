function createCubesPositionsAndLetters(letterPool, size = 4) {
  const gap = 1.5;
  const originOffset = -(size / 2) * gap + gap / 2;
  const cubes = [];

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const x = originOffset + i * gap;
      const y = originOffset + j * gap;
      const index = j * size + i;
      const letter = letterPool[index];

      cubes.push({
        id: index,
        position: [x, 0, y],
        letter,
        row: j,
        col: i,
      });
    }
  }

  return cubes;
}

const getHomeBoard = () => {
  return [
    "H",
    "O",
    "M",
    "E",
    "P",
    "L",
    "A",
    "Y",
    "R",
    "O",
    "O",
    "M",
    "T",
    "S",
    "I",
    "L",
  ];
};

const createRandomBoard = () => {
  const vowels = "AEIOU";
  const consonants = "BCDFGHJKLMNPQRSTVWXYZ";
  const board = [];

  for (let i = 0; i < 4; i++) {
    let hasVowel = false;

    for (let j = 0; j < 4; j++) {
      const pool = hasVowel ? consonants : vowels;
      const letter = pool[Math.floor(Math.random() * pool.length)];

      board.push(letter);
      hasVowel = hasVowel || vowels.includes(letter);
    }
  }

  return board;
};

const getRotateDirection = (id, selectedLetters) => {
  const selectedLetterIndex = selectedLetters.findIndex((sl) => sl.id === id);
  const nextSelectedLetter = selectedLetters[selectedLetterIndex + 1];

  const right = nextSelectedLetter?.id % 4 > id % 4;
  const left = nextSelectedLetter?.id % 4 < id % 4;
  const down = nextSelectedLetter?.id >= id + 2;
  const up = nextSelectedLetter?.id <= id - 2;

  return { up, down, left, right };
};

export {
  createCubesPositionsAndLetters,
  getHomeBoard,
  createRandomBoard,
  getRotateDirection,
};
