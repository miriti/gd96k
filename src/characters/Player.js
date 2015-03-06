/**
 * Player
 *
 * @constructor
 * @extends gd96.Character
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
    if (this.doll.currentAnimation != 'Hit') {
        var running = false;
        if (gd96.Input.keysPressed[gd96.Input.KEY_LEFT]) {
            this.scale.set(-1, 1);
            this.x -= this.speed * delta;
            running = true;
        }

        if (gd96.Input.keysPressed[gd96.Input.KEY_RIGHT]) {
            this.x += this.speed * delta;
            this.scale.set(1, 1);
            running = true;
        }

        if (gd96.Input.keysPressed[gd96.Input.KEY_UP]) {
            this.y -= this.speed * delta;
            running = true;
        }

        if (gd96.Input.keysPressed[gd96.Input.KEY_DOWN]) {
            this.y += this.speed * delta;
            running = true;
        }

        if (running) {
            this.doll.initAnimation("Running");
        } else {
            this.doll.initAnimation("Idle");
        }
    }

    if (gd96.Input.keysPressed[gd96.Input.KEY_Z]) {
        if ((!this.hitHold) && (this.doll.currentAnimation != 'Hit')) {
            this.doll.initAnimation("Hit");
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
