/**
 *
 * @param w {number}
 * @param h {number}
 * @param col {string}
 * @constructor
 * @extends gd96.DisplayObjectContainer
 */
gd96.Quad = function (w, h, col, pivot) {
    gd96.DisplayObjectContainer.call(this);
    this.width = w || 100;
    this.height = h || 100;
    this.color = col || gd96.palette[0];
    this.pivot = pivot || new gd96.Math.Vector2(0, 0);
};

gd96.extend(gd96.Quad, gd96.DisplayObjectContainer);

/**
 *
 * @param ctx
 * @override
 */
gd96.Quad.prototype.rndr = function (ctx) {
    gd96.DisplayObjectContainer.prototype.rndr.call(this, ctx);
    this.rect(ctx, -this.pivot.x, -this.pivot.y, this.width, this.height, this.color);
};
