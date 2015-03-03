/**
 * @param document Document
 * @param window Window
 */
(function (document, window) {
    'use strict';

    var w = 800,
        h = 600,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime = gd96.timestamp(),
        game = new gd96.Game();

    canvas.width = w;
    canvas.height = h;

    document.getElementById('c').appendChild(canvas);

    window.addEventListener('keydown', function (e) {
        gd96.Input.keydown(e);
    });

    window.addEventListener('keyup', function (e) {
        gd96.Input.keyup(e);
    });

    game.setState(new gd96.GameScene());

    var render = function () {
        var currentTime = gd96.timestamp();
        var delta = currentTime - lastTime;
        lastTime = currentTime;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, w, h);

        game.update(delta / 1000);
        game.render(ctx);

        requestAnimationFrame(render);
    };

    render();
})(document, window);

