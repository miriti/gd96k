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
 */
gd96.GameScene = function () {
    gd96.DisplayObjectContainer.call(this);

    this.characters = [];
    this.obstacles = [];

    this.addChild(new gd96.Player());

    var enemy = new gd96.Enemy();
    enemy.x = 300;
    enemy.y = 300;

    this.addChild(enemy);

    this.addObstacle(new gd96.GameSceneObstacle(260, 100, 500, 20));
    this.addObstacle(new gd96.GameSceneObstacle(380, 300, 40, 600));
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
    this.addChild(debugQuad);
};

/**
 * While adding a child also fill the characters list
 * @param child
 * @override
 */
gd96.GameScene.prototype.addChild = function (child) {
    gd96.DisplayObjectContainer.prototype.addChild.call(this, child);
    if (child instanceof gd96.Character) {
        this.characters.push(child);
    }
};

/**
 *
 * @param child
 * @override
 */
gd96.GameScene.prototype.removeChild = function (child) {
    gd96.DisplayObjectContainer.prototype.removeChild.call(this, child);

    var index = this.characters.indexOf(child);
    if (index != -1) {
        this.characters.splice(index, 1);
    }
};