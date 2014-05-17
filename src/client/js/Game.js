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
      Line
    ) {
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
      var data = snapshot.val(),
          type = data.type,
          id = data.id,
          filter,
          line,
          point,
          player
      ;

      if (type == "Player") {
        point = new Phaser.Point(data.point.x, data.point.y);
        filter = players.filter(function(item) {
          return item.id === id;
        });

        if(filter.length) {
          player = filter[0];
        } else {
          player = new Player(id, game, firebase, false);
          players.push(player);
        }

        player.sprite.body.velocity = point;
        player.polygon.sides = data.sides;
        player.draw();
      }
      else if (type == "Line") {
        var line;
        var position = new Phaser.Point(data.position.x, data.position.y);
        var velocity = new Phaser.Point(data.velocity.x, data.velocity.y);
        line = new Line(game, firebase, position.x, position.y);
        line.setVelocity(data.velocity.x, data.velocity.y);
        line.sprite.body.velocity = velocity;
        lines.push(line);
      }
    });

    player = new Player(Date.now(), game, firebase,  true);
    thisPlayer = player;
    players.push(player);
  }

  function update() {
    var i,
        line
    ;

    if ((Math.random() * 100 | 0) == 0) {
      line = new Line(game, firebase, Math.random() * CANVAS_WIDTH | 0, Math.random() * CANVAS_HEIGHT | 0);
      line._save();
    }

    for (i = 0; i < lines.length; i++) {
      game.physics.arcade.collide(lines[i].sprite, thisPlayer.sprite, growHandler, null, this);
      lines[i].draw();
    }

    thisPlayer.moveForward(thisPlayer.polygon, game.input.keyboard.isDown(Phaser.Keyboard.W));
  }

  function growHandler (obj1, obj2) {
    obj1.destroy();
    thisPlayer.grow();
  }

});
