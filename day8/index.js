const fs = require('fs');
const path = require('path');

const sampleSample = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf';
const sampleMap = sampleSample.split(' ');
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

  // sort entries by size?
  entry.sort((a, b) => a.length - b.length);
  // console.log(entry);
  // console.log(outputs);

  // intermediate storage for certain numbers to help determine future numbers
  // TODO: could refactor to only possess the values for 1, seems to be the only ones we are using lol
  const map = {
    [0]: [],
    [1]: [],
    [2]: [],
    [3]: [],
    [4]: [],
    [5]: [],
    [6]: [],
    [7]: [],
    [8]: [],
    [9]: []
  };
  
  const locMap = {
    TL: null,
    BL: null,
    TR: null,
    BR: null,
    T: null,
    M: null,
    B: null
  }

  // stores solutions for numbers once they are found for faster lookup
  const solutionMap = {}

  const lengths = new Array(8).fill(0).map(el => new Set());

  // fill in 1, 4, 7, 8
  entry.forEach(el => parseValue(el, map, solutionMap, lengths));
  // console.log(solutionMap);
  // console.log(map);
  // console.log(lengths);

  // all remaining values must have 5 or 6, they are the unknowns
  // start with 6 (TR), 9 (BL), 0 (mid) (all missing just one value)
  // console.log(lengths[6]);
  lengths[6].forEach(pattern => {
    const includes0 = pattern.includes(map[1][0][0]);
    const includes1 = pattern.includes(map[1][0][1]);
    // 6 will be missing one of the digits from 1 (definitive 1 values), (can map 6)
    // all 6s will be found
    if (!includes0 || !includes1) {
      // console.log('pattern', pattern, 'is 6', map[1][0]);
      solutionMap[pattern] = 6;
      map[6] = pattern;

      // mark down which value is top & bottom
      if (!includes0) {
        locMap.TR = map[1][0][0];
        locMap.BR = map[1][0][1];
      }
      else if (!includes1) {
        locMap.TR = map[1][0][1];
        locMap.BR = map[1][0][0];
      }
    }
  })
  // 9 & 0 cannot map, but can mark down potential BL, mid
  // console.log('TR is', locMap.TR);
  // then can figure out 2, 3, 5 (all missing multiple values)
  // console.log(lengths[5]);
  // 3 is the only one that will have both of the 1 values (map)
  lengths[5].forEach(pattern => {
    // determine whether pattern includes 1vals
    const includes0 = pattern.includes(map[1][0][0]);
    const includes1 = pattern.includes(map[1][0][1]);

    if (includes0 && includes1) {
      // console.log('pattern', pattern, 'is 3', map[1][0]);
      solutionMap[pattern] = 3;
      map[3].push(pattern);
    }
    
    // can identify 2 & 5 by which 1-val they are missing (map)
    else if (pattern.includes(locMap.TR)) {
      // if pattern has TR value, it must be 2
      solutionMap[pattern] = 2;
      map[2].push(pattern);
      // TL is the other missing val from here
      locMap.TL = missingVal(pattern, locMap.BR);
    }
    // inverse of above
    else if (!pattern.includes(locMap.TR)) {
      solutionMap[pattern] = 5;
      map[5].push(pattern);
      // BL is the other missing val from here
      locMap.BL = missingVal(pattern, locMap.TR);
    }
  })

  // should have 1, 2, 3, 4, 5, 6, 7, 8
  // should be missing 9, 0
  // console.log(solutionMap);
  // console.log(locMap);

  // can go back and identify 9 (missing left) & 0 (no missing left) 
  lengths[6].forEach(pattern => {
    // 9 will not have BL
    if (!pattern.includes(locMap.BL)) {
      solutionMap[pattern] = 9;
      map[9].push(pattern);
    }
    // 0 will have TR
    else if (pattern.includes(locMap.TR)) {
      solutionMap[pattern] = 0;
      map[0].push(pattern);
    }
    // 6 will not fit either requirement (but has already been solved):
  })

  // concat all output vals to a string, then turn into a Number
  return Number(outputs.reduce((acc, curr) => acc + solutionMap[curr], ''));
}

function parseValue (pattern, map, solutionMap, lengths) {
  lengths[pattern.length].add(pattern);
  // value is 1
  if (pattern.length === 2) {
    solutionMap[pattern] = 1;
    map[1].push(pattern);
  }
  else if (pattern.length === 3) {
    solutionMap[pattern] = 7;
    map[7].push(pattern);
  }
  else if (pattern.length === 4) {
    solutionMap[pattern] = 4;
    map[4].push(pattern);
  }
  else if (pattern.length === 7) {
    solutionMap[pattern] = 8;
    // no valuable info to store in map here
    map[8].push(pattern);
  }
}

function missingVal(pattern, except) {
  // a-g
  if (except !== 'a' && !pattern.includes('a')) return 'a';
  if (except !== 'b' && !pattern.includes('b')) return 'b';
  if (except !== 'c' && !pattern.includes('c')) return 'c';
  if (except !== 'd' && !pattern.includes('d')) return 'd';
  if (except !== 'e' && !pattern.includes('e')) return 'e';
  if (except !== 'f' && !pattern.includes('f')) return 'f';
  if (except !== 'g' && !pattern.includes('g')) return 'g';
}

function processData(fileName) {
  // import data
  const dataRaw = fs.readFileSync(path.resolve(__dirname, fileName));
  // parse data from buffer
  const dataConcat = Buffer.from(dataRaw, 'utf8').toString();
  // return data split into arrays @ line breaks
  return dataConcat.split('\n');
}

const entries = processData('./data.txt').map(entry => entry.split(' '));
// console.log(entries);
console.log(entries.reduce((acc, entry) => acc + parseEntry(entry), 0)); //61229

// console.log(parseEntry(sampleMap));