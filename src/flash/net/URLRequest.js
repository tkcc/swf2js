/**
 * @constructor
 */
var URLRequest = function (url)
{
    this._url = url;
    this._authenticate  = true;
    this._cacheResponse = true;
    this._contentType   = "_application/x-www-form-urlencoded";
    this._data          = null;
};

/**
 * properties
 */
Object.defineProperties(Xml.prototype, {
    url: {
        get: function () {
            return this.getURL();
        },
        set: function (url) {
            this.setURL(url);
        }
    },
    contentType: {
        get: function () {
            return this.getContentType();
        },
        set: function (contentType) {
            this.setContentType(contentType);
        }
    },
    authenticate: {
        get: function () {
            return this.getAuthenticate();
        },
        set: function (authenticate) {
            this.setAuthenticate(authenticate);
        }
    }
});

/**
 * @returns {string}
 */
URLRequest.prototype.getURL = function ()
{
    return this._url;
};

/**
 *  @param url
 */
URLRequest.prototype.setURL = function (url)
{
    this._url = url;
};

/**
 * @returns {string}
 */
URLRequest.prototype.getContentType = function ()
{
    return this._contentType;
};

/**
 * @param contentType
 */
URLRequest.prototype.setContentType = function (contentType)
{
    this._contentType = contentType;
};

/**
 * @returns {boolean}
 */
URLRequest.prototype.getAuthenticate = function ()
{
    return this._authenticate;
};

/**
 * @param authenticate
 */
URLRequest.prototype.setAuthenticate = function (authenticate)
{
    this._authenticate = authenticate;
};
