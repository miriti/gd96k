/**
 * Idle Animation
 *
 * @param doll
 * @constructor
 * @extends gd96.DollAnimations.Animation
 */
gd96.DollAnimations.Idle = function (doll) {

    gd96.DollAnimations.Animation.call(this, doll);

    doll.legs.leftLeg.x = -8;
    doll.legs.leftLeg.y = -0;

    doll.legs.rightLeg.x = 8;
    doll.legs.rightLeg.y = -0;

    doll.topPart.topHand.rotation = Math.PI / 2;
    doll.topPart.lowerHand.rotation = Math.PI / 2;

    doll.topPart.rotation = 0;
};
gd96.extend(gd96.DollAnimations.Idle, gd96.DollAnimations.Animation);

/**
 * Update Idle animation
 *
 * @param delta
 */
gd96.DollAnimations.Idle.prototype.update = function (delta) {
    gd96.DollAnimations.Animation.prototype.update.call(this, delta);
    this.doll.topPart.y = 3 + gd96.sin(this.phase) * 3;
};
