/**
 * @param name
 * @param depth
 * @param width
 * @param height
 * @constructor
 */
var TextField = function (name, depth, width, height)
{
    InteractiveObject.call(this);

    if (name) {
        this.setName(name);
    }

    if (depth) {
        this.setLevel(depth);
    }

    if (width === undefined) {
        width = 0;
    }
    width = width * 20;

    if (height === undefined) {
        height = 0;
    }
    height = height * 20;

    this.fontId      = 0;
    this.input       = null;
    this.inputActive = false;
    this.span        = null;
    this.bounds      = {xMin: 0, xMax: width, yMin: 0, yMax: height};
};

/**
 * extends
 * @type {InteractiveObject}
 */
TextField.prototype = Object.create(InteractiveObject.prototype);
TextField.prototype.constructor = TextField;

/**
 * properties
 */
Object.defineProperties(TextField.prototype, {
    text: {
        get: function () {
            return this.variables.text;
        },
        set: function (text) {
            this.variables.text = text;
        }
    },
    htmlText: {
        get: function () {
            return this.variables.text;
        },
        set: function (text) {
            this.variables.text = text;
        }
    },
    size: {
        get: function () {
            return this.variables.size;
        },
        set: function (size) {
            this.variables.size = size;
        }
    },
    font: {
        get: function () {
            return this.variables.font;
        },
        set: function (font) {
            this.variables.font = font;
        }
    },
    type: {
        get: function () {
            return this.variables.type;
        },
        set: function (type) {
            this.variables.type = type;
            if (type === "input") {
                this.setInputElement();
            }
        }
    },
    multiline: {
        get: function () {
            return this.variables.multiline;
        },
        set: function (multiline) {
            this.variables.multiline = multiline;
            if (multiline) {
                this.wordWrap = multiline;
            }
            if (this.type === "input") {
                this.setInputElement();
            }
        }
    },
    wordWrap: {
        get: function () {
            return this.variables.wordWrap;
        },
        set: function (wordWrap) {
            this.variables.wordWrap = wordWrap;
            if (this.type === "input") {
                this.setInputElement();
            }
        }
    },
    border: {
        get: function () {
            return this.variables.border;
        },
        set: function (border) {
            this.variables.border = border;
        }
    },
    borderColor: {
        get: function () {
            return this.variables.borderColor;
        },
        set: function (color) {
            if (typeof color === "string") {
                color = this.$colorStringToInt(color);
            }
            color = this.$intToRGBA(color);
            this.variables.borderColor = color;
        }
    },
    background: {
        get: function () {
            return this.variables.background;
        },
        set: function (background) {
            this.variables.background = background;
        }
    },
    backgroundColor: {
        get: function () {
            return this.variables.backgroundColor;
        },
        set: function (color) {
            if (typeof color === "string") {
                color = this.$colorStringToInt(color);
            }
            color = this.$intToRGBA(color);
            this.variables.backgroundColor = color;
        }
    },
    textColor: {
        get: function () {
            return this.variables.textColor;
        },
        set: function (color) {
            if (typeof color === "string") {
                color = this.$colorStringToInt(color);
            }
            color = this.$intToRGBA(color);
            this.variables.textColor = color;
        }
    },
    align: {
        get: function () {
            return this.variables.align;
        },
        set: function (align) {
            this.variables.align = align;
        }
    },
    autoSize: {
        get: function () {
            return this.variables.autoSize;
        },
        set: function (autoSize) {
            this.variables.autoSize = autoSize;
        }
    },
    onChanged: {
        get: function () {
            return this.variables.onChanged;
        },
        set: function (onChanged) {
            this.variables.onChanged = onChanged;
        }
    }
});

/**
 * @returns {string}
 */
TextField.prototype.getClassName = function ()
{
    return "TextField";
};

/**
 * @param int
 * @param alpha
 * @returns {{R: number, G: number, B: number, A: number}}
 */
TextField.prototype.intToRGBA = function (int, alpha)
{
    alpha = alpha || 100;
    return {
        R: (int & 0xff0000) >> 16,
        G: (int & 0x00ff00) >> 8,
        B: (int & 0x0000ff),
        A: (alpha / 100)
    };
};

/**
 * setInitParams
 */
TextField.prototype.setInitParams = function ()
{
    var obj = {};
    obj.antiAliasType     = null;
    obj.autoSize          = "none";
    obj.background        = 0;
    obj.backgroundColor   = {R: 255, G: 255, B: 255, A: 1};
    obj.border            = 0;
    obj.borderColor       = {R: 0, G: 0, B: 0, A: 1};
    obj.condenseWhite     = 0;
    obj.html              = 0;
    obj.password          = 0;
    obj.embedFonts        = 0;
    obj.gridFitType       = "none";
    obj.maxChars          = null;
    obj.mouseWheelEnabled = 0;
    obj.multiline         = 0;
    obj.selectable        = 0;
    obj.sharpness         = 0;
    obj.textColor         = 0;
    obj.thickness         = 0;
    obj.type              = "dynamic";
    obj.wordWrap          = 0;
    obj.text              = "";

    for (var key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }
        this.setProperty(key, obj[key]);
    }

    this.setTextFormat(new TextFormat());
};

