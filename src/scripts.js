class Board {
	constructor() {
		this.grid = [[null, null, null],
								 [null, null, null],
								 [null, null, null]];
		this.el = $(".board");
	}
	
	updateDisplay() {
		let i,
				j,
				square,
				player,
				color;
		
		for (i = 0; i < this.grid.length; i++) {
			for (j = 0; j < this.grid.length; j++) {
				if (this.grid[i][j] !== null) {
					square = "#" + (i * 3 + j);
					player = this.grid[i][j];
					color = player.color;
					$(square).css('background-color', color);
				}
			}
		}
	}
	
	isFull() {
		let full = true;
		
		this.grid.forEach(row => {
			row.forEach(cell => {
				if (cell === null) {
					full = false;
				}
			})
		})
		
		return full;
	}
	
	dupBoard() {
		let b = new Board();
		b.grid = $.extend(true, [], this.grid);
		return b;
	}
	
	hide() {
		this.el.hide();
	}
	
	show() {
		this.el.show();
	}
	
	resetDisplay() {
		$(".square").each(sq => {
			$(`#${sq}`).css("background-color", "");
		});
	}
	
	reset() {
		this.grid = [[null, null, null],
								 [null, null, null],
								 [null, null, null]];
		this.resetDisplay();
		this.updateDisplay();
		this.show();
	}
}

class Game {
	constructor(player1, player2, board) {
		this.player1 = player1;
		this.player2 = player2;
		this.board = board;
		this.currentPlayer = null;
		this.inPlay = false;
		this.winner = null;
		this.handlers = false;
		this.colors = ["blue", "red"]
	}
	
	init() {
		this.player1.addToGame(this, this.colors[0]);
		this.player2.addToGame(this, this.colors[1]);
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

class Player {
	constructor() {
		this.handler = false;
		this.myTurn = false;
		this.game;
		this.color;
	}
	
	init() {
		if (!this.handler) {
			this.initClickHandler();
		}
	}
	
	addToGame(_game, _color) {
		this.game = _game;
		this.color = _color;
	}
	
	initClickHandler() {
		const that = this;
		
		this.handler = true;
		
		$(".square").click(_square => {
			const square = _square.toElement.id,
						coords = that.numToCoords(square),
						game = that.game;

			if (game &&
				  game.inPlay &&
				  this.myTurn &&
					game.board.grid[coords[0]][coords[1]] === null) {
							game.move(square, game.currentPlayer);
							this.myTurn = false;
							game.roundOver();
						}
			});
	}
	
	numToCoords(num) {
		const x = Math.floor(num/3),
					y = num % 3;

		return [x,y];
	}
	
	move() {
		this.myTurn = true;
	}
}

class ComputerPlayer {
	constructor() {
		this.game;
		this.color;
	}
	
	addToGame(_game, _color) {
		this.game = _game;
		this.color = _color;
	}
	
	selectMove() {
		return [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)];
	}
	
	move() {
		let selection = null,
				x,
				y;
				
		const that = this;

		while (selection === null) {
			[x, y] = this.selectMove();

			if (this.game.board.grid[x][y] === null) {
				selection = x * 3 + y;
			}
		}

		setTimeout(() => {
			that.game.move(selection, that.game.currentPlayer);
			that.game.roundOver();
		}, 1000);
	}
	
	smartMove(_player1, _player2, _board, _currentPlayer) {
		let player1 = _player1,
			  player2 = _player1,
					board = _board,
	currentPlayer = _currentPlayer,
							i,
							j;
							
		function toggleCurrentPlayer() {
			if (currentPlayer === player1) {
				return player2;
			} else {
				return player1;
			}
		}
							
		for (i = 0; i < board.grid.length; i++) {
			for (j = 0; j < board.grid.length; j++) {
				if (board.grid[i][j] === null) {
					let boardDup = board.dupBoard(),
							gameDup = new Game(),
							newCurrentPlayer,
							pathObjs;

					boardDup.grid[i][j] = currentPlayer;
					gameDup.board = boardDup;
					if (gameDup.checkWin(boardDup.grid)) {
						console.log("win!")
						return { sequence: [[i, j]],
						           winner: currentPlayer
						       };
					} else if (boardDup.isFull()) {
						console.log("tie!")
						return { sequence: [[i, j]],
											 winner: null
									 };
					} else {
						newCurrentPlayer = toggleCurrentPlayer();
						pathObjs = this.smartMove(player1, player2, boardDup, newCurrentPlayer);
						console.log(pathObjs);
						pathObjs.forEach(obj => {
							obj.sequence.push([i,j]);
						})
						console.log(pathObjs);
						return pathObjs;
						// pathObj = { sequence: [[i, j]],
						// 					 winner: null
						// 			 };
						// 			 console.log(pathObj.sequence);
						// 			 pathObj.sequence.push([i,j])
						// 			 console.log(pathObj.sequence);
					}
				}
			}
		}					
	}
}

$(document).ready(() => {
	let b = new Board();
  let p = new Player();
	let c = new ComputerPlayer();
	let g = new Game(p, c, b);
	c.smartMove(p, c, b, c);
	// p.init();
	// g.init();
});