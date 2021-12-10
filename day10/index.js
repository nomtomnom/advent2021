const processTextToArray = require('../processTextToArray');

const points = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}

const autocompletePoints = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
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

function repairSyntax(data) {
  const scores = [];
  // discard corrupted lines
  for (let i = 0; i < data.length; i++) {
    const line = data[i];
    // ignore corrupted lines
    if (isCorrupted(line)) continue;
    else scores.push(autocomplete(line));
  }

  // sort scores
  // return middle score
  scores.sort((a, b) => a - b);
  const midIndex = Math.floor(scores.length / 2);
  // console.log(scores, midIndex);
  return scores[midIndex];
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

// same basic idea as isCorrupted (could be same function with some tweaking)
function autocomplete(line) {
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

    let score = 0;
    let str = '';
    const strLength = openStack.length;
    // now we have a stack that is all of the remaining open brackets
    // iterate through and use matching pairs to create completion string (& create score)
    for (let i = 0; i < strLength; i++) {
      const char = openStack.pop();
      str += matches[char];
      score *= 5;
      score += autocompletePoints[matches[char]]
    }

    // console.log(score, str);
    return score;
}

// corrupted: incorrect pairings, such as {]
// incomplete: incomplete pairings, such as <

const sampleData = processTextToArray('day10/sampleData.txt');
// console.log(syntaxScore(sampleData));
// console.log(repairSyntax(sampleData));

const data = processTextToArray('day10/data.txt');
// console.log(syntaxScore(data));
console.log(repairSyntax(data));