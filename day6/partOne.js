// brute force solution

function generateLanternfish(population, days) {

  while (days) {
    // iterate through population
    for (let i = 0; i < population.length; i++) {
      // if > 0, decremenent "day counter"
      if (population[i] > 0) {
        population[i] -= 1;
      } else if (population[i] === 0) {
        population[i] = 6;
        population.push(9);
      }
      // if 0, reset to 6, add an 8 to popqueue
    }
    // console.log('day', days);
    // console.log(population);
    // decrement days
    days -= 1;
  }

  // return total number of lanternfish (length of array)
  return population.length;
}

// still too slow
function generateLanternfishString(population, days) {

  while (days) {
    let newPop = '';
    let progeny = '';
    // iterate through population
    for (let i = 0; i < population.length; i++) {
      const phase = Number(population[i]);
      // if > 0, decremenent "day counter"
      if (phase > 0) {
        newPop += phase - 1;
      } else if (phase === 0) {
        // if 0, reset to 6, add an 8 to popqueue
        newPop += 6;
        progeny += 8;
      }
    }

    population = newPop + progeny;

    // console.log('day', days);
    // console.log(population);
    // decrement days
    days -= 1;
  }

  // return total number of lanternfish (length of array)
  return population.length;
}

const samplePop = [3, 4, 3, 1, 2];
console.log(generateLanternfish(samplePop, 18));

// runs into size errors
const samplePop = [3, 4, 3, 1, 2];
console.log(generateLanternfish(samplePop, 256));

// const population = [1,4,2,4,5,3,5,2,2,5,2,1,2,4,5,2,3,5,4,3,3,1,2,3,2,1,4,4,2,1,1,4,1,4,4,4,1,4,2,4,3,3,3,3,1,1,5,4,2,5,2,4,2,2,3,1,2,5,2,4,1,5,3,5,1,4,5,3,1,4,5,2,4,5,3,1,2,5,1,2,2,1,5,5,1,1,1,4,2,5,4,3,3,1,3,4,1,1,2,2,2,5,4,4,3,2,1,1,1,1,2,5,1,3,2,1,4,4,2,1,4,5,2,5,5,3,3,1,3,2,2,3,4,1,3,1,5,4,2,5,2,4,1,5,1,4,5,1,2,4,4,1,4,1,4,4,2,2,5,4,1,3,1,3,3,1,5,1,5,5,5,1,3,1,2,1,4,5,4,4,1,3,3,1,4,1,2,1,3,2,1,5,5,3,3,1,3,5,1,5,3,5,3,1,1,1,1,4,4,3,5,5,1,1,2,2,5,5,3,2,5,2,3,4,4,1,1,2,2,4,3,5,5,1,1,5,4,3,1,3,1,2,4,4,4,4,1,4,3,4,1,3,5,5,5,1,3,5,4,3,1,3,5,4,4,3,4,2,1,1,3,1,1,2,4,1,4,1,1,1,5,5,1,3,4,1,1,5,4,4,2,2,1,3,4,4,2,2,2,3];
// console.log(generateLanternfish(population, 80));