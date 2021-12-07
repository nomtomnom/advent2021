const processNumsToArray = require('../processNumsToArray');

function leastFuel(crabPositions) {
  let minPos = Infinity;
  let maxPos = -Infinity;
  
  // iterate through list of crabPositions to determine range
  crabPositions.forEach(pos => {
    if (pos < minPos) minPos = pos;
    if (pos > maxPos) maxPos = pos;
  });
  
  // calculate total fuel range
  let totalFuel = Infinity;

  // loop through range
  // for each value in range, determine difference between pos & that value
  for (let i = minPos; i <= maxPos; i++) {
    let currFuel = 0;

    // calculate total fuel expended to reach this point
    for (let j = 0; j < crabPositions.length; j++) {
      const currDiff = Math.abs(crabPositions[j] - i);
      currFuel += sumOfInts(currDiff);
    }

    // console.log(i, currFuel);

    if (currFuel < totalFuel) totalFuel = currFuel;
  }


  return totalFuel;
}

function sumOfInts(int) {
  return (int * (int + 1)) / 2;
}

// const sampleData = processNumsToArray('day7/sampleData.txt');
// console.log(leastFuel(sampleData), 168);

const data = processNumsToArray('day7/data.txt');
console.log(leastFuel(data));
