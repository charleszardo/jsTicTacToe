$(document).ready(function(){
	var computer = 0,
			human = 1,
			currentPlayer = human,
			board = [[null, null, null],
							 [null, null, null],
							 [null, null, null]],
			colors = {0: "blue", 1: "red"};

	$(".square").click(function(){
		var num = this.id,
		 coords = numToCoords(num);
		if (currentPlayer === 1 && !board[coords[0]][coords[1]]) {
			move(this.id, human)
			computerTurn();
		}
	})
	
	function copyBoard(board) {
		var newBoard = [[null, null, null],
							 [null, null, null],
							 [null, null, null]]
		
		for (var i=0; i < board.length; i++) {
			for (var j=0; j < board.length; j++) {
				var val = board[i][j];
				newBoard[i][j] = val;
			}
		}
		
		return newBoard;
	}
	
	function switchPlayers(currentPlayer) {
		if (currentPlayer == 1) {
			return 0;
		} else {
			return 1;
		}
	}
	
	function printBoard(board) {
		var str = ""
		for (var i=0; i < board.length; i++) {
			for (var j=0; j < board.length; j++) {
				var val = board[i][j];
				str += val;
			}
			str += " | ";
		}
		console.log(str);
	}
	
	function smartMove(board, simPlayer, basePlayer) {
		printBoard(board);
		for (var i=0; i < board.length; i++) {
			for (var j=0; j < board.length; j++) {
				if (!board[i][j]) {
					board[i][j] = simPlayer;
					if (win(board)) {
						if (winner(board) == basePlayer) {
							return [i, j]
						} else {
							// losing position, do nothing
						}
					} else {
						var nextPlayer = switchPlayers(simPlayer);
						smartMove(board, nextPlayer, basePlayer);
					}
				}
			}
		}
	}
	
	// smartMove(board, computer, computer)

	function numToCoords(num) {
		var x = Math.floor(num/3),
		y = num % 3;
		
		return [x,y];
	}
	
	function coordsToNum(coords) {
		var x = coords[0],
				y = coords[1];
		
		return x * 3 + y;
	}
	
	function updateDisplay() {
		for (var i=0; i < board.length; i++) {
			for (var j=0; j < board.length; j++) {
				if (board[i][j] !== null) {
					var square = "#" + (i * 3 + j),
							symbol = board[i][j],
							color = colors[symbol];
					$(square).css('background-color', color)
				}
			}
		}
	}
	
	function move(loc, symbol) {
		var row = Math.floor(loc/3),
			 cell = loc % 3;
			 
		board[row][cell] = symbol;
		updateDisplay();
		checkBoard(board);	 
		currentPlayer = switchPlayers(currentPlayer);
		
	}
	
	function win(board) {
		var cols = [[], [], []],
				diag = [[board[0][0], board[1][1], board[2][2]],
							  [board[0][2], board[1][1], board[2][0]]],
				 win = false,
				 remaining;
		board.forEach(function(row) {
			if (winningSet(row)) {
				win = true;
			} else {
				[0, 1, 2].forEach(function(idx) {
					cols[idx].push(row[idx]);
				})
			}
		})

		if (!win) {
			remaining = cols.concat(diag);
			remaining.forEach(function(set) {
				if (winningSet(set)) {
					win = true;
				}
			})
		}
		
		return win;
	}
	
	function winningSet(set) {
		return set[0] === set[1] === set[2];
	}
	
	function winner(board) {
		return currentPlayer;
	}
	
	function checkBoard(board) {
		if (win(board)) {
			alert('game over!')
			console.log(winner(board));
		}
	}
	
	function computerTurn() {
		var selection;
		
		while (!selection) {
			var x = Math.floor(Math.random() * 3),
					y = Math.floor(Math.random() * 3);
			
			if (!board[x][y]) {
				selection = x * 3 + y;
			}
 		}

		move(selection, computer)
	}
})