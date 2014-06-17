define(['Phaser',
    'Firebase',
    'Player',
    'Line',
    'Prediction'
    ],
    function (
      Phaser,
      Firebase,
      Player,
      Line,
      Prediction
    ) {

  'use strict';

  var players = [],
      lines = [],
      latency = 100,
      thisPlayer
  ;

  /**
   * Create the main game state
   */

  var MainState = function() {
  };


  MainState.prototype.preload = function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = '#0000FF';

    // Don't pause game if tab loses focus
    this.game.stage.disableVisibilityChange = true;
  };

  MainState.prototype.create = function() {

    var player,
        firebase = this.game.app.firebase
    ;

    firebase.on('child_added', function(snapshot) {
      var data = snapshot.val(),
          type = data.type,
          id = data.id,
          filter,
          line,
          velocity,
          direction,
          position
      ;

      if (type === "Player") {
        direction = data.direction;
        filter = players.filter(function(item) {
          return item.id === id;
        });

        if(filter.length) {
          player = filter[0];
        } else {
          player = new Player(id, this.game, firebase, false);
          players.push(player);
        }
        
        Prediction.adjust(latency + data.latency, player, data);

        player.polygon.sides = data.sides;
        player.polygon.direction = direction;
        player.draw();
      }
      else if (type === "Line") {
        position = new Phaser.Point(data.position.x, data.position.y);
        velocity = new Phaser.Point(data.velocity.x, data.velocity.y);
        line = new Line(this.game, firebase, position.x, position.y);
        line.setVelocity(data.velocity.x, data.velocity.y);
        line.sprite.body.velocity = velocity;
        lines.push(line);
      }
    });

    // Create the current client's player object
    player = new Player(Date.now(), this.game, firebase,  true);
    thisPlayer = player;
    players.push(player);

    //put our game's data under game.app
    this.game.app.lines = lines;
    this.game.app.players = players;

  };

  MainState.prototype.update = function() {

    var firebase = this.game.app.firebase,
        i,
        line,
        start,
        end
    ;

    if ((Math.random() * 100 | 0) === 0) {
      line = new Line(this.game, firebase, Math.random() * this.game.width | 0, Math.random() * this.game.height | 0);
      line._save();
    }
    for (i = 0; i < lines.length; i++) {
      lines[i].draw();
    }

    thisPlayer.update(this.game);

    // Calculate the latest latency from client to firebase 
    // so we can include it with our packets and other clients use it for prediction

    start = Date.now();
    thisPlayer.save(latency, function() {
      end = Date.now();
      latency = (end - start) / 2;
    });

  };
});
