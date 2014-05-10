(function() {

  var game;
  var firebase = new Firebase('https://jnks031h2o4.firebaseio-demo.com/users/jim');
  var players = [];

  firebase.remove(function() {
    game = new Phaser.Game(800,600,Phaser.CANVAS, 'phaser', {preload: preload, create: create, });  
  });

  function preload() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#0000FF';

    // Don't pause game if tab loses focus
    game.stage.disableVisibilityChange = true;
  }

  function create() {

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

      player.sprite.body.velocity = point;
    });

    var player = new Player(Date.now(), game, firebase,  true);
    players.push(player);
  }

})();
