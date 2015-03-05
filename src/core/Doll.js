gd96.DollAnimations = {};

/**
 *
 * @constructor
 */
gd96.DollAnimations.Animation = function (doll) {
    this.doll = doll;
    this.phase = 0;
};
gd96.extend(gd96.DollAnimations.Animation, null);

/**
 * Update animation
 *
 * @param delta
 */
gd96.DollAnimations.Animation.prototype.update = function (delta) {
    this.phase += Math.PI * delta;
};

/**
 * Idle Animation
 *
 * @param doll
 * @constructor
 * @extends gd96.DollAnimations.Animation
 */
gd96.DollAnimations.Idle = function (doll) {

    gd96.DollAnimations.Animation.call(this, doll);

    this.doll.legs.leftLeg.x = -8;
    this.doll.legs.leftLeg.y = -0;

    this.doll.legs.rightLeg.x = 8;
    this.doll.legs.rightLeg.y = -0;
};
gd96.extend(gd96.DollAnimations.Idle, gd96.DollAnimations.Animation);

/**
 * Update Idle animation
 *
 * @param delta
 */
gd96.DollAnimations.Idle.prototype.update = function (delta) {
    gd96.DollAnimations.Animation.prototype.update.call(this, delta);
    //this.doll.topPart.y = 5 + Math.sin(this.phase) * 5;
};

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
};

/**
 * Update run animation
 *
 * @param delta
 */
gd96.DollAnimations.Running.prototype.update = function (delta) {
    gd96.DollAnimations.Animation.prototype.update.call(this, delta);
    this.doll.legs.leftLeg.x = -8 + Math.sin(this.phase * 10) * 3;
    this.doll.legs.leftLeg.y = -3 + Math.cos(this.phase * 10) * 3;

    this.doll.legs.rightLeg.x = 8 + Math.cos(this.phase * 5) * 3;
    this.doll.legs.rightLeg.y = -3 + Math.sin(this.phase * 10) * 3;
};

/**
 *
 * @constructor
 * @extends gd96.DisplayObjectContainer
 */
gd96.Doll = function () {
    gd96.DisplayObjectContainer.call(this);

    this.topPart = new gd96.DisplayObjectContainer();
    this.topPart.body = new gd96.Quad(30, 60, gd96.palette[7], new gd96.Math.Vector2(15, 60));
    this.topPart.addChild(this.topPart.body);

    this.topPart.head = new gd96.Quad(15, 30, gd96.palette[7], new gd96.Math.Vector2(7.5, 30));
    this.topPart.head.x = 0;
    this.topPart.head.y = -60;
    this.topPart.addChild(this.topPart.head);

    this.legs = new gd96.DisplayObjectContainer();

    this.legs.leftLeg = new gd96.Quad(8, 50, gd96.palette[7], new gd96.Math.Vector2(4, 0));
    this.legs.leftLeg.x = -8;
    this.legs.addChild(this.legs.leftLeg);

    this.legs.rightLeg = new gd96.Quad(8, 50, gd96.palette[7], new gd96.Math.Vector2(4, 0));
    this.legs.rightLeg.x = 8;
    this.legs.addChild(this.legs.rightLeg);

    this.addChild(this.topPart);
    this.addChild(this.legs);

    this.animation = null;
    this.currentAnimation = "";

    this.initAnimation("Idle");
};

gd96.extend(gd96.Doll, gd96.DisplayObjectContainer);

/**
 * Init animation
 *
 * @param anim
 */
gd96.Doll.prototype.initAnimation = function (anim) {
    if (this.currentAnimation != anim) {
        switch (anim) {
            case 'Idle':
                this.animation = new gd96.DollAnimations.Idle(this);
                break;
            case 'Running':
                this.animation = new gd96.DollAnimations.Running(this);
                break;
        }

        this.currentAnimation = anim;
    }
};

/**
 *
 * @param delta
 * @override
 */
gd96.Doll.prototype.update = function (delta) {
    if (this.animation !== null) {
        this.animation.update(delta);
    }
};
