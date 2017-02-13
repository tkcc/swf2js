/**
 * @constructor
 */
var EventDispatcher = function ()
{
    this.events = {};
    this.isLoad = false;
    this.active = false;
};

/**
 * util
 */
EventDispatcher.prototype = Object.create(OriginalObject.prototype);
EventDispatcher.prototype.constructor = EventDispatcher;

/**
 * properties
 */
Object.defineProperties(EventDispatcher.prototype, {
    onEnterFrame: {
        get: function () {
            return this.getOnEvent("onEnterFrame");
        },
        set: function (onEnterFrame) {
            this.setOnEvent("onEnterFrame", onEnterFrame);
        }
    },
    onPress: {
        get: function () {
            return this.getOnEvent("onPress");
        },
        set: function (onPress) {
            this.setOnEvent("onPress", onPress);
        }
    },
    onRelease: {
        get: function () {
            return this.getOnEvent("onRelease");
        },
        set: function (onRelease) {
            this.setOnEvent("onRelease", onRelease);
        }
    },
    onReleaseOutside: {
        get: function () {
            return this.getOnEvent("onReleaseOutside");
        },
        set: function (onReleaseOutside) {
            this.setOnEvent("onReleaseOutside", onReleaseOutside);
        }
    },
    onRollOver: {
        get: function () {
            return this.getOnEvent("onRollOver");
        },
        set: function (onRollOver) {
            this.setOnEvent("onRollOver", onRollOver);
        }
    },
    onRollOut: {
        get: function () {
            return this.getOnEvent("onRollOut");
        },
        set: function (onRollOut) {
            this.setOnEvent("onRollOut", onRollOut);
        }
    },
    onData: {
        get: function () {
            return this.getOnEvent("onData");
        },
        set: function (onData) {
            this.setOnEvent("onData", onData);
        }
    },
    onMouseDown: {
        get: function () {
            return this.getOnEvent("onMouseDown");
        },
        set: function (onMouseDown) {
            this.setOnEvent("onMouseDown", onMouseDown);
        }
    },
    onMouseUp: {
        get: function () {
            return this.getOnEvent("onMouseUp");
        },
        set: function (onMouseUp) {
            this.setOnEvent("onMouseUp", onMouseUp);
        }
    },
    onMouseMove: {
        get: function () {
            return this.getOnEvent("onMouseMove");
        },
        set: function (onMouseMove) {
            this.setOnEvent("onMouseMove", onMouseMove);
        }
    },
    onDragOut: {
        get: function () {
            return this.getOnEvent("onDragOut");
        },
        set: function (onDragOut) {
            this.setOnEvent("onDragOut", onDragOut);
        }
    },
    onDragOver: {
        get: function () {
            return this.getOnEvent("onDragOver");
        },
        set: function (onDragOver) {
            this.setOnEvent("onDragOver", onDragOver);
        }
    },
    onKeyDown: {
        get: function () {
            return this.getOnEvent("onKeyDown");
        },
        set: function (onKeyDown) {
            this.setOnEvent("onKeyDown", onKeyDown);
        }
    },
    onKeyUp: {
        get: function () {
            return this.getOnEvent("onKeyUp");
        },
        set: function (onKeyUp) {
            this.setOnEvent("onKeyUp", onKeyUp);
        }
    },
    onLoad: {
        get: function () {
            return this.getOnEvent("onLoad");
        },
        set: function (onLoad) {
            this.setOnEvent("onLoad", onLoad);
        }
    },
    onUnLoad: {
        get: function () {
            return this.getOnEvent("onUnLoad");
        },
        set: function (onUnLoad) {
            this.setOnEvent("onUnLoad", onUnLoad);
        }
    }
});

/**
 * @param type
 * @returns {*}
 */
EventDispatcher.prototype.getOnEvent = function (type)
{
    return this.variables[type];
};

/**
 * @param type
 * @param as
 */
EventDispatcher.prototype.setOnEvent = function (type, as)
{
    this.variables[type] = as;
};

/**
 * @param type
 * @param listener
 * @param useCapture
 * @param priority
 * @param useWeakReference
 */
EventDispatcher.prototype.addEventListener = function (type, listener, useCapture, priority, useWeakReference)
{
    var events = this.events;
    if (!(type in events)) {
        events[type] = [];
    }

    var event = events[type];
    event[event.length] = listener;
};

/**
 * @param event
 * @param stage
 */
EventDispatcher.prototype.dispatchEvent = function (event, stage)
{
    var type = event.type;
    if (this.hasEventListener(type)) {
        var events   = this.events[type];
        event.target = this;
        this.setActionQueue(events, stage, [event]);
    }
};

/**
 * @param type
 * @returns {boolean}
 */
EventDispatcher.prototype.hasEventListener = function (type)
{
    return (type in this.events);
};

/**
 * @param type
 * @param listener
 * @param useCapture
 */
EventDispatcher.prototype.removeEventListener = function (type, listener, useCapture)
{
    if (this.hasEventListener(type)) {
        var events    = this.events;
        var listeners = events[type];
        var length    = 0 | listeners.length;

        var i = 0;
        while (i < length) {
            if (listeners[i] !== listener) {
                i = 0 | i + 1;
                continue;
            }

            listeners.slice(i, 0);
            break;
        }
    }
};

/**
 * @param type
 */
EventDispatcher.prototype.willTrigger = function (type)
{
    return this.hasEventListener(type);
};

/**
 * @param as
 * @param stage
 * @param args
 */
EventDispatcher.prototype.setActionQueue = function (as, stage, args)
{
    var actions = stage.actions;
    actions[actions.length] = {as: as, mc: this, args: args};
};
