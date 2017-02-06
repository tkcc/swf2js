/**
 * @constructor
 */
var MovieClip = function ()
{
    Sprite.call(this);

    this._currentframe = 1;
    this.removeTags    = [];
    this.actions       = [];
    this.labels        = [];

    // flag
    this.stopFlag = false;
    this.isAction = true;

    // clip
    this.isClipDepth = false;
    this.clipDepth   = 0;

    // sound
    this.sounds        = [];
    this.soundStopFlag = false;
};

/**
 * extends
 * @type {Sprite}
 */
MovieClip.prototype = Object.create(Sprite.prototype);
MovieClip.prototype.constructor = MovieClip;

/**
 * @returns {string}
 */
MovieClip.prototype.getClassName = function ()
{
    return "MovieClip";
};

/**
 * @param name
 * @param stage
 */
MovieClip.prototype.dispatchOnEvent = function (name, stage)
{
    var as = this.variables[name];
    if (as) {
        this.setActionQueue(as, stage);
    }
};

/**
 * @param name
 * @param depth
 * @returns {MovieClip}
 */
MovieClip.prototype.createEmptyMovieClip = function (name, depth)
{
    var stage = this.getStage();

    if (!name) {
        return undefined;
    }

    var mc = this.getDisplayObject(name);
    if (!mc) {
        mc = new MovieClip();
    }

    depth += 16384;

    mc.setName(name);
    mc.setLevel(depth);
    mc.setParent(this);
    mc.setStage(stage);

    var container   = this.getContainer();
    var totalFrames = this.getTotalFrames() + 1;
    var placeObject = new PlaceObject();
    var instanceId  = this.instanceId;

    var frame = 1;
    while (frame < totalFrames) {
        if (!(frame in container)) {
            container[frame] = [];
        }

        container[frame][depth] = mc.instanceId;
        stage.setPlaceObject(placeObject, instanceId, depth, frame);

        frame = 0 | frame + 1;
    }

    return mc;
};

/**
 * @param name
 * @param depth
 * @param x
 * @param y
 * @param width
 * @param height
 * @returns {TextField}
 */
MovieClip.prototype.createTextField = function (name, depth, x, y, width, height)
{
    if (16384 > depth) {
        depth += 16384;
    }

    var textField = new TextField(name, depth, width, height);
    textField.setX(x);
    textField.setY(y);
    textField.setParent(this);
    textField.setStage(this.getStage());
    textField.setInitParams();

    var container = this.getContainer();
    for (var frame in container) {
        if (!container.hasOwnProperty(frame)) {
            continue;
        }

        container[frame][depth] = textField.instanceId;
    }

    return textField;
};

/**
 * @param r
 * @param g
 * @param b
 */
MovieClip.prototype.setBackgroundColor = function (r, g, b)
{
    var stage = this.getStage();
    stage.setBackgroundColor(r, g, b);
};

/**
 * play
 */
MovieClip.prototype.play = function ()
{
    this.stopFlag = false;
};

/**
 * stop
 */
MovieClip.prototype.stop = function ()
{
    this.stopFlag = true;
};

/**
 * @param frame
 */
MovieClip.prototype.gotoAndPlay = function (frame)
{
    if (typeof frame === "string") {
        var label = this.getLabel(frame);
        if (label) {
            frame = label;
        }
    }

    frame |= 0;
    if (typeof frame === "number" && frame > 0) {
        this.setNextFrame(frame);
        this.play();
    }
};

/**
 * @param frame
 */
MovieClip.prototype.gotoAndStop = function (frame)
{
    if (typeof frame === "string") {
        var label = this.getLabel(frame);
        if (label) {
            frame = label;
        }
    }

    frame |= 0;
    if (typeof frame === "number" && frame > this.getTotalFrames()) {
        frame = this.getTotalFrames();
        this.isAction = false;
    }

    if (frame > 0) {
        this.setNextFrame(frame);
        this.stop();
    }
};

/**
 * stopAllSounds
 */
MovieClip.prototype.stopAllSounds = function ()
{
    var stage = this.getStage();

    var loadSounds = stage.loadSounds;
    var length     = 0 | loadSounds.length;

    if (length) {
        var stopSound = function () {
            this.removeEventListener("pause", stopSound);
            this.currentTime = 0;
            this.loop = false;
        };

        var idx = 0;
        while (idx < length) {
            if (!(idx in loadSounds)) {
                continue;
            }

            var audio = loadSounds[idx];
            audio.addEventListener("pause", stopSound);
            audio.pause();

            idx = 0 | idx  + 1;
        }
    }

    stage.loadSounds = [];
};

/**
 * @param url
 * @param target
 * @param SendVarsMethod
 * @returns {number}
 */
