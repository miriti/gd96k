/**
 * Package
 */
var gd96 = {};

gd96.palette = ['1c1c1c', '393939', '565656', '727272', '8f8f8f', 'adadad', 'cacaca', 'e6e6e6'];

/**
 * Extend one Function from another
 *
 * @param ch
 * @param pa
 */
gd96.extend = function (ch, pa) {
    if (pa !== null) {
        ch.prototype = Object.create(pa.prototype);
    }
    ch.prototype.constructor = ch;
};

gd96.timestamp = 0;

gd96.tick = function () {
    gd96.timestamp = new Date().getTime();
};

gd96.tick();