/**
 * @returns {string}
 */
TextField.prototype.getTagName = function ()
{
    return "__swf2js_input_element_" + this.instanceId;
};

/**
 * @param format
 */
TextField.prototype.setTextFormat = function (format)
{
    for (var name in format) {
        if (!format.hasOwnProperty(name)) {
            continue;
        }
        this.setProperty(name, format[name]);
    }
};

/**
 * @returns {*}
 */
TextField.prototype.getBounds = function (matrix)
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
TextField.prototype.setBounds = function (bounds)
{
    this.bounds = bounds;
};

/**
 * InputElemen
 */
TextField.prototype.setInputElement = function ()
{
    var variables = this.variables;
    var _root     = this.getDisplayObject("_root");
    var stage     = _root.getParentStage();
    var element   = this.$document.createElement("textarea");
    var multiline = variables.multiline;
    var align     = variables.align;

    var text = this.initialText;
    if (!text) {
        text = variables.text;
    }

    element.onkeypress = null;
    if (!multiline) {
        element.onkeypress = function (e)
        {
            if (e.keyCode === 13) {
                return false;
            }
        };
    }

    var style = element.style;

    style.position           = "absolute";
    style.webkitBorderRadius = "0px";
    style.padding            = "1px";
    style.margin             = "0px";
    style.webkitAppearance   = "none";
    style.resize             = "none";
    style.border             = "none";
    style.overflow           = "hidden";
    style.backgroundColor    = "transparent";
    style.zIndex             = 0x7fffffff;
    style.textAlign          = align;

    element.value = text;
    if (typeof text !== "string") {
        var str    = "";
        var length = 0 | text.length;

        var i = 0;
        while (i < length) {
            var txt = text[i];
            str    += txt.innerText;

            if ((i + 1) !== length) {
                str += "\n";
            }

            i = 0 | i + 1;
        }

        element.value = str;
    }

    element.id = this.getTagName();

    var self = this;
    var onBlur = function (stage, textField, el)
    {
        return function ()
        {
            textField.setProperty("text", el.value);
            textField.inputActive = false;

            var div = self.$document.getElementById(stage.getName());
            if (div) {
                var element = self.$document.getElementById(textField.getTagName());
                if (element) {
                    try {
                        div.removeChild(element);
                    } catch (e) {}
                }
            }
        };
    };

    element.onblur = onBlur(stage, this, element);
    this.input = element;
};

/**
 * @param matrix
 * @param stage
 * @param visible
 * @param mask
 */
TextField.prototype.setHitRange = function (matrix, stage, visible, mask)
{
    var type      = this.variables.type;
    var isVisible = this.$min(this.getVisible(), visible)|0;
    if (type === "input" && isVisible === 1) {
        var buttonHits = stage.buttonHits;

        var m2     = this.$multiplicationMatrix(matrix, this.getMatrix());
        var bounds = this.getBounds(m2);

        buttonHits[buttonHits.length] = {
            xMax:   +bounds.xMax,
            xMin:   +bounds.xMin,
            yMax:   +bounds.yMax,
            yMin:   +bounds.yMin,
            parent: this
        };
    }
};

/**
 * @param ctx
 * @param matrix
 * @param colorTransform
 * @param stage
 * @param visible
 */
