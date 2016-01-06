$(document).ready(function(){
	var playerTurn = true,
			computerSymbol = "x",
			humanSymbol = "o";
			
	$(".square").click(function(){
		if ($(this).hasClass("empty") && playerTurn) {
			$(this).removeClass("empty");
			$(this).addClass(humanSymbol);
			$(this).append("<p>" + humanSymbol + "</p>");
			playerTurn = false;
			checkBoard();
			computerTurn();
		}
	})
	
	function checkBoard() {
		
	}
	
	function computerTurn() {
		var empties = $("#board").find(".empty"),
				square = empties[Math.floor(Math.random()*empties.length)];
				$(square).removeClass("empty");
				$(square).addClass(humanSymbol);
				$(square).append("<p>" + computerSymbol + "</p>");
				playerTurn = true;
				checkBoard();
	}
})