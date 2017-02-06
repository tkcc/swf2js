/**
 * @constructor
 */
var Stage = function ()
{
    this.id         = stageId++;
    this.name       = "swf2js_" + this.id;
    this.intervalId = 0;
    this.frameRate  = 0;
    this.fileSize   = 0;
    this.stopFlag   = true;

    // options
    this.optionWidth  = 0;
    this.optionHeight = 0;
    this.callback     = null;
    this.tagId        = null;
    this.FlashVars    = {};
    this.quality      = "medium"; // low = 0.25, medium = 0.8, high = 1.0
    this.bgcolor      = null;

    // event
    this.mouse = new Mouse();

    // params
    this.context          = null;
    this.canvas           = null;
    this.preContext       = null;
    this.hitContext       = null;
    this.matrix           = [1,0,0,1,0,0];
    this._matrix          = [1,0,0,1,0,0];
    this._colorTransform  = [1,1,1,1,0,0,0,0];
    this.characters       = [];
    this.initActions      = [];
    this.exportAssets     = [];
    this.packages         = [];
    this.registerClass    = [];
    this.buttonHits       = [];
    this.downEventHits    = [];
    this.moveEventHits    = [];
    this.upEventHits      = [];
    this.keyDownEventHits = [];
    this.keyUpEventHits   = [];
    this.sounds           = [];
    this.loadSounds       = [];
    this.videos           = [];
    this.actions          = [];
    this.instances        = [];
    this.placeObjects     = [];
    this.fonts            = [];
    this.isAction         = true;
    this._global          = new Global();
    this.touchObj         = null;
    this.touchStatus      = "up";
    this.overObj          = null;
    this.touchEndAction   = null;
    this.imgUnLoadCount   = 0;
    this.scale            = 1;
    this.ratio            = 1;
    this.baseWidth        = 0;
    this.baseHeight       = 0;
    this.width            = 0;
    this.height           = 0;
    this.isHit            = false;
    this.isTouchEvent     = false;
    this.isLoad           = false;
    this.jpegTables       = null;
    this.backgroundColor  = "transparent";
    this.version          = 8;
    this.loadStatus       = 0;
    this.isClipDepth      = false;
    this.clipDepth        = 0;
    this.clipMc           = false;
    this.dragMc           = null;
    this.dragRules        = null;
    this.scaleMode        = "showAll";
    this.align            = "";
    this.avm2             = new Packages(this);
    this.abc              = new Packages(this);
    this.symbols          = [];
    this.abcFlag          = false;

    // render
    this.doneTags = [];
    this.newTags  = [];

    // init
    var mc = new MovieClip();
    mc.setStage(this);
    this.setParent(mc);
};

/**
 * util
 */
Stage.prototype = Object.create(Util.prototype);
Stage.prototype.constructor = Stage;

/**
 * @returns {number}
 */
Stage.prototype.getId = function ()
{
    return this.id;
};

/**
 * @param id
 */
Stage.prototype.setId = function (id)
{
    this.id = id;
};

/**
 * @returns {*}
 */
Stage.prototype.getParent = function ()
{
    return this.parent;
};

/**
 * @param parent
 */
Stage.prototype.setParent = function (parent)
{
    this.parent = parent;
};

/**
 * @returns {number|*}
 */
Stage.prototype.getVersion = function ()
{
    return this.version;
};

/**
 * @param version
 */
Stage.prototype.setVersion = function (version)
{
    this.version = version;
};

/**
 *
 * @returns {string}
 */
Stage.prototype.getBackgroundColor = function ()
{
    return this.backgroundColor;
};

/**
 * @param r
 * @param g
 * @param b
 */
Stage.prototype.setBackgroundColor = function (r, g, b)
{
    this.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
};

/**
 * @returns {Array}
 */
Stage.prototype.getGlobal = function ()
{
    return this._global;
};

/**
 * play
 */
Stage.prototype.play = function ()
{
    this.stopFlag = false;

    var enterFrame = function (stage) {
        var animation = stage.$requestAnimationFrame;
        return function () {
            animation(function () {
                if (stage.isLoad && !stage.stopFlag) {
                    stage.nextFrame();
                }
            }, 0);
        };
    };

    this.intervalId = this.$setInterval.call(
        null, enterFrame(this), this.getFrameRate()
    );
};

/**
 * stop
 */
Stage.prototype.stop = function ()
{
    this.stopFlag = true;
    this.$clearInterval.call(null, this.intervalId);
};

/**
 * @returns {*}
 */
Stage.prototype.getName = function ()
{
    return this.name;
};

/**
 * @param name
 */
Stage.prototype.setName = function (name)
{
    this.name = name;
};

/**
 * @param options
 */
Stage.prototype.setOptions = function (options)
{
    if (typeof options === "object") {
        this.optionWidth  = options.width      || this.optionWidth;
        this.optionHeight = options.height     || this.optionHeight;
        this.callback     = options.callback   || this.callback;
        this.tagId        = options.tagId      || this.tagId;
        this.FlashVars    = options.FlashVars  || this.FlashVars;
        this.quality      = options.quality    || this.quality;
        this.bgcolor      = options.bgcolor    || this.bgcolor;
    }

    this.setRatio();
};

/**
 * view ratio
 */
Stage.prototype.setRatio = function ()
{
    // quality
    switch (this.quality) {
        case "medium":
            this.ratio = this.$devicePixelRatio * 0.8;
            break;
        case "high":
            this.ratio = this.$devicePixelRatio;
            break;
        case "low":
            this.ratio = this.$devicePixelRatio * 0.5;
            break;
    }
};

/**
 * @returns {number}
 */
Stage.prototype.getBaseWidth = function ()
{
    return this.baseWidth;
};

/**
 * @param baseWidth
 */
Stage.prototype.setBaseWidth = function (baseWidth)
{
    this.baseWidth = baseWidth;
};

/**
 *
 * @returns {number}
 */
Stage.prototype.getBaseHeight = function ()
{
    return this.baseHeight;
};

/**
 * @param baseHeight
 */
Stage.prototype.setBaseHeight = function (baseHeight)
{
    this.baseHeight = baseHeight;
};

/**
 *
 * @returns {number}
 */
Stage.prototype.getWidth = function ()
{
    return this.width;
};

/**
 * @param width
 */
Stage.prototype.setWidth = function (width)
{
    if (width < 0) {
        width *= -1;
    }
    this.width = width;
};

/**
 * @returns {number}
 */
Stage.prototype.getHeight = function ()
{
    return this.height;
};

/**
 * @param height
 */
Stage.prototype.setHeight = function (height)
{
    if (height < 0) {
        height *= -1;
    }
    this.height = height;
};

/**
 * @returns {number}
 */
Stage.prototype.getScale = function ()
{
    return this.scale;
};

/**
 * @param scale
 */
Stage.prototype.setScale = function (scale)
{
    this.scale = scale;
};

/**
 * @returns {*}
 */
