/**
 * @constructor
 */
var DisplayObjectContainer = function ()
{
    InteractiveObject.call(this);

    this._mouseChildren = true;
    this._tabChildren   = true;
    this._textSnapshot  = new TextSnapshot();
    this._numChildren   = 0;
    this.soundId        = null;
    this.soundInfo      = null;
    this.container      = [];

    if (this.getClassName() === "MovieClip") {
        var totalFrames = (this.getTotalFrames() + 1)|0;
        var frame = 1;
        while (frame < totalFrames) {
            this.container[frame] = [];
            frame = (frame + 1)|0;
        }
    }

    this.instances = [];
    this.isSwap    = false;
};

/**
 * extends
 * @type {InteractiveObject}
 */
DisplayObjectContainer.prototype = Object.create(InteractiveObject.prototype);
DisplayObjectContainer.prototype.constructor = DisplayObjectContainer;

/**
 * properties
 */
Object.defineProperties(DisplayObjectContainer.prototype,
    {
        mouseChildren: {
            get: function () {
                return this.getMouseChildren();
            },
            set: function (mouseChildren) {
                this.setMouseChildren(mouseChildren);
            }
        },
        textSnapshot: {
            get: function () {
                return this.getTextSnapshot();
            },
            set: function () {
            }
        },
        numChildren: {
            get: function () {
                return this.getNumChildren();
            },
            set: function () {
            }
        },
        tabChildren: {
            get: function () {
                return this.getTabChildren();
            },
            set: function (tabChildren) {
                this.setTabChildren(tabChildren);
            }
        }
    });

/**
 * @returns {boolean}
 */
DisplayObjectContainer.prototype.getMouseChildren = function ()
{
    return this._mouseChildren;
};

/**
 * @param mouseChildren
 */
DisplayObjectContainer.prototype.setMouseChildren = function (mouseChildren)
{
    this._mouseChildren = mouseChildren;
};

/**
 * @returns {TextSnapshot}
 */
DisplayObjectContainer.prototype.getTextSnapshot = function ()
{
    return this._textSnapshot;
};

/**
 * @returns {number}
 */
DisplayObjectContainer.prototype.getNumChildren = function ()
{
    return this._numChildren;
};

/**
 * @returns {boolean}
 */
DisplayObjectContainer.prototype.getTabChildren = function ()
{
    return this._tabChildren;
};

/**
 * @param tabChildren
 */
DisplayObjectContainer.prototype.setTabChildren = function (tabChildren)
{
    this._tabChildren = tabChildren;
};

/**
 * @returns {Array}
 */
DisplayObjectContainer.prototype.getContainer = function ()
{
    return this.container;
};

/**
 * @returns {Array}
 */
DisplayObjectContainer.prototype.getInstances = function ()
{
    return this.instances;
};

/**
 * @param instance
 */
DisplayObjectContainer.prototype.setInstance = function (instance)
{
    var instances  = this.getInstances();
    var instanceId = instance.instanceId|0;
    if (!(instanceId in instances)) {
        instances[instanceId] = 1;
    }
};

/**
 * @param instance
 */
DisplayObjectContainer.prototype.deleteInstance = function (instance)
{
    delete this.instances[instance.instanceId|0];
};

/**
 * @param child
 * @param depth
 * @returns {DisplayObject}
 */
DisplayObjectContainer.prototype.addChild = function (child, depth)
{
    if (child instanceof DisplayObject) {

        if (depth === undefined) {
            depth = this._numChildren;
        }

        var stage = this.getStage();
        child.setParent(this);
        child.setStage(stage);
        child.setLevel(depth);

        var container   = this.getContainer();
        var frame       = 1;
        var placeObject = new PlaceObject();
        var instanceId  = this.instanceId;
        if (this.getClassName() === "MovieClip") {
            var totalFrames = (this.getTotalFrames() + 1)|0;
            while (frame < totalFrames) {
                if (!(frame in container)) {
                    container[frame] = [];
                }

                stage.setPlaceObject(placeObject, instanceId, depth, frame);
                container[frame][depth] = child.instanceId;

                frame = (frame + 1)|0;
            }
        } else {
            stage.setPlaceObject(placeObject, instanceId, depth, frame);
            container[depth] = child.instanceId;
        }

        this._numChildren = (this._numChildren + 1)|0;
    }

    return child;
};

