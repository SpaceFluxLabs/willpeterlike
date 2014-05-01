var game;
var input; 
var circle;
var shape;
var firebase = new Firebase('https://jnks031h2o4.firebaseio-demo.com/users/jim');
var prevPoint = new Phaser.Point();
var players = [];

firebase.remove(function() {
  console.log('removed');
  game = new Phaser.Game(800,600,Phaser.CANVAS, 'phaser', {preload: preload, create: create, update: update, render: render});
});

function preload() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.backgroundColor = '#0000FF';
  game.load.image('circleImg', 'assets/sprites/circle.jpg');

  // Don't pause game if tab loses focus
  game.stage.disableVisibilityChange = true;
}

function create() {
	input = {
    upKey : game.input.keyboard.addKey(Phaser.Keyboard.UP),
    downKey : game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
    leftKey : game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
    rightKey : game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
  };
  //circle = game.add.sprite(400,300,'circleImg'); // (400,300) is the position

	shape = Draw(100, 100, 3, 30, 0xFFFF00);
	
  //game.physics.enable(circle, Phaser.Physics.ARCADE);

  firebase.on('child_added', function(snapshot) {
    var data = snapshot.val();
    var id = data.id;
    var point = new Phaser.Point(data.point.x, data.point.y);
    var filter = players.filter(function(item) {
      return item.id === id;
    });
    var player;

    if(filter.length) {
      player = filter[0];
    } else {
      player = new Player(id, game, firebase, false);
      players.push(player);
    }

    player.circle.body.velocity = point;

    //circle.body.velocity = point;
  });

  var player = new Player(Date.now(), game, firebase, true);
  players.push(player);
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
    //firebase.push(point);
  }
    prevPoint = point;
}

function render() {

}

