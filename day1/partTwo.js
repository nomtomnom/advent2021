// our goal now is to count the number of times the sum of measurements in this sliding window increases from the previous sum. So, compare A with B, then compare B with C, then C with D, and so on. Stop when there aren't enough measurements left to create a new three-measurement sum.

const fs = require('fs');
const path = require('path');

function depthIncreaseRate(data) {
  // pointer: lastVal
  let lastVals = [Number(data[0]), Number(data[1]), Number(data[2])];
  let lastValSum = lastVals.reduce((acc, curr) => acc + curr);
  // console.log('initial sum', lastValSum);
  // counter: largerThanPrevious = 0
  let largerThanPreviousCount = 0;

  // iterate through array, starting at data index 3
  for (let i = 3; i < data.length; i++) {
    const curr = Number(data[i]);
    if (curr === NaN) continue;

    // update lastVals LIFO
    lastVals.shift();
    lastVals.push(curr);
    // create new sum
    const currValSum = lastVals.reduce((acc, curr) => acc + curr); 
    // console.log('current sum', currValSum);
    // if val is largerThanPrevious, increment
    if (currValSum > lastValSum) {
      // console.log(curr, 'greater than', lastVal);
      largerThanPreviousCount += 1;
    } 
    // update lastVal
    lastValSum = currValSum;
  }

  // return counter
  return largerThanPreviousCount;
}

function processTextToArray(fileName) {
  // import data
  const dataRaw = fs.readFileSync(path.resolve(__dirname, fileName));
  // parse data from buffer
  const dataConcat = Buffer.from(dataRaw, 'utf8').toString();
  // return data split into arrays @ line breaks
  return dataConcat.split('\n');
}

const sampleData = [199,200,208,210,200,207,240,269,260,263];


// console.log(depthIncreaseRate(sampleData)); // 5
console.log(depthIncreaseRate(processTextToArray('data.txt')));

