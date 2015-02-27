(function () {
    var canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;

    var ctx = canvas.getContext('2d');

    document.body.appendChild(canvas);

    var render = function () {
        ctx.fillRect(0,0,800,600);
        requestAnimationFrame(render);
    };

    render();
})();

