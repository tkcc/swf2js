/**
 * @constructor
 */
var SoundTransform = function ()
{
    this._leftToLeft = 0;
    this._leftToRight = 1;
    this._pan = 0;
    this._rightToLeft = 0;
    this._rightToRight = 1;
    this._volume = 1;
};

/**
 * properties
 */
Object.defineProperties(SoundTransform.prototype,
    {
        leftToLeft: {
            get: function () {
                return this.getLeftToLeft();
            },
            set: function (leftToLeft) {
                this.setLeftToLeft(leftToLeft);
            }
        },
        leftToRight: {
            get: function () {
                return this.getLeftToRight();
            },
            set: function (leftToRight) {
                this.setLeftToRight(leftToRight);
            }
        },
        pan: {
            get: function () {
                return this.getPan();
            },
            set: function (pan) {
                this.setPan(pan);
            }
        },
        rightToLeft: {
            get: function () {
                return this.getRightToLeft();
            },
            set: function (rightToLeft) {
                this.setRightToLeft(rightToLeft);
            }
        },
        rightToRight: {
            get: function () {
                return this.getRightToRight();
            },
            set: function (rightToRight) {
                this.setRightToRight(rightToRight);
            }
        },
        volume: {
            get: function () {
                return this.getVolume();
            },
            set: function (volume) {
                this.setVolume(volume);
            }
        }
    });

/**
 * @returns {number}
 */
SoundTransform.prototype.getLeftToLeft = function ()
{
    return this._leftToLeft;
};

/**
 * @param leftToLeft
 */
SoundTransform.prototype.setLeftToLeft = function (leftToLeft)
{
    this._leftToLeft = leftToLeft | 0;
};

/**
 * @returns {number}
 */
SoundTransform.prototype.getLeftToRight = function ()
{
    return this._leftToRight;
};

/**
 * @param leftToRight
 */
SoundTransform.prototype.setLeftToRight = function (leftToRight)
{
    this._leftToRight = leftToRight | 0;
};

/**
 * @returns {number}
 */
SoundTransform.prototype.getPan = function ()
{
    return this._pan;
};

/**
 * @param pan
 */
SoundTransform.prototype.setPan = function (pan)
{
    this._pan = pan | 0;
};

/**
 * @returns {number}
 */
SoundTransform.prototype.getRightToLeft = function ()
{
    return this._rightToLeft;
};

/**
 * @param rightToLeft
 */
SoundTransform.prototype.setRightToLeft = function (rightToLeft)
{
    this._rightToLeft = rightToLeft | 0;
};

/**
 * @returns {number}
 */
SoundTransform.prototype.getRightToRight = function ()
{
    return this._rightToRight;
};

/**
 * @param rightToRight
 */
SoundTransform.prototype.setRightToRight = function (rightToRight)
{
    this._rightToRight = rightToRight | 0;
};

/**
 * @returns {number}
 */
SoundTransform.prototype.getVolume = function ()
{
    return this._volume;
};

/**
 * @param volume
 */
SoundTransform.prototype.setVolume = function (volume)
{
    this._volume = volume | 0;
};

/**
 * @param vol
 * @param panning
 */
SoundTransform.prototype.SoundTransform = function (vol, panning)
{
    this.volume = vol | 0;
    this.pan    = panning | 0;
};