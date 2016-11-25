$(document).ready(() => {
	let b = new Board(),
			p = new HumanPlayer(),
			c = new ComputerPlayer(),
			dcp = new DumbComputerPlayer(),
			scp = new SmartComputerPlayer(),
			mcp = new MasterComputerPlayer(),
			player1Color,
			player2Color,
			g;

	$('.selection-item').click(function() {
		player1Color = this.id;
		player2Color = 'blue';
		if (this.id === 'blue') {
			player2Color = 'red';
		}

		$('.selection-screen').toggle();
		$('.board').toggle();

		g = new Game(p, mcp, b, player1Color, player2Color);
		p.init();
		g.init();
	})
});
