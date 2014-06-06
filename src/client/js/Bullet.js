define(['Line', 'Lodash'], function(Line, _) {
    'use strict';

    function Bullet() {
    }

    // Inherit all of Line's prototypal properties into Bullet
    Bullet.prototype = _.create(Line);

    return Bullet;
});
