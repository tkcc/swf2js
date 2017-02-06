/**
 * @constructor
 */
var Swf2jsEvent = function ()
{
    this.target        = {};
    this.bubbles       = true;
    this.cancelable    = true;
    this.currentTarget = {};
    this.eventPhase    = 0;
};

/**
 * @type {string}
 */
Swf2jsEvent.prototype.ACTIVATE          = "activate";
Swf2jsEvent.prototype.CLICK             = "press";
Swf2jsEvent.prototype.CONTEXT_MENU      = "contextMenu";
Swf2jsEvent.prototype.DOUBLE_CLICK      = "doubleClick";
Swf2jsEvent.prototype.MIDDLE_CLICK      = "middleClick";
Swf2jsEvent.prototype.MIDDLE_MOUSE_DOWN = "middleMouseDown";
Swf2jsEvent.prototype.MIDDLE_MOUSE_UP   = "middleMouseUp";
Swf2jsEvent.prototype.MOUSE_DOWN        = "mouseDown";
Swf2jsEvent.prototype.MOUSE_MOVE        = "mouseMove";
Swf2jsEvent.prototype.MOUSE_OUT         = "rollOut"; // mouseOut TODO
Swf2jsEvent.prototype.MOUSE_OVER        = "rollOver"; // mouseOver TODO
Swf2jsEvent.prototype.MOUSE_UP          = "mouseUp";
Swf2jsEvent.prototype.MOUSE_WHEEL       = "mouseWheel";
Swf2jsEvent.prototype.RIGHT_CLICK       = "rightClick";
Swf2jsEvent.prototype.RIGHT_MOUSE_DOWN  = "rightMouseDown";
Swf2jsEvent.prototype.RIGHT_MOUSE_UP    = "rightMouseUp";
Swf2jsEvent.prototype.ROLL_OUT          = "rollOut";
Swf2jsEvent.prototype.ROLL_OVER         = "rollOver";