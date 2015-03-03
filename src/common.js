var gd96 = {};

gd96.extend = function (ch, pa) {
    if (pa !== null) {
        ch.prototype = Object.create(pa.prototype);
    }
    ch.prototype.constructor = ch;
};

gd96.timestamp = function () {
    return new Date().getTime();
};