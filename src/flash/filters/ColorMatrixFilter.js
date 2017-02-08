/**
 * @constructor
 */
var ColorMatrixFilter = function ()
{
    BitmapFilter.call(this);

    this.filterId = 6;

    // default
    this._matrix = [
        1.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 1.0, 0.0
    ];

    this.matrix = arguments[0];
};

/**
 * extends
 * @type {BitmapFilter}
 */
ColorMatrixFilter.prototype = Object.create(BitmapFilter.prototype);
ColorMatrixFilter.prototype.constructor = ColorMatrixFilter;

/**
 * properties
 */
Object.defineProperties(ColorMatrixFilter.prototype, {
    matrix: {
        get: function () {
            return this._matrix;
        },
        set: function (matrix) {
            if (matrix instanceof Array && matrix.length === 20) {
                this._matrix = matrix;
            }
        }
    }
});


/**
 * @param cache
 * @param matrix
 * @param colorTransform
 * @param stage
 * @returns {*}
 */
ColorMatrixFilter.prototype.render = function (cache, matrix, colorTransform, stage)
{
    var mtx = this.matrix;

    var cacheCanvas = cache.canvas;
    var width       = cacheCanvas.width|0;
    var height      = cacheCanvas.height|0;

    var matrixCanvas    = this.$cacheStore.getCanvas();
    matrixCanvas.width  = width;
    matrixCanvas.height = height;
    var matrixCtx       = matrixCanvas.getContext("2d");
    matrixCtx.drawImage(cacheCanvas, 0, 0);

    var imageData = matrixCtx.getImageData(0, 0, width, height);
    var pxData    = imageData.data;
    var length    = pxData.length;

    // red
    var m0 =  mtx[0],  m1  = mtx[1],  m2  = mtx[2],  m3  = mtx[3],  m4  = mtx[4];

    // green
    var m5 =  mtx[5],  m6  = mtx[6],  m7  = mtx[7],  m8  = mtx[8],  m9  = mtx[9];

    // blue
    var m10 = mtx[10], m11 = mtx[11], m12 = mtx[12], m13 = mtx[13], m14 = mtx[14];

    // alpha
    var m15 = mtx[15], m16 = mtx[16], m17 = mtx[17], m18 = mtx[18], m19 = mtx[19];

    var R, G, B, A;
    var i = 0;
    while (i < length) {
        R = pxData[i    ]|0;
        G = pxData[i + 1]|0;
        B = pxData[i + 2]|0;
        A = pxData[i + 3]|0;

        pxData[i    ] = ((R * m0)  + (G * m1)  + (B * m2)  + (A * m3)  + m4 )|0;
        pxData[i + 1] = ((R * m5)  + (G * m6)  + (B * m7)  + (A * m8)  + m9 )|0;
        pxData[i + 2] = ((R * m10) + (G * m11) + (B * m12) + (A * m13) + m14)|0;
        pxData[i + 3] = ((R * m15) + (G * m16) + (B * m17) + (A * m18) + m19)|0;

        i = (i + 4)|0;
    }

    matrixCtx.putImageData(imageData, 0, 0);
    matrixCtx._offsetX = +cache._offsetX;
    matrixCtx._offsetY = +cache._offsetY;

    this.$cacheStore.destroy(cache);

    return matrixCtx;
};