MovieClip.prototype.loadMovie = function (url, target, SendVarsMethod)
{
    var stage    = this.getStage();
    var targetMc = null;

    if (!target) {
        target   = this.getName();
        targetMc = this;
    }

    if (!targetMc) {
        if (typeof target === "string") {
            var _level = target.substr(0, 6);
            if (_level === "_level") {
                target = +target.substr(6);
            }
        }

        if (typeof target === "number") {
            var parent = stage.getParent();
            if (!parent) {
                parent = stage.getParent();
            }

            var tags = parent.getTags();
            targetMc = tags[target];
        } else {
            targetMc = this.getDisplayObject(target);
        }
    }

    if (targetMc) {
        this.unloadMovie(targetMc);

        var xmlHttpRequest = new XMLHttpRequest();

        var targetUrl = url;
        var body      = null;

        if (SendVarsMethod === 2) {
            var urls = url.split("?");
            if (urls[1]) {
                body = urls[1];
            }

            targetUrl = urls[0];
            xmlHttpRequest.open("POST", targetUrl, true);
            xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        } else {
            xmlHttpRequest.open("GET", targetUrl, true);
        }

        if (this.$canXHR2) {
            xmlHttpRequest.responseType = "arraybuffer";
        } else {
            xmlHttpRequest.overrideMimeType("text/plain; charset=x-user-defined");
        }

        var self = this;
        xmlHttpRequest.onreadystatechange = function ()
        {
            var readyState = xmlHttpRequest.readyState;
            var status = xmlHttpRequest.status;
            if (readyState === 4) {
                switch (status) {
                    case 200:
                    case 304:
                        var _root     = self.getDisplayObject("_root");
                        var rootStage = _root.getStage();
                        var data      = (self.$canXHR2) ? xmlHttpRequest.response : xmlHttpRequest.responseText;

                        var loadStage = new Stage();
                        self.$loadStages[loadStage.getId()] = loadStage;
                        targetMc._url = url;
                        targetMc.reset();
                        loadStage.setParent(targetMc);
                        targetMc.setLoadStage(loadStage);
                        loadStage.parse(data, targetUrl);
                        loadStage.stop();

                        if (target === 0 || (typeof target !== "number" && !targetMc.getParent())) {
                            stage.stop();
                            loadStage.setId(stage.getId());
                            loadStage.setName(stage.getName());
                            loadStage.backgroundColor = stage.backgroundColor;
                            loadStage.initCanvas();
                            loadStage.loadStatus = 2;
                            loadStage.loadEvent();
                            delete loadStages[loadStage.getId()];
                            stages[stage.getId()] = loadStage;
                            stage = null;
                        }

                        var onData = targetMc.variables.onData;
                        if (typeof onData === "function") {
                            loadStage.executeEventAction(onData, targetMc);
                        }

                        var clipEvent = self.$clipEvent;
                        clipEvent.type = "data";
                        targetMc.dispatchEvent(clipEvent, rootStage);

                        targetMc.addActions(rootStage);

                        break;
                }
            }
        };

        xmlHttpRequest.send(body);
    }
};

/**
 * @param target
 * @returns {number}
 */
MovieClip.prototype.unloadMovie = function (target)
{
    var targetMc = null;
    if (target instanceof MovieClip) {
        targetMc = target;
    } else {
        targetMc = this.getDisplayObject(target);
        if (!targetMc) {
            return 0;
        }
    }

    // delete
    targetMc.reset();
    targetMc.setLoadStage(null);
    targetMc.setStage(this.getStage());
    targetMc.container    = [];
    targetMc.actions      = [];
    targetMc.instances    = [];
    targetMc.labels       = [];
    targetMc.sounds       = [];
    targetMc.removeTags   = [];
    targetMc._totalframes = 1;
    targetMc._url         = null;
    targetMc._lockroot    = undefined;

    var loadStage = targetMc.getStage();
    delete this.$loadStages[loadStage.getId()];
};

/**
 * @param url
 * @param target
 * @param method
 * @returns {*}
 */
