define(['Phaser',
    'Firebase',
    'Player',
    'Ammo',
    'Missile',
    'Prediction'
    ],
    function(
      Phaser,
      Firebase,
      Player,
      Ammo,
      Missile,
      Prediction  
    ) {
  'use strict';

  var firebase = new Firebase('https://jnks031h2o4.firebaseio-demo.com/users/jim'),
      players = [],
      missiles = [],
      ammos = [],
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
    var player;

    firebase.on('child_added', function(snapshot) {
      var data = snapshot.val(),
          type = data.type,
          id = data.id,
          filter,
          missile,
          ammo,
          position,
          direction,
          speed,
          color
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
      else if (type == "Missile") {
        position = new Phaser.Point(data.position.x, data.position.y);
        direction = data.direction;
        speed = data.speed;
        color = data.color;
        missile = new Missile(game, firebase, position.x, position.y, direction, speed);
        missile.setColor(color);
        missile.sprite.body.velocity = new Phaser.Point(Math.cos(direction) * speed, Math.sin(direction) * speed);
        missiles.push(missile);
      }
      else if (type == "Ammo") {
        position = new Phaser.Point(data.position.x, data.position.y);
        direction = data.direction;
        ammo = new Ammo(game, firebase, position.x, position.y, direction);
        ammos.push(ammo); 
      }
    });

    // Create the current client's player object
    player = new Player(Date.now(), game, firebase,  true);
    thisPlayer = player;
    players.push(player);

    //put our game's data under game.app
    game.app = {};
    game.app.missiles = missiles;
    game.app.ammos = ammos;
    game.app.players = players;
  }

  var counter = 0;
  function update() {
    var i,
        ammo,
        start,
        end
    ;

    // Randomly generates an ammo on the map
    if ((Math.random() * 100 | 0) == 0) {
      ammo = new Ammo(game, firebase, Math.random() * CANVAS_WIDTH | 0, Math.random() * CANVAS_HEIGHT | 0, 0);
      ammo.save();
    }

    // Render all ammos
    for (i = 0; i < ammos.length; ++i) {
      ammos[i].draw();
    }

    // Render all missiles
    for (i = 0; i < missiles.length; ++i) {
      missiles[i].draw();
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
