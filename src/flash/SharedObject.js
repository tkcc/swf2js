/**
 * @constructor
 */
var SharedObject = function ()
{
    this.data = null;
    this.name = null;
};

/**
 * @param name
 * @returns {SharedObject}
 */
SharedObject.prototype.getLocal = function (name)
{
    this.name = name;
    var data  = window.localStorage.getItem(name);
    if (!data) {
        data = {};
    } else {
        data = JSON.parse(data);
    }
    this.data = data;
    return this;
};

/**
 * flush
 */
SharedObject.prototype.flush = function ()
{
    window.localStorage.setItem(this.name, JSON.stringify(this.data));
    return true;
};