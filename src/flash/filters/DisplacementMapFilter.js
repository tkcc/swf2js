/**
 * @constructor
 */
var DisplacementMapFilter = function ()
{
    BitmapFilter.call(this);

    // default
    this._alpha      = 0.0;
    this._color      = 0;
    this._componentX = 0;
    this._componentY = 0;
    this._mapBitmap  = null;
    this._mapPoint   = null;
    this._mode       = "wrap";
    this._scaleX     = 0.0;
    this._scaleY     = 0.0;

    var arg = arguments;
    this.mapBitmap  = arg[0];
    this.mapPoint   = arg[1];
    this.componentX = arg[2];
    this.componentY = arg[3];
    this.scaleX     = arg[4];
    this.scaleY     = arg[5];
    this.mode       = arg[6];
    this.color      = arg[7];
    this.alpha      = arg[8];
};

/**
 * extends
 * @type {BitmapFilter}
 */
DisplacementMapFilter.prototype = Object.create(BitmapFilter.prototype);
DisplacementMapFilter.prototype.constructor = DisplacementMapFilter;

/**
 * properties
 */
Object.defineProperties(DisplacementMapFilter.prototype, {
    mapBitmap: {
        get: function () {
            return this._mapBitmap;
        },
        set: function (mapBitmap) {
            this._mapBitmap = mapBitmap;
        }
    },
    mapPoint: {
        get: function () {
            return this._mapPoint;
        },
        set: function (mapPoint) {
            this._mapPoint = mapPoint;
        }
    },
    componentX: {
        get: function () {
            return this._componentX;
        },
        set: function (componentX) {
            if (!this.$isNaN(componentX)) {
                this._componentX = componentX;
            }
        }
    },
    componentY: {
        get: function () {
            return this._componentY;
        },
        set: function (componentY) {
            if (!this.$isNaN(componentY)) {
                this._componentY = componentY;
            }
        }
    },
    scaleX: {
        get: function () {
            return this._scaleX;
        },
        set: function (scaleX) {
            if (!this.$isNaN(scaleX)) {
                this._scaleX = scaleX;
            }
        }
    },
    scaleY: {
        get: function () {
            return this._scaleY;
        },
        set: function (scaleY) {
            if (!this.$isNaN(scaleY)) {
                this._scaleY = scaleY;
            }
        }
    },
    mode: {
        get: function () {
            return this._mode;
        },
        set: function (mode) {
            this._mode = mode;
        }
    },
    color: {
        get: function () {
            return this._color;
        },
        set: function (color) {
            if (!this.$isNaN(color)) {
                this._color = color;
            }
        }
    },
    alpha: {
        get: function () {
            return this._alpha;
        },
        set: function (alpha) {
            if (!this.$isNaN(alpha)) {
                this._alpha = alpha;
            }
        }
    }
});

/**
 * @param cache
 * @param matrix
 * @param colorTransform
 * @param stage
 * @returns {*}
 */
DisplacementMapFilter.prototype.render = function (cache, matrix, colorTransform, stage)
{
    return cache;
};
