gd96.Math = {};

/**
 *
 * @param x
 * @param y
 * @constructor
 */
gd96.Math.Vector2 = function (x, y) {
    this.x = x;
    this.y = y;
};

gd96.extend(gd96.Math.Vector2, null);

/**
 *
 * @param x {Number}
 * @param y {Number}
 */
gd96.Math.Vector2.prototype.set = function (x, y) {
    this.x = x;
    this.y = y;
};