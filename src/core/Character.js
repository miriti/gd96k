/**
 *
 * @constructor
 * @extends gd96.DisplayObjectContainer
 */
gd96.Character = function () {
    gd96.DisplayObjectContainer.call(this);
    this.health = 100;
    this.dead = false;
    this.deathBlinkInterval = 150;
    this.deathAnimationTime = 0;
    this.width = 50;
    this.height = 100;
    this.speed = 300;
    this.doll = new gd96.Doll();
    this.doll.y = -50;

    this.add(this.doll);
};
gd96.extend(gd96.Character, gd96.DisplayObjectContainer);

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
            this.parent.rem(this);
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
