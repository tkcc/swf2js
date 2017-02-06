/**
 * @constructor
 */
var Global = function ()
{
    this.variables = {};
};

/**
 *
 * @param name
 * @returns {*}
 */
Global.prototype.getVariable = function (name)
{
    return this.variables[name];
};

/**
 * @param name
 * @param value
 * @returns {*}
 */
Global.prototype.setVariable = function (name, value)
{
    this.variables[name] = value;
};

/**
 * @param name
 * @returns {*}
 */
Global.prototype.getProperty = function (name)
{
    return this.variables[name];
};

/**
 * @param name
 * @param value
 */
Global.prototype.setProperty = function (name, value)
{
    this.variables[name] = value;
};