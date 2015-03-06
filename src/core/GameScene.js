/**
 *
 * @param x
 * @param y
 * @param w
 * @param h
 * @constructor
 */
gd96.GameSceneObstacle = function (x, y, w, h) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = w || 10;
    this.height = h || 10;
};

gd96.extend(gd96.GameSceneObstacle, null);

/**
 * Game Scene
 *
 * @constructor
 * @extends gd96.DisplayObjectContainer
 */
gd96.GameScene = function () {
    gd96.DisplayObjectContainer.call(this);

    this.characters = [];
    this.obstacles = [];
    this.player = new gd96.Player();
};

gd96.extend(gd96.GameScene, gd96.DisplayObjectContainer);

/**
 *
 * @param obstacle GameSceneObstacle
 */
gd96.GameScene.prototype.addObstacle = function (obstacle) {
    this.obstacles.push(obstacle);

    /** @todo For debug only! remove on release **/
    var debugQuad = new gd96.Quad(obstacle.width, obstacle.height, 'faa');
    debugQuad.x = obstacle.x - obstacle.width / 2;
    debugQuad.y = obstacle.y - obstacle.height / 2;
    this.add(debugQuad);
};

/**
 *
 * @param obstacle
 */
gd96.GameScene.prototype.removeObstacle = function (obstacle) {
    var index = this.obstacles.indexOf(obstacle);
    if (index != -1) {
        this.obstacles.splice(index, 1);
    }
};

/**
 * While adding a child also fill the characters list
 * @param child
 * @override
 */
gd96.GameScene.prototype.add = function (child) {
    gd96.DisplayObjectContainer.prototype.add.call(this, child);
    if (child instanceof gd96.Character) {
        this.characters.push(child);
    }
};

/**
 *
 * @param child
 * @override
 */
gd96.GameScene.prototype.rem = function (child) {
    gd96.DisplayObjectContainer.prototype.rem.call(this, child);

    var index = this.characters.indexOf(child);
    if (index != -1) {
        this.characters.splice(index, 1);
    }
};

gd96.Scenes = {};
