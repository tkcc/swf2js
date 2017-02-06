var OriginalObject = function () {};

/**
 * util
 */
OriginalObject.prototype = Object.create(Util.prototype);
OriginalObject.prototype.constructor = OriginalObject;



