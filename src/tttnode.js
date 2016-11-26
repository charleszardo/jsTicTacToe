class TTTNode {
  constructor(board, next_mover, other_player, prev_move_pos = null) {
    this.board = board;
    this.next_mover = next_mover;
    this.other_player = other_player;
    this.prev_move_pos = prev_move_pos;
  }

  children() {
    return this.empty_positions().map(pos => {
      let test_board = this.board.dupBoard(),
          new_next_mover = this.other_player,
          new_node;

      test_board.grid[pos[0]][pos[1]] = this.next_mover;

      new_node = new TTTNode(test_board, new_next_mover, this.next_mover, pos);
      return new_node;
    });
  }

  losing_node(evaluator) {
    if (board.checkWin()) {
      if (board.getWinner()) {
        return evaluator != board.getWinner();
      } else {
        return false;
      }
    }

    if (evaluator === next_mover) {
      return this.children.every(child => {
        child.losing_node(evaluator);
      });
    } else {
      return this.children.some(child => {
        child.losing_node(evaluator);
      });
    }
  }

  winning_node(evaluator) {
    if (board.checkWin()) {
      return evaluator === board.getWinner();
    }

    if (evaluator === next_mover) {
      return this.children.some(child => {
        child.winning_node(evaluator);
      });
    } else {
      return this.children.every(child => {
        child.winning_node(evaluator);
      });
    }
  }

  empty_positions() {
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