TextField.prototype.render = function (ctx, matrix, colorTransform, stage, visible)
{
    stage.doneTags.unshift(this);

    // return "";

    // colorTransform
    var rColorTransform = this.$multiplicationColor(colorTransform, this.getColorTransform());
    var isVisible       = this.$min(this.getVisible(), visible);
    var stageClip       = stage.clipMc || stage.isClipDepth;
    var alpha           = rColorTransform[3] + (rColorTransform[7] / 255);
    if (!stageClip && (!alpha || !isVisible)) {
        return 0;
    }

    // matrix
    var m2 = this.$multiplicationMatrix(matrix, this.getMatrix());

    // pre render
    var obj       = this.preRender(ctx, m2, rColorTransform, stage, visible);
    var preCtx    = obj.preCtx;
    var preMatrix = obj.preMatrix;
    var m3        = this.$multiplicationMatrix(stage.getMatrix(), preMatrix);
    preCtx.setTransform(m3[0],m3[1],m3[2],m3[3],m3[4],m3[5]);

    var textCacheKey = [];
    var variables    = this.variables;
    var text         = variables.text;
    var variable     = variables.variable;
    if (variable) {
        var parent = this.getParent();
        text       = parent.getProperty(variable);
        if (text === undefined) {
            text = variables.text;
        }
    }

    if (typeof text === "number") {
        text += "";
    }

    var html = variables.html;
    if (html && typeof text === "string") {
        if (text.indexOf("<sbr />") !== -1) {
            text = text.replace(new RegExp("<sbr />", "gi"), "\n");
        }
        if (text.indexOf("<b>") !== -1) {
            text = text.replace(new RegExp("<b>", "gi"), "");
            text = text.replace(new RegExp("</b>", "gi"), "");
        }

        var span = this.$document.createElement("span");
        span.innerHTML = text;

        var tags = span.getElementsByTagName("p");
        var domLength = tags.length;
        if (domLength) {
            var tagData = [];
            for (var d = 0; d < domLength; d++) {
                tagData[d] = tags[d];
            }
            text = tagData;
        } else {
            text = span.innerText;
        }
    }

    preCtx.textBaseline = "top";
    if (text === undefined) {
        text = "";
    }

    var bounds = this.getBounds();
    var xMax   = bounds.xMax;
    var xMin   = bounds.xMin;
    var yMax   = bounds.yMax;
    var yMin   = bounds.yMin;
    var W      = this.$abs(this.$ceil(xMax - xMin));
    var H      = this.$abs(this.$ceil(yMax - yMin));

    // auto size
    var i, txtObj, measureText;

    var scale          = stage.getScale();
    var autoSize       = variables.autoSize;
    var wordWrap       = variables.wordWrap;
    var splitData      = (typeof text === "string") ? text.split("\n") : text;
    var length         = 0 | splitData.length;
    var txtTotalWidth  = 0;
    var txtTotalHeight = 0;
    var isAutoSize     = false;
    var autoMode       = (typeof autoSize === "string") ? autoSize.toLowerCase() : autoSize;
    switch (autoMode) {
        default:
        case "none":
        case false:
        case 0:
            txtTotalWidth  = W;
            txtTotalHeight = H;
            break;
        case true:
        case 1:
        case "left":
        case "center":
        case "right":
            isAutoSize = true;
            break;
    }

    var fontData = this.getStage().getCharacter(this.fontId);
    if (isAutoSize) {
        if (variables.embedFonts) {
            var CodeTable        = fontData.CodeTable;
            var FontAdvanceTable = fontData.FontAdvanceTable;
            var fontScale        = this.fontScale;
            txtTotalWidth        = 0;
            txtTotalHeight       = (fontData.FontAscent * fontScale) + variables.leading;

            i = 0;
            while (i < length) {
                txtObj = splitData[i];
                i = 0 | i + 1;

                if (typeof txtObj !== "string") {
                    var firstChild = txtObj.firstChild;
                    txtTotalWidth  = this.getDomWidth(firstChild, CodeTable, FontAdvanceTable);
                } else {
                    var txtLength = 0 | txtObj.length;
                    var idx = 0;
                    while (idx < txtLength) {
                        var index = CodeTable.indexOf(txtObj[idx].charCodeAt(0));
                        idx = 0 | idx + 1;

                        if (index === -1) {
                            continue;
                        }

                        txtTotalWidth = 0 | (FontAdvanceTable[index] * fontScale) + txtTotalWidth;
                    }
                }
            }
        } else {
            var addH       = (variables.size * 20) + variables.leading;
            txtTotalHeight = (bounds.yMin + 80);
            if (wordWrap) {
                txtTotalWidth = W;

                i = 0;
                while (i < length) {
                    txtObj = splitData[i];
                    i = 0 | i + 1;

                    if (typeof txtObj === "string") {
                        measureText = preCtx.measureText(txtObj);
                        var checkW  = this.$ceil(measureText.width * 20);
                        if (checkW > W) {
                            txtTotalHeight += this.$ceil(this.$ceil(checkW / W) * addH);
                        }
                    }
                }
            } else {
                i = 0;
                while (i < length) {
                    txtObj = splitData[i];
                    i = 0 | i + 1;

                    if (typeof txtObj === "string") {
                        measureText     = preCtx.measureText(txtObj);
                        txtTotalWidth   = this.$max(txtTotalWidth, this.$ceil(measureText.width * 20));
                        txtTotalHeight += addH;
                    }
                }
            }

            txtTotalWidth = 0 | txtTotalWidth ;+ 80;
        }
    }

    var offsetX = 40;
    switch (autoMode) {
        case "center":
            offsetX = this.$ceil((this.$max(txtTotalWidth, W) - this.$min(txtTotalWidth, W)) / 2);
            break;
        case "right":
            offsetX = this.$ceil(this.$max(txtTotalWidth, W) - this.$min(txtTotalWidth, W));
            break;
    }

    W = txtTotalWidth;
    H = txtTotalHeight;

    if (W > 0 && H > 0) {
        var color;

        var isClipDepth = this.isClipDepth || stageClip;
        var rx          = xMin;
        var ry          = yMin;
        var m           = this._matrix;
        if (m) {
            rx = -xMin;
            ry = -yMin;
            var m4 = this.$multiplicationMatrix(preMatrix, [1, 0, 0, 1, xMin, yMin]);
            m3     = this.$multiplicationMatrix(stage.getMatrix(), m4);
            preCtx.setTransform(m3[0],m3[1],m3[2],m3[3],m3[4],m3[5]);
        }

        // border
        var border = variables.border;
        if (border && !isClipDepth) {
            preCtx.beginPath();
            preCtx.rect(rx - offsetX, ry, W, H);

            color = this.$generateColorTransform(variables.borderColor, rColorTransform);

            textCacheKey[textCacheKey.length] = color;

            preCtx.strokeStyle = "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";
            preCtx.lineWidth   = this.$min(20, 1 / this.$min(m3[0], m3[3]));
            preCtx.globalAlpha = 1;
            preCtx.fillStyle   = "rgba(0,0,0,0)";

            if (variables.background) {
                color = this.$generateColorTransform(variables.backgroundColor, rColorTransform);
                textCacheKey[textCacheKey.length] = color;
                preCtx.fillStyle = "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";
            }

            preCtx.fill();
            preCtx.stroke();
        }

        var textColor = variables.textColor;
        var objRGBA   = textColor;
        if (typeof textColor === "number") {
            objRGBA = this.$intToRGBA(textColor, 100);
        }

        color         = this.$generateColorTransform(objRGBA, rColorTransform);
        var fillStyle = "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";
        textCacheKey[textCacheKey.length] = fillStyle;

        preCtx.fillStyle = fillStyle;

        // font type
        var fontType = "";

        // italic
        if (variables.italic) {
            fontType += "italic ";
        }

        // bold
        if (variables.bold) {
            fontType += "bold ";
        }

        var fontStyle = fontType + variables.size + "px " + variables.font;
        textCacheKey[textCacheKey.length] = fontStyle.replace(/ /g , "_");
        preCtx.font = fontStyle;

        if (this.input !== null) {
            var input    = this.input;
            var fontSize = this.$ceil(variables.size * scale * this.$min(preMatrix[0], preMatrix[3]));

            input.style.font  = fontType + fontSize + "px " + variables.font;
            input.style.color = "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";

            var as = variables.onChanged;
            if (as && !input.onchange) {
                var onChanged = function (stage, origin, clip, el)
                {
                    return function ()
                    {
                        if (clip.active) {
                            clip.setProperty("text", el.value);
                            origin.apply(clip, arguments);
                            stage.executeAction();
                        }
                    };
                };
                input.onchange = onChanged(stage, as, this, input);
            }
        }

        if (text && !isClipDepth) {
            preCtx.save();
            preCtx.beginPath();
            preCtx.rect(rx - offsetX, ry, W, (H-40));
            preCtx.clip();

            if (this.inputActive === false) {
                if (variables.embedFonts) {
                    this.renderOutLine(preCtx, fontData, splitData, m3, rx - offsetX, W, fillStyle);
                } else {
                    this.renderText(preCtx, splitData, m3, fontType, fillStyle);
                }
            }

            preCtx.restore();
            preCtx.globalAlpha = 1;
        }

        textCacheKey[textCacheKey.length] = text.replace(/ /g , "_");
        textCacheKey[textCacheKey.length] = this.getCharacterId();

        var cacheKey = this.$cacheStore.generateKey(
            textCacheKey.join("_"), m3, rColorTransform
        );

        obj.cacheKey = cacheKey;
        if (obj.isFilter || obj.isBlend) {
            this.postRender(ctx, matrix, rColorTransform, stage, obj);
        }

        return cacheKey;
    }

    return null;
};

