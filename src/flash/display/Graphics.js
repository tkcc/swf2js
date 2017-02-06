/*jshint bitwise: false*/
/**
 * @constructor
 */
var Graphics = function ()
{
    this.clear();
};

/**
 * util
 */
Graphics.prototype = Object.create(Util.prototype);
Graphics.prototype.constructor = Graphics;

/**
 * @type {number}
 */
Graphics.prototype.MOVE_TO = 0;

/**
 * @type {number}
 */
Graphics.prototype.CURVE_TO = 1;

/**
 * @type {number}
 */
Graphics.prototype.LINE_TO = 2;

/**
 * @type {number}
 */
Graphics.prototype.CUBIC = 3;

/**
 * @type {number}
 */
Graphics.prototype.ARC = 4;

/**
 * @type {number}
 */
Graphics.prototype.FILL_STYLE = 5;

/**
 * @type {number}
 */
Graphics.prototype.STROKE_STYLE = 6;

/**
 * @type {number}
 */
Graphics.prototype.FILL = 7;

/**
 * @type {number}
 */
Graphics.prototype.STROKE = 8;

/**
 * @type {number}
 */
Graphics.prototype.LINE_WIDTH = 9;

/**
 * @type {number}
 */
Graphics.prototype.LINE_CAP = 10;

/**
 * @type {number}
 */
Graphics.prototype.LINE_JOIN = 11;

/**
 * @type {number}
 */
Graphics.prototype.MITER_LIMIT = 12;

/**
 * @type {number}
 */
Graphics.prototype.BEGIN_PATH = 13;

/**
 * @returns {string}
 */
Graphics.prototype.getClassName = function ()
{
    return "Graphics";
};

/**
 * @returns {Graphics}
 */
Graphics.prototype.clear = function ()
{
    var no = this.$Number.MAX_VALUE;

    this.bounds      = {xMin: no, xMax: -no, yMin: no, yMax: -no};
    this.maxWidth    = 0;
    this.command     = null;
    this.isDraw      = false;
    this.isFillDraw  = false;
    this.isLineDraw  = false;
    this.cacheKey    = "";
    this.fillRecodes = [];
    this.lineRecodes = [];

    return this;
};

/**
 * @returns {Array}
 */
Graphics.prototype.getFillRecodes = function ()
{
    return this.fillRecodes;
};

/**
 * @returns {Array}
 */
Graphics.prototype.getLineRecodes = function ()
{
    return this.lineRecodes;
};

/**
 * @returns {Array}
 */
Graphics.prototype.getCommand = function ()
{
    return this.command;
};

/**
 * @param command
 */
Graphics.prototype.setCommand = function (command)
{
    this.command = command;
};

/**
 * @returns {string}
 */
Graphics.prototype.getCacheKey = function ()
{
    return this.cacheKey;
};

/**
 * @returns {string}
 */
Graphics.prototype.addCacheKey = function ()
{
    var args     = arguments;
    var cacheKey = "";
    var length   = args.length|0;
    if (length) {
        var i = 0;
        while (i < length) {
            cacheKey = cacheKey + "_" + args[i];
            i = (i + 1)|0;
        }
    }

    this.cacheKey = this.cacheKey + cacheKey;
};

/**
 * @returns {*}
 */
Graphics.prototype.getBounds = function ()
{
    return this.bounds;
};

/**
 * @param x
 * @param y
 */
Graphics.prototype.setBounds = function (x, y)
{
    var bounds  = this.bounds;
    bounds.xMin = this.$min(bounds.xMin, x);
    bounds.xMax = this.$max(bounds.xMax, x);
    bounds.yMin = this.$min(bounds.yMin, y);
    bounds.yMax = this.$max(bounds.yMax, y);
};

/**
 * @param rgb
 * @param alpha
 * @returns {Graphics}
 */
Graphics.prototype.beginFill = function (rgb, alpha)
{
    if (typeof rgb === "string") {
        rgb = this.$colorStringToInt(rgb);
    }

    rgb   = rgb|0;
    alpha = +alpha;
    if (this.$isNaN(alpha)) {
        alpha  = 100;
    } else {
        alpha *= 100;
    }

    var fillRecodes = this.getFillRecodes();

    // beginPath
    if (!this.isFillDraw) {
        fillRecodes[fillRecodes.length] = [this.BEGIN_PATH];
    }

    // Fill Style
    var color = this.$intToRGBA(rgb, alpha);
    fillRecodes[fillRecodes.length] = [this.FILL_STYLE, color.R, color.G, color.B, color.A];

    this.addCacheKey(rgb, alpha);

    // on
    this.isFillDraw = true;
    this.isDraw     = true;

    return this;
};

