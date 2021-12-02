const processTextToArray = require('../processTextToArray');

// Calculate the horizontal position and depth you would have after following the planned course. What do you get if you multiply your final horizontal position by your final depth?

// coords: depth, "horizontal" (1D forward/backward), aim
function travel(commands, x = 0, y = 0) {

  for (let i = 0; i < commands.length; i++) {
    const [direction, value] = commands[i];
    if (direction === 'forward') {
      // It increases your depth by your aim multiplied by X
      x += value;
    } else if (direction === 'down') {
      // add "depth" AIM
      y += value;
    } else if (direction === 'up') {
      // subtract "depth" AIM
      y -= value;
    } else {
      console.log('invalid direction', direction, value);
    }
  }

  return [x, y];
}

// takes a command such as 'forward 5' and splits it into a tuple
function splitCommand(command) {
  const [direction, value] = command.split(' ');
  return [direction, Number(value)];
}

function multiplyTuple(tuple) {
  return tuple[0] * tuple[1];
}

const sampleCommands = [`forward 5`, `down 5`, 'forward 8', 'up 3', 'down 8', 'forward 2'];
// After following these instructions, you would have a horizontal position of 15 and a depth of 10. (Multiplying these together produces 150.)

// const finalCoordsSample = travel(sampleCommands.map(el => splitCommand(el)));
// console.log(finalCoordsSample); // [15, 10]
// console.log(multiplyTuple(finalCoordsSample)); // 150

const finalCoords = travel(processTextToArray('day2/input.txt').map(el => splitCommand(el)));
console.log(finalCoords);
console.log(multiplyTuple(finalCoords));