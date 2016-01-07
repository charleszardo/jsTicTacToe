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
	
	function checkBoard() {
		
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