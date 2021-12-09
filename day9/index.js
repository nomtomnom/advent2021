const processTextToArray = require('../processTextToArray');

// low point: lower than any of its adjacent locations (check up, down, left, right)
// risk level per point: 1 + height

function mapRisk(map) {
  // riskSum
  let riskSum = 0;
  const mapHeight = map.length;
  const mapLength = map[0].length;

  const visited = {};

  const largestBasins = [0, 0, 0];

  // iterate through each element on the map
  for (let i = 0; i < mapHeight; i++) {
    for (let j = 0; j < mapLength; j++) {
      // console.log('current', current);

      // if size is < 9, explore basin
      // if (map[i][j] < 9 && !visited.hasOwnProperty(`${j}-${i}`)) {
      let current = exploreBasin(i, j, map, mapHeight, mapLength, visited);

      // skip if current is 0
      if (current === 0) continue;

      // update largestBasins
      for (let k = 0; k < largestBasins.length; k++) {
        // if current is larger than current basin, swap
        if (current > largestBasins[k]) {
          const temp = largestBasins[k];
          largestBasins[k] = current;
          current = temp;
        }
      }
    }
  }

  console.log(largestBasins);
  // multiply together sizes of basins
  // return totalBasinArea;
  return largestBasins.reduce((acc, curr) => acc * curr, 1);
}

function height(y, x, map, height, length, minHeight) {
  // if x or y are greater than height or length, they are off map, and cannot update minHeight
  if (y >= height || y < 0) return minHeight;
  if (x >= length || x < 0) return minHeight;

  return Math.min(minHeight, map[y][x]);
}

// number of locations within the low point
// recursive exploration
// 9 is not part of any basin
// mark coordinates visited
function exploreBasin(y, x, map, height, length, visited) {
  // base case: if visited return 0
  if (visited.hasOwnProperty(`${x}-${y}`)) return 0;
  // mark visited
  visited[`${x}-${y}`] = true;

  // base cases: if out of bounds, return 0
  if (y >= height || y < 0) return 0;
  if (x >= length || x < 0) return 0;
  // base case: if height is 9 return 0
  if (map[y][x] >= 9) return 0;

  // explore basin:
  // size defaults to 1 as we have at least 1 square
  let basinSize = 1;
  // console.log('basinSize', basinSize);

  // add to visited list
  // recurse to neighbors & sum size
  basinSize += exploreBasin(y - 1, x, map, height, length, visited);
  basinSize += exploreBasin(y + 1, x, map, height, length, visited);
  basinSize += exploreBasin(y, x - 1, map, height, length, visited);
  basinSize += exploreBasin(y, x + 1, map, height, length, visited);

  // return size
  return basinSize;
}

const data = processTextToArray('day9/data.txt');
const dataMatrix = data.map(str => str.split(''))
  .map(level => level.map(str => Number(str)));
// console.log(dataMatrix);

console.log(mapRisk(dataMatrix));