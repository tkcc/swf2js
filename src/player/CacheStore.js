/**
 * @constructor
 */
var CacheStore = function ()
{
    this.pool  = [];
    this.store = [];
    this.size  = 73400320;
};

/**
 * util
 */
CacheStore.prototype = Object.create(Util.prototype);
CacheStore.prototype.constructor = CacheStore;

/**
 * reset
 */
CacheStore.prototype.reset = function ()
{
    var store = this.store;
    for (var key in store) {
        if (!store.hasOwnProperty(key)) {
            continue;
        }

        var value = store[key];
        if (!(value instanceof CanvasRenderingContext2D)) {
            continue;
        }

        this.destroy(value);
    }

    this.store = [];
    this.size  = 73400320;
};

/**
 * @param ctx
 */
CacheStore.prototype.destroy = function (ctx)
{
    var pool   = this.pool;
    var canvas = ctx.canvas;
    var width  = canvas.width|0;
    var height = canvas.height|0;

    this.size = (this.size + width * height)|0;

    if (this.$canWebGL) {
        ctx.clear(ctx.STENCIL_BUFFER_BIT | ctx.COLOR_BUFFER_BIT);
    } else {
        ctx.clearRect(0, 0, width + 1, height + 1);
    }

    // reset
    canvas.width = canvas.height = 1;

    // pool
    pool[pool.length] = canvas;
};

/**
 * @returns {*}
 */
CacheStore.prototype.getCanvas = function ()
{
    return this.pool.pop() || this.$document.createElement("canvas");
};

/**
 * @param key
 * @returns {*}
 */
CacheStore.prototype.getCache = function (key)
{
    return this.store[key];
};

/**
 * @param key
 * @param value
 */
CacheStore.prototype.setCache = function (key, value)
{
    if (value instanceof CanvasRenderingContext2D) {
        var canvas = value.canvas;
        this.size  = (this.size - (canvas.width * canvas.height))|0;
    }
    this.store[key] = value;
};

/**
 * @param id
 * @param matrix
 * @param cxForm
 * @returns {string}
 */
CacheStore.prototype.generateKey = function (id, matrix, cxForm)
{
    // matrix
    var m = 0;
    if (matrix !== undefined) {
        var length = matrix.length|0;
        switch (length) {
            case 2:
                m = this.$sqrt(matrix[0] * matrix[0] + matrix[1] * matrix[1]);
                break;
            default:
                var x = this.$sqrt(matrix[0] * matrix[0] + matrix[1] * matrix[1]);
                var y = this.$sqrt(matrix[2] * matrix[2] + matrix[3] * matrix[3]);
                m = this.$sqrt(x * x + y * y);
                break;
        }
    }

    // colorTransform
    var c0  = this.$sqrt(cxForm[0] * cxForm[0] + cxForm[4] * cxForm[4]);
    var c1  = this.$sqrt(cxForm[1] * cxForm[1] + cxForm[5] * cxForm[5]);
    var c2  = this.$sqrt(cxForm[2] * cxForm[2] + cxForm[6] * cxForm[6]);
    var c3  = this.$sqrt(cxForm[3] * cxForm[3] + cxForm[7] * cxForm[7]);
    var c01 = this.$sqrt(c0 * c0 + c1 * c1);
    var c23 = this.$sqrt(c2 * c2 + c3 * c3);
    var cx  = this.$sqrt(c01 * c01 + c23 * c23);

    return id + "_" + this.$sqrt(m * m + cx * cx);
};

Util.prototype.$cacheStore = new CacheStore();