MovieClip.prototype.getURL = function (url, target, method)
{
    if (typeof url === "string") {
        var cmd = url.substr(0, 9);
        if (cmd === "FSCommand") {
            var values = url.split(":");
            cmd = values.pop();
            var str = arguments[1];
            if (str === undefined) {
                str = "";
            }

            var stage     = this.getStage();
            var FSCommand = stage.abc.flash.system.fscommand;
            return FSCommand.apply(stage, [cmd, str]);
        }
    }

    if (target && typeof target === "string") {
        switch (target.toLowerCase()) {
            case "_self":
            case "_blank":
            case "_parent":
            case "_top":
                break;
            case "post":
                target = "_self";
                method = "GET";
                break;
            case "get":
                target = "_self";
                method = "GET";
                break;
            default:
                if (!method) {
                    method = "GET";
                }
                this.loadMovie(url, target, method);
                return 0;
        }
    }

    // form
    if (method === "POST") {
        var form    = this.$document.createElement("form");
        form.action = url;
        form.method = method;
        if (target) {
            form.target = target;
        }

        var urls = url.split("?");
        if (urls.length > 1) {
            var pears      = urls[1].split("&");
            var pLen       = pears.length;
            var _encodeURI = encodeURI;

            var pIdx = 0;
            while (pIdx < pLen) {
                var pear = pears[pIdx].split("=");
                pIdx = 0 | pIdx + 1;

                var input   = this.$document.createElement("input");
                input.type  = "hidden";
                input.name  = pear[0];
                input.value = _encodeURI(pear[1] || "");
                form.appendChild(input);
            }
        }

        this.$document.body.appendChild(form);
        form.submit();
    } else {
        url = url.replace(/'/g, "\\'");
        var func = new this.$Function("location.href = '" + url + "';");
        func();
    }
};

/**
 * @param url
 * @param target
 * @param method
 */
MovieClip.prototype.loadVariables = function (url, target, method)
{
    var _this = this;
    var targetMc = _this;
    if (target) {
        targetMc = _this.getDisplayObject(target);
    }

    if (targetMc) {
        var xmlHttpRequest = new XMLHttpRequest();
        var body = null;
        if (method === "POST") {
            var urls = url.split("?");
            if (urls[1]) {
                body = urls[1];
            }
            xmlHttpRequest.open(method, urls[0], true);
            xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        } else {
            xmlHttpRequest.open("GET", url, true);
        }

        xmlHttpRequest.onreadystatechange = function ()
        {
            var readyState = xmlHttpRequest.readyState;
            if (readyState === 4) {
                var status = xmlHttpRequest.status;
                switch (status) {
                    case 200:
                    case 304:
                        var responseText = decodeURIComponent(xmlHttpRequest.responseText);
                        var pairs = responseText.split("&");
                        var length = pairs.length;
                        for (var idx = 0; idx < length; idx++) {
                            var pair = pairs[idx];
                            var values = pair.split("=");
                            targetMc.setVariable(values[0], values[1]);
                        }

                        var _root = _this.getDisplayObject();
                        var rootStage = _root.getStage();
                        var stage = _this.getStage();
                        var onData = targetMc.variables.onData;
                        if (typeof onData === "function") {
                            stage.executeEventAction(onData, targetMc);
                        }

                        clipEvent.type = "data";
                        targetMc.dispatchEvent(clipEvent, rootStage);

                        break;
                }
            }
        };
        xmlHttpRequest.send(body);
    }
};

/**
 * @returns {boolean}
 */
MovieClip.prototype.hitTest = function ()
{
    var _this = this;
    var targetMc = arguments[0];
    var x = 0;
    var y = 0;
    var bool = false;
    if (!(targetMc instanceof MovieClip)) {
        x = arguments[0];
        y = arguments[1];
        bool = arguments[2];
        if (!x || !y) {
            return false;
        }
    }

    var bounds = _this.getHitBounds();
    var xMax = bounds.xMax;
    var xMin = bounds.xMin;
    var yMax = bounds.yMax;
    var yMin = bounds.yMin;

    if (targetMc instanceof MovieClip) {
        var targetBounds = targetMc.getHitBounds();
        var txMax = targetBounds.xMax;
        var txMin = targetBounds.xMin;
        var tyMax = targetBounds.yMax;
        var tyMin = targetBounds.yMin;
        return (txMax > xMin && tyMax > yMin && xMax > txMin && yMax > tyMin);
    } else {
        if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) {
            if (bool) {
                var matrix = [1,0,0,1,0,0];
                var mc = _this;
                var _multiplicationMatrix = _this.multiplicationMatrix;
                while (true) {
                    var parent = mc.getParent();
                    if (!parent.getParent()) {
                        break;
                    }
                    matrix = _multiplicationMatrix(parent.getMatrix(), matrix);
                    mc = parent;
                }
                var _root = _this.getDisplayObject("_root");
                var stage = _root.getStage();
                var ctx = stage.hitContext;
                var scale = stage.getScale();
                x *= scale;
                y *= scale;
                y *= _devicePixelRatio;
                x *= _devicePixelRatio;

                return _this.renderHitTest(ctx, matrix, stage, x, y);
            } else {
                return true;
            }
        }
        return false;
    }
};

/**
 * @returns {{xMin: *, xMax: *, yMin: *, yMax: *}}
 * @returns {*}
 */
MovieClip.prototype.getHitBounds = function ()
{
    var _this = this;
    var mc = _this;
    var matrix = _this.getMatrix();
    var _multiplicationMatrix = _this.multiplicationMatrix;
    while (true) {
        var parent = mc.getParent();
        if (!parent.getParent()) {
            break;
        }
        matrix = _multiplicationMatrix(parent.getMatrix(), matrix);
        mc = parent;
    }
    return _this.getBounds(matrix);
};

/**
 * @param depth
 * @returns {*}
 */
MovieClip.prototype.getInstanceAtDepth = function (depth)
{
    var _this = this;
    var parent = _this.getParent();
    if (!parent) {
        parent = _this.getDisplayObject("_root");
    }
    var tags = parent.getTags();
    depth += 16384;
    return tags[depth];
};

/**
 * swapDepths
 */
MovieClip.prototype.swapDepths = function ()
{
    var _this = this;
    var mc = arguments[0];
    var depth = 0;
    var parent = _this.getParent();
    if (parent) {
        var tags = parent.getTags();
        if (mc instanceof MovieClip) {
            if (parent === mc.getParent()) {
                depth = _this.getDepth() + 16384;
                var swapDepth = mc.getDepth() + 16384;
                _this.setDepth(depth, swapDepth, mc);
            }
        } else {
            depth = arguments[0];
            if (this.$isNaN(depth)) {
                depth = parent.getNextHighestDepth();
            }
            if (16384 > depth) {
                depth += 16384;
            }
            if (depth in tags) {
                var id = tags[depth];
                if (id !== _this.instanceId) {
                    var stage = _this.getStage();
                    var instance = stage.getInstance(id);
                    _this.swapDepths(instance);
                }
            } else {
                _this.setDepth(depth, null, null);
            }
        }
    }
};

/**
 * @param id
 * @param name
 * @param depth
 * @param object
 * @returns {*}
 */
