/**
 *
 * @param doll
 * @constructor
 * @extends gd96.DollAnimations.Animation
 */
gd96.DollAnimations.Hit = function (doll) {
    gd96.DollAnimations.Animation.call(this, doll);
    this.timeMax = 0.2;
    this.loop = false;

    doll.legs.leftLeg.x = -8;
    doll.legs.leftLeg.y = -0;

    doll.legs.rightLeg.x = 8;
    doll.legs.rightLeg.y = -0;

    this.hand = null;

    if (gd96.rnd() > 0.5) {
        this.hand = doll.topPart.topHand;
    } else {
        this.hand = doll.topPart.lowerHand;
    }

    this.initRot = Math.PI / 16;
    doll.topPart.rotation = this.initRot;
};

/**
 * Hit animation update
 *
 * @param delta
 */
gd96.DollAnimations.Hit.prototype.update = function (delta) {
    gd96.DollAnimations.Animation.prototype.update.call(this, delta);

    this.doll.topPart.rotation = gd96.Itpl.lerp(this.initRot, 0, this.time, this.timeMax);
    this.hand.rotation = gd96.Itpl.lerp(-Math.PI / 16, Math.PI / 2, this.time, this.timeMax);
};
