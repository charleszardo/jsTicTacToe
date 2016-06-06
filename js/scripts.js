"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
	function Game() {
		_classCallCheck(this, Game);

		this.computerSym = 0;
		this.humanSym = 1;
		this.currentPlayer = null;
		this.board = [[null, null, null], [null, null, null], [null, null, null]];
		this.colors = { 0: "blue", 1: "red" };
		this.inPlay = false;
		this.handler = false;
	}

	_createClass(Game, [{
		key: "init",
		value: function init() {
			if (!this.handler) {
				this.initClickHandler();
			}

			this.inPlay = true;
			this.currentPlayer = Math.floor(Math.random() * 2);
			if (this.currentPlayer === this.computerSym) {
				this.computerTurn();
			}
		}
	}, {
		key: "initClickHandler",
		value: function initClickHandler() {
			var that = this;

			this.handler = true;

			$(".square").click(function (_square) {
				var square = _square.toElement.id,
				    coords = that.numToCoords(square);

				if (that.inPlay && that.currentPlayer === that.humanSym && that.board[coords[0]][coords[1]] === null) {
					that.move(square, that.humanSym);
					that.roundOver();
				}
			});
		}
	}, {
		key: "numToCoords",
		value: function numToCoords(num) {
			var x = Math.floor(num / 3),
			    y = num % 3;

			return [x, y];
		}
	}, {
		key: "computerTurn",
		value: function computerTurn() {
			var selection = null,
			    x = void 0,
			    y = void 0;

			var that = this;

			while (selection === null) {
				x = Math.floor(Math.random() * 3);
				y = Math.floor(Math.random() * 3);

				if (this.board[x][y] === null) {
					selection = x * 3 + y;
				}
			}

			setTimeout(function () {
				that.move(selection, that.computerSym);
				that.roundOver();
			}, 1000);
		}
	}, {
		key: "move",
		value: function move(loc, symbol) {
			var row = Math.floor(loc / 3),
			    cell = loc % 3;

			this.board[row][cell] = symbol;
			this.updateDisplay();
		}
	}, {
		key: "updateDisplay",
		value: function updateDisplay() {
			var i = void 0,
			    j = void 0,
			    square = void 0,
			    symbol = void 0,
			    color = void 0;

			for (i = 0; i < this.board.length; i++) {
				for (j = 0; j < this.board.length; j++) {
					if (this.board[i][j] !== null) {
						square = "#" + (i * 3 + j), symbol = this.board[i][j], color = this.colors[symbol];
						$(square).css('background-color', color);
					}
				}
			}
		}
	}, {
		key: "switchPlayers",
		value: function switchPlayers() {
			if (this.currentPlayer === 1) {
				this.currentPlayer = 0;
				this.computerTurn();
			} else {
				this.currentPlayer = 1;
			}
		}
	}, {
		key: "roundOver",
		value: function roundOver() {
			if (this.checkWin(this.board)) {
				this.inPlay = false;
				console.log(this.currentPlayer);
			} else {
				this.switchPlayers();
			}
		}
	}, {
		key: "checkWin",
		value: function checkWin(board) {
			var cols = [[], [], []],
			    diag = [[board[0][0], board[1][1], board[2][2]], [board[0][2], board[1][1], board[2][0]]],
			    win = false,
			    remaining = void 0;

			var that = this;

			board.forEach(function (row) {
				if (that.winningSet(row)) {
					win = true;
				} else {
					[0, 1, 2].forEach(function (idx) {
						return cols[idx].push(row[idx]);
					});
				}
			});

			if (!win) {
				remaining = cols.concat(diag);
				remaining.forEach(function (set) {
					if (that.winningSet(set)) {
						win = true;
					}
				});
			}

			return win;
		}
	}, {
		key: "winningSet",
		value: function winningSet(set) {
			return set[0] !== null && set[0] === set[1] && set[1] === set[2];
		}
	}]);

	return Game;
}();

var game2 = new Game();

$(document).ready(function () {
	return game2.init();
});