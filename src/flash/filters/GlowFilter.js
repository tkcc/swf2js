/**
 * @constructor
 */
var GlowFilter = function ()
{
    BitmapFilter.call(this);

    this.filterId = 2;

    // default
    this._color    = 0xff0000;
    this._alpha    = 1;
    this._blurX    = 6;
    this._blurY    = 6;
    this._strength = 2;
    this._quality  = 1;
    this._inner    = false;
    this._knockout = false;

    var arg       = arguments;
    this.color    = arg[0];
    this.alpha    = arg[1];
    this.blurX    = arg[2];
    this.blurY    = arg[3];
    this.strength = arg[4];
    this.quality  = arg[5];
    this.inner    = arg[6];
    this.knockout = arg[7];
};

/**
 * extends
 * @type {BitmapFilter}
 */
GlowFilter.prototype = Object.create(BitmapFilter.prototype);
GlowFilter.prototype.constructor = GlowFilter;

/**
 * properties
 */
Object.defineProperties(GlowFilter.prototype, {
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
                this._alpha = +alpha;
            }
        }
    },
    blurX: {
        get: function () {
            return this._blurX;
        },
        set: function (blurX) {
            if (!this.$isNaN(blurX) && 0 <= blurX && 256 > blurX) {
                this._blurX = +blurX;
            }
        }
    },
    blurY: {
        get: function () {
            return this._blurY;
        },
        set: function (blurY) {
            if (!this.$isNaN(blurY) && 0 <= blurY && 256 > blurY) {
                this._blurY = +blurY;
            }
        }
    },
    strength: {
        get: function () {
            return this._strength;
        },
        set: function (strength) {
            if (!this.$isNaN(strength) && 0 <= strength && 256 > strength) {
                this._strength = +strength;
            }
        }
    },
    quality: {
        get: function () {
            return this._quality;
        },
        set: function (quality) {
            if (!this.$isNaN(quality) && 0 < quality && 16 > quality) {
                this._quality = quality|0;
            }
        }
    },
    inner: {
        get: function () {
            return this._inner;
        },
        set: function (inner) {
            if (typeof inner === "boolean") {
                this._inner = inner;
            }
        }
    },
    knockout: {
        get: function () {
            return this._knockout;
        },
        set: function (knockout) {
            if (typeof knockout === "boolean") {
                this._knockout = knockout;
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
GlowFilter.prototype.render = function (cache, matrix, colorTransform, stage)
{
    var strength = this.strength;
    if (strength <= 0) {
        return cache;
    }

    var blurFilter = new BlurFilter(this.blurX, this.blurY, this.quality);

    var ctx    = blurFilter.render(cache, matrix, colorTransform, stage);
    var width  = (ctx.canvas.width  + cache._offsetX)|0;
    var height = (ctx.canvas.height + cache._offsetY)|0;

    var filterColor = this.$intToRGBA(this.color);
    var color       = this.$generateColorTransform(filterColor, colorTransform);

    ctx = this.coatOfColor(ctx, color, this.inner, strength);

    var synCanvas    = this.$cacheStore.getCanvas();
    synCanvas.width  = width;
    synCanvas.height = height;

    var synCtx = synCanvas.getContext("2d");
    synCtx.drawImage(cache.canvas, ctx._offsetX, ctx._offsetY);
    synCtx.globalAlpha = this.alpha;
    if (strength < 1) {
        synCtx.globalAlpha = +(synCtx.globalAlpha * strength);
    }

    synCtx.globalCompositeOperation = this.filterOperation(this.inner, this.knockout);
    synCtx.drawImage(ctx.canvas, cache._offsetX, cache._offsetY);
    synCtx._offsetX = +(cache._offsetX + ctx._offsetX);
    synCtx._offsetY = +(cache._offsetY + ctx._offsetY);

    this.$cacheStore.destroy(ctx);

    return synCtx;
};