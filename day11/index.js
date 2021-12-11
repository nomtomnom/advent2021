const processNumsToArray = require('../processNumsToArray');
const processTextToArray = require('../processTextToArray');

// octopus flash guide:
// normal: energy + 1
// @ 9, flash: all adjacent + 1, reset to 0
// octopus can flash at most once per step (intermediate form)

// 
function runSteps(grid, n = 'default') {
  let numFlashes = 0;
  const gridSize = grid.length * grid[0].length;

  // default: infinite loop looking for when entire grid is "flashed", only occurs with no n passed in
  let i = 0;
  while (n === 'default') {
    i += 1;
    numFlashes = step(grid, gridSize);
    if (numFlashes === 100) {
      return i;
    }
  }

  // if n is passed in, loop through that amount of times & gather total # of flashes
  // let numFlashes = 0;
  for (let i = 0; i < n; i++) {
    numFlashes += step(grid, gridSize);
  }

  return numFlashes;
}

function step(grid) {
  const flashed = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      checkFlash(y, x, grid, flashed);
    }
  }

  resetFlash(grid, flashed);
  
  return flashed.length;
}

function checkFlash(y, x, grid, flashed) {
  // return if invalid coordinate
  if (y < 0 || y > grid.length - 1) return 0;
  if (x < 0 || x > grid[0].length - 1) return 0;

  // increment value by 1
  grid[y][x] += 1;
  
  // if === 10, flash
  if (grid[y][x] === 10) {

    // store coordinates in flashed array
    flashed.push([y, x]);

    // checkFlash for adjacent coords
    // up
    checkFlash(y - 1, x, grid, flashed);
    // down
    checkFlash(y + 1, x, grid, flashed);
    // left
    checkFlash(y, x - 1, grid, flashed);
    // right
    checkFlash(y, x + 1, grid, flashed);
    // TL
    checkFlash(y - 1, x - 1, grid, flashed);
    // TR
    checkFlash(y - 1, x + 1, grid, flashed);
    // BL
    checkFlash(y + 1, x - 1, grid, flashed);
    // BR
    checkFlash(y + 1, x + 1, grid, flashed);
  }

  return 1;
}

// iterate through flashed array to reset grid values for next step
function resetFlash(grid, flashed) {
  for (let i = 0; i < flashed.length; i++) {
    const [y, x] = flashed[i];
    grid[y][x] = 0;
  }
}

// How many total flashes are there after 100 steps?
// sample: 1656
const sampleData = processTextToArray('day11/sampleData.txt')
  .map(el => el.split('').map(num => Number(num)));

const data = processTextToArray('day11/data.txt')
  .map(el => el.split('').map(num => Number(num)));

// // // initial run counts all flashes
// console.log('1656', runSteps(sampleData, 100));
// console.log('1571', runSteps(data, 100));

// second run returns step at which all squares are flashed
// console.log('195', runSteps(sampleData)); 
// console.log('387', runSteps(data));