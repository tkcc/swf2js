/**
 * @constructor
 */
var StaticText = function ()
{
    DisplayObject.call(this);
    this.data    = null;
    this.records = [];
};

/**
 * extends
 * @type {DisplayObject}
 */
StaticText.prototype = Object.create(DisplayObject.prototype);
StaticText.prototype.constructor = StaticText;

/**
 * dummy
 */
StaticText.prototype.initFrame   = function () {};
StaticText.prototype.addActions  = function () {};
StaticText.prototype.setHitRange = function () {};
/**
 * @returns {string}
 */
StaticText.prototype.getClassName = function ()
{
    return "StaticText";
};

/**
 * @returns {{}}
 */
StaticText.prototype.getBounds = function (matrix)
{
    if (matrix) {
        var bounds = this.boundsMatrix(this.bounds, matrix);
        for (var name in bounds) {
            if (!bounds.hasOwnProperty(name)) {
                continue;
            }
            var value    = +bounds[name];
            bounds[name] = +(value / 20);
        }
        return bounds;
    } else {
        return this.bounds;
    }
};

/**
 * @param bounds
 */
StaticText.prototype.setBounds = function (bounds)
{
    this.bounds = bounds;
};

/**
 * @returns {Array}
 */
StaticText.prototype.getRecords = function ()
{
    return this.records;
};

/**
 * @param record
 */
StaticText.prototype.addRecord = function (record)
{
    var records = this.getRecords();
    records[records.length] = record;
};

/**
 * @param ctx
 * @param matrix
 * @param colorTransform
 * @param stage
 * @param visible
 * @return {*}
 */
StaticText.prototype.render = function (ctx, matrix, colorTransform, stage, visible)
{
    // colorTransform
    var rColorTransform = this.$multiplicationColor(colorTransform, this.getColorTransform());

    var isVisible = this.$min(this.getVisible(), visible);
    var alpha     = +(rColorTransform[3] + (rColorTransform[7] / 255));
    var stageClip = stage.clipMc || stage.isClipDepth;
    if (!stageClip && (!alpha || !isVisible)) {
        return 0;
    }

    // matrix
    var m2 = this.$multiplicationMatrix(matrix, this.getMatrix());

    // pre render
    var obj = this.preRender(ctx, m2, rColorTransform, stage, visible);
    var m3  = this.$multiplicationMatrix(stage.getMatrix(), obj.preMatrix);

    var xScale = +this.$sqrt(m3[0] * m3[0] + m3[1] * m3[1]);
    var yScale = +this.$sqrt(m3[2] * m3[2] + m3[3] * m3[3]);
    xScale = +this.$pow(this.$SQRT2, this.$ceil(this.$log(xScale) / this.$LN2_2 - this.$LOG1P));
    yScale = +this.$pow(this.$SQRT2, this.$ceil(this.$log(yScale) / this.$LN2_2 - this.$LOG1P));

    // render
    var bounds = this.getBounds();
    var xMax   = +bounds.xMax;
    var xMin   = +bounds.xMin;
    var yMax   = +bounds.yMax;
    var yMin   = +bounds.yMin;

    var W = this.$abs(this.$ceil((xMax - xMin) * xScale))|0;
    var H = this.$abs(this.$ceil((yMax - yMin) * yScale))|0;
    var isClipDepth = this.isClipDepth || stageClip;
    if (W > 0 && H > 0) {
        var cacheId  = this.getCharacterId() + "_" + this.getStage().getId();
        var cacheKey = this.$cacheStore.generateKey(cacheId, [xScale, yScale], rColorTransform);
        var cache    = this.$cacheStore.getCache(cacheKey);

        var canvas;
        if (!cache && !isClipDepth) {
            if (stage.getWidth() > W && stage.getHeight() > H && this.$cacheStore.size > W * H) {
                canvas        = this.$cacheStore.getCanvas();
                canvas.width  = W;
                canvas.height = H;
                cache         = canvas.getContext("2d");

                var cMatrix = [xScale, 0, 0, yScale, -xMin * xScale, -yMin * yScale];
                cache.setTransform(cMatrix[0],cMatrix[1],cMatrix[2],cMatrix[3],cMatrix[4],cMatrix[5]);
                cache = this.executeRender(cache, cMatrix, rColorTransform, false, false);
                this.$cacheStore.setCache(cacheKey, cache);
            }
        }

        if (cache) {
            canvas = cache.canvas;
            var m4 = this.$multiplicationMatrix(m3, [1 / xScale, 0, 0, 1 / yScale, xMin, yMin]);
            ctx.setTransform(m4[0],m4[1],m4[2],m4[3],m4[4],m4[5]);

            if (this.$isAndroid4x && !this.$isChrome) {
                ctx.fillStyle = stage.context.createPattern(cache.canvas, "no-repeat");
                ctx.fillRect(0, 0, W, H);
            } else {
                ctx.drawImage(canvas, 0, 0, W, H);
            }
        } else {
            ctx.setTransform(m3[0],m3[1],m3[2],m3[3],m3[4],m3[5]);
            this.executeRender(ctx, m3, rColorTransform, isClipDepth, stageClip);
        }

        cacheKey += "_" + m3[4] + "_" + m3[5];
        if (obj.isFilter || obj.isBlend) {
            obj.cacheKey = cacheKey;
            this.postRender(ctx, matrix, rColorTransform, stage, obj);
        }

        return cacheKey;
    }

    return null;
};