/**
 * @param ctx
 * @param fontData
 * @param splitData
 * @param matrix
 * @param offset
 * @param width
 * @param fillStyle
 */
TextField.prototype.renderOutLine = function (ctx, fontData, splitData, matrix, offset, width, fillStyle)
{
    var idx, index;

    var variables        = this.variables;
    var fontScale        = this.fontScale;
    var leading          = (fontData.FontAscent + fontData.FontDescent) * fontScale;
    var rightMargin      = variables.rightMargin * fontScale;
    var leftMargin       = variables.leftMargin * fontScale;
    var indent           = variables.indent * fontScale;
    var align            = variables.align;
    var txt              = "";
    var CodeTable        = fontData.CodeTable;
    var GlyphShapeTable  = fontData.GlyphShapeTable;
    var FontAdvanceTable = fontData.FontAdvanceTable;
    var YOffset          = (fontData.FontAscent * fontScale);
    var cacheYOffset     = YOffset;
    var wordWrap         = variables.wordWrap;
    var multiline        = variables.multiline;
    var bounds           = this.getBounds();
    var areaWidth        = (this.$ceil((bounds.xMax) - (bounds.xMin)) - leftMargin - rightMargin);

    var length = 0 | splitData.length;
    var i = 0;
    while (i < length) {
        var obj = splitData[i];
        i = 0 | i + 1;

        var XOffset   = offset;
        var textWidth = 0;
        var txtLength = 0;
        var firstChild;
        if (typeof obj !== "string") {
            firstChild = obj.firstChild;
            if (!firstChild) {
                continue;
            }

            textWidth = 0 | this.getDomWidth(firstChild, CodeTable, FontAdvanceTable);
            txt       = obj.innerText;
            align     = variables.align;
            if (obj.align) {
                align = obj.align;
            }
        } else {
            txt       = obj;
            txtLength = txt.length;
            idx = 0;
            while (idx < txtLength) {
                index = CodeTable.indexOf(txt[idx].charCodeAt(0));
                idx   = 0 | idx + 1;

                if (index === -1) {
                    continue;
                }

                textWidth = 0 | (FontAdvanceTable[index] * fontScale) + textWidth;
            }
        }

        if (align === "right") {
            XOffset = 0 | (XOffset + width - rightMargin - textWidth - 40);
        } else if (align === "center") {
            XOffset = 0 | (XOffset + indent + leftMargin + 40 + ((width - indent - leftMargin - rightMargin - textWidth) / 2));
        } else {
            XOffset = 0 | (XOffset + indent + leftMargin + 40);
        }

        var cacheXOffset = XOffset;
        var wordWidth    = 0;
        if (typeof obj !== "string") {
            var gridData = {
                XOffset:      XOffset,
                YOffset:      YOffset,
                cacheXOffset: cacheXOffset,
                cacheYOffset: cacheYOffset,
                wordWidth:    wordWidth,
                addXOffset:   0,
                size:         firstChild.size,
                areaWidth:    areaWidth,
                matrix:       matrix
            };

            this.renderDomOutLine(
                ctx, firstChild, gridData, fillStyle,
                CodeTable, FontAdvanceTable, GlyphShapeTable
            );
        } else {
            for (idx = 0; idx < txtLength; idx++) {
                index = CodeTable.indexOf(txt[idx].charCodeAt(0));
                if (index === -1) {
                    continue;
                }

                var addXOffset = FontAdvanceTable[index] * fontScale;
                if (wordWrap && multiline) {
                    if (wordWidth + addXOffset > areaWidth) {
                        XOffset   = cacheXOffset;
                        YOffset  += cacheYOffset;
                        wordWidth = 0;
                    }
                }

                var m2 = this.$multiplicationMatrix(matrix, [fontScale, 0, 0, fontScale, XOffset, YOffset]);
                ctx.setTransform(m2[0],m2[1],m2[2],m2[3],m2[4],m2[5]);
                this.renderGlyph(GlyphShapeTable[index], ctx);

                XOffset   = XOffset   + addXOffset;
                wordWidth = wordWidth + addXOffset;
            }
        }

        YOffset = YOffset + leading;
    }
};

