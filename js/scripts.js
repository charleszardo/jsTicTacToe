$(document).ready(function(){
	var playerTurn = true,
			computerSymbol = "x",
			humanSymbol = "o";
			
	$(".square").click(function(){
		if ($(this).hasClass("empty") && playerTurn) {
			move(this, humanSymbol)
			computerTurn();
		}
	})
	
	function move(square, symbol) {
		var color;
		if (playerTurn) {
			color = "red";
		} else {
			color = "blue";
		}
		$(square).removeClass("empty");
		$(square).addClass(symbol);
		$(square).css('background-color', color)
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