Stage.prototype.getMatrix = function ()
{
    return this.matrix;
};

/**
 * @param matrix
 */
Stage.prototype.setMatrix = function (matrix)
{
    this.matrix = matrix;
};

/**
 * @param id
 * @returns {*}
 */
Stage.prototype.getCharacter = function (id)
{
    return this.characters[id];
};

/**
 * @param id
 * @param obj
 */
Stage.prototype.setCharacter = function (id, obj)
{
    this.characters[id] = obj;
};

/**
 * @param id
 * @returns {*}
 */
Stage.prototype.getInstance = function (id)
{
    return this.instances[id|0];
};

/**
 * @param instance
 */
Stage.prototype.setInstance = function (instance)
{
    this.instances[instance.instanceId|0] = instance;
};

/**
 * @param instanceId
 * @param depth
 * @param frame
 * @returns {*}
 */
Stage.prototype.getPlaceObject = function (instanceId, depth, frame)
{
    var placeObjects = this.placeObjects;
    if (!(instanceId in placeObjects)) {
        return null;
    }

    var placeObject = placeObjects[instanceId];
    if (!(frame in placeObject)) {
        return null;
    }

    var tags = placeObject[frame];
    if (!(depth in tags)) {
        return null;
    }

    return tags[depth];
};

/**
 * @param placeObject
 * @param instanceId
 * @param depth
 * @param frame
 */
Stage.prototype.setPlaceObject = function (placeObject, instanceId, depth, frame)
{
    var placeObjects = this.placeObjects;
    if (!(instanceId in placeObjects)) {
        placeObjects[instanceId] = [];
    }

    if (!(frame in placeObjects[instanceId])) {
        placeObjects[instanceId][frame] = [];
    }

    placeObjects[instanceId][frame][depth] = placeObject;
};

/**
 * @param instanceId
 * @param depth
 * @param frame
 */
Stage.prototype.copyPlaceObject = function (instanceId, depth, frame)
{
    var placeObject = this.getPlaceObject(instanceId, depth, frame - 1);
    this.setPlaceObject(placeObject, instanceId, depth, frame);
};

/**
 * @param instanceId
 */
Stage.prototype.removePlaceObject = function (instanceId)
{
    delete this.placeObjects[instanceId];
};

/**
 * @returns {number}
 */
Stage.prototype.getFrameRate = function ()
{
    return this.frameRate;
};

/**
 * @param fps
 */
Stage.prototype.setFrameRate = function (fps)
{
    this.frameRate = (1000 / fps)|0;
};

/**
 * loadStatus CountUp
 */
Stage.prototype.loadEvent = function ()
{
    switch (this.loadStatus) {
        case 2:
            this.resize();
            this.loadStatus++;
            break;
        case 3:
            if (!this.isLoad || !this.stopFlag || this.imgUnLoadCount > 0) {
                break;
            }
            this.loadStatus++;
            this.loaded();
            break;
    }

    if (this.loadStatus !== 4) {
        var retry = (function (self)
        {
            return function()
            {
                self.loadEvent();
            };
        })(this);

        this.$setTimeout.call(null, retry, 0);
    }
};

/**
 * @param data
 * @param url
 */
Stage.prototype.parse = function (data, url)
{
    this.isLoad = false;
    var bitio   = new BitIO();
    var swftag  = new SwfTag(this, bitio);

    if (this.$canXHR2) {
        bitio.setData(new Uint8Array(data));
    } else {
        bitio.generate(data);
    }

    var mc  = this.getParent();
    mc._url = location.href;
    if (this.setSwfHeader(bitio, swftag)) {

        // parse
        var tags = swftag.parse(mc);

        // mc reset
        mc.container    = [];
        var frame       = 1;
        var totalFrames = mc.getTotalFrames() + 1;
        while (frame < totalFrames) {
            mc.container[frame] = [];
            frame = 0 | frame + 1;
        }
        mc.instances = [];

        // build
        swftag.build(tags, mc);

        var query = url.split("?")[1];
        if (query) {
            var values = query.split("&");
            var length = values.length;
            while (length) {
                length    = 0 | length - 1;
                var value = values[length];
                var pair  = value.split("=");
                if (pair.length > 1) {
                    mc.setVariable(pair[0], pair[1]);
                }
            }
        }

        // FlashVars
        var vars = this.FlashVars;
        for (var key in vars) {
            if (!vars.hasOwnProperty(key)) {
                continue;
            }
            mc.setVariable(key, vars[key]);
        }
    }

    this.isLoad = true;
};

/**
 * @param bitio
 * @param swftag
 * @returns {boolean}
 */
Stage.prototype.setSwfHeader = function (bitio, swftag)
{
    var data = bitio.data;

    // image
    switch (true) {
        case (data[0] === 0x89 && data[1] === 0x50 &&
              data[2] === 0x4E && data[3] === 0x47 &&
              data[4] === 0x0D && data[5] === 0x0A &&
              data[6] === 0x1A && data[7] === 0x0A): // PNG
        case (data[0] === 0x47 && data[1] === 0x49 && data[2] === 0x46): // GIF
        case (data[0] === 0xff && data[1] === 0xd8): // JPEG
        case (data[0] === 0x42 && data[1] === 0x4d): // BMP
            this.parseImage();
            return false;
        default:
            break;
    }

    // signature
    var signature = bitio.getHeaderSignature();

    // version
    var version = bitio.getVersion();
    this.setVersion(version);

    // file size
    var fileSize  = bitio.getUI32();
    this.fileSize = fileSize;

    switch (signature) {
        case "FWS": // No ZIP
            break;
        case "CWS": // ZLIB
            bitio.deCompress(fileSize, "ZLIB");
            break;
        case "ZWS": // TODO LZMA
            bitio.deCompress(fileSize, "LZMA");
            break;
    }

    var bounds    = swftag.rect();
    var frameRate = bitio.getUI16() / 0x100;
    bitio.getUI16(); // frameCount

    this.setBaseWidth(this.$ceil((bounds.xMax - bounds.xMin) / 20));
    this.setBaseHeight(this.$ceil((bounds.yMax - bounds.yMin) / 20));
    this.setFrameRate(frameRate);

    this.loadStatus += 1;

    return true;
};

/**
 * parseJPEG
 */
