(function (document) {
    'use strict';

    var GameObject = function () {
        DisplayObjectContainer.call(this);
        this.phase = 0;
    };
    extend(GameObject, DisplayObjectContainer);

    GameObject.prototype.render = function (ctx) {
        DisplayObjectContainer.prototype.render.call(this, ctx);

        this.circle(ctx, 0, 0, 100, 'ff0');
    };

    GameObject.prototype.update = function (delta) {
        DisplayObjectContainer.prototype.update(this, delta);

        this.x = 300 + Math.sin(this.phase) * 120;
        this.y = 300 + Math.cos(this.phase) * 120;

        this.phase += Math.PI * 2 * delta;
    };

    var Another = function () {
        DisplayObjectContainer.call(this);

        this.phase = 0;
    };
    extend(Another, DisplayObjectContainer);

    Another.prototype.render = function (ctx) {
        DisplayObjectContainer.prototype.render.call(this, ctx);

        this.circle(ctx, 0, 0, 20, '0f0', '00f', 2);
    };

    Another.prototype.update = function (delta) {
        DisplayObjectContainer.prototype.update.call(this, ctx);

        this.x = Math.sin(this.phase) * 150;
        this.y = Math.cos(this.phase) * 150;

        this.phase += (Math.PI * 5) * delta;
    };

    var Sprite = function () {
        DisplayObjectContainer.call(this);
        this.image = new Image();
        this.image.src = imageData;

        this.ready = false;

        var t = this;
        this.image.onload = function () {
            t.ready = true;
        };

        this.phase = 0;
        this.y = 128;

        this.addChild(new Another());
    };
    extend(Sprite, DisplayObjectContainer);

    Sprite.prototype.render = function (ctx) {
        DisplayObjectContainer.prototype.render.call(this, ctx);
        ctx.drawImage(this.image, -128, -128);
    };

    Sprite.prototype.update = function (delta) {
        DisplayObjectContainer.prototype.update.call(this, delta);
        this.x = 400 + Math.sin(this.phase) * 400;
        this.y = 300 + Math.cos(this.phase) * 300;
        this.phase += (Math.PI / 4) * delta;
        this.rotation += (Math.PI * 4.5) * delta;
    };

    var w = 800,
        h = 600,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime = new Date().getTime(),
        scene = new DisplayObjectContainer();

    canvas.width = w;
    canvas.height = h;

    document.getElementById('c').appendChild(canvas);

    scene.addChild(new GameObject());
    scene.addChild(new Sprite());

    var render = function () {
        var currentTime = new Date().getTime();
        var delta = currentTime - lastTime;
        lastTime = currentTime;

        scene.update(delta / 1000);

        ctx.setTransform(1, 0, 0, 1, 0, 0);

        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, w, h);
        scene.render(ctx);

        requestAnimationFrame(render);
    };

    render();
})(document);

