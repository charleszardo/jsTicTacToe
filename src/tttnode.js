class TTTNode {
  constructor(board, next_mover_mark, prev_move_pos = null) {
    this.board = board;
    this.next_mover_mark = next_mover_mark;
    this.prev_move_pos = prev_move_pos;
  }

  children() {
    let children = [];
    this.board.grid.forEach((row, row_idx) => {
      row.forEach((col, col_idx) => {
        if (!col) {
          children.push([row_idx, col_idx]);
        }
      })
    });

    return children;
  }
}
