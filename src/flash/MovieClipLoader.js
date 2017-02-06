/**
 * @constructor
 */
var MovieClipLoader = function ()
{
    this.events = {
        onLoadStart:    undefined,
        onLoadProgress: undefined,
        onLoadComplete: undefined,
        onLoadInit:     undefined,
        onLoadError:    undefined
    };
};

/**
 * @param url
 * @param target
 * @returns {boolean}
 */
MovieClipLoader.prototype.loadClip = function (url, target)
{
    if (!url || !target) {
        return false;
    }

    var _this = this;
    var events = _this.events;

    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("GET", url, true);

    if (isXHR2) {
        xmlHttpRequest.responseType = "arraybuffer";
    } else {
        xmlHttpRequest.overrideMimeType("text/plain; charset=x-user-defined");
    }

    var onLoadProgress = events.onLoadProgress;
    if (!onLoadProgress) {
        onLoadProgress = _this.onLoadProgress;
    }
    if (typeof onLoadProgress === "function") {
        xmlHttpRequest.onprogress = function (e) {
            onLoadProgress.apply(_this, [target, e.loaded, e.total]);
        };
    }

    var onLoadComplete = events.onLoadComplete;
    if (!onLoadComplete) {
        onLoadComplete = _this.onLoadComplete;
    }
    if (typeof onLoadComplete === "function") {
        xmlHttpRequest.onloadend = function (e) {
            var eventStatus = e.currentTarget.status;
            if (eventStatus === 200) {
                onLoadComplete.apply(_this, [target, eventStatus]);
            }
        };
    }

    xmlHttpRequest.onreadystatechange = function ()
    {
        var readyState = xmlHttpRequest.readyState;
        if (readyState === 4) {
            var status = xmlHttpRequest.status;

            var onLoadStart = events.onLoadStart;
            if (!onLoadStart) {
                onLoadStart = _this.onLoadStart;
            }
            if (typeof onLoadStart === "function") {
                xmlHttpRequest.onloadstart = function ()
                {
                    onLoadStart.apply(_this, [target]);
                };
            }

            switch (status) {
                case 200:
                case 304:
                    var _root = target.getDisplayObject("_root");
                    var rootStage = _root.getStage();
                    var data = isXHR2 ? xmlHttpRequest.response : xmlHttpRequest.responseText;

                    var loadStage = new Stage();
                    loadStages[loadStage.getId()] = loadStage;
                    target._url = url;
                    target.reset();
                    target.setLoadStage(loadStage);

                    loadStage.setParent(target);
                    loadStage.parse(data, url);
                    loadStage.stop();

                    // onLoadInit
                    var onLoadInit = events.onLoadInit;
                    if (!onLoadInit) {
                        onLoadInit = _this.onLoadInit;
                    }
                    if (typeof onLoadInit === "function") {
                        var queue = (function (as, loader, mc) {
                            return function () {
                                return as.apply(loader, [mc]);
                            };
                        })(onLoadInit, _this, target);
                        target.events.load = [queue];
                    }

                    target.addActions(rootStage);

                    break;
                default:
                    var onLoadError = events.onLoadError;
                    if (!onLoadError) {
                        onLoadError = _this.onLoadError;
                    }
                    if (typeof onLoadError === "function") {
                        onLoadError.apply(_this, [target, "error", status]);
                    }
                    break;
            }
        }
    };
    xmlHttpRequest.send(null);

    return true;
};

/**
 * @param listener
 * @returns {boolean}
 */
MovieClipLoader.prototype.addListener = function (listener)
{
    var _this = this;
    if (listener && typeof listener === "object") {
        var events = ["onLoadStart", "onLoadProgress", "onLoadComplete", "onLoadInit", "onLoadError"];
        var variables = listener.variables;
        for (var i = 0; i < 5; i++) {
            var event = events[i];
            if (typeof listener[event] === "function") {
                _this.events[event] = listener[event];
            } else if (variables && typeof variables[event] === "function") {
                _this.events[event] = variables[event];
            }
        }
    }
    return true;
};

/**
 * @param listener
 * @returns {boolean}
 */
MovieClipLoader.prototype.removeListener = function (listener)
{
    var _this = this;
    if (listener && typeof listener === "object") {
        var events = ["onLoadStart", "onLoadProgress", "onLoadComplete", "onLoadInit", "onLoadError"];
        for (var i = 0; i < 5; i++) {
            var event = events[i];
            var variables = listener.variables;
            if (typeof listener[event] === "function" ||
                (variables && typeof variables[event] === "function")
            ) {
                _this.events[event] = undefined;
            }
        }
    }
    return true;
};

/**
 * @param target
 * @returns {{bytesLoaded: number, bytesTotal: number}}
 */
MovieClipLoader.prototype.getProgress = function (target)
{
    return {
        bytesLoaded: 0,
        bytesTotal: 0
    };
};