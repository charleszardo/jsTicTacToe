"use strict";

var game = {
	computerSym: 0,
	humanSym: 1,
	currentPlayer: null,
	board: [[null, null, null], [null, null, null], [null, null, null]],
	colors: { 0: "blue", 1: "red" },
	inPlay: false,
	handler: false,
	init: function init() {
		if (!this.handler) {
			this.initPadHandler();
		}

		this.inPlay = true;
		this.currentPlayer = Math.floor(Math.random() * 2);
		if (this.currentPlayer === this.computerSym) {
			this.computerTurn();
		}
	},
	initPadHandler: function initPadHandler() {
		var that = this;

		this.handler = true;

		$(".square").click(function () {
			var coords = that.numToCoords(this.id);

			if (that.inPlay && that.currentPlayer === that.humanSym && that.board[coords[0]][coords[1]] === null) {
				that.move(this.id, that.humanSym);
				that.roundOver();
			}
		});
	},
	numToCoords: function numToCoords(num) {
		var x = Math.floor(num / 3),
		    y = num % 3;

		return [x, y];
	},
	computerTurn: function computerTurn() {
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
	},
	move: function move(loc, symbol) {
		var row = Math.floor(loc / 3),
		    cell = loc % 3;

		this.board[row][cell] = symbol;
		this.updateDisplay();
	},
	updateDisplay: function updateDisplay() {
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
	},
	switchPlayers: function switchPlayers() {
		if (this.currentPlayer === 1) {
			this.currentPlayer = 0;
			this.computerTurn();
		} else {
			this.currentPlayer = 1;
		}
	},
	roundOver: function roundOver() {
		if (this.checkWin(this.board)) {
			this.inPlay = false;
			console.log(this.currentPlayer);
		} else {
			this.switchPlayers();
		}
	},
	checkWin: function checkWin(board) {
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
	},
	winningSet: function winningSet(set) {
		return set[0] !== null && set[0] === set[1] && set[1] === set[2];
	}
};

$(document).ready(function () {
	return game.init();
});