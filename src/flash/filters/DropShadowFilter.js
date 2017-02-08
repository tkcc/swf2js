/**
 * @constructor
 */
var DropShadowFilter = function ()
{
    BitmapFilter.call(this);

    this.filterId = 0;

    // default
    this._distance   = 4;
    this._angle      = 45;
    this._color      = 0;
    this._alpha      = 1;
    this._blurX      = 4;
    this._blurY      = 4;
    this._strength   = 1;
    this._quality    = 1;
    this._inner      = false;
    this._knockout   = false;
    this._hideObject = false;

    var arg = arguments;
    this.distance   = arg[0];
    this.angle      = arg[1];
    this.color      = arg[2];
    this.alpha      = arg[3];
    this.blurX      = arg[4];
    this.blurY      = arg[5];
    this.strength   = arg[6];
    this.quality    = arg[7];
    this.inner      = arg[8];
    this.knockout   = arg[9];
    this.hideObject = arg[10];
};

/**
 * extends
 * @type {BitmapFilter}
 */
DropShadowFilter.prototype = Object.create(BitmapFilter.prototype);
DropShadowFilter.prototype.constructor = DropShadowFilter;

/**
 * properties
 */
Object.defineProperties(DropShadowFilter.prototype, {
    distance: {
        get: function () {
            return this._distance;
        },
        set: function (distance) {
            if (!this.$isNaN(distance)) {
                this._distance = distance;
            }
        }
    },
    angle: {
        get: function () {
            return this._angle;
        },
        set: function (angle) {
            if (!this.$isNaN(angle) && 0 <= angle && 360 >= angle) {
                this._angle = angle % 360;
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
            return this._alphae;
        },
        set: function (alpha) {
            if (!this.$isNaN(alpha) && 0 <= alpha && 1 >= alpha) {
                this._alphae = alpha;
            }
        }
    },
    blurX: {
        get: function () {
            return this._blurX;
        },
        set: function (blurX) {
            if (!this.$isNaN(blurX) && 0 <= blurX && 256 > blurX) {
                this._blurX = blurX;
            }
        }
    },
    blurY: {
        get: function () {
            return this._blurY;
        },
        set: function (blurY) {
            if (!this.$isNaN(blurY) && 0 <= blurY && 256 > blurY) {
                this._blurY = blurY;
            }
        }
    },
    strength: {
        get: function () {
            return this._strength;
        },
        set: function (strength) {
            if (!this.$isNaN(strength) && 0 <= strength && 256 > strength) {
                this._strength = strength;
            }
        }
    },
    quality: {
        get: function () {
            return this._quality;
        },
        set: function (quality) {
            if (0 < quality && 16 > quality) {
                this._quality = quality;
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
    },
    hideObject: {
        get: function () {
            return this._hideObject;
        },
        set: function (hideObject) {
            if (typeof hideObject === "boolean") {
                this._hideObject = hideObject;
            }
        }
    }
});


/**
 * @param cache
 * @param matrix
 * @param colorTransform
 * @param stage
 */
DropShadowFilter.prototype.render = function (cache, matrix, colorTransform, stage)
{
    var strength = this.strength;
    if (strength <= 0) {
        return cache;
    }

    var quality = this.quality;
    var inner   = this.inner;

    var r = +(this.angle * this.$PI / 180);
    var blurX = this.blurX;
    var blurY = this.blurY;

    // blur
    var blurFilter = new BlurFilter(blurX, blurY, quality);
    var ctx        = blurFilter.render(cache, matrix, colorTransform, stage);

    // dropShadow
    var filterColor = this.$intToRGBA(this.color);
    var color       = this.$generateColorTransform(filterColor, colorTransform);
    ctx             = this.coatOfColor(ctx, color, inner, strength);

    // synthesis
    var cacheOffsetX = cache._offsetX;
    var cacheOffsetY = cache._offsetY;
    var _offsetX     = ctx._offsetX;
    var _offsetY     = ctx._offsetY;

    var canvas = ctx.canvas;
    var width  = (canvas.width  + cacheOffsetX)|0;
    var height = (canvas.height + cacheOffsetY)|0;

    var distance = this.distance;
    var scale    = stage.getScale();
    var x = this.$ceil(this.$cos(r) * distance * scale * stage.ratio)|0;
    var y = this.$ceil(this.$sin(r) * distance * scale * stage.ratio)|0;

    width  = (width  + this.$abs(x))|0;
    height = (height + this.$abs(y))|0;

    var cx = _offsetX;
    var cy = _offsetY;
    var dx = 0;
    var dy = 0;
    if (x < 0) {
        cx = (cx - x)|0;
    } else if (x > 0) {
        dx = x|0;
    }

    if (y < 0) {
        cy = (cy - y)|0;
    } else if (y > 0) {
        dy = y|0;
    }

    var synCanvas = this.$cacheStore.getCanvas();
    synCanvas.width  = width|0;
    synCanvas.height = height|0;

    var synCtx = synCanvas.getContext("2d");
    synCtx.drawImage(cache.canvas, cx, cy);
    synCtx.globalAlpha = this.alpha;
    if (strength < 1) {
        synCtx.globalAlpha = +(synCtx.globalAlpha * strength);
    }

    var knockout   = this.knockout;
    var hideObject = this.hideObject;
    synCtx.globalCompositeOperation = this.filterOperation(inner, knockout, hideObject);

    if (inner) {
        var innerCanvas    = this.$cacheStore.getCanvas();
        innerCanvas.width  = width;
        innerCanvas.height = height;
        var innerCtx       = innerCanvas.getContext("2d");

        // back
        innerCtx.fillStyle = "rgba(" +
            filterColor.R + "," +
            filterColor.G + "," +
            filterColor.B + "," +
            filterColor.A + ")";
        innerCtx.fillRect(0, 0, width, height);

        // mask
        innerCtx.globalCompositeOperation = "destination-out";
        innerCtx.fillStyle = "black";
        innerCtx.fillRect(cacheOffsetX + dx, cacheOffsetY + dy, canvas.width, canvas.height);

        innerCtx.globalCompositeOperation = "source-over";
        innerCtx.drawImage(canvas, cacheOffsetX + dx, cacheOffsetY + dy);

        synCtx.drawImage(innerCtx.canvas, 0, 0);
        this.$cacheStore.destroy(innerCtx);

    } else {
        synCtx.drawImage(canvas, cacheOffsetX + dx, cacheOffsetY + dy);
    }

    synCtx._offsetX = +(cacheOffsetX + cx);
    synCtx._offsetY = +(cacheOffsetY + cy);

    this.$cacheStore.destroy(ctx);

    return synCtx;
};