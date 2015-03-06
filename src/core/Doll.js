/**
 * @todo Refactor this mess
 *
 * @constructor
 * @extends gd96.DisplayObjectContainer
 */
gd96.Doll = function () {
    gd96.DisplayObjectContainer.call(this);

    this.topPart = new gd96.DisplayObjectContainer();

    this.topPart.lowerHand = new gd96.Quad(40, 6, gd96.palette[4], new gd96.Math.Vector2(0, 3));
    this.topPart.lowerHand.y = -45;
    this.topPart.add(this.topPart.lowerHand);


    this.topPart.body = new gd96.Quad(30, 60, gd96.palette[6], new gd96.Math.Vector2(15, 60));
    this.topPart.add(this.topPart.body);

    this.topPart.head = new gd96.Quad(15, 30, gd96.palette[7], new gd96.Math.Vector2(7.5, 30));
    this.topPart.head.y = -60;
    this.topPart.add(this.topPart.head);

    this.topPart.topHand = new gd96.Quad(50, 6, gd96.palette[7], new gd96.Math.Vector2(0, 3));
    this.topPart.topHand.x = 0;
    this.topPart.topHand.y = -50;
    this.topPart.add(this.topPart.topHand);

    this.legs = new gd96.DisplayObjectContainer();

    this.legs.leftLeg = new gd96.Quad(8, 50, gd96.palette[7], new gd96.Math.Vector2(4, 0));
    this.legs.leftLeg.x = -8;
    this.legs.add(this.legs.leftLeg);

    this.legs.rightLeg = new gd96.Quad(8, 50, gd96.palette[7], new gd96.Math.Vector2(4, 0));
    this.legs.rightLeg.x = 8;
    this.legs.add(this.legs.rightLeg);

    this.add(this.legs);
    this.add(this.topPart);

    this.animationStack = [];
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
            case 'Hit':
                this.animation = new gd96.DollAnimations.Hit(this);
                break;
        }

        if (this.currentAnimation != '') {
            this.animationStack.push(this.currentAnimation);
        }
        this.currentAnimation = anim;
    }
};

gd96.Doll.prototype.popAnimation = function () {
    if (this.animationStack.length > 0) {
        this.initAnimation(this.animationStack.pop());
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
