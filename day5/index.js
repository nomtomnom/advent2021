const processTextToArray = require('../processTextToArray');

// at how many points to two lines overlap?
function overlapScore(coords) {
  let dangerSpotCount = 0;
  // instantiate grid w/ 0s?
  const [gridX, gridY] = calcGridSize(coords);
  // we don't know the max value of the coords at the moment?
  const grid = new Array(gridY + 1).fill(0).map(el => new Array(gridX + 1).fill(0));;
  
  // console.log(coords);
  // console.log(gridX, gridY, 'grid generated', grid);
  // console.log('grid is unique', grid[0] !== grid[1]);

  // for each coordinate, 
  for (let i = 0; i < coords.length; i++) {
    // check if coords are valid
    if (!validateCoords(coords[i])) continue;
    // destructure current values
    const [[x1, y1], [x2, y2]] = coords[i];
    // console.log(coords[i]);

    // increment grid by 1
    // if gridVal === 2, increment counter (hard coded to prevent extra counts)
    
    // loop through x values w/ constant y
    if (y1 === y2) {
      for (let j = Math.min(x1, x2); j < Math.max(x1, x2) + 1; j++) {
        // console.log('looping x', j);
        grid[y1][j] += 1;
  
        if (grid[y1][j] === 2) {
          dangerSpotCount += 1;
          // console.log('danger spot!');
        } 
          
      }
    }

    // loop through y values w/ constant x
    if (x1 === x2) {
      for (let j = Math.min(y1, y2); j < Math.max(y1, y2) + 1; j++) {
        // console.log('looping y', j);
        grid[j][x1] += 1;
  
        if (grid[j][x1] === 2) {
          dangerSpotCount += 1;
          // console.log('danger spot!');
        } 
      }
    }

    // console.log(grid);
  }
  // grid.forEach(el => console.log(el));
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

// ensures coords are valid horizontal coords
function validateCoords(coords) {
  const [[x1, y1], [x2, y2]] = coords;
  // at least one set of coords must match
  if (x1 === x2 || y1 === y2) {
    return true;
  } else {
    return false;
  }
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

// answer too high!!!
const data = processTextToArray('day5/data.txt').map(el => stringToCoords(el));
console.log(overlapScore(data));