/**
 * @param child
 * @param depth
 * @returns {DisplayObject}
 */
DisplayObjectContainer.prototype.addChildAt = function (child, depth)
{
    return this.addChild(child, depth);
};

/**
 *
 * @param depth
 * @returns {DisplayObject}
 */
DisplayObjectContainer.prototype.getChildAt = function (depth)
{
    var container = this.getContainer();
    var children  = container;

    if (16384 > depth) {
        depth = (depth + 16384)|0;
    }

    if (this.getClassName() === "MovieClip") {
        var frame = this.getCurrentFrame();
        children  = container[frame];
    }

    return children[depth];
};

/**
 * @param name
 * @return {DisplayObject}
 */
DisplayObjectContainer.prototype.getChildByName = function (name)
{
    var container = this.getContainer();
    var children  = container;
    if (this.getClassName() === "MovieClip") {
        var frame = this.getCurrentFrame();
        children  = container[frame];
    }

    var obj;
    for (var depth in children) {
        if (!children.hasOwnProperty(depth)) {
            continue;
        }

        var child = children[depth];
        if (child.getName() !== name) {
            continue;
        }
        obj = child;

        break;
    }
    return obj;
};

/**
 * @param child
 * @returns {number}
 */
DisplayObjectContainer.prototype.getChildIndex = function (child)
{
    var index;
    if (child instanceof DisplayObject) {
        index = child.getLevel() - 16384;
    }
    return index;
};

/**
 * @param child
 * @return {DisplayObject}
 */
DisplayObjectContainer.prototype.removeChild = function (child)
{
    var depth, obj;
    var container = this.getContainer();

    if (this.getClassName() === "MovieClip") {
        var totalFrames = (this.getTotalFrames() + 1)|0;

        var frame = 1;
        while (frame < totalFrames) {
            if (!(frame in container)) {
                frame = (frame + 1)|0;
                continue;
            }

            var children = container[frame];
            for (depth in children) {
                if (!children.hasOwnProperty(depth)) {
                    frame = (frame + 1)|0;
                    continue;
                }

                var instanceId = children[depth];
                if (instanceId !== child.instanceId) {
                    frame = (frame + 1)|0;
                    continue;
                }

                delete container[frame][depth];
                break;
            }

            frame = (frame + 1)|0;
        }
    } else {
        for (depth in container) {
            if (!container.hasOwnProperty(depth)) {
                continue;
            }

            obj = container[depth];
            if (obj.instanceId !== child.instanceId) {
                continue;
            }

            delete container[depth];
            break;
        }
    }

    if (child) {
        this.deleteInstance(child);
        this._numChildren = (this._numChildren - 1)|0;
    }

    return child;
};

/**
 * @param depth
 * @returns {*}
 */
DisplayObjectContainer.prototype.removeChildAt = function (depth)
{
    var container = this.getContainer();
    var children  = container;

    if (16384 > depth) {
        depth = (depth + 16384)|0;
    }

    var child;
    if (this.getClassName() === "MovieClip") {
        var totalFrames = this.getTotalFrames();
        var frame = 1;

        while (frame < totalFrames) {
            if (!(frame in container)) {
                frame = (frame  + 1)|0;
                continue;
            }

            children = container[frame];
            if (!(depth in children)) {
                frame = (frame  + 1)|0;
                continue;
            }

            child = children[depth];
            delete container[frame][depth];

            frame = (frame  + 1)|0;
        }
    } else {
        child = children[depth];
        delete children[depth];
    }

    if (child) {
        this._numChildren = (this._numChildren - 1)|0;
    }

    return child;
};

/**
 * @param depth
 * @param obj
 */
DisplayObjectContainer.prototype.addTag = function (depth, obj)
{
    this.container[depth] = obj.instanceId;
    this._numChildren     = (this._numChildren + 1)|0;
};

