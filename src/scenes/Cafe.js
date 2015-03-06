/**
 *
 * @constructor
 * @extends gd96.GameScene
 */
gd96.Scenes.Cafe = function () {
    gd96.GameScene.call(this);

    this.player.x = 400;
    this.player.y = 300;
    this.add(this.player);

    var enemy = new gd96.Enemy();
    enemy.x = 300;
    enemy.y = 300;
    this.add(enemy);
};

gd96.extend(gd96.Scenes.Cafe, gd96.GameScene);
