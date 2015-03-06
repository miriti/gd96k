/**
 * Run animation
 *
 * @param doll
 * @constructor
 * @extends gd96.DollAnimations.Animation
 */
gd96.DollAnimations.Running = function (doll) {
    gd96.DollAnimations.Animation.call(this, doll);
    doll.topPart.y = 0;
    doll.topPart.rotation = Math.PI / 12;
};

/**
 * Update run animation
 *
 * @param delta
 */
gd96.DollAnimations.Running.prototype.update = function (delta) {
    gd96.DollAnimations.Animation.prototype.update.call(this, delta);
    this.doll.legs.leftLeg.y = -4 + gd96.cos(this.phase * 10) * 4;
    this.doll.legs.rightLeg.y = -4 + gd96.sin(this.phase * 10) * 4;

    this.doll.topPart.topHand.rotation = Math.PI / 2 - Math.sin(this.phase * 5);
    this.doll.topPart.lowerHand.rotation = Math.PI / 2 + Math.sin(this.phase * 5);
};
