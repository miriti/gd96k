/**
 *
 * @constructor
 */
gd96.Character = function () {
    gd96.DisplayObjectContainer.call(this);
    this.x = 400;
    this.y = 300;
};
gd96.extend(gd96.Character, gd96.DisplayObjectContainer);

/**
 *
 * @param ctx CanvasRenderingContext2D
 *
 * @override
 */
gd96.Character.prototype.render = function (ctx) {
    gd96.DisplayObjectContainer.prototype.render.call(this, ctx);
    this.rect(ctx, -50, -50, 100, 100, 'fff');
};

/**
 *
 * @param delta
 * @override
 */
gd96.Character.prototype.update = function (delta) {
    if (gd96.Input.keysPressed[37]) {
        this.x -= gd96.Input.getKeyTime(37) * delta;
    }

    if (gd96.Input.keysPressed[38]) {
        this.y -= gd96.Input.getKeyTime(38) * delta;
    }

    if (gd96.Input.keysPressed[39]) {
        this.x += gd96.Input.getKeyTime(39) * delta;
    }

    if (gd96.Input.keysPressed[40]) {
        this.y += gd96.Input.getKeyTime(40) * delta;
    }
};