gd96.DollAnimations = {};

/**
 *
 * @constructor
 */
gd96.DollAnimations.Animation = function (doll) {
    this.doll = doll;
    this.phase = Math.random() * (Math.PI * 2);
    this.time = 0;
    this.timeMax = 0;
    this.loop = true;
};
gd96.extend(gd96.DollAnimations.Animation, null);

/**
 * Update animation
 *
 * @param delta
 */
gd96.DollAnimations.Animation.prototype.update = function (delta) {
    if (!this.loop) {
        if (this.time >= this.timeMax) {
            this.doll.popAnimation();
        }
    }

    this.phase += Math.PI * delta;
    this.time += delta;
    if (!this.loop) {
        if (this.time > this.timeMax) this.time = this.timeMax
    }
};
