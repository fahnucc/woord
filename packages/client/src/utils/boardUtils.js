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

export { createCubesPositionsAndLetters };
