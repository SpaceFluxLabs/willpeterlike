define(['Phaser',
    'Polygon',
    'utils/ColorGenerator',
    'Bullet',
    'PlayerInputComponent',
    'PlayerPhysicsComponent',
    'PhaserExt'
    ],
    function(Phaser,
      Polygon,
      ColorGenerator,
      Bullet,
      PlayerInputComponent,
      PlayerPhysicsComponent,
      PhaserExt
    ) {
  'use strict';

  function Player(id, game, firebase,  shouldListen) {

    var grow,
        shrink
    ;

    this.speed = 300;
    this.game = game;
    this.bitmap = game.add.bitmapData(100, 100);
    this.type = "Player";
    this.id = id;
    this.firebase = firebase;
    this.velocity = new Phaser.Point();
    this.polygon = new Polygon(50,50,4,50);
    this.color = ColorGenerator.getColorFromNumber(this.id);

    this.bitmap.polygon(this.polygon, this.color);
    this.sprite = game.add.sprite(100, 100, this.bitmap);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    this._inputComponent = new PlayerInputComponent();
    this._physicsComponent = new PlayerPhysicsComponent();


    // Register keyboard events

    if (shouldListen) {
      grow = game.input.keyboard.addKey(Phaser.Keyboard.Q);
      shrink = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

      grow.onDown.add(this.grow.bind(this));
      shrink.onDown.add(this.shoot.bind(this));
      shrink.onDown.add(this.shrink.bind(this));

    }
  }

  /*
   * Update player each frame
   * @param {Phaser.Game} game - the game instance of this player
   * @return {Player} - the Player instance
   */
  Player.prototype.update = function(game) {
    this._inputComponent.update(game, this);
    this._physicsComponent.update(game, this);

    return this;
  }

  Player.prototype.shoot = function() {
    var bulletPosition,
        bulletVelocity,
        bullet;

    if (this.polygon.numSides() > 3) {
      bulletPosition = new Phaser.Point(
        this.sprite.body.center.x + this.polygon.radius * Math.cos(this.polygon.direction) * 2, 
        this.sprite.body.center.y + this.polygon.radius * Math.sin(this.polygon.direction) * 2
      );
      bulletVelocity = new Phaser.Point(
        Math.cos(this.polygon.direction) * this.speed * 2,
        Math.sin(this.polygon.direction) * this.speed * 2
      );
      bullet = new Bullet(this.game, this.firebase, bulletPosition.x, bulletPosition.y);
      bullet.setVelocity(bulletVelocity.x, bulletVelocity.y);
      bullet._save();
    }
  }

  /**
   * Save current Player state to firebase
   * @param {Number} Latency - latency between client & firebase in ms
   * @param {Function} [callback] - the callback to execute after firebase is updated
   */
  Player.prototype.save = function(latency, callback) {

    if (callback && typeof callback !== 'function') {
      throw new TypeError('save callback must be a function');
    }

    this.firebase.push({
      id: this.id,
      latency: latency,
      type: this.type,
      velocity: this.velocity,
      coordinates: {
        x: this.sprite.x,
        y: this.sprite.y
      },
      direction: this.polygon.direction,
      sides: this.polygon.sides
    }, callback);
  }

  Player.prototype.grow = function() {
    this.polygon.addSide();
    this.draw();
  }

  Player.prototype.shrink = function() {
    this.polygon.removeSide();
    this.draw();
  }

  Player.prototype.draw = function() {
    this.bitmap.clear();
    this.bitmap.polygon(this.polygon, this.color);
  }

  return Player;
});
