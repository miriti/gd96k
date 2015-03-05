/**
 * Core graphics object
 *
 * @constructor
 */
gd96.DisplayObjectContainer = function () {
    this.children = [];
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.scale = new gd96.Math.Vector2(1, 1);
    this.parent = null;
    this.visible = true;
    this.width = 0;
    this.height = 0;
};
gd96.extend(gd96.DisplayObjectContainer, null);

/**
 * Sets current fill and stroke
 *
 * @param ctx
 * @param fill
 * @param stroke
 * @param lineWidth
 */
gd96.DisplayObjectContainer.prototype.fillStroke = function (ctx, fill, stroke, lineWidth) {
    ctx.fillStyle = '#' + fill;
    ctx.strokeStyle = '#' + stroke;
    ctx.lineWidth = lineWidth;
};

/**
 * Draws rectangle
 *
 * @param ctx
 * @param x
 * @param y
 * @param w
 * @param h
 * @param col
 */
gd96.DisplayObjectContainer.prototype.rect = function (ctx, x, y, w, h, col) {
    this.fillStroke(ctx, col, '000', 1);
    ctx.fillRect(x, y, w, h);
};

/**
 * Draws circle
 *
 * @param ctx
 * @param cx
 * @param cy
 * @param r
 * @param fill
 * @param stroke
 * @param lineWidth
 */
gd96.DisplayObjectContainer.prototype.circle = function (ctx, cx, cy, r, fill, stroke, lineWidth) {
    ctx.beginPath();
    this.fillStroke(ctx, fill || 'f00', stroke || '000', lineWidth || 1);
    ctx.arc(cx, cx, r, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
};

/**
 * Adding a child to the DisplayObjectContainer
 *
 * @param child
 */
gd96.DisplayObjectContainer.prototype.addChild = function (child) {
    this.children.push(child);
    child.parent = this;
};

/**
 * Removes child from the DisplayObjectContainer
 *
 * @param child
 */
gd96.DisplayObjectContainer.prototype.removeChild = function (child) {
    var index = this.children.indexOf(child);

    if (index != -1) {
        var c = this.children[index];
        c.parent = null;
        this.children.splice(index, 1);
    }
};

/**
 * Update a DisplayObjectContainer
 *
 * @param delta
 */
gd96.DisplayObjectContainer.prototype.update = function (delta) {
    for (var i = this.children.length - 1; i >= 0; i--) {
        this.children[i].update(delta);
    }
};

/**
 * Render a DisplayObjectContainer
 *
 * @param ctx
 */
gd96.DisplayObjectContainer.prototype.render = function (ctx) {
    if (!this.visible)return;

    ctx.translate(this.x, this.y);
    ctx.scale(this.scale.x, this.scale.y);
    ctx.rotate(this.rotation);

    if (this.children.length > 0) {
        for (var i in this.children) {
            ctx.save();
            this.children[i].render(ctx);
            ctx.restore();
        }
    }
};

/**
 *
 * @param doWith
 * @returns {boolean}
 */
gd96.DisplayObjectContainer.prototype.intersects = function (doWith) {
    return ((Math.abs(doWith.x - this.x) < (this.width + doWith.width) / 2) && (Math.abs(doWith.y - this.y) < (this.height + doWith.height) / 2));
};