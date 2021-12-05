const processTextToArray = require('../processTextToArray');

// at how many points to two lines overlap?
function overlapScore(coords) {
  let dangerSpotCount = 0;
  // instantiate grid w/ 0s?
  const [gridX, gridY] = calcGridSize(coords);
  // we don't know the max value of the coords at the moment?
  const grid = new Array(gridY + 1).fill(0).map(el => new Array(gridX + 1).fill(0));;
  
  // for each coordinate, 
  for (let i = 0; i < coords.length; i++) {
    // destructure current values
    const [[x1, y1], [x2, y2]] = coords[i];
    // console.log(coords[i]);

    // increment grid by 1
    // if gridVal === 2, increment counter (hard coded to prevent extra counts)
    // loop while within bounds
    let x = x1;
    let y = y1;

    while (true) {
      grid[y][x] += 1;

      if (grid[y][x] === 2) dangerSpotCount += 1;

      if (x === x2 && y === y2) break;
      // if X has anywhere to go, increment/decrement
      if (x1 < x2) x += 1;
      else if (x1 > x2) x -= 1;
      // if Y has anywhere to go, increment/decrement
      if (y1 < y2) y += 1;
      else if (y1 > y2) y -= 1;
    }

    // console.log(grid);
  }
  // grid.forEach(el => console.log(...el));
  return dangerSpotCount;
}

// iterates through all coordinates, storing the maximum X and Y values
// returns a tuple
function calcGridSize(coords) {
  let maxX = 0;
  let maxY = 0;

  for (let i = 0; i < coords.length; i++) {
    const [[x1, y1], [x2, y2]] = coords[i];

    maxX = Math.max(maxX, x1, x2);
    maxY = Math.max(maxY, y1, y2);
  }

  return [maxX, maxY];
}

// converts string '0,8 -> 5,8' to [[0,8], [5,8]] (Tuple of Tuple)
function stringToCoords(str) {
  const coordStrs = str.split('->');
  const coords = [];
  for (let i = 0; i < coordStrs.length; i++) {
    const coord = coordStrs[i].split(',').map(el => Number(el));
    coords.push(coord);
  }
  return coords;
}

// generates an array of Tuples of Tuples
// const sampleData = processTextToArray('day5/sampleData.txt').map(el => stringToCoords(el));
// console.log(overlapScore(sampleData));

// // answer too high!!!
const data = processTextToArray('day5/data.txt').map(el => stringToCoords(el));
console.log(overlapScore(data));