/**
 * @param width
 * @param rgb
 * @param alpha
 * @param pixelHinting
 * @param noScale
 * @param capsStyle
 * @param jointStyle
 * @param miterLimit
 * @returns {Graphics}
 */
Graphics.prototype.lineStyle = function (width, rgb, alpha, pixelHinting, noScale, capsStyle, jointStyle, miterLimit)
{
    var lineRecodes = this.getLineRecodes();

    width = +width;
    if (!this.$isNaN(width)) {
        if (rgb === undefined) {
            rgb = 0;
        }

        if (typeof rgb === "string") {
            rgb = this.$colorStringToInt(rgb);
        }

        if (!capsStyle) {
            capsStyle = "round";
        }

        if (!jointStyle) {
            jointStyle = "round";
        }

        rgb   = rgb|0;
        alpha = +alpha;
        if (this.$isNaN(alpha)) {
            alpha  = 100;
        } else {
            alpha *= 100;
        }

        var color = this.$intToRGBA(rgb, alpha);
        if (width < 0.5) {
            width += 0.2;
        }

        width *= 20;
        this.maxWidth = this.$max(this.maxWidth, width);

        if (this.isLineDraw) {
            lineRecodes[lineRecodes.length] = [this.STROKE];
        }

        lineRecodes[lineRecodes.length] = [this.BEGIN_PATH];
        lineRecodes[lineRecodes.length] = [this.STROKE_STYLE, color.R, color.G, color.B, color.A];
        lineRecodes[lineRecodes.length] = [this.LINE_WIDTH,   width];
        lineRecodes[lineRecodes.length] = [this.LINE_CAP,     capsStyle];
        lineRecodes[lineRecodes.length] = [this.LINE_JOIN,    jointStyle];

        this.addCacheKey(rgb, alpha);

        this.isLineDraw = true;
        this.isDraw = true;

    } else if (this.isLineDraw) {
        this.isLineDraw = false;

        lineRecodes[lineRecodes.length] = [this.STROKE];

        var length      = lineRecodes.length|0;
        var fillRecodes = this.getFillRecodes();
        var i = 0;
        while (i < length) {
            fillRecodes[fillRecodes.length] = lineRecodes[i];
            i = (i + 1)|0;
        }

        this.lineRecodes = [];
    }

    return this;
};

/**
 * @param x
 * @param y
 * @returns {Graphics}
 */
Graphics.prototype.moveTo = function (x, y)
{
    if (this.isFillDraw || this.isLineDraw) {
        x *= 20;
        y *= 20;
        this.setBounds(x, y);
        this.addCacheKey(x, y);
    }

    if (this.isFillDraw) {
        var fillRecodes = this.getFillRecodes();
        fillRecodes[fillRecodes.length] = [this.MOVE_TO, x, y];
    }

    if (this.isLineDraw) {
        var lineRecodes = this.getLineRecodes();
        lineRecodes[lineRecodes.length] = [this.MOVE_TO, x, y];
    }

    return this;
};

/**
 * @param x
 * @param y
 * @returns {Graphics}
 */
Graphics.prototype.lineTo = function (x, y)
{
    if (this.isFillDraw || this.isLineDraw) {
        x *= 20;
        y *= 20;
        this.setBounds(x, y);
        this.addCacheKey(x, y);
    }

    if (this.isFillDraw) {
        var fillRecodes = this.getFillRecodes();
        fillRecodes[fillRecodes.length] = [this.LINE_TO, x, y];
    }

    if (this.isLineDraw) {
        var lineRecodes = this.getLineRecodes();
        lineRecodes[lineRecodes.length] = [this.LINE_TO, x, y];
    }

    return this;
};

/**
 * @param cx
 * @param cy
 * @param dx
 * @param dy
 * @returns {Graphics}
 */
