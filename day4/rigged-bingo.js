const processTextToArray = require('../processTextToArray');

function bingo(nums, boards) {
  let winCounter = 0;
  // iterate through nums
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    // for each num: iterate through boards
    for (let j = 0; j < boards.length; j++) {
      const board = boards[j];
      // for each board: iterate through board values, check if number matches
      // if number matches, change it to -1
      const coords = checkBoard(board, num);
      // check if there is a BINGO
      if (coords) {
        const bingo = checkBingo(board, coords[0], coords[1]);
        if (bingo && winCounter === boards.length - 1) {
          return calculateScore(board, num)
        } else if (bingo) {
          winCounter++;
          boards[j] = [];
        }
      }
    }
  }
  
  return 'No Bingos!';
}

// // sample data
// const sampleNums = processNums(processTextToArray('day4/numbersSample.txt'));
// const sampleBoards = processBoards(processTextToArray('day4/boardsSample.txt'));
// console.log('sample', bingo(sampleNums, sampleBoards));

// actual data
const numbers = processNums(processTextToArray('day4/numbers.txt'));
const boards = processBoards(processTextToArray('day4/boards.txt'));
console.log(bingo(numbers, boards));

/*
iterates through a given bingo board and compares values to a given num
if num is found, it is "marked" as -1, and the coordinates are returned as [x, y]
*/
function checkBoard(board, num) {
  // iterate through each value of board and compare to num
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === num) {
        board[y][x] = -1;
        return [x, y];
      }
    }
  }

  return false;
}

// console.log('checkBoard for 70 = true', checkBoard([
//   [ -1, 62, 76, 78, 95 ],
//   [ 64, 65, 36, 58, 22 ],
//   [ 7, 21, 70, 93, 42 ],
//   [ 79, 99, 9, 89, 10 ],
//   [ 6, 5, 33, 92, 72 ]
// ], 70));

// console.log('checkBoard for 71 = false', checkBoard([
//   [ -1, 62, 76, 78, 95 ],
//   [ 64, 65, 36, 58, 22 ],
//   [ 7, 21, 69, 93, 42 ],
//   [ 79, 99, 9, 89, 10 ],
//   [ 6, 5, 33, 92, 72 ]
// ], 71 ));

// two checks: all values if x is same, all values if y is same
// if a BINGO is found, return the bingo value
function checkBingo(board, x, y) {
  let bingo = false;
  
  // check X
  for (let i = 0; i < board.length; i++) {
    // break loop if we encounter an unmarked value
    if (board[y][i] !== -1) break;
    // at our final value, if we have not broken out of the loop, we found a bingo
    if (i === board.length - 1) bingo = true;
  }

  // return early if we have a bingo
  if (bingo) return bingo;

  // check Y
  for (let i = 0; i < board.length; i++) {
    // break loop if we encounter an unmarked value
    if (board[i][x] !== -1) break;
    // at our final value, if we have not broken out of the loop, we found a bingo
    if (i === board.length - 1) bingo = true;
  }

  return bingo;
}

// checking bingos
// console.log('bingo is false', checkBingo([
//   [ -1, 62, 76, 78, 95 ],
//   [ 64, 65, 36, 58, 22 ],
//   [ 7, 21, 98, 93, 42 ],
//   [ 79, 99, 9, 89, 10 ],
//   [ 6, 5, 33, 92, 72 ]
// ], 0, 0));

// console.log('bingo is true Y', checkBingo([
//   [ -1, 62, 76, 78, 95 ],
//   [ -1, 65, 36, 58, 22 ],
//   [-1, 21, 98, 93, 42 ],
//   [ -1, 99, 9, 89, 10 ],
//   [ -1, 5, 33, 92, 72 ]
// ], 0, 0));

// console.log('bingo is true X', checkBingo([
//   [ -1, -1, -1, -1, -1 ],
//   [ -1, 65, 36, 58, 22 ],
//   [20, 21, 98, 93, 42 ],
//   [ -1, 99, 9, 89, 10 ],
//   [ -1, 5, 33, 92, 72 ]
// ], 0, 0));

function calculateScore(board, num) {
  // sum of all unmarked numbers on board
  let boardSum = 0;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] >= 0) boardSum += board[i][j];
    }
  }
  // multiply by num
  console.log('score!', boardSum, num);
  return boardSum * num;
}

// sums all nums & returns value
// console.log(calculateScore([
//   [ 88, 62, 76, 78, 95 ],
//   [ 64, 65, 36, 58, 22 ],
//   [ 7, 21, 98, 93, 42 ],
//   [ 79, 99, 9, 89, 10 ],
//   [ 6, 5, 33, 92, 72 ]
// ], 10));

// double-checking to make sure its less
// console.log(calculateScore([
//   [ -1, 62, 76, 78, 95 ],
//   [ -1, 65, 36, 58, 22 ],
//   [-1, 21, 98, 93, 42 ],
//   [ -1, 99, 9, 89, 10 ],
//   [ -1, 5, 33, 92, 72 ]
// ], 10));

function processNums(numsStr) {
  const numsArr = numsStr[0].split(',');
  return numsArr.map(el => Number(el));
}

// console.log(processNums(processTextToArray('day4/numbers.txt')))

function processBoards(data) {
  const boards = [];
  // sub-board: will hold a 2D array of items
  let board = [];

  // let count = 0;

  for (let i = 0; i < data.length; i++) {
    // if data at index is an empty string, continue
    if (data[i] === '') continue;

    // else if data contains string of numbers
    // split numberstrs up into array & transform into Numbers
    // push to board
    const numbers = [];
    
    data[i].split(' ').forEach(el => {
      if (el) numbers.push(Number(el));
    });

    board.push(numbers);

    // if board has length 5, push to boards & reset
    if (board.length === 5) {
      boards.push(board);
      board = [];
    }

    // count++;
    // if (count > 30) break;
  }

  return boards;
}


// console.log(processBoards(processTextToArray('day4/boards.txt')));
