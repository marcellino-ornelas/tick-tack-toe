const EventEmitter = require('events');

const BOARD_MAX_LENGTH = 9;
const BOARD_MAX_COL_LENGTH = 3;

class TickTackToe extends EventEmitter {
  constructor() {
    super(); //must call super for "this" to be defined.
    this.turn = 0;
    this.pieces = ['x', 'o'];
    this.board = [];
    this.hasEnded = false;

    this.on('move', () => {
      this.changeTurn();
    });
  }

  getId(square) {
    return square - 1;
  }

  _getOppTeamNumber() {
    return +!this.turn;
  }

  changeTurn() {
    return (this.turn = this._getOppTeamNumber());
  }

  isValidMove(square) {
    square = this.getId(square);
    return square >= 0 && BOARD_MAX_LENGTH > square && !this.board[square];
  }

  addToBoard(square) {
    var id = this.getId(square);

    var piece = this.getPiece();
    this.board[id] = piece;

    this.emit('move', id);
  }

  getOpp() {
    return this.pieces[this._getOppTeamNumber()];
  }

  getPiece() {
    return this.pieces[this.turn];
  }

  gameOver(tie) {
    this.hasEnded = true;

    let winner = tie ? 'tie' : this.getOpp();

    this.emit('gameover', winner);
  }

  checkRows(piece) {
    // rows
    for (let i = 0; i < BOARD_MAX_LENGTH; i += 3) {
      let level = true;
      for (let j = 0, idx = i; j < BOARD_MAX_COL_LENGTH; j++, idx++) {
        if (piece !== this.board[idx]) {
          level = false;
          break;
        }
      }

      if (level) {
        return true;
      }
    }

    return false;
  }

  checkCols(piece) {
    // cols
    for (let i = 0; i < BOARD_MAX_COL_LENGTH; i++) {
      let level = true;
      for (let idx = i; idx < BOARD_MAX_LENGTH; idx += 3) {
        if (piece !== this.board[idx]) {
          level = false;
          break;
        }
      }
      if (level) {
        return true;
      }
    }
    return false;
  }

  checkDiagnoals(piece) {
    var compare = item => {
      return this.board[item] === piece;
    };

    return every([0, 4, 8], compare) || every([2, 4, 6], compare);
  }

  checkGame() {
    var type = null;
    var piece = this.getOpp();

    var isTie = this.board.length === 9 && every(this.board);

    if (isTie) {
      return this.gameOver(true);
    }

    if (
      this.checkRows(piece) ||
      this.checkCols(piece) ||
      this.checkDiagnoals(piece)
    ) {
      this.gameOver();
    }

    return this.hasEnded;
  }
}

/*
 * Helper functions
*/
function every(arr, fn) {
  for (var i = 0; i < arr.length; i++) {
    var cantPass = fn ? !fn(arr[i]) : !arr[i];
    if (cantPass) {
      return false;
    }
  }

  return true;
}

module.exports = TickTackToe;
