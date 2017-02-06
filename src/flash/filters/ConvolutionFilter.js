/**
 * @constructor
 */
var ConvolutionFilter = function ()
{
    BitmapFilter.call(this);
    this.filterId = 5;
};

/**
 * extends
 * @type {BitmapFilter}
 */
ConvolutionFilter.prototype = Object.create(BitmapFilter.prototype);
ConvolutionFilter.prototype.constructor = ConvolutionFilter;

/**
 * @param cache
 * @param matrix
 * @param colorTransform
 * @param stage
 * @returns {*}
 */
ConvolutionFilter.prototype.render = function (cache, matrix, colorTransform, stage)
{
    return cache;
};