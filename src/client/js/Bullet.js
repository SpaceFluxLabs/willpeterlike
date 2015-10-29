define(['Line', 'Lodash'], function(Line, _) {
    'use strict';

    function Bullet(game, firebase, x, y) {
        Line.call(this, game, firebase, x, y);
    }

    // Inherit all of Line's prototypal properties into Bullet
    Bullet.prototype = _.create(Line);

    return Bullet;
});
