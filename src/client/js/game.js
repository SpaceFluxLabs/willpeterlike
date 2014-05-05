var game = new Phaser.Game(800,600,Phaser.CANVAS, 'phaser', {preload: preload, create: create, update: update, render: render});
var firebase = new Firebase('https://jnks031h2o4.firebaseio-demo.com');
var prevPoint = new Phaser.Point();

function preload() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.backgroundColor = '#0000FF';
}

function create() {
  firebase.on('child_added', function(snapshot) {
      var data = snapshot.val();
      var point = new Phaser.Point(data.x, data.y);
  });
}

function update() {
  var polygon = new Polygon(100,100,3,100,"#FF0000");
  Draw(polygon);
  // Replace polygon with Player.polygon
}

function render() {

}
