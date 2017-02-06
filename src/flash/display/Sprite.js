/**
 * @constructor
 */
var Sprite = function ()
{
    DisplayObjectContainer.call(this);

    this.touchPointID    = 0;
    this._buttonMode     = false;
    this._useHandCursor  = false;
    this._dropTarget     = null;
    this._hitArea        = null;
    this._graphics       = new Graphics();
    this._soundTransform = new SoundTransform();
};

/**
 * extends
 * @type {DisplayObjectContainer}
 */
Sprite.prototype = Object.create(DisplayObjectContainer.prototype);
Sprite.prototype.constructor = Sprite;

/**
 * properties
 */
Object.defineProperties(Sprite.prototype, {
    graphics: {
        get: function () {
            return this.getGraphics();
        },
        set: function () {
        }
    },
    hitArea: {
        get: function () {
            return this.getHitArea();
        },
        set: function (sprite) {
            this.setHitArea(sprite);
        }
    },
    buttonMode: {
        get: function () {
            return this.getButtonMode();
        },
        set: function (buttonMode) {
            this.setButtonMode(buttonMode);
        }
    },
    soundTransform: {
        get: function () {
            return this._soundTransform;
        },
        set: function () {
        }
    },
    useHandCursor: {
        get: function () {
            return this.getUseHandCursor();
        },
        set: function (useHandCursor) {
            this.setUseHandCursor(useHandCursor);
        }
    },
    dropTarget: {
        get: function () {
            return this.getDropTarget();
        },
        set: function () {
            this.setDropTarget();
        }
    }
});

/**
 * @returns {string}
 */
Sprite.prototype.getClassName = function ()
{
    return "Sprite";
};

/**
 * @returns {Graphics}
 */
Sprite.prototype.getGraphics = function ()
{
    return this._graphics;
};

/**
 * @returns {DisplayObject}
 */
Sprite.prototype.getHitArea = function ()
{
    return this._hitArea;
};

/**
 * @param displayObject
 */
Sprite.prototype.setHitArea = function (displayObject)
{
    this._hitArea = displayObject;
};

/**
 * @returns {boolean}
 */
Sprite.prototype.getUseHandCursor = function ()
{
    return this._useHandCursor;
};

/**
 * @param useHandCursor
 */
Sprite.prototype.setUseHandCursor = function (useHandCursor)
{
    this._useHandCursor = useHandCursor;
};

/**
 * startTouchDrag
 */
Sprite.prototype.startTouchDrag = function (touchPointID, lock, bounds)
{
    this.startDrag(lock);
};

/**
 * @param touchPointID
 */
Sprite.prototype.stopTouchDrag = function (touchPointID)
{
    this.stopDrag();
};

/**
 * startDrag
 */
Sprite.prototype.startDrag = function ()
{
    var args   = arguments;
    var lock   = args[0];
    var left   = args[1];
    var top    = args[2];
    var right  = args[3];
    var bottom = args[4];

    var _root  = this.getDisplayObject("_root");
    var stage  = _root.getStage();
    var startX = 0;
    var startY = 0;
    if (!lock) {
        startX = this.getXMouse();
        startY = this.getYMouse();
    }

    stage.dragMc    = this;
    stage.dragRules = {
        startX: startX,
        startY: startY,
        left:   left,
        top:    top,
        right:  right,
        bottom: bottom
    };

    this.setDropTarget();
};

/**
 * stopDrag
 */
Sprite.prototype.stopDrag = function ()
{
    var _root = this.getDisplayObject("_root");
    var stage = _root.getStage();

    stage.dragMc    = null;
    stage.dragRules = null;

    this.setDropTarget();
};

/**
 * executeDrag
 */
