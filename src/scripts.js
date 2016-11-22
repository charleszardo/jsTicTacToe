$(document).ready(() => {
	let b = new Board();
  let p = new HumanPlayer();
	let c = new ComputerPlayer();
	let dcp = new DumbComputerPlayer();
	let scp = new SmartComputerPlayer();

	let g = new Game(p, scp, b);
	p.init();
	g.init();
});
