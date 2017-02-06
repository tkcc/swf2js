/**
 * @constructor
 */
var GradientBevelFilter = function ()
{
    var _this = this;
    BitmapFilter.call(_this);

    _this.filterId = 7;


};

/**
 * extends
 * @type {BitmapFilter}
 */
GradientBevelFilter.prototype = Object.create(BitmapFilter.prototype);
GradientBevelFilter.prototype.constructor = GradientBevelFilter;


/**
 * @param cache
 * @param matrix
 * @param colorTransform
 * @param stage
 * @returns {*}
 */
GradientBevelFilter.prototype.render = function (cache, matrix, colorTransform, stage)
{
    return cache;
};