/**
 * @constructor
 */
var DropShadowFilter = function ()
{
    BitmapFilter.call(this);

    this.filterId   = 0;
    this.distance   = 4;
    this.angle      = 45;
    this.color      = 0;
    this.alpha      = 1;
    this.blurX      = 4;
    this.blurY      = 4;
    this.strength   = 1;
    this.quality    = 1;
    this.inner      = false;
    this.knockout   = false;
    this.hideObject = false;

    var arg = arguments;
    var distance = +arg[0];
    if (!this.$isNaN(distance)) {
        this.distance = distance;
    }

    var angle = +arg[1];
    if (!this.$isNaN(angle) && 0 <= angle && 360 >= angle) {
        this.angle = angle;
    }

    var color = +arg[2];
    if (!this.$isNaN(color)) {
        this.color = this.$toColorInt(color);
    }

    var alpha = +arg[3];
    if (!this.$isNaN(alpha) && 0 <= alpha && 1 >= alpha) {
        this.alpha = alpha;
    }

    var blurX = +arg[4];
    if (!this.$isNaN(blurX) && 0 <= blurX && 255 >= blurX) {
        this.blurX = blurX;
    }

    var blurY = +arg[5];
    if (!this.$isNaN(blurY) && 0 <= blurY && 255 >= blurY) {
        this.blurY = blurY;
    }

    var strength = +arg[6];
    if (!this.$isNaN(strength) && 0 <= strength && 255 >= strength) {
        this.strength = strength;
    }

    var quality = arg[7]|0;
    if (1 <= quality && 15 >= quality) {
        this.quality = quality;
    }

    var inner = arg[8];
    if (typeof inner === "boolean") {
        this.inner = inner;
    }

    var knockout = arg[9];
    if (typeof knockout === "boolean") {
        this.knockout = knockout;
    }

    var hideObject = arg[10];
    if (typeof hideObject === "boolean") {
        this.hideObject = hideObject;
    }
};

/**
 * extends
 * @type {BitmapFilter}
 */
DropShadowFilter.prototype = Object.create(BitmapFilter.prototype);
DropShadowFilter.prototype.constructor = DropShadowFilter;

/**
 * @param cache
 * @param matrix
 * @param colorTransform
 * @param stage
 */
DropShadowFilter.prototype.render = function (cache, matrix, colorTransform, stage)
{
    var strength = this.strength;
    if (strength === 0) {
        return cache;
    }

    var quality = this.quality;
    var inner   = this.inner;

    var r = this.angle * this.$PI / 180;
    var blurX = this.blurX;
    var blurY = this.blurY;

    // blur
    var blurFilter = new BlurFilter(blurX, blurY, quality);
    var ctx        = blurFilter.render(cache, matrix, colorTransform, stage);

    // dropShadow
    var intColor    = this.$toColorInt(this.color);
    var filterColor = this.$intToRGBA(intColor);
    var color       = this.$generateColorTransform(filterColor, colorTransform);
    ctx             = this.coatOfColor(ctx, color, inner, strength);

    // synthesis
    var cacheOffsetX = cache._offsetX;
    var cacheOffsetY = cache._offsetY;
    var _offsetX     = ctx._offsetX;
    var _offsetY     = ctx._offsetY;

    var canvas    = ctx.canvas;
    var synCanvas = this.$cacheStore.getCanvas();
    var width     = (canvas.width  + cacheOffsetX)|0;
    var height    = (canvas.height + cacheOffsetY)|0;

    var ox = 0;
    var oy = 0;
    var dx = 0;
    var dy = 0;

    var distance = this.distance;
    var scale    = stage.getScale();

    var x = +this.$ceil(this.$cos(r) * distance * scale);
    var y = +this.$ceil(this.$sin(r) * distance * scale);

    if (x) {
        width = (this.$abs(x) + width)|0;
        if (x < 0) {
            ox = (ox - x)|0;
        } else {
            dx = x;
        }
    }

    if (y) {
        height += this.$abs(y);
        if (y < 0) {
            oy = (oy - y)|0;
        } else {
            dy = y;
        }
    }

    synCanvas.width  = width;
    synCanvas.height = height;

    var synCtx = synCanvas.getContext("2d");
    synCtx.drawImage(cache.canvas, _offsetX + ox, _offsetY + oy);
    synCtx.globalAlpha = this.alpha;
    if (strength < 1) {
        synCtx.globalAlpha = +(synCtx.globalAlpha * strength);
    }

    var knockout   = this.knockout;
    var hideObject = this.hideObject;

    synCtx.globalCompositeOperation = this.filterOperation(inner, knockout, hideObject);
    synCtx.drawImage(canvas, cacheOffsetX + dx, cacheOffsetY + dy);

    synCtx._offsetX = +(cacheOffsetX + _offsetX);
    synCtx._offsetY = +(cacheOffsetY + _offsetY);

    this.$cacheStore.destroy(ctx);

    return synCtx;
};