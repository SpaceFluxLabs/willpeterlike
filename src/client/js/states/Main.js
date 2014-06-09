define(['Phaser',
    'Firebase',
    'Player',
    'Line',
    'Prediction',
    'Lodash'
    ],
    function (
      Phaser,
      Firebase,
      Player,
      Line,
      Prediction,
      _
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
    
    window.addEventListener('beforeunload', function(evt) {

    });
  };

  MainState.prototype.create = function() {

    var firebase = this.game.app.firebase,
        query = firebase.limit(2),
        self = this,
        player
    ;

    query.on('child_added', function(snapshot) {
      var data = snapshot.val(),
          type = data.type,
          id,
          filter,
          line,
          velocity,
          direction,
          position
      ;

        _.forEach(data.players, function(savedPlayer) {

          id = savedPlayer.id;
          filter = players.filter(function(item) {
            return item.id === id;
          });

          if(filter.length) {
            player = filter[0];
          } else {
            player = new Player(id, self.game, firebase, false);
            players.push(player);
          }
          
          Prediction.adjust(latency + data.latency, player, savedPlayer);


          player.polygon.sides = savedPlayer.sides;
          player.polygon.direction = savedPlayer.direction;
          player.draw();


        });
/*      if (type === "Player") {
        direction = data.direction;
        filter = players.filter(function(item) {
          return item.id === id;
        });

        if(filter.length) {
          player = filter[0];
        } else {
          player = new Player(id, self.game, firebase, false);
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
        line = new Line(self.game, firebase, position.x, position.y);
        line.setVelocity(data.velocity.x, data.velocity.y);
        line.sprite.body.velocity = velocity;
        lines.push(line);
      }
     */
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

    if ((Math.random() * 1000 | 0) === 0) {
      line = new Line(this.game, firebase, Math.random() * this.game.width | 0, Math.random() * this.game.height | 0);
   //   line._save();
      this.game.app.lines.push(line)
    }
    for (i = 0; i < lines.length; i++) {
      lines[i].draw();
    }

    thisPlayer.update(this.game);

    // Calculate the latest latency from client to firebase 
    // so we can include it with our packets and other clients use it for prediction

    start = Date.now();
    /*thisPlayer.save(latency, function() {
      end = Date.now();
      latency = (end - start) / 2;
    });
*/
    // snapshot holds our current world state
    // so we can save everything from 1 frame as 1 obj
    var snapshot = {
      players: [thisPlayer.serialize()],
      lines: _.map(this.game.app.lines, function(line) {
        return line.serialize();
      }),
      latency: latency
    };


    firebase.push(snapshot, function() {
      end = Date.now();
      latency = (end - start) / 2;
    });

  };

  MainState.prototype.shutdown = function() {

    alert('wer');

  };

  /** 
   * export MainState
   */
  
  return MainState;
});