/**
 * startSound
 */
DisplayObjectContainer.prototype.startSound = function ()
{
    var soundId = this.soundId;
    if (soundId) {
        var stage = this.getStage();
        var sound = stage.sounds[soundId];
        if (sound) {
            var audio = this.$document.createElement("audio");
            audio.onload = function ()
            {
                this.load();
                this.preload = "auto";
                this.autoplay = false;
                this.loop = false;
            };
            audio.src = sound.base64;

            this.$startSound(audio, this.soundInfo);
        }
    }
};

/**
 * reset
 */
DisplayObjectContainer.prototype.reset = function ()
{
    var container = this.container;
    var length    = container.length;
    if (length) {
        var stage = this.getStage();
        for (var depth in container) {
            if (!container.hasOwnProperty(depth)) {
                continue;
            }

            var instanceId = container[depth];
            var obj        = stage.getInstance(instanceId);

            obj.reset();
        }
    }

    this.isMask          = false;
    this._depth          = null;
    this._matrix         = null;
    this._colorTransform = null;
    this._filters        = null;
    this._blendMode      = null;
    this.mouseEnabled    = true;
};

/**
 * @param matrix
 * @param stage
 * @param visible
 * @param mask
 */
DisplayObjectContainer.prototype.setHitRange = function (matrix, stage, visible, mask)
{
    var isVisible = this.$min(this.getVisible(), visible)|0;

    if (this.getEnabled() && isVisible === 1) {
        var buttonHits = stage.buttonHits;
        var variables  = this.variables;

        var events = this.events;
        if (events.press !== undefined ||
            events.release !== undefined ||
            events.releaseOutside !== undefined ||
            events.rollOver !== undefined ||
            events.rollOut !== undefined ||
            events.dragOver !== undefined ||
            events.dragOut !== undefined ||
            variables.onPress !== undefined ||
            variables.onRelease !== undefined ||
            variables.onRollOver !== undefined ||
            variables.onReleaseOutside !== undefined ||
            variables.onRollOut !== undefined ||
            variables.onDragOver !== undefined ||
            variables.onDragOut !== undefined
        ) {
            var rMatrix = this.$multiplicationMatrix(matrix, this.getMatrix());
            var bounds  = this.getBounds(rMatrix);
            buttonHits[buttonHits.length] = {
                xMax:   +bounds.xMax,
                xMin:   +bounds.xMin,
                yMax:   +bounds.yMax,
                yMin:   +bounds.yMin,
                parent: this,
                matrix: this.cloneArray(matrix)
            };
        }
    }
};

/**
 *
 * @param name
 * @param depth
 * @returns {MovieClip}
 */
DisplayObjectContainer.prototype.createMovieClip = function (name, depth)
{
    var movieClip = new MovieClip();
    movieClip     = this.addChild(movieClip, depth);
    if (name) {
        movieClip.setName(name);
    }
    return movieClip;
};

/**
 * @param name
 * @param depth
 * @returns {Sprite}
 */
DisplayObjectContainer.prototype.createSprite = function (name, depth)
{
    var sprite = new Sprite();
    sprite     = this.addChild(sprite, depth);
    if (name) {
        sprite.setName(name);
    }
    return sprite;
};

/**
 * @param name
 * @param depth
 * @returns {SimpleButton}
 */
DisplayObjectContainer.prototype.createButton = function (name, depth)
{
    var button = new SimpleButton();
    button     = this.addChild(button, depth);
    if (name) {
        button.setName(name);
    }
    return button;
};

/**
 * @param name
 * @param width
 * @param height
 * @param depth
 * @returns {TextField}
 */
DisplayObjectContainer.prototype.createText = function (name, width, height, depth)
{
    var textField = new TextField(name, depth, width, height);
    textField     = this.addChild(textField, depth);
    textField.setInitParams();
    if (name) {
        textField.setName(name);
    }
    textField.size = 12;
    return textField;
};

/**
 * @returns {Shape}
 */
DisplayObjectContainer.prototype.createShape = function (depth)
{
    var shape = new Shape();
    this.addChild(shape, depth);
    return shape;
};