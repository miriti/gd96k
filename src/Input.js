/**
 * Input
 *
 * @type Object
 */
gd96.Input = {
    /**
     * @const
     */
    KEY_LEFT: 37,
    /**
     * @const
     */
    KEY_RIGHT: 39,
    /**
     * @const
     */
    KEY_UP: 38,
    /**
     * @const
     */
    KEY_DOWN: 40,
    /**
     * @const
     */
    KEY_A: 65,
    /**
     * @const
     */
    KEY_C: 67,
    /**
     * @const
     */
    KEY_D: 68,
    /**
     * @const
     */
    KEY_S: 83,
    /**
     * @const
     */
    KEY_W: 87,
    /**
     * @const
     */
    KEY_X: 88,
    /**
     * @const
     */
    KEY_Z: 90,
    keysPressed: new Array(256),
    keydown: function (e) {
        if ((typeof gd96.Input.keysPressed[e.keyCode] == 'undefined') || (gd96.Input.keysPressed[e.keyCode] === null)) {
            gd96.Input.keysPressed[e.keyCode] = gd96.timestamp;
        }
    },
    keyup: function (e) {
        gd96.Input.keysPressed[e.keyCode] = null;
    },
    getKeyTime: function (key) {
        if ((typeof gd96.Input.keysPressed[key] !== 'undefined') && (gd96.Input.keysPressed[key] !== null)) {
            return gd96.timestamp - gd96.Input.keysPressed[key];
        } else {
            return 0;
        }
    }
};