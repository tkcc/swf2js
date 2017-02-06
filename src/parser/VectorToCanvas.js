/**
 * @constructor
 */
var VectorToCanvas = function () {};

/**
 * Function
 */
VectorToCanvas.prototype.$Function = Function;

/**
 * @param src
 * @returns {{}}
 */
VectorToCanvas.prototype.clone = function (src)
{
    var execute = function (src, obj)
    {
        var prop;
        for (prop in src) {
            if (!src.hasOwnProperty(prop)) {
                continue;
            }

            var value = src[prop];
            if (value instanceof Array) {
                obj[prop] = [];
                execute(value, obj[prop]);
            } else if (value instanceof Object) {
                obj[prop] = {};
                execute(value, obj[prop]);
            } else {
                obj[prop] = value;
            }
        }
    };

    var obj = {};
    execute(src, obj);
    return obj;
};

/**
 * @param shapes
 * @param isMorph
 * @returns {Array}
 */
VectorToCanvas.prototype.convert = function (shapes, isMorph)
{
    var lineStyles = shapes.lineStyles.lineStyles;
    var fillStyles = shapes.fillStyles.fillStyles;
    var records    = shapes.ShapeRecords;
    var idx        = 0;
    var obj        = {};
    var cache      = [];
    var AnchorX    = 0;
    var AnchorY    = 0;
    var MoveX      = 0;
    var MoveY      = 0;
    var LineX      = 0;
    var LineY      = 0;
    var FillStyle0 = 0;
    var FillStyle1 = 0;
    var LineStyle  = 0;
    var fills0     = [];
    var fills1     = [];
    var lines      = [];
    var stack      = [];
    var depth      = 0;

    var length = records.length|0;
    var i = 0;
    while (i < length) {
        var record = records[i];
        i = (i + 1)|0;

        if (!record) {
            stack = this.setStack(stack, this.fillMerge(fills0, fills1, isMorph));
            stack = this.setStack(stack, lines);
            break;
        }

        if (record.isChange) {
            depth = (depth + 1)|0;
            if (record.StateNewStyles) {
                AnchorX = 0;
                AnchorY = 0;
                stack   = this.setStack(stack, this.fillMerge(fills0, fills1, isMorph));
                stack   = this.setStack(stack, lines);
                fills0  = [];
                fills1  = [];
                lines   = [];

                if (record.NumFillBits) {
                    fillStyles = record.FillStyles.fillStyles;
                }

                if (record.NumLineBits) {
                    lineStyles = record.LineStyles.lineStyles;
                }
            }

            MoveX = AnchorX;
            MoveY = AnchorY;
            if (record.StateMoveTo) {
                MoveX = record.MoveX;
                MoveY = record.MoveY;
            }

            LineX = MoveX;
            LineY = MoveY;

            if (record.StateFillStyle0) {
                FillStyle0 = record.FillStyle0|0;
            }

            if (record.StateFillStyle1) {
                FillStyle1 = record.FillStyle1|0;
            }

            if (record.StateLineStyle) {
                LineStyle = record.LineStyle|0;
            }

            continue;
        }

        AnchorX      = record.AnchorX;
        AnchorY      = record.AnchorY;
        var ControlX = record.ControlX;
        var ControlY = record.ControlY;
        var isCurved = record.isCurved;

        if (FillStyle0) {
            idx = (FillStyle0 - 1)|0;
            if (!(idx in fills0)) {
                fills0[idx] = [];
            }

            if (!(depth in fills0[idx])) {
                fills0[idx][depth] = {
                    obj:    fillStyles[idx],
                    startX: MoveX,
                    startY: MoveY,
                    endX:   0,
                    endY:   0,
                    cache:  []
                };
            }

            obj   = fills0[idx][depth];
            cache = obj.cache;
            cache[cache.length] = this.clone(record);

            obj.endX = AnchorX;
            obj.endY = AnchorY;
        }

        if (FillStyle1) {
            idx = (FillStyle1 - 1)|0;
            if (!(idx in fills1)) {
                fills1[idx] = [];
            }

            if (!(depth in fills1[idx])) {
                fills1[idx][depth] = {
                    obj:    fillStyles[idx],
                    startX: MoveX,
                    startY: MoveY,
                    endX:   0,
                    endY:   0,
                    cache:  []
                };
            }

            obj   = fills1[idx][depth];
            cache = obj.cache;
            cache[cache.length] = this.clone(record);

            obj.endX = AnchorX;
            obj.endY = AnchorY;
        }

        if (LineStyle) {
            idx = (LineStyle - 1)|0;
            if (!(idx in lines)) {
                lines[idx] = {
                    obj:   lineStyles[idx],
                    cache: []
                };
            }

            obj   = lines[idx];
            cache = obj.cache;
            cache[cache.length] = [0, LineX, LineY];

            var code = [2, AnchorX, AnchorY];
            if (isCurved) {
                code = [1, ControlX, ControlY, AnchorX, AnchorY];
            }

            cache[cache.length] = code;
        }

        LineX = AnchorX;
        LineY = AnchorY;
    }

    return stack;
};

