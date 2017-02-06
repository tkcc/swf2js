/**
 * @param type
 * @constructor
 */
var ClipEvent = function (type)
{
    this.type   = type;
    this.target = null;
    Swf2jsEvent.call(this);
};

/**
 * extends
 * @type {EventDispatcher}
 */
ClipEvent.prototype = Object.create(Swf2jsEvent.prototype);
ClipEvent.prototype.constructor = ClipEvent;

// set
Util.prototype.$clipEvent = new ClipEvent();