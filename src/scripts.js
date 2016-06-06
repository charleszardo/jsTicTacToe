class Game {
	constructor() {
		this.computerSym = 0;
		this.humanSym = 1;
		this.currentPlayer = null;
		this.board = [[null, null, null],
									[null, null, null],
									[null, null, null]];
		this.colors = {0: "blue", 1: "red"};
		this.inPlay = false;
	  this.handler = false;
		this.winner = null;
	}
	
	init() {
		if (!this.handler) {
			this.initClickHandler();
		}
		
		this.inPlay = true;
		this.currentPlayer = Math.floor(Math.random() * 2);
		if (this.currentPlayer === this.computerSym) {
			this.computerTurn();
		}
	}
	
	initClickHandler() {
		const that = this;
		
		this.handler = true;
		
		$(".square").click(_square => {
			const square = _square.toElement.id,
			      coords = that.numToCoords(square);
			
			if (that.inPlay &&
						that.currentPlayer === that.humanSym &&
						that.board[coords[0]][coords[1]] === null) {
							that.move(square, that.humanSym);
							that.roundOver();
					}
		});
	}
	
	numToCoords(num) {
		const x = Math.floor(num/3),
					y = num % 3;

		return [x,y];
	}
	
	computerTurn() {
		let selection = null,
				x,
				y;
				
		const that = this;

		while (selection === null) {
			x = Math.floor(Math.random() * 3);
		  y = Math.floor(Math.random() * 3);

			if (this.board[x][y] === null) {
				selection = x * 3 + y;
			}
 		}
		
		setTimeout(() => {
			that.move(selection, that.computerSym);
			that.roundOver();
		}, 1000);
	}
	
	move(loc, symbol) {
		const row = Math.floor(loc/3),
					cell = loc % 3;

		this.board[row][cell] = symbol;
		this.updateDisplay();
	}
	
	updateDisplay() {
		let i,
				j,
				square,
				symbol,
				color;
		
		for (i = 0; i < this.board.length; i++) {
			for (j = 0; j < this.board.length; j++) {
				if (this.board[i][j] !== null) {
					square = "#" + (i * 3 + j),
					symbol = this.board[i][j],
					color = this.colors[symbol];
					$(square).css('background-color', color)
				}
			}
		}
	}
	
	switchPlayers() {
		if (this.currentPlayer === 1) {
			this.currentPlayer = 0;
			this.computerTurn();
		} else {
			this.currentPlayer = 1;
		}
	}
	
	roundOver() {
		if (this.checkWin(this.board)) {
			this.inPlay = false;
			this.determineWinner();
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
			} else {
				[0, 1, 2].forEach(idx => cols[idx].push(row[idx]));
			}
		});

		if (!win) {
			remaining = cols.concat(diag);
			remaining.forEach(set => {
				if (that.winningSet(set)) {
					win = true;
				}
			});
		}

		return win;
	}
	
  winningSet(set) {
		return set[0] !== null && set[0] === set[1] && set[1] === set[2];
	}
	
	determineWinner() {
		this.winner = this.currentPlayer;
	}
	
	gameOver() {
		let text;
		
		if (this.winner) {
			text = "you win!";
		} else {
			text = "you lose!";
		}
		
		$(".winner-phrase").html(text);
		$("#game-over").show();
	}
}

$(document).ready(() => new Game().init());