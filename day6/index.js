function numFish(population, days) {
  // eight day lifecycle
  // cycle numbers each day
  const fishPop = {
    [0]: 0,
    [1]: 0,
    [2]: 0,
    [3]: 0,
    [4]: 0,
    [5]: 0,
    [6]: 0,
    [7]: 0,
    [8]: 0
  }

  // populate object w/ seed data
  population.forEach(el => {
    fishPop[el] += 1;   
  });

  // begin lifecycle
  while (days) {
    const temp = fishPop[0];
    // most days get shifted one down
    for (let i = 0; i < 8; i++) {
      fishPop[i] = fishPop[i + 1];
    }

    // 0 days get shifted to 6 && add to 8
    fishPop[6] += temp;
    fishPop[8] = temp;

    days -= 1;
  }

  let sum = 0;
  // sum days
  for (let i = 0; i <= 8; i++) {
    sum += fishPop[i];
  }

  return sum;
}

// const samplePop = [3, 4, 3, 1, 2];
// const samplePopStr = samplePop.join('');
// console.log('numFish', numFish(samplePop, 256) === 26984457539);

const population = [1,4,2,4,5,3,5,2,2,5,2,1,2,4,5,2,3,5,4,3,3,1,2,3,2,1,4,4,2,1,1,4,1,4,4,4,1,4,2,4,3,3,3,3,1,1,5,4,2,5,2,4,2,2,3,1,2,5,2,4,1,5,3,5,1,4,5,3,1,4,5,2,4,5,3,1,2,5,1,2,2,1,5,5,1,1,1,4,2,5,4,3,3,1,3,4,1,1,2,2,2,5,4,4,3,2,1,1,1,1,2,5,1,3,2,1,4,4,2,1,4,5,2,5,5,3,3,1,3,2,2,3,4,1,3,1,5,4,2,5,2,4,1,5,1,4,5,1,2,4,4,1,4,1,4,4,2,2,5,4,1,3,1,3,3,1,5,1,5,5,5,1,3,1,2,1,4,5,4,4,1,3,3,1,4,1,2,1,3,2,1,5,5,3,3,1,3,5,1,5,3,5,3,1,1,1,1,4,4,3,5,5,1,1,2,2,5,5,3,2,5,2,3,4,4,1,1,2,2,4,3,5,5,1,1,5,4,3,1,3,1,2,4,4,4,4,1,4,3,4,1,3,5,5,5,1,3,5,4,3,1,3,5,4,4,3,4,2,1,1,3,1,1,2,4,1,4,1,1,1,5,5,1,3,4,1,1,5,4,4,2,2,1,3,4,4,2,2,2,3];
console.log(numFish(population, 256));