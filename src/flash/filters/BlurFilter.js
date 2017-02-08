/**
 * @constructor
 */
var BlurFilter = function ()
{
    BitmapFilter.call(this);

    this.filterId = 1;

    // default
    this._blurX    = 4;
    this._blurY    = 4;
    this._quality  = 1;

    var arg      = arguments;
    this.blurX   = arg[0];
    this.blurY   = arg[1];
    this.quality = arg[2];
};

/**
 * extends
 * @type {BitmapFilter}
 */
BlurFilter.prototype = Object.create(BitmapFilter.prototype);
BlurFilter.prototype.constructor = BlurFilter;

/**
 * properties
 */
Object.defineProperties(BlurFilter.prototype, {
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
    quality: {
        get: function () {
            return this._quality;
        },
        set: function (quality) {
            if (0 < quality && 16 > quality) {
                this._quality = quality|0;
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
BlurFilter.prototype.render = function (cache, matrix, colorTransform, stage)
{
    var cacheCanvas = cache.canvas;
    var canvas      = this.$cacheStore.getCanvas();
    canvas.width    = cacheCanvas.width|0;
    canvas.height   = cacheCanvas.height|0;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(cacheCanvas, 0, 0);

    ctx._offsetX = +cache._offsetX;
    ctx._offsetY = +cache._offsetY;

    return this.executeFilter(ctx, stage);
};

/**
 * @param ctx
 * @param stage
 * @returns {*}
 */
BlurFilter.prototype.executeFilter = function (ctx, stage)
{
    var _blurX = this.blurX;
    var _blurY = this.blurY;
    if (!_blurX && !_blurY) {
        return ctx;
    }

    var scale = stage.getScale();

    var _quality = this.quality|0;
    var STEP     = [0.5, 1.05, 1.35, 1.55, 1.75, 1.9, 2, 2.1, 2.2, 2.3, 2.5, 3, 3, 3.5, 3.5];
    var stepNo   = STEP[_quality - 1] * 2;

    var blurX = this.$ceil(_blurX * stepNo * scale * stage.ratio)|0;
    var blurY = this.$ceil(_blurY * stepNo * scale * stage.ratio)|0;

    var canvas = ctx.canvas;
    var width  = this.$ceil(canvas.width  + (blurX * 2) + 1)|0;
    var height = this.$ceil(canvas.height + (blurY * 2) + 1)|0;

    var blurCanvas    = this.$cacheStore.getCanvas();
    blurCanvas.width  = width;
    blurCanvas.height = height;

    var blurCtx = blurCanvas.getContext("2d");
    var offsetX = blurX;
    var offsetY = blurY;

    blurCtx._offsetX = +(blurX + ctx._offsetX);
    blurCtx._offsetY = +(blurY + ctx._offsetY);
    blurCtx.drawImage(canvas, offsetX, offsetY);

    var imgData = blurCtx.getImageData(0, 0, width, height);
    var px      = imgData.data;

    var radiusX = (offsetX) >> 1;
    var radiusY = (offsetY) >> 1;

    var MUL = [1, 171, 205, 293, 57, 373, 79, 137, 241, 27, 391, 357, 41, 19, 283, 265, 497, 469, 443, 421, 25, 191, 365, 349, 335, 161, 155, 149, 9, 278, 269, 261, 505, 245, 475, 231, 449, 437, 213, 415, 405, 395, 193, 377, 369, 361, 353, 345, 169, 331, 325, 319, 313, 307, 301, 37, 145, 285, 281, 69, 271, 267, 263, 259, 509, 501, 493, 243, 479, 118, 465, 459, 113, 446, 55, 435, 429, 423, 209, 413, 51, 403, 199, 393, 97, 3, 379, 375, 371, 367, 363, 359, 355, 351, 347, 43, 85, 337, 333, 165, 327, 323, 5, 317, 157, 311, 77, 305, 303, 75, 297, 294, 73, 289, 287, 71, 141, 279, 277, 275, 68, 135, 67, 133, 33, 262, 260, 129, 511, 507, 503, 499, 495, 491, 61, 121, 481, 477, 237, 235, 467, 232, 115, 457, 227, 451, 7, 445, 221, 439, 218, 433, 215, 427, 425, 211, 419, 417, 207, 411, 409, 203, 202, 401, 399, 396, 197, 49, 389, 387, 385, 383, 95, 189, 47, 187, 93, 185, 23, 183, 91, 181, 45, 179, 89, 177, 11, 175, 87, 173, 345, 343, 341, 339, 337, 21, 167, 83, 331, 329, 327, 163, 81, 323, 321, 319, 159, 79, 315, 313, 39, 155, 309, 307, 153, 305, 303, 151, 75, 299, 149, 37, 295, 147, 73, 291, 145, 289, 287, 143, 285, 71, 141, 281, 35, 279, 139, 69, 275, 137, 273, 17, 271, 135, 269, 267, 133, 265, 33, 263, 131, 261, 130, 259, 129, 257, 1];
    var SHG = [0, 9, 10, 11, 9, 12, 10, 11, 12, 9, 13, 13, 10, 9, 13, 13, 14, 14, 14, 14, 10, 13, 14, 14, 14, 13, 13, 13, 9, 14, 14, 14, 15, 14, 15, 14, 15, 15, 14, 15, 15, 15, 14, 15, 15, 15, 15, 15, 14, 15, 15, 15, 15, 15, 15, 12, 14, 15, 15, 13, 15, 15, 15, 15, 16, 16, 16, 15, 16, 14, 16, 16, 14, 16, 13, 16, 16, 16, 15, 16, 13, 16, 15, 16, 14, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 13, 14, 16, 16, 15, 16, 16, 10, 16, 15, 16, 14, 16, 16, 14, 16, 16, 14, 16, 16, 14, 15, 16, 16, 16, 14, 15, 14, 15, 13, 16, 16, 15, 17, 17, 17, 17, 17, 17, 14, 15, 17, 17, 16, 16, 17, 16, 15, 17, 16, 17, 11, 17, 16, 17, 16, 17, 16, 17, 17, 16, 17, 17, 16, 17, 17, 16, 16, 17, 17, 17, 16, 14, 17, 17, 17, 17, 15, 16, 14, 16, 15, 16, 13, 16, 15, 16, 14, 16, 15, 16, 12, 16, 15, 16, 17, 17, 17, 17, 17, 13, 16, 15, 17, 17, 17, 16, 15, 17, 17, 17, 16, 15, 17, 17, 14, 16, 17, 17, 16, 17, 17, 16, 15, 17, 16, 14, 17, 16, 15, 17, 16, 17, 17, 16, 17, 15, 16, 17, 14, 17, 16, 15, 17, 16, 17, 13, 17, 16, 17, 17, 16, 17, 14, 17, 16, 17, 16, 17, 16, 17, 9];

    var mtx = MUL[radiusX]|0;
    var stx = SHG[radiusX]|0;
    var mty = MUL[radiusY]|0;
    var sty = SHG[radiusY]|0;

    var x  = 0;
    var y  = 0;
    var p  = 0;
    var yp = 0;
    var yi = 0;
    var yw = 0;
    var r  = 0;
    var g  = 0;
    var b  = 0;
    var a  = 0;
    var pr = 0;
    var pg = 0;
    var pb = 0;
    var pa = 0;

    var divx = (radiusX + radiusX + 1)|0;
    var divy = (radiusY + radiusY + 1)|0;

    var w = imgData.width|0;
    var h = imgData.height|0;

    var w1   = (w - 1)|0;
    var h1   = (h - 1)|0;
    var rxp1 = (radiusX + 1)|0;
    var ryp1 = (radiusY + 1)|0;

    var ssx = {r: 0, b: 0, g: 0, a: 0};
    var ssy = {r: 0, b: 0, g: 0, a: 0};

    var sx = ssx;
    var i = 1;
    while (i < divx) {
        i = (i + 1)|0;
        sx = sx.n = {r: 0, b: 0, g: 0, a: 0};
    }
    sx.n = ssx;

    var sy = ssy;
    i = 1;
    while (i < divy) {
        i = (i + 1)|0;
        sy = sy.n = {r: 0, b: 0, g: 0, a: 0};
    }
    sy.n = ssy;

    var si = null;
    while (_quality > 0) {
        _quality = (_quality - 1)|0;

        yw = 0;
        yi = 0;
        var ms = mtx|0;
        var ss = stx|0;

        y = (h + 1)|0;
        while (y > -1) {
            y = (y - 1)|0;

            pr = px[yi    ]|0;
            pg = px[yi + 1]|0;
            pb = px[yi + 2]|0;
            pa = px[yi + 3]|0;

            r = (rxp1 * pr)|0;
            g = (rxp1 * pg)|0;
            b = (rxp1 * pb)|0;
            a = (rxp1 * pa)|0;

            sx = ssx;
            i  = rxp1;
            while (i > -1) {
                i = (i - 1)|0;

                sx.r = pr|0;
                sx.g = pg|0;
                sx.b = pb|0;
                sx.a = pa|0;

                sx = sx.n;
            }

            i = 1;
            while (i < rxp1) {
                p = (yi + ((w1 < i ? w1 : i) << 2))|0;
                i = (i + 1)|0;

                r = (r + (sx.r = px[p    ]))|0;
                g = (g + (sx.g = px[p + 1]))|0;
                b = (b + (sx.b = px[p + 2]))|0;
                a = (a + (sx.a = px[p + 3]))|0;

                sx = sx.n;
            }

            si = ssx;
            x  = 0;
            while (x < w) {
                px[yi] = (r * ms) >>> ss;
                yi = (yi + 1)|0;

                px[yi] = (g * ms) >>> ss;
                yi = (yi + 1)|0;

                px[yi] = (b * ms) >>> ss;
                yi = (yi + 1)|0;

                px[yi] = (a * ms) >>> ss;
                yi = (yi + 1)|0;

                p = ((yw + ((p = x + radiusX + 1) < w1 ? p : w1)) << 2);

                r = (r - (si.r - (si.r = px[p    ])))|0;
                g = (g - (si.g - (si.g = px[p + 1])))|0;
                b = (b - (si.b - (si.b = px[p + 2])))|0;
                a = (a - (si.a - (si.a = px[p + 3])))|0;

                si = si.n;

                x = (x + 1)|0;
            }
            yw = (yw + w)|0;
        }

        ms = mty;
        ss = sty;
        x  = 0;
        while (x < w) {
            yi = (x << 2)|0;

            r = (ryp1 * (pr = px[yi]))|0;
            g = (ryp1 * (pg = px[(yi + 1)]))|0;
            b = (ryp1 * (pb = px[(yi + 2)]))|0;
            a = (ryp1 * (pa = px[(yi + 3)]))|0;

            sy = ssy;
            i  = 0;
            while (i < ryp1) {
                sy.r = pr|0;
                sy.g = pg|0;
                sy.b = pb|0;
                sy.a = pa|0;
                sy   = sy.n;

                i = (i + 1)|0
            }

            yp = w;
            i  = 1;
            while (i <= radiusY) {
                yi = (yp + x) << 2;

                r = (r + (sy.r = px[yi    ]))|0;
                g = (g + (sy.g = px[yi + 1]))|0;
                b = (b + (sy.b = px[yi + 2]))|0;
                a = (a + (sy.a = px[yi + 3]))|0;

                sy = sy.n;
                if (i < h1) {
                    yp = (yp + w)|0;
                }

                i = (i + 1)|0;
            }

            yi = x;
            si = ssy;
            if (_quality > 0) {
                y = 0;
                while (y < h) {
                    p = yi << 2;
                    px[p + 3] = pa = (a * ms) >>> ss;
                    if (pa > 0) {
                        px[p    ] = ((r * ms) >>> ss)|0;
                        px[p + 1] = ((g * ms) >>> ss)|0;
                        px[p + 2] = ((b * ms) >>> ss)|0;
                    } else {
                        px[p    ] = 0;
                        px[p + 1] = 0;
                        px[p + 2] = 0;
                    }

                    p = (x + (((p = y + ryp1) < h1 ? p : h1) * w)) << 2;

                    r = (r - (si.r - (si.r = px[p    ])))|0;
                    g = (g - (si.g - (si.g = px[p + 1])))|0;
                    b = (b - (si.b - (si.b = px[p + 2])))|0;
                    a = (a - (si.a - (si.a = px[p + 3])))|0;

                    si = si.n;

                    yi = (yi + w)|0;
                    y  = (y + 1)|0;
                }
            } else {
                y = 0;
                while (y < h) {
                    p = yi << 2;
                    px[p + 3] = pa = (a * ms) >>> ss;
                    if (pa > 0) {
                        pa = +(255 / pa);
                        px[p    ] = (((r * ms) >>> ss) * pa)|0;
                        px[p + 1] = (((g * ms) >>> ss) * pa)|0;
                        px[p + 2] = (((b * ms) >>> ss) * pa)|0;
                    } else {
                        px[p    ] = 0;
                        px[p + 1] = 0;
                        px[p + 2] = 0;
                    }

                    p = (x + (((p = y + ryp1) < h1 ? p : h1) * w)) << 2;

                    r = (r - (si.r - (si.r = px[p    ])))|0;
                    g = (g - (si.g - (si.g = px[p + 1])))|0;
                    b = (b - (si.b - (si.b = px[p + 2])))|0;
                    a = (a - (si.a - (si.a = px[p + 3])))|0;

                    si = si.n;

                    yi = (yi + w)|0;
                    y  = (y + 1)|0;
                }
            }

            x = (x + 1)|0;
        }
    }

    blurCtx.putImageData(imgData, 0, 0);
    this.$cacheStore.destroy(ctx);

    return blurCtx;
};