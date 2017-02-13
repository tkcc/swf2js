/**
 * @constructor
 */
var GradientGlowFilter = function ()
{
    BitmapFilter.call(this);

    this.filterId = 4;

    // default
    this._distance = 4;
    this._angle    = 45;
    this._colors   = null;
    this._alphas   = null;
    this._ratios   = null;
    this._blurX    = 4;
    this._blurY    = 4;
    this._strength = 1;
    this._quality  = 1;
    this._type     = "inner";
    this._knockout = false;

    var arg = arguments;
    this.distance = arg[0];
    this.angle    = arg[1];
    this.colors   = arg[2];
    this.alphas   = arg[3];
    this.ratios   = arg[4];
    this.blurX    = arg[5];
    this.blurY    = arg[6];
    this.strength = arg[7];
    this.quality  = arg[8];
    this.type     = arg[9];
    this.knockout = arg[10];

};

/**
 * extends
 * @type {BitmapFilter}
 */
GradientGlowFilter.prototype = Object.create(BitmapFilter.prototype);
GradientGlowFilter.prototype.constructor = GradientGlowFilter;

/**
 * properties
 */
Object.defineProperties(GradientGlowFilter.prototype, {
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
    colors: {
        get: function () {
            return this._colors;
        },
        set: function (colors) {
            if (colors instanceof Array) {
                this._colors = colors;
            }
        }
    },
    alphas: {
        get: function () {
            return this._alphas;
        },
        set: function (alphas) {
            if (alphas instanceof Array) {
                this._alphas = alphas;
            }
        }
    },
    ratios: {
        get: function () {
            return this._ratios;
        },
        set: function (ratios) {
            if (ratios instanceof Array) {
                this._ratios = ratios;
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
    type: {
        get: function () {
            return this._type;
        },
        set: function (type) {
            if (typeof type === "string") {
                switch (type) {
                    case "inner":
                    case "outer":
                    case "full":
                        this._type = type;
                        break;
                    default:
                        break;
                }
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
GradientGlowFilter.prototype.render = function (cache, matrix, colorTransform, stage)
{
    var strength = this.strength;
    if (!strength) {
        return cache;
    }

    // gradient
    var ratios = this.ratios;
    var colors = this.colors;
    var alphas = this.alphas;

    // gradient canvas
    var gCanvas = this.$cacheStore.getCanvas();
    gCanvas.width  = 256;
    gCanvas.heigth = 1;
    var gCtx = gCanvas.getContext("2d");

    var css = gCtx.createLinearGradient(0, 0, 255, 0);
    var length = ratios.length;
    var i = 0;
    while (i < length) {
        var color = this.$intToRGBA(colors[i], alphas[i] * 100);
        color = this.$generateColorTransform(color, colorTransform);
        var rgba = "rgba("+color.R+","+color.G+","+color.B+","+color.A+")";

        // set
        css.addColorStop(ratios[i], rgba);

        i = (i + 1)|0;
    }
    gCtx.fillStyle = css;
    gCtx.fillRect(0, 0, 256, 1);
    var imageData = gCtx.getImageData(0, 0, 256, 1);
    var pxGrad    = imageData.data;

    var angle    = this.angle;
    var blurX    = this.blurX;
    var blurY    = this.blurY;
    var quality  = this.quality;
    var knockout = this.knockout;
    var type     = this.type;

    var blurFilter = new BlurFilter(blurX, blurY, quality);
    var ctx = blurFilter.render(cache, matrix, colorTransform, stage);

    // synthesis
    var cacheOffsetX = cache._offsetX;
    var cacheOffsetY = cache._offsetY;
    var _offsetX     = ctx._offsetX;
    var _offsetY     = ctx._offsetY;

    var canvas = ctx.canvas;
    var width  = (canvas.width  + cacheOffsetX)|0;
    var height = (canvas.height + cacheOffsetY)|0;

    imageData  = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pxData = imageData.data;

    i = 0;
    length = pxData.length;
    var idx;
    while (i < length) {
        idx  = (pxData[i + 3] * 4)|0;
        if (idx) {
            pxData[i   ]  = pxGrad[idx    ];
            pxData[i + 1] = pxGrad[idx + 1];
            pxData[i + 2] = pxGrad[idx + 2];
        }

        i = (i + 4)|0;
    }
    ctx.putImageData(imageData, 0, 0);
    canvas = ctx.canvas;

    var r = +(angle * this.$PI / 180);
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
    if (!knockout) {
        synCtx.drawImage(cache.canvas, cx, cy);
    }

    synCtx.globalAlpha = this.alpha;
    if (strength < 1) {
        synCtx.globalAlpha = +(synCtx.globalAlpha * strength);
    }

    var isInner = (type === "inner" || type === "full");
    var isOuter = (type === "outer" || type === "full");
    var operation;
    if (isInner && isOuter) {
        operation = "source-over";
    } else if (isInner) {
        synCtx.drawImage(cache.canvas, cx, cy);
        operation = this.filterOperation(true, knockout);
    } else if (isOuter) {
        operation = "destination-over";
    }

    synCtx.globalCompositeOperation = operation;
    synCtx.drawImage(canvas, cacheOffsetX + dx, cacheOffsetY + dy);
    if (!isInner && isOuter && knockout) {
        synCtx.globalCompositeOperation = "destination-out";
        synCtx.drawImage(cache.canvas, cx, cy);
    }

    synCtx._offsetX = +(cacheOffsetX + cx);
    synCtx._offsetY = +(cacheOffsetY + cy);

    this.$cacheStore.destroy(ctx);

    return synCtx;
};