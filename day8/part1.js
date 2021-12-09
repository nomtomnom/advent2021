const fs = require('fs');
const path = require('path');

// const sampleSample = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf';
// const sampleMap = sampleSample.split(' ');
// 10 signal patterns | 4 output digits

// notes: 1 uses 2
// 7 uses 3
// 4 uses 4
// 5 2 3 use 5
// 6 9 0 use 6
// 8 uses 7 (max) (also: zero info)

// part 1
// In the output values, how many times do digits 1, 4, 7, or 8 appear?
function parseEntry (entry) {
  // only final four output values
  const outputs = entry.slice(11);

  // will use map to convert strings?
  const map = {
    a: 'a',
    b: 'a',
    c: 'a',
    d: 'a',
    e: 'a',
    f: 'a',
    g: 'a'
  }

  // stores solutions for numbers once they are found for faster lookup
  const numMap = {
  }

  // iterate through entry & figure out which number corresponds to which value
  // will I potentially need to iterate multiple times???
  entry.forEach(el => parseValue(el, map, numMap));

  return outputs.reduce((acc, curr) => {
    return numMap[curr] === 1
    ? acc + 1
    : numMap[curr] === 4
    ? acc + 1
    : numMap[curr] === 7
    ? acc + 1
    : numMap[curr] === 8
    ? acc + 1
    : acc
  }, 0);
}

function parseValue (pattern, map, numMap) {
  // value is 1
  if (pattern.length === 2) {
    numMap[pattern] = 1;

  }
  else if (pattern.length === 3) {
    numMap[pattern] = 7;

  }
  else if (pattern.length === 4) {
    numMap[pattern] = 4;

  }
  else if (pattern.length === 7) {
    numMap[pattern] = 8;
    // no valuable info to store in map here
  }
}

function processData(fileName) {
  // import data
  const dataRaw = fs.readFileSync(path.resolve(__dirname, fileName));
  // parse data from buffer
  const dataConcat = Buffer.from(dataRaw, 'utf8').toString();
  // return data split into arrays @ line breaks
  return dataConcat.split('\n');
}

const entries = processData('./sampleData.txt').map(entry => entry.split(' '));
// console.log(entries);
console.log(entries.reduce((acc, entry) => acc + parseEntry(entry), 0)); //61229
