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
