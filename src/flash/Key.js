/**
 * @constructor
 */
var Key = function ()
{
    this.variables  = {};
    this._listeners = [];
};

/**
 * util
 */
Key.prototype = Object.create(Util.prototype);
Key.prototype.constructor = Key;

/**
 * properties
 */
Object.defineProperties(Key.prototype, {
    onKeyDown: {
        get: function () {
            return this.getProperty("onKeyDown");
        },
        set: function (onKeyDown) {
            this.setProperty("onKeyDown", onKeyDown);
        }
    },
    onKeyUp: {
        get: function () {
            return this.getProperty("onKeyUp");
        },
        set: function (onKeyUp) {
            this.setProperty("onKeyUp", onKeyUp);
        }
    }
});

/**
 * @type {number}
 */
Key.prototype.BACKSPACE = 8;
Key.prototype.CAPSLOCK  = 20;
Key.prototype.CONTROL   = 17;
Key.prototype.DELETEKEY = 46;
Key.prototype.DOWN      = 40;
Key.prototype.END       = 35;
Key.prototype.ENTER     = 13;
Key.prototype.ESCAPE    = 27;
Key.prototype.HOME      = 36;
Key.prototype.INSERT    = 45;
Key.prototype.LEFT      = 37;
Key.prototype.PGDN      = 34;
Key.prototype.PGDN      = 34;
Key.prototype.PGUP      = 33;
Key.prototype.RIGHT     = 39;
Key.prototype.SHIFT     = 16;
Key.prototype.SPACE     = 32;
Key.prototype.TAB       = 9;
Key.prototype.UP        = 38;

/**
 * @param name
 * @returns {*}
 */
Key.prototype.getProperty = function (name)
{
    return this.variables[name];
};

/**
 * @param name
 * @param value
 */
Key.prototype.setProperty = function (name, value)
{
    this.variables[String(name)] = value;
};

/**
 *
 * @param listener
 * @returns {boolean}
 */
Key.prototype.addListener = function (listener)
{
    var onKeyDown = listener.onKeyDown;
    if (onKeyDown) {
        this.onKeyDown = onKeyDown;
    }

    var onKeyUp = listener.onKeyUp;
    if (onKeyUp) {
        this.onKeyUp = onKeyUp;
    }

    return true;
};

/**
 * @param code
 * @returns {boolean}
 */
Key.prototype.isDown = function (code)
{
    return (this.getCode() === code);
};

/**
 * @returns {*}
 */
Key.prototype.getCode = function ()
{
    if (!this.$keyEvent) {
        return null;
    }

    var keyCode = 0 | this.$keyEvent.keyCode;
    if (96 <= keyCode && keyCode <= 105) {
        var n = 0 | keyCode - 96;
        switch (n) {
            case 0:
                keyCode = 48;
                break;
            case 1:
                keyCode = 49;
                break;
            case 2:
                keyCode = 50;
                break;
            case 3:
                keyCode = 51;
                break;
            case 4:
                keyCode = 52;
                break;
            case 5:
                keyCode = 53;
                break;
            case 6:
                keyCode = 54;
                break;
            case 7:
                keyCode = 55;
                break;
            case 8:
                keyCode = 56;
                break;
            case 9:
                keyCode = 57;
                break;
        }
    }
    return keyCode;
};

Util.prototype.$keyClass = new Key();