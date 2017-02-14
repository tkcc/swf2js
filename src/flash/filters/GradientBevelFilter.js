/**
 * @constructor
 */
var GradientBevelFilter = function ()
{
    BitmapFilter.call(this);

    this.filterId = 7;

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
GradientBevelFilter.prototype = Object.create(BitmapFilter.prototype);
GradientBevelFilter.prototype.constructor = GradientBevelFilter;

/**
 * properties
 */
Object.defineProperties(GradientBevelFilter.prototype, {
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
            if (!this.$isNaN(strength) && 0 <= strength && 256 >= strength) {
                this._strength = strength;
            }
        }
    },
    quality: {
        get: function () {
            return this._quality;
        },
        set: function (quality) {
            if (!this.$isNaN(quality) && 0 < quality && 16 > quality) {
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
GradientBevelFilter.prototype.render = function (cache, matrix, colorTransform, stage)
{
    var length, i, css, color, rgba, imageData, pxGrad, pxData, idx;

    var angle    = this.angle;
    var blurX    = this.blurX;
    var blurY    = this.blurY;
    var strength = this.strength;
    var quality  = this.quality;
    var knockout = this.knockout;
    var type     = this.type;

    var r = +(angle * this.$PI / 180);

    // blur
    var blurFilter = new BlurFilter(blurX, blurY, quality);
    var ctx        = blurFilter.render(cache, matrix, colorTransform, stage);
    if (strength > 0) {
        i = 1;
        while (i < strength) {
            i = (i + 1)|0;
            ctx.drawImage(ctx.canvas, 0, 0);
        }
    }

    var canvas     = ctx.canvas;
    var _offsetX   = ctx._offsetX;
    var _offsetY   = ctx._offsetY;

    var cacheOffsetX = cache._offsetX;
    var cacheOffsetY = cache._offsetY;

    var width  = (canvas.width  + cacheOffsetX)|0;
    var height = (canvas.height + cacheOffsetY)|0;

    var distance = this.distance;
    var scale    = stage.getScale();
    var x = this.$ceil(this.$cos(r) * distance * scale * stage.ratio)|0;
    var y = this.$ceil(this.$sin(r) * distance * scale * stage.ratio)|0;

    var ox = _offsetX + this.$abs(x);
    var oy = _offsetY + this.$abs(y);

    width  = (width  + this.$abs(x) * 2)|0;
    height = (height + this.$abs(y) * 2)|0;

    var synCanvas    = this.$cacheStore.getCanvas();
    synCanvas.width  = width|0;
    synCanvas.height = height|0;
    var synCtx       = synCanvas.getContext("2d");

    if (!knockout) {
        synCtx.drawImage(cache.canvas, ox, oy);
    }

    if (strength < 1) {
        synCtx.globalAlpha = +(synCtx.globalAlpha * strength);
    }

    // gradient
    var ratios = this.ratios;
    var colors = this.colors;
    var alphas = this.alphas;

    // shadow gradient canvas
    var gCanvas    = this.$cacheStore.getCanvas();
    gCanvas.width  = 512;
    gCanvas.heigth = 1;
    var gCtx       = gCanvas.getContext("2d");

    css    = gCtx.createLinearGradient(0, 0, 511, 0);
    length = ratios.length;

    i = 0;
    while (i < length) {
        color = this.$intToRGBA(colors[i], alphas[i] * 100);
        color = this.$generateColorTransform(color, colorTransform);
        rgba  = "rgba("+color.R+","+color.G+","+color.B+","+color.A+")";

        // set
        css.addColorStop(ratios[i], rgba);

        i = (i + 1)|0;
    }
    gCtx.fillStyle = css;
    gCtx.fillRect(0, 0, 512, 1);
    imageData = gCtx.getImageData(0, 0, 512, 1);
    pxGrad    = imageData.data;

    // shadow
    var shadowCanvas    = this.$cacheStore.getCanvas();
    shadowCanvas.width  = width|0;
    shadowCanvas.height = height|0;
    var shadowCtx       = shadowCanvas.getContext("2d");
    shadowCtx.setTransform(1,0,0,1,this.$abs(x),this.$abs(y));
    shadowCtx.globalCompositeOperation = "source-out";

    // highlight
    shadowCtx.drawImage(canvas, cacheOffsetX - x, cacheOffsetY - y);
    // shadow
    shadowCtx.drawImage(canvas, cacheOffsetX + x, cacheOffsetY + y);

    imageData = shadowCtx.getImageData(0, 0, width, height);
    pxData    = imageData.data;

    i = 0;
    length = pxData.length;
    while (i < length) {
        idx = ((256 - pxData[i + 3]) * 4)|0;
        if (idx) {
            pxData[i    ] = pxGrad[idx    ];
            pxData[i + 1] = pxGrad[idx + 1];
            pxData[i + 2] = pxGrad[idx + 2];
        }

        i = (i + 4)|0;
    }
    shadowCtx.putImageData(imageData, 0, 0);

    // highlight
    var highlightCanvas    = this.$cacheStore.getCanvas();
    highlightCanvas.width  = width|0;
    highlightCanvas.height = height|0;
    var highlightCtx       = highlightCanvas.getContext("2d");
    highlightCtx.setTransform(1,0,0,1,this.$abs(x),this.$abs(y));
    highlightCtx.globalCompositeOperation = "source-out";

    // shadow
    highlightCtx.drawImage(canvas, cacheOffsetX + x, cacheOffsetY + y);
    // highlight
    highlightCtx.drawImage(canvas, cacheOffsetX - x, cacheOffsetY - y);

    imageData = highlightCtx.getImageData(0, 0, width, height);
    pxData    = imageData.data;

    i = 0;
    length = pxData.length;
    while (i < length) {
        idx = ((255 + pxData[i + 3]) * 4)|0;
        if (idx) {
            pxData[i    ] = pxGrad[idx    ];
            pxData[i + 1] = pxGrad[idx + 1];
            pxData[i + 2] = pxGrad[idx + 2];
        }

        i = (i + 4)|0;
    }
    highlightCtx.putImageData(imageData, 0, 0);

    var xorCanvas = this.$cacheStore.getCanvas();
    xorCanvas.width  = width|0;
    xorCanvas.height = height|0;

    var xorCtx = xorCanvas.getContext("2d");
    xorCtx.globalCompositeOperation = "xor";
    // highlight
    xorCtx.drawImage(highlightCtx.canvas, 0, 0);
    // shadow
    xorCtx.drawImage(shadowCtx.canvas, 0, 0);

    var isInner = (type === "inner" || type === "full");
    var isOuter = (type === "outer" || type === "full");
    var operation;
    if (isInner && isOuter) {
        operation = "source-over";
    } else if (isInner) {
        synCtx.drawImage(cache.canvas, ox, oy);
        operation = this.filterOperation(true, knockout);
    } else if (isOuter) {
        operation = "destination-over";
    }

    synCtx.globalCompositeOperation = operation;
    synCtx.drawImage(xorCtx.canvas, 0, 0);
    if (!isInner && isOuter && knockout) {
        synCtx.globalCompositeOperation = "destination-out";
        synCtx.drawImage(cache.canvas, ox, oy);
    }

    synCtx._offsetX = +(cacheOffsetX + ox);
    synCtx._offsetY = +(cacheOffsetY + oy);

    this.$cacheStore.destroy(ctx);
    this.$cacheStore.destroy(highlightCtx);
    this.$cacheStore.destroy(shadowCtx);
    this.$cacheStore.destroy(xorCtx);

    return synCtx;
};