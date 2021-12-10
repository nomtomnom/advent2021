const processTextToArray = require('../processTextToArray');

const points = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}

const matches = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
}

const matchesClose = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<'
}

function syntaxScore(data) {
  let score = 0;
  // iterate through data
  // tally scores
  data.forEach(line => score += isCorrupted(line));
  return score;
}

//Stop at the first incorrect closing character on each corrupted line.
function isCorrupted(line) {
  // store opening characters on a stack
  const openStack = [];
  // iterate through line
  for (let i = 0; i < line.length; i++) {
    const currChar = line[i];
    // if is opening, store on stack
    if (matches.hasOwnProperty(currChar)) {
      openStack.push(currChar);
    } 
    // else is closing
    else {
      // when a closing character is encountered, pop opening char off of stack and compare
      const openChar = openStack.pop();
      // if characters do not match, return character value
      if (matches[openChar] !== currChar) {
        return points[currChar];
      }
      // if characters match, continue (brackets are paired correctly)
    }
  }
  return 0;
}

// corrupted: incorrect pairings, such as {]
// incomplete: incomplete pairings, such as <

const sampleData = processTextToArray('day10/sampleData.txt');
console.log(syntaxScore(sampleData));

const data = processTextToArray('day10/data.txt');
console.log(syntaxScore(data));