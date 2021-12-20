const processTextToArray = require('../processTextToArray');

https://github.com/Awjin/advent-of-code/blob/main/2021/14/utils.ts
// level order traversal solution

function polymerTemplateInsert(template, rules, rounds) {
  // console.log(rules);
  const counter = {};
  // build out counter
  for (const [insertion, rule] in rules) {
    counter[insertion] = 0;
  }

  // could improve speed with memoization?
  // key - pair+num / val - {} w/ memos
  const memo = {};

  for (let i = 0; i < template.length - 1; i++) {
    // grabs pair
    let pair = template[i] + template[i + 1];
    memo[`${pair}-${0}`] = insert(pair, 0);
    counter[template[i]] += 1;
  }

  counter[template[template.length - 1]] += 1;

  // recursively insert until rounds are over
  function insert(pair, round) {
    // base case: if rounds is max, exit
    if (round >= rounds) return;
    if (memo[`${pair}-${round}`]) return memo[`${pair}-${round}`];

    // console.log('inserting', pair, rules[pair], round);
    // add insertion to counter
    const insertion = rules[pair];
    counter[insertion] += 1;
    // build left & right paths
    const left = pair[0] + insertion;
    memo[`${left}-${round + 1}`] = insert(left, round + 1);
    const right = insertion + pair[1];
    memo[`${right}-${round + 1}`] = insert(right, round + 1);

    return 
  }

  console.log(counter);

  // determine score
  let maxCount = -Infinity;
  let maxVal = '';
  let minCount = Infinity;
  let minVal ='';
  for (const polymer in counter) {
    if (counter[polymer] > maxCount) {
      maxVal = polymer;
      maxCount = counter[polymer];
    }

    if (counter[polymer] < minCount) {
      minVal = polymer;
      minCount = counter[polymer];
    }
  }

  return maxCount - minCount;
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

const [sampleTemplate, sampleRules] = processData(processTextToArray('day14/sampleData.txt'));

// console.log('1 round', polymerTemplateInsert(sampleTemplate, sampleRules, 1), 'NCNBCHB');
// console.log('2 round', polymerTemplateInsert(sampleTemplate, sampleRules, 2), 'NBCCNBBBCBHCB');
// console.log('3 round', polymerTemplateInsert(sampleTemplate, sampleRules, 3),'NBBBCNCCNBBNBNBBCHBHHBCHB');
// console.log('4 round', polymerTemplateInsert(sampleTemplate, sampleRules, 4), 'NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB');

const polymer = polymerTemplateInsert(sampleTemplate, sampleRules, 40);
// console.log('polymer constructed');
console.log(polymer);

// const [polymerTemplate, insertionRules] = processData(processTextToArray('day14/data.txt'));
// console.log(polymerTemplateInsert(polymerTemplate, insertionRules, 10));
