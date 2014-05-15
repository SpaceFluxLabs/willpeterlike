define(['Phaser',
    'Firebase',
    'Player',
    'Line',
    'PhaserExt'
    ],
    function(
      Phaser,
      Firebase,
      Player,
      Line) {
  var firebase = new Firebase('https://jnks031h2o4.firebaseio-demo.com/users/jim'),
      players = [],
      lines = [],
      CANVAS_WIDTH = 800,
      CANVAS_HEIGHT = 600,
      game,
      thisPlayer
  ;

  firebase.remove(function() {
    var divID = 'phaser';
    game = new Phaser.Game(CANVAS_WIDTH,CANVAS_HEIGHT,Phaser.CANVAS, divID, {preload: preload, create: create, update: update});  
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
      var type = data.type;
      if (type == "Player") {
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
      }
      else if (type == "Line") {

      }

    });

    var player = new Player(Date.now(), game, firebase,  true);
    thisPlayer = player;
    players.push(player);

    var line = new Line(game, Math.random() * CANVAS_WIDTH | 0, Math.random() * CANVAS_HEIGHT | 0)
    lines.push(line);
  }

  function growHandler (obj1, obj2) {
    console.log("grow!");
  }

  function update() {
    var i;

    for (var i = 0; i < lines.length; i++) {
      lines[i].sprite.rotation += 0.02;
    }

    for (i in lines) {
      game.physics.arcade.collide(thisPlayer.sprite, lines[i].sprite, troll);
    }
  }

  function troll() {
    console.log("meow!");
  }

});
