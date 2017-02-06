/**
 *
 * @constructor
 */
var BitmapFilter = function () {};

/**
 * util
 */
BitmapFilter.prototype = Object.create(Util.prototype);
BitmapFilter.prototype.constructor = BitmapFilter;

/**
 * @param inner
 * @param knockout
 * @param hideObject
 * @returns {*}
 */
BitmapFilter.prototype.filterOperation = function (inner, knockout, hideObject)
{
    var operation = "source-over";
    if (knockout) {
        if (inner) {
            operation = "source-in";
        } else {
            operation = "source-out";
        }
    } else {
        if (hideObject) {
            if (inner) {
                operation = "source-in";
            } else {
                operation = "copy";
            }
        } else {
            if (inner) {
                operation = "source-atop";
            } else {
                operation = "destination-over";
            }
        }
    }
    return operation;
};

/**
 * @param ctx
 * @param color
 * @param inner
 * @param strength
 * @returns {*}
 */
BitmapFilter.prototype.coatOfColor = function (ctx, color, inner, strength)
{
    var canvas  = ctx.canvas;
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    var i = 0;
    var pxData = imgData.data;
    var R = color.R|0;
    var G = color.G|0;
    var B = color.B|0;
    var length = pxData.length|0;

    while (i < length) {
        var aKey  = (i + 3)|0;
        var alpha = pxData[aKey]|0;
        if (!inner) {
            if (alpha !== 0) {
                pxData[i]     = R|0;
                pxData[i + 1] = G|0;
                pxData[i + 2] = B|0;
                pxData[aKey]  = alpha|0;
            }
        } else {
            if (alpha !== 255) {
                pxData[i]     = R|0;
                pxData[i + 1] = G|0;
                pxData[i + 2] = B|0;
                pxData[aKey]  = 0 | 255 - alpha|0;
            }
        }

        i = (i + 4)|0;
    }

    ctx.putImageData(imgData, 0, 0);
    if (strength > 0) {
        i = 1;
        while (i < strength) {
            i = (i + 1)|0;
            ctx.drawImage(ctx.canvas, 0, 0);
        }
    }

    return ctx;
};

/**
 * clone
 */
BitmapFilter.prototype.clone = function ()
{
    var args = [];
    for (var prop in this) {
        if (!this.hasOwnProperty(prop)) {
            continue;
        }

        args[args.length] = this[prop];
    }

    var type   = this.filterId;
    var filter = this;
    switch (type) {
        case 0: // DropShadowFilter
            filter = new (Function.prototype.bind.apply(DropShadowFilter, args))();
            break;
        case 1: // BlurFilter
            filter = new (Function.prototype.bind.apply(BlurFilter, args))();
            break;
        case 2: // GlowFilter
            filter = new (Function.prototype.bind.apply(GlowFilter, args))();
            break;
        case 3: // BevelFilter
            filter = new (Function.prototype.bind.apply(BevelFilter, args))();
            break;
        case 4: // GradientGlowFilter
            filter = new (Function.prototype.bind.apply(GradientGlowFilter, args))();
            break;
        case 5: // ConvolutionFilter
            filter = new (Function.prototype.bind.apply(ConvolutionFilter, args))();
            break;
        case 6: // ColorMatrixFilter
            filter = new (Function.prototype.bind.apply(ColorMatrixFilter, args))();
            break;
        case 7: // GradientBevelFilter
            filter = new (Function.prototype.bind.apply(GradientBevelFilter, args))();
            break;
    }

    return filter;
};