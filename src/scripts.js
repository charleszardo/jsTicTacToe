$(document).ready(() => {
	let b = new Board(),
			p = new HumanPlayer(),
			c = new ComputerPlayer(),
			dcp = new DumbComputerPlayer(),
			scp = new SmartComputerPlayer(),
			player1Color,
			player2Color;

	$('.selection-item').click(function() {
		player1Color = this.id;
		player2Color = 'blue';
		if (this.id === 'blue') {
			player2Color = 'red';
		}

		$('.selection-screen').toggle();
		$('.board').toggle();
 		let g = new Game(p, scp, b, player1Color, player2Color);
		p.init();
		g.init();
	})
});
