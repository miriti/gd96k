/**
 * Input
 *
 * @type Object
 */
gd96.Input = {
    keysPressed: new Array(256),
    keydown: function (e) {
        if ((typeof gd96.Input.keysPressed[e.keyCode] == 'undefined') || (gd96.Input.keysPressed[e.keyCode] === null)) {
            gd96.Input.keysPressed[e.keyCode] = gd96.timestamp();
        }
    },
    keyup: function (e) {
        gd96.Input.keysPressed[e.keyCode] = null;
    },
    getKeyTime: function (key) {
        if ((typeof gd96.Input.keysPressed[key] !== 'undefined') && (gd96.Input.keysPressed[key] !== null)) {
            return gd96.timestamp() - gd96.Input.keysPressed[key];
        } else {
            return 0;
        }
    }
};