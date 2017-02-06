/**
 * @constructor
 */
var CanvasToWebGL = function ()
{

};

/**
 * enable
 */
CanvasToWebGL.prototype.enable = function ()
{
    /**
     * properties
     */
    Object.defineProperties(WebGLRenderingContext.prototype, {
        fillStyle: {
            get: function () {
                return this.getFillStyle();
            },
            set: function (fillStyle) {
                this.setFillStyle(fillStyle);
            }
        },
        strokeStyle: {
            get: function () {
                return this.getStrokeStyle();
            },
            set: function (strokeStyle) {
                this.setStrokeStyle(strokeStyle);
            }
        },
        lineWidth: {
            get: function () {
                return this.getLineWidth();
            },
            set: function (getLineWidth) {
                this.setLineWidth(getLineWidth);
            }
        },
        lineCap: {
            get: function () {
                return this.getLineCap();
            },
            set: function (lineCap) {
                this.setLineCap(lineCap);
            }
        },
        lineJoin: {
            get: function () {
                return this.getLineJoin();
            },
            set: function (lineJoin) {
                this.setLineJoin(lineJoin);
            }
        },
        miterLimit: {
            get: function () {
                return this.getMiterLimit();
            },
            set: function (miterLimit) {
                this.setMiterLimit(miterLimit);
            }
        }
    });

    /**
     * @returns {*}
     */
    WebGLRenderingContext.prototype.getFillStyle = function ()
    {
        return null;
    };

    /**
     * @param fillStyle
     */
    WebGLRenderingContext.prototype.setFillStyle = function (fillStyle)
    {

    };

    /**
     * @returns {*}
     */
    WebGLRenderingContext.prototype.getStrokeStyle = function ()
    {
        return null;
    };

    /**
     * @param strokeStyle
     */
    WebGLRenderingContext.prototype.setStrokeStyle = function (strokeStyle)
    {

    };

    /**
     * @returns {*}
     */
    WebGLRenderingContext.prototype.getLineWidth = function ()
    {
        return null;
    };

    /**
     * @param lineWidth
     */
    WebGLRenderingContext.prototype.setLineWidth = function (lineWidth)
    {

    };

    /**
     * @returns {*}
     */
    WebGLRenderingContext.prototype.getLineCap = function ()
    {
        return null;
    };

    /**
     * @param lineCap
     */
    WebGLRenderingContext.prototype.setLineCap = function (lineCap)
    {

    };

    /**
     * @returns {*}
     */
    WebGLRenderingContext.prototype.getLineJoin = function ()
    {
        return null;
    };

    /**
     * @param lineJoin
     */
    WebGLRenderingContext.prototype.setLineJoin = function (lineJoin)
    {

    };

    /**
     * @returns {*}
     */
    WebGLRenderingContext.prototype.getMiterLimit = function ()
    {
        return null;
    };

    /**
     * @param miterLimit
     */
    WebGLRenderingContext.prototype.setMiterLimit = function (miterLimit)
    {

    };

    /**
     * @param x
     * @param y
     */
    WebGLRenderingContext.prototype.moveTo = function (x, y)
    {

    };

    /**
     * @param x
     * @param y
     */
    WebGLRenderingContext.prototype.lineTo = function (x, y)
    {

    };

    /**
     * @param cpx
     * @param cpy
     * @param x
     * @param y
     */
    WebGLRenderingContext.prototype.quadraticCurveTo = function (cpx, cpy, x, y)
    {

    };

    /**
     * @param cpx1
     * @param cpy1
     * @param cpx2
     * @param cpy2
     * @param x
     * @param y
     */
    WebGLRenderingContext.prototype.bezierCurveTo = function (cpx1, cpy1, cpx2, cpy2, x, y)
    {

    };

    /**
     * @param x
     * @param y
     * @param radius
     * @param startAngle
     * @param endAngle
     * @param anticlockwise
     */
    WebGLRenderingContext.prototype.arc = function (x, y, radius, startAngle, endAngle, anticlockwise)
    {

    };

    /**
     * beginPath
     */
    WebGLRenderingContext.prototype.beginPath = function()
    {

    };


    /**
     * fill
     */
    WebGLRenderingContext.prototype.fill = function()
    {

    };

    /**
     * stroke
     */
    WebGLRenderingContext.prototype.stroke = function()
    {

    };

    /**
     * clip
     */
    WebGLRenderingContext.prototype.clip = function()
    {

    };

};