Sprite.prototype.executeDrag = function ()
{
    var _root = this.getDisplayObject("_root");
    var stage = _root.getStage();

    var dragRules = stage.dragRules;

    var startX = dragRules.startX;
    var startY = dragRules.startY;

    var left   = dragRules.left;
    var top    = dragRules.top;
    var right  = dragRules.right;
    var bottom = dragRules.bottom;

    var x = this.getX();
    var y = this.getY();

    var xmouse = this.getXMouse();
    var ymouse = this.getYMouse();

    xmouse = xmouse - startX;
    ymouse = ymouse - startY;

    var moveX = x + xmouse;
    var moveY = y + ymouse;

    if (left === null || left === undefined) {
        this.setX(moveX);
        this.setY(moveY);
    } else {
        left   = +left;
        top    = +top;
        right  = +right;
        bottom = +bottom;

        // x
        if (right < moveX) {
            this.setX(right);
        } else if (moveX < left) {
            this.setX(left);
        } else {
            this.setX(moveX);
        }

        // y
        if (bottom < moveY) {
            this.setY(bottom);
        } else if (moveY < top) {
            this.setY(top);
        } else {
            this.setY(moveY);
        }
    }
};

/**
 *
 * @returns {null|*}
 */
Sprite.prototype.getDropTarget = function ()
{
    return this._droptarget;
};

/**
 * setDropTarget
 */
Sprite.prototype.setDropTarget = function ()
{
    this._droptarget = null;

    var _root  = this.getDisplayObject("_root");
    var stage  = _root.getStage();
    var parent = this.getParent();
    if (!parent) {
        parent = stage.getParent();
    }

    var x = _root.getXMouse();
    var y = _root.getYMouse();

    var tags = parent.getTags();
    for (var depth in tags) {
        if (!tags.hasOwnProperty(depth)) {
            continue;
        }

        var id = tags[depth];
        if (id === this.instanceId) {
            continue;
        }

        var instance = stage.getInstance(id);
        if (!(instance instanceof MovieClip)) {
            continue;
        }

        var hit = instance.hitTest(x, y);
        if (hit) {
            this._droptarget = instance;
            break;
        }
    }
};

/**
 * @returns {Array}
 */
Sprite.prototype.getTags = function ()
{
    return this.getContainer();
};

/**
 * @param ctx
 * @param matrix
 * @param colorTransform
 * @param stage
 * @param visible
 */
Sprite.prototype.render = function (ctx, matrix, colorTransform, stage, visible)
{
    if (this.removeFlag) {
        return "";
    }

    this.isLoad = true;
    stage.doneTags.unshift(this);

    // sound
    if (this.getClassName() === "MovieClip" && !this.soundStopFlag) {
        var sounds = this.getSounds();
        if (sounds !== undefined) {
            var sLen = sounds.length|0;
            for (var idx = 0; idx < sLen; idx++) {
                if (!(idx in sounds)) {
                    continue;
                }

                var sound = sounds[idx];
                this.startSound(sound);
            }
        }
    }

    // matrix & colorTransform
    var rMatrix         = this.$multiplicationMatrix(matrix, this.getMatrix());
    var rColorTransform = this.$multiplicationColor(colorTransform, this.getColorTransform());
    var isVisible       = this.$min(this.getVisible(), visible)|0;

    // pre render
    var obj       = this.preRender(ctx, rMatrix, rColorTransform, stage, visible);
    var cacheKey  = obj.cacheKey;
    var preCtx    = obj.preCtx;
    var preMatrix = obj.preMatrix;

    // render
    var clips     = [];
    var container = this.getTags();
    var length    = container.length|0;
    if (length) {
        var myStage = this.getStage();
        for (var depth in container) {
            if (!container.hasOwnProperty(depth)) {
                continue;
            }

            var instanceId = container[depth]|0;
            var instance   = myStage.getInstance(instanceId);
            if (!instance) {
                continue;
            }

            // mask end
            var cLen = clips.length|0;
            var cIdx = 0;
            while (cIdx < cLen) {
                var cDepth = clips[cIdx];
                if (depth > cDepth) {
                    clips.splice(cIdx, 1);
                    ctx.restore();
                    break;
                }
                cIdx = (cIdx + 1)|0;
            }

            // mask start
            if (instance.isClipDepth) {
                ctx.save();
                ctx.beginPath();

                clips[clips.length] = instance.clipDepth|0;
                if (instance.getClassName() === "MovieClip") {
                    stage.isClipDepth = true;
                }
            }

            if (isVisible === 1) {
                instance.setHitRange(rMatrix, stage, visible, cLen);
            }

            // mask
            if (instance.isMask) {
                continue;
            }

            if (instance.isClipDepth) {
                switch (0) {
                    case preMatrix[0]:
                        preMatrix[0] = 0.00000000000001;
                        break;
                    case preMatrix[3]:
                        preMatrix[3] = 0.00000000000001;
                        break;
                }
            }

            cacheKey = cacheKey + instance.render(preCtx, preMatrix, rColorTransform, stage, isVisible);
            if (stage.isClipDepth) {
                preCtx.clip();
                stage.isClipDepth = false;
            }
        }
    }

    if (clips.length || this.getMask()) {
        ctx.restore();
    }

    // post render
    if (obj.isFilter || obj.isBlend) {
        obj.cacheKey = cacheKey;
        this.postRender(ctx, rMatrix, rColorTransform, stage, obj);
    }

    return cacheKey;
};