Stage.prototype.parseImage = function ()
{
    var self  = this;
    var image = self.$document.createElement("img");
    image.addEventListener("load", function ()
    {
        var width  = this.width|0;
        var height = this.height|0;

        var canvas       = this.$cacheStore.getCanvas();
        canvas.width     = width;
        canvas.height    = height;

        var imageContext = canvas.getContext("2d");
        imageContext.drawImage(this, 0, 0, width, height);
        self.setCharacter(1, imageContext);

        var shapeWidth  = (width * 20)|0;
        var shapeHeight = (height * 20)|0;

        self.setBaseWidth(width);
        self.setBaseHeight(height);

        var shape = {
            ShapeRecords: [
                {
                    FillStyle1: 1,
                    StateFillStyle0: 0,
                    StateFillStyle1: 1,
                    StateLineStyle: 0,
                    StateMoveTo: 0,
                    StateNewStyles: 0,
                    isChange: true
                },
                {
                    AnchorX: shapeWidth,
                    AnchorY: 0,
                    ControlX: 0,
                    ControlY: 0,
                    isChange: false,
                    isCurved: false
                },
                {
                    AnchorX: shapeWidth,
                    AnchorY: shapeHeight,
                    ControlX: 0,
                    ControlY: 0,
                    isChange: false,
                    isCurved: false
                },
                {
                    AnchorX: 0,
                    AnchorY: shapeHeight,
                    ControlX: 0,
                    ControlY: 0,
                    isChange: false,
                    isCurved: false
                },
                {
                    AnchorX: 0,
                    AnchorY: 0,
                    ControlX: 0,
                    ControlY: 0,
                    isChange: false,
                    isCurved: false
                },
                0
            ],
            fillStyles: {
                fillStyleCount: 1,
                fillStyles: [{
                    bitmapId: 1,
                    bitmapMatrix: [20, 0, 0, 20, 0, 0],
                    fillStyleType: 65
                }]
            },
            lineStyles: {
                lineStyleCount: 0,
                lineStyles: []
            }
        };

        var bounds = {
            xMin: 0,
            xMax: shapeWidth,
            yMin: 0,
            yMax: shapeHeight
        };
        var data = this.$vtc.convert(shape);

        self.setCharacter(2, {
            tagType: 22,
            data:    data,
            bounds:  bounds
        });

        var parent = self.getParent();
        var obj    = new Shape();
        obj.setParent(parent);
        obj.setStage(self);
        obj.setData(data);
        obj.setTagType(22);
        obj.setCharacterId(2);
        obj.setBounds(bounds);
        obj.setLevel(1);

        parent.container[1]    = [];
        parent.container[1][1] = obj.instanceId;

        var placeObject = new PlaceObject();
        self.setPlaceObject(placeObject, obj.instanceId, 1, 1);
        self.init();
    });

    image.src = this.getParent()._url;
};

/**
 * resize
 */
Stage.prototype.resize = function ()
{
    var div = this.$document.getElementById(this.getName());
    if (!div) {
        return 0;
    }

    var oWidth  = this.optionWidth;
    var oHeight = this.optionHeight;

    var element     = this.$document.documentElement;
    var innerWidth  = this.$max(element.clientWidth, window.innerWidth || 0);
    var innerHeight = this.$max(element.clientHeight, window.innerHeight || 0);

    var parent = div.parentNode;
    if (parent.tagName !== "BODY") {
        innerWidth  = parent.offsetWidth;
        innerHeight = parent.offsetHeight;
    }
    var screenWidth  = (oWidth > 0)  ? oWidth  : innerWidth;
    var screenHeight = (oHeight > 0) ? oHeight : innerHeight;

    var baseWidth  = this.getBaseWidth();
    var baseHeight = this.getBaseHeight();

    var scale  = +this.$min((screenWidth / baseWidth), (screenHeight / baseHeight));
    var width  = baseWidth  * scale;
    var height = baseHeight * scale;
    if (width !== this.getWidth() || height !== this.getHeight()) {
        // div
        var style    = div.style;
        style.width  = width  + "px";
        style.height = height + "px";
        style.top    = 0;
        style.left   = ((screenWidth / 2) - (width / 2)) + "px";

        width  = width  * this.$devicePixelRatio;
        height = height * this.$devicePixelRatio;

        this.setScale(scale);
        this.setWidth(width);
        this.setHeight(height);

        // main
        var canvas    = this.context.canvas;
        canvas.width  = width;
        canvas.height = height;

        // pre
        var preCanvas    = this.preContext.canvas;
        preCanvas.width  = width;
        preCanvas.height = height;

        // hit canvas
        var hitCanvas    = this.hitContext.canvas;
        hitCanvas.width  = width;
        hitCanvas.height = height;

        // tmp
        if (this.$isAndroid && this.$isChrome) {
            var tmpContext   = this.$tmpContext;
            var tmpCanvas    = tmpContext.canvas;
            tmpCanvas.width  = width;
            tmpCanvas.height = height;
        }

        var mc     = this.getParent();
        var mScale = scale * this.ratio / 20;
        this.setMatrix(mc.cloneArray([mScale, 0, 0, mScale, 0, 0]));
    }
};

/**
 * loaded
 */
Stage.prototype.loaded = function ()
{
    // reset
    this.buttonHits       = [];
    this.downEventHits    = [];
    this.moveEventHits    = [];
    this.upEventHits      = [];
    this.keyDownEventHits = [];
    this.keyUpEventHits   = [];
    this.actions          = [];

    // DOM
    this.deleteNode();

    // add canvas
    var div = this.$document.getElementById(this.getName());
    if (div) {
        var mc = this.getParent();
        mc.initFrame();
        mc.addActions(this);
        this.executeAction();

        // callback
        var callback = this.callback;
        if (typeof callback === "function") {
            callback.call(window, mc);
        }

        // set backgroundColor
        if (this.bgcolor) {
            this.backgroundColor = this.bgcolor;
        }

        // renders
        this.render();
        this.renderMain();

        var ctx    = this.context;
        var canvas = ctx.canvas;

        // load sound
        if (this.$isTouch) {
            var loadSounds = this.loadSounds;
            var length     = 0 | loadSounds.length;
            if (length) {
                var loadSound = function ()
                {
                    canvas.removeEventListener(this.$startEvent, loadSound);
                    for (var idx in loadSounds) {
                        if (!loadSounds.hasOwnProperty(idx)) {
                            continue;
                        }

                        var audio = loadSounds[idx];
                        audio.load();
                    }
                };

                canvas.addEventListener(this.$startEvent, loadSound);
            }
        }

        var self = this;
        canvas.addEventListener(this.$startEvent, function (event)
        {
            Util.prototype.$event = event;
            self.touchStart(event);
        });

        canvas.addEventListener(this.$moveEvent, function (event)
        {
            Util.prototype.$event = event;
            self.touchMove(event);
        });

        canvas.addEventListener(this.$endEvent, function (event)
        {
            Util.prototype.$event = event;
            self.touchEnd(event);
        });

        div.appendChild(canvas);

        this.play();
    }
};

/**
 * deleteNode
 */
Stage.prototype.deleteNode = function (tagId)
{
    var div = this.$document.getElementById(tagId ? tagId : this.getName());
    if (div) {
        var childNodes = div.childNodes;
        var length     = childNodes.length;
        if (length) {
            for (var idx in childNodes) {
                if (!childNodes.hasOwnProperty(idx)) {
                    continue;
                }

                div.removeChild(childNodes[idx]);
            }
        }
    }
};

/**
 * nextFrame
 */
