class Game {
	constructor(player1, player2, board, player1Color, player2Color) {
		this.player1 = player1;
		this.player2 = player2;
		this.board = board;
		this.currentPlayer = null;
		this.inPlay = false;
		this.winner = null;
		this.handlers = false;
		this.player1Color = player1Color;
		this.player2Color = player2Color;
	}

	init() {
		this.player1.addToGame(this, this.player1Color, this.player2);
		this.player2.addToGame(this, this.player2Color, this.player1);
		this.inPlay = true;
		this.determineInitPlayer();
		this.initHandlers();
		this.currentPlayer.move();
	}

	determineInitPlayer() {
		let coin = Math.floor(Math.random() * 2);

		if (coin) {
			this.currentPlayer = this.player1;
		} else {
			this.currentPlayer = this.player2;
		}
	}

	move(loc, symbol) {
		const row = Math.floor(loc/3),
					cell = loc % 3;

		this.board.grid[row][cell] = symbol;
		this.board.updateDisplay();
	}

	switchPlayers() {
		if (this.currentPlayer === this.player1) {
			this.currentPlayer = this.player2;
		} else {
			this.currentPlayer = this.player1;
		}
		this.currentPlayer.move();
	}

	roundOver() {
		if (this.board.checkWin()) {
			this.inPlay = false;
			this.winner = this.board.getWinner();
			this.gameOver();
		} else {
			this.switchPlayers();
		}
	}

	gameOver() {
		let text;

		if (this.winner === this.player1) {
			text = "player 1 wins!";
		} else if (this.winner === this.player2) {
			text = "player 2 wins!";
		} else {
			text = "draw!";
		}

		$(".winner-phrase").html(text);
		this.board.hide();
		$(".game-over").toggle();
	}

	initHandlers() {
		const that = this;

		this.handlers = true;

		$(".play-again").click(_button => {
			if (!that.inPlay) {
				that.reset();
			}
		});
	}

	reset() {
		$(".game-over").toggle();
		this.board.reset();
		this.winner = null;
		this.inPlay = true;
		this.determineInitPlayer();
		this.currentPlayer.move();
	}
}
