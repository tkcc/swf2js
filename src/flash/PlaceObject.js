/**
 * @constructor
 */
var PlaceObject = function ()
{
    this.matrix         = [1, 0, 0, 1, 0, 0];
    this.colorTransform = [1, 1, 1, 1, 0, 0, 0, 0];
    this.filters        = null;
    this.blendMode      = "normal";
};

/**
 * @param src
 * @returns {Array}
 */
PlaceObject.prototype.cloneArray = function(src)
{
    var arr    = [];
    var length = 0 | src.length;

    var i = 0;
    while (i < length) {
        arr[i] = src[i];
        i = 0 | i + 1;
    }

    return arr;
};

/**
 * @param blendMode
 * @returns {String}
 */
PlaceObject.prototype.getBlendName = function (blendMode)
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
 * @returns {PlaceObject}
 */
PlaceObject.prototype.clone = function ()
{
    var placeObject = new PlaceObject();
    placeObject.setMatrix(this.getMatrix());
    placeObject.setColorTransform(this.getColorTransform());
    placeObject.setFilters(this.getFilters());
    placeObject.setBlendMode(this.getBlendMode());
    return placeObject;
};

/**
 * @returns {*}
 */
PlaceObject.prototype.getMatrix = function ()
{
    return this.matrix;
};

/**
 * @param matrix
 */
PlaceObject.prototype.setMatrix = function (matrix)
{
    this.matrix = this.cloneArray(matrix);
};

/**
 * @returns {*}
 */
PlaceObject.prototype.getColorTransform = function ()
{
    return this.colorTransform;
};

/**
 * @param colorTransform
 */
PlaceObject.prototype.setColorTransform = function (colorTransform)
{
    this.colorTransform = this.cloneArray(colorTransform);
};

/**
 * @returns {*}
 */
PlaceObject.prototype.getFilters = function ()
{
    return this.filters;
};

/**
 * @param filters
 */
PlaceObject.prototype.setFilters = function (filters)
{
    this.filters = filters;
};

/**
 * @returns {string}
 */
PlaceObject.prototype.getBlendMode = function ()
{
    return this.blendMode;
};

/**
 * @param blendMode
 */
PlaceObject.prototype.setBlendMode = function (blendMode)
{
    this.blendMode = this.getBlendName(blendMode);
};