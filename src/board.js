class Board {
	constructor() {
		this.grid = [[null, null, null],
								 [null, null, null],
								 [null, null, null]];
		this.el = $(".board");
		this.winner = null;
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
					$(square).css("background-color", color);
					$(square).addClass("unavailable");
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

	winningSet(set) {
		return set[0] !== null && set[0] === set[1] && set[1] === set[2];
	}

	checkWin() {
		let cols = [[], [], []],
				diag = [[this.grid[0][0], this.grid[1][1], this.grid[2][2]],
								[this.grid[0][2], this.grid[1][1], this.grid[2][0]]],
				win = false,
				remaining;

		const that = this;

		this.grid.forEach(row => {
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

		if (this.isFull()) {
			win = true;
		}

		return win;
	}

	getWinner() {
		return this.winner;
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

		$(".square").removeClass("unavailable");
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