/**
 * @param ctx
 * @param child
 * @param gridData
 * @param fillStyle
 * @param CodeTable
 * @param FontAdvanceTable
 * @param GlyphShapeTable
 */
TextField.prototype.renderDomOutLine = function (
    ctx, child, gridData, fillStyle,
    CodeTable, FontAdvanceTable, GlyphShapeTable
) {
    var variables  = this.variables;
    var wordWrap   = variables.wordWrap;
    var multiline  = variables.multiline;
    var stage      = this.getStage();
    var fonts      = stage.fonts;
    var face       = child.face;
    var fontData   = fonts[face];
    var codeTable  = CodeTable;
    var faTable    = FontAdvanceTable;
    var shapeTable = GlyphShapeTable;
    var color      = fillStyle;
    if (fontData) {
        codeTable  = fontData.CodeTable;
        faTable    = fontData.FontAdvanceTable;
        shapeTable = fontData.GlyphShapeTable;
    }

    if (child.color) {
        color = child.color;
    }

    if (child.size) {
        gridData.size = child.size;
    }

    var childNodes = child.childNodes;
    var length = childNodes.length;
    for (var i = 0; i < length; i++) {
        var node = childNodes[i];
        if (node instanceof HTMLFontElement) {
            this.renderDomOutLine(
                ctx, node, gridData, color,
                codeTable, faTable, shapeTable
            );
        } else {
            var size = gridData.size;
            var fontScale = size / 1024;
            var sTable;
            var values = node.nodeValue;
            if (!values) {
                continue;
            }
            var vLength = values.length;
            for (var idx = 0; idx < vLength; idx++) {
                var txt = values[idx];
                var index = codeTable.indexOf(txt.charCodeAt(0));
                if (index === -1) {
                    index = CodeTable.indexOf(txt.charCodeAt(0));
                    if (index === -1) {
                        continue;
                    }
                    color = fillStyle;
                    gridData.addXOffset = FontAdvanceTable[index] * fontScale;
                    sTable = GlyphShapeTable;
                } else  {
                    gridData.addXOffset = faTable[index] * fontScale;
                    sTable = shapeTable;
                }

                if (wordWrap && multiline) {
                    if (gridData.wordWidth + gridData.addXOffset > gridData.areaWidth) {
                        gridData.XOffset = gridData.cacheXOffset;
                        gridData.YOffset += gridData.cacheYOffset;
                        gridData.wordWidth = 0;
                    }
                }

                var m2 = [fontScale, 0, 0, fontScale, gridData.XOffset, gridData.YOffset];
                var m3 = this.$multiplicationMatrix(gridData.matrix, m2);
                ctx.setTransform(m3[0], m3[1], m3[2], m3[3], m3[4], m3[5]);
                ctx.fillStyle = color;
                this.renderGlyph(sTable[index], ctx);
                gridData.XOffset   += gridData.addXOffset;
                gridData.wordWidth += gridData.addXOffset;
            }
        }
    }
};

/**
 * @param child
 * @param CodeTable
 * @param FontAdvanceTable
 * @returns {number}
 */
