/**
 * @constructor
 */
var ColorMatrixFilter = function ()
{
    BitmapFilter.call(this);
    this.filterId = 6;
};

/**
 * extends
 * @type {BitmapFilter}
 */
ColorMatrixFilter.prototype = Object.create(BitmapFilter.prototype);
ColorMatrixFilter.prototype.constructor = ColorMatrixFilter;

/**
 * @param cache
 * @param matrix
 * @param colorTransform
 * @param stage
 * @returns {*}
 */
ColorMatrixFilter.prototype.render = function (cache, matrix, colorTransform, stage)
{
    return cache;
};