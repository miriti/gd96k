/**
 *
 * @constructor
 * @extends gd96.GameScene
 */
gd96.Scenes.Cafe = function () {
    gd96.GameScene.call(this);

    this.player.x = 400;
    this.player.y = 300;
    this.addChild(this.player);

    var enemy = new gd96.Enemy();
    enemy.x = 100;
    enemy.y = 100;

    enemy.doll.initAnimation('Running');
    this.addChild(enemy);
};

gd96.extend(gd96.Scenes.Cafe, gd96.GameScene);
