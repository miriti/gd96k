/**
 *
 * @constructor
 */
gd96.Character = function () {
    gd96.DisplayObjectContainer.call(this);
    this.x = 400;
    this.y = 300;
    this.color = gd96.palette[7];
    this.health = 100;
    this.dead = false;
    this.deathBlinkInterval = 150;
    this.deathAnimationTime = 0;
    this.width = 50;
    this.height = 100;
    this.speed = 300;
};
gd96.extend(gd96.Character, gd96.DisplayObjectContainer);

/**
 *
 * @param ctx CanvasRenderingContext2D
 *
 * @override
 */
gd96.Character.prototype.render = function (ctx) {
    if (!this.visible) return;
    gd96.DisplayObjectContainer.prototype.render.call(this, ctx);
    this.rect(ctx, -this.width / 2, -this.height, this.width, this.height, this.color);
    this.rect(ctx, -2, -2, 4, 4, 'f00');
};

/**
 *
 * @param delta
 * @override
 */
gd96.Character.prototype.update = function (delta) {
    gd96.DisplayObjectContainer.prototype.update.call(this, delta);

    for (var i in this.parent.obstacles) {
        var o = this.parent.obstacles[i];
        var dx = this.x - o.x;
        var dy = this.y - o.y;
        if ((Math.abs(dx) < o.width / 2) && (Math.abs(dy) < o.height / 2)) {
            console.log('cliision', o, this.x, this.y, dx, dy);
            if ((o.width / 2 - Math.abs(dx) ) < (o.height / 2 - Math.abs(dy))) {
                if (this.x > o.x) {
                    this.x += o.width / 2 - dx;
                } else {
                    this.x -= o.width / 2 + dx;
                }
            } else {
                if (this.y > o.y) {
                    this.y += o.height / 2 - dy;
                } else {
                    this.y -= o.height / 2 + dy;
                }
            }
        }
    }

    if (this.dead) {
        if (this.deathAnimationTime < 1.5) {
            this.visible = Math.floor(gd96.timestamp / this.deathBlinkInterval) % 2 === 0;
            this.deathAnimationTime += delta;
        } else {
            this.parent.removeChild(this);
        }
    }
};

/**
 * Hit the character
 *
 * @param hitPoints
 */
gd96.Character.prototype.hit = function (hitPoints) {
    this.health -= hitPoints;
    if (this.health < 0) {
        this.health = 0;
    }

    if (this.health === 0) {
        if (!this.dead) {
            this.dead = true;
            this.die();
        }
    }
};

/**
 * Die
 */
gd96.Character.prototype.die = function () {

};