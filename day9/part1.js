const processTextToArray = require('../processTextToArray');

// low point: lower than any of its adjacent locations (check up, down, left, right)
// risk level per point: 1 + height

function mapRisk(map) {
  // riskSum
  let riskSum = 0;
  const mapHeight = map.length;
  const mapLength = map[0].length;

  // iterate through each element on the map
  for (let i = 0; i < mapHeight; i++) {
    for (let j = 0; j < mapLength; j++) {
      const current = map[i][j];
      let minAdjacentHeight = Infinity;
      // examine height of all adjacent locations

      // up i - 1
      minAdjacentHeight = height(i - 1, j, map, mapHeight, mapLength, minAdjacentHeight);
      // down i + 1
      minAdjacentHeight = height(i + 1, j, map, mapHeight, mapLength, minAdjacentHeight);
      // left j - 1
      minAdjacentHeight = height(i, j - 1, map, mapHeight, mapLength, minAdjacentHeight);
      // right j + 1
      minAdjacentHeight = height(i, j + 1, map, mapHeight, mapLength, minAdjacentHeight);

      // if current is lowest height, add 1 + current to riskSum
      if (current < minAdjacentHeight) riskSum += 1 + current;
    }
  }

  return riskSum;
}

function height(y, x, map, height, length, minHeight) {
  // if x or y are greater than height or length, they are off map, and cannot update minHeight
  if (y >= height || y < 0) return minHeight;
  if (x >= length || x < 0) return minHeight;

  return Math.min(minHeight, map[y][x]);
}

const data = processTextToArray('day9/data.txt');
const dataMatrix = data.map(str => str.split(''))
  .map(level => level.map(str => Number(str)));
// console.log(dataMatrix);

console.log(mapRisk(dataMatrix));