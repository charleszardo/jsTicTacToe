$(document).ready(function(){
	var playerTurn = true,
			computerSymbol = "x",
			humanSymbol = "o",
			board = [[null, null, null],
							 [null, null, null],
							 [null, null, null]],
			colors = {"x": "blue", "o": "red"};
			
	$(".square").click(function(){
		if ($(this).hasClass("empty") && playerTurn) {
			move(this, humanSymbol)
			computerTurn();
		}
	})
	
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
	
	updateDisplay();
	
	function move(square, symbol) {		
		var loc = square.id,
				row = Math.floor(loc/3),
			 cell = loc % 3;
		board[row][cell] = symbol;
		updateDisplay();	 
		playerTurn = !playerTurn;
		checkBoard();
	}
	
	function checkBoard() {
		
	}
	
	function computerTurn() {
		var empties = $("#board").find(".empty"),
				square = empties[Math.floor(Math.random()*empties.length)];
				move(square, computerSymbol)
	}
})