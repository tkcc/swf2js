/**
 * @constructor
 */
var GlowFilter = function ()
{
    BitmapFilter.call(this);

    this.filterId = 2;
    this.color    = 0xFF0000;
    this.alpha    = 1;
    this.blurX    = 6;
    this.blurY    = 6;
    this.strength = 2;
    this.quality  = 1;
    this.inner    = false;
    this.knockout = false;

    var arg = arguments;

    var color = this.$toColorInt(arg[0]);
    if (!this.$isNaN(color)) {
        this.color = color;
    }

    var alpha = +arg[1];
    if (!this.$isNaN(alpha) && 0 <= alpha && 1 >= alpha) {
        this.alpha = alpha;
    }

    var blurX = 0 | arg[2];
    if (0 <= blurX && 255 >= blurX) {
        this.blurX = blurX;
    }

    var blurY = 0 | arg[3]|0;
    if (0 <= blurY && 255 >= blurY) {
        this.blurY = blurY;
    }

    var strength = +arg[4];
    if (!this.$isNaN(strength) && 0 <= strength && 255 >= strength) {
        this.strength = strength;
    }

    var quality = 0 | arg[5]|0;
    if (1 <= quality && 15 >= quality) {
        this.quality = quality;
    }

    var inner = arg[6];
    if (typeof inner === "boolean") {
        this.inner = inner;
    }

    var knockout = arg[7];
    if (typeof knockout === "boolean") {
        this.knockout = knockout;
    }
};

/**
 * extends
 * @type {BitmapFilter}
 */
GlowFilter.prototype = Object.create(BitmapFilter.prototype);
GlowFilter.prototype.constructor = GlowFilter;

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
    if (strength === 0) {
        return cache;
    }

    var inner = this.inner;
    var blurX = this.blurX;
    var blurY = this.blurY;

    var blurFilter = new BlurFilter(blurX, blurY, this.quality);

    var ctx    = blurFilter.render(cache, matrix, colorTransform, stage);
    var width  = 0 | ctx.canvas.width  + cache._offsetX;
    var height = 0 | ctx.canvas.height + cache._offsetY;

    var intColor    = this.$toColorInt(this.color);
    var filterColor = this.$intToRGBA(intColor);

    var color = this.$generateColorTransform(filterColor, colorTransform);

    ctx = this.coatOfColor(ctx, color, inner, strength);

    var synCanvas    = this.$cacheStore.getCanvas();
    synCanvas.width  = width;
    synCanvas.height = height;

    var synCtx = synCanvas.getContext("2d");
    synCtx.drawImage(cache.canvas, ctx._offsetX, ctx._offsetY);
    synCtx.globalAlpha = this.alpha;
    if (strength < 1) {
        synCtx.globalAlpha *= strength;
    }

    var operation = "source-over";
    if (this.knockout) {
        if (inner) {
            operation = "source-in";
        } else {
            operation = "source-out";
        }
    } else {
        if (inner) {
            operation = "source-atop";
        } else {
            operation = "destination-over";
        }
    }

    synCtx.globalCompositeOperation = operation;
    synCtx.drawImage(ctx.canvas, cache._offsetX, cache._offsetY);
    synCtx._offsetX = 0 | cache._offsetX + ctx._offsetX;
    synCtx._offsetY = 0 | cache._offsetY + ctx._offsetY;

    this.$cacheStore.destroy(ctx);

    return synCtx;
};