/**
 * @param fills0
 * @param fills1
 * @param isMorph
 * @returns {*}
 */
VectorToCanvas.prototype.fillMerge = function (fills0, fills1, isMorph)
{
    fills0 = this.fillReverse(fills0);

    if (fills0.length) {
        for (var idx in fills0) {
            if (!fills0.hasOwnProperty(idx)) {
                continue;
            }

            var fills = fills0[idx];
            if (idx in fills1) {
                var fill1 = fills1[idx];
                for (var depth in fills) {
                    if (!fills.hasOwnProperty(depth)) {
                        continue;
                    }

                    fill1[fill1.length] = fills[depth];
                }
            } else {
                fills1[idx] = fills;
            }
        }
    }

    return this.coordinateAdjustment(fills1, isMorph);
};

/**
 * @param fills0
 * @returns {*}
 */
VectorToCanvas.prototype.fillReverse = function (fills0)
{
    if (!fills0.length) {
        return fills0;
    }

    for (var i in fills0) {
        if (!fills0.hasOwnProperty(i)) {
            continue;
        }

        var fills = fills0[i];
        for (var depth in fills) {
            if (!fills.hasOwnProperty(depth)) {
                continue;
            }

            var AnchorX = 0;
            var AnchorY = 0;
            var obj     = fills[depth];
            var cacheX  = obj.startX;
            var cacheY  = obj.startY;
            var cache   = obj.cache;
            var length  = cache.length|0;
            if (length) {
                for (var idx in cache) {
                    if (!cache.hasOwnProperty(idx)) {
                        continue;
                    }

                    var recode     = cache[idx];
                    AnchorX        = recode.AnchorX;
                    AnchorY        = recode.AnchorY;
                    recode.AnchorX = cacheX;
                    recode.AnchorY = cacheY;
                    cacheX         = AnchorX;
                    cacheY         = AnchorY;
                }

                var array = [];
                if (length > 0) {
                    while (length) {
                        length = (length - 1)|0;
                        array[array.length] = cache[length];
                    }
                }

                obj.cache = array;
            }

            cacheX     = obj.startX;
            cacheY     = obj.startY;
            obj.startX = obj.endX;
            obj.startY = obj.endY;
            obj.endX   = cacheX;
            obj.endY   = cacheY;
        }
    }
    return fills0;
};

/**
 * @param fills1
 * @param isMorph
 */
VectorToCanvas.prototype.coordinateAdjustment = function (fills1, isMorph)
{
    for (var i in fills1) {
        if (!fills1.hasOwnProperty(i)) {
            continue;
        }

        var array = [];
        var fills = fills1[i];

        for (var depth in fills) {
            if (!fills.hasOwnProperty(depth)) {
                continue;
            }

            array[array.length] = fills[depth];
        }

        var adjustment = [];
        if (array.length > 1 && !isMorph) {
            while (true) {
                if (!array.length) {
                    break;
                }

                var fill = array.shift();
                if (fill.startX === fill.endX && fill.startY === fill.endY) {
                    adjustment[adjustment.length] = fill;
                    continue;
                }

                var length = array.length|0;
                if (length < 0) {
                    break;
                }

                var isMatch = 0;
                while (length) {
                    length = (length - 1)|0;

                    var comparison = array[length];
                    if (comparison.startX === fill.endX && comparison.startY === fill.endY) {
                        fill.endX  = comparison.endX;
                        fill.endY  = comparison.endY;
                        var cache0 = fill.cache;
                        var cache1 = comparison.cache;
                        var cLen   = cache1.length|0;
                        var cIdx   = 0;
                        while (cIdx < cLen) {
                            cache0[cache0.length] = cache1[cIdx];
                            cIdx = (cIdx + 1)|0;
                        }

                        array.splice(length, 1);
                        array.unshift(fill);
                        isMatch = 1;
                        break;
                    }
                }

                if (!isMatch) {
                    array.unshift(fill);
                }
            }
        } else {
            adjustment = array;
        }

        var aLen  = adjustment.length|0;
        var cache = [];
        var obj   = {};
        var idx   = 0;
        while (idx < aLen) {

            var data   = adjustment[idx];
            obj        = data.obj;
            var caches = data.cache;
            var cacheLength = (caches.length)|0;
            cache[cache.length] = [0, data.startX, data.startY];

            var compIdx = 0;
            while (compIdx < cacheLength) {
                var r = caches[compIdx];
                var code = [2, r.AnchorX, r.AnchorY];
                if (r.isCurved) {
                    code = [1, r.ControlX, r.ControlY, r.AnchorX, r.AnchorY];
                }
                cache[cache.length] = code;
                compIdx = (compIdx + 1)|0;
            }

            idx = (idx + 1)|0;
        }

        fills1[i] = {cache: cache, obj: obj};
    }

    return fills1;
};

