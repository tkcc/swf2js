/**
 * @constructor
 */
var ConvolutionFilter = function ()
{
    BitmapFilter.call(this);
    this.filterId = 5;

    // default
    this._matrixX       = 0;
    this._matrixY       = 0;
    this._matrix        = null;
    this._divisor       = 0;
    this._bias          = 0;
    this._preserveAlpha = true;
    this._clamp         = true;
    this._color         = 0;
    this._alpha         = 0;

    var arg = arguments;
    this.matrixX       = arg[0];
    this.matrixY       = arg[1];
    this.matrix        = arg[2];
    this.divisor       = arg[3];
    this.bias          = arg[4];
    this.preserveAlpha = arg[5];
    this.clamp         = arg[6];
    this.color         = arg[7];
    this.alpha         = arg[8];
};

/**
 * extends
 * @type {BitmapFilter}
 */
ConvolutionFilter.prototype = Object.create(BitmapFilter.prototype);
ConvolutionFilter.prototype.constructor = ConvolutionFilter;

/**
 * properties
 */
Object.defineProperties(BevelFilter.prototype, {
    matrixX: {
        get: function () {
            return this._matrixX;
        },
        set: function (matrixX) {
            if (!this.$isNaN(matrixX)) {
                this._matrixX = matrixX;
            }
        }
    },
    matrixY: {
        get: function () {
            return this._matrixY;
        },
        set: function (matrixY) {
            if (!this.$isNaN(matrixY)) {
                this._matrixY = matrixY;
            }
        }
    },
    matrix: {
        get: function () {
            return this._matrix;
        },
        set: function (matrix) {
            if (matrix instanceof Array) {
                this._matrix = matrix;
            }
        }
    },
    divisor: {
        get: function () {
            return this._divisor;
        },
        set: function (divisor) {
            if (!this.$isNaN(divisor)) {
                this._divisor = divisor;
            }
        }
    },
    bias: {
        get: function () {
            return this._bias;
        },
        set: function (bias) {
            if (!this.$isNaN(bias)) {
                this._bias = bias;
            }
        }
    },
    preserveAlpha: {
        get: function () {
            return this._preserveAlpha;
        },
        set: function (preserveAlpha) {
            if (typeof preserveAlpha === "boolean") {
                this._preserveAlpha = preserveAlpha;
            }
        }
    },
    clamp: {
        get: function () {
            return this._clamp;
        },
        set: function (clamp) {
            if (typeof clamp === "boolean") {
                this._clamp = clamp;
            }
        }
    },
    color: {
        get: function () {
            return this._color;
        },
        set: function (color) {
            if (color) {
                this._color = this.$toColorInt(color);
            }
        }
    },
    alpha: {
        get: function () {
            return this._alpha;
        },
        set: function (alpha) {
            if (!this.$isNaN(alpha) && 0 <= alpha && 1 >= alpha) {
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
ConvolutionFilter.prototype.render = function (cache, matrix, colorTransform, stage)
{
    return cache;
};