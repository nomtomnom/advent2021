const processTextToArray = require('../processTextToArray');

function depthIncreaseRate(data) {
  // pointer: lastVal
  let lastVal = Number(data[0]);
  // counter: largerThanPrevious = 0
  let largerThanPreviousCount = 0;

  // iterate through array, starting at data index 2
  for (let i = 1; i < data.length; i++) {
    const curr = Number(data[i]);
    if (curr === NaN) continue;
    // if val is largerThanPrevious, increment
    if (curr > lastVal) {
      // console.log(curr, 'greater than', lastVal);
      largerThanPreviousCount += 1;
    } 
    // update lastVal
    lastVal = curr;
  }

  // return counter
  return largerThanPreviousCount;
}

// console.log(depthIncreaseRate(sampleData)); // 7
console.log(depthIncreaseRate(processTextToArray('day1/data.txt')));