MovieClip.prototype.attachMovie = function (id, name, depth, object)
{
    var movieClip = null;
    var _this = this;
    if (_isNaN(depth)) {
        depth = _this.getNextHighestDepth();
    }
    if (depth < 16384) {
        depth += 16384;
    }

    var mc = _this.getDisplayObject(name);
    if (mc) {
        mc.removeMovieClip();
    }

    var stage = _this.getStage();
    var exportAssets = stage.exportAssets;
    if (id in exportAssets) {
        var characterId = exportAssets[id];
        var tag = stage.getCharacter(characterId);
        if (tag) {
            movieClip = new MovieClip();
            movieClip.setStage(stage);
            movieClip.setParent(_this);
            movieClip.setCharacterId(characterId);
            movieClip.setLevel(depth);
            movieClip.setName(name);
            movieClip.setTarget(_this.getTarget() + "/" + name);

            // init action
            var initAction = stage.initActions[characterId];
            if (typeof initAction === "function") {
                movieClip.active = true;
                initAction.apply(movieClip);
                movieClip.reset();
            }

            // registerClass
            var RegClass = stage.registerClass[characterId];
            if (RegClass) {
                movieClip.variables.registerClass = new RegClass();
            }

            var swfTag = new SwfTag(stage, null);
            swfTag.build(tag, movieClip);

            var placeObject = new PlaceObject();
            var instanceId = _this.instanceId;
            var totalFrame = _this.getTotalFrames() + 1;
            var container = _this.getContainer();
            for (var frame = 1; frame < totalFrame; frame++) {
                if (!(frame in container)) {
                    container[frame] = [];
                }
                container[frame][depth] = movieClip.instanceId;
                stage.setPlaceObject(placeObject, instanceId, depth, frame);
            }

            if (object) {
                for (var prop in object) {
                    if (!object.hasOwnProperty(prop)) {
                        continue;
                    }
                    movieClip.setProperty(prop, object[prop]);
                }
            }

            var _root = _this.getDisplayObject("_root");
            var rootStage = _root.getStage();
            movieClip.addActions(rootStage);
        }
    }
    return movieClip;
};

/**
 * @returns {number}
 */
MovieClip.prototype.getNextHighestDepth = function ()
{
    var depth = 0;
    var _this = this;
    var container = _this.getContainer();
    for (var idx in container) {
        if (!container.hasOwnProperty(idx)) {
            continue;
        }
        var children = container[idx];
        depth = _max(depth, children.length);
    }
    if (16384 > depth) {
        depth = 0;
    }
    return depth;
};

/**
 * @returns {*}
 */
MovieClip.prototype.getBytesLoaded = function ()
{
    var _this = this;
    var stage = _this.getStage();
    var bitio = stage.bitio;
    return (!bitio) ? stage.fileSize : bitio.byte_offset;
};

/**
 * @returns {number|*|fileLength}
 */
MovieClip.prototype.getBytesTotal = function ()
{
    var _this = this;
    var stage = _this.getStage();
    return stage.fileSize;
};

/**
 * updateAfterEvent
 */
MovieClip.prototype.updateAfterEvent = function ()
{
    var _this = this;
    var _root = _this.getDisplayObject("_root");
    var stage = _root.getStage();
    stage.touchRender();
};

/**
 * @returns {*}
 */
MovieClip.prototype.duplicateMovieClip = function ()
{
    var _this = this;
    var _root = _this.getDisplayObject("_root");
    var stage = _root.getStage();
    var target = arguments[0];
    var name = arguments[1];
    var depth = arguments[2];

    var targetMc = _this.getDisplayObject(name);
    var parent;
    var object;
    if (!targetMc && stage.getVersion() > 4) {
        target = arguments[0];
        depth = arguments[1];
        if (_isNaN(depth)) {
            parent = _this.getParent();
            if (!parent) {
                parent = stage.getParent();
            }
            depth = parent.getNextHighestDepth();
        }
        object = arguments[2];
        targetMc = _this;
    }

    if (16384 > depth) {
        depth += 16384;
    }

    var cloneMc;
    if (targetMc && targetMc.getCharacterId() !== 0) {
        stage = targetMc.getStage();
        parent = targetMc.getParent();
        if (!parent) {
            parent = stage.getParent();
        }

        var char = stage.getCharacter(targetMc.characterId);
        var swftag = new SwfTag(stage);
        if (char instanceof Array) {
            cloneMc = new MovieClip();
            cloneMc.setStage(stage);
            cloneMc.setParent(parent);
            cloneMc.setLevel(depth);
            cloneMc.setTotalFrames(targetMc.getTotalFrames());
            cloneMc.setCharacterId(targetMc.characterId);
            swftag.build(char, cloneMc);
        } else {
            var tag = {
                CharacterId: targetMc.characterId,
                Ratio: 0,
                Depth: depth
            };
            cloneMc = swftag.buildObject(tag, parent);
        }

        cloneMc.setName(target);
        if (targetMc._matrix) {
            cloneMc._blendMode = targetMc._blendMode;
            cloneMc._filters = targetMc._filters;
            cloneMc._matrix = _this.cloneArray(targetMc._matrix);
            cloneMc._colorTransform = _this.cloneArray(targetMc._colorTransform);
        }

        var totalFrame = parent.getTotalFrames() + 1;
        var container = parent.getContainer();
        var instanceId = parent.instanceId;
        var placeObjects = stage.placeObjects[instanceId];
        var level = targetMc.getLevel();
        for (var frame = 1; frame < totalFrame; frame++) {
            if (!(frame in container)) {
                container[frame] = [];
            }
            container[frame][depth] = cloneMc.instanceId;

            if (frame in placeObjects) {
                var placeObject = placeObjects[frame][level];
                if (placeObject) {
                    if (!(frame in placeObjects)) {
                        placeObjects[frame] = [];
                    }
                    placeObjects[frame][depth] = placeObject.clone();
                }
            }
        }

        if (object) {
            for (var prop in object) {
                if (!object.hasOwnProperty(prop)) {
                    continue;
                }
                cloneMc.setProperty(prop, object[prop]);
            }
        }

        cloneMc.addActions(stage);
    }

    return cloneMc;
};

/**
 * @param name
 */
