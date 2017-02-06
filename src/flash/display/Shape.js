/**
 * @constructor
 */
var Shape = function ()
{
    DisplayObject.call(this);

    this.data      = null;
    this._graphics = new Graphics();

    var no = this.$Number.MAX_VALUE;
    this.setBounds({xMin: no, xMax: -no, yMin: no, yMax: -no});
};

/**
 * extends
 * @type {DisplayObject}
 */
Shape.prototype = Object.create(DisplayObject.prototype);
Shape.prototype.constructor = Shape;

/**
 * properties
 */
Object.defineProperties(Shape.prototype, {
    graphics: {
        get: function () {
            return this.getGraphics();
        },
        set: function () {
        }
    }
});

/**
 * dummy
 */
Shape.prototype.addActions  = function () {};
Shape.prototype.initFrame   = function () {};
Shape.prototype.setHitRange = function () {};

/**
 * @returns {string}
 */
Shape.prototype.getClassName = function ()
{
    return "Shape";
};

/**
 * @param stage
 * @param clipEvent
 */
Shape.prototype.putFrame = function (stage, clipEvent)
{
    this.active = true;
    this.dispatchEvent(clipEvent, stage);
};

/**
 * @returns {Graphics}
 */
Shape.prototype.getGraphics = function ()
{
    return this._graphics;
};

/**
 * @returns []
 */
Shape.prototype.getData = function ()
{
    return this.data;
};

/**
 * @param data
 */
Shape.prototype.setData = function (data)
{
    this.data = data;
};

/**
 * @returns {{}}
 */
Shape.prototype.getBounds = function (matrix)
{
    var bounds, gBounds;

    var graphics = this.graphics;
    var isDraw   = graphics.isDraw;

    if (matrix) {
        bounds = this.boundsMatrix(this.bounds, matrix);
        if (isDraw) {
            gBounds = this.boundsMatrix(graphics.getBounds(), matrix);
            bounds.xMin = +this.$min(gBounds.xMin, bounds.xMin);
            bounds.xMax = +this.$max(gBounds.xMax, bounds.xMax);
            bounds.yMin = +this.$min(gBounds.yMin, bounds.yMin);
            bounds.yMax = +this.$max(gBounds.yMax, bounds.yMax);
        }

        for (var name in bounds) {
            if (!bounds.hasOwnProperty(name)) {
                continue;
            }

            var value    = +bounds[name];
            bounds[name] = +(value / 20);
        }

    } else {
        bounds = this.bounds;
        if (isDraw) {
            gBounds = graphics.getBounds();
            bounds.xMin = +this.$min(gBounds.xMin, bounds.xMin);
            bounds.xMax = +this.$max(gBounds.xMax, bounds.xMax);
            bounds.yMin = +this.$min(gBounds.yMin, bounds.yMin);
            bounds.yMax = +this.$max(gBounds.yMax, bounds.yMax);
        }
    }

    return bounds;
};

/**
 * @param bounds
 */
Shape.prototype.setBounds = function (bounds)
{
    this.bounds = bounds;
};

/**
 * @returns {boolean}
 */
Shape.prototype.isMorphing = function ()
{
    var tagType = this.getTagType();
    return (tagType === 46 || tagType === 84);
};

/**
 * @param ctx
 * @param matrix
 * @param colorTransform
 * @param stage
 * @param visible
 * @returns {*}
 */