Stage.prototype.nextFrame = function ()
{
    this.downEventHits    = [];
    this.moveEventHits    = [];
    this.upEventHits      = [];
    this.keyDownEventHits = [];
    this.keyUpEventHits   = [];

    // mouse event
    var parent      = this.getParent();
    var mouse       = this.mouse;
    var mouseEvents = mouse.events;

    var onMouseDown = mouseEvents.onMouseDown;
    if (onMouseDown) {
        this.downEventHits[this.downEventHits.length] = {as: onMouseDown, mc: parent};
    }

    var onMouseMove = mouseEvents.onMouseMove;
    if (onMouseMove) {
        this.moveEventHits[this.moveEventHits.length] = {as: onMouseMove, mc: parent};
    }

    var onMouseUp = mouseEvents.onMouseUp;
    if (onMouseUp) {
        this.upEventHits[this.upEventHits.length] = {as: onMouseUp, mc: parent};
    }

    stats.begin();
    this.putFrame();
    this.addActions();
    this.executeAction();
    this.render();
    this.renderMain();
    stats.end();

};

/**
 * putFrame
 */
Stage.prototype.putFrame = function ()
{
    this.newTags = [];
    var doneTags = this.doneTags;
    var length   = doneTags.length|0;
    if (length) {
        var clipEvent  = this.$clipEvent;
        clipEvent.type = "enterFrame";

        var i = 0;
        while (i < length) {
            var tag = doneTags[i];
            i = (i + 1)|0;

            tag.putFrame(this, clipEvent);
        }
    }
};

/**
 * addActions
 */
Stage.prototype.addActions = function ()
{
    var newTags = this.newTags;
    var length  = newTags.length|0;
    if (length) {
        var i = 0;
        while (i < length) {
            var tag = newTags[i];
            i = (i + 1)|0;

            tag.addActions(this);
        }
    }
};

/**
 * render
 */
Stage.prototype.render = function ()
{
    this.buttonHits = [];
    this.doneTags   = [];

    var ctx = this.preContext;

    // reset
    ctx.globalCompositeOperation = "source-over";
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // background color
    var backgroundColor = this.getBackgroundColor();
    switch (backgroundColor) {
        case "transparent":
        case false:
            // pre clear
            var canvas = ctx.canvas;
            ctx.clearRect(0, 0, canvas.width + 1, canvas.height + 1);

            // main clear
            var mainCtx = this.context;
            mainCtx.clearRect(0, 0, canvas.width + 1, canvas.height + 1);
            break;
        default:
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, this.getWidth() + 1, this.getHeight() + 1);
            break;
    }

    var mc = this.getParent();
    mc.render(ctx, this._matrix, this._colorTransform, this, true);
};

/**
 * executeAction
 */
Stage.prototype.executeAction = function ()
{
    if (this.isAction && this.actions.length) {
        this.isAction = false;

        var i = 0;
        while (i < this.actions.length) {
            var obj = this.actions[i];
            i = (i + 1)|0;

            var mc   = obj.mc;
            var args = obj.args || [];
            if (!mc.active) {
                continue;
            }

            var actions = obj.as;
            switch (typeof actions) {
                case "function":
                    actions.apply(mc, args);
                    break;
                default:
                    var length = actions.length|0;
                    var idx    = 0;
                    while (idx < length) {
                        if (!(idx in actions)) {
                            continue;
                        }

                        var action = actions[idx];
                        idx = (idx + 1)|0;

                        switch (typeof action) {
                            case "function":
                                action.apply(mc, args);
                                break;

                        }
                    }
                    break;
            }
        }
    }

    // reset
    this.actions  = [];
    this.isAction = true;
};

/**
 * @param mc
 * @param as
 */
Stage.prototype.buttonAction = function (mc, as)
{
    this.downEventHits    = [];
    this.moveEventHits    = [];
    this.upEventHits      = [];
    this.keyDownEventHits = [];
    this.keyUpEventHits   = [];

    as.execute(mc);
    this.executeAction();
};

/*
 * main canvas
 */
Stage.prototype.renderMain = function ()
{
    var preContext = this.preContext;
    var preCanvas  = preContext.canvas;
    var width      = preCanvas.width;
    var height     = preCanvas.height;

    if (width > 0 && height > 0) {
        var ctx = this.context;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.drawImage(preCanvas, 0, 0, width, height);
    }
};

/**
 * reset
 */
Stage.prototype.reset = function ()
{
    this.instanceId = 0;

    // new MovieClip
    var mc = new MovieClip();
    mc.reset();
    mc.setStage(this);

    // reset
    this.parent           = mc;
    this.characters       = [];
    this.instances        = [];
    this.buttonHits       = [];
    this.downEventHits    = [];
    this.moveEventHits    = [];
    this.upEventHits      = [];
    this.keyDownEventHits = [];
    this.keyUpEventHits   = [];
    this.sounds           = [];
    this.loadSounds       = [];
    this.actions          = [];
};

/**
 * init
 */
Stage.prototype.init = function ()
{
    var div;
    var doc    = this.$document;
    var stages = this.$stages;
    if (this.getId() in stages) {
        var tagId = this.tagId;
        if (tagId) {
            if (doc.readyState === "loading") {
                var reTry = function ()
                {
                    window.removeEventListener("DOMContentLoaded", reTry);
                    this.init();
                };
                window.addEventListener("DOMContentLoaded", reTry);
                return 0;
            }

            var container = doc.getElementById(tagId);
            if (!container) {
                alert("Not Found Tag ID:" + tagId);
                return 0;
            }

            div = doc.getElementById(this.getName());
            if (div) {
                this.deleteNode();
            } else {
                div    = doc.createElement("div");
                div.id = this.getName();
                container.appendChild(div);
            }
        } else {
            doc.body.insertAdjacentHTML("beforeend", "<div id='" + this.getName() + "'></div>");
        }
    }

    div = doc.getElementById(this.getName());
    if (div) {
        this.initStyle(div);
        this.loading();
    }

    if (!this.canvas) {
        this.initCanvas();
    }

    this.loadStatus += 1;
    this.loadEvent();
};

/**
 * @param div
 */
Stage.prototype.initStyle = function (div)
{
    var style = div.style;

    // set css
    style.position                       = "relative";
    style.top                            = "0";
    style.backgroundColor                = "transparent";
    style.overflow                       = "hidden";
    style["-webkit-backface-visibility"] = "hidden";

    var parent  = div.parentNode;
    var oWidth  = this.optionWidth;
    var oHeight = this.optionHeight;
    var width;
    var height;
    if (parent.tagName === "BODY") {
        width  = (oWidth > 0)  ? oWidth  : window.innerWidth;
        height = (oHeight > 0) ? oHeight : window.innerHeight;
    } else {
        width  = (oWidth > 0)  ? oWidth  : parent.offsetWidth;
        height = (oHeight > 0) ? oHeight : parent.offsetHeight;
    }

    style.width  = width + "px";
    style.height = height + "px";
    style['-webkit-user-select'] = "none";
};

/**
 * init canvas
 */
