var extend = function (ch, pa) {
    ch.prototype = Object.create(pa.prototype);
    ch.prototype.constructor = ch;
};