/**
 * @param ctx
 * @param matrix
 * @param colorTransform
 * @param isClipDepth
 * @param stageClip
 * @returns {*}
 */
StaticText.prototype.executeRender = function (ctx, matrix, colorTransform, isClipDepth, stageClip)
{
    var records = this.getRecords();
    var length  = records.length|0;
    if (!length) {
        return ctx;
    }

    var i = 0;
    while (i < length) {
        var record = records[i];
        i = (i + 1)|0;

        var shapes      = record.getData();
        var shapeLength = shapes.length|0;
        if (!shapeLength) {
            continue;
        }

        var m2 = this.$multiplicationMatrix(matrix, record.getMatrix());
        ctx.setTransform(m2[0],m2[1],m2[2],m2[3],m2[4],m2[5]);

        var color     = record.getColor();
        color         = this.$generateColorTransform(color, colorTransform);
        ctx.fillStyle = "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";

        var idx = 0;
        while (idx < shapeLength) {
            var styleObj = shapes[idx];
            var cmd      = styleObj.cmd;

            if (!isClipDepth) {
                ctx.beginPath();
                cmd(ctx);
                ctx.fill();
            } else {
                cmd(ctx);
            }

            idx = (idx + 1)|0;
        }
    }

    if (isClipDepth && !stageClip) {
        ctx.clip();
    }

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
StaticText.prototype.renderHitTest = function (ctx, matrix, stage, x, y)
{
    var records = this.getRecords();
    var length  = records.length|0;
    if (!length) {
        return false;
    }

    var hit = false;
    var m2  = this.$multiplicationMatrix(matrix, this.getMatrix());
    var m3  = this.$multiplicationMatrix(stage.getMatrix(), m2);

    var i = 0;
    while (i < length) {
        var record = records[i];
        i = (i + 1)|0;

        var shapes      = record.getData();
        var shapeLength = shapes.length|0;
        if (!shapeLength) {
            continue;
        }

        var m4 = this.$multiplicationMatrix(m3, record.getMatrix());
        ctx.setTransform(m4[0],m4[1],m4[2],m4[3],m4[4],m4[5]);

        var idx = 0;
        while (idx < shapeLength) {
            var styleObj = shapes[idx];
            var cmd      = styleObj.cmd;

            ctx.beginPath();
            cmd(ctx);

            hit = ctx.isPointInPath(x, y);
            if (hit) {
                return hit;
            }

            idx = (idx + 1)|0;
        }
    }

    return hit;
};