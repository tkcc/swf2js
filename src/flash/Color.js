/**
 * @param mc
 * @constructor
 */
var Color = function (mc)
{
    this.movieClip = mc;
    this.variables = {};
};

/**
 *
 * @param name
 * @returns {*}
 */
Color.prototype.getProperty = function (name)
{
    return this.variables[name];
};

/**
 * @param name
 * @param value
 */
Color.prototype.setProperty = function (name, value)
{
    this.variables[String(name)] = value;
};

/**
 * @param int
 * @param alpha
 * @returns {{R: number, G: number, B: number, A: number}}
 */
Color.prototype.intToRGBA = function (int, alpha)
{
    alpha = alpha || 100;
    return {
        R: (int & 0xff0000) >> 16,
        G: (int & 0x00ff00) >> 8,
        B: (int & 0x0000ff),
        A: (alpha / 100)
    };
};

/**
 * @param offset
 */
Color.prototype.setRGB = function (offset)
{
    var _this = this;
    var mc = _this.movieClip;
    if (mc instanceof MovieClip) {
        offset |= 0;
        var obj = _this.intToRGBA(offset);
        var colorTransform = mc.getOriginColorTransform();
        if (colorTransform) {
            var transform = [obj.R, obj.G, obj.B, obj.A * 255, 0, 0, 0, 0];
            var multiColor = mc.cloneArray(transform);
            var color = mc.multiplicationColor(colorTransform, multiColor);
            mc.setColorTransform(color);
        }
    }
};

/**
 * @returns {*[]|*}
 */
Color.prototype.getTransform = function ()
{
    var _this = this;
    var mc = _this.movieClip;
    if (mc instanceof MovieClip) {
        return mc.getColorTransform();
    }
    return undefined;
};

/**
 * @param obj
 */
Color.prototype.setTransform = function (obj)
{
    var _this = this;
    var mc = _this.movieClip;
    if (mc instanceof MovieClip) {
        var colorTransform = mc.getOriginColorTransform();
        var transform = [
            obj.rb, obj.gb, obj.bb, obj.ab,
            obj.ra, obj.ga, obj.ba, obj.aa
        ];
        var multiColor = mc.cloneArray(transform);
        var color = mc.multiplicationColor(colorTransform, multiColor);
        mc.setColorTransform(color);
    }
};