TextField.prototype.getDomWidth = function (child, CodeTable, FontAdvanceTable)
{
    var fontScale = this.fontScale;
    var stage     = this.getStage();
    var fonts     = stage.fonts;
    var width     = 0;
    var face      = child.face;
    var fontData  = fonts[face];
    var codeTable = CodeTable;
    var faTable   = FontAdvanceTable;
    if (fontData) {
        codeTable = fontData.CodeTable;
        faTable   = fontData.FontAdvanceTable;
    }

    var childNodes = child.childNodes;
    var length     = childNodes.length;

    var i = 0;
    while (i < length) {
        var node = childNodes[i];
        i = 0 | i + 1;

        if (node instanceof HTMLFontElement) {
            var domWidth = 0 | this.getDomWidth(node, codeTable, faTable);
            width = 0 | width + domWidth;
        } else {
            var values = node.nodeValue;
            if (!values) {
                continue;
            }

            var vLength = values.length;
            var idx = 0;
            while (idx < vLength) {
                var txt = values[idx];
                idx = 0 | idx + 1;

                var index = codeTable.indexOf(txt.charCodeAt(0));
                if (index === -1) {
                    index = CodeTable.indexOf(txt.charCodeAt(0));
                    if (index === -1) {
                        continue;
                    }

                    width = 0 | (FontAdvanceTable[index] * fontScale) + width;
                } else  {
                    width = 0 | (faTable[index] * fontScale) + width;
                }
            }
        }
    }

    return width;
};

/**
 * @param records
 * @param ctx
 */
TextField.prototype.renderGlyph = function (records, ctx)
{
    if (!records.data) {
        records.data = this.$vtc.convert(records);
    }

    var shapes = records.data;
    var length = 0 | shapes.length;

    var idx = 0;
    while (idx < length) {
        var styleObj = shapes[idx];
        idx = 0 | idx + 1;

        var cmd = styleObj.cmd;
        ctx.beginPath();
        cmd(ctx);
        ctx.fill();
    }
};

/**
 * @param ctx
 * @param splitData
 * @param matrix
 * @param fontType
 * @param fillStyle
 */
TextField.prototype.renderText = function (ctx, splitData, matrix, fontType, fillStyle, _x)
{
    var variables   = this.variables;
    var wordWrap    = variables.wordWrap;
    var multiline   = variables.multiline;
    var leading     = variables.leading / 20;
    var rightMargin = variables.rightMargin / 20;
    var leftMargin  = variables.leftMargin / 20;
    var indent      = variables.indent / 20;
    var align       = variables.align;
    var bounds      = this.getBounds();
    var xMax        = bounds.xMax / 20;
    var xMin        = bounds.xMin / 20;
    var width       = this.$ceil(xMax - xMin);

    var m2     = [matrix[0] * 20, matrix[1] * 20, matrix[2] * 20, matrix[3] * 20, matrix[4], matrix[5]];
    var xScale = this.$sqrt(m2[0] * m2[0] + m2[1] * m2[1]);
    var yScale = this.$sqrt(m2[2] * m2[2] + m2[3] * m2[3]);
    var scale  = this.$max(xScale, yScale);
    ctx.setTransform(scale,m2[1],m2[2],scale,m2[4],m2[5]);

    var dx = xMin;
    var dy = (bounds.yMin / 20) + 2;
    if (align === "right") {
        ctx.textAlign = "end";
        dx += width - rightMargin - 2;
    } else if (align === "center") {
        ctx.textAlign = "center";
        dx += leftMargin + indent + ((width - leftMargin - indent - rightMargin) / 2);
    } else {
        dx += 2 + leftMargin + indent;
    }

    bounds        = this.getBounds(m2);
    var areaWidth = (bounds.xMax - bounds.xMin) - ((leftMargin - rightMargin) * xScale);
    areaWidth    /= scale;

    var size   = variables.size;
    var length = 0 | splitData.length;
    var i      = 0;
    while (i < length) {
        var txt = "";
        var obj = splitData[i];
        i = 0 | i + 1;

        if (typeof obj !== "string") {
            txt = obj.innerText;
        } else {
            txt = obj;
        }

        if (txt === "") {
            dy += leading + size;
            continue;
        }

        var measureText   = ctx.measureText(txt);
        var txtTotalWidth = measureText.width;
        if (typeof obj === "string") {
            if (wordWrap || multiline) {
                if (txtTotalWidth > areaWidth) {
                    var txtLength = 0 | txt.length;
                    var joinTxt   = "";
                    var joinWidth = 2 * scale;

                    var t = 0;
                    while (t < txtLength) {
                        var txtOne  = txt[t];
                        var textOne = ctx.measureText(txtOne);
                        joinWidth  += textOne.width;
                        joinTxt    += txtOne;
                        var nextOne = txt[t+1];
                        if (nextOne) {
                            textOne   = ctx.measureText(nextOne);
                            joinWidth = joinWidth + textOne.width;
                        }

                        if (joinWidth > areaWidth || (t + 1) === txtLength) {
                            ctx.fillText(joinTxt, dx, dy, this.$ceil(joinWidth));
                            joinWidth = 2 * scale;
                            joinTxt   = "";
                            dy        = dy + leading + size;
                        } else if (nextOne) {
                            joinWidth = joinWidth - textOne.width;
                        }

                        t = 0 | t + 1;
                    }
                } else {
                    ctx.fillText(txt, dx, dy, txtTotalWidth);
                    dy = dy + leading + size;
                }
            } else {
                ctx.fillText(txt, dx, dy, txtTotalWidth);
                dy = dy + leading + size;
            }
        } else {
            var firstChild = obj.firstChild;
            var gridData = {
                startDx:       dx,
                dx:            dx,
                cloneDy:       dy,
                dy:            dy,
                color:         fillStyle,
                fontType:      fontType,
                fillStyle:     fillStyle,
                size:          size,
                scale:         scale,
                originSize:    size,
                txtTotalWidth: txtTotalWidth,
                areaWidth:     areaWidth,
                joinWidth:     0,
                joinTxt:       "",
                offset:        0,
                offsetArray:   []
            };

            if (gridData.offsetArray.length === 0) {
                this.offsetDomText(ctx, firstChild, gridData);
            }

            // reset
            gridData.dx        = dx;
            gridData.dy        = dy;
            gridData.cloneDy   = dy;
            gridData.size      = size;
            gridData.joinWidth = 0;
            gridData.joinTxt   = "";
            gridData.offset    = 0;

            if (gridData.offsetArray.length > 0) {
                var offsetY = gridData.offsetArray[0];
                if (offsetY) {
                    gridData.dy     += offsetY;
                    gridData.cloneDy = gridData.dy;
                }
            }

            this.renderDomText(ctx, firstChild, gridData);

            dy = gridData.dy;
        }
    }
};

