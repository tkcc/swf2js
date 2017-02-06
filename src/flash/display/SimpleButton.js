/**
 * @constructor
 */
var SimpleButton = function ()
{
    InteractiveObject.call(this);
    this._downState = new Sprite();
    this._hitState  = new Sprite();
    this._overState = new Sprite();
    this._upState   = new Sprite();
    this.actions    = [];
};

/**
 * extends
 * @type {InteractiveObject}
 */
SimpleButton.prototype = Object.create(InteractiveObject.prototype);
SimpleButton.prototype.constructor = SimpleButton;

/**
 * properties
 */
Object.defineProperties(SimpleButton.prototype, {
    downState: {
        get: function () {
            return this.getSprite("down");
        },
        set: function (sprite) {
            this.setSprite("down", sprite);
        }
    },
    hitState: {
        get: function () {
            return this.getSprite("hit");
        },
        set: function (sprite) {
            this.setSprite("hit", sprite);
        }
    },
    overState: {
        get: function () {
            return this.getSprite("over");
        },
        set: function (sprite) {
            this.setSprite("over", sprite);
        }
    },
    upState: {
        get: function () {
            return this.getSprite("up");
        },
        set: function (sprite) {
            this.setSprite("up", sprite);
        }
    }
});

/**
 * @returns {string}
 */
SimpleButton.prototype.getClassName = function ()
{
    return "SimpleButton";
};

/**
 *
 * @returns {Array|ActionScript|*|actions}
 */
SimpleButton.prototype.getActions = function ()
{
    return this.actions;
};

/**
 * @param actions
 */
SimpleButton.prototype.setActions = function (actions)
{
    this.actions = actions;
};

/**
 * @param status
 */
SimpleButton.prototype.setButtonStatus = function (status)
{
    if (this.getButtonStatus() !== status) {
        this.buttonReset(status);
    }
    this.buttonStatus = status;
};

/**
 * @param status
 * @returns {*}
 */
SimpleButton.prototype.getSprite = function (status)
{
    if (!status) {
        status = this.buttonStatus;
    }

    status += "State";
    return this["_" + status];
};

/**
 * @param status
 * @param sprite
 */
SimpleButton.prototype.setSprite = function (status, sprite)
{
    var stage = this.getStage();

    var level = 0;
    switch (status) {
        case "down":
            level = 1;
            break;
        case "hit":
            level = 2;
            break;
        case "over":
            level = 3;
            break;
        case "up":
            level = 4;
            break;
    }

    stage.setPlaceObject(new PlaceObject(), this.instanceId, level, 0);
    sprite.setParent(this);
    sprite.setLevel(level);
    sprite.setStage(stage);

    var container = sprite.getContainer();
    for (var depth in container) {
        if (!container.hasOwnProperty(depth)) {
            continue;
        }

        var instanceId = container[depth];
        var obj        = stage.getInstance(instanceId);
        obj.setParentSprite(sprite);
    }

    status += "State";
    this["_" + status] = sprite;
};

/**
 * @param matrix
 * @param status
 * @returns {{xMin: number, xMax: number, yMin: number, yMax: number}}
 */
