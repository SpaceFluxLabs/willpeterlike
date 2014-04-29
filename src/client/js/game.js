var game = new Phaser.Game(800,600,Phaser.CANVAS, 'phaser', {preload: preload, create: create, update: update, render: render});
var input;
var circle;
var shape;

function preload() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.backgroundColor = '#0000FF';
  game.load.image('circleImg', 'assets/sprites/circle.jpg');
}

function create() {
	input = new Input(game);
  circle = game.add.sprite(400,300,'circleImg'); // (400,300) is the position

	shape = Draw(3, 100, 100, 30);
	
  game.physics.enable(circle, Phaser.Physics.ARCADE);
}

function update() {
  circle.body.velocity.setTo(0,0);
	if (input.upKey.isDown) {
		circle.body.velocity.y -= 200;
	}
	if (input.downKey.isDown) {
		circle.body.velocity.y += 200;
	}
	if (input.leftKey.isDown) {
		circle.body.velocity.x -= 200;
	}
	if (input.rightKey.isDown) {
		circle.body.velocity.x += 200;
	}
}

function render() {

}
