/**
 * @constructor
 */
var DisplayObject = function ()
{
    EventDispatcher.call(this);
    this.initialize();
};

/**
 * extends
 * @type {EventDispatcher}
 */
DisplayObject.prototype = Object.create(EventDispatcher.prototype);
DisplayObject.prototype.constructor = DisplayObject;

/**
 * properties
 */
Object.defineProperties(DisplayObject.prototype, {
    accessibilityProperties: {
        value: new AccessibilityProperties()
    },
    alpha: {
        get: function () {
            return this.getAlpha() / 100;
        },
        set: function (alpha) {
            this.setAlpha(alpha * 100);
        }
    },
    _alpha: {
        get: function () {
            return this.getAlpha();
        },
        set: function (alpha) {
            this.setAlpha(alpha);
        }
    },
    name: {
        get: function () {
            return this.getName();
        },
        set: function (name) {
            this.setName(name);
        }
    },
    _name: {
        get: function () {
            return this.getName();
        },
        set: function (name) {
            this.setName(name);
        }
    },
    blendMode: {
        get: function () {
            return this.getBlendMode();
        },
        set: function (blendMode) {
            this.setBlendMode(blendMode);
        }
    },
    filters: {
        get: function () {
            return this.getFilters();
        },
        set: function (filters) {
            this.setFilters(filters);
        }
    },
    _visible: {
        get: function () {
            return this.getVisible();
        },
        set: function (visible) {
            this.setVisible(visible);
        }
    },
    visible: {
        get: function () {
            return this.getVisible();
        },
        set: function (visible) {
            this.setVisible(visible);
        }
    },
    _rotation: {
        get: function () {
            return this.getRotation();
        },
        set: function (rotation) {
            this.setRotation(rotation);
        }
    },
    rotation: {
        get: function () {
            return this.getRotation();
        },
        set: function (rotation) {
            this.setRotation(rotation);
        }
    },
    _height: {
        get: function () {
            return this.getHeight();
        },
        set: function (height) {
            this.setHeight(height);
        }
    },
    height: {
        get: function () {
            return this.getHeight();
        },
        set: function (height) {
            this.setHeight(height);
        }
    },
    _width: {
        get: function () {
            return this.getWidth();
        },
        set: function (width) {
            this.setWidth(width);
        }
    },
    width: {
        get: function () {
            return this.getWidth();
        },
        set: function (width) {
            this.setWidth(width);
        }
    },
    _x: {
        get: function () {
            return this.getX();
        },
        set: function (x) {
            this.setX(x);
        }
    },
    x: {
        get: function () {
            return this.getX();
        },
        set: function (x) {
            this.setX(x);
        }
    },
    _y: {
        get: function () {
            return this.getY();
        },
        set: function (y) {
            this.setY(y);
        }
    },
    y: {
        get: function () {
            return this.getY();
        },
        set: function (y) {
            this.setY(y);
        }
    },
    _xscale: {
        get: function () {
            return this.getXScale();
        },
        set: function (xscale) {
            this.setXScale(xscale);
        }
    },
    scaleX: {
        get: function () {
            return this.getXScale();
        },
        set: function (xscale) {
            this.setXScale(xscale);
        }
    },
    _yscale: {
        get: function () {
            return this.getYScale();
        },
        set: function (yscale) {
            this.setYScale(yscale);
        }
    },
    scaleY: {
        get: function () {
            return this.getYScale();
        },
        set: function (yscale) {
            this.setYScale(yscale);
        }
    },
    _xmouse: {
        get: function () {
            return this.getXMouse();
        },
        set: function () {
        }
    },
    mouseX: {
        get: function () {
            return this.getXMouse();
        },
        set: function () {
        }
    },
    _ymouse: {
        get: function () {
            return this.getYMouse();
        },
        set: function () {
        }
    },
    mouseY: {
        get: function () {
            return this.getYMouse();
        },
        set: function () {
        }
    },
    mask: {
        get: function () {
            return this.getMask();
        },
        set: function (obj) {
            this.setMask(obj);
        }
    },
    enabled: {
        get: function () {
            return this.getEnabled();
        },
        set: function (enabled) {
            this.setEnabled(enabled);
        }
    },
    _parent: {
        get: function () {
            return this.getParent();
        },
        set: function (parent) {
            this.setParent(parent);
        }
    },
    parent: {
        get: function () {
            return this.getParent();
        },
        set: function (parent) {
            this.setParent(parent);
        }
    }
});

/**
 * @type {PlaceObject}
 */
DisplayObject.prototype.PlaceObject = new PlaceObject();

/**
 * initialize
 */
DisplayObject.prototype.initialize = function ()
{
    // common
    this.instanceId   = instanceId++;
    this.characterId  = 0;
    this.tagType      = 0;
    this.ratio        = 0;
    this.isMask       = false;
    this.clipDepth    = 0;
    this.isClipDepth  = false;
    this.stageId      = 0;
    this.loadStageId  = null;
    this.variables    = {};
    this.buttonStatus = "up";
    this.removeFlag   = false;
    this.parentId     = null;
    this._sprite      = null;

    // properties
    this.__visible       = true;
    this.__name          = null;
    this._url            = null;
    this._focusrect      = 1;
    this._soundbuftime   = null;
    this._totalframes    = 1;
    this._level          = 0;
    this._depth          = null;
    this._framesloaded   = 0;
    this._target         = "";
    this._lockroot       = undefined;
    this._enabled        = true;
    this._blendMode      = null;
    this._filters        = null;
    this._filterCacheKey = null;
    this._mask           = null;
    this._matrix         = null;
    this._colorTransform = null;
    this._extend         = false;

    // avm2
    this.avm2 = null;
};

// filters
DisplayObject.prototype.flash = {
    filters: {
        DropShadowFilter:    DropShadowFilter,
        BlurFilter:          BlurFilter,
        GlowFilter:          GlowFilter,
        BevelFilter:         BevelFilter,
        GradientGlowFilter:  GradientGlowFilter,
        ConvolutionFilter:   ConvolutionFilter,
        ColorMatrixFilter:   ColorMatrixFilter,
        GradientBevelFilter: GradientBevelFilter,
        BitmapFilter:        BitmapFilter
    }
};

/**
 * @returns {string}
 */
DisplayObject.prototype.toString = function ()
{
    var target = this.getTarget();
    var array  = target.split("/");
    return  "_level0" + array.join(".");
};

/**
 * @param bounds
 * @param matrix
 * @param object
 * @returns {{xMin: Number, xMax: number, yMin: Number, yMax: number}}
 */
