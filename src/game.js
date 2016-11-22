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
		if (this.checkWin(this.board.grid)) {
			this.inPlay = false;
			this.determineWinner();
			this.gameOver();
		} else if (this.board.isFull()) {
			this.inPlay = false;
			this.determineWinner(true);
			this.gameOver();
		} else {
			this.switchPlayers();
		}
	}

	checkWin(board) {
		let cols = [[], [], []],
				diag = [[board[0][0], board[1][1], board[2][2]],
								[board[0][2], board[1][1], board[2][0]]],
				win = false,
				remaining;

		const that = this;

		board.forEach(row => {
			if (that.winningSet(row)) {
				win = true;
				this.winner = row[0];
			} else {
				[0, 1, 2].forEach(idx => cols[idx].push(row[idx]));
			}
		});

		if (!win) {
			remaining = cols.concat(diag);

			remaining.forEach(set => {
				if (that.winningSet(set)) {
					win = true;
					this.winner = set[0];
				}
			});
		}

		return win;
	}

  winningSet(set) {
		return set[0] !== null && set[0] === set[1] && set[1] === set[2];
	}

	determineWinner(tie=false) {
		if (!tie) {
			this.winner = this.currentPlayer;
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
		$(".game-over").show();
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
		$(".game-over").hide();
		this.board.reset();
		this.winner = null;
		this.inPlay = true;
		this.determineInitPlayer();
		this.currentPlayer.move();
	}
}
