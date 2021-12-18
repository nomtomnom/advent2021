const processTextToArray = require('../processTextToArray');

function foldTransparency(coords, folds, [ gridX, gridY ], num = -1) {
  // build matrix
  let matrix = new Array(gridY + 1).fill().map(row => new Array(gridX + 1).fill(0));

  // fill matrix with dots @ coords
  for (let i = 0; i < coords.length; i++) {
    const [x, y] = coords[i];
    matrix[y][x] = 1;
  }

  // process folds (1)
  const numFolds = num > -1 ? num : folds.length;
  for (let i = 0; i < numFolds; i++) {
    // console.log('folding ', i + 1);
    matrix = foldMatrix(matrix, folds[i]);
  }

  const newMatrix = new Array(matrix.length).fill().map(el => new Array(matrix[0].length).fill('.'));
  // console.log(matrix);
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j]) newMatrix[i][j] = '#';
    }
  }

  newMatrix.forEach(el => {
    console.log(el.join(''))
    // console.log('');
  });
  // count points
  return countPoints(matrix);
}

function foldMatrix(matrix, fold) {
  const [direction, coord] = fold;
  // console.log(direction, ' = ', coord);

  const xMax = direction === 'x' ? matrix[0].length - coord : matrix[0].length - 1;
  const yMax = direction === 'y' ? matrix.length - coord : matrix.length - 1;

  const newMatrix = new Array(yMax + 1).fill().map(el => new Array(xMax + 1).fill(0));
  // console.log('OLD', 'x', matrix[0].length, 'y', matrix.length)
  // console.log('NEW', 'x', newMatrix[0].length, 'y', newMatrix.length);
  // console.log('MAX', 'x', xMax, 'y', yMax);

  const edgeX = direction === 'x' ? coord : xMax;
  const edgeY = direction === 'y' ? coord : yMax;

  // fill in newMatrix
  // iterate through original matrix
  // if points are past fold, "reflect"
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      // mark edge
      let xCoord;
      let yCoord;
      let xShift = direction === 'x' ? xMax - edgeX : 0;
      let yShift = direction === 'y' ? yMax - edgeY : 0;

      if (y < edgeY) {
        // shift + y
        yCoord = yShift + y;
      } else if (y >= edgeY) {
        // go backwards
        // shift + (shift - y)
        yCoord = yMax + edgeY - y;
      }

      if (x < edgeX) {
        xCoord = xShift + x;
      } else if (x >= edgeX) {
        xCoord = xMax + edgeX - x;
      }

      // coordinate is either original coordinate, or if outside of the reflection zone, reflected
      // const xCoord = (x < xMax ? x : xMax - Math.abs(x - xMax));
      // const yCoord = (y < yMax ? y : yMax - Math.abs(y - yMax));
      // console.log('original coords', y, x, 'val', matrix[y][x]);
      // console.log('new coords', yCoord, xCoord);

      newMatrix[yCoord][xCoord] += matrix[y][x];

    }
  }

  // console.log('printing matrix');
  // newMatrix.forEach(el => console.log(el));

  return newMatrix;
}

function countPoints(matrix) {
  let points = 0;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] > 0) points += 1;
    }
  }

  return points;
}

const sampleCoords = [];
const sampleFolds = [];
const sampleGridSize = [0, 0];
const sample = processTextToArray('day13/sampleData.txt').forEach(line => {
  if (line.includes('fold along')) {
    const fold = line.slice(11).split('=').map(el => {
      if (Number(el)) {
        return Number(el)
      } else {
        return el;
      }
    });
    sampleFolds.push(fold);
  } else if (line) {
    const nums = line.split(',').map(el => Number(el));
    if (nums[0] > sampleGridSize[0]) sampleGridSize[0] = nums[0];
    if (nums[1] > sampleGridSize[1]) sampleGridSize[1] = nums[1];
    sampleCoords.push(nums);
  }
});

// console.log(sampleCoords);
// console.log(sampleFolds);
// console.log(sampleGridSize);

// console.log('17', foldTransparency(sampleCoords, sampleFolds, sampleGridSize, 1));
// console.log('16', foldTransparency(sampleCoords, sampleFolds, sampleGridSize));


const coords = [];
const folds = [];
const gridSize = [0, 0];
const data = processTextToArray('day13/data.txt').forEach(line => {
  if (line.includes('fold along')) {
    const fold = line.slice(11).split('=').map(el => {
      if (Number(el)) {
        return Number(el)
      } else {
        return el;
      }
    });
    folds.push(fold);
  } else if (line) {
    const nums = line.split(',').map(el => Number(el));
    if (nums[0] > gridSize[0]) gridSize[0] = nums[0];
    if (nums[1] > gridSize[1]) gridSize[1] = nums[1];
    coords.push(nums);
  }
});

// console.log(coords);
// console.log(folds);
// console.log(gridSize);
// console.log('data 671', foldTransparency(coords, folds, gridSize, 1));
console.log('data', foldTransparency(coords, folds, gridSize));