MovieClip.prototype.removeMovieClip = function (name)
{
    var _this = this;
    var targetMc = _this;
    if (typeof name === "string") {
        var target = _this.getDisplayObject(name);
        if (target) {
            targetMc = target;
        }
    }

    var depth = targetMc.getDepth() + 16384;
    var level = targetMc.getLevel();
    if (targetMc instanceof MovieClip && depth >= 16384) {
        targetMc.reset();
        targetMc.removeFlag = true;
        var parent = targetMc.getParent();
        var container = parent.getContainer();
        var instanceId = targetMc.instanceId;
        var tagId;
        for (var frame = parent.getTotalFrames() + 1; --frame;) {
            if (!(frame in container)) {
                continue;
            }

            var tags = container[frame];
            if (depth in tags) {
                tagId = tags[depth];
                if (tagId === instanceId) {
                    delete container[frame][depth];
                }
            }

            if (depth !== level && 16384 > level) {
                if (!(level in tags)) {
                    tags[level] = instanceId;
                }
            }
        }
    }
};

/**
 * initFrame
 */
MovieClip.prototype.initFrame = function ()
{
    this.active = true;

    var stage  = this.getStage();
    var tags   = this.getTags();
    var length = tags.length;
    if (length) {
        tags.reverse();
        for (var depth in tags) {
            if (!tags.hasOwnProperty(depth)) {
                continue;
            }

            var instanceId = tags[depth];
            var instance   = stage.getInstance(instanceId);
            if (!instance) {
                continue;
            }

            instance.initFrame();
        }
        tags.reverse();
    }

    var initAction = stage.initActions[this.getCharacterId()];
    if (typeof initAction === "function") {
        initAction.apply(this);
    }
};

/**
 * @param stage
 * @param clipEvent
 */
MovieClip.prototype.putFrame = function (stage, clipEvent)
{
    var prevTags;
    var myStage  = this.getStage();
    if (!this.stopFlag && this.active) {
        var frame       = this.getCurrentFrame()|0;
        var totalFrames = this.getTotalFrames()|0;
        if (totalFrames > 1) {
            if (this.isLoad) {
                prevTags = this.getTags();
                frame = (frame + 1)|0;
            }

            if (frame > totalFrames) {
                frame = 1;
                this.resetCheck();
            }

            this.setCurrentFrame(frame);
            this.remove(stage);

            this.isAction      = true;
            this.soundStopFlag = false;
        }
    }

    if (this.removeFlag) {
        return 0;
    }

    this.active = true;
    if (prevTags) {
        if (this.isSwap) {
            this.resetSwap();
        }

        var tags   = this.getTags();
        var length = tags.length;
        if (length && tags.toString() !== prevTags.toString()) {
            for (var depth in tags) {
                if (!tags.hasOwnProperty(depth)) {
                    continue;
                }

                var instanceId = tags[depth];
                if (depth in prevTags && instanceId === prevTags[depth]) {
                    continue;
                }

                var instance = myStage.getInstance(instanceId);
                if (instance && instance.getClassName() === "MovieClip") {
                    stage.newTags.unshift(instance);
                }
            }
        }
    }

    if (this.isLoad) {
        clipEvent.type = "enterFrame";
        this.dispatchEvent(clipEvent, stage);
        this.dispatchOnEvent("onEnterFrame", stage);
        this.addTouchEvent(stage);

        if (this.isAction) {
            this.isAction = false;
            var as = this.getActions(this.getCurrentFrame());
            if (as) {
                this.setActionQueue(as, stage);
            }
        }
    } else {
        // init action
        var initAction = myStage.initActions[this.getCharacterId()];
        if (typeof initAction === "function") {
            initAction.apply(this);
        }
    }
};

/**
 * nextFrame
 */
MovieClip.prototype.nextFrame = function ()
{
    var _this = this;
    var frame = _this.getCurrentFrame();
    frame++;
    _this.setNextFrame(frame);
    _this.stop();
};

/**
 * prevFrame
 */
MovieClip.prototype.prevFrame = function ()
{
    var frame = this.getCurrentFrame()|0;
    frame = (frame - 1)|0;
    this.setNextFrame(frame);
    this.stop();
};

/**
 * @returns {number}
 */
MovieClip.prototype.getCurrentFrame = function ()
{
    return this._currentframe;
};

/**
 * @param frame
 */
MovieClip.prototype.setCurrentFrame = function (frame)
{
    this._currentframe = frame|0;
};

/**
 * @param frame
 */
MovieClip.prototype.setNextFrame = function (frame)
{
    if (frame > 0 && this.getCurrentFrame() !== frame) {
        this.isAction = true;

        if (frame > this.getTotalFrames()) {
            frame = this.getTotalFrames()|0;
            this.isAction = false;
        }

        var maxFrame = (this.$max(frame, this.getCurrentFrame()) + 1)|0;
        var minFrame = this.$min(frame, this.getCurrentFrame())|0;

        var tag, tagId, depth, nextTag, nextTagId;
        var checked  = [];
        var stage    = this.getStage();
        var tags     = this.getTags();
        var nextTags = this.getTags(frame);

        var length = this.$max(tags.length, nextTags.length)|0;
        if (length) {
            depth = 0;
            while (depth < length) {
                tagId     = (depth in tags) ? tags[depth]|0 : 0;
                nextTagId = (depth in nextTags) ? nextTags[depth]|0 : 0;

                if (!tagId && !nextTagId) {
                    depth = (depth + 1)|0;
                    continue;
                }

                if (tagId && nextTagId) {
                    if (tagId === nextTagId) {
                        checked[tagId] = true;
                        depth = (depth + 1)|0;
                        continue;
                    }

                    tag     = stage.getInstance(tagId);
                    nextTag = stage.getInstance(nextTagId);

                    tag.reset();
                    nextTag.reset();

                    checked[tagId]     = true;
                    checked[nextTagId] = true;
                } else if (tagId) {
                    tag = stage.getInstance(tagId);
                    tag.reset();
                    checked[tagId] = true;
                } else if (nextTagId) {
                    nextTag = stage.getInstance(nextTagId);
                    nextTag.reset();
                    checked[nextTagId] = true;
                }

                depth = (depth + 1)|0;
            }
        }

        if (checked.length) {
            var chkFrame = minFrame;
            while (chkFrame < maxFrame) {
                var container = this.getTags(chkFrame);
                if (!container.length) {
                    chkFrame = (chkFrame + 1)|0;
                    continue;
                }

                chkFrame = (chkFrame + 1)|0;
                for (depth in container) {
                    if (!container.hasOwnProperty(depth)) {
                        continue;
                    }

                    tagId = container[depth|0]|0;
                    if (tagId in checked) {
                        continue;
                    }

                    checked[tagId] = true;
                    tag = stage.getInstance(tagId);
                    tag.reset();
                }
            }
        }

        this.setCurrentFrame(frame);
        this.soundStopFlag = false;

        var _root     = this.getDisplayObject("_root");
        var rootStage = _root.getStage();
        this.addActions(rootStage);
    }
};

