var ShaderFilter = function () {};

/**
 * extends
 * @type {BitmapFilter}
 */
ShaderFilter.prototype = Object.create(BitmapFilter.prototype);
ShaderFilter.prototype.constructor = ShaderFilter;

/**
 * @param cache
 * @param matrix
 * @param colorTransform
 * @param stage
 * @returns {*}
 */
ShaderFilter.prototype.render = function (cache, matrix, colorTransform, stage)
{
    return cache;
};