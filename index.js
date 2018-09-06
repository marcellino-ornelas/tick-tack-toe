const readline = require('readline');
const TickTackToe = require('./tick-tack-toe.js');

const game = new TickTackToe();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'TickTackToe>'
});

game.on('gameover', function(winner) {
  clear();
  rl.write(`\
===========
Winner: ${winner}
===========\n`);

  rl.close();
});

game.on('move', function(squareId) {
  if (!game.checkGame()) {
    printBoard();
  }
});

const intro = `\
Welcome To Tick Tack Toe\n\
===========================
`;

printBoard();

function printBoard() {
  clear();
  const square = num => game.board[num] || num + 1;
  rl.write(intro);
  rl.write(
    '\n' +
      ' ' +
      square(0) +
      ' | ' +
      square(1) +
      ' | ' +
      square(2) +
      '\n' +
      ' ---------\n' +
      ' ' +
      square(3) +
      ' | ' +
      square(4) +
      ' | ' +
      square(5) +
      '\n' +
      ' ---------\n' +
      ' ' +
      square(6) +
      ' | ' +
      square(7) +
      ' | ' +
      square(8) +
      '\n\n'
  );
  ask();
}

function clear() {
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
}

function ask() {
  rl.question(`${game.getPiece()} turn to move: `, function(line) {
    if (/^\d$/.test(line) && game.isValidMove(+line)) {
      game.addToBoard(+line);
    } else {
      rl.write('please enter a valid square\n');
      ask();
    }
  });
}
