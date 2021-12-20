const processTextToArray = require('../processTextToArray');

function polymerTemplateInsert(template, rules, rounds) {
  // iterate through rules to generate object for quick lookups

  let polymerStr = template;
  // repeat logic for # of rounds
  for (let i = 0; i < rounds; i++) {
    // insert new polymers simultaneously
    let newPolyStr = '';
    // iterate through polymer string and generate output
    for (let j = 0; j < polymerStr.length; j++) {
      const curr = polymerStr[j];
      const next = polymerStr[j + 1];
      // insert curr, new, then move on
      // insert cutt
      newPolyStr += curr;
      // if next exists, find middle pair & add result
      // (next will be added in next iteration)
      if (next) {
        newPolyStr += rules[curr + next];
      }
    } 

    // replace polymer string w/ new polymer string, then iterate again
    polymerStr = newPolyStr;
  }

  // return resulting string
  return polymerStr;
}

function processData(data) {
  return [data[0], generateRulesMap(data.slice(2))];
}

function generateRulesMap(rules) {
  const rulesMap = {};

  rules.forEach(rule => {
    // console.log(rule.split(' -> '));
    const [pair, insertion] = rule.split(' -> ');
    rulesMap[pair] = insertion;
  });

  return rulesMap;
}

function calculatePoints(polymerStr) {
  // map object to hold total occurences of each element
  const frequency = {};
  // max element 
  let maxEl = polymerStr[0];
  // min element
  let minEl = polymerStr[0];
  
  // iterate through string
  for (let i = 0; i < polymerStr.length; i++) {
    const curr = polymerStr[i];
    // add to freq
    if (!frequency.hasOwnProperty(curr)) frequency[curr] = 0;
    frequency[curr] += 1
    // compare with max & min & update
    if (frequency[curr] > frequency[maxEl]) maxEl = curr;
    if (frequency[curr] < frequency[minEl]) minEl = curr;
  }

  // return: max el - min el
  return frequency[maxEl] - frequency[minEl];
}

const [sampleTemplate, sampleRules] = processData(processTextToArray('day14/sampleData.txt'));

// console.log('1 round', polymerTemplateInsert(sampleTemplate, sampleRules, 1) === 'NCNBCHB');
// console.log('2 round', polymerTemplateInsert(sampleTemplate, sampleRules, 2) === 'NBCCNBBBCBHCB');
// console.log('3 round', polymerTemplateInsert(sampleTemplate, sampleRules, 3) === 'NBBBCNCCNBBNBNBBCHBHHBCHB');
// console.log('4 round', polymerTemplateInsert(sampleTemplate, sampleRules, 4) === 'NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB');
console.log(calculatePoints(polymerTemplateInsert(sampleTemplate, sampleRules, 40)));

// const [polymerTemplate, insertionRules] = processData(processTextToArray('day14/data.txt'));
// console.log(calculatePoints(polymerTemplateInsert(polymerTemplate, insertionRules, 10)));
