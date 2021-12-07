const fs = require('fs');
const path = require('path');

function processNumsToArray(fileName) {
  // import data
  const dataRaw = fs.readFileSync(path.resolve(__dirname, fileName));
  // parse data from buffer
  const dataConcat = Buffer.from(dataRaw, 'utf8').toString();
  // return data split into arrays @ ,
  const array = dataConcat.split(',');
  // convert data to number type
  return array.map(el => Number(el));
}

module.exports = processNumsToArray;