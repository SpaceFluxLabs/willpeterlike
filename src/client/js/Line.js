var Line = (function(Phaser) {
  function Line(game, x, y) {
    this.type = "Line";
    this.x = x;
    this.y = y;
    var bitmap = game.add.bitmapData(1,50);

    bitmap.line(this, '#FFFFFF');
    this.sprite = game.add.sprite(x, y, bitmap);
    this.sprite.anchor.setTo(0.5,0.5);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    this.sprite.body.collideWorldBounds = false;
  }

  return Line;
});