/**
 * @param stack
 * @param array
 * @returns {*}
 */
VectorToCanvas.prototype.setStack = function (stack, array)
{
    if (array.length) {
        for (var i in array) {
            if (!array.hasOwnProperty(i)) {
                continue;
            }

            var data = array[i];
            stack[stack.length] = {
                obj: data.obj,
                cmd: this.buildCommand(data.cache)
            };
        }
    }

    return stack;
};

/**
 * @param cache
 * @returns {*}
 */
VectorToCanvas.prototype.buildCommand = function (cache)
{
    return this.toCanvas2D(cache);
};

/**
 * @param cache
 * @returns {*}
 */
VectorToCanvas.prototype.toCanvas2D = function (cache)
{
    var length = cache.length|0;
    var str    = "";
    var i      = 0;
    while (i < length) {
        var a = cache[i];
        switch (a[0]) {
            case 0:
                str += "ctx.moveTo(" + a[1] + "," + a[2] + ");";
                break;
            case 1:
                str += "ctx.quadraticCurveTo(" + a[1] + "," + a[2] + "," + a[3] + "," + a[4] + ");";
                break;
            case 2:
                str += "ctx.lineTo(" + a[1] + "," + a[2] + ");";
                break;
            case 3:
                str += "ctx.bezierCurveTo(" + a[1] + "," + a[2] + "," + a[3] + "," + a[4] + "," + a[5] + "," + a[6] + ");";
                break;
            case 4:
                str += "ctx.moveTo(" + (a[1] + a[3]) + "," + a[2] + ");";
                str += "ctx.arc(" + a[1] + "," + a[2] + "," + a[3] + ",0 , Math.PI*2, false);";
                break;

            // Graphics
            case 5: // fillStyle
                str += "var r = Math.max(0, Math.min(("+ a[1] +" * ct[0]) + ct[4], 255))|0;";
                str += "var g = Math.max(0, Math.min(("+ a[2] +" * ct[1]) + ct[5], 255))|0;";
                str += "var b = Math.max(0, Math.min(("+ a[3] +" * ct[2]) + ct[6], 255))|0;";
                str += "var a = Math.max(0, Math.min(("+ a[4] +" * 255 * ct[3]) + ct[7], 255)) / 255;";
                str += "ctx.fillStyle = 'rgba('+r+', '+g+', '+b+', '+a+')';";
                break;
            case 6: // strokeStyle
                str += "var r = Math.max(0, Math.min(("+ a[1] +" * ct[0]) + ct[4], 255))|0;";
                str += "var g = Math.max(0, Math.min(("+ a[2] +" * ct[1]) + ct[5], 255))|0;";
                str += "var b = Math.max(0, Math.min(("+ a[3] +" * ct[2]) + ct[6], 255))|0;";
                str += "var a = Math.max(0, Math.min(("+ a[4] +" * 255 * ct[3]) + ct[7], 255)) / 255;";
                str += "ctx.strokeStyle = 'rgba('+r+', '+g+', '+b+', '+a+')';";
                break;
            case 7: // fill
                str += "if (!isClip) { ctx.fill(); }";
                break;
            case 8: // stroke
                str += "if (!isClip) { ctx.stroke(); }";
                break;
            case 9: // width
                str += "ctx.lineWidth = "+ a[1] +";";
                break;
            case 10: // lineCap
                str += "ctx.lineCap = '"+ a[1] +"';";
                break;
            case 11: // lineJoin
                str += "ctx.lineJoin = '"+ a[1] +"';";
                break;
            case 12: // miterLimit
                str += "ctx.miterLimit = '"+ a[1] +"';";
                break;
            case 13: // beginPath
                str += "ctx.beginPath();";
                break;
        }

        i = (i + 1)|0;
    }

    return new this.$Function("ctx", "ct", "isClip", str);
};

Util.prototype.$vtc = new VectorToCanvas();