/**
 * initFrame
 */
Sprite.prototype.initFrame = function () {};

/**
 * @param stage
 * @param clipEvent
 */
Sprite.prototype.putFrame = function (stage, clipEvent)
{
    this.active = true;
    this.dispatchEvent(clipEvent, stage);
};

/**
 * @param stage
 */
Sprite.prototype.addActions = function (stage)
{
    var myStage = this.getStage();
    var tags    = this.getTags();
    var length  = tags.length;
    if (length) {
        for (var depth in tags) {
            if (!tags.hasOwnProperty(depth)) {
                continue;
            }

            var instanceId = tags[depth];
            var instance   = myStage.getInstance(instanceId);
            if (!instance) {
                continue;
            }

            instance.addActions(stage);
        }
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
Sprite.prototype.renderHitTest = function (ctx, matrix, stage, x, y)
{
    var loadStage = this.getStage();
    var tags      = this.getTags();
    var length    = tags.length;
    var hit       = false;
    var rMatrix   = this.$multiplicationMatrix(matrix, this.getMatrix());

    if (length) {
        for (var depth in tags) {
            if (!tags.hasOwnProperty(depth)) {
                continue;
            }

            var instanceId = tags[depth];
            var obj        = loadStage.getInstance(instanceId);

            hit = obj.renderHitTest(ctx, rMatrix, stage, x, y);
            if (hit) {
                return hit;
            }
        }
    }

    var graphics = this.graphics;
    if (graphics.isDraw) {
        return graphics.renderHitTest(ctx, rMatrix, stage, x, y);
    }

    return hit;
};

/**
 * @param mc
 * @returns {{xMin: *, xMax: number, yMin: *, yMax: number}}
 */
Sprite.prototype.getRect = function (mc)
{
    if (!mc) {
        mc = this;
    }

    var bounds    = mc.getBounds(mc.getOriginMatrix());
    var graphics  = this.graphics;
    var twips     = 20;
    var maxWidth  = graphics.maxWidth / twips;
    var halfWidth = maxWidth / 2;

    var xMin = bounds.xMin + halfWidth;
    var xMax = bounds.xMax - halfWidth;
    var yMin = bounds.yMin + halfWidth;
    var yMax = bounds.yMax - halfWidth;

    return {
        xMin: xMin,
        xMax: xMax,
        yMin: yMin,
        yMax: yMax
    };
};

/**
 * @param matrix
 * @returns {{}}
 */
Sprite.prototype.getBounds = function (matrix)
{
    if (matrix instanceof MovieClip) {
        return matrix.getBounds(matrix.getOriginMatrix());
    }

    var tags = this.getTags();
    var xMax = 0;
    var yMax = 0;
    var xMin = 0;
    var yMin = 0;

    var graphics = this.graphics;
    var isDraw = graphics.isDraw;
    if (isDraw) {
        var maxWidth  = graphics.maxWidth;
        var halfWidth = maxWidth / 2;
        var gBounds   = this.boundsMatrix(graphics.bounds, matrix);
        var twips = (matrix) ? 20 : 1;
        xMin = +((gBounds.xMin - halfWidth) / twips);
        xMax = +((gBounds.xMax + halfWidth) / twips);
        yMin = +((gBounds.yMin - halfWidth) / twips);
        yMax = +((gBounds.yMax + halfWidth) / twips);
    }

    var length = tags.length|0;
    var stage  = this.getStage();
    if (length) {
        if (!isDraw) {
            var no = this.$Number.MAX_VALUE;
            xMax = -no;
            yMax = -no;
            xMin = no;
            yMin = no;
        }

        for (var depth in tags) {
            if (!tags.hasOwnProperty(depth)) {
                continue;
            }

            var instanceId = tags[depth]|0;
            var tag = stage.getInstance(instanceId);
            if (!tag || tag.isClipDepth) {
                continue;
            }

            var matrix2 = (matrix) ? this.$multiplicationMatrix(matrix, tag.getMatrix()) : tag.getMatrix();
            var bounds  = tag.getBounds(matrix2);
            if (!bounds) {
                continue;
            }

            xMin = +this.$min(xMin, bounds.xMin);
            xMax = +this.$max(xMax, bounds.xMax);
            yMin = +this.$min(yMin, bounds.yMin);
            yMax = +this.$max(yMax, bounds.yMax);
        }
    }

    return {
        xMin: xMin,
        xMax: xMax,
        yMin: yMin,
        yMax: yMax
    };
};

/**
 * @param ctx
 * @param matrix
 * @param stage
 * @param x
 * @param y
 * @returns {*}
 */
Sprite.prototype.hitCheck = function (ctx, matrix, stage, x, y)
{
    if (!this.getEnabled() ||
        !this.getVisible() ||
        !this.getMouseEnabled()
    ) {
        return false;
    }

    var hitObj;
    var hit = false;
    var matrix2 = this.$multiplicationMatrix(matrix, this.getMatrix());

    var tags   = this.getTags();
    var length = 0 | tags.length;
    if (length) {
        var loadStage = this.getStage();

        tags.reverse();
        for (var depth in tags) {
            if (!tags.hasOwnProperty(depth)) {
                continue;
            }

            var tagId    = tags[depth];
            var instance = loadStage.getInstance(tagId);

            switch (instance.getClassName()) {
                case "Shape":
                case "StaticText":
                case "TextField":
                    hit = instance.renderHitTest(ctx, matrix2, stage, x, y);
                    break;
                default:
                    hit = instance.hitCheck(ctx, matrix2, stage, x, y);
                    break;
            }

            if (hit) {
                hitObj = hit;
                if (typeof hit !== "object") {
                    var events = this.events;
                    if (events.press !== undefined ||
                        events.release !== undefined ||
                        events.releaseOutside !== undefined ||
                        events.rollOver !== undefined ||
                        events.rollOut !== undefined ||
                        events.dragOver !== undefined ||
                        events.dragOut !== undefined
                    ) {
                        stage.isHit = hit;
                        hitObj = {
                            parent : this
                        };
                    }
                }

                tags.reverse();

                return hitObj;
            }
        }

        tags.reverse();
    }

    var graphics = this.graphics;
    if (graphics.isDraw) {
        hit = graphics.renderHitTest(ctx, matrix2, stage, x, y);
        if (hit) {
            hitObj = {
                parent : this
            };
        }
    }

    return hitObj;
};