Graphics.prototype.curveTo = function (cx, cy, dx, dy)
{
    if (this.isFillDraw || this.isLineDraw) {
        cx *= 20;
        cy *= 20;
        dx *= 20;
        dy *= 20;

        this.setBounds(cx, cy);
        this.setBounds(dx, dy);
        this.addCacheKey(cx, cy, dx, dy);
    }

    if (this.isFillDraw) {
        var fillRecodes = this.getFillRecodes();
        fillRecodes[fillRecodes.length] = [this.CURVE_TO, cx, cy, dx, dy];
    }

    if (this.isLineDraw) {
        var lineRecodes = this.getLineRecodes();
        lineRecodes[lineRecodes.length] = [this.CURVE_TO, cx, cy, dx, dy];
    }

    return this;
};

/**
 * @param cp1x
 * @param cp1y
 * @param cp2x
 * @param cp2y
 * @param x
 * @param y
 * @returns {Graphics}
 */
Graphics.prototype.cubicCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y)
{
    if (this.isFillDraw || this.isLineDraw) {
        cp1x *= 20;
        cp1y *= 20;
        cp2x *= 20;
        cp2y *= 20;
        x    *= 20;
        y    *= 20;

        this.setBounds(x, y);
        this.setBounds(cp1x, cp1y);
        this.setBounds(cp2x, cp2y);
        this.addCacheKey(cp1x, cp1y, cp2x, cp2y, x, y);
    }

    if (this.isFillDraw) {
        var fillRecodes = this.getFillRecodes();
        fillRecodes[fillRecodes.length] = [this.CUBIC, cp1x, cp1y, cp2x, cp2y, x, y];
    }

    if (this.isLineDraw) {
        var lineRecodes = this.getLineRecodes();
        lineRecodes[lineRecodes.length] = [this.CUBIC, cp1x, cp1y, cp2x, cp2y, x, y];
    }

    return this;
};

/**
 * @param x
 * @param y
 * @param radius
 * @returns {Graphics}
 */
Graphics.prototype.drawCircle = function (x, y, radius)
{
    if (this.isFillDraw || this.isLineDraw) {
        x      *= 20;
        y      *= 20;
        radius *= 20;

        this.setBounds(x - radius, y - radius);
        this.setBounds(x + radius, y + radius);
        this.addCacheKey(x, y, radius);
    }

    if (this.isFillDraw) {
        var fillRecodes = this.getFillRecodes();
        fillRecodes[fillRecodes.length] = [this.ARC, x, y, radius];
    }

    if (this.isLineDraw) {
        var lineRecodes = this.getLineRecodes();
        lineRecodes[lineRecodes.length] = [this.ARC, x, y, radius];
    }

    return this;
};

/**
 * @param x
 * @param y
 * @param width
 * @param height
 * @returns {Graphics}
 */
Graphics.prototype.drawEllipse = function (x, y, width, height)
{
    var hw = width  / 2; // half width
    var hh = height / 2; // half height
    var x0 = x + hw;
    var y0 = y + hh;
    var x1 = x + width;
    var y1 = y + height;
    var c  = 4 / 3 * (this.$SQRT2 - 1);
    var cw = c * hw;
    var ch = c * hh;

    this.moveTo(x0, y);
    this.cubicCurveTo(x0 + cw, y, x1, y0 - ch, x1, y0);
    this.cubicCurveTo(x1, y0 + ch, x0 + cw, y1, x0, y1);
    this.cubicCurveTo(x0 - cw, y1, x, y0 + ch, x,  y0);
    this.cubicCurveTo(x, y0 - ch, x0 - cw, y, x0, y);

    return this;
};

/**
 * @param x
 * @param y
 * @param width
 * @param height
 * @returns {Graphics}
 */
Graphics.prototype.drawRect = function (x, y, width, height)
{
    this.moveTo(x, y);
    this.lineTo(x + width, y);
    this.lineTo(x + width, y + height);
    this.lineTo(x, y + height);
    this.lineTo(x, y);

    return this;
};

/**
 * @param x
 * @param y
 * @param width
 * @param height
 * @param ellipseWidth
 * @param ellipseHeight
 * @returns {Graphics}
 */