SimpleButton.prototype.getBounds = function (matrix, status)
{
    var xMax = 0;
    var yMax = 0;
    var xMin = 0;
    var yMin = 0;

    var sprite = this.getSprite(status);
    var tags   = sprite.getContainer();
    var length = tags.length|0;
    if (length) {
        var stage = this.getStage();

        var no = this.$Number.MAX_VALUE;
        xMax   = -no;
        yMax   = -no;
        xMin   = no;
        yMin   = no;

        for (var depth in tags) {
            if (!tags.hasOwnProperty(depth)) {
                continue;
            }

            var instanceId = tags[depth]|0;
            var tag        = stage.getInstance(instanceId);
            if (!tag || tag.isClipDepth) {
                continue;
            }

            var matrix2 = (matrix) ? this.$multiplicationMatrix(matrix, tag.getMatrix()) : tag.getMatrix();
            var bounds  = tag.getBounds(matrix2, status);
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
 * @param status
 */
SimpleButton.prototype.buttonReset = function (status)
{
    var sprite    = this.getSprite();
    var container = sprite.getContainer();

    var nextSprite    = this.getSprite(status);
    var nextContainer = nextSprite.getContainer();

    var stage = this.getStage();
    for (var depth in container) {
        if (!container.hasOwnProperty(depth)) {
            continue;
        }

        var instanceId = container[depth]|0;
        if (depth in nextContainer && instanceId === nextContainer[depth]) {
            continue;
        }

        var instance = stage.getInstance(instanceId);
        if (!instance) {
            continue;
        }

        instance.reset();
    }
};

/**
 * @param matrix
 * @param stage
 * @param visible
 * @param mask
 */
SimpleButton.prototype.setHitRange = function (matrix, stage, visible, mask)
{
    var isVisible = this.$min(this.getVisible(), visible)|0;
    if (!this.clipDepth && this.getEnabled() && isVisible === 1) {
        var buttonHits = stage.buttonHits;

        // enter
        if (this.$isTouch) {
            var actions = this.getActions();

            var aLen = actions.length|0;
            if (aLen) {
                var idx = 0;
                while (idx < aLen) {
                    var cond = actions[idx];
                    if (cond.CondKeyPress === 13) {
                        buttonHits[buttonHits.length] = {
                            button:       this,
                            xMin:         0,
                            xMax:         stage.getWidth()|0,
                            yMin:         0,
                            yMax:         stage.getHeight()|0,
                            CondKeyPress: cond.CondKeyPress|0,
                            parent:       this.getParent()
                        };
                    }

                    idx = (idx + 1)|0;
                }
            }
        }

        var status  = "hit";
        var hitTest = this.getSprite(status);
        var hitTags = hitTest.getContainer();
        var length  = hitTags.length|0;
        if (length === 0) {
            status = "up";
            hitTest = this.getSprite(status);
            hitTags = hitTest.getContainer();
        }

        length = hitTags.length|0;
        if (length) {
            var m2     = this.$multiplicationMatrix(matrix, this.getMatrix());
            var bounds = this.getBounds(m2, status);
            if (bounds) {
                buttonHits[buttonHits.length] = {
                    button:       this,
                    xMin:         +bounds.xMin,
                    xMax:         +bounds.xMax,
                    yMin:         +bounds.yMin,
                    yMax:         +bounds.yMax,
                    CondKeyPress: 0,
                    parent:       this.getParent(),
                    matrix:       this.cloneArray(matrix)
                };
            }
        }
    }
};

/**
 * @param ctx
 * @param matrix
 * @param colorTransform
 * @param stage
 * @param visible
 */
SimpleButton.prototype.render = function (ctx, matrix, colorTransform, stage, visible)
{
    // return "";

    // colorTransform
    var rColorTransform = this.$multiplicationColor(colorTransform, this.getColorTransform());

    // matrix
    var m2 = this.$multiplicationMatrix(matrix, this.getMatrix());

    // pre render
    var isVisible = this.$min(this.getVisible(), visible);
    var obj       = this.preRender(ctx, m2, rColorTransform, stage, isVisible);

    // render
    var sprite  = this.getSprite();
    var rMatrix = this.$multiplicationMatrix(obj.preMatrix, sprite.getMatrix());
    var rColorTransform2 = this.$multiplicationColor(rColorTransform, sprite.getColorTransform());
    isVisible = this.$min(sprite.getVisible(), visible);

    var cacheKey = obj.cacheKey;
    cacheKey    += sprite.render(obj.preCtx, rMatrix, rColorTransform2, stage, isVisible);

    // post render
    if (obj.isFilter || obj.isBlend) {
        obj.cacheKey = cacheKey;
        this.postRender(ctx, matrix, colorTransform, stage, obj);
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
SimpleButton.prototype.renderHitTest = function (ctx, matrix, stage, x, y)
{
    var sprite = this.getSprite("hit");
    var tags   = sprite.getContainer();
    var length = tags.length|0;
    if (!length) {
        return false;
    }

    var m2 = this.$multiplicationMatrix(matrix, this.getMatrix());
    var m3 = this.$multiplicationMatrix(m2, sprite.getMatrix());

    if (length) {
        var loadStage = this.getStage();
        for (var depth in tags) {
            if (!tags.hasOwnProperty(depth)) {
                continue;
            }

            var instanceId = tags[depth]|0;
            var tag        = loadStage.getInstance(instanceId);
            if (!tag) {
                continue;
            }

            var hit = tag.renderHitTest(ctx, m3, stage, x, y);
            if (hit) {
                return hit;
            }
        }
    }

    return false;
};

/**
 * @param ctx
 * @param matrix
 * @param stage
 * @param x
 * @param y
 * @returns {*}
 */
SimpleButton.prototype.hitCheck = function (ctx, matrix, stage, x, y)
{
    var sprite = this.getSprite("hit");
    var tags   = sprite.getContainer();
    var length = tags.length;
    if (!length) {
        return false;
    }

    var m2 = this.$multiplicationMatrix(matrix, this.getMatrix());
    var m3 = this.$multiplicationMatrix(m2, sprite.getMatrix());

    var hitObj = false;
    var hit    = false;
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
                    hit = instance.renderHitTest(ctx, m3, stage, x, y);
                    break;
                default:
                    hit = instance.hitCheck(ctx, m3, stage, x, y);
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
                            parent : this.getParent(),
                            button : this
                        };
                    }
                }

                tags.reverse();

                return hitObj;
            }
        }
        tags.reverse();
    }

    return false;
};

/**
 * @see MovieClip.addActions
 */
SimpleButton.prototype.addActions = function (stage)
{
    var sprite = this.getSprite();
    var tags   = sprite.getContainer();
    var length = tags.length|0;
    if (length) {
        var myStage = this.getStage();
        for (var depth in tags) {
            if (!tags.hasOwnProperty(depth)) {
                continue;
            }

            var instanceId = tags[depth];
            var tag = myStage.getInstance(instanceId);
            if (tag === undefined) {
                continue;
            }

            tag.addActions(stage);
        }
    }
};

/**
 * Dummy
 * @returns {undefined}
 */
SimpleButton.prototype.getTags   = function () { return undefined; };
SimpleButton.prototype.initFrame = function () {};