const processTextToArray = require('../processTextToArray');

  // "gamma" rate is a binary of the most common binary values in each place
  // "epsilon" is the inverse
function powerConsumption(binaryStrings) {
  let gamma = '';
  let epsilon = '';


  const binaryLength = binaryStrings[0].length;
  for (let i = 0; i < binaryLength; i++) {
    // current loop: first digit, second digit etc.
    const count = {
      [0]: 0,
      [1]: 0
    }

    // generate bit criteria 
    for (let j = 0; j < binaryStrings.length; j++) {
      // current loop: individual binaries
      const currentDigit = binaryStrings[j][i];
      count[currentDigit] += 1;
    }

    // concat values onto gamma & epsilon
    gamma += count[0] > count[1] ? '0' : '1';
    epsilon += count[0] > count[1] ? '1' : '0';
  }

  // parse gamma & epsilon into numbers
  gamma = Number.parseInt(gamma, 2);
  epsilon = Number.parseInt(epsilon, 2);

  return [gamma, epsilon, gamma * epsilon];
}

function powerConsumption2(binaryStrings) {
  const O2 = Number.parseInt(O2gen(binaryStrings), 2);
  const CO2 = Number.parseInt(CO2scrub(binaryStrings), 2);

  return [O2, CO2, O2 * CO2];
}

function O2gen(binaryStrings, i = 0) {
  if (binaryStrings.length === 1) return binaryStrings[0];
  const O2vals = [];

  const binaryLength = binaryStrings[0].length;
  // for (let i = 0; i < binaryLength; i++) {
    // current loop: first digit, second digit etc.
    const count = {
      [0]: 0,
      [1]: 0
    }

    // generate bit criteria 
    for (let j = 0; j < binaryStrings.length; j++) {
      // current loop: individual binaries
      const currentDigit = binaryStrings[j][i];
      count[currentDigit] += 1;
    }

    // determine which value is most common, then filter array by which has that value
    const commonVal = count[0] > count[1] ? '0' : '1';
    // console.log('common val is', commonVal);

    for (let j = 0; j < binaryStrings.length; j++) {
      const currentDigit = binaryStrings[j][i];
      if (currentDigit === commonVal) O2vals.push(binaryStrings[j]);
    }


  // }

  // parse gamma & epsilon into numbers
  // console.log(binaryStrings, i, commonVal, O2vals);
  return O2gen(O2vals, i + 1)
}

function CO2scrub(binaryStrings, i = 0) {
  if (binaryStrings.length === 1) return binaryStrings[0];
  const CO2vals = [];

  const binaryLength = binaryStrings[0].length;
  // for (let i = 0; i < binaryLength; i++) {
    // current loop: first digit, second digit etc.
    const count = {
      [0]: 0,
      [1]: 0
    }

    // generate bit criteria 
    for (let j = 0; j < binaryStrings.length; j++) {
      // current loop: individual binaries
      const currentDigit = binaryStrings[j][i];
      count[currentDigit] += 1;
    }

    // determine which value is most common, then filter array by which has that value
    const uncommonVal = count[0] > count[1] ? '1' : '0';
    // console.log('common val is', uncommonVal);

    for (let j = 0; j < binaryStrings.length; j++) {
      const currentDigit = binaryStrings[j][i];
      if (currentDigit === uncommonVal) CO2vals.push(binaryStrings[j]);
    }


  // }

  // parse gamma & epsilon into numbers
  // console.log(binaryStrings, i, commonVal, O2vals);
  return CO2scrub(CO2vals, i + 1)
}

const sample = ['00100','11110','10110','10111','10101','01111','00111','11100','10000','11001','00010','01010'];
// console.log(powerConsumption(sample));
// console.log(powerConsumption2(sample));
// console.log(O2gen(sample));
// console.log(CO2scrub(sample));

// console.log(powerConsumption(processTextToArray('day3/input.txt')));

console.log(powerConsumption2(processTextToArray('day3/input.txt')));