/**
 * @returns {number}
 */
MovieClip.prototype.getTotalFrames = function ()
{
    return this._totalframes;
};

/**
 * @param frame
 */
MovieClip.prototype.setTotalFrames = function (frame)
{
    this._totalframes  = frame|0;
    this._framesloaded = frame|0;
};

/**
 * addLabel
 * @param frame
 * @param name
 */
MovieClip.prototype.addLabel = function (frame, name)
{
    name = name + "";
    this.labels[name.toLowerCase()] = frame|0;
};

/**
 * @param name
 * @returns {*}
 */
MovieClip.prototype.getLabel = function (name)
{
    name = name + "";
    return this.labels[name.toLowerCase()];
};

/**
 * @param frame
 * @param obj
 */
MovieClip.prototype.addSound = function (frame, obj)
{
    if (!(frame in this.sounds)) {
        this.sounds[frame] = [];
    }
    this.sounds[frame].push(obj);
};

/**
 * @returns {*}
 */
MovieClip.prototype.getSounds = function ()
{
    return this.sounds[this.getCurrentFrame()|0];
};

/**
 * @param sound
 */
MovieClip.prototype.startSound = function (sound)
{
    var stage   = this.getStage();
    var soundId = sound.SoundId|0;

    var tag = stage.getCharacter(soundId);
    if (!tag) {
        return 0;
    }

    var soundInfo = tag.SoundInfo;
    this.$startSound(sound.Audio, soundInfo);
    this.soundStopFlag = true;
};

/**
 * @param frame
 * @returns {*}
 */
MovieClip.prototype.getTags = function (frame)
{
    return this.container[frame || this.getCurrentFrame()] || [];
};

/**
 * @param frame
 * @param tags
 */
MovieClip.prototype.setRemoveTag = function (frame, tags)
{
    var removeTags = [];

    var length = tags.length|0;
    var i = 0;
    while (i < length) {
        var tag = tags[i];
        i = (i + 1)|0;

        removeTags[tag.Depth] = 1;
    }

    this.removeTags[frame] = removeTags;
};

/**
 * @param frame
 * @returns {*}
 */
MovieClip.prototype.getRemoveTags = function (frame)
{
    return this.removeTags[frame];
};

/**
 * @param stage
 */
MovieClip.prototype.remove = function (stage)
{
    var removeTags = this.getRemoveTags(this.getCurrentFrame());
    if (removeTags) {
        var myStage = this.getStage();
        var frame   = (this.getCurrentFrame() - 1)|0;
        var tags    = this.getTags(frame);
        for (var idx in tags) {
            if (!tags.hasOwnProperty(idx)) {
                continue;
            }

            var instanceId = tags[idx]|0;
            var tag = myStage.getInstance(instanceId);
            if (!tag) {
                continue;
            }

            if (tag.getClassName() === "MovieClip") {
                var depth = (tag.getDepth() + 16384)|0;
                if (!(depth in removeTags)) {
                    continue;
                }

                var clipEvent  = this.$clipEvent;
                clipEvent.type = "unload";
                this.dispatchEvent(clipEvent, stage);

                tag.reset();
            } else {
                if (!(idx in removeTags)) {
                    continue;
                }

                tag.reset();
            }
        }
    }
};

/**
 * resetCheck
 */
MovieClip.prototype.resetCheck = function ()
{
    var stage = this.getStage();

    var instances = this.getInstances();
    for (var id in instances) {
        if (!instances.hasOwnProperty(id)) {
            continue;
        }

        var instance = stage.getInstance(id);
        if (!instance || (!instance.getRatio() && !instance.removeFlag)) {
            continue;
        }

        instance.reset();
    }
};

/**
 * resetSwap
 */
MovieClip.prototype.resetSwap = function ()
{
    var _this = this;
    var stage = _this.getStage();
    var currentTags = _this.getTags();
    var totalFrames = _this.getTotalFrames() + 1;
    for (var frame = 1; frame < totalFrames; frame++) {
        var tags = _this.getTags(frame);
        var length = tags.length;
        if (length) {
            var resetTags = [];
            for (var depth in tags) {
                if (!tags.hasOwnProperty(depth)) {
                    continue;
                }

                depth |= 0;
                var tagId = tags[depth];
                var instance = stage.getInstance(tagId);
                if (!instance) {
                    delete tags[depth];
                    continue;
                }

                if (instance.active) {
                    continue;
                }

                if (instance.getLevel() !== depth) {
                    if (!(instance.getLevel() in currentTags)) {
                        instance._depth = null;
                        resetTags[instance.getLevel()] = tagId;
                    }
                    delete tags[depth];
                }
            }

            length = resetTags.length;
            if (length) {
                for (var level in resetTags) {
                    if (!resetTags.hasOwnProperty(level)) {
                        continue;
                    }
                    tags[level] = resetTags[level];
                }
            }
        }
    }
    _this.isSwap = false;
};

