define(['Prediction' ], function( Prediction ) {

  describe('Prediction', function() {

    var player,
        packet
    ;

    beforeEach(function() {
      jasmine.clock().install();
      player = jasmine.createSpy();
      player.sprite = {};
      player.sprite.body = {};
      player.sprite.body.velocity = {};

      packet = jasmine.createSpy();
      packet.velocity = {};
      packet.coordinates = {};

      player.sprite.x = 100;
      player.sprite.y = 100;

      packet.coordinates.x = 100;
      packet.coordinates.y = 100;
      packet.velocity.x = 0;
      packet.velocity.y = 0;
    });

    afterEach(function() {
      jasmine.clock().uninstall();
    });

    it('just sets velocity to packet velo if predicted and actual pos are close', function() {
      var latency = 200
      ;

      Prediction.adjust(latency, player, packet);

      expect(player.sprite.body.velocity.x).toBe(0);
      expect(player.sprite.body.velocity.y).toBe(0);

    });

    it('should speed up X velocity if current is behind predicted', function() {
      var latency = 200
      ;
      
      packet.velocity.x = 50;

      // Predicted x should now be coord (100) + latency (.200) * velo (50) = 110
      // actual is 100

      Prediction.adjust(latency, player, packet);

      expect(player.sprite.body.velocity.x).toBeGreaterThan(packet.velocity.x);
    });

    it('should speed up Y velocity if current is behind predicted', function() {
      var latency = 200
      ;
      
      packet.velocity.y = 50;
      Prediction.adjust(latency, player, packet);

      expect(player.sprite.body.velocity.y).toBeGreaterThan(packet.velocity.y);
    });


    it('should be the same velocity as packet after adjusted time', function() {
      var latency = 200
      ;
      
      packet.velocity.x = 20;
      packet.velocity.y = 50;
      Prediction.adjust(latency, player, packet);

      jasmine.clock().tick(Prediction.ADJUST_TIME + 1);

      expect(player.sprite.body.velocity.x).toBe(packet.velocity.x);
      expect(player.sprite.body.velocity.y).toBe(packet.velocity.y);
      
    });
  });
});
