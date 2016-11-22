class Player {
	constructor() {
		this.game;
		this.color;
	}

	addToGame(_game, _color, _opponent) {
		this.game = _game;
		this.board = _game.board;
		this.color = _color;
		this.opponent = _opponent;
	}
}

class HumanPlayer extends Player {
	constructor() {
		super();
		this.handler = false;
		this.myTurn = false;
	}

	init() {
		if (!this.handler) {
			this.initClickHandler();
		}
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

class ComputerPlayer extends Player {
	constructor() {
		super();
	}

	moveArrToDig(move) {
		return move[0] * 3 + move[1];
	}

	move() {
		let winningMoves = [],
				protectMoves = [],
				otherMoves = [],
				that = this,
				move,
				i,
				j;

		for (i = 0; i < this.board.grid.length; i++) {
			for (j = 0; j < this.board.grid.length; j++) {
				if (this.board.grid[i][j] === null) {
					let boardDup = this.board.dupBoard(),
							gameDup = new Game();

					boardDup.grid[i][j] = this;
					gameDup.board = boardDup;

					if (gameDup.checkWin(boardDup.grid) && gameDup.winner === this) {
						winningMoves.push([i, j]);
					}

					boardDup.grid[i][j] = this.opponent;

					if (gameDup.checkWin(boardDup.grid) && gameDup.winner === this.opponent) {
						protectMoves.push([i, j]);
					} else {
						otherMoves.push([i, j]);
					}
				}
			}
		}

		move = winningMoves.concat(protectMoves).concat(otherMoves)[0];
		move = this.moveArrToDig(move);

		console.log(move);

		setTimeout(() => {
			that.game.move(move, that.game.currentPlayer);
			that.game.roundOver();
		}, 1000);
	}

	smartMove2(_player1, _player2, _board, _currentPlayer) {
		// console.log(_board.grid);
		let player1 = _player1,
			  player2 = _player1,
					board = _board,
	currentPlayer = _currentPlayer,
			 allPaths = [],
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
				let pathSet = []

				if (board.grid[i][j] === null) {
					console.log([i,j])
					let boardDup = board.dupBoard(),
							gameDup = new Game(),
							newCurrentPlayer,
							paths;

					boardDup.grid[i][j] = currentPlayer;
					gameDup.board = boardDup;
					if (gameDup.checkWin(boardDup.grid)) {
						console.log("win!")
						pathSet.push({ sequence: [[i, j]],
						           winner: currentPlayer
						       });
					} else if (boardDup.isFull()) {
						console.log("tie!")
						pathSet.push({ sequence: [[i, j]],
											 winner: null
									 });
					} else {
						newCurrentPlayer = toggleCurrentPlayer();
						paths = this.smartMove(player1, player2, boardDup, newCurrentPlayer);
						paths = [].concat.apply([], paths);
						console.log('paths:');
						console.log(paths);
						paths.forEach(obj => {
							console.log('obj:');
							console.log(obj);
							obj.sequence.push([i,j]);
						})
						pathSet.push(paths);
					}
					pathSet = [].concat.apply([], pathSet);
					console.log('pathSet:');
					console.log(pathSet);
					allPaths.push(pathSet);
				}
			}
		}

		console.log('allPaths:');
		console.log(allPaths);
		allPaths = [].concat.apply([], allPaths);
		return allPaths;
	}
}

class DumbComputerPlayer extends ComputerPlayer {
	constructor() {
		super();
	}

	move() {
		let availableMoves = [],
				that = this,
				i,
				j,
				move;

		for (i = 0; i < this.board.grid.length; i++) {
			for (j = 0; j < this.board.grid.length; j++) {
				if (this.board.grid[i][j] === null) {
					availableMoves.push([i, j]);
				}
			}
		}

		move = availableMoves[Math.floor(Math.random()*availableMoves.length)];
		move = this.moveArrToDig(move);

		console.log(move);

		setTimeout(() => {
			that.game.move(move, that.game.currentPlayer);
			that.game.roundOver();
		}, 1000);
	}
}

$(document).ready(() => {
	let b = new Board();
  let p = new HumanPlayer();
	let c = new ComputerPlayer();
	let dcp = new DumbComputerPlayer();

	let g = new Game(p, c, b);
	p.init();
	g.init();
});
