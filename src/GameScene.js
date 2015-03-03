/**
 * Game Scene
 *
 * @constructor
 */
gd96.GameScene = function () {
    gd96.DisplayObjectContainer.call(this);

    this.addChild(new gd96.Character());
};

gd96.extend(gd96.GameScene, gd96.DisplayObjectContainer);