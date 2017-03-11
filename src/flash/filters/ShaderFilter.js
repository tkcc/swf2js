/**
 * @constructor
 */
var ShaderFilter = function (shader)
{
    BitmapFilter.call(this);

    // default
    this._bottomExtension = 0;
    this._leftExtension   = 0;
    this._rightExtension  = 0;
    this._shader          = shader;
    this._topExtension    = 0;
};

/**
 * extends
 * @type {BitmapFilter}
 */
ShaderFilter.prototype = Object.create(BitmapFilter.prototype);
ShaderFilter.prototype.constructor = ShaderFilter;

/**
 * properties
 */
Object.defineProperties(ShaderFilter.prototype, {
    topExtension: {
        get: function () {
            return this._topExtension;
        },
        set: function (topExtension) {
            if (!this.$isNaN(topExtension)) {
                this._topExtension = topExtension;
            }

        }
    },
    leftExtension: {
        get: function () {
            return this._leftExtension;
        },
        set: function (leftExtension) {
            if (!this.$isNaN(leftExtension)) {
                this._leftExtension = leftExtension;
            }

        }
    },
    rightExtension: {
        get: function () {
            return this._rightExtension;
        },
        set: function (rightExtension) {
            if (!this.$isNaN(rightExtension)) {
                this._rightExtension = rightExtension;
            }

        }
    },
    bottomExtension: {
        get: function () {
            return this._bottomExtension;
        },
        set: function (bottomExtension) {
            if (!this.$isNaN(bottomExtension)) {
                this._bottomExtension = bottomExtension;
            }

        }
    },
    shader: {
        get: function () {
            return this._shader;
        },
        set: function (shader) {
            this._shader = shader;
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
ShaderFilter.prototype.render = function (cache, matrix, colorTransform, stage)
{
    return cache;
};