/**
 * reset
 */
MovieClip.prototype.reset = function ()
{
    var stage     = this.getStage();
    var instances = this.getInstances();
    for (var id in instances) {
        if (!instances.hasOwnProperty(id)) {
            continue;
        }

        var instance = stage.getInstance(id);
        if (instance.getClassName() === "MovieClip" && instance.getDepth() >= 0) {
            instance.removeMovieClip();
            if (instance.getDepth() < 0) {
                instance.removeFlag = false;
            }
        } else {
            instance.reset();
        }
    }

    var parent = this.getParent();
    if (parent && this.getLevel() !== this.getDepth()+16384) {
        parent.isSwap = true;
    }

    this.play();
    this.setCurrentFrame(1);
    this.clear();
    this.initParams();
    this.variables = {};
};

/**
 * init
 */
MovieClip.prototype.initParams = function ()
{
    this.active          = false;
    this.removeFlag      = false;
    this.isLoad          = false;
    this.isMask          = false;
    this.isAction        = true;
    this.soundStopFlag   = false;
    this._droptarget     = null;
    this._depth          = null;
    this._mask           = null;
    this._matrix         = null;
    this._colorTransform = null;
    this._filters        = null;
    this._blendMode      = null;
    this.buttonStatus    = "up";
    this.mouseEnabled    = true;
    this.setVisible(true);
    this.setEnabled(true);
};

/**
 * @param stage
 */
MovieClip.prototype.addTouchEvent = function (stage)
{
    var events = this.events;

    var moveEventHits    = stage.moveEventHits;
    var downEventHits    = stage.downEventHits;
    var upEventHits      = stage.upEventHits;
    var keyDownEventHits = stage.keyDownEventHits;
    for (var name in events) {
        if (!events.hasOwnProperty(name)) {
            continue;
        }
        var as = events[name];
        switch (name) {
            case "mouseDown":
                downEventHits[downEventHits.length] = {
                    as: as,
                    mc: this
                };
                break;
            case "mouseMove":
                moveEventHits[moveEventHits.length] = {
                    as: as,
                    mc: this
                };
                break;
            case "mouseUp":
                upEventHits[upEventHits.length] = {
                    as: as,
                    mc: this
                };
                break;
            case "keyDown":
                if (this.$isTouch) {
                    downEventHits[downEventHits.length] = {
                        as: as,
                        mc: this
                    };
                } else {
                    keyDownEventHits[keyDownEventHits.length] = {
                        as: as,
                        mc: this
                    };
                }
                break;
            case "keyUp":
                upEventHits[upEventHits.length] = {
                    as: as,
                    mc: this
                };
                break;
        }
    }

    var variables = this.variables;

    var onMouseDown = variables.onMouseDown;
    if (onMouseDown) {
        downEventHits[downEventHits.length] = {mc: this};
    }
    var onMouseMove = variables.onMouseMove;
    if (onMouseMove) {
        moveEventHits[moveEventHits.length] = {mc: this};
    }
    var onMouseUp = variables.onMouseUp;
    if (onMouseUp) {
        upEventHits[upEventHits.length] = {mc: this};
    }
};

/**
 * @param script
 * @returns {*}
 */
MovieClip.prototype.createActionScript = function (script)
{
    return (function (clip, origin)
    {
        var as = new ActionScript([], origin.constantPool, origin.register, origin.initAction);
        as.cache = origin.cache;
        as.scope = clip;
        return function ()
        {
            as.reset();
            as.variables["this"] = this;
            return as.execute(clip);
        };
    })(this, script);
};

/**
 * @param script
 * @param parent
 */
MovieClip.prototype.createActionScript2 = function (script, parent)
{
    return (function (clip, origin, chain)
    {
        return function ()
        {
            var as = new ActionScript([], origin.constantPool, origin.register, origin.initAction);
            as.parentId = origin.id; // todo
            as.cache    = origin.cache;
            as.scope    = clip;
            as.parent   = (chain) ? chain : null;
            if (as.register.length) {
                as.initVariable(arguments);
            }
            as.variables["this"] = this;
            return as.execute(clip);
        };
    })(this, script, parent);
};

/**
 * addFrameScript
 */
MovieClip.prototype.addFrameScript = function ()
{
    var args   = arguments;
    var length = args.length;
    var i = 0;
    while (i < length) {
        var frame = args[i];
        i = (i + 1)|0;

        var script = args[i];
        i = (i + 1)|0;

        if (typeof frame === "string") {
            frame = this.getLabel(frame)|0;
        } else {
            frame = (frame + 1)|0;
        }

        frame = frame|0;
        if (frame > 0 && this.getTotalFrames() >= frame) {
            var actions = this.actions;
            if (!(frame in actions)) {
                actions[frame] = [];
            }

            if (!script) {
                actions[frame] = [];
            } else {
                var aLen = actions[frame].length|0;
                actions[frame][aLen] = script;
            }
        }
    }
};

/**
 * @param stage
 */
