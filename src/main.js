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
        lastTime = gd96.timestamp,
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

    game.setState(new gd96.Scenes.Cafe());

    var render = function () {
        gd96.tick();

        var currentTime = gd96.timestamp;
        var delta = (currentTime - lastTime) / 1000;
        lastTime = currentTime;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = gd96.palette[0];
        ctx.fillRect(0, 0, w, h);

        var interval = 0.02;

        if (delta > interval) {
            do {
                game.update(interval);
                delta -= interval;
            } while (delta > interval);
        }
        game.update(delta);
        game.rndr(ctx);

        requestAnimationFrame(render);
    };

    render();
})(document, window);
