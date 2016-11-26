class TTTNode {
  constructor(board, next_mover, other_player, prev_move_pos = null) {
    this.board = board;
    this.next_mover = next_mover;
    this.other_player = other_player;
    this.prev_move_pos = prev_move_pos;
  }

  children() {
    return this.emptyPositions().map(pos => {
      let test_board = this.board.dupBoard(),
          new_next_mover = this.other_player,
          new_node;

      test_board.grid[pos[0]][pos[1]] = this.next_mover;

      new_node = new TTTNode(test_board, new_next_mover, this.next_mover, pos);
      return new_node;
    });
  }

  losingNode(evaluator) {
    if (this.board.checkWin()) {
      if (this.board.getWinner()) {
        return evaluator != this.board.getWinner();
      } else {
        return false;
      }
    }

    if (evaluator === this.next_mover) {
      return this.children().every(child => {
        child.losingNode(evaluator);
      });
    } else {
      return this.children().some(child => {
        child.losingNode(evaluator);
      });
    }
  }

  winningNode(evaluator) {
    if (this.board.checkWin()) {
      return evaluator === this.board.getWinner();
    }

    if (evaluator === this.next_mover) {
      return this.children().some(child => {
        child.winningNode(evaluator);
      });
    } else {
      return this.children().every(child => {
        child.winningNode(evaluator);
      });
    }
  }

  emptyPositions() {
    let empty_positions = [];

    this.board.grid.forEach((row, row_idx) => {
      row.forEach((col, col_idx) => {
        if (!this.board.grid[row_idx][col_idx]) {
          empty_positions.push([row_idx, col_idx])
        }
      });
    });

    return empty_positions;
  }
}
