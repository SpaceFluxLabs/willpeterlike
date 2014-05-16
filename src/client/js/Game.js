define(['Phaser',
    'Firebase',
    'Player',
    'Line',
    'Prediction'
    ],
    function(
      Phaser,
      Firebase,
      Player,
      Line,
      Prediction  
    ) {

  var firebase = new Firebase('https://jnks031h2o4.firebaseio-demo.com/users/jim'),
      players = [],
      lines = [],
      CANVAS_WIDTH = 800,
      CANVAS_HEIGHT = 600,
      latency = 100,
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
          velocity,
          direction,
          player
      ;

      if (type == "Player") {
        direction = data.direction;
        filter = players.filter(function(item) {
          return item.id === id;
        });

        if(filter.length) {
          player = filter[0];
        } else {
          player = new Player(id, game, firebase, false);
          players.push(player);
        }
        
        Prediction.adjust(latency + data.latency, player, data);

        player.polygon.sides = data.sides;
        player.polygon.direction = direction;
        player.draw();
      }
      else if (type == "Line") {
        position = new Phaser.Point(data.position.x, data.position.y);
        velocity = new Phaser.Point(data.velocity.x, data.velocity.y);
        line = new Line(game, firebase, position.x, position.y);
        line.setVelocity(data.velocity.x, data.velocity.y);
        line.sprite.body.velocity = velocity;
        lines.push(line);
      }
    });

    // Create the current client's player object
    player = new Player(Date.now(), game, firebase,  true);
    thisPlayer = player;
    players.push(player);

    //put our game's data under game.app
    game.app = {};
    game.app.lines = lines;
    game.app.players = players;
  }

  var counter = 0;
  function update() {
    var i,
        line,
        start,
        end
    ;

    if ((Math.random() * 100 | 0) == 0) {
      line = new Line(game, firebase, Math.random() * CANVAS_WIDTH | 0, Math.random() * CANVAS_HEIGHT | 0);
      line._save();
    }
    for (i = 0; i < lines.length; i++) {
      lines[i].draw();
    }

    thisPlayer.update(game);

    // Calculate the latest latency from client to firebase 
    // so we can include it with our packets and other clients use it for prediction

    start = Date.now();
    thisPlayer.save(latency, function() {
      end = Date.now();
      latency = (end - start) / 2;
    });
  }
});