/**
 * @param ctx
 * @param child
 * @param gridData
 */
TextField.prototype.offsetDomText = function(ctx, child, gridData)
{
    var variables = this.variables;
    var wordWrap  = variables.wordWrap;
    var multiline = variables.multiline;
    var leading   = variables.leading / 20;
    if (child.face) {
        gridData.face = child.face;
    }

    if (child.size) {
        var size = child.size|0;
        var changeSize = gridData.originSize - size;
        if (changeSize) {
            gridData.dy += changeSize;
            if (changeSize > 0) {
                gridData.dy -= 4;
            } else {
                var offsetArray = gridData.offsetArray;
                var offset = gridData.offset;
                var offsetSize = offsetArray[offset];
                if (offsetSize) {
                    offsetArray[offset] = this.$max(offsetSize, ~changeSize);
                } else {
                    offsetArray[offset] = ~changeSize;
                }
                gridData.dy += 6;
            }
        }
        gridData.size = size;
    }

    var childNodes = child.childNodes;
    var length = childNodes.length;
    for (var i = 0; i < length; i++) {
        var node = childNodes[i];
        if (node instanceof HTMLFontElement) {
            this.offsetDomText(ctx, node, gridData);
        } else {
            var txt = node.nodeValue;
            if (wordWrap && multiline) {
                if (gridData.txtTotalWidth > gridData.areaWidth) {
                    var txtLength = txt.length;
                    for (var t = 0; t < txtLength; t++) {
                        var textOne = ctx.measureText(txt[t]);
                        gridData.joinWidth += textOne.width;
                        gridData.joinTxt += txt[t];
                        var isOver = (gridData.joinWidth > gridData.areaWidth);
                        if (isOver || (t + 1) === txtLength) {
                            if ((gridData.dx + textOne.width) > gridData.areaWidth) {
                                gridData.dx = gridData.startDx;
                                gridData.dy += leading + gridData.size;
                                gridData.cloneDy = gridData.dy;
                                gridData.joinWidth = 2 * gridData.scale;
                                isOver = false;
                                gridData.offset++;
                            }

                            gridData.joinTxt = "";
                            if (isOver) {
                                gridData.dx = gridData.startDx;
                                gridData.joinWidth = 22 * gridData.scale;
                                gridData.dy += leading + gridData.size;
                                gridData.cloneDy = gridData.dy;
                                gridData.offset++;
                            }
                        }
                    }
                } else {
                    gridData.dy += leading + gridData.size;
                    gridData.cloneDy = gridData.dy;
                    gridData.offset++;
                }
            } else {
                gridData.dy += leading + gridData.size;
                gridData.cloneDy = gridData.dy;
                gridData.offset++;
            }

            var mText = ctx.measureText(txt);
            gridData.dx += mText.width;
            gridData.size = gridData.originSize;
            gridData.dy = gridData.cloneDy;
        }
    }
};

/**
 * @param ctx
 * @param child
 * @param gridData
 */