DisplayObject.prototype.boundsMatrix = function (bounds, matrix, object)
{
    var no   = this.$Number.MAX_VALUE;
    var xMax = -no;
    var yMax = -no;
    var xMin = no;
    var yMin = no;

    if (object) {
        xMin = +object.xMin;
        xMax = +object.xMax;
        yMin = +object.yMin;
        yMax = +object.yMax;
    }

    var x0 = +(bounds.xMax * matrix[0] + bounds.yMax * matrix[2] + matrix[4]);
    var x1 = +(bounds.xMax * matrix[0] + bounds.yMin * matrix[2] + matrix[4]);
    var x2 = +(bounds.xMin * matrix[0] + bounds.yMax * matrix[2] + matrix[4]);
    var x3 = +(bounds.xMin * matrix[0] + bounds.yMin * matrix[2] + matrix[4]);
    var y0 = +(bounds.xMax * matrix[1] + bounds.yMax * matrix[3] + matrix[5]);
    var y1 = +(bounds.xMax * matrix[1] + bounds.yMin * matrix[3] + matrix[5]);
    var y2 = +(bounds.xMin * matrix[1] + bounds.yMax * matrix[3] + matrix[5]);
    var y3 = +(bounds.xMin * matrix[1] + bounds.yMin * matrix[3] + matrix[5]);

    xMax = +this.$max(this.$max(this.$max(this.$max(xMax, x0), x1), x2), x3);
    xMin = +this.$min(this.$min(this.$min(this.$min(xMin, x0), x1), x2), x3);
    yMax = +this.$max(this.$max(this.$max(this.$max(yMax, y0), y1), y2), y3);
    yMin = +this.$min(this.$min(this.$min(this.$min(yMin, y0), y1), y2), y3);

    return {
        xMin: xMin,
        xMax: xMax,
        yMin: yMin,
        yMax: yMax
    };
};


/**
 * @param src
 * @returns {Array}
 */
DisplayObject.prototype.cloneArray = function(src)
{
    var i      = 0;
    var array  = [];
    var length = src.length|0;

    while (i < length) {
        array[i] = src[i];
        i = (i + 1)|0;
    }

    return array;
};

/**
 * @param blendMode
 * @returns {String}
 */
DisplayObject.prototype.getBlendName = function (blendMode)
{
    var mode = null;
    switch (blendMode) {
        case 1:
        case "normal":
            mode = "normal";
            break;
        case 2:
        case "layer":
            mode = "layer";
            break;
        case 3:
        case "multiply":
            mode = "multiply";
            break;
        case 4:
        case "screen":
            mode = "screen";
            break;
        case 5:
        case "lighten":
            mode = "lighten";
            break;
        case 6:
        case "darken":
            mode = "darken";
            break;
        case 7:
        case "difference":
            mode = "difference";
            break;
        case 8:
        case "add":
            mode = "add";
            break;
        case 9:
        case "subtract":
            mode = "subtract";
            break;
        case 10:
        case "invert":
            mode = "invert";
            break;
        case 11:
        case "alpha":
            mode = "alpha";
            break;
        case 12:
        case "erase":
            mode = "erase";
            break;
        case 13:
        case "overlay":
            mode = "overlay";
            break;
        case 14:
        case "hardlight":
            mode = "hardlight";
            break;
    }
    return mode;
};

/**
 * @param stage
 */