Stage.prototype.initCanvas = function ()
{
    var self = this;
    var style;
    var canvas    = self.$document.createElement("canvas");
    canvas.width  = 1;
    canvas.height = 1;

    style = canvas.style;

    // set css
    style.zIndex   = 0;
    style.position = "absolute";
    style.top      = 0;
    style.left     = 0;
    style.zoom     = 100 / self.ratio + "%";
    style["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)";
    style.MozTransformOrigin = "0 0";
    style.MozTransform       = "scale(" + 1 / self.ratio + ")";

    if (self.$isAndroid) {
        canvas.addEventListener("touchcancel", function ()
        {
            self.touchEnd(self.$event);
        });
    }

    if (!self.$isTouch) {
        window.addEventListener("keydown", self.$keyDownAction);
        window.addEventListener("keyup", self.$keyUpAction);
        window.addEventListener("keyup", function (event)
        {
            Util.prototype.$keyEvent = event;
            self.touchEnd(event);
        });
    }

    // main canvas
    self.context = canvas.getContext("2d");
    self.context.imageSmoothingEnabled = false;
    self.canvas  = canvas;

    // pre canvas
    var preCanvas    = self.$document.createElement("canvas");
    preCanvas.width  = 1;
    preCanvas.height = 1;

    self.preContext = preCanvas.getContext("2d");
    self.preContext.imageSmoothingEnabled = false;

    // hit canvas
    var hitCanvas    = self.$document.createElement("canvas");
    hitCanvas.width  = 1;
    hitCanvas.height = 1;

    self.hitContext = hitCanvas.getContext("2d");
    self.hitContext.imageSmoothingEnabled = false;
};

/**
 * loading
 */
Stage.prototype.loading = function ()
{
    var div = this.$document.getElementById(this.getName());
    var loadingId = this.getName() + "_loading";
    var css = "<style>";
    css += "#" + loadingId + " {\n";
    css += "position: absolute;\n";
    css += "top: 50%;\n";
    css += "left: 50%;\n";
    css += "margin: -24px 0 0 -24px;\n";
    css += "width: 50px;\n";
    css += "height: 50px;\n";
    css += "border-radius: 50px;\n";
    css += "border: 8px solid #dcdcdc;\n";
    css += "border-right-color: transparent;\n";
    css += "box-sizing: border-box;\n";
    css += "-webkit-animation: " + loadingId + " 0.8s infinite linear;\n";
    css += "animation: " + loadingId + " 0.8s infinite linear;\n";
    css += "} \n";
    css += "@-webkit-keyframes " + loadingId + " {\n";
    css += "0% {-webkit-transform: rotate(0deg);}\n";
    css += "100% {-webkit-transform: rotate(360deg);}\n";
    css += "} \n";
    css += "@keyframes " + loadingId + " {\n";
    css += "0% {transform: rotate(0deg);}\n";
    css += "100% {transform: rotate(360deg);}\n";
    css += "} \n";
    css += "</style>";

    div.innerHTML  = css;
    var loadingDiv = this.$document.createElement("div");
    loadingDiv.id  = loadingId;

    // append
    div.appendChild(loadingDiv);
};

/**
 * @param url
 * @param options
 */
Stage.prototype.reload = function (url, options)
{
    this.stop();

    if (this.loadStatus === 4) {
        this.deleteNode();
    }

    this.loadStatus = 0;
    this.isLoad     = false;
    this.reset();

    var swf2js = window.swf2js;
    return swf2js.load(url, {
        optionWidth:  options.optionWidth  || this.optionWidth,
        optionHeight: options.optionHeight || this.optionHeight,
        callback:     options.callback     || this.callback,
        tagId:        options.tagId        || this.tagId,
        FlashVars:    options.FlashVars    || this.FlashVars,
        quality:      options.quality      || this.quality,
        bgcolor:      options.bgcolor      || this.bgcolor,
        stage:        this
    });
};

/**
 * @param url
 * @param frame
 * @param width
 * @param height
 * @returns {*}
 */
Stage.prototype.output = function (url, frame, width, height)
{
    if (!this.isLoad || this.stopFlag) {
        var retry = (function (self, url, frame, width, height)
        {
            return function () {
                self.output(url, frame, width, height);
            };
        })(this, url, frame, width, height);

        return this.$setTimeout.call(null, retry, 500);
    }

    this.stop();
    frame  = frame  || 1;
    width  = width  || this.getWidth();
    height = height || this.getHeight();

    // resize
    var mc = this.getParent();
    mc.reset();
    mc.gotoAndStop(frame);
    if (width !== this.getWidth() || height !== this.getHeight()) {
        this.optionWidth = width;
        this.optionHeight = height;
        this.resize();
    }

    // action
    mc.addActions();

    // backgroundColor
    var canvas = this.preContext.canvas;
    var style  = canvas.style;
    style.backgroundColor = this.backgroundColor;

    // render
    this.render();

    // output
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("POST", url, true);
    xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttpRequest.onreadystatechange = function ()
    {
        var readyState = xmlHttpRequest.readyState|0;
        if (readyState === 4) {
            var status = xmlHttpRequest.status|0;
            switch (status) {
                case 200:
                case 304:
                    console.log("OUTPUT SUCCESS");
                    break;
                default :
                    alert(xmlHttpRequest.statusText);
                    break;
            }
        }
    };

    var base64 = canvas.toDataURL();
    xmlHttpRequest.send("data=" + encodeURIComponent(base64));
};

/**
 * @param event
 */
Stage.prototype.hitCheck = function (event)
{
    this.isHit     = false;
    var buttonHits = this.buttonHits;
    var length     = buttonHits.length|0;
    if (!length) {
        return 0;
    }

    var div    = this.$document.getElementById(this.getName());
    var bounds = div.getBoundingClientRect();

    var x = window.pageXOffset + bounds.left;
    var y = window.pageYOffset + bounds.top;

    var touchX = 0;
    var touchY = 0;

    if (this.$isTouch) {
        var changedTouche = event.changedTouches[0];
        touchX            = changedTouche.pageX;
        touchY            = changedTouche.pageY;
    } else {
        touchX = event.pageX;
        touchY = event.pageY;
    }

    touchX = touchX - x;
    touchY = touchY - y;

    var scale = this.getScale();
    touchX    = touchX / scale;
    touchY    = touchY / scale;

    var ctx       = this.hitContext;
    var hitCanvas = ctx.canvas;
    var hitWidth  = hitCanvas.width;
    var hitHeight = hitCanvas.height;

    var chkX = touchX * scale * this.ratio;
    var chkY = touchY * scale * this.ratio;

    if (this.abcFlag) {
        var parent = this.getParent();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, hitWidth, hitHeight);
        var ret = parent.hitCheck(ctx, [1,0,0,1,0,0], this, chkX, chkY);
        return (typeof ret === "object") ? ret : false;
    }

    var i = length;
    while (i) {
        var idx = (i - 1)|0;

        if (!(idx in buttonHits)) {
            i = (i - 1)|0;
            continue;
        }

        var hitObj = buttonHits[idx];
        i = (i - 1)|0;

        if (hitObj === undefined) {
            continue;
        }

        var hit = false;
        if (touchX >= hitObj.xMin && touchX <= hitObj.xMax &&
            touchY >= hitObj.yMin && touchY <= hitObj.yMax
        ) {
            var matrix = hitObj.matrix;
            if (matrix) {
                var mc     = hitObj.parent;
                var button = hitObj.button;

                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.clearRect(0, 0, hitWidth, hitHeight);
                if (button) {
                    hit = button.renderHitTest(ctx, matrix, this, chkX, chkY);
                } else {
                    hit = mc.renderHitTest(ctx, matrix, this, chkX, chkY);
                }
            } else {
                hit = true;
            }
        }

        if (hit) {
            event.preventDefault();
            this.isHit = true;
            return hitObj;
        }
    }

    return 0;
};

