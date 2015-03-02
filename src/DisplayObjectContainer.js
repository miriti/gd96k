var DisplayObjectContainer = function () {
    this.children = [];
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
};

DisplayObjectContainer.prototype.constructor = DisplayObjectContainer;

DisplayObjectContainer.prototype.fillStroke = function (ctx, fill, stroke, lineWidth) {
    ctx.fillStyle = '#' + fill;
    ctx.strokeStyle = '#' + stroke;
    ctx.lineWidth = lineWidth;
};

DisplayObjectContainer.prototype.rect = function (ctx, x, y, w, h, col) {
    this.fillStroke(ctx, col, '000', 1);
    ctx.fillRect(x, y, w, h);
};

DisplayObjectContainer.prototype.circle = function (ctx, cx, cy, r, fill, stroke, lineWidth) {
    ctx.beginPath();
    this.fillStroke(ctx, fill || 'f00', stroke || '000', lineWidth || 1);
    ctx.arc(cx, cx, r, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
};

DisplayObjectContainer.prototype.addChild = function (child) {
    this.children.push(child);
};

DisplayObjectContainer.prototype.removeChild = function (child) {
    var index = this.children.indexOf(child);

    if (index != -1) {
        this.children.splice(index, 1);
    }
};

DisplayObjectContainer.prototype.update = function (delta) {
    for (var i in this.children) {
        this.children[i].update(delta);
    }
};

DisplayObjectContainer.prototype.render = function (ctx) {
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    if (this.children.length > 0) {
        for (var i in this.children) {
            ctx.save();
            this.children[i].render(ctx);
            ctx.restore();
        }
    }
};