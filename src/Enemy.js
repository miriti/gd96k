/**
 *
 * @constructor
 * @extends gd96.Character
 */
gd96.Enemy = function () {
    gd96.Character.call(this);
    this.phase = 0;
};

gd96.extend(gd96.Enemy, gd96.Character);

/**
 *
 * @param delta
 * @override
 */
gd96.Enemy.prototype.update = function (delta) {
    this.x = 400 + Math.sin(this.phase) * 200;
    this.y = 300 + Math.cos(this.phase) * 200;
    this.phase += (Math.PI/4) * delta;
    gd96.Character.prototype.update.call(this, delta);
};