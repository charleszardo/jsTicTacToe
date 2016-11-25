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
		var x = this.board.checkWin();
		console.log(x);
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
		let that = this,
				movePos = this.moveArrToDig(this.determineMove());

		setTimeout(() => {
			that.game.move(movePos, that.game.currentPlayer);
			that.game.roundOver();
		}, 1000);
	}
}

class DumbComputerPlayer extends ComputerPlayer {
	constructor() {
		super();
	}

	determineMove() {
		let availableMoves = [],
				i,
				j;

		for (i = 0; i < this.board.grid.length; i++) {
			for (j = 0; j < this.board.grid.length; j++) {
				if (this.board.grid[i][j] === null) {
					availableMoves.push([i, j]);
				}
			}
		}

		return availableMoves[Math.floor(Math.random()*availableMoves.length)];
	}
}

class SmartComputerPlayer extends ComputerPlayer {
	constructor() {
		super();
	}

	determineMove() {
		let winningMoves = [],
				protectMoves = [],
				otherMoves = [],
        bestMoves = [],
        move,
				i,
				j;

		for (i = 0; i < this.board.grid.length; i++) {
			for (j = 0; j < this.board.grid.length; j++) {
				if (this.board.grid[i][j] === null) {
					let boardDup = this.board.dupBoard();

					boardDup.grid[i][j] = this;

					if (boardDup.checkWin() && boardDup.winner === this) {
						winningMoves.push([i, j]);
					}

					boardDup.grid[i][j] = this.opponent;

					if (boardDup.checkWin() && boardDup.winner === this.opponent) {
						protectMoves.push([i, j]);
					} else {
						otherMoves.push([i, j]);
					}
				}
			}
		}

    bestMoves = winningMoves.concat(protectMoves);
    if (bestMoves.length > 0) {
      move = bestMoves[0]
    } else {
      move = otherMoves[Math.floor(Math.random()*otherMoves.length)];
    }

    return move;
	}
}

class MasterComputerPlayer extends ComputerPlayer {
	constructor() {
		super();
	}

	togglePlayers(currentPlayer) {
		if (currentPlayer === this.opponent) {
			return this;
		} else {
			return this.opponent;
		}
	}

	determineMove(_currentPlayer = this, _board = this.board) {
		let currentPlayer = _currentPlayer,
				board = _board,
				i,
				j;

		for (i = 0; i < this.board.grid.length; i++) {
			for (j = 0; j < this.board.grid.length; j++) {
				if (board.grid[i][j] === null) {
					let boardDup = board.dupBoard(),
							newFutureMoves = [],
							nextPlayer,
							futureMoves;

					boardDup.grid[i][j] = currentPlayer;

					if (boardDup.checkWin()) {
						if (boardDup.getWinner() === this.opponent) {
							return false;
						} else {
							return [[i,j]];
						}
					} else {
						nextPlayer = this.togglePlayers(currentPlayer, boardDup);
						futureMoves = this.determineMove(nextPlayer);
						newFutureMoves =
						futureMoves.forEach(function(move) {
							if (move) {
								newFutureMoves.push([i,j]);
							}
						})
					}
				}
			}
		}

    bestMoves = winningMoves.concat(protectMoves);
    if (bestMoves.length > 0) {
      move = bestMoves[0]
    } else {
      move = otherMoves[Math.floor(Math.random()*otherMoves.length)];
    }

    return move;
	}
}

class MasterComputerPlayer2 extends ComputerPlayer {
	constructor() {
		super();
	}

	determineMove(_player1, _player2, _board, _currentPlayer) {
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
