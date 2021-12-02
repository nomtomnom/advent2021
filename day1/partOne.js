const fs = require('fs');
const path = require('path');

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

function processTextToArray(fileName) {
  // import data
  const dataRaw = fs.readFileSync(path.resolve(__dirname, fileName));
  // parse data from buffer
  const dataConcat = Buffer.from(dataRaw, 'utf8').toString();
  // return data split into arrays @ line breaks
  return dataConcat.split('\n');
}

const sampleData = [199,200,208,210,200,207,240,269,260,263];


// console.log(depthIncreaseRate(sampleData)); // 7
console.log(depthIncreaseRate(processTextToArray('data.txt')));


