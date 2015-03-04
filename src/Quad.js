gd96.Quad = function (w, h, col) {
    gd96.DisplayObjectContainer.call(this);
    this.width = w;
    this.height = h;
    this.color = col;
};

gd96.extend(gd96.Quad, gd96.DisplayObjectContainer);

/**
 *
 * @param ctx
 * @override
 */
gd96.Quad.prototype.render = function (ctx) {
    gd96.DisplayObjectContainer.prototype.render.call(this, ctx);
    this.rect(ctx, 0, 0, this.width, this.height, this.color);
};
