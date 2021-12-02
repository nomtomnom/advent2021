const fs = require('fs');
const path = require('path');

function processTextToArray(fileName) {
  // import data
  const dataRaw = fs.readFileSync(path.resolve(__dirname, fileName));
  // parse data from buffer
  const dataConcat = Buffer.from(dataRaw, 'utf8').toString();
  // return data split into arrays @ line breaks
  return dataConcat.split('\n');
}

module.exports = processTextToArray;