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
        player.polygon.sides = data.sides;
        player.draw();
      }
      else if (type == "Line") {
        var line;
        var point = new Phaser.Point(data.point.x, data.point.y);
        console.log(point);
        line = new Line(game, point.x, point.y);
        lines.push(line);
      }

    });

    var player = new Player(Date.now(), game, firebase,  true);
    thisPlayer = player;
    players.push(player);


      //var line = new Line(game, Math.random() * CANVAS_WIDTH | 0, Math.random() * CANVAS_HEIGHT | 0)
      //lines.push(line);
  }

  function update() {
    var i,
        line
    ;

    if ((Math.random() * 100 | 0) == 0) {
      line = new Line(game, Math.random() * CANVAS_WIDTH | 0, Math.random() * CANVAS_HEIGHT | 0)
      lines.push(line);
    }

    for (i = 0; i < lines.length; i++) {
      game.physics.arcade.collide(lines[i].sprite, thisPlayer.sprite, growHandler, null, this);
      lines[i].sprite.rotation += 0.02;
    }
    
    players[0].moveForward(players[0].polygon, game.input.keyboard.isDown(Phaser.Keyboard.W));
  }

  function growHandler (obj1, obj2) {
    obj1.destroy();
    thisPlayer.grow();
  }

});