/**
 * @param actions
 * @param caller
 * @param event
 */
Stage.prototype.executeEventAction = function (actions, caller, event)
{
    var args = event || [];
    if (actions) {
        if (typeof actions === "function") {
            actions.apply(caller, args);
        } else {
            var length = actions.length|0;
            if (length) {
                var i = 0;
                while (i < length) {
                    var action = actions[i];
                    i = (i + 1)|0;
                    if (typeof action === "function") {
                        action.apply(caller, args);
                    }
                }
            }
        }
        this.executeAction();
    }
};

/**
 * @param event
 */
Stage.prototype.touchStart = function (event)
{
    if (this.touchStatus === "up") {
        this.touchStatus    = "down";
        this.isHit          = false;
        this.isTouchEvent   = true;
        this.touchEndAction = null;
        var downEventHits   = this.downEventHits;
        var length          = downEventHits.length|0;
        var mc, as;
        if (length) {
            event.preventDefault();

            var i = 0;
            while(i < length) {
                var obj = downEventHits[i];
                i = (i + 1)|0;

                mc = obj.mc;
                as = obj.as;
                if (!as) {
                    as = mc.variables.onMouseDown;
                }

                this.executeEventAction(as, obj.mc);
            }

            this.downEventHits = [];
        }

        var hitObj = this.hitCheck(event);
        if (this.isHit) {
            mc = hitObj.parent;
            if (mc.active) {
                mc.setButtonStatus("down");
                if (mc.getClassName() !== "TextField") {
                    this.executePress(mc, hitObj);
                } else {
                    this.appendTextArea(mc, hitObj);
                }
            }

            if (this.touchObj === null) {
                this.touchObj = hitObj;
            }
        }
    }
};

/**
 * @param mc
 * @param hitObj
 */
Stage.prototype.executePress = function (mc, hitObj)
{
    var events, press, onPress, rollOver, onRollOver;

    var isRender = false;

    var cEvent = new ClipEvent();

    events      = mc.events;
    var isTouch = this.$isTouch;
    if (isTouch) {
        rollOver = events.rollOver;
        if (rollOver) {
            cEvent.type   = "rollOver";
            cEvent.target = mc;
            isRender      = true;
            this.executeEventAction(rollOver, mc, [cEvent]);
        }

        onRollOver = mc.variables.onRollOver;
        if (typeof onRollOver === "function") {
            isRender = true;
            this.executeEventAction(onRollOver, mc);
        }
    }

    events = mc.events;
    press  = events.press;
    if (press) {
        cEvent.type   = "press";
        cEvent.target = mc;
        isRender      = true;
        this.executeEventAction(press, mc, [cEvent]);
    }

    onPress = mc.variables.onPress;
    if (typeof onPress === "function") {
        isRender = true;
        this.executeEventAction(onPress, mc);
    }

    var button = hitObj.button;
    if (button) {
        events = button.events;

        if (isTouch) {
            rollOver = events.rollOver;
            if (rollOver) {
                cEvent.type   = "rollOver";
                cEvent.target = button;
                this.executeEventAction(rollOver, button, [cEvent]);
            }

            onRollOver = button.variables.onRollOver;
            if (typeof onRollOver === "function") {
                this.executeEventAction(onRollOver, button);
            }
        }

        button.setButtonStatus("down");
        if (isTouch) {
            this.executeButtonAction(button, mc, "CondIdleToOverUp");
        }

        var actions = button.getActions();
        var length  = actions.length|0;
        if (length) {
            var touchObj = this.touchObj;

            var idx = 0;
            while (idx < length) {
                if (!(idx in actions)) {
                    idx = (idx + 1)|0;
                    continue;
                }

                var cond = actions[idx];
                if (cond.CondOverDownToOverUp && touchObj === null) {
                    this.touchEndAction = cond.ActionScript;
                    idx = (idx + 1)|0;
                    continue;
                }

                // enter
                var keyPress = cond.CondKeyPress|0;
                if (hitObj.CondKeyPress === 13 && hitObj.CondKeyPress !== keyPress) {
                    idx = (idx + 1)|0;
                    continue;
                }

                if (isTouch) {
                    if (keyPress === 13 ||
                        (keyPress >= 48 && keyPress <= 57) ||
                        cond.CondOverUpToOverDown
                    ) {
                        this.buttonAction(mc, cond.ActionScript);
                    }
                } else {
                    if (cond.CondOverUpToOverDown) {
                        this.buttonAction(mc, cond.ActionScript);
                    }
                }

                idx = (idx + 1)|0;
            }
        }

        press = events.press;
        if (press) {
            cEvent.type   = "press";
            cEvent.target = button;
            this.executeEventAction(press, button, [cEvent]);
        }

        onPress = button.variables.onPress;
        if (typeof onPress === "function") {
            this.executeEventAction(onPress, button);
        }

        var sprite = button.getSprite();
        sprite.startSound();

        button.addActions(this);
        this.executeAction();

        isRender = true;
    }

    if (isRender) {
        this.touchRender();
    }

};

/**
 * @param textField
 * @param hitObj
 */
Stage.prototype.appendTextArea = function (textField, hitObj)
{
    textField.inputActive = true;

    var element = this.$document.getElementById(textField.getTagName());
    if (!element) {
        var text;

        element = textField.input;

        var variable = textField.getProperty("variable");
        if (variable) {
            var mc = textField.getParent();
            text = mc.getProperty(variable);
            if (text === undefined) {
                text = textField.getVariable("text");
            }
        }

        if (text !== undefined) {
            element.value = text;
        }

        var maxLength = textField.getVariable("maxChars");
        if (maxLength) {
            element.maxLength = maxLength;
        }

        var border = textField.getVariable("border");
        if (border) {
            element.style.border = "1px solid black";
            var color = textField.getVariable("backgroundColor");
            element.style.backgroundColor = "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";
        }

        var scale  = this.getScale();
        var left   = hitObj.xMin;
        var top    = hitObj.yMin;
        var width  = hitObj.xMax - left;
        var height = hitObj.yMax - top;

        element.style.left   = this.$ceil(left * scale)   - 3 + "px";
        element.style.top    = this.$ceil(top * scale)    - 3 + "px";
        element.style.width  = this.$ceil(width * scale)  + 6 + "px";
        element.style.height = this.$ceil(height * scale) + 6 + "px";

        var div = this.$document.getElementById(this.getName());
        if (div) {
            div.appendChild(element);
            element.focus();
            var focus = function (el)
            {
                return function ()
                {
                    el.focus();
                };
            };
            this.$setTimeout.call(null, focus(element), 10);
        }
    }
};

