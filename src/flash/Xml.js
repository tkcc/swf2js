/**
 * @constructor
 */
var Xml = function ()
{
    this.ignoreWhite = false;
    this.loaded      = false;
    this.status      = 0;
    this.variables   = {};
};

/**
 * properties
 */
Object.defineProperties(Xml.prototype, {
    onData: {
        get: function () {
            return this.getProperty("onData");
        },
        set: function (onData) {
            this.setProperty("onData", onData);
        }
    },
    onLoad: {
        get: function () {
            return this.getProperty("onLoad");
        },
        set: function (onLoad) {
            this.setProperty("onLoad", onLoad);
        }
    }
});

/**
 * @param name
 * @returns {*}
 */
Xml.prototype.getProperty = function (name)
{
    return this.variables[name];
};

/**
 * @param name
 * @param value
 */
Xml.prototype.setProperty = function (name, value)
{
    this.variables[String(name)] = value;
};


/**
 * @param url
 */
Xml.prototype.load = function (url)
{
    var self = this;
    url = "" + url;

    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("GET", url, true);

    xmlHttpRequest.onreadystatechange = function ()
    {
        var readyState = 0 | xmlHttpRequest.readyState;
        if (readyState === 4) {
            var src = xmlHttpRequest.responseXML;
            var onData = self.onData;
            if (typeof onData === "function") {
                onData.apply(src, [src]);
            }

            var onLoad;
            var status = 0 | xmlHttpRequest.status;
            switch (status) {
                case 200:
                case 304:
                    onLoad = self.onLoad;
                    if (typeof onLoad === "function") {
                        onLoad.apply(src, [true]);
                    }
                    return true;
                default:
                    onLoad = self.onLoad;
                    if (typeof onLoad === "function") {
                        onLoad.apply(src, [false]);
                    }
                    return false;
            }
        }
    };

    xmlHttpRequest.send(null);
};

/**
 * @param url
 * @param target
 * @param method
 */
Xml.prototype.send = function (url, target, method)
{
    var sendMethod = method ? method.toUpperCase() : "GET";
    if (target) {
        console.log(target);
    }

    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open(sendMethod, url, true);
    xmlHttpRequest.send(null);

    return true;
};

/**
 * @param url
 * @param resultXML
 */
Xml.prototype.sendAndLoad = function (url, resultXML)
{
    this.send(url);
    return this.load(resultXML);
};