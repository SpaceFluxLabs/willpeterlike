var game = new Phaser.Game(800,600,Phaser.CANVAS, 'phaser', {preload: preload, create: create, update: update, render: render});
var input;
var circle;
var shape;
var firebase = new Firebase('https://jnks031h2o4.firebaseio-demo.com');
var prevPoint = new Phaser.Point();

firebase.remove();

function preload() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.backgroundColor = '#0000FF';
  game.load.image('circleImg', 'assets/sprites/circle.jpg');
}

function create() {
	input = {
    upKey : game.input.keyboard.addKey(Phaser.Keyboard.UP),
    downKey : game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
    leftKey : game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
    rightKey : game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
  };
  circle = game.add.sprite(400,300,'circleImg'); // (400,300) is the position

	//shape = Draw(100, 100, 3, 30, 0xFFFF00);
	
  game.physics.enable(circle, Phaser.Physics.ARCADE);

  firebase.on('child_added', function(snapshot) {
      var data = snapshot.val();
      var point = new Phaser.Point(data.x, data.y);

      circle.body.velocity = point;
  });

}

function update() {
  var polygon = new Polygon(0);
  //circle.body.velocity.setTo(0,0);
  var point = new Phaser.Point();
      speed = 200;

	if (input.upKey.isDown) {
		point.y = -speed;
	}
	if (input.downKey.isDown) {
		point.y = speed;
	}
	if (input.leftKey.isDown) {
	        point.x = -speed;
	}
	if (input.rightKey.isDown) {
		point.x = speed;
	}
  if(prevPoint.x !== point.x || prevPoint.y !== point.y) {
    firebase.push(point);
  }
    prevPoint = point;
}

function render() {

}

