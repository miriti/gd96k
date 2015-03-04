/**
 * Player
 *
 * @constructor
 */
gd96.Player = function () {
    gd96.Character.call(this);

    this.hitHold = false;
};

gd96.extend(gd96.Player, gd96.Character);

/**
 *
 * @param delta
 * @override
 */
gd96.Player.prototype.update = function (delta) {

    if (gd96.Input.keysPressed[gd96.Input.KEY_LEFT]) {
        this.x -= this.speed * delta;
    }

    if (gd96.Input.keysPressed[gd96.Input.KEY_RIGHT]) {
        this.x += this.speed * delta;
    }

    if (gd96.Input.keysPressed[gd96.Input.KEY_UP]) {
        this.y -= this.speed * delta;
    }

    if (gd96.Input.keysPressed[gd96.Input.KEY_DOWN]) {
        this.y += this.speed * delta;
    }

    if (gd96.Input.keysPressed[gd96.Input.KEY_Z]) {
        if (!this.hitHold) {
            this.hitHold = true;
            for (var i = 0; i < this.parent.characters.length; i++) {
                var c = this.parent.characters[i];
                if ((c != this) && (!c.dead) && this.intersects(c)) {
                    c.hit(10);
                }
            }
        }
    } else {
        this.hitHold = false;
    }

    gd96.Character.prototype.update.call(this, delta);
};