TextField.prototype.renderDomText = function(ctx, child, gridData)
{
    var variables = this.variables;

    var wordWrap  = variables.wordWrap;
    var multiline = variables.multiline;
    var leading   = variables.leading / 20;

    if (child.face) {
        gridData.face = child.face;
    }

    if (child.color) {
        gridData.color = child.color;
    }

    if (child.size) {
        var size = 0 | child.size;
        var changeSize = 0 | gridData.originSize - size;
        if (changeSize) {
            gridData.dy += changeSize;
            if (changeSize > 0) {
                gridData.dy -= 4;
            } else {
                gridData.dy += 8;
            }
        }
        gridData.size = size;
    }

    var offsetY;
    var childNodes = child.childNodes;
    var length = childNodes.length;
    for (var i = 0; i < length; i++) {
        var node = childNodes[i];
        if (node instanceof HTMLFontElement) {
            this.renderDomText(ctx, node, gridData);
        } else {
            ctx.fillStyle = gridData.color;
            ctx.font = gridData.fontType + gridData.size + "px " + gridData.face;

            var text = node.nodeValue;
            var splits = text.split("\n");
            var sLen= splits.length;
            for (var idx = 0; idx < sLen; idx++) {
                gridData.dx = gridData.startDx;
                var txt = splits[idx];

                if (wordWrap && multiline) {
                    if (gridData.txtTotalWidth > gridData.areaWidth) {
                        var txtLength = txt.length;
                        for (var t = 0; t < txtLength; t++) {
                            var textOne = ctx.measureText(txt[t]);
                            gridData.joinWidth += textOne.width;
                            gridData.joinTxt += txt[t];
                            var isOver = (gridData.joinWidth > gridData.areaWidth);
                            if (isOver || (t + 1) === txtLength) {
                                if ((gridData.dx + textOne.width) > gridData.areaWidth) {
                                    isOver = 0;
                                    gridData.joinWidth = gridData.size;
                                    gridData.dx = gridData.startDx;
                                    gridData.offset++;
                                    gridData.dy += leading + gridData.size;
                                    if (gridData.offsetArray.length > 0) {
                                        offsetY = gridData.offsetArray[gridData.offset];
                                        if (offsetY) {
                                            gridData.dy += offsetY;
                                        }
                                    }
                                    gridData.cloneDy = gridData.dy;
                                }

                                ctx.fillText(gridData.joinTxt, gridData.dx, gridData.dy, _ceil(gridData.joinWidth));
                                gridData.joinTxt = "";
                                if (isOver) {
                                    gridData.dx = gridData.startDx;
                                    gridData.joinWidth = gridData.size;
                                    gridData.offset++;
                                    gridData.dy += leading + gridData.size;
                                    if (gridData.offsetArray.length > 0) {
                                        offsetY = gridData.offsetArray[gridData.offset];
                                        if (offsetY) {
                                            gridData.dy += offsetY;
                                        }
                                    }
                                    gridData.cloneDy = gridData.dy;
                                }
                            }
                        }
                    } else {
                        ctx.fillText(txt, gridData.dx, gridData.dy, _ceil(gridData.txtTotalWidth));
                        gridData.offset++;
                        gridData.dy += leading + gridData.size;
                        if (gridData.offsetArray.length > 0) {
                            offsetY = gridData.offsetArray[gridData.offset];
                            if (offsetY) {
                                gridData.dy += offsetY;
                            }
                        }
                        gridData.cloneDy = gridData.dy;
                    }
                } else {
                    ctx.fillText(txt, gridData.dx, gridData.dy, _ceil(gridData.txtTotalWidth));
                    gridData.offset++;
                    gridData.dy += leading + gridData.size;
                    if (gridData.offsetArray.length > 0) {
                        offsetY = gridData.offsetArray[gridData.offset];
                        if (offsetY) {
                            gridData.dy += offsetY;
                        }
                    }
                    gridData.cloneDy = gridData.dy;
                }

                var mText = ctx.measureText(txt);
                gridData.dx += mText.width;
                gridData.color = gridData.fillStyle;
                gridData.size = gridData.originSize;
                gridData.dy = gridData.cloneDy;
            }
        }
    }
};

/**
 * @param stage
 * @param clipEvent
 */
TextField.prototype.putFrame = function (stage, clipEvent)
{
    this.active = true;
    if (this.inputActive === false) {
        this.dispatchEvent(clipEvent, stage);
    }
};

/**
 * @param ctx
 * @param matrix
 * @param stage
 * @param x
 * @param y
 * @returns {boolean}
 */
TextField.prototype.renderHitTest = function (ctx, matrix, stage, x, y)
{
    var bounds = this.getBounds();
    var xMax   = bounds.xMax;
    var xMin   = bounds.xMin;
    var yMax   = bounds.yMax;
    var yMin   = bounds.yMin;
    var width  = this.$ceil(xMax - xMin);
    var height = this.$ceil(yMax - yMin);

    var m2 = this.$multiplicationMatrix(matrix, this.getMatrix());
    var m3 = this.$multiplicationMatrix(stage.getMatrix(), m2);

    ctx.setTransform(m3[0],m3[1],m3[2],m3[3],m3[4],m3[5]);

    var m = this._matrix;
    if (m) {
        xMin = -xMin;
        yMin = -yMin;
        var m4 = this.$multiplicationMatrix(m2, [1, 0, 0, 1, xMin, yMin]);
        var m5 = this.$multiplicationMatrix(stage.getMatrix(), m4);
        ctx.setTransform(m5[0],m5[1],m5[2],m5[3],m5[4],m5[5]);
    }

    ctx.beginPath();
    ctx.rect(xMin, yMin, width, height);

    return ctx.isPointInPath(x, y);
};

// dummy
TextField.prototype.initFrame  = function () {};
TextField.prototype.addActions = function () {};
TextField.prototype.getTags    = function () { return undefined; };