MovieClip.prototype.addActions = function (stage)
{
    this.active = true;
    var myStage = this.getStage();

    if (this.isAction) {
        this.isAction = false;
        if (!this.isLoad) {

            // as3
            this.buildAVM2();

            // registerClass
            var RegClass = myStage.registerClass[this.getCharacterId()];
            if (typeof RegClass === "function") {
                this.variables.registerClass = new RegClass();
            }

            // clipEvent
            var clipEvent = this.$clipEvent;

            // initialize
            clipEvent.type = "initialize";
            this.dispatchEvent(clipEvent, stage);

            // construct
            clipEvent.type = "construct";
            this.dispatchEvent(clipEvent, stage);

            // load
            clipEvent.type = "load";
            this.dispatchEvent(clipEvent, stage);

            var onLoad = this.variables.onLoad;
            if (typeof onLoad === "function") {
                this.setActionQueue(onLoad, stage);
            }

            this.addTouchEvent(stage);
        }

        var action = this.getActions(this.getCurrentFrame());
        if (action) {
            this.setActionQueue(action, stage);
        }
    }

    var tags   = this.getTags();
    var length = tags.length;
    if (length) {
        for (var depth in tags) {
            if (!tags.hasOwnProperty(depth)) {
                continue;
            }

            var instanceId = tags[depth]|0;
            var instance   = myStage.getInstance(instanceId);
            if (!instance) {
                continue;
            }

            instance.addActions(stage);
        }
    }
};

/**
 * @param frame
 * @returns {*}
 */
MovieClip.prototype.getActions = function (frame)
{
    return this.actions[frame];

};

/**
 * @param frame
 * @param actionScript
 */
MovieClip.prototype.setActions = function (frame, actionScript)
{
    var actions = this.actions;
    if (!(frame in actions)) {
        actions[frame] = [];
    }

    var length = actions[frame].length;
    actions[frame][length] = this.createActionScript(actionScript);
};

/**
 * @param frame
 * @param action
 */
MovieClip.prototype.overWriteAction = function (frame, action)
{
    if (typeof frame === "string") {
        var label = this.getLabel(frame);
        if (label) {
            frame = label;
        }
    }

    frame |= 0;
    if (frame > 0 && this.getTotalFrames() >= frame) {
        this.actions[frame] = [action];
    }
};

/**
 * @param frame
 * @param action
 */
MovieClip.prototype.addAction = function (frame, action)
{
    if (typeof frame === "string") {
        var label = this.getLabel(frame);
        if (label) {
            frame = label;
        }
    }

    frame |= 0;
    if (frame > 0 && this.getTotalFrames() >= frame) {
        var actions = this.actions;
        if (!(frame in actions)) {
            actions[frame] = [];
        }

        var length = actions[frame].length;
        actions[frame][length] = action;
    }
};

/**
 * @param frame
 */
MovieClip.prototype.executeActions = function (frame)
{
    var actions = this.getActions(frame);
    if (actions) {
        var length = actions.length|0;

        var i = 0;
        while (i < length) {
            var action = actions[i];
            i = (i + 1)|0;

            action.apply(this);
        }
    }
};

/**
 * ASSetPropFlags
 */
MovieClip.prototype.ASSetPropFlags = function ()
{
    // object, properties, n, allowFalse
};

/**
 * @param rgb
 * @param alpha
 */
MovieClip.prototype.beginFill = function (rgb, alpha)
{
    this.getGraphics().beginFill(rgb, alpha);
};

/**
 * @param width
 * @param rgb
 * @param alpha
 * @param pixelHinting
 * @param noScale
 * @param capsStyle
 * @param jointStyle
 * @param miterLimit
 */
MovieClip.prototype.lineStyle = function (width, rgb, alpha, pixelHinting, noScale, capsStyle, jointStyle, miterLimit)
{
    this.getGraphics().lineStyle(width, rgb, alpha, pixelHinting, noScale, capsStyle, jointStyle, miterLimit);
};

/**
 * @param dx
 * @param dy
 */
MovieClip.prototype.moveTo = function (dx, dy)
{
    this.getGraphics().moveTo(dx, dy);
};

/**
 * @param dx
 * @param dy
 */
MovieClip.prototype.lineTo = function (dx, dy)
{
    this.getGraphics().lineTo(dx, dy);
};

/**
 * @param cx
 * @param cy
 * @param dx
 * @param dy
 */
MovieClip.prototype.curveTo = function (cx, cy, dx, dy)
{
    this.getGraphics().curveTo(cx, cy, dx, dy);
};

/**
 * clear
 */
MovieClip.prototype.clear = function ()
{
    this.getGraphics().clear();
};

/**
 * endFill
 */
MovieClip.prototype.endFill = function ()
{
    this.getGraphics().endFill();
};

/**
 * buildAVM2
 */
MovieClip.prototype.buildAVM2 = function ()
{
    return;
    var _this = this;
    var stage = _this.getStage();
    var symbol = stage.symbols[_this.getCharacterId()];
    if (symbol) {
        var symbols = symbol.split(".");
        var classMethod = symbols.pop();
        var length = symbols.length;
        var classObj = stage.avm2;
        var abcObj = stage.abc;
        for (var i = 0; i < length; i++) {
            classObj = classObj[symbols[i]];
            abcObj = abcObj[symbols[i]];
        }

        // build abc
        var DoABC = abcObj[classMethod];
        var ABCObj = new DoABC(_this);
        // classObj[classMethod] = ABCObj;
        _this.avm2 = ABCObj;
        // AVM2 init
        var AVM2 = ABCObj[classMethod];
        if (typeof AVM2 === "function") {
            _this.actions = [];
            AVM2.apply(_this, []);
        }
    }
};