Graphics.prototype.drawRoundRect = function (x, y, width, height, ellipseWidth, ellipseHeight)
{
    var hew = ellipseWidth  / 2;
    var heh = ellipseHeight / 2;
    var c   = 4 / 3 * (this.$SQRT2 - 1);
    var cw  = c * hew;
    var ch  = c * heh;

    var dx0 = x + hew;
    var dx1 = x + width;
    var dx2 = dx1 - hew;

    var dy0 = y + heh;
    var dy1 = y + height;
    var dy2 = dy1 - heh;

    this.moveTo(dx0, y);
    this.lineTo(dx2, y);
    this.cubicCurveTo(dx2 + cw, y, dx1, dy0 - ch, dx1, dy0);
    this.lineTo(dx1, dy2);
    this.cubicCurveTo(dx1, dy2 + ch, dx2 + cw, dy1, dx2, dy1);
    this.lineTo(dx0, dy1);
    this.cubicCurveTo(dx0 - cw, dy1, x, dy2 + ch, x, dy2);
    this.lineTo(x, dy0);
    this.cubicCurveTo(x, dy0 - ch, dx0 - cw, y, dx0, y);

    return this;
};

/**
 * @param vertices
 * @param indices
 * @param uvtData
 * @param culling
 * @returns {Graphics}
 */
Graphics.prototype.drawTriangles = function (vertices, indices, uvtData, culling)
{
    var length = vertices.length;
    if (length && length % 3 === 0) {
        var i = 0;
        var count = 0;
        if (indices) {
            length = indices.length;
            if (length && length % 3 === 0) {
                i = 0;
                while (i < length) {
                    var idx = indices[i];
                    if (count === 0) {
                        this.moveTo(vertices[idx], vertices[idx + 1]);
                    } else {
                        this.lineTo(vertices[idx], vertices[idx + 1]);
                    }

                    count++;
                    if (count % 3 === 0) {
                        count = 0;
                    }

                    i = (i + 1)|0;
                }
            }
        } else {
            i = 0;
            while (i < length) {
                if (count === 0) {
                    this.moveTo(vertices[i++], vertices[i]);
                } else {
                    this.lineTo(vertices[i++], vertices[i]);
                }

                count++;
                if (count % 3 === 0) {
                    count = 0;
                }

                i = (i + 1)|0;
            }
        }
    }

    return this;
};

/**
 * @returns {Graphics}
 */
Graphics.prototype.endFill = function ()
{
    if (this.isFillDraw) {
        var fillRecodes = this.getFillRecodes();
        fillRecodes[fillRecodes.length] = [this.FILL];
    }

    this.isFillDraw = false;

    return this;
};

/**
 * @param ctx
 * @param matrix
 * @param colorTransform
 * @param stage
 * @returns {*}
 */
