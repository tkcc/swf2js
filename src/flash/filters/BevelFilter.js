/**
 * @constructor
 */
var BevelFilter = function ()
{
    BitmapFilter.call(this);

    this.filterId       = 3;
    this.distance       = 4;
    this.angle          = 45;
    this.highlightColor = 0xffffff;
    this.highlightAlpha = 1;
    this.shadowColor    = 0x000000;
    this.shadowAlpha    = 1;
    this.blurX          = 4;
    this.blurY          = 4;
    this.strength       = 1;
    this.quality        = 1;
    this.type           = "inner";
    this.knockout       = false;

    var arg = arguments;

    var distance = arg[0]|0;
    if (!this.$isNaN(distance)) {
        this.distance = distance;
    }

    var angle = +arg[1];
    if (!this.$isNaN(angle) && 0 <= angle && 360 >= angle) {
        this.angle = angle;
    }

    var highlightColor = this.toColorInt(arg[2]);
    if (!this.$isNaN(highlightColor)) {
        this.highlightColor = highlightColor;
    }

    var highlightAlpha = +arg[3];
    if (!this.$isNaN(highlightAlpha) && 0 <= highlightAlpha && 1 >= highlightAlpha) {
        this.highlightAlpha = highlightAlpha;
    }

    var shadowColor = this.toColorInt(arg[4]);
    if (!this.$isNaN(shadowColor)) {
        this.shadowColor = shadowColor;
    }

    var shadowAlpha = +arg[5];
    if (!this.$isNaN(shadowAlpha) && 0 <= shadowAlpha && 1 >= shadowAlpha) {
        this.shadowAlpha = shadowAlpha;
    }

    var blurX = arg[6]|0;
    if (!this.$isNaN(blurX) && 0 <= blurX && 255 >= blurX) {
        this.blurX = blurX;
    }

    var blurY = arg[7]|0;
    if (!this.$isNaN(blurY) && 0 <= blurY && 255 >= blurY) {
        this.blurY = blurY;
    }

    var strength = +arg[8];
    if (!this.$isNaN(strength) && 0 <= strength && 255 >= strength) {
        this.strength = strength;
    }

    var quality = arg[9]|0;
    if (!this.$isNaN(quality) && 1 <= quality && 15 >= quality) {
        this.quality = quality;
    }

    var type = arg[10];
    if (typeof type === "string") {
        this.type = type;
    }

    var knockout = arg[11];
    if (typeof knockout === "boolean") {
        this.knockout = knockout;
    }
};

/**
 * extends
 * @type {BitmapFilter}
 */
BevelFilter.prototype = Object.create(BitmapFilter.prototype);
BevelFilter.prototype.constructor = BevelFilter;

/**
 * @param cache
 * @param matrix
 * @param colorTransform
 * @param stage
 * @returns {*}
 */
BevelFilter.prototype.render = function (cache, matrix, colorTransform, stage)
{
    var _this = this;
    var distance = _this.distance;
    var angle = _this.angle;
    var shadowColor = _this.shadowColor;
    var shadowAlpha = _this.shadowAlpha;
    var highlightColor = _this.highlightColor;
    var highlightAlpha = _this.highlightAlpha;
    var blurX = _this.blurX;
    var blurY = _this.blurY;
    var strength = _this.strength;
    var quality = _this.quality;
    var knockout = _this.knockout;
    var r = angle * _PI / 180;
    var filterColor, color;
    var type = _this.type;

    // blur
    var blurFilter = new BlurFilter(blurX, blurY, quality);
    var ctx = blurFilter.render(cache, matrix, colorTransform, stage);
    var canvas = ctx.canvas;
    var _offsetX = ctx._offsetX;
    var _offsetY = ctx._offsetY;

    // shadow
    var shadowCanvas = cacheStore.getCanvas();
    shadowCanvas.width = canvas.width;
    shadowCanvas.height = canvas.height;
    var shadowCtx = shadowCanvas.getContext("2d");
    shadowCtx.drawImage(canvas, 0, 0);
    var intShadowColor = _this.toColorInt(shadowColor);
    filterColor = _this.intToRGBA(intShadowColor);
    color = _this.generateColorTransform(filterColor, colorTransform);
    shadowCtx = _this.coatOfColor(shadowCtx, color, false, strength);

    // shadow
    var highlightCanvas = cacheStore.getCanvas();
    highlightCanvas.width = canvas.width;
    highlightCanvas.height = canvas.height;
    var highlightCtx = highlightCanvas.getContext("2d");
    highlightCtx.drawImage(canvas, 0, 0);
    var intHighlightColor = _this.toColorInt(highlightColor);
    filterColor = _this.intToRGBA(intHighlightColor);
    color = _this.generateColorTransform(filterColor, colorTransform);
    highlightCtx = _this.coatOfColor(highlightCtx, color, false, strength);

    var isInner = (type === "inner" || type === "full");
    var isOuter = (type === "outer" || type === "full");

    var cacheOffsetX = cache._offsetX;
    var cacheOffsetY = cache._offsetY;
    var synCanvas = cacheStore.getCanvas();
    var width = canvas.width + cacheOffsetX;
    var height = canvas.height + cacheOffsetY;
    var ox = 0;
    var oy = 0;

    var scale = stage.getScale();
    var x = _ceil(_cos(r) * distance * scale);
    var y = _ceil(_sin(r) * distance * scale);

    if (x !== 0) {
        width += _abs(x);
        if (x < 0) {
            ox -= x;
        }
    }

    if (y !== 0) {
        height += _abs(y);
        if (y < 0) {
            oy -= y;
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
    synCtx._offsetX = cacheOffsetX + _offsetX;
    synCtx._offsetY = cacheOffsetY + _offsetY;

    var xorCanvas = cacheStore.getCanvas();
    xorCanvas.width = width + _offsetX;
    xorCanvas.height = height + _offsetY;
    var xorCtx = xorCanvas.getContext("2d");

    xorCtx.globalCompositeOperation = "xor";
    xorCtx.globalAlpha = highlightAlpha;
    xorCtx.drawImage(highlightCtx.canvas, -x + ox, -y + oy);
    xorCtx.globalAlpha = shadowAlpha;
    xorCtx.drawImage(shadowCtx.canvas, x, y);

    var operation;
    if (isInner && isOuter) {
        operation = "source-over";
    } else if (isInner) {
        synCtx.drawImage(cache.canvas, _offsetX + ox, _offsetY + oy);
        operation = _this.filterOperation(true, knockout);
    } else if (isOuter) {
        operation = "destination-over";
    }

    synCtx.globalCompositeOperation = operation;
    synCtx.drawImage(xorCtx.canvas, 0, 0);
    if (!isInner && isOuter && knockout) {
        synCtx.globalCompositeOperation = "destination-out";
        synCtx.drawImage(cache.canvas, _offsetX + ox, _offsetY + oy);
    }

    cacheStore.destroy(ctx);
    cacheStore.destroy(highlightCtx);
    cacheStore.destroy(shadowCtx);
    cacheStore.destroy(xorCtx);

    return synCtx;
};