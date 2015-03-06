/**
 * Game
 *
 * @constructor
 */
gd96.Game = function () {
    /**
     * Current game state
     *
     * @type DisplayObjectContainer
     * @private
     */
    this._currentState = null;
};

gd96.extend(gd96.Game, null);

/**
 * Set current state
 *
 * @param state
 */
gd96.Game.prototype.setState = function (state) {
    this._currentState = state;
};

/**
 * Update the game
 *
 * @param delta
 */
gd96.Game.prototype.update = function (delta) {
    if (this._currentState !== null)
        this._currentState.update(delta);
};

/**
 * Render the game
 *
 * @param ctx
 */
gd96.Game.prototype.rndr = function (ctx) {
    if (this._currentState !== null)
        this._currentState.rndr(ctx);
};