Graphics.prototype.render = function (ctx, matrix, colorTransform, stage)
{
    var cacheKey = "";
    var alpha    = colorTransform[3] + (colorTransform[7] / 255);
    if (!alpha) {
        return cacheKey;
    }

    var rMatrix = this.$multiplicationMatrix(stage.getMatrix(), matrix);
    var xScale  = +this.$sqrt(rMatrix[0] * rMatrix[0] + rMatrix[1] * rMatrix[1]);
    var yScale  = +this.$sqrt(rMatrix[2] * rMatrix[2] + rMatrix[3] * rMatrix[3]);
    xScale = +this.$pow(this.$SQRT2, this.$ceil(this.$log(xScale) / this.$LN2_2 - this.$LOG1P));
    yScale = +this.$pow(this.$SQRT2, this.$ceil(this.$log(yScale) / this.$LN2_2 - this.$LOG1P));

    var maxWidth  = this.maxWidth;
    var halfWidth = maxWidth / 2;

    var bounds = this.getBounds();
    var xMax   = +bounds.xMax;
    var xMin   = +bounds.xMin;
    var yMax   = +bounds.yMax;
    var yMin   = +bounds.yMin;

    var W = this.$abs(this.$ceil((xMax - xMin + maxWidth) * xScale))|0;
    var H = this.$abs(this.$ceil((yMax - yMin + maxWidth) * yScale))|0;
    if (W <= 0 || H <= 0) {
        return cacheKey;
    }

    var cache;
    var canvas;
    var isClipDepth = stage.clipMc || this.isClipDepth;
    if (!isClipDepth) {
        var cacheStore = this.$cacheStore;

        cacheKey = cacheStore.generateKey(0, [xScale, yScale], colorTransform);
        cacheKey = cacheKey + this.getCacheKey();

        cache = cacheStore.getCache(cacheKey);
        if (!cache && stage.getWidth() > W && stage.getHeight() > H && cacheStore.size > (W * H)) {
            canvas        = cacheStore.getCanvas();
            canvas.width  = W;
            canvas.height = H;
            cache         = canvas.getContext("2d");

            var cMatrix = [xScale, 0, 0, yScale, (-xMin + halfWidth) * xScale, (-yMin + halfWidth) * yScale];
            cache.setTransform(cMatrix[0], cMatrix[1], cMatrix[2], cMatrix[3], cMatrix[4], cMatrix[5]);
            cache = this.executeRender(cache, this.$min(xScale, yScale), colorTransform, false);
            cacheStore.setCache(cacheKey, cache);
        }
    }

    if (cache) {
        canvas = cache.canvas;

        var sMatrix = [1 / xScale, 0, 0, 1 / yScale, xMin - halfWidth, yMin - halfWidth];

        var m2 = this.$multiplicationMatrix(rMatrix, sMatrix);
        ctx.setTransform(m2[0], m2[1], m2[2], m2[3], m2[4], m2[5]);

        if (this.$isAndroid4x && !this.$isChrome) {
            ctx.fillStyle = stage.context.createPattern(cache.canvas, "no-repeat");
            ctx.fillRect(0, 0, W, H);
        } else {
            ctx.drawImage(canvas, 0, 0, W, H);
        }
    } else {
        ctx.setTransform(rMatrix[0],rMatrix[1],rMatrix[2],rMatrix[3],rMatrix[4],rMatrix[5]);
        this.executeRender(ctx, this.$min(rMatrix[0], rMatrix[3]), colorTransform, isClipDepth);
    }

    return cacheKey + "_" + rMatrix[4] + "_" + rMatrix[5];
};

/**
 * @param ctx
 * @param minScale
 * @param colorTransform
 * @param isClip
 */
Graphics.prototype.executeRender = function (ctx, minScale, colorTransform, isClip)
{
    var fillRecodes = this.getFillRecodes();
    var lineRecodes = this.getLineRecodes();

    var lLen = lineRecodes.length;
    var fLen = fillRecodes.length;

    if (fLen || lLen) {
        var command = this.getCommand();

        // build command
        if (command === null) {
            command = this.buildCommand();
            this.setCommand(command);
        }

        ctx.beginPath();
        command(ctx, colorTransform, isClip);

        // rendering
        switch (true) {
            case isClip:
                ctx.clip();
                break;
            default:
                if (this.isFillDraw) {
                    ctx.fill();
                }

                if (this.isLineDraw) {
                    ctx.stroke();
                }
                break;
        }
    }

    var resetCss    = "rgba(0,0,0,1)";
    ctx.strokeStyle = resetCss;
    ctx.fillStyle   = resetCss;
    ctx.globalAlpha = 1;

    return ctx;
};

/**
 * @param ctx
 * @param matrix
 * @param stage
 * @param x
 * @param y
 * @returns {boolean}
 */
Graphics.prototype.renderHitTest = function (ctx, matrix, stage, x, y)
{
    var command = this.getCommand();

    // build command
    if (command === null) {
        command = this.buildCommand();
        this.setCommand(command);
    }

    var m = this.$multiplicationMatrix(stage.getMatrix(), matrix);
    ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);

    ctx.beginPath();
    command(ctx, [1,1,1,1,0,0,0,0], true);

    var hit = ctx.isPointInPath(x, y);
    if (hit) {
        return hit;
    }

    if ("isPointInStroke" in ctx) {
        hit = ctx.isPointInStroke(x, y);
        if (hit) {
            return hit;
        }
    }

    return hit;
};


/**
 * @returns {*}
 */
Graphics.prototype.buildCommand = function ()
{
    var fillRecodes = this.getFillRecodes();
    var lineRecodes = this.getLineRecodes();

    var length = lineRecodes.length;
    if (length) {
        var i = 0;
        while (i < length) {
            fillRecodes[fillRecodes.length] = lineRecodes[i];
            i = (i + 1)|0;
        }

        // reset
        this.lineRecodes = [];
    }

    return this.$vtc.buildCommand(fillRecodes);
};