/**
 * @constructor
 */
var InteractiveObject = function ()
{
    this._mouseEnabled = true;
    DisplayObject.call(this);
};

/**
 * extends
 * @type {DisplayObject}
 */
InteractiveObject.prototype = Object.create(DisplayObject.prototype);
InteractiveObject.prototype.constructor = InteractiveObject;

/**
 * properties
 */
Object.defineProperties(DisplayObject.prototype,
    {
        mouseEnabled: {
            get: function () {
                return this.getMouseEnabled();
            },
            set: function (mouseEnabled) {
                this.setMouseEnabled(mouseEnabled);
            }
        }
    });

/**
 * @returns {boolean}
 */
InteractiveObject.prototype.getMouseEnabled = function ()
{
    return this._mouseEnabled;
};

/**
 * @param mouseEnabled
 */
InteractiveObject.prototype.setMouseEnabled = function (mouseEnabled)
{
    this._mouseEnabled = mouseEnabled;
};