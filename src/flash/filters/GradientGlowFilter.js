/**
 * @constructor
 */
var GradientGlowFilter = function ()
{
    var _this = this;
    BitmapFilter.call(_this);

    _this.filterId = 4;
    _this.distance = 4;
    _this.angle = 45;
    _this.colors = null;
    _this.alphas = null;
    _this.ratios = null;
    _this.blurX = 4;
    _this.blurY = 4;
    _this.strength = 1;
    _this.quality = 1;
    _this.type = "inner";
    _this.knockout = false;

    var arg = arguments;

    var distance = arg[0]|0;
    if (!_isNaN(distance)) {
        _this.distance = distance;
    }

    var angle = +arg[1];
    if (!_isNaN(angle) && 0 <= angle && 360 >= angle) {
        _this.angle = angle;
    }

    _this.colors = arg[2];
    _this.alphas = arg[3];
    _this.ratios = arg[4];

    var blurX = arg[5]|0;
    if (!_isNaN(blurX) && 0 <= blurX && 255 >= blurX) {
        _this.blurX = blurX;
    }

    var blurY = arg[6]|0;
    if (!_isNaN(blurY) && 0 <= blurY && 255 >= blurY) {
        _this.blurY = blurY;
    }

    var strength = +arg[7];
    if (!_isNaN(strength) && 0 <= strength && 255 >= strength) {
        _this.strength = strength;
    }

    var quality = arg[8]|0;
    if (!_isNaN(quality) && 1 <= quality && 15 >= quality) {
        _this.quality = quality;
    }

    var type = arg[9];
    if (typeof type === "string") {
        _this.type = type;
    }

    var knockout = arg[10];
    if (typeof knockout === "boolean") {
        _this.knockout = knockout;
    }
};

/**
 * extends
 * @type {BitmapFilter}
 */
GradientGlowFilter.prototype = Object.create(BitmapFilter.prototype);
GradientGlowFilter.prototype.constructor = GradientGlowFilter;

/**
 * @param cache
 * @param matrix
 * @param colorTransform
 * @param stage
 * @returns {*}
 */
GradientGlowFilter.prototype.render = function (cache, matrix, colorTransform, stage)
{
    var _this = this;
    var strength = _this.strength;
    if (strength === 0) {
        return cache;
    }

    var type = _this.type;
    var blurX = _this.blurX;
    var blurY = _this.blurY;
    var isInner = (type === "inner" || type === "full");
    var isOuter = (type === "outer" || type === "full");
    var knockout = _this.knockout;
    var angle = _this.angle;
    var r = angle * _PI / 180;

    var blurFilter = new BlurFilter(blurX, blurY, _this.quality);
    var ctx = blurFilter.render(cache, matrix, colorTransform, stage);

    // synthesis
    var cacheOffsetX = cache._offsetX;
    var cacheOffsetY = cache._offsetY;
    var _offsetX = ctx._offsetX;
    var _offsetY = ctx._offsetY;

    var canvas = ctx.canvas;
    var synCanvas = cacheStore.getCanvas();
    var width = canvas.width + cacheOffsetX;
    var height = canvas.height + cacheOffsetY;
    var ox = 0;
    var oy = 0;
    var dx = 0;
    var dy = 0;

    var distance = _this.distance;
    var scale = stage.getScale();
    var x = _ceil(_cos(r) * distance * scale);
    var y = _ceil(_sin(r) * distance * scale);

    if (x !== 0) {
        width += _abs(x);
        if (x < 0) {
            ox -= x;
        } else {
            dx = x;
        }
    }

    if (y !== 0) {
        height += _abs(y);
        if (y < 0) {
            oy -= y;
        } else {
            dy = y;
        }
    }

    synCanvas.width = width;
    synCanvas.height = height;
    var synCtx = synCanvas.getContext("2d");
    if (!knockout) {
        synCtx.drawImage(cache.canvas, _offsetX + ox, _offsetY + oy);
    }

    if (strength < 1) {
        synCtx.globalAlpha *= strength;
    }

    var operation;
    if (isInner && isOuter) {
        operation = "source-over";
    } else {
        if (knockout) {
            synCtx.drawImage(cache.canvas, _offsetX + ox, _offsetY + oy);
        }
        operation = _this.filterOperation(isInner, knockout);
    }

    synCtx.globalCompositeOperation = operation;
    synCtx.drawImage(canvas, cacheOffsetX + dx, cacheOffsetY + dy);

    synCtx._offsetX = cacheOffsetX + _offsetX;
    synCtx._offsetY = cacheOffsetY + _offsetY;

    cacheStore.destroy(ctx);

    return synCtx;
};