/**
 * @param event
 */
Stage.prototype.touchMove = function (event)
{
    var mc, as, button, events;
    var dragOver, onDragOver, dragOut, onDragOut, rollOver, onRollOver, rollOut, onRollOut;

    var overObj       = this.overObj;
    var moveEventHits = this.moveEventHits;
    var cEvent        = new ClipEvent();

    var length = moveEventHits.length|0;
    if (length) {
        event.preventDefault();

        var i = 0;
        while (i < length) {
            var obj = moveEventHits[i];
            mc      = obj.mc;
            as      = obj.as;
            if (!as) {
                as = mc.variables.onMouseMove;
            }

            this.executeEventAction(as, mc);

            i = (i + 1)|0;
        }

        this.moveEventHits = [];
    }

    var isTouch = this.$isTouch;
    if (!isTouch || (isTouch && this.isTouchEvent)) {
        var hitObj   = null;
        var touchObj = this.touchObj;
        if (touchObj || this.touchStatus === "up") {
            hitObj = this.hitCheck(event);
        }

        var sprite;
        var isRender = false;
        if (!isTouch) {
            var canvas = this.canvas;
            if (this.isHit || touchObj) {
                canvas.style.cursor = (hitObj) ? "pointer" : "auto";
            } else {
                canvas.style.cursor = "auto";
            }
        }

        if (touchObj) {
            button = touchObj.button;
            mc     = touchObj.parent;

            if (mc.active) {
                this.overObj = hitObj;
                if (hitObj &&
                    hitObj.parent.instanceId === mc.instanceId &&
                    hitObj.button === button
                ) {
                    if (mc.getButtonStatus() === "up") {
                        mc.setButtonStatus("down");
                        events   = mc.events;
                        dragOver = events.dragOver;
                        if (dragOver) {
                            cEvent.type   = "dragOver";
                            cEvent.target = mc;
                            isRender      = true;
                            this.executeEventAction(dragOver, mc, [cEvent]);
                        }

                        onDragOver = mc.variables.onDragOver;
                        if (typeof onDragOver === "function") {
                            isRender = true;
                            this.executeEventAction(onDragOver, mc);
                        }
                    }

                    if (button && button.getButtonStatus() === "up") {
                        button.setButtonStatus("down");

                        // sound
                        sprite = button.getSprite();
                        sprite.startSound();

                        events   = button.events;
                        dragOver = events.dragOver;
                        if (dragOver) {
                            cEvent.type   = "dragOver";
                            cEvent.target = button;
                            isRender      = true;
                            this.executeEventAction(dragOver, button, [cEvent]);
                        }

                        onDragOver = button.variables.onDragOver;
                        if (typeof onDragOver === "function") {
                            isRender = true;
                            this.executeEventAction(onDragOver, button);
                        }

                        button.addActions(this);
                        this.executeAction();
                    }
                } else {
                    if (mc.getButtonStatus() === "down") {
                        events  = mc.events;
                        dragOut = events.dragOut;
                        if (dragOut) {
                            cEvent.type   = "dragOut";
                            cEvent.target = mc;
                            isRender      = true;
                            this.executeEventAction(dragOut, mc, [cEvent]);
                        }

                        onDragOut = mc.variables.onDragOut;
                        if (typeof onDragOut === "function") {
                            isRender = true;
                            this.executeEventAction(onDragOut, mc);
                        }
                    }
                    mc.setButtonStatus("up");

                    if (button) {
                        if (button.getButtonStatus() === "down") {
                            button.setButtonStatus("up");

                            events  = button.events;
                            dragOut = events.dragOut;
                            if (dragOut) {
                                cEvent.type   = "dragOut";
                                cEvent.target = button;
                                isRender      = true;
                                this.executeEventAction(dragOut, button, [cEvent]);
                            }

                            onDragOut = button.variables.onDragOut;
                            if (typeof onDragOut === "function") {
                                isRender = true;
                                this.executeEventAction(onDragOut, button);
                            }

                            button.addActions(this);
                            this.executeAction();
                        }
                    }
                }
            }
        } else if (hitObj) {

            if (overObj) {
                button = overObj.button;
                if (button && button !== hitObj.button) {
                    mc = overObj.parent;
                    if (mc.active) {
                        button.setButtonStatus("up");
                        this.executeButtonAction(button, mc, "CondOverUpToIdle");
                    }
                }
            }

            button = hitObj.button;
            mc     = hitObj.parent;
            if (!isTouch && mc.active) {
                if (!overObj || overObj.parent !== mc) {
                    events = mc.events;
                    rollOver = events.rollOver;
                    if (rollOver) {
                        cEvent.type   = "rollOver";
                        cEvent.target = mc;
                        isRender      = true;
                        this.executeEventAction(rollOver, mc, [cEvent]);
                    }

                    onRollOver = mc.variables.onRollOver;
                    if (typeof onRollOver === "function") {
                        isRender = true;
                        this.executeEventAction(onRollOver, mc);
                    }
                }
            }

            if (button) {
                button.setButtonStatus("over");
                sprite = button.getSprite();
                sprite.startSound();
                if (!isTouch) {
                    if (!overObj || overObj.button !== button) {
                        isRender = true;
                        this.executeButtonAction(button, mc, "CondIdleToOverUp");

                        events   = button.events;
                        rollOver = events.rollOver;
                        if (rollOver) {
                            cEvent.type   = "rollOver";
                            cEvent.target = button;
                            isRender      = true;
                            this.executeEventAction(rollOver, button, [cEvent]);
                        }

                        onRollOver = button.variables.onRollOver;
                        if (typeof onRollOver === "function") {
                            this.executeEventAction(onRollOver, button);
                        }
                    }
                }

                button.addActions(this);
                this.executeAction();
            }

            this.overObj = hitObj;
        } else if (this.touchStatus === "up") {
            this.overObj = null;
        }

        // RollOut
        if (!touchObj && overObj) {
            button = overObj.button;
            mc     = overObj.parent;
            if (mc.active) {
                if (!hitObj || hitObj.parent !== mc) {
                    mc.setButtonStatus("up");

                    events = mc.events;
                    rollOut = events.rollOut;
                    if (rollOut) {
                        cEvent.type   = "rollOut";
                        cEvent.target = mc;
                        isRender      = true;
                        this.executeEventAction(rollOut, mc, [cEvent]);
                    }

                    onRollOut = mc.variables.onRollOut;
                    if (typeof onRollOut === "function") {
                        isRender = true;
                        this.executeEventAction(onRollOut, mc);
                    }
                }

                if (button && (!hitObj || hitObj.button !== button)) {
                    button.setButtonStatus("up");
                    this.executeButtonAction(button, mc, "CondOverUpToIdle");

                    events = button.events;
                    rollOut = events.rollOut;
                    if (rollOut) {
                        cEvent.type   = "rollOut";
                        cEvent.target = button;
                        isRender      = true;
                        this.executeEventAction(rollOut, button, [cEvent]);
                    }

                    onRollOut = button.variables.onRollOut;
                    if (typeof onRollOut === "function") {
                        isRender = true;
                        this.executeEventAction(onRollOut, button);
                    }

                    button.addActions(this);
                    this.executeAction();
                }
            }
        }

        if (isRender) {
            this.touchRender();
        }
    }

    var dragMc = this.dragMc;
    if (dragMc) {
        event.preventDefault();
        dragMc.executeDrag();
        this.isHit = true;
    }
};