Shape.prototype.render = function (ctx, matrix, colorTransform, stage, visible)
{
    stage.doneTags.unshift(this);

    // colorTransform
    var rColorTransform = this.$multiplicationColor(colorTransform, this.getColorTransform());
    var isVisible       = this.$min(this.getVisible(), visible);
    var alpha           = +(rColorTransform[3] + (rColorTransform[7] / 255));
    var stageClip       = stage.clipMc || stage.isClipDepth;
    if (!stageClip && (!alpha || !isVisible)) {
        return "";
    }

    // matrix
    var m2 = this.$multiplicationMatrix(matrix, this.getMatrix());

    // pre render
    var obj      = this.preRender(ctx, m2, rColorTransform, stage, isVisible);
    var cacheKey = obj.cacheKey;
    var cache    = null;

    // render
    var m3 = this.$multiplicationMatrix(stage.getMatrix(), obj.preMatrix);
    var isClipDepth = this.isClipDepth || stageClip;
    if (isClipDepth) {
        if (m3[0] === 0) {
            m3[0] = 0.00000000000001;
        }
        if (m3[3] === 0) {
            m3[3] = 0.00000000000001;
        }

        ctx.setTransform(m3[0],m3[1],m3[2],m3[3],m3[4],m3[5]);
        this.executeRender(ctx, +this.$min(m3[0], m3[3]), rColorTransform, isClipDepth, stage);
    } else {
        var xScale = +(this.$sqrt(m3[0] * m3[0] + m3[1] * m3[1]));
        var yScale = +(this.$sqrt(m3[2] * m3[2] + m3[3] * m3[3]));
        xScale = +(this.$pow(this.$SQRT2, this.$ceil(this.$log(xScale) / this.$LN2_2 - this.$LOG1P)));
        yScale = +(this.$pow(this.$SQRT2, this.$ceil(this.$log(yScale) / this.$LN2_2 - this.$LOG1P)));

        var bounds = this.getBounds();
        var xMax   = +bounds.xMax;
        var xMin   = +bounds.xMin;
        var yMax   = +bounds.yMax;
        var yMin   = +bounds.yMin;

        var W = this.$abs(this.$ceil((xMax - xMin) * xScale))|0;
        var H = this.$abs(this.$ceil((yMax - yMin) * yScale))|0;
        if (W <= 0 || H <= 0) {
            return cacheKey;
        }

        var canvas;
        var loadStage = this.getStage();
        var cacheId   = this.getCharacterId() + "_" + loadStage.getId();
        if (this.isMorphing()) {
            cacheId = cacheId + "_" + this.getRatio();
        }

        cacheKey = this.$cacheStore.generateKey(cacheId, [xScale, yScale], rColorTransform);
        cache    = this.$cacheStore.getCache(cacheKey);
        if (!cache &&
            stage.getWidth() > W &&
            stage.getHeight() > H &&
            this.$cacheStore.size > (W * H)
        ) {
            canvas        = this.$cacheStore.getCanvas();
            canvas.width  = W;
            canvas.height = H;
            cache         = canvas.getContext("2d");

            var cMatrix = [xScale, 0, 0, yScale, -xMin * xScale, -yMin * yScale];
            cache.setTransform(cMatrix[0],cMatrix[1],cMatrix[2],cMatrix[3],cMatrix[4],cMatrix[5]);
            cache = this.executeRender(
                cache, +this.$min(xScale, yScale), rColorTransform, isClipDepth, stage
            );

            this.$cacheStore.setCache(cacheKey, cache);
        }

        var preCtx = obj.preCtx;
        if (cache) {
            canvas = cache.canvas;

            var sMatrix = [1 / xScale, 0, 0, 1 / yScale, xMin, yMin];
            var m4      = this.$multiplicationMatrix(m3, sMatrix);
            preCtx.setTransform(m4[0],m4[1],m4[2],m4[3],m4[4],m4[5]);

            if (this.$isAndroid4x && !this.$isChrome) {
                preCtx.fillStyle = stage.context.createPattern(cache.canvas, "no-repeat");
                preCtx.fillRect(0, 0, W, H);
            } else {
                preCtx.drawImage(canvas, 0, 0, W, H);
            }
        } else {
            preCtx.setTransform(m3[0],m3[1],m3[2],m3[3],m3[4],m3[5]);
            this.executeRender(preCtx, +this.$min(m3[0], m3[3]), rColorTransform, isClipDepth, stage);
        }
    }

    // post render
    cacheKey += "_" + m3[4] + "_" + m3[5];
    if (obj.isFilter || obj.isBlend) {
        obj.cacheKey = cacheKey;
        this.postRender(ctx, matrix, rColorTransform, stage, obj);
    }

    return cacheKey;
};

/**
 * @param ctx
 * @param matrix
 * @param stage
 * @param x
 * @param y
 * @returns {boolean}
 */
Shape.prototype.renderHitTest = function (ctx, matrix, stage, x, y)
{
    var m2 = this.$multiplicationMatrix(matrix, this.getMatrix());

    var graphics = this.graphics;
    if (graphics.isDraw) {
        return graphics.renderHitTest(ctx, m2, stage, x, y);
    }

    if (!this.getData()) {
        return false;
    }

    var m3 = this.$multiplicationMatrix(stage.getMatrix(), m2);
    ctx.setTransform(m3[0],m3[1],m3[2],m3[3],m3[4],m3[5]);

    var minScale = this.$min(m3[0], m3[3]);
    var shapes   = this.getData();
    var length   = 0 | shapes.length;
    var hit      = false;

    var idx = 0;
    while (idx < length) {
        var data     = shapes[idx];
        var obj      = data.obj;
        var isStroke = (obj.Width !== undefined);

        ctx.beginPath();
        var cmd = data.cmd;
        cmd(ctx);

        if (isStroke) {
            ctx.lineWidth = this.$max(obj.Width, 1 / minScale);
            ctx.lineCap   = "round";
            ctx.lineJoin  = "round";
        }

        hit = ctx.isPointInPath(x, y);
        if (hit) {
            return hit;
        }

        if ("isPointInStroke" in ctx) {
            hit = ctx.isPointInStroke(x, y);
            if (hit) {
                return hit;
            }
        }

        idx = (idx + 1)|0;
    }

    return hit;
};

