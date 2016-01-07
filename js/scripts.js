$(document).ready(function(){
	var playerTurn = true,
			computerSymbol = "x",
			humanSymbol = "o",
			board = [[null, null, null],
							 [null, null, null],
							 [null, null, null]],
			colors = {"x": "blue", "o": "red"};
			
	$(".square").click(function(){
		var num = this.id,
		 coords = numToCoords(num);
		 
		if (playerTurn && !board[coords[0]][coords[1]]) {
			move(this.id, humanSymbol)
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
		if (currentPlayer == "x") {
			return "o";
		} else {
			return "x";
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
	
	function smartMove(board, currentPlayer, basePlayer) {
		printBoard(board);
		for (var i=0; i < board.length; i++) {
			for (var j=0; j < board.length; j++) {
				if (!board[i][j]) {
					board[i][j] = currentPlayer;
					if (win(board)) {
						if (winner(board) == basePlayer) {
							return [i, j]
						} else {
							// losing position, do nothing
						}
					} else {
						var nextPlayer = switchPlayers(currentPlayer);
						smartMove(board, nextPlayer, basePlayer);
					}
				}
			}
		}
	}
	
	smartMove(board, computerSymbol, computerSymbol)

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
				if (board[i][j]) {
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
		playerTurn = !playerTurn;
		checkBoard();
	}
	
	function win(board) {
		
	}
	
	function winner(board) {
		
	}
	
	function checkBoard(board) {
		
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

		move(selection, computerSymbol)
	}
})