DisplayObject.prototype.setStage = function (stage)
{
    this.stageId = stage.getId();

    // SimpleButton
    if (this.getClassName() === "SimpleButton") {
        var upState = this.getSprite("up");
        upState.setStage(stage);

        var downState = this.getSprite("down");
        downState.setStage(stage);

        var hitState = this.getSprite("hit");
        hitState.setStage(stage);

        var overState = this.getSprite("over");
        overState.setStage(stage);
    }

    stage.setInstance(this);
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getStage = function ()
{
    return this.getLoadStage() || this.getParentStage();
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getParentStage = function ()
{
    var stageId = this.stageId|0;
    return this.$stages[stageId] || this.$loadStages[stageId];
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getLoadStage = function ()
{
    var loadStageId = this.loadStageId;
    if (!loadStageId) {
        return undefined;
    }

    var stages = this.$stages;
    return stages[loadStageId] || this.$loadStages[loadStageId];
};

/**
 * @param stage
 */
DisplayObject.prototype.setLoadStage = function (stage)
{
    this.loadStageId = null;
    if (stage) {
        stage.setInstance(this);
        this.loadStageId = stage.getId();
    }
};

/**
 * @returns {number}
 */
DisplayObject.prototype.getCharacterId = function ()
{
    return this.characterId;
};

/**
 * @param characterId
 */
DisplayObject.prototype.setCharacterId = function (characterId)
{
    this.characterId = characterId|0;
};

/**
 * @returns {number}
 */
DisplayObject.prototype.getTagType = function ()
{
    return this.tagType;
};

/**
 * @param tagType
 */
DisplayObject.prototype.setTagType = function (tagType)
{
    this.tagType = tagType|0;
};

/**
 * @returns {number}
 */
DisplayObject.prototype.getRatio = function ()
{
    return this.ratio;
};

/**
 * @param ratio
 */
DisplayObject.prototype.setRatio = function (ratio)
{
    this.ratio = ratio|0;
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getParent = function ()
{
    var parentId = this.parentId;
    if (parentId === null) {
        return undefined;
    }

    parentId |= 0;

    var parent;
    var stage = this.getLoadStage();
    if (stage) {
        parent = stage.getInstance(parentId);
    }

    if (!parent) {
        stage  = this.getParentStage();
        parent = stage.getInstance(parentId);
    }

    return parent;
};

/**
 * @param parent
 */
DisplayObject.prototype.setParent = function (parent)
{
    if (parent instanceof DisplayObjectContainer) {
        parent.setInstance(this);
    }
    this.parentId = parent.instanceId;
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getParentSprite = function ()
{
    if (!this._sprite) {
        return undefined;
    }

    return this
        .getStage()
        .getInstance(this._sprite);
};

/**
 * @param sprite
 */
DisplayObject.prototype.setParentSprite = function (sprite)
{
    this._sprite = sprite.instanceId|0;
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getButtonStatus = function ()
{
    return this.buttonStatus;
};

/**
 * @param status
 */
DisplayObject.prototype.setButtonStatus = function (status)
{
    this.buttonStatus = status;
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getMask = function ()
{
    return this._mask;
};

/**
 * @param obj
 */
DisplayObject.prototype.setMask = function (obj)
{
    var maskMc = this._mask;
    if (maskMc) {
        maskMc.isMask = false;
    }

    obj.isMask = true;
    this._mask = obj;
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getEnabled = function ()
{
    return this._enabled;
};

/**
 * @param enabled
 */
DisplayObject.prototype.setEnabled = function (enabled)
{
    this._enabled = enabled;
};

/**
 * @returns {boolean}
 */
DisplayObject.prototype.getButtonMode = function ()
{
    return this._buttonMode;
};

/**
 * @param buttonMode
 */
DisplayObject.prototype.setButtonMode = function (buttonMode)
{
    this._buttonMode = buttonMode;
};

/**
 * @returns {string}
 */
DisplayObject.prototype.getTarget = function ()
{
    return this._target;
};

/**
 * @param target
 */
DisplayObject.prototype.setTarget = function (target)
{
    this._target = target;
};

/**
 * @param path
 * @returns {{scope: DisplayObject, target: *}}
 */
DisplayObject.prototype.splitPath = function (path)
{
    var split;
    var scope      = this;
    var target     = path;
    var targetPath = "";
    if (typeof path === "string") {
        switch (true) {
            case (path.indexOf("::") !== -1):
                scope  = this;
                target = path;
                break;
            case (path.indexOf(":") !== -1):
                split      = path.split(":");
                targetPath = split[0];
                target     = split[1];
                break;
            case (path.indexOf(".") !== -1):
                split       = path.split(".");
                target      = split.pop();
                targetPath += split.join(".");
                break;
        }

        if (targetPath) {
            var mc = this.getDisplayObject(targetPath);
            if (mc) {
                scope = mc;
            }
        }
    }

    return {
        "scope":  scope,
        "target": target
    };
};

/**
 * @param name
 * @param parse
 * @returns {undefined}
 */
DisplayObject.prototype.getProperty = function (name, parse)
{
    var _root, rootStage;

    var self   = this;
    var target = name;
    if (parse !== false) {
        var obj = this.splitPath(name);
        self    = obj.scope;
        target  = obj.target;
    }

    if (self.removeFlag) {
        return undefined;
    }

    var value;
    var prop = (typeof target === "string") ? target.toLowerCase() : target;
    switch (prop) {
        case 0:
        case "_x":
            value = self.getX();
            break;
        case 1:
        case "_y":
            value = self.getY();
            break;
        case 2:
        case "_xscale":
            value = self.getXScale();
            break;
        case 3:
        case "_yscale":
            value = self.getYScale();
            break;
        case 4:
        case "_currentframe":
            if (self instanceof MovieClip) {
                value = self.getCurrentFrame();
            }
            break;
        case 5:
        case "_totalframes":
            if (self instanceof MovieClip) {
                value = self.getTotalFrames();
            }
            break;
        case 6:
        case "_alpha":
            value = self.getAlpha();
            break;
        case 7:
        case "_visible":
            value = self.getVisible();
            break;
        case 8:
        case "_width":
            value = self.getWidth();
            break;
        case 9:
        case "_height":
            value = self.getHeight();
            break;
        case 10:
        case "_rotation":
            value = self.getRotation();
            break;
        case 11:
        case "_target":
            value = self.getTarget();
            break;
        case 12:
        case "_framesloaded":
            value = self._framesloaded;
            break;
        case 13:
        case "_name":
            value = self.getName();
            break;
        case 14:
        case "_droptarget":
            if (self instanceof MovieClip) {
                value = self.getDropTarget();
            }
            break;
        case 15:
        case "_url":
            value = self._url;
            break;
        case 16:
        case "_highquality":
            _root     = self.getDisplayObject("_root");
            rootStage = _root.getStage();
            value = 0;
            value = (rootStage.quality === "high") ? 1 : 0;
            break;
        case 17:
        case "_focusrect":
            value = self._focusrect;
            break;
        case 18:
        case "_soundbuftime":
            value = self._soundbuftime;
            break;
        case 19:
        case "_quality":
            _root     = self.getDisplayObject("_root");
            rootStage = _root.getStage();
            value = rootStage.quality;
            break;
        case 20:
        case "_xmouse":
            value = self.getXMouse();
            break;
        case 21:
        case "_ymouse":
            value = self.getYMouse();
            break;
        case "text":
        case "htmltext":
            if (self instanceof TextField) {
                var variable = self.getVariable("variable");
                if (variable) {
                    var mc = self.getParent();
                    value  = mc.getProperty(variable);
                } else {
                    value = self.getVariable("text");
                }
            } else {
                value = self.getVariable(target);
            }
            break;
        case "$version":
            value = "swf2js 8,0,0";
            break;
        case "enabled":
            value = self.getEnabled();
            break;
        case "blendmode":
            value = self.getBlendMode();
            break;
        case "sharedobject":
            value = new SharedObject();
            break;
        case "key":
            value = this.$keyClass;
            break;
        case "mouse":
            _root     = self.getDisplayObject("_root");
            rootStage = _root.getStage();
            value     = rootStage.mouse;
            break;
        default:
            value = self.getVariable(target, parse);
            if (value === undefined && target !== name) {
                value = self.getGlobalVariable(name);
            }
            break;
    }

    return value;
};

/**
 * @param name
 * @param value
 * @param parse
 */
DisplayObject.prototype.setProperty = function (name, value, parse)
{
    var _root, rootStage;

    var self   = this;
    var target = name;
    if (parse !== false) {
        var obj = self.splitPath(name);
        self    = obj.scope;
        target  = obj.target;
    }

    var prop = (typeof target === "string") ? target.toLowerCase() : target;
    switch (prop) {
        case 0:
        case "_x":
            self.setX(value);
            break;
        case 1:
        case "_y":
            self.setY(value);
            break;
        case 2:
        case "_xscale":
            self.setXScale(value);
            break;
        case 3:
        case "_yscale":
            self.setYScale(value);
            break;
        case 4:
        case "_currentframe":
        case 5:
        case "_totalframes":
        case 15:
        case "_url":
        case 20:
        case "_xmouse":
        case 21:
        case "_ymouse":
        case 11:
        case "_target":
        case 12:
        case "_framesloaded":
        case 14:
        case "_droptarget":
            // readonly
            break;
        case 6:
        case "_alpha":
            self.setAlpha(value);
            break;
        case 7:
        case "_visible":
            self.setVisible(value);
            break;
        case 8:
        case "_width":
            self.setWidth(value);
            break;
        case 9:
        case "_height":
            self.setHeight(value);
            break;
        case 10:
        case "_rotation":
            self.setRotation(value);
            break;
        case 13:
        case "_name":
            self.setName(value);
            break;
        case 16:
        case "_highquality":
            _root     = self.getDisplayObject("_root");
            rootStage = _root.getStage();
            if (value) {
                rootStage.quality = "high";
                rootStage.setRatio();
            }
            break;
        case 17:
        case "_focusrect":
            self._focusrect = value;
            break;
        case 18:
        case "_soundbuftime":
            self._soundbuftime = value;
            break;
        case 19:
        case "_quality":
            _root     = self.getDisplayObject("_root");
            rootStage = _root.getStage();
            rootStage.quality = value.toLowerCase();
            rootStage.setRatio();
            break;
        case "text":
        case "htmltext":
            if (self instanceof TextField) {
                var variable = self.getVariable("variable");
                if (variable) {
                    var mc = self.getParent();
                    mc.setProperty(variable, value);
                } else {
                    self.setVariable("text", value);
                }
                var input = self.input;
                if (input) {
                    input.value = value;
                }
            } else {
                self.setVariable(target, value);
            }
            break;
        case "blendmode":
            self.setBlendMode(value);
            break;
        case "enabled":
            self.setEnabled(value);
            break;
        case "filters":
            self.setFilters(value);
            break;
        default:
            self.setVariable(target, value);
            break;
    }
};

/**
 * @returns {number}
 */
DisplayObject.prototype.getDepth = function ()
{
    var _depth = this._depth;
    var depth  = (_depth !== null) ? _depth : this.getLevel();
    return depth - 16384;
};

/**
 * @param depth
 * @param swapDepth
 * @param swapMc
 */
DisplayObject.prototype.setDepth = function (depth, swapDepth, swapMc)
{
    var parent     = this.getParent();
    var _depth     = this._depth;
    var level      = (_depth !== null) ? _depth : this.getLevel();
    var totalFrame = parent.getTotalFrames() + 1;

    if (!swapMc) {
        this._depth = depth;
    } else {
        this._depth   = swapDepth;
        swapMc._depth = depth;
    }

    var container  = parent.container;
    var instanceId = this.instanceId;
    for (var frame = 1; frame < totalFrame; frame++) {
        if (!(frame in container)) {
            container[frame] = [];
        }

        var tags = container[frame];
        if (swapMc) {
            if (level in tags && tags[level] === instanceId) {
                tags[depth] = swapMc.instanceId;
            }

            if (swapDepth in tags && tags[swapDepth] === swapMc.instanceId) {
                tags[swapDepth] = instanceId;
            }
        } else {
            if (!(level in tags) || level in tags && tags[level] === instanceId) {
                delete tags[level];
                tags[depth] = instanceId;
            }
        }

        container[frame] = tags;
    }

    this.setController(false, false, false, false);
    if (swapMc) {
        swapMc.setController(false, false, false, false);
    }
};

/**
 * @returns {number}
 */
DisplayObject.prototype.getX = function ()
{
    var matrix = this.getMatrix();
    return (matrix) ? matrix[4] / 20 : undefined;
};

/**
 * @param x
 */
DisplayObject.prototype.setX = function (x)
{
    x = +x;
    if (!this.$isNaN(x)) {
        var _matrix = this.getMatrix();
        var matrix  = this.cloneArray(_matrix);
        matrix[4]   = x * 20;
        this.setMatrix(matrix);
    }
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getY = function ()
{
    var matrix = this.getMatrix();
    return (matrix) ? matrix[5] / 20 : undefined;
};

/**
 * @param y
 */
DisplayObject.prototype.setY = function (y)
{
    y = +y;
    if (!this.$isNaN(y)) {
        var _matrix = this.getMatrix();
        var matrix  = this.cloneArray(_matrix);
        matrix[5]   = y * 20;
        this.setMatrix(matrix);
    }
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getXScale = function ()
{
    var matrix = this.getMatrix();
    var xScale = this.$sqrt(matrix[0] * matrix[0] + matrix[1] * matrix[1]) * 100;
    if (0 > matrix[0]) {
        xScale = -xScale;
    }
    return xScale;
};

/**
 * @param xscale
 */
DisplayObject.prototype.setXScale = function (xscale)
{
    xscale = +xscale;
    if (!this.$isNaN(xscale)) {
        var _matrix = this.getMatrix();
        var matrix  = this.cloneArray(_matrix);
        var adjustment = 1;
        if (0 > matrix[0]) {
            adjustment = -1;
        }

        var radianX = this.$atan2(matrix[1], matrix[0]);
        xscale     /= 100;
        matrix[0]   = xscale * this.$cos(radianX) * adjustment;
        matrix[1]   = xscale * this.$sin(radianX) * adjustment;

        this.setMatrix(matrix);
    }
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getYScale = function ()
{
    var matrix = this.getMatrix();
    var yScale = this.$sqrt(matrix[2] * matrix[2] + matrix[3] * matrix[3]) * 100;
    if (0 > matrix[3]) {
        yScale *= -1;
    }
    return yScale;
};

/**
 * @param yscale
 */
DisplayObject.prototype.setYScale = function (yscale)
{
    yscale = +yscale;
    if (!this.$isNaN(yscale)) {
        var _matrix = this.getMatrix();
        var matrix  = this.cloneArray(_matrix);
        var adjustment = 1;
        if (0 > matrix[3]) {
            // TODO test
            // adjustment = -1;
        }

        var radianY = this.$atan2(-matrix[2], matrix[3]);
        yscale     /= 100;
        matrix[2]   = -yscale * this.$sin(radianY) * adjustment;
        matrix[3]   = yscale  * this.$cos(radianY) * adjustment;

        this.setMatrix(matrix);
    }
};

/**
 * @returns {number}
 */
DisplayObject.prototype.getAlpha = function ()
{
    var colorTransform = this.getColorTransform();
    var alpha = colorTransform[3] + (colorTransform[7] / 255);
    return alpha * 100;
};

/**
 * @param alpha
 */
DisplayObject.prototype.setAlpha = function (alpha)
{
    alpha = +alpha;
    if (!this.$isNaN(alpha)) {
        var _colorTransform = this.getColorTransform();
        var colorTransform  = this.cloneArray(_colorTransform);
        colorTransform[3]   = alpha / 100;
        colorTransform[7]   = 0;

        this.setColorTransform(colorTransform);
    }
};

/**
 * @returns {number}
 */
DisplayObject.prototype.getVisible = function ()
{
    var stage   = this.getStage();
    var version = stage.getVersion();
    if (version > 4) {
        return this.__visible;
    }

    return (this.__visible) ? 1 : 0;
};

/**
 * @param visible
 */
DisplayObject.prototype.setVisible = function (visible)
{
    if (typeof visible === "boolean") {
        this.__visible = visible;
    } else {
        visible = +visible;
        if (!this.$isNaN(visible)) {
            this.__visible = (visible) ? true : false;
        }
    }
};

/**
 * @returns {number}
 */
DisplayObject.prototype.getLevel = function ()
{
    return this._level;
};

/**
 * @param level
 */
DisplayObject.prototype.setLevel = function (level)
{
    this._level = level;
};

/**
 * @returns {null}
 */
DisplayObject.prototype.getName = function ()
{
    return this.__name;
};

/**
 * @param name
 */
DisplayObject.prototype.setName = function (name)
{
    this.__name = name;
};

/**
 * @returns {number}
 */
DisplayObject.prototype.getRotation = function ()
{
    var matrix   = this.getMatrix();
    var rotation = this.$atan2(matrix[1], matrix[0]) * 180 / this.$PI;
    switch (rotation) {
        case -90.00000000000001:
            rotation = -90;
            break;
        case 90.00000000000001:
            rotation = 90;
            break;
    }
    return rotation;
};

/**
 * @param rotation
 */
DisplayObject.prototype.setRotation = function (rotation)
{
    rotation = +rotation;
    if (!this.$isNaN(rotation)) {
        var _matrix = this.getMatrix();
        var matrix  = this.cloneArray(_matrix);
        var radianX = this.$atan2(matrix[1], matrix[0]);
        var radianY = this.$atan2(-matrix[2], matrix[3]);
        var ScaleX  = this.$sqrt(matrix[0] * matrix[0] + matrix[1] * matrix[1]);
        var ScaleY  = this.$sqrt(matrix[2] * matrix[2] + matrix[3] * matrix[3]);

        rotation   *= this.$PI / 180;
        radianY    += rotation - radianX;
        radianX     = rotation;

        matrix[0]   = ScaleX  * this.$cos(radianX);
        matrix[1]   = ScaleX  * this.$sin(radianX);
        matrix[2]   = -ScaleY * this.$sin(radianY);
        matrix[3]   = ScaleY  * this.$cos(radianY);

        this.setMatrix(matrix);
    }
};

/**
 * @returns {number}
 */
DisplayObject.prototype.getWidth = function ()
{
    var matrix = this.getMatrix();
    var bounds = this.getBounds(matrix);
    return this.$abs(bounds.xMax - bounds.xMin);
};

/**
 * @param width
 */
DisplayObject.prototype.setWidth = function (width)
{
    width = +width;
    if (!this.$isNaN(width)) {
        var _matrix = this.getOriginMatrix();
        var bounds  = this.getBounds(_matrix);
        var _width  = this.$abs(bounds.xMax - bounds.xMin);
        var xScale  = width * _matrix[0] / _width;

        if (this.$isNaN(xScale)) {
            xScale = 0;
        }

        _matrix    = this.getMatrix();
        var matrix = this.cloneArray(_matrix);
        matrix[0]  = xScale;

        this.setMatrix(matrix);
    }
};

/**
 * @returns {number}
 */
DisplayObject.prototype.getHeight = function ()
{
    var matrix = this.getMatrix();
    var bounds = this.getBounds(matrix);
    return this.$abs(bounds.yMax - bounds.yMin);
};

/**
 * @param height
 */
DisplayObject.prototype.setHeight = function (height)
{
    height = +height;
    if (!this.$isNaN(height)) {
        var _matrix = this.getOriginMatrix();
        var bounds  = this.getBounds(_matrix);
        var _height = +this.$abs(bounds.yMax - bounds.yMin);
        var yScale  = +(height * _matrix[3] / _height);

        if (this.$isNaN(yScale)) {
            yScale = 0;
        }

        _matrix    = this.getMatrix();
        var matrix = this.cloneArray(_matrix);
        matrix[3]  = yScale;

        this.setMatrix(matrix);
    }
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getXMouse = function ()
{
    var event = this.$event;
    if (!event) {
        return null;
    }

    var _root   = this.getDisplayObject("_root");
    var stage   = _root.getStage();
    var div     = this.$document.getElementById(stage.getName());
    var bounds  = div.getBoundingClientRect();
    var docBody = this.$document.body;
    var x       = docBody.scrollLeft + bounds.left;

    var touchX = 0;
    if (this.$isTouch) {
        var changedTouche = event.changedTouches[0];
        touchX = changedTouche.pageX;
    } else {
        touchX = event.pageX;
    }

    var mc     = this;
    var matrix = this.getMatrix();
    while (true) {
        var parent = mc.getParent();
        if (!parent) {
            break;
        }

        matrix = this.$multiplicationMatrix(parent.getMatrix(), matrix);
        mc     = parent;
    }

    touchX = +(touchX - x);
    touchX = +(touchX / stage.getScale());
    touchX = +(touchX - (matrix[4] / 20));

    return touchX;
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getYMouse = function ()
{
    var event = this.$event;
    if (!event) {
        return null;
    }

    var _root   = this.getDisplayObject("_root");
    var stage   = _root.getStage();
    var div     = this.$document.getElementById(stage.getName());
    var bounds  = div.getBoundingClientRect();
    var docBody = this.$document.body;
    var y       = docBody.scrollTop + bounds.top;

    var touchY = 0;
    if (this.$isTouch) {
        var changedTouche = event.changedTouches[0];
        touchY = changedTouche.pageY;
    } else {
        touchY = event.pageY;
    }

    var mc     = this;
    var matrix = this.getMatrix();
    while (true) {
        var parent = mc.getParent();
        if (!parent) {
            break;
        }

        matrix = this.$multiplicationMatrix(parent.getMatrix(), matrix);
        mc     = parent;
    }

    touchY = +(touchY - y);
    touchY = +(touchY / stage.getScale());
    touchY = +(touchY - (matrix[5] / 20));

    return touchY;
};

/**
 * @param name
 * @param parse
 * @returns {*}
 */
DisplayObject.prototype.getVariable = function (name, parse)
{
    if (name === undefined) {
        return name;
    }

    var variables = this.variables;
    if (!variables) {
        return undefined;
    }

    if (name in variables) {
        return variables[name];
    }

    var stage   = this.getStage();
    var version = stage.getVersion();
    if (version < 7) {
        for (var key in variables) {
            if (!variables.hasOwnProperty(key)) {
                continue;
            }

            if (key.toLowerCase() === name.toLowerCase()) {
                return variables[key];
            }
        }
    }

    var value;
    if (version > 4) {
        var registerClass = variables.registerClass;
        if (registerClass &&
            typeof registerClass === "object" &&
            name in registerClass
        ) {
            return registerClass[name];
        }

        if (this instanceof MovieClip) {
            value = this.getDisplayObject(name, parse);
            if (value) {
                return value;
            }
        }

        // avm2
        var cId = this.getCharacterId();
        var symbol = stage.symbols[cId];
        if (symbol) {
            var symbols     = symbol.split(".");
            var classMethod = symbols.pop();
            var sLen        = symbols.length;
            var classObj    = stage.avm2;
            var sIdx        = 0;
            while (sIdx < sLen) {
                classObj = classObj[symbols[sIdx]];
                sIdx = (sIdx + 1)|0;
            }

            var AVM2 = classObj[classMethod];
            value = AVM2[name];
            if (value) {
                return value;
            }
        }

        var _global = stage.getGlobal();
        value = _global.getVariable(name);
        if (value) {
            return value;
        }

        if (this.getClassName() === "MovieClip" && name === "flash") {
            return this.flash;
        }

        if (name in window) {
            return window[name];
        }
    }
    return undefined;
};

/**
 * @param name
 * @param value
 */
DisplayObject.prototype.setVariable = function (name, value)
{
    var variables = this.variables;
    var stage     = this.getStage();

    name += "";
    if (stage.getVersion() < 7) {
        var _name = name.toLowerCase();
        for (var key in variables) {
            if (!variables.hasOwnProperty(key)) {
                continue;
            }

            if (key.toLowerCase() !== _name) {
                continue;
            }

            this.variables[key] = value;

            return void (0);
        }
    }

    this.variables[name] = value;
};

/**
 * @param path
 * @returns {*}
 */
DisplayObject.prototype.getGlobalVariable = function (path)
{
    var stage   = this.getStage();
    var version = stage.getVersion();
    if (version < 5) {
        return undefined;
    }

    var splitData = null;
    if (path.indexOf(".") !== -1) {
        splitData = path.split(".");
    }

    var value;
    if (splitData) {
        var _global   = stage.getGlobal();
        var variables = _global.variables;

        var length = splitData.length;
        var i = 0;
        while (i < length) {
            var name = splitData[i];
            i = (i + 1)|0;

            if (version < 7) {
                for (var key in variables) {
                    if (!variables.hasOwnProperty(key)) {
                        continue;
                    }

                    if (key.toLowerCase() === name.toLowerCase()) {
                        value = variables[key];
                        break;
                    }
                }
            } else {
                value = variables[name];
            }

            if (!value) {
                break;
            }

            variables = value;
        }
    }

    return value;
};

/**
 * @param path
 * @param parse
 * @returns {*}
 */
DisplayObject.prototype.getDisplayObject = function (path, parse)
{
    var tags, tag, parent;
    var mc    = this;
    var stage = this.getStage();
    var _root = stage.getParent();

    if (!this._lockroot) {
        while (true) {
            parent = _root.getParent();
            if (!parent) {
                break;
            }
            _root = parent;
        }

        stage = _root.getStage();
    }


    parent = mc.getParent();

    // string
    path = path + "";

    // param
    switch (path) {
        case "_root":
            return _root;
        case "this":
            return this;
        case "_global":
            return stage.getGlobal();
        case "_parent":
            return parent || undefined;
        default:
            break;
    }

    var len = 1;
    var splitData = [path];
    if (parse !== false) {
        switch (true) {
            case (path.indexOf("/") !== -1):
                splitData = path.split("/");
                len       = splitData.length|0;
                if (splitData[0] === "") {
                    mc = _root;
                }
                break;
            case (path.indexOf(".") !== -1):
                splitData = path.split(".");
                len       = splitData.length|0;
                if (splitData[0] === "_root") {
                    mc = _root;
                }
                break;
            case (path.substr(0, 6) === "_level"):
                var level = path.substr(6);
                level     = +level;

                if (level === 0) {
                    return _root;
                }

                if (!parent) {
                    parent = stage.getParent();
                }

                tags = parent.getTags();
                if (level in tags) {
                    var tId = tags[level]|0;
                    tag     = stage.getInstance(tId);
                    if (tag instanceof MovieClip) {
                        return tag;
                    }
                }
                return undefined;
            default:
                break;
        }
    }

    var version = stage.getVersion();

    var i = 0;
    while (i < len) {
        var name = splitData[i];
        i = (i + 1)|0;

        var setTarget = 0;
        switch (name) {
            case "":
                break;
            case "_root":
                mc = _root;
                break;
            case "this":
                mc = this;
                break;
            case "_parent":
                parent = mc.getParent();
                if (!parent) {
                    return undefined;
                }
                mc = parent;
                break;
            case "..":
                mc = mc.getParent();
                if (!mc) {
                    return undefined;
                }
                break;
            default:
                tags = mc.getTags();
                if (!tags) {
                    return undefined;
                }

                var tagLength = tags.length|0;
                if (!tagLength) {
                    return undefined;
                }

                for (var idx in tags) {
                    if (!tags.hasOwnProperty(idx)) {
                        continue;
                    }

                    var instanceId = tags[idx|0]|0;
                    var loadStage  = mc.getStage();

                    tag = loadStage.getInstance(instanceId);
                    if (!tag || tag.removeFlag) {
                        continue;
                    }

                    var tagName = tag.getName();
                    if (!tagName) {
                        continue;
                    }

                    if (version < 7) {
                        if (tagName.toLowerCase() === name.toLowerCase()) {
                            mc        = tag;
                            setTarget = 1;
                            break;
                        }
                    } else {
                        if (tagName === name) {
                            mc        = tag;
                            setTarget = 1;
                            break;
                        }
                    }
                }

                if (!setTarget) {
                    return undefined;
                }

                break;
        }
    }

    return mc;
};

/**
 * @param ctx
 * @param matrix
 * @param colorTransform
 * @param stage
 * @param visible
 */
DisplayObject.prototype.preRender = function (ctx, matrix, colorTransform, stage, visible)
{
    var cache, rMatrix, xScale, yScale, xMin, yMin, xMax, yMax;

    this.isLoad = true;

    var cacheKey  = "";
    var preCtx    = ctx;
    var preMatrix = matrix;

    // mask
    var maskObj = this.getMask();
    if (maskObj) {
        this.renderMask(ctx, stage);
    }

    // filter and blend
    var isFilter = false;
    var isBlend  = false;
    if (visible && !stage.clipMc) {
        var filters = this.getFilters();
        isFilter = (filters && filters.length);

        // blend
        var blendMode = this.getBlendMode();
        isBlend = (blendMode && blendMode !== "normal");
    }

    // filter or blend
    var x, y;
    if (isFilter || isBlend) {
        rMatrix = this.$multiplicationMatrix(stage.getMatrix(), matrix);

        var bounds;
        var twips = 1;
        switch (this.getClassName()) {
            case "Shape":
            case "StaticText":
                bounds = this.getBounds();
                xScale = +this.$sqrt(rMatrix[0] * rMatrix[0] + rMatrix[1] * rMatrix[1]);
                yScale = +this.$sqrt(rMatrix[2] * rMatrix[2] + rMatrix[3] * rMatrix[3]);
                break;
            default:
                twips  = 20;
                bounds = this.getBounds(matrix);
                xScale = +(stage.getScale() * stage.ratio);
                yScale = +(stage.getScale() * stage.ratio);
                break;
        }

        xMin = +bounds.xMin;
        yMin = +bounds.yMin;
        xMax = +bounds.xMax;
        yMax = +bounds.yMax;

        var width  = this.$abs(this.$ceil((xMax - xMin) * xScale))|0;
        var height = this.$abs(this.$ceil((yMax - yMin) * yScale))|0;

        var canvas     = this.$cacheStore.getCanvas();
        canvas.width   = width;
        canvas.height  = height;
        cache          = canvas.getContext("2d");
        cache._offsetX = 0;
        cache._offsetY = 0;

        var m2 = [1, 0, 0, 1, +(-xMin * twips), +(-yMin * twips)];
        var m3 = [matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]];
        if (this.getClassName() === "Shape") {
            m3[4] = 0;
            m3[5] = 0;
        }

        preCtx    = cache;
        preMatrix = this.$multiplicationMatrix(m2, m3);

        x = +(xMin * xScale);
        y = +(yMin * yScale);
    }

    // graphics
    if (visible) {
        cacheKey += this.renderGraphics(preCtx, preMatrix, colorTransform, stage);
    }

    return {
        preCtx:    preCtx,
        preMatrix: preMatrix,
        isFilter:  isFilter,
        isBlend:   isBlend,
        rMatrix:   rMatrix,
        cacheKey:  cacheKey,
        xMin:      x,
        yMin:      y
    };
};

/**
 * @param ctx
 * @param matrix
 * @param colorTransform
 * @param stage
 * @param obj
 */
DisplayObject.prototype.postRender = function(ctx, matrix, colorTransform, stage, obj)
{
    var cache    = obj.preCtx;
    var isFilter = obj.isFilter;
    var cacheKey = obj.cacheKey;
    if (isFilter && cacheKey) {
        cache = this.renderFilter(cache, matrix, colorTransform, stage, cacheKey);
    }

    var xMin = obj.xMin;
    var yMin = obj.yMin;
    if (this.getClassName() === "Shape") {
        xMin += obj.rMatrix[4];
        yMin += obj.rMatrix[5];
    }

    if (cache) {
        xMin = xMin - cache._offsetX;
        yMin = yMin - cache._offsetY;
    }

    this.renderBlend(ctx, cache, xMin, yMin, isFilter);
};


/**
 * @param ctx
 * @param matrix
 * @param colorTransform
 * @param stage
 * @returns {string}
 */
DisplayObject.prototype.renderGraphics = function (ctx, matrix, colorTransform, stage)
{
    var cacheKey = "";
    if ("graphics" in this) {
        var graphics = this.graphics;
        if (graphics.isDraw) {
            cacheKey = graphics.render(ctx, matrix, colorTransform, stage);
        }
    }
    return cacheKey;
};

/**
 * @param ctx
 * @param stage
 */
DisplayObject.prototype.renderMask = function (ctx, stage)
{
    var maskObj = this.getMask();
    if (maskObj) {
        // star
        stage.clipMc = true;

        ctx.save();
        ctx.beginPath();

        var mc     = maskObj;
        var matrix = [1,0,0,1,0,0];
        while (true) {
            var parent = mc.getParent();
            if (!parent.getParent()) {
                break;
            }

            matrix = this.$multiplicationMatrix(parent.getMatrix(), matrix);
            mc = parent;
        }

        maskObj.render(ctx, matrix, [1,1,1,1,0,0,0,0], stage, true);

        // clip
        ctx.clip();

        // end
        stage.clipMc = false;
    }
};

/**
 * @param filters
 * @returns {string}
 */
DisplayObject.prototype.getFilterKey = function (filters)
{
    var keys   = [];
    var length = filters.length;

    var i = 0;
    while (i < length) {
        var filter = filters[i];
        i = (i + 1)|0;

        for (var prop in filter) {
            if (!filter.hasOwnProperty(prop)) {
                continue;
            }

            var value = filter[prop];
            if (value instanceof Array) {
                value = value.join("_");
            }

            keys[keys.length] = value;
        }
    }

    return keys.join("_");
};

/**
 * @param ctx
 * @param matrix
 * @param colorTransform
 * @param stage
 * @param cacheKey
 * @returns {*}
 */
DisplayObject.prototype.renderFilter = function (ctx, matrix, colorTransform, stage, cacheKey)
{
    var filters = this.getFilters();
    if (stage.clipMc || !filters || !filters.length) {
        return ctx;
    }

    cacheKey += "_" + this.getFilterKey(filters);
    var cacheStoreKey = "Filter_" + this.instanceId;

    var cache;
    if (this._filterCacheKey === cacheKey) {
        cache = this.$cacheStore.getCache(cacheStoreKey);
    }

    if (!cache) {
        var fLength = filters.length|0;
        var i = 0;
        cache = ctx;
        while (i < fLength) {
            var filter = filters[i];
            i = (i + 1)|0;

            cache = filter.render(cache, matrix, colorTransform, stage);
        }

        this._filterCacheKey = cacheKey;
        this.$cacheStore.setCache(cacheStoreKey, cache);
    }

    this.$cacheStore.destroy(ctx);

    return cache;
};

/**
 * @param ctx
 * @param cache
 * @param xMin
 * @param yMin
 * @param isFilter
 */
DisplayObject.prototype.renderBlend = function (ctx, cache, xMin, yMin, isFilter)
{
    var mode = this.getBlendMode();
    var operation = "source-over";
    var canvas    = cache.canvas;
    var width     = canvas.width;
    var height    = canvas.height;

    cache.setTransform(1, 0, 0, 1, 0, 0);

    switch (mode) {
        case "source-over":
            break;
        case "multiply":
            operation = "multiply";
            break;
        case "screen":
            operation = "screen";
            break;
        case "lighten":
            operation = "lighten";
            break;
        case "darken":
            operation = "darken";
            break;
        case "difference":
            operation = "difference";
            break;
        case "add":
            operation = "lighter";
            break;
        case "subtract":
            cache.globalCompositeOperation = "difference";
            cache.fillStyle = "rgb(255,255,255)";
            cache.fillRect(0, 0, width, height);
            cache.globalCompositeOperation = "darken";
            cache.fillStyle = "rgb(255,255,255)";
            cache.fillRect(0, 0, width, height);
            operation = "color-burn";
            break;
        case "invert":
            cache.globalCompositeOperation = "difference";
            cache.fillStyle = "rgb(255,255,255)";
            cache.fillRect(0, 0, width, height);
            cache.globalCompositeOperation = "lighter";
            cache.fillStyle = "rgb(255,255,255)";
            cache.fillRect(0, 0, width, height);
            operation = "difference";
            break;
        case "alpha":
            operation = "source-over";
            break;
        case "erase":
            operation = "destination-out";
            break;
        case "overlay":
            operation = "overlay";
            break;
        case "hardlight":
            operation = "hard-light";
            break;
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = operation;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(canvas, xMin, yMin, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-over";
    if (!isFilter) {
        this.$cacheStore.destroy(cache);
    }
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getOriginMatrix = function ()
{
    var controller = this.getController();
    return controller.getMatrix();
};

/**
 * @returns []
 */
DisplayObject.prototype.getMatrix = function ()
{
    return this._matrix || this.getOriginMatrix();
};

/**
 * @param matrix
 */
DisplayObject.prototype.setMatrix = function (matrix)
{
    this._matrix = matrix;
    this.setController(true, false, false, false);
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getOriginColorTransform = function ()
{
    var controller = this.getController();
    return controller.getColorTransform();
};

/**
 * @returns []
 */
DisplayObject.prototype.getColorTransform = function ()
{
    return this._colorTransform || this.getOriginColorTransform();
};

/**
 * @param colorTransform
 */
DisplayObject.prototype.setColorTransform = function (colorTransform)
{
    this._colorTransform = colorTransform;
    this.setController(false, true, false, false);
};

/**
 * @returns {string}
 */
DisplayObject.prototype.getOriginBlendMode = function ()
{
    var controller = this.getController();
    return controller.getBlendMode();
};

/**
 * @returns {string}
 */
DisplayObject.prototype.getBlendMode = function ()
{
    return this._blendMode || this.getOriginBlendMode();
};

/**
 * @param blendMode
 */
DisplayObject.prototype.setBlendMode = function (blendMode)
{
    var mode = this.getBlendName(blendMode);
    if (mode) {
        this._blendMode = mode;
        this.setController(false, false, false, true);
    }
};

/**
 * @returns {Array}
 */
DisplayObject.prototype.getOriginFilters = function ()
{
    var controller = this.getController();
    return controller.getFilters();
};

/**
 * @returns {Array}
 */
DisplayObject.prototype.getFilters = function ()
{
    return this._filters || this.getOriginFilters();
};

/**
 * @param filters
 */
DisplayObject.prototype.setFilters = function (filters)
{
    this._filterCacheKey = null;
    this._filters = filters;
    this.setController(false, false, true, false);
};

/**
 * @param isMatrix
 * @param isColorTransform
 * @param isFilters
 * @param isBlend
 */
DisplayObject.prototype.setController = function (isMatrix, isColorTransform, isFilters, isBlend)
{
    if (!isMatrix) {
        var _matrix = this._matrix;
        if (!_matrix) {
            _matrix      = this.getMatrix();
            this._matrix = this.cloneArray(_matrix);
        }
    }

    if (!isColorTransform) {
        var _colorTransform = this._colorTransform;
        if (!_colorTransform) {
            _colorTransform      = this.getColorTransform();
            this._colorTransform = this.cloneArray(_colorTransform);
        }
    }

    if (!isFilters) {
        var _filters = this._filters;
        if (!_filters) {
            _filters = this.getFilters();
            if (_filters === null) {
                _filters = [];
            }
            this._filters = _filters;
        }
    }

    if (!isBlend) {
        var _blendMode = this._blendMode;
        if (!_blendMode) {
            this._blendMode = this.getBlendMode();
        }
    }
};

/**
 * @returns {PlaceObject}
 */
DisplayObject.prototype.getController = function ()
{
    if (this.parentId === null) {
        return this.PlaceObject;
    }

    var parent = this.getParentSprite();
    if (!parent) {
        parent = this.getParent();
    }

    var frame = 0;
    if (parent.getClassName() === "MovieClip") {
        frame = parent.getCurrentFrame()|0;
    }

    var depth      = this.getLevel()|0;
    var instanceId = parent.instanceId|0;

    var stage = this.getParentStage();

    var placeObject = stage.getPlaceObject(instanceId, depth, frame);
    if (!placeObject) {
        stage = this.getLoadStage();
        if (stage) {
            placeObject = stage.getPlaceObject(instanceId, depth, frame);
        }
    }

    return placeObject || new PlaceObject();
};

/**
 * reset
 */
DisplayObject.prototype.reset = function ()
{
    this.active          = false;
    this.isMask          = false;
    this._matrix         = null;
    this._colorTransform = null;
    this._filters        = null;
    this._blendMode      = null;
    this._depth          = null;
    this.setVisible(true);
    this.setEnabled(true);
    this.setButtonStatus("up");

    if (this.getClassName() === "TextField") {
        if (this.inputActive) {
            this.inputActive    = false;
            this.input.onchange = null;

            var stage = this.getStage();

            var div = this.$document.getElementById(stage.getName());
            if (div) {
                var el = this.$document.getElementById(this.getTagName());
                if (el) {
                    try {
                        div.removeChild(el);
                    } catch (e) {

                    }
                }
            }
        }

        this.variables.text = this.initialText;
    }
};

/**
 * trace
 */
DisplayObject.prototype.trace = function ()
{
    var params = ["[trace]"];
    var length = arguments.length;
    var i = 0;
    while (i < length) {
        params[params.length] = arguments[i];
        i = (i+1)|0;
    }
    console.log.apply(window, params);
};