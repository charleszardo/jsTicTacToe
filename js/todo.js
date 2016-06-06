// play: function () {
// 	while (!this.gameOver) {
// 		this.round();
// 		this.gameOver = true;
// 	}
// 	console.log('game over');
// 	console.log(winner(board));
// },

// function copyBoard(board) {
// 	var newBoard = [[null, null, null],
// 						 [null, null, null],
// 						 [null, null, null]]
//
// 	for (var i=0; i < board.length; i++) {
// 		for (var j=0; j < board.length; j++) {
// 			var val = board[i][j];
// 			newBoard[i][j] = val;
// 		}
// 	}
//
// 	return newBoard;
// }

// function printBoard(board) {
// 	var str = ""
// 	for (var i=0; i < board.length; i++) {
// 		for (var j=0; j < board.length; j++) {
// 			var val = board[i][j];
// 			str += val;
// 		}
// 		str += " | ";
// 	}
// 	console.log(str);
// }

// function smartMove(board, simPlayer, basePlayer) {
// 	printBoard(board);
// 	for (var i=0; i < board.length; i++) {
// 		for (var j=0; j < board.length; j++) {
// 			if (!board[i][j]) {
// 				board[i][j] = simPlayer;
// 				if (win(board)) {
// 					if (winner(board) == basePlayer) {
// 						return [i, j]
// 					} else {
// 						// losing position, do nothing
// 					}
// 				} else {
// 					var nextPlayer = switchPlayers(simPlayer);
// 					smartMove(board, nextPlayer, basePlayer);
// 				}
// 			}
// 		}
// 	}
// }