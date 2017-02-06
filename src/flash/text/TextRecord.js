/**
 * @constructor
 */
var TextRecord = function ()
{
    this.color  = null;
    this.matrix = null;
};

/**
 * @returns {*}
 */
TextRecord.prototype.getColor = function ()
{
    return this.color;
};

/**
 * @param color
 */
TextRecord.prototype.setColor = function (color)
{
    this.color = color;
};

/**
 * @returns {*}
 */
TextRecord.prototype.getMatrix = function ()
{
    return this.matrix;
};

/**
 * @param matrix
 */
TextRecord.prototype.setMatrix = function (matrix)
{
    this.matrix = matrix;
};

/**
 * @returns {Array}
 */
TextRecord.prototype.getData = function ()
{
    return this.data;
};

/**
 * @param data
 */
TextRecord.prototype.setData = function (data)
{
    this.data = data;
};