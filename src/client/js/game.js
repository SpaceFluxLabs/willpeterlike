var game = new Phaser.Game(800,600,Phaser.CANVAS, 'phaser', {preload: preload, create: create, update: update, render: render});
var firebase = new Firebase('https://jnks031h2o4.firebaseio-demo.com');
var prevPoint = new Phaser.Point();

var TESTCircle;
var TESTFB = firebase.child('Wilbur');
TESTFB.remove();

function preload() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.backgroundColor = '#0000FF';
  game.load.image('circleImg', 'assets/sprites/circle.jpg');
}

function create() {
  firebase.on('child_added', function(snapshot) {
      var data = snapshot.val();
      var point = new Phaser.Point(data.x, data.y);
  });
}

function update() {
}

function render() {

}