/**
 * @param event
 */
Stage.prototype.touchEnd = function (event)
{
    var button, mc, as, events, release, onRelease, releaseOutside, onReleaseOutside;

    var isTouch  = this.$isTouch;
    var cEvent   = new ClipEvent();
    var touchObj = this.touchObj;
    if (touchObj) {
        button = touchObj.button;
        if (button) {
            button.setButtonStatus("up");
        }
    }

    var upEventHits = this.upEventHits;
    var length = upEventHits.length|0;
    if (length) {
        event.preventDefault();

        var i = 0;
        while (i < length) {
            var obj = upEventHits[i];
            mc      = obj.mc;
            as      = obj.as;
            if (!as) {
                as = mc.variables.onMouseUp;
            }

            this.executeEventAction(as, obj.mc);

            i = (i + 1)|0;
        }

        this.upEventHits = [];
    }

    var hitObj = this.hitCheck(event);
    var dragMc = this.dragMc;
    if (dragMc) {
        hitObj = touchObj;
        this.isHit = true;
    }

    var isRender = false;
    if (touchObj) {
        mc = touchObj.parent;
        mc.setButtonStatus("up");
        button = touchObj.button;

        if (this.isHit) {
            var touchEndAction = this.touchEndAction;
            if (mc.active) {
                if (mc === hitObj.parent) {
                    if (touchEndAction !== null) {
                        isRender = true;
                        this.buttonAction(mc, touchEndAction);
                    }

                    events  = mc.events;
                    release = events.release;
                    if (release) {
                        isRender      = true;
                        cEvent.type   = "release";
                        cEvent.target = mc;
                        this.executeEventAction(release, mc, [cEvent]);

                    }
                    onRelease = mc.variables.onRelease;
                    if (typeof onRelease === "function") {
                        isRender = true;
                        this.executeEventAction(onRelease, mc);
                    }
                }

                if (button) {
                    if (button === hitObj.button) {
                        events  = button.events;
                        release = events.release;
                        if (release) {
                            cEvent.type   = "release";
                            cEvent.target = button;
                            this.executeEventAction(release, button, [cEvent]);
                        }

                        onRelease = button.variables.onRelease;
                        if (typeof onRelease === "function") {
                            this.executeEventAction(onRelease, button);
                        }
                    }

                    var status = "up";
                    if (!isTouch) {
                        if (hitObj && hitObj.button === button) {
                            status = "over";
                        }
                    }

                    button.setButtonStatus(status);

                    var sprite = button.getSprite("hit");
                    sprite.startSound();

                    button.addActions(this);
                    this.executeAction();

                    isRender = true;
                }
            }
        }

        if (mc.active && (!hitObj || mc !== hitObj.parent)) {
            events = mc.events;
            releaseOutside = events.releaseOutside;
            if (releaseOutside) {
                isRender      = true;
                cEvent.type   = "releaseOutside";
                cEvent.target = mc;
                this.executeEventAction(releaseOutside, mc, [cEvent]);

            }

            onReleaseOutside = mc.variables.onReleaseOutside;
            if (typeof onReleaseOutside === "function") {
                isRender = true;
                this.executeEventAction(onReleaseOutside, mc);
            }
        }

        if (button && (!hitObj || button !== hitObj.button)) {
            isRender = true;

            events = button.events;

            releaseOutside = events.releaseOutside;
            if (releaseOutside) {
                cEvent.type   = "releaseOutside";
                cEvent.target = button;
                this.executeEventAction(releaseOutside, button, [cEvent]);
            }

            onReleaseOutside = button.variables.onReleaseOutside;
            if (typeof onReleaseOutside === "function") {
                this.executeEventAction(onReleaseOutside, button);
            }

            button.setButtonStatus("up");
            button.addActions(this);
            this.executeAction();
        }
    }

    this.isHit        = false;
    this.isTouchEvent = false;
    this.touchObj     = null;
    this.touchStatus  = "up";

    if (!isTouch) {
        this.hitCheck(event);
        var canvas = this.canvas;
        canvas.style.cursor = (this.isHit) ? "pointer" : "auto";
    }

    if (hitObj) {
        var rollOver, onRollOver;

        mc = hitObj.parent;
        if (!touchObj || mc !== touchObj.parent) {
            events = mc.events;

            rollOver = events.rollOver;
            if (rollOver) {
                isRender      = true;
                cEvent.type   = "rollOver";
                cEvent.target = mc;
                this.executeEventAction(rollOver, mc, [cEvent]);
            }

            onRollOver = mc.variables.onRollOver;
            if (typeof onRollOver === "function") {
                isRender = true;
                this.executeEventAction(onRollOver, mc);
            }
        }

        button = hitObj.button;
        if (button) {
            if (!touchObj || button !== touchObj.button) {
                events = button.events;

                rollOver = events.rollOver;
                if (rollOver) {
                    isRender      = true;
                    cEvent.type   = "rollOver";
                    cEvent.target = button;
                    this.executeEventAction(rollOver, button, [cEvent]);
                }

                onRollOver = button.variables.onRollOver;
                if (typeof onRollOver === "function") {
                    isRender = true;
                    this.executeEventAction(onRollOver, button);
                }
            }
        }
    }

    if (isRender) {
        event.preventDefault();
        this.touchRender();
    }

    this.$keyEvent = null;
};

/**
 * @param button
 * @param mc
 * @param status
 */
Stage.prototype.executeButtonAction = function (button, mc, status)
{
    var actions = button.getActions();
    var length  = actions.length;
    if (length) {
        for (var idx in actions) {
            if (!actions.hasOwnProperty(idx)) {
                continue;
            }

            var cond = actions[idx];
            if (!cond[status]) {
                continue;
            }

            this.buttonAction(mc, cond.ActionScript);
        }
    }
};

/**
 * touchRender
 */
Stage.prototype.touchRender = function ()
{
    this.render();
    this.renderMain();
};