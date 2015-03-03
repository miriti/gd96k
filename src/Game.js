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

gd96.Game.prototype.setState = function (state) {
    this._currentState = state;
};

gd96.Game.prototype.update = function (delta) {
    if (this._currentState !== null)
        this._currentState.update(delta);
};

gd96.Game.prototype.render = function (ctx) {
    if (this._currentState !== null)
        this._currentState.render(ctx);
};