/**
 * @param ctx
 * @param minScale
 * @param colorTransform
 * @param isClipDepth
 * @param stage
 * @returns {*}
 */
Shape.prototype.executeRender = function (ctx, minScale, colorTransform, isClipDepth, stage)
{
    var shapes = this.getData();
    if (!shapes) {
        return ctx;
    }

    var color, css, canvas;
    var stageClip = stage.clipMc || stage.isClipDepth;
    var idx       = 0;
    var length    = shapes.length|0;
    while (idx < length) {
        var data = shapes[idx];
        idx = (idx + 1)|0;

        var obj      = data.obj;
        var styleObj = (!obj.HasFillFlag) ? obj : obj.FillType;
        var cmd      = data.cmd;
        var isStroke = (obj.Width !== undefined);

        if (isClipDepth) {
            if (isStroke) {
                continue;
            }

            cmd(ctx);
            continue;
        }

        ctx.beginPath();
        cmd(ctx);

        var styleType = styleObj.fillStyleType|0;
        switch (styleType) {
            case 0x00:
                color = styleObj.Color;
                color = this.$generateColorTransform(color, colorTransform);
                css = "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";
                if (isStroke) {
                    ctx.strokeStyle = css;
                    ctx.lineWidth   = +this.$max(obj.Width, 1 / minScale);
                    ctx.lineCap     = "round";
                    ctx.lineJoin    = "round";
                    ctx.stroke();
                } else {
                    ctx.fillStyle = css;
                    ctx.fill();
                }

                break;

            // gradient
            case 0x10:
            case 0x12:
            case 0x13:
                var m    = styleObj.gradientMatrix;
                var type = styleObj.fillStyleType|0;
                if (type !== 16) {
                    ctx.save();
                    ctx.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
                    css = ctx.createRadialGradient(0, 0, 0, 0, 0, 16384);
                } else {
                    var xy = this.linearGradientXY(m);
                    css = ctx.createLinearGradient(xy[0], xy[1], xy[2], xy[3]);
                }

                var records = styleObj.gradient.GradientRecords;
                var rLength = records.length|0;
                var rIdx    = 0;
                while (rIdx < rLength) {
                    var record = records[rIdx];
                    color      = record.Color;
                    color      = this.$generateColorTransform(color, colorTransform);
                    var rgba   = "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";
                    css.addColorStop(record.Ratio, rgba);

                    rIdx = (rIdx + 1)|0;
                }

                if (isStroke) {
                    ctx.strokeStyle = css;
                    ctx.lineWidth   = this.$max(obj.Width, 1 / minScale);
                    ctx.lineCap     = "round";
                    ctx.lineJoin    = "round";
                    ctx.stroke();
                } else {
                    ctx.fillStyle = css;
                    ctx.fill();
                }

                if (type !== 16) {
                    ctx.restore();
                }

                break;

            // bitmap
            case 0x40:
            case 0x41:
            case 0x42:
            case 0x43:
                var width;
                var height;
                var loadStage      = this.getStage();
                var bitmapId       = styleObj.bitmapId|0;
                var bMatrix        = styleObj.bitmapMatrix;
                var repeat         = (styleType === 0x40 || styleType === 0x42) ? "repeat" : "no-repeat";
                var bitmapCacheKey = this.$cacheStore.generateKey(
                    bitmapId + "_" + loadStage.getId() + "_" + repeat,
                    undefined,
                    colorTransform
                );

                var image = this.$cacheStore.getCache(bitmapCacheKey);
                if (image === undefined) {
                    image = loadStage.getCharacter(bitmapId);
                    if (!image) {
                        break;
                    }

                    if (colorTransform[0] !== 1 ||
                        colorTransform[1] !== 1 ||
                        colorTransform[2] !== 1 ||
                        colorTransform[4] ||
                        colorTransform[5] ||
                        colorTransform[6]
                    ) {
                        var imgCanvas = image.canvas;
                        width         = imgCanvas.width|0;
                        height        = imgCanvas.height|0;
                        if (width > 0 && height > 0) {
                            canvas           = this.$cacheStore.getCanvas();
                            canvas.width     = width;
                            canvas.height    = height;

                            var imageContext = canvas.getContext("2d");
                            imageContext.drawImage(image.canvas, 0, 0, width, height, 0, 0, width, height);

                            image = this.generateImageTransform(imageContext, colorTransform);

                            this.$cacheStore.setCache(bitmapCacheKey, image);
                        }
                    } else {
                        ctx.globalAlpha = +(this.$max(0, this.$min((255 * colorTransform[3]) + colorTransform[7], 255)) / 255);
                    }
                }

                if (image) {
                    ctx.save();
                    canvas = image.canvas;
                    width  = canvas.width|0;
                    height = canvas.height|0;
                    if (width > 0 && height > 0) {
                        if (styleType === 0x41 || styleType === 0x43) {
                            ctx.clip();
                            ctx.transform(bMatrix[0], bMatrix[1], bMatrix[2], bMatrix[3], bMatrix[4], bMatrix[5]);
                            ctx.drawImage(canvas, 0, 0, width, height, 0, 0, width, height);
                        } else {
                            ctx.fillStyle = stage.context.createPattern(canvas, repeat);
                            ctx.transform(bMatrix[0], bMatrix[1], bMatrix[2], bMatrix[3], bMatrix[4], bMatrix[5]);
                            ctx.fill();
                        }
                    }
                    ctx.restore();
                }

                break;
        }
    }

    if (isClipDepth && !stageClip) {
        ctx.clip();

        if (this.$isAndroid && this.$isChrome) {
            if (!canvas) {
                canvas = ctx.canvas;
            }

            var cWidth  = canvas.width|0;
            var cHeight = canvas.height|0;

            var tmpContext   = this.$tmpContext;
            var tmpCanvas    = tmpContext.canvas;
            canvas           = ctx.canvas;
            tmpCanvas.width  = cWidth;
            tmpCanvas.height = cHeight;
            tmpContext.drawImage(canvas, 0, 0, cWidth, cHeight, 0, 0, cWidth, cHeight);

            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.beginPath();
            ctx.clearRect(0, 0, cWidth + 1, cHeight + 1);
            ctx.drawImage(tmpCanvas, 0, 0, cWidth, cHeight, 0, 0, cWidth, cHeight);
            ctx.restore();

            tmpContext.setTransform(1,0,0,1,0,0);
            tmpContext.clearRect(0, 0, cWidth + 1, cHeight + 1);
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
 * @param color
 * @returns {*}
 */
Shape.prototype.generateImageTransform = function (ctx, color)
{
    var canvas  = ctx.canvas;
    var width   = canvas.width|0;
    var height  = canvas.height|0;
    var imgData = ctx.getImageData(0, 0, width, height);
    var pxData  = imgData.data;

    var RedMultiTerm   = +color[0];
    var GreenMultiTerm = +color[1];
    var BlueMultiTerm  = +color[2];
    var AlphaMultiTerm = +color[3];
    var RedAddTerm     = +color[4];
    var GreenAddTerm   = +color[5];
    var BlueAddTerm    = +color[6];
    var AlphaAddTerm   = +color[7];

    var length = (width * height)|0;
    if (length > 0) {
        var i   = 0;
        var idx = 0;
        while (i < length) {
            var R = pxData[idx]|0;
            idx = (idx + 1)|0;

            var G = pxData[idx]|0;
            idx = (idx + 1)|0;

            var B = pxData[idx]|0;
            idx = (idx + 1)|0;

            var A = pxData[idx]|0;
            idx = (idx + 1)|0;

            pxData[idx - 4] =  this.$max(0, this.$min((R * RedMultiTerm)   + RedAddTerm,   255))|0;
            pxData[idx - 3] =  this.$max(0, this.$min((G * GreenMultiTerm) + GreenAddTerm, 255))|0;
            pxData[idx - 2] =  this.$max(0, this.$min((B * BlueMultiTerm)  + BlueAddTerm,  255))|0;
            pxData[idx - 1] = +this.$max(0, this.$min((A * AlphaMultiTerm) + AlphaAddTerm, 255));

            i = (i + 1)|0;
        }
    }

    ctx.putImageData(imgData, 0, 0);

    return ctx;
};

/**
 * @param m
 * @returns {*[]}
 */
Shape.prototype.linearGradientXY = function (m)
{
    var x0  = +(-16384 * m[0] - 16384 * m[2] + m[4]);
    var x1  = +( 16384 * m[0] - 16384 * m[2] + m[4]);
    var x2  = +(-16384 * m[0] + 16384 * m[2] + m[4]);
    var y0  = +(-16384 * m[1] - 16384 * m[3] + m[5]);
    var y1  = +( 16384 * m[1] - 16384 * m[3] + m[5]);
    var y2  = +(-16384 * m[1] + 16384 * m[3] + m[5]);
    var vx2 = +(x2 - x0);
    var vy2 = +(y2 - y0);
    var r1  = +this.$sqrt(vx2 * vx2 + vy2 * vy2);

    switch (true) {
        case (r1):
            vx2 = +(vx2 / r1);
            vy2 = +(vy2 / r1);
            break;
        default:
            vx2 = 0;
            vy2 = 0;
            break;
    }

    var r2  = +((x1 - x0) * vx2 + (y1 - y0) * vy2);
    return [
        +(x0 + r2 * vx2),
        +(y0 + r2 * vy2),
        x1,
        y1
    ];
};