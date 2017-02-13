/*jshint bitwise: false*/
/**
 * @param stage
 * @param bitio
 * @constructor
 */
var SwfTag = function (stage, bitio)
{
    this.stage           = stage;
    this.bitio           = bitio;
    this.currentPosition = {x: 0, y: 0};
    this.jpegTables      = null;
};

/**
 * util
 */
SwfTag.prototype = Object.create(Util.prototype);
SwfTag.prototype.constructor = SwfTag;

/**
 * @returns {*}
 */
SwfTag.prototype.getStage = function()
{
    return this.stage;
};

/**
 * @returns {*}
 */
SwfTag.prototype.getBitIO = function()
{
    return this.bitio;
};

/**
 * @param mc
 * @returns {Array}
 */
SwfTag.prototype.parse = function (mc)
{
    var bitio  = this.getBitIO();
    var length = bitio.data.length|0;
    return this.parseTags(length, mc.characterId);
};

/**
 * @param tags
 * @param parent
 */
SwfTag.prototype.build = function (tags, parent)
{
    var length = tags.length|0;
    if (length) {
        var originTags = [];
        for (var frame in tags) {
            if (!tags.hasOwnProperty(frame)) {
                continue;
            }

            var tag = tags[frame];
            this.showFrame(tag, parent, originTags);
        }
    }
};

/**
 * @param obj
 * @param mc
 * @param originTags
 */
SwfTag.prototype.showFrame = function (obj, mc, originTags)
{
    var idx;
    var newDepth = [];
    var frame    = obj.frame;
    var stage    = this.getStage();

    if (!(frame in originTags)) {
        originTags[frame] = [];
    }
    mc.setTotalFrames(this.$max(mc.getTotalFrames(), frame));

    // add ActionScript
    var actions = obj.actionScript;
    if (actions.length) {
        for (idx in actions) {
            if (!actions.hasOwnProperty(idx)) {
                continue;
            }

            mc.setActions(frame, actions[idx]);
        }
    }

    // add label
    var labels = obj.labels;
    if (labels.length) {
        for (idx in labels) {
            if (!labels.hasOwnProperty(idx)) {
                continue;
            }

            var label = labels[idx];
            mc.addLabel(label.frame, label.name);
        }
    }

    // add sounds
    var sounds = obj.sounds;
    if (sounds.length) {
        for (idx in sounds) {
            if (!sounds.hasOwnProperty(idx)) {
                continue;
            }

            mc.addSound(frame, sounds[idx]);
        }
    }

    var cTags = obj.cTags;
    if (cTags.length) {
        for (idx in cTags) {
            if (!cTags.hasOwnProperty(idx)) {
                continue;
            }

            var tag = cTags[idx];
            newDepth[tag.Depth] = true;
            this.buildTag(frame, tag, mc, originTags);
        }
    }

    // remove tag
    var tags = obj.removeTags;
    if (tags.length) {
        mc.setRemoveTag(frame, tags);
        for (idx in tags) {
            if (!tags.hasOwnProperty(idx)) {
                continue;
            }

            var rTag = tags[idx];
            newDepth[rTag.Depth] = true;
        }
    }

    // copy
    if (frame > 1) {
        var prevFrame = (frame - 1)|0;
        var container = mc.container;
        if (prevFrame in container) {
            var prevTags = container[prevFrame];
            if (!(frame in container)) {
                container[frame] = [];
            }

            var length = prevTags.length|0;
            if (length) {
                var parentId = mc.instanceId;
                for (var depth in prevTags) {
                    if (!prevTags.hasOwnProperty(depth)) {
                        continue;
                    }

                    if (depth in newDepth) {
                        continue;
                    }

                    container[frame][depth] = prevTags[depth];
                    stage.copyPlaceObject(parentId, depth, frame);

                    originTags[frame][depth] = originTags[prevFrame][depth];
                }
            }
        }
    }
};

/**
 * @param frame
 * @param tag
 * @param parent
 * @param originTags
 */
SwfTag.prototype.buildTag = function (frame, tag, parent, originTags)
{
    var container = parent.container;
    if (!(frame in container)) {
        container[frame] = [];
    }

    var isCopy = true;
    if (tag.PlaceFlagMove) {
        var oTag = originTags[frame - 1][tag.Depth];
        if (oTag !== undefined) {
            if (tag.PlaceFlagHasCharacter) {
                if (tag.CharacterId !== oTag.CharacterId) {
                    isCopy = false;
                }
            } else {
                tag.PlaceFlagHasCharacter = oTag.PlaceFlagHasCharacter;
                tag.CharacterId           = oTag.CharacterId;
            }

            if (!tag.PlaceFlagHasMatrix && oTag.PlaceFlagHasMatrix) {
                tag.PlaceFlagHasMatrix = oTag.PlaceFlagHasMatrix;
                tag.Matrix             = oTag.Matrix;
            }

            if (!tag.PlaceFlagHasColorTransform && oTag.PlaceFlagHasColorTransform) {
                tag.PlaceFlagHasColorTransform = oTag.PlaceFlagHasColorTransform;
                tag.ColorTransform             = oTag.ColorTransform;
            }

            if (!tag.PlaceFlagHasClipDepth && oTag.PlaceFlagHasClipDepth) {
                tag.PlaceFlagHasClipDepth = oTag.PlaceFlagHasClipDepth;
                tag.ClipDepth             = oTag.ClipDepth;
            }

            if (!tag.PlaceFlagHasClipActions && oTag.PlaceFlagHasClipActions) {
                tag.PlaceFlagHasClipActions = oTag.PlaceFlagHasClipActions;
                tag.ClipActionRecords       = oTag.ClipActionRecords;
            }

            if (!tag.PlaceFlagHasRatio && !isCopy) {
                tag.PlaceFlagHasRatio = 1;
                tag.Ratio             = (frame - 1)|0;
            }

            if (!tag.PlaceFlagHasFilterList && oTag.PlaceFlagHasFilterList) {
                tag.PlaceFlagHasFilterList = oTag.PlaceFlagHasFilterList;
                tag.SurfaceFilterList      = oTag.SurfaceFilterList;
            }

            if (!tag.PlaceFlagHasBlendMode && oTag.PlaceFlagHasBlendMode) {
                tag.PlaceFlagHasBlendMode = oTag.PlaceFlagHasBlendMode;
                tag.BlendMode = oTag.BlendMode;
            }
        }
    }

    originTags[frame][tag.Depth] = tag;
    var buildObject = this.buildObject(tag, parent, isCopy, frame);
    if (buildObject) {
        var stage       = this.getStage();
        var placeObject = this.buildPlaceObject(tag);
        stage.setPlaceObject(placeObject, parent.instanceId, tag.Depth, frame);

        container[frame][tag.Depth] = buildObject.instanceId;
    }
};

/**
 * @param tag
 * @param parent
 * @param isCopy
 * @param frame
 * @returns {*}
 */
SwfTag.prototype.buildObject = function (tag, parent, isCopy, frame)
{
    var stage = this.getStage();
    var char  = stage.getCharacter(tag.CharacterId);
    if (!char) {
        return null;
    }

    var tagType = char.tagType;
    var isMorphShape = false;
    if (tagType === 46 || tagType === 84) {
        isMorphShape = true;
    }

    var obj = {};
    if (!isMorphShape && tag.PlaceFlagMove && isCopy) {
        var id = parent.container[frame - 1][tag.Depth];
        obj    = stage.getInstance(id);
    } else {
        if (char instanceof Array) {
            obj = this.buildMovieClip(tag, char, parent);
        } else {
            switch (tagType) {
                case 11: // DefineText
                case 33: // DefineText2
                    obj = this.buildText(tag, char);
                    break;
                case 37: // DefineEditText
                    obj = this.buildTextField(tag, char, parent);
                    break;
                case 2:  // DefineShape
                case 22: // DefineShape2
                case 32: // DefineShape3
                case 83: // DefineShape4
                    obj = this.buildShape(tag, char);
                    break;
                case 46: // MorphShape
                case 84: // MorphShape2
                    var MorphShape     = this.buildMorphShape(char, tag.Ratio);
                    MorphShape.tagType = tagType;
                    obj = this.buildShape(tag, MorphShape);
                    break;
                case 7: // DefineButton
                case 34: // DefineButton2
                    obj = this.buildButton(char, tag, parent);
                    break;
                default:
                    return 0;
            }
        }

        obj.setParent(parent);
        obj.setStage(stage);
        obj.setCharacterId(tag.CharacterId);
        obj.setRatio(tag.Ratio || 0);
        obj.setLevel(tag.Depth);
    }

    if (tag.PlaceFlagHasClipDepth) {
        obj.isClipDepth = true;
        obj.clipDepth   = tag.ClipDepth;
    }

    return obj;
};

/**
 * @param tag
 * @returns {PlaceObject}
 */
SwfTag.prototype.buildPlaceObject = function (tag)
{
    var placeObject = new PlaceObject();

    // Matrix
    if (tag.PlaceFlagHasMatrix) {
        placeObject.setMatrix(tag.Matrix);
    }

    // ColorTransform
    if (tag.PlaceFlagHasColorTransform) {
        placeObject.setColorTransform(tag.ColorTransform);
    }

    // Filter
    if (tag.PlaceFlagHasFilterList) {
        placeObject.setFilters(tag.SurfaceFilterList);
    }

    // BlendMode
    if (tag.PlaceFlagHasBlendMode) {
        placeObject.setBlendMode(tag.BlendMode);
    }

    return placeObject;
};


/**
 * @param tag
 * @param character
 * @param parent
 * @returns {MovieClip}
 */
SwfTag.prototype.buildMovieClip = function (tag, character, parent)
{
    var stage = this.getStage();
    var mc    = new MovieClip();
    mc._url   = parent._url;
    mc.setStage(stage);

    var target = "instance" + mc.instanceId;
    if (tag.PlaceFlagHasName) {
        mc.setName(tag.Name);
        target = tag.Name;
    }

    mc.setTarget(parent.getTarget() + "/" + target);
    this.build(character, mc);

    if (tag.PlaceFlagHasClipActions) {
        var ClipActionRecords = tag.ClipActionRecords;
        var length = 0 | ClipActionRecords.length;
        var eventName;
        var i = 0;
        while (i < length) {
            var actionRecord = ClipActionRecords[i];
            var eventFlag    = actionRecord.EventFlags;
            for (eventName in eventFlag) {
                if (!eventFlag.hasOwnProperty(eventName)) {
                    continue;
                }

                if (!eventFlag[eventName]) {
                    continue;
                }

                var action = mc.createActionScript(actionRecord.Actions);
                mc.addEventListener(eventName, action);
            }

            i = 0 | i + 1;
        }
    }

    return mc;
};

/**
 * @param tag
 * @param character
 * @param parent
 * @returns {TextField}
 */
SwfTag.prototype.buildTextField = function (tag, character, parent)
{
    var stage     = this.getStage();
    var textField = new TextField();
    textField.setStage(stage);
    textField.setParent(parent);
    textField.setInitParams();
    textField.setTagType(character.tagType);
    textField.setBounds(character.bounds);
    var target = "instance" + textField.instanceId;
    if (tag.PlaceFlagHasName) {
        textField.setName(tag.Name);
        target = tag.Name;
    }
    textField.setTarget(parent.getTarget() + "/" + target);

    var obj      = {};
    var data     = character.data;
    var fontData = null;
    var fontId   = data.FontID;
    if (data.HasFont) {
        fontData = stage.getCharacter(fontId);
    }

    textField.fontId    = fontId;
    textField.fontScale = data.FontHeight / 1024;
    if (fontData && fontData.ZoneTable) {
        textField.fontScale /= 20;
    }

    textField.initialText = data.InitialText;

    obj.autoSize = data.AutoSize;
    obj.border   = data.Border;
    if (obj.border) {
        obj.background = 1;
    }

    obj.bottomScroll  = 1;
    obj.condenseWhite = 0;
    obj.embedFonts    = (data.HasFont && data.UseOutlines && fontData.FontFlagsHasLayout && !data.Password) ? 1 : 0;
    obj.hscroll       = 0;
    obj.maxscroll     = 0;
    obj.scroll        = 0;
    obj.maxhscroll    = 0;
    obj.html          = data.HTML;
    obj.htmlText      = (data.HTML) ? data.InitialText : null;
    obj.length        = 0;
    obj.maxChars      = 0;
    obj.multiline     = data.Multiline;
    obj.password      = data.Password;
    obj.selectable    = data.NoSelect;
    obj.tabEnabled    = 0;
    obj.tabIndex      = 0;
    obj.text          = data.InitialText;
    obj.textColor     = data.TextColor;
    obj.textHeight    = 0;
    obj.textWidth     = 0;
    obj.type          = data.ReadOnly ? "dynamic" : "input";

    var variable = data.VariableName;
    obj.variable = variable;
    if (variable) {
        parent.setVariable(variable, data.InitialText);
    }

    obj.wordWrap = data.WordWrap;

    // TextFormat
    obj.blockIndent = 0;
    obj.bullet      = 0;

    if (fontData) {
        obj.bold   = fontData.FontFlagsBold;
        var font   = textField.getVariable("font");
        obj.font   = "'" + fontData.FontName + "', " + font;
        obj.italic = fontData.FontFlagsItalic;
    }

    if (data.HasLayout) {
        switch (data.Align) {
            case 1:
                obj.align = "right";
                break;
            case 2:
                obj.align = "center";
                break;
            case 3:
                obj.align = "justify";
                break;
        }
        obj.leftMargin  = data.LeftMargin;
        obj.rightMargin = data.RightMargin;
        obj.indent      = data.Indent;
        obj.leading     = (14400 > data.Leading) ? data.Leading : data.Leading - 65535;
    }

    obj.size      = data.FontHeight / 20;
    obj.tabStops  = [];
    obj.target    = null;
    obj.underline = 0;
    obj.url       = null;

    for (var name in obj) {
        if (!obj.hasOwnProperty(name)) {
            continue;
        }

        textField.setProperty(name, obj[name]);
    }

    if (obj.type === "input") {
        textField.setInputElement();
    }

    return textField;
};

/**
 * @param tag
 * @param character
 * @returns {StaticText}
 */
SwfTag.prototype.buildText = function (tag, character)
{
    var stage      = this.getStage();
    var staticText = new StaticText();
    staticText.setTagType(character.tagType);
    staticText.setBounds(character.bounds);

    var records     = character.textRecords;
    var length      = 0 | records.length;
    var offsetX     = 0;
    var offsetY     = 0;
    var scale       = 1;
    var textHeight  = 0;
    var ShapeTable  = null;
    var cMatrix     = character.matrix;
    var color       = null;
    var isZoneTable = false;
    var i = 0;
    while (i < length) {
        var record = records[i];
        if ("FontId" in record) {
            var fontId   = record.FontId;
            var fontData = stage.getCharacter(fontId);
            ShapeTable   = fontData.GlyphShapeTable;
            isZoneTable  = ("ZoneTable" in fontData);
        }

        if ("XOffset" in record) {
            offsetX = record.XOffset;
        }

        if ("YOffset" in record) {
            offsetY = record.YOffset;
        }

        if ("TextColor" in record) {
            color = record.TextColor;
        }

        if ("TextHeight" in record) {
            textHeight = record.TextHeight;
            if (isZoneTable) {
                textHeight /= 20;
            }
        }

        var entries = record.GlyphEntries;
        var count   = record.GlyphCount;
        scale       = textHeight / 1024;
        var idx     = 0;
        var vtc     = this.$vtc;
        while (idx < count) {
            var entry  = entries[idx];
            var shapes = ShapeTable[entry.GlyphIndex];
            var data   = vtc.convert(shapes);
            var matrix = [scale, cMatrix[1], cMatrix[2], scale, cMatrix[4] + offsetX, cMatrix[5] + offsetY];

            var textRecode = new TextRecord();
            textRecode.setData(data);
            textRecode.setColor(color);
            textRecode.setMatrix(matrix);
            staticText.addRecord(textRecode);
            offsetX += 0 | entry.GlyphAdvance;

            idx = 0 | idx + 1;
        }

        i = 0 | i + 1;
    }

    return staticText;
};

/**
 * @param tag
 * @param character
 * @returns {Shape}
 */
SwfTag.prototype.buildShape = function (tag, character)
{
    var shape = new Shape();
    shape.setTagType(character.tagType);
    shape.setBounds(character.bounds);
    shape.setData(character.data);
    return shape;
};

/**
 * @param character
 * @param tag
 * @param parent
 * @returns {SimpleButton}
 */
SwfTag.prototype.buildButton = function (character, tag, parent)
{
    var stage      = this.getStage();
    var characters = character.characters;

    var button = new SimpleButton();
    button.setStage(stage);
    button.setParent(parent);
    button.setLevel(tag.Depth);

    if ("actions" in character) {
        button.setActions(character.actions);
    }

    var target = "instance" + button.instanceId;
    if (tag.PlaceFlagHasName) {
        button.setName(tag.Name);
        target = tag.Name;
    }
    button.setTarget(parent.getTarget() + "/" + target);

    var downState = button.getSprite("down");
    if (character.ButtonStateDownSoundId) {
        downState.soundId   = character.ButtonStateDownSoundId;
        downState.soundInfo = character.ButtonStateDownSoundInfo;
    }

    var hitState = button.getSprite("hit");
    if (character.ButtonStateHitTestSoundId) {
        hitState.soundId   = character.ButtonStateHitTestSoundId;
        hitState.soundInfo = character.ButtonStateHitTestSoundInfo;
    }

    var overState = button.getSprite("over");
    if (character.ButtonStateOverSoundId) {
        overState.soundId   = character.ButtonStateOverSoundId;
        overState.soundInfo = character.ButtonStateOverSoundInfo;
    }

    var upState = button.getSprite("up");
    if (character.ButtonStateUpSoundId) {
        upState.soundId   = character.ButtonStateUpSoundId;
        upState.soundInfo = character.ButtonStateUpSoundInfo;
    }

    for (var depth in characters) {
        if (!characters.hasOwnProperty(depth)) {
            continue;
        }

        var tags = characters[depth];
        for (var idx in tags) {
            if (!tags.hasOwnProperty(idx)) {
                continue;
            }

            var bTag = tags[idx];
            var obj  = this.buildObject(bTag, button, false, 1);
            if (!obj) {
                continue;
            }

            var placeObject = this.buildPlaceObject(bTag);
            var Depth       = bTag.Depth;
            if (bTag.ButtonStateDown) {
                downState.addTag(Depth, obj);
                stage.setPlaceObject(placeObject, downState.instanceId, Depth, 0);
            }

            if (bTag.ButtonStateHitTest) {
                hitState.addTag(Depth, obj);
                stage.setPlaceObject(placeObject, hitState.instanceId, Depth, 0);
            }

            if (bTag.ButtonStateOver) {
                overState.addTag(Depth, obj);
                stage.setPlaceObject(placeObject, overState.instanceId, Depth, 0);
            }

            if (bTag.ButtonStateUp) {
                upState.addTag(Depth, obj);
                stage.setPlaceObject(placeObject, upState.instanceId, Depth, 0);
            }
        }
    }

    button.setSprite("down", downState);
    button.setSprite("hit",  hitState);
    button.setSprite("over", overState);
    button.setSprite("up",   upState);
    button.setTagType(character.tagType);

    return button;
};

/**
 * @param frame
 * @param characterId
 * @returns {{ }}
 */
SwfTag.prototype.generateDefaultTagObj = function (frame, characterId)
{
    return {
        frame:        frame,
        characterId:  characterId,
        cTags:        [],
        removeTags:   [],
        actionScript: [],
        labels:       [],
        sounds:       []
    };
};

/**
 * @param dataLength
 * @param characterId
 * @returns {Array}
 */
SwfTag.prototype.parseTags = function (dataLength, characterId)
{
    var frame   = 1;
    var tags    = [];
    var tagType = 0;
    var bitio   = this.getBitIO();

    // default set
    tags[frame] = this.generateDefaultTagObj(frame, characterId);

    while (bitio.byte_offset < dataLength) {
        var tagStartOffset = bitio.byte_offset;
        if (tagStartOffset + 2 > dataLength) {
            break;
        }

        var tagLength = bitio.getUI16();
        tagType       = tagLength >> 6;

        // long
        var length = tagLength & 0x3f;
        if (length === 0x3f) {
            if (tagStartOffset + 6 > dataLength) {
                bitio.byte_offset = tagStartOffset;
                bitio.bit_offset  = 0;
                break;
            }
            length = bitio.getUI32();
        }

        var tagDataStartOffset = bitio.byte_offset;
        if (tagType === 1) {
            frame = (frame+1)|0;
            if (dataLength > tagDataStartOffset + 2) {
                tags[frame] = this.generateDefaultTagObj(frame, characterId);
            }
        }

        var tag = this.parseTag(tagType, length);

        var o = (bitio.byte_offset - tagDataStartOffset)|0;
        if (o !== length) {
            if (o < length) {
                var eat = (length - o)|0;
                if (eat > 0) {
                    bitio.byte_offset = (bitio.byte_offset + eat)|0;
                }
            }
        }

        if (tag) {
            tags = this.addTag(tagType, tags, tag, frame);
        }

        bitio.bit_offset = 0;
    }

    return tags;
};

/**
 * @param tagType
 * @param length
 * @returns {*}
 */
SwfTag.prototype.parseTag = function (tagType, length)
{
    var obj   = null;
    var bitio = this.getBitIO();
    var stage = this.getStage();

    switch (tagType) {
        case 0: // End
            break;
        case 1: // ShowFrame
            break;
        case 2:  // DefineShape
        case 22: // DefineShape2
        case 32: // DefineShape3
        case 83: // DefineShape4
            if (length < 10) {
                bitio.byte_offset += length;
            } else {
                this.parseDefineShape(tagType);
            }
            break;
        case 9: // BackgroundColor
            stage.setBackgroundColor(
                bitio.getUI8(),
                bitio.getUI8(),
                bitio.getUI8()
            );
            break;
        case 10: // DefineFont
        case 48: // DefineFont2
        case 75: // DefineFont3
            this.parseDefineFont(tagType, length);
            break;
        case 13: // DefineFontInfo
        case 62: // DefineFontInfo2
            this.parseDefineFontInfo(tagType, length);
            break;
        case 11: // DefineText
        case 33: // DefineText2
            this.parseDefineText(tagType);
            break;
        case 4: // PlaceObject
        case 26: // PlaceObject2
        case 70: //PlaceObject3
            obj = this.parsePlaceObject(tagType, length);
            break;
        case 37: // DefineEditText
            this.parseDefineEditText(tagType);
            break;
        case 39: // DefineSprite
            this.parseDefineSprite(bitio.byte_offset + length);
            break;
        case 12: // DoAction
            obj = this.parseDoAction(length);
            break;
        case 59: // DoInitAction
            this.parseDoInitAction(length);
            break;
        case 5: // RemoveObject
        case 28: // RemoveObject2
            obj = this.parseRemoveObject(tagType);
            break;
        case 7: // DefineButton
        case 34: // DefineButton2
            obj = this.parseDefineButton(tagType, length);
            break;
        case 43: // FrameLabel
            obj = this.parseFrameLabel();
            break;
        case 88: // DefineFontName
            this.parseDefineFontName();
            break;
        case 20: // DefineBitsLossless
        case 36: // DefineBitsLossless2
            this.parseDefineBitsLossLess(tagType, length);
            break;
        case 6: // DefineBits
        case 21: // DefineBitsJPEG2
        case 35: // DefineBitsJPEG3
        case 90: // DefineBitsJPEG4
            this.parseDefineBits(tagType, length, this.jpegTables);
            break;
        case 8: // JPEGTables
            this.jpegTables = this.parseJPEGTables(length);
            break;
        case 56: // ExportAssets
            this.parseExportAssets();
            break;
        case 46: // DefineMorphShape
        case 84: // DefineMorphShape2
            this.parseDefineMorphShape(tagType);
            break;
        case 40: // NameCharacter
            bitio.getDataUntil("\0"); // NameCharacter
            break;
        case 24: // Protect
            bitio.byteAlign();
            break;
        case 63: // DebugID
            bitio.getUI8(); // UUID
            break;
        case 64: // EnableDebugger2
            bitio.getUI16(); // Reserved
            bitio.getDataUntil("\0"); // Password
            break;
        case 65: // ScriptLimits
            bitio.getUI16(); // MaxRecursionDepth
            bitio.getUI16(); // ScriptTimeoutSeconds
            break;
        case 69: // FileAttributes
            this.parseFileAttributes();
            break;
        case 77: // MetaData
            bitio.getDataUntil("\0"); // MetaData
            break;
        case 86: // DefineSceneAndFrameLabelData
            obj = this.parseDefineSceneAndFrameLabelData();
            break;
        case 18: // SoundStreamHead
        case 45: // SoundStreamHead2
            obj = this.parseSoundStreamHead(tagType);
            break;
        case 72: // DoABC
        case 82: // DoABC2
            this.parseDoABC(tagType, length);
            break;
        case 76: // SymbolClass
            this.parseSymbolClass();
            break;
        case 14: // DefineSound
            this.parseDefineSound(tagType, length);
            break;
        case 15: // StartSound
        case 89: // StartSound2
            obj = this.parseStartSound(tagType);
            break;
        case 17: // DefineButtonSound
            this.parseDefineButtonSound();
            break;
        case 73: // DefineFontAlignZones
            this.parseDefineFontAlignZones();
            break;
        case 74: // CSMTextSettings
            this.parseCSMTextSettings(tagType);
            break;
        case 19: // SoundStreamBlock
            this.parseSoundStreamBlock(tagType, length);
            break;
        case 60: // DefineVideoStream
            this.parseDefineVideoStream(tagType);
            break;
        case 61: // VideoFrame
            this.parseVideoFrame(tagType, length);
            break;
        case 78: // DefineScalingGrid
            this.parseDefineScalingGrid();
            break;
        case 41: // ProductInfo
            bitio.getUI32(); // ProductID
            bitio.getUI32(); // Edition
            bitio.getUI8(); // MajorVersion
            bitio.getUI8(); // MinorVersion
            bitio.getUI32(); // BuildLow
            bitio.getUI32(); // BuildHigh
            bitio.getUI32(); // CompilationDate
            bitio.getUI32(); // TODO
            break;
        case 3:  // FreeCharacter
        case 16: // StopSound
        case 23: // DefineButtonCxform
        case 25: // PathsArePostScript
        case 29: // SyncFrame
        case 31: // FreeAll
        case 38: // DefineVideo
        case 42: // DefineTextFormat
        case 44: // DefineBehavior
        case 47: // FrameTag
        case 49: // GeProSet
        case 52: // FontRef
        case 53: // DefineFunction
        case 54: // PlaceFunction
        case 55: // GenTagObject
        case 57: // ImportAssets
        case 58: // EnableDebugger
        case 66: // SetTabIndex
        case 71: // ImportAssets2
        case 87: // DefineBinaryData
        case 91: // DefineFont4
        case 93: // EnableTelemetry
            console.log("[base] tagType -> " + tagType);
            break;
        case 27: // 27 (invalid)
        case 30: // 30 (invalid)
        case 67: // 67 (invalid)
        case 68: // 68 (invalid)
        case 79: // 79 (invalid)
        case 80: // 80 (invalid)
        case 81: // 81 (invalid)
        case 85: // 85 (invalid)
        case 92: // 92 (invalid)
            break;
        default: // null
            break;
    }

    return obj;
};

/**
 * @param tagType
 * @param tags
 * @param tag
 * @param frame
 * @returns {*}
 */
SwfTag.prototype.addTag = function (tagType, tags, tag, frame)
{
    var tagsArray = tags[frame];
    switch (tagType) {
        case 4:  // PlaceObject
        case 26: // PlaceObject2
        case 70: // PlaceObject3
            var cTags = tagsArray.cTags;
            tagsArray.cTags[cTags.length] = tag;
            break;
        case 12: // DoAction
            var as = tagsArray.actionScript;
            tagsArray.actionScript[as.length] = tag;
            break;
        case 5: // RemoveObject
        case 28: // RemoveObject2
            var removeTags = tagsArray.removeTags;
            tagsArray.removeTags[removeTags.length] = tag;
            break;
        case 43: // FrameLabel
            var labels = tagsArray.labels;
            tag.frame  = frame;
            tagsArray.labels[labels.length] = tag;
            break;
        case 15: // StartSound
        case 89: // StartSound2
            var sounds = tagsArray.sounds;
            tagsArray.sounds[sounds.length] = tag;
            break;
    }

    return tags;
};

/**
 * @param tagType
 */
SwfTag.prototype.parseDefineShape = function (tagType)
{
    var bitio       = this.getBitIO();
    var characterId = bitio.getUI16();
    var bounds      = this.rect();

    if (tagType === 83) {
        var obj = {};
        obj.EdgeBounds = this.rect();
        bitio.getUIBits(5); // Reserved
        obj.UsesFillWindingRule   = bitio.getUIBits(1);
        obj.UsesNonScalingStrokes = bitio.getUIBits(1);
        obj.UsesScalingStrokes    = bitio.getUIBits(1);
    }

    var shapes = this.shapeWithStyle(tagType);
    this.appendShapeTag(characterId, bounds, shapes, tagType);
};

/**
 * @returns {{xMin: number, xMax: number, yMin: number, yMax: number}}
 */
SwfTag.prototype.rect = function ()
{
    var bitio = this.getBitIO();
    bitio.byteAlign();

    var nBits = bitio.getUIBits(5);
    return {
        xMin: bitio.getSIBits(nBits),
        xMax: bitio.getSIBits(nBits),
        yMin: bitio.getSIBits(nBits),
        yMax: bitio.getSIBits(nBits)
    };
};

/**
 * @param tagType
 * @returns {{}}
 */
SwfTag.prototype.shapeWithStyle = function (tagType)
{
    var bitio = this.getBitIO();

    var fillStyles, lineStyles;
    switch (tagType) {
        case 46:
        case 84:
            fillStyles = {fillStyleCount: 0, fillStyles: []};
            lineStyles = {lineStyleCount: 0, lineStyles: []};
            break;
        default:
            fillStyles = this.fillStyleArray(tagType);
            lineStyles = this.lineStyleArray(tagType);
            break;
    }

    var numBits      = bitio.getUI8();
    var NumFillBits  = numBits >> 4;
    var NumLineBits  = numBits & 0x0f;
    var ShapeRecords = this.shapeRecords(tagType, {
        FillBits: NumFillBits,
        LineBits: NumLineBits
    });

    return {
        fillStyles:   fillStyles,
        lineStyles:   lineStyles,
        ShapeRecords: ShapeRecords
    };
};

/**
 * @param tagType
 * @returns {{}}
 */
SwfTag.prototype.fillStyleArray = function (tagType)
{
    var bitio = this.getBitIO();

    var fillStyleCount = bitio.getUI8();
    if (tagType > 2 && fillStyleCount === 0xff) {
        fillStyleCount = bitio.getUI16();
    }

    var fillStyles = [];

    var i = 0;
    while (i < fillStyleCount) {
        fillStyles[fillStyles.length] = this.fillStyle(tagType);
        i = 0 | i + 1;
    }

    return {
        fillStyleCount: fillStyleCount,
        fillStyles:     fillStyles
    };
};

/**
 * @param tagType
 * @returns {{}}
 */
SwfTag.prototype.fillStyle = function (tagType)
{
    var bitio   = this.getBitIO();
    var bitType = bitio.getUI8();

    var obj = {};
    obj.fillStyleType = bitType;
    switch (bitType) {
        case 0x00:
            switch (tagType) {
                case 32:
                case 83:
                    obj.Color = this.rgba();
                    break;
                case 46:
                case 84:
                    obj.StartColor = this.rgba();
                    obj.EndColor   = this.rgba();
                    break;
                default:
                    obj.Color = this.rgb();
                    break;
            }
            break;
        case 0x10:
        case 0x12:
            switch (tagType) {
                case 46:
                case 84:
                    obj.startGradientMatrix = this.matrix();
                    obj.endGradientMatrix   = this.matrix();
                    obj.gradient            = this.gradient(tagType);
                    break;
                default:
                    obj.gradientMatrix = this.matrix();
                    obj.gradient       = this.gradient(tagType);
                    break;
            }
            break;
        case 0x13:
            obj.gradientMatrix = this.matrix();
            obj.gradient       = this.focalGradient(tagType);
            break;
        case 0x40:
        case 0x41:
        case 0x42:
        case 0x43:
            obj.bitmapId = bitio.getUI16();
            switch (tagType) {
                case 46:
                case 84:
                    obj.startBitmapMatrix = this.matrix();
                    obj.endBitmapMatrix   = this.matrix();
                    break;
                default:
                    obj.bitmapMatrix = this.matrix();
                    break;
            }
            break;
    }
    return obj;
};

/**
 * @returns {{}}
 */
SwfTag.prototype.rgb = function ()
{
    var bitio = this.getBitIO();
    return {
        R: bitio.getUI8(),
        G: bitio.getUI8(),
        B: bitio.getUI8(),
        A: 1
    };
};

/**
 * @returns {{}}
 */
SwfTag.prototype.rgba = function ()
{
    var bitio = this.getBitIO();
    return {
        R: bitio.getUI8(),
        G: bitio.getUI8(),
        B: bitio.getUI8(),
        A: bitio.getUI8() / 255
    };
};

/**
 * @returns {Array}
 */
SwfTag.prototype.matrix = function ()
{
    var bitio = this.getBitIO();
    bitio.byteAlign();

    var result = [1, 0, 0, 1, 0, 0];
    if (bitio.getUIBit()) {
        var nScaleBits = bitio.getUIBits(5);
        result[0]      = bitio.getSIBits(nScaleBits) / 0x10000;
        result[3]      = bitio.getSIBits(nScaleBits) / 0x10000;
    }

    if (bitio.getUIBit()) {
        var nRotateBits = bitio.getUIBits(5);
        result[1]       = bitio.getSIBits(nRotateBits) / 0x10000;
        result[2]       = bitio.getSIBits(nRotateBits) / 0x10000;
    }

    var nTranslateBits = bitio.getUIBits(5);

    result[4] = bitio.getSIBits(nTranslateBits);
    result[5] = bitio.getSIBits(nTranslateBits);

    return result;
};

/**
 * gradient
 * @param tagType
 * @returns {{SpreadMode: number, InterpolationMode: number, GradientRecords: Array}}
 */
SwfTag.prototype.gradient = function (tagType)
{
    var NumGradients;

    var SpreadMode        = 0;
    var InterpolationMode = 0;
    var GradientRecords   = [];

    var bitio = this.getBitIO();
    bitio.byteAlign();

    switch (tagType) {
        case 46:
        case 84:
            NumGradients = bitio.getUI8();
            break;
        default:
            SpreadMode        = bitio.getUIBits(2);
            InterpolationMode = bitio.getUIBits(2);
            NumGradients      = bitio.getUIBits(4);
            break;
    }

    var i = 0;
    while (i < NumGradients) {
        GradientRecords[GradientRecords.length] = this.gradientRecord(tagType);
        i = 0 | i + 1;
    }

    return {
        SpreadMode:        SpreadMode,
        InterpolationMode: InterpolationMode,
        GradientRecords:   GradientRecords
    };
};

/**
 * @param tagType
 * @returns {{}}
 */
SwfTag.prototype.gradientRecord = function (tagType)
{
    var bitio = this.getBitIO();
    switch (tagType) {
        case 46:
        case 84:
            return {
                StartRatio: bitio.getUI8() / 255,
                StartColor: this.rgba(),
                EndRatio:   bitio.getUI8() / 255,
                EndColor:   this.rgba()
            };
        default:
            var Ratio = bitio.getUI8();
            var Color = (tagType < 32) ? this.rgb() : this.rgba();
            return {
                Ratio: Ratio / 255,
                Color: Color
            };
    }
};

/**
 * @param tagType
 * @returns {{SpreadMode: number, InterpolationMode: number, GradientRecords: Array, FocalPoint: number}}
 */
SwfTag.prototype.focalGradient = function (tagType)
{
    var bitio = this.getBitIO();
    bitio.byteAlign();

    var SpreadMode        = bitio.getUIBits(2);
    var InterpolationMode = bitio.getUIBits(2);
    var numGradients      = bitio.getUIBits(4);
    var GradientRecords   = [];

    var i = 0;
    while (i < numGradients) {
        GradientRecords[GradientRecords.length] = this.gradientRecord(tagType);
        i = 0 | i + 1;
    }

    var FocalPoint = bitio.getFloat16();

    return {
        SpreadMode: SpreadMode,
        InterpolationMode: InterpolationMode,
        GradientRecords: GradientRecords,
        FocalPoint: FocalPoint
    };
};

/**
 * @param tagType
 * @returns {{lineStyleCount: number, lineStyles: Array}}
 */
SwfTag.prototype.lineStyleArray = function (tagType)
{
    var bitio = this.getBitIO();

    var lineStyleCount = bitio.getUI8();
    if (tagType > 2 && lineStyleCount === 0xff) {
        lineStyleCount = bitio.getUI16();
    }

    var lineStyles = [];
    var i = 0;
    while (i < lineStyleCount) {
        lineStyles[lineStyles.length] = this.lineStyles(tagType);
        i = 0 | i + 1;
    }

    return {
        lineStyleCount: lineStyleCount,
        lineStyles:     lineStyles
    };
};

/**
 * @param tagType
 * @returns {{}}
 */
SwfTag.prototype.lineStyles = function (tagType)
{
    var bitio = this.getBitIO();

    var obj = {};
    obj.fillStyleType = 0;
    switch (tagType) {
        case 46:
            obj = {
                StartWidth: bitio.getUI16(),
                EndWidth:   bitio.getUI16(),
                StartColor: this.rgba(),
                EndColor:   this.rgba()
            };
            break;
        case 84:
            obj.StartWidth       = bitio.getUI16();
            obj.EndWidth         = bitio.getUI16();
            obj.StartCapStyle    = bitio.getUIBits(2);
            obj.JoinStyle        = bitio.getUIBits(2);
            obj.HasFillFlag      = bitio.getUIBit();
            obj.NoHScaleFlag     = bitio.getUIBit();
            obj.NoVScaleFlag     = bitio.getUIBit();
            obj.PixelHintingFlag = bitio.getUIBit();

            bitio.getUIBits(5); // Reserved
            obj.NoClose     = bitio.getUIBit();
            obj.EndCapStyle = bitio.getUIBits(2);

            if (obj.JoinStyle === 2) {
                obj.MiterLimitFactor = bitio.getUI16();
            }

            if (obj.HasFillFlag) {
                obj.FillType = this.fillStyle(tagType);
            } else {
                obj.StartColor = this.rgba();
                obj.EndColor   = this.rgba();
            }
            break;
        case 83: // DefineShape4
            obj.Width            = bitio.getUI16();
            obj.StartCapStyle    = bitio.getUIBits(2);
            obj.JoinStyle        = bitio.getUIBits(2);
            obj.HasFillFlag      = bitio.getUIBit();
            obj.NoHScaleFlag     = bitio.getUIBit();
            obj.NoVScaleFlag     = bitio.getUIBit();
            obj.PixelHintingFlag = bitio.getUIBit();
            bitio.getUIBits(5); // Reserved
            obj.NoClose     = bitio.getUIBit();
            obj.EndCapStyle = bitio.getUIBits(2);

            if (obj.JoinStyle === 2) {
                obj.MiterLimitFactor = bitio.getUI16();
            }

            if (obj.HasFillFlag) {
                obj.FillType = this.fillStyle(tagType);
            } else {
                obj.Color = this.rgba();
            }
            break;
        case 32: // DefineShape3
            obj.Width = bitio.getUI16();
            obj.Color = this.rgba();
            break;
        default:  // DefineShape1or2
            obj.Width = bitio.getUI16();
            obj.Color = this.rgb();
            break;
    }

    return obj;
};

/**
 * @param tagType
 * @param currentNumBits
 * @returns {Array}
 */
SwfTag.prototype.shapeRecords = function (tagType, currentNumBits)
{
    var bitio = this.getBitIO();

    var shapeRecords     = [];
    this.currentPosition = {x: 0, y: 0};
    while (true) {
        // reset
        var shape = 0;

        var first6Bits = bitio.getUIBits(6);
        if (first6Bits & 0x20) {
            var numBits = first6Bits & 0x0f;
            if (first6Bits & 0x10) {
                shape = this.straightEdgeRecord(tagType, numBits);
            } else {
                shape = this.curvedEdgeRecord(tagType, numBits);
            }
        } else if (first6Bits) {
            shape = this.styleChangeRecord(tagType, first6Bits, currentNumBits);
        }

        shapeRecords[shapeRecords.length] = shape;
        if (shape === 0) {
            bitio.byteAlign();
            break;
        }
    }

    return shapeRecords;
};

/**
 * @param tagType
 * @param numBits
 * @returns {{}}
 */
SwfTag.prototype.straightEdgeRecord = function (tagType, numBits)
{
    var bitio  = this.getBitIO();
    var deltaX = 0;
    var deltaY = 0;

    var GeneralLineFlag = bitio.getUIBit();
    if (GeneralLineFlag) {
        deltaX = bitio.getSIBits(numBits + 2);
        deltaY = bitio.getSIBits(numBits + 2);
    } else {
        var VertLineFlag = bitio.getUIBit();
        if (VertLineFlag) {
            deltaY = bitio.getSIBits(numBits + 2);
        } else {
            deltaX = bitio.getSIBits(numBits + 2);
        }
    }

    var AnchorX = deltaX;
    var AnchorY = deltaY;

    switch (tagType) {
        case 46:
        case 84:
            break;
        default:
            AnchorX = this.currentPosition.x + deltaX;
            AnchorY = this.currentPosition.y + deltaY;

            // position
            this.currentPosition.x = AnchorX;
            this.currentPosition.y = AnchorY;
            break;
    }

    return {
        ControlX: 0,
        ControlY: 0,
        AnchorX:  AnchorX,
        AnchorY:  AnchorY,
        isCurved: false,
        isChange: false
    };
};

/**
 * @param tagType
 * @param numBits
 * @returns {{}}
 */
SwfTag.prototype.curvedEdgeRecord = function (tagType, numBits)
{
    var bitio = this.getBitIO();

    var controlDeltaX = bitio.getSIBits(numBits + 2);
    var controlDeltaY = bitio.getSIBits(numBits + 2);
    var anchorDeltaX  = bitio.getSIBits(numBits + 2);
    var anchorDeltaY  = bitio.getSIBits(numBits + 2);

    var ControlX = controlDeltaX;
    var ControlY = controlDeltaY;
    var AnchorX  = anchorDeltaX;
    var AnchorY  = anchorDeltaY;

    switch (tagType) {
        case 46:
        case 84:
            break;
        default:
            ControlX = this.currentPosition.x + controlDeltaX;
            ControlY = this.currentPosition.y + controlDeltaY;
            AnchorX  = ControlX + anchorDeltaX;
            AnchorY  = ControlY + anchorDeltaY;

            // position
            this.currentPosition.x = AnchorX;
            this.currentPosition.y = AnchorY;
            break;
    }

    return {
        ControlX: ControlX,
        ControlY: ControlY,
        AnchorX:  AnchorX,
        AnchorY:  AnchorY,
        isCurved: true,
        isChange: false
    };
};

/**
 * @param tagType
 * @param changeFlag
 * @param currentNumBits
 * @returns {{}}
 */
SwfTag.prototype.styleChangeRecord = function (tagType, changeFlag, currentNumBits)
{
    var bitio = this.getBitIO();

    var obj = {
        isChange:   true,
        FillStyle0: 0,
        FillStyle1: 0,
        LineStyle:  0
    };

    obj.StateNewStyles  = (changeFlag >> 4) & 1;
    obj.StateLineStyle  = (changeFlag >> 3) & 1;
    obj.StateFillStyle1 = (changeFlag >> 2) & 1;
    obj.StateFillStyle0 = (changeFlag >> 1) & 1;
    obj.StateMoveTo    = changeFlag & 1;

    if (obj.StateMoveTo) {
        var moveBits = bitio.getUIBits(5);
        obj.MoveX    = bitio.getSIBits(moveBits);
        obj.MoveY    = bitio.getSIBits(moveBits);

        // position
        this.currentPosition.x = obj.MoveX;
        this.currentPosition.y = obj.MoveY;
    }

    if (obj.StateFillStyle0) {
        obj.FillStyle0 = bitio.getUIBits(currentNumBits.FillBits);
    }

    if (obj.StateFillStyle1) {
        obj.FillStyle1 = bitio.getUIBits(currentNumBits.FillBits);
    }

    if (obj.StateLineStyle) {
        obj.LineStyle = bitio.getUIBits(currentNumBits.LineBits);
    }

    if (obj.StateNewStyles) {
        obj.FillStyles = this.fillStyleArray(tagType);
        obj.LineStyles = this.lineStyleArray(tagType);

        var numBits = bitio.getUI8();
        currentNumBits.FillBits = obj.NumFillBits = numBits >> 4;
        currentNumBits.LineBits = obj.NumLineBits = numBits & 0x0f;
    }

    return obj;
};

/**
 * @param characterId
 * @param bounds
 * @param shapes
 * @param tagType
 */
SwfTag.prototype.appendShapeTag = function (characterId, bounds, shapes, tagType)
{
    var stage = this.getStage();
    stage.setCharacter(characterId, {
        tagType: tagType,
        data:    this.$vtc.convert(shapes, false),
        bounds:  bounds
    });
};

/**
 * @param tagType
 * @param length
 */
SwfTag.prototype.parseDefineBitsLossLess = function (tagType, length)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var startOffset    = bitio.byte_offset;
    var CharacterId    = bitio.getUI16();
    var format         = bitio.getUI8();
    var width          = bitio.getUI16();
    var height         = bitio.getUI16();
    var isAlpha        = (tagType === 36);
    var colorTableSize = (format === 3) ? bitio.getUI8() + 1 : 0;

    // unCompress
    var sub = bitio.byte_offset - startOffset;
    var compressed = bitio.getData(length - sub);
    var data = bitio.unzip(compressed, false);

    // canvas
    var canvas    = this.$cacheStore.getCanvas();
    canvas.width  = width;
    canvas.height = height;

    var imageContext = canvas.getContext("2d");
    var imgData      = imageContext.createImageData(width, height);
    var pxData       = imgData.data;

    var idx   = 0;
    var pxIdx = 0;
    var x     = width;
    var y     = height;
    if (format === 5 && !isAlpha) {
        idx   = 0;
        pxIdx = 0;
        y = height;
        while (y) {
            y = 0 | y - 1;

            x = width;
            while (x) {
                x = 0 | x - 1;

                idx = 0 | idx + 1;
                pxData[pxIdx] = data[idx];
                idx   = 0 | idx + 1;
                pxIdx = 0 | pxIdx + 1;

                pxData[pxIdx] = data[idx];
                idx   = 0 | idx + 1;
                pxIdx = 0 | pxIdx + 1;

                pxData[pxIdx] = data[idx];
                idx   = 0 | idx + 1;
                pxIdx = 0 | pxIdx + 1;

                pxData[pxIdx] = 255;
                pxIdx = 0 | pxIdx + 1;
            }
        }
    } else {
        var bpp   = (isAlpha) ? 4 : 3;
        var cmIdx = 0 | colorTableSize * bpp;

        var pad = 0;
        if (colorTableSize) {
            pad = 0 | ((width + 3) & ~3) - width;
        }

        var isAlphaBug = this.$isAlphaBug;

        y = height;
        while (y) {
            y = 0 | y - 1;

            x = width;
            while (x) {
                x = 0 | x - 1;

                idx = (colorTableSize) ? data[cmIdx++] * bpp : cmIdx++ * bpp;
                idx |= 0;

                if (!isAlpha) {
                    pxData[pxIdx++] = data[idx];
                    idx   = 0 | idx + 1;
                    pxIdx = 0 | pxIdx + 1;

                    pxData[pxIdx++] = data[idx];
                    idx   = 0 | idx + 1;
                    pxIdx = 0 | pxIdx + 1;

                    pxData[pxIdx++] = data[idx];
                    idx   = 0 | idx + 1;
                    pxIdx = 0 | pxIdx + 1;

                    pxData[pxIdx] = 255;
                    idx   = 0 | idx + 1;
                    pxIdx = 0 | pxIdx + 1;
                } else {
                    var alpha = (format === 3) ? data[idx + 3] : data[idx];
                    idx = 0 | idx + 1;

                    if (!isAlphaBug) {
                        pxData[pxIdx] = data[idx] * 255 / alpha;
                        idx   = 0 | idx + 1;
                        pxIdx = 0 | pxIdx + 1;

                        pxData[pxIdx] = data[idx] * 255 / alpha;
                        idx   = 0 | idx + 1;
                        pxIdx = 0 | pxIdx + 1;

                        pxData[pxIdx] = data[idx] * 255 / alpha;
                        idx   = 0 | idx + 1;
                        pxIdx = 0 | pxIdx + 1;
                    } else {
                        pxData[pxIdx] = data[idx];
                        idx   = 0 | idx + 1;
                        pxIdx = 0 | pxIdx + 1;

                        pxData[pxIdx] = data[idx];
                        idx   = 0 | idx + 1;
                        pxIdx = 0 | pxIdx + 1;

                        pxData[pxIdx] = data[idx];
                        idx   = 0 | idx + 1;
                        pxIdx = 0 | pxIdx + 1;
                    }

                    pxData[pxIdx] = alpha;
                    pxIdx = 0 | pxIdx + 1;

                    if (format === 3) {
                        idx = 0 | idx + 1;
                    }
                }
            }

            cmIdx = 0 | cmIdx + pad;
        }
    }

    imageContext.putImageData(imgData, 0, 0);
    stage.setCharacter(CharacterId, imageContext);
};

/**
 * parseExportAssets
 */
SwfTag.prototype.parseExportAssets = function ()
{
    var bitio = this.getBitIO();
    var stage = this.getStage();
    var count = bitio.getUI16();

    var exportAssets = stage.exportAssets;
    var packages     = stage.packages;

    var idx = 0;
    while (idx < count) {
        var id   = bitio.getUI16();
        var name = bitio.getDataUntil("\0");
        if (name.substr(0, 10) === "__Packages") {
            packages[id] = 1;
        }
        exportAssets[name] = id;

        idx = 0 | idx + 1;
    }

    stage.exportAssets = exportAssets;
};

/**
 * @param length
 * @returns {string}
 */
SwfTag.prototype.parseJPEGTables = function (length)
{
    var bitio = this.getBitIO();
    return bitio.getData(length);
};

/**
 * @param tagType
 * @param length
 * @param jpegTables
 */
SwfTag.prototype.parseDefineBits = function (tagType, length, jpegTables)
{
    var bitio = this.getBitIO();

    var startOffset = bitio.byte_offset;
    var CharacterId = bitio.getUI16();
    var sub = bitio.byte_offset - startOffset;

    var ImageDataLen = length - sub;
    switch (tagType) {
        case 35:
        case 90:
            ImageDataLen = bitio.getUI32();
            break;
        default:
            break;
    }

    if (tagType === 90) {
        var DeblockParam = bitio.getUI16();
        console.log("TODO DeblockParam", DeblockParam);
    }

    var JPEGData = bitio.getData(ImageDataLen);
    var BitmapAlphaData = 0;
    switch (tagType) {
        case 35:
        case 90:
            BitmapAlphaData = bitio.getData(length - sub - ImageDataLen);
            break;
        default:
            break;
    }
    bitio.byte_offset = startOffset + length;

    // render
    var stage = this.getStage();
    stage.imgUnLoadCount++;

    var cacheStore = this.$cacheStore;

    var image = this.$document.createElement("img");
    image.addEventListener("load", function()
    {
        var width  = this.width;
        var height = this.height;

        var canvas       = cacheStore.getCanvas();
        canvas.width     = width;
        canvas.height    = height;
        var imageContext = canvas.getContext("2d");
        imageContext.drawImage(this, 0, 0, width, height);

        if (BitmapAlphaData) {
            var data    = bitio.unzip(BitmapAlphaData, false);
            var imgData = imageContext.getImageData(0, 0, width, height);
            var pxData  = imgData.data;
            var pxIdx   = 3;

            var len = width * height;
            var i = 0;
            while (i < len) {
                pxData[pxIdx] = data[i];
                pxIdx = 0 | pxIdx + 4;
                i = 0 | i + 1;
            }

            imageContext.putImageData(imgData, 0, 0);
        }

        stage.setCharacter(CharacterId, imageContext);
        stage.imgUnLoadCount--;
    });

    if (jpegTables !== null && jpegTables.length > 4) {
        var margeData = [];

        var len = 0 | jpegTables.length - 2;
        var idx = 0;
        while (idx < len) {
            margeData[margeData.length] = jpegTables[idx];
            idx = 0 | idx + 1;
        }

        len = 0 | JPEGData.length;
        idx = 2;
        while (idx < len) {
            margeData[margeData.length] = JPEGData[idx];
            idx = 0 | idx + 1;
        }

        JPEGData = margeData;
    }

    image.src = "data:image/jpeg;base64," +
        this.base64encode(this.parseJpegData(JPEGData));

    // for android bug
    if (this.$isAndroid) {
        var timer = this.$setTimeout;
        timer(function () {}, 0);
    }
};

/**
 * @param JPEGData
 * @returns {string}
 */
SwfTag.prototype.parseJpegData = function (JPEGData)
{
    var i   = 0;
    var idx = 0;
    var str = "";
    var length = 0 | JPEGData.length;

    // erroneous
    if (JPEGData[0] === 0xFF && JPEGData[1] === 0xD9 && JPEGData[2] === 0xFF && JPEGData[3] === 0xD8) {
        i = 4;
        while (i < length) {
            str += this.$fromCharCode(JPEGData[i]);
            i = 0 | i + 1;
        }
    } else if (JPEGData[0] === 0xFF && JPEGData[1] === 0xD8) {
        idx = 0;
        i = 2;
        while (idx < i) {
            str += this.$fromCharCode(JPEGData[idx]);
            idx = 0 | idx + 1;
        }

        while (i < length) {
            if (JPEGData[i] === 0xFF) {
                if (JPEGData[i + 1] === 0xD9 && JPEGData[i + 2] === 0xFF && JPEGData[i + 3] === 0xD8) {
                    i = 0 | i + 4;

                    idx = i;
                    while (idx < length) {
                        str += this.$fromCharCode(JPEGData[idx]);
                        idx = 0 | idx + 1;
                    }
                    break;
                } else if (JPEGData[i + 1] === 0xDA) {
                    idx = i;
                    while (idx < length) {
                        str += this.$fromCharCode(JPEGData[idx]);
                        idx = 0 | idx + 1;
                    }
                    break;
                } else {
                    var segmentLength = 0 | ((JPEGData[i + 2] << 8) + JPEGData[i + 3] + i + 2);

                    idx = i;
                    while (idx < segmentLength) {
                        str += this.$fromCharCode(JPEGData[idx]);
                        idx = 0 | idx + 1;
                    }

                    i = 0 | i + (segmentLength - i);
                }
            }
        }
    }

    return str;
};

/**
 * @param data
 * @returns {*}
 */
SwfTag.prototype.base64encode = function (data)
{
    if (this.$canBtoa) {
        return window.btoa(data);
    }

    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    var out    = [];
    var i      = 0;
    var length = data.length;
    while (i < length) {
        var c1 = data.charCodeAt(i) & 0xff;
        i = 0 | i + 1;

        if (i === length) {
            out[out.length] = base64EncodeChars.charAt(c1 >> 2);
            out[out.length] = base64EncodeChars.charAt((c1 & 0x3) << 4);
            out[out.length] = "==";
            break;
        }

        var c2 = data.charCodeAt(i);
        i = 0 | i + 1;

        if (i === length) {
            out[out.length] = base64EncodeChars.charAt(c1 >> 2);
            out[out.length] = base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out[out.length] = base64EncodeChars.charAt((c2 & 0xF) << 2);
            out[out.length] = "=";
            break;
        }

        var c3 = data.charCodeAt(i);
        i = 0 | i + 1;

        out[out.length] = base64EncodeChars.charAt(c1 >> 2);
        out[out.length] = base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out[out.length] = base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out[out.length] = base64EncodeChars.charAt(c3 & 0x3F);
    }

    return out.join("");
};

/**
 * @param tagType
 * @param length
 */
SwfTag.prototype.parseDefineFont = function (tagType, length)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var endOffset = bitio.byte_offset + length;

    var i   = 0;
    var len = 0;
    var obj = {};
    obj.tagType = tagType;
    obj.FontId  = bitio.getUI16();

    var numGlyphs = 0;
    switch (tagType) {
        case 48:
        case 75:
            var fontFlags            = bitio.getUI8();
            obj.FontFlagsHasLayout   = (fontFlags >>> 7) & 1;
            obj.FontFlagsShiftJIS    = (fontFlags >>> 6) & 1;
            obj.FontFlagsSmallText   = (fontFlags >>> 5) & 1;
            obj.FontFlagsANSI        = (fontFlags >>> 4) & 1;
            obj.FontFlagsWideOffsets = (fontFlags >>> 3) & 1;
            obj.FontFlagsWideCodes   = (fontFlags >>> 2) & 1;
            obj.FontFlagsItalic      = (fontFlags >>> 1) & 1;
            obj.FontFlagsBold        = (fontFlags) & 1;
            bitio.byteAlign();

            obj.LanguageCode = bitio.getUI8();
            obj.FontNameLen  = bitio.getUI8();
            if (obj.FontNameLen) {
                var startOffset = bitio.byte_offset;
                var data        = bitio.getData(obj.FontNameLen);

                var str = "";
                len = obj.FontNameLen;
                i = 0;
                while (i < len) {
                    if (data[i] > 127) {
                        i = 0 | i + 1;
                        continue;
                    }
                    str += this.$fromCharCode(data[i]);
                    i = 0 | i + 1;
                }

                var fontName;
                if (obj.FontFlagsShiftJIS || obj.LanguageCode === 2) {
                    fontName = bitio.decodeToShiftJis(str);
                } else {
                    fontName = decodeURIComponent(str);
                }

                obj.FontName = this.getFontName(fontName);
                bitio.byte_offset = startOffset + obj.FontNameLen;
            }

            numGlyphs = bitio.getUI16();
            obj.NumGlyphs = numGlyphs;
            break;
        default:
            break;
    }


    // offset
    var offset = bitio.byte_offset;
    if (tagType === 10) {
        numGlyphs = bitio.getUI16();
    }

    if (numGlyphs) {
        var OffsetTable = [];
        if (tagType === 10) {
            OffsetTable[0] = numGlyphs;
            numGlyphs /= 2;
            numGlyphs -= 1;
        }

        if (obj.FontFlagsWideOffsets) {
            i = 0;
            while (i < numGlyphs) {
                OffsetTable[OffsetTable.length] = bitio.getUI32();
                i = 0 | i + 1;
            }

            if (tagType !== 10) {
                obj.CodeTableOffset = bitio.getUI32();
            }
        } else {
            i = 0;
            while (i < numGlyphs) {
                OffsetTable[OffsetTable.length] = bitio.getUI16();
                i = 0 | i + 1;
            }

            if (tagType !== 10) {
                obj.CodeTableOffset = bitio.getUI16();
            }
        }

        // Shape
        var GlyphShapeTable = [];
        if (tagType === 10) {
            numGlyphs += 1;
        }

        i = 0;
        while (i < numGlyphs) {
            bitio.setOffset(OffsetTable[i] + offset, 0);

            var numBits     = bitio.getUI8();
            var NumFillBits = numBits >> 4;
            var NumLineBits = numBits & 0x0f;

            var currentNumBits = {
                FillBits: NumFillBits,
                LineBits: NumLineBits
            };

            var shapes = {};
            shapes.ShapeRecords = this.shapeRecords(tagType, currentNumBits);

            shapes.lineStyles = {
                lineStyles: [{
                    Color:         {R: 0, G: 0, B: 0, A: 1},
                    lineStyleType: 0
                }]
            };

            shapes.fillStyles = {
                fillStyles: [{
                    Color:         {R: 0, G: 0, B: 0, A: 1},
                    fillStyleType: 0
                }]
            };

            GlyphShapeTable[GlyphShapeTable.length] = shapes;

            i = 0 | i + 1;
        }
        obj.GlyphShapeTable = GlyphShapeTable;

        switch (tagType) {
            case 48:
            case 75:
                bitio.setOffset(obj.CodeTableOffset + offset, 0);
                var CodeTable = [];
                if (obj.FontFlagsWideCodes) {
                    i = 0;
                    while (i < numGlyphs) {
                        CodeTable[CodeTable.length] = bitio.getUI16();
                        i = 0 | i + 1;
                    }
                } else {
                    i = 0;
                    while (i < numGlyphs) {
                        CodeTable[CodeTable.length] = bitio.getUI8();
                        i = 0 | i + 1;
                    }
                }
                obj.CodeTable = CodeTable;

                if (obj.FontFlagsHasLayout) {
                    obj.FontAscent  = bitio.getUI16();
                    obj.FontDescent = bitio.getUI16();
                    obj.FontLeading = bitio.getUI16();

                    var FontAdvanceTable = [];
                    i = 0;
                    while (i < numGlyphs) {
                        FontAdvanceTable[FontAdvanceTable.length] = bitio.getUI16();
                        i = 0 | i + 1;

                    }
                    obj.FontAdvanceTable = FontAdvanceTable;

                    var FontBoundsTable = [];
                    i = 0;
                    while (i < numGlyphs) {
                        FontBoundsTable[FontBoundsTable.length] = this.rect();
                        i = 0 | i + 1;
                    }
                    obj.FontBoundsTable = FontBoundsTable;

                    if (tagType === 75) {
                        var count         = bitio.getUI16();
                        obj.KerningCount  = count;

                        i = 0;
                        var kRecord = [];
                        var flag = obj.FontFlagsWideCodes;
                        while (i < count) {
                            var FontKerningCode1 = (flag) ? bitio.getUI16() : bitio.getUI8();
                            var FontKerningCode2 = (flag) ? bitio.getUI16() : bitio.getUI8();
                            var FontKerningAdjustment = bitio.getSIBits(16);

                            kRecord[kRecord.length] = {
                                FontKerningCode1:      FontKerningCode1,
                                FontKerningCode2:      FontKerningCode2,
                                FontKerningAdjustment: FontKerningAdjustment
                            };
                            i = 0 | i + 1;
                        }

                        obj.KerningRecord = kRecord;
                    }
                }
                break;
            default:
                break;
        }

    }

    bitio.byte_offset = endOffset;
    stage.setCharacter(obj.FontId, obj);
    stage.fonts[obj.FontName] = obj;
};

/**
 * @param tagType
 * @param length
 */
SwfTag.prototype.parseDefineFontInfo = function (tagType, length)
{
    var bitio = this.getBitIO();
    var endOffset = bitio.byte_offset + length;

    var obj = {};
    obj.tagType = tagType;
    obj.FontId  = bitio.getUI16();

    var len  = bitio.getUI8();
    var data = bitio.getData(len);
    var str  = "";
    var i    = 0;
    while (i < len) {
        if (data[i] > 127) {
            continue;
        }

        str += this.$fromCharCode(data[i]);

        i = 0 | i + 1;
    }

    obj.FontFlagsReserved  = bitio.getUIBits(2);
    obj.FontFlagsSmallText = bitio.getUIBits(1);
    obj.FontFlagsShiftJIS  = bitio.getUIBits(1);
    obj.FontFlagsANSI      = bitio.getUIBits(1);
    obj.FontFlagsItalic    = bitio.getUIBits(1);
    obj.FontFlagsBold      = bitio.getUIBits(1);
    obj.FontFlagsWideCodes = bitio.getUIBits(1);
    if (tagType === 62) {
        obj.LanguageCode = bitio.getUI8();
    }

    var fontName;
    if (obj.FontFlagsShiftJIS || obj.LanguageCode === 2) {
        fontName = bitio.decodeToShiftJis(str);
    } else {
        fontName = decodeURIComponent(str);
    }
    obj.FontName = this.getFontName(fontName);

    bitio.byteAlign();

    var CodeTable = [];
    if (obj.FontFlagsWideCodes || tagType === 62) {
        while (bitio.byte_offset < endOffset) {
            CodeTable[CodeTable.length] = bitio.getUI16();
        }
    } else {
        while (bitio.byte_offset < endOffset) {
            CodeTable[CodeTable.length] = bitio.getUI8();
        }
    }
    obj.CodeTable = CodeTable;
};

/**
 * @param fontName
 * @returns {string}
 */
SwfTag.prototype.getFontName = function (fontName)
{
    var length = fontName.length;

    var str = fontName.substr(length - 1);
    if (str.charCodeAt(0) === 0) {
        fontName = fontName.slice(0, -1);
    }

    switch (fontName) {
        case "_sans":
            return "sans-serif";
        case "_serif":
            return "serif";
        case "_typewriter":
            return "monospace";
        default:
            var ander = fontName.substr(0, 1);
            if (ander === "_") {
                return "sans-serif";
            }
            return fontName;
    }
};

/**
 * parseDefineFontName
 */
SwfTag.prototype.parseDefineFontName = function ()
{
    var bitio = this.getBitIO();
    bitio.getUI16(); // FontId
    bitio.getDataUntil("\0"); // FontName
    bitio.getDataUntil("\0"); // FontCopyright
};

/**
 * @param tagType
 */
SwfTag.prototype.parseDefineText = function (tagType)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var obj = {};
    var characterId = bitio.getUI16();
    obj.tagType     = tagType;
    obj.bounds      = this.rect();
    obj.matrix      = this.matrix();

    var GlyphBits   = bitio.getUI8();
    var AdvanceBits = bitio.getUI8();
    obj.textRecords = this.getTextRecords(tagType, GlyphBits, AdvanceBits);

    stage.setCharacter(characterId, obj);
};

/**
 * @param tagType
 * @param GlyphBits
 * @param AdvanceBits
 * @returns {Array}
 */
SwfTag.prototype.getTextRecords = function (tagType, GlyphBits, AdvanceBits)
{
    var bitio   = this.getBitIO();
    var records = [];
    while (bitio.getUI8() !== 0) {
        bitio.incrementOffset(-1, 0);

        var obj = {};
        obj.TextRecordType       = bitio.getUIBits(1);
        obj.StyleFlagsReserved   = bitio.getUIBits(3);
        obj.StyleFlagsHasFont    = bitio.getUIBits(1);
        obj.StyleFlagsHasColor   = bitio.getUIBits(1);
        obj.StyleFlagsHasYOffset = bitio.getUIBits(1);
        obj.StyleFlagsHasXOffset = bitio.getUIBits(1);

        if (obj.StyleFlagsHasFont) {
            obj.FontId = bitio.getUI16();
        }

        if (obj.StyleFlagsHasColor) {
            if (tagType === 11) {
                obj.TextColor = this.rgb();
            } else {
                obj.TextColor = this.rgba();
            }
        }

        if (obj.StyleFlagsHasXOffset) {
            obj.XOffset = bitio.getUI16();
        }

        if (obj.StyleFlagsHasYOffset) {
            obj.YOffset = bitio.getUI16();
        }

        if (obj.StyleFlagsHasFont) {
            obj.TextHeight = bitio.getUI16();
        }

        obj.GlyphCount   = bitio.getUI8();
        obj.GlyphEntries = this.getGlyphEntries(obj.GlyphCount, GlyphBits, AdvanceBits);

        records[records.length] = obj;
    }

    return records;
};

/**
 * @param count
 * @param GlyphBits
 * @param AdvanceBits
 * @returns {Array}
 */
SwfTag.prototype.getGlyphEntries = function (count, GlyphBits, AdvanceBits)
{
    var bitio = this.getBitIO();

    var i = 0;
    var entries = [];
    while (i < count) {
        entries[entries.length] = {
            GlyphIndex:   bitio.getUIBits(GlyphBits),
            GlyphAdvance: bitio.getSIBits(AdvanceBits)
        };

        i = 0 | i + 1;
    }

    return entries;
};

/**
 * @param tagType
 */
SwfTag.prototype.parseDefineEditText = function (tagType)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var obj = {};

    obj.CharacterId = bitio.getUI16();
    var bounds = this.rect();

    var flag1 = bitio.getUI8();
    obj.HasText      = (flag1 >>> 7) & 1;
    obj.WordWrap     = (flag1 >>> 6) & 1;
    obj.Multiline    = (flag1 >>> 5) & 1;
    obj.Password     = (flag1 >>> 4) & 1;
    obj.ReadOnly     = (flag1 >>> 3) & 1;
    obj.HasTextColor = (flag1 >>> 2) & 1;
    obj.HasMaxLength = (flag1 >>> 1) & 1;
    obj.HasFont      = flag1 & 1;

    var flag2 = bitio.getUI8();
    obj.HasFontClass = (flag2 >>> 7) & 1;
    obj.AutoSize     = (flag2 >>> 6) & 1;
    obj.HasLayout    = (flag2 >>> 5) & 1;
    obj.NoSelect     = (flag2 >>> 4) & 1;
    obj.Border       = (flag2 >>> 3) & 1;
    obj.WasStatic    = (flag2 >>> 2) & 1;
    obj.HTML         = (flag2 >>> 1) & 1;
    obj.UseOutlines  = flag2 & 1;

    var isJis = 0;
    if (obj.HasFont) {
        obj.FontID   = bitio.getUI16();
        var fontData = stage.getCharacter(obj.FontID);
        isJis = (fontData.FontFlagsShiftJIS) ? 1 : 0;

        if (obj.HasFontClass) {
            obj.FontClass = bitio.getDataUntil("\0");
        }
        obj.FontHeight = bitio.getUI16();
    }

    if (obj.HasTextColor) {
        obj.TextColor = this.rgba();
    }

    if (obj.HasMaxLength) {
        obj.MaxLength = bitio.getUI16();
    }

    if (obj.HasLayout) {
        obj.Align       = bitio.getUI8();
        obj.LeftMargin  = bitio.getUI16();
        obj.RightMargin = bitio.getUI16();
        obj.Indent      = bitio.getUI16();
        obj.Leading     = bitio.getUI16();
    }

    var VariableName = bitio.getDataUntil("\0", isJis) + "";
    obj.VariableName = (VariableName === "") ? null : VariableName;
    obj.InitialText  = "";
    if (obj.HasText) {
        var text = bitio.getDataUntil("\0", isJis);
        if (obj.HTML) {
            if (text.indexOf("<sbr />") !== -1) {
                text = text.replace(new RegExp("<sbr />", "gi"), "\n");
            }

            if (text.indexOf("<b>") !== -1) {
                text = text.replace(new RegExp("<b>", "gi"), "");
                text = text.replace(new RegExp("</b>", "gi"), "");
            }

            var span = this.$document.createElement("span");
            span.innerHTML = text;

            var tags    = span.getElementsByTagName("p");
            var length  = 0 | tags.length;
            var tagData = [];
            var i = 0;
            while (i < length) {
                tagData[i] = tags[i];
                i = 0 | i + 1;
            }

            obj.InitialText = tagData;
        } else {
            obj.InitialText = text;
        }
    }

    stage.setCharacter(obj.CharacterId, {
        data:    obj,
        bounds:  bounds,
        tagType: tagType
    });
};

/**
 * @param tagType
 */
SwfTag.prototype.parseDefineMorphShape = function (tagType)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var obj = {};
    obj.tagType     = tagType;
    obj.CharacterId = bitio.getUI16();
    obj.StartBounds = this.rect();
    obj.EndBounds   = this.rect();

    if (tagType === 84) {
        obj.StartEdgeBounds = this.rect();
        obj.EndEdgeBounds   = this.rect();
        bitio.getUIBits(6); // Reserved
        obj.UsesNonScalingStrokes = bitio.getUIBits(1);
        obj.UsesScalingStrokes    = bitio.getUIBits(1);
    }

    var offset    = bitio.getUI32();
    var endOffset = bitio.byte_offset + offset;

    obj.MorphFillStyles = this.fillStyleArray(tagType);
    obj.MorphLineStyles = this.lineStyleArray(tagType);

    obj.StartEdges = this.shapeWithStyle(tagType);
    if (bitio.byte_offset !== endOffset) {
        bitio.byte_offset = endOffset;
    }

    obj.EndEdges = this.shapeWithStyle(tagType);

    // fill1 control
    var startPosition     = {x: 0, y: 0};
    var endPosition       = {x: 0, y: 0};
    var StartRecords      = obj.StartEdges.ShapeRecords;
    var EndRecords        = obj.EndEdges.ShapeRecords;
    var StartRecordLength = StartRecords.length;
    var EndRecordLength   = EndRecords.length;

    var length = this.$max(StartRecordLength, EndRecordLength);

    var i = 0;
    while (i < length) {
        var addRecode   = {};
        var StartRecord = StartRecords[i];
        var EndRecord   = EndRecords[i];
        if (!StartRecord && !EndRecord) {
            i = 0 | i + 1;
            continue;
        }

        if (!StartRecord.isChange && !EndRecord.isChange) {
            if (StartRecord.isCurved) {
                startPosition.x += StartRecord.ControlX + StartRecord.AnchorX;
                startPosition.y += StartRecord.ControlY + StartRecord.AnchorY;
            } else {
                startPosition.x += StartRecord.AnchorX;
                startPosition.y += StartRecord.AnchorY;
            }

            if (EndRecord.isCurved) {
                endPosition.x += EndRecord.ControlX + EndRecord.AnchorX;
                endPosition.y += EndRecord.ControlY + EndRecord.AnchorY;
            } else {
                endPosition.x += EndRecord.AnchorX;
                endPosition.y += EndRecord.AnchorY;
            }

            i = 0 | i + 1;
            continue;
        }

        if (StartRecord.isChange && !EndRecord.isChange) {
            addRecode = {
                FillStyle0:      StartRecord.FillStyle0,
                FillStyle1:      StartRecord.FillStyle1,
                LineStyle:       StartRecord.LineStyle,
                StateFillStyle0: StartRecord.StateFillStyle0,
                StateFillStyle1: StartRecord.StateFillStyle1,
                StateLineStyle:  StartRecord.StateLineStyle,
                StateMoveTo:     StartRecord.StateMoveTo,
                StateNewStyles:  StartRecord.StateNewStyles,
                isChange:        true
            };

            if (StartRecord.StateMoveTo) {
                addRecode.MoveX = endPosition.x;
                addRecode.MoveY = endPosition.y;
                startPosition.x = StartRecord.MoveX;
                startPosition.y = StartRecord.MoveY;
            }

            EndRecords.splice(i, 0, addRecode);
        } else if (!StartRecord.isChange && EndRecord.isChange) {
            addRecode = {
                FillStyle0:      EndRecord.FillStyle0,
                FillStyle1:      EndRecord.FillStyle1,
                LineStyle:       EndRecord.LineStyle,
                StateFillStyle0: EndRecord.StateFillStyle0,
                StateFillStyle1: EndRecord.StateFillStyle1,
                StateLineStyle:  EndRecord.StateLineStyle,
                StateMoveTo:     EndRecord.StateMoveTo,
                StateNewStyles:  EndRecord.StateNewStyles,
                isChange:        true
            };

            if (EndRecord.StateMoveTo) {
                addRecode.MoveX = startPosition.x;
                addRecode.MoveY = startPosition.y;
                endPosition.x   = EndRecord.MoveX;
                endPosition.y   = EndRecord.MoveY;
            }

            StartRecords.splice(i, 0, addRecode);
        } else {
            if (StartRecord.StateMoveTo) {
                startPosition.x = StartRecord.MoveX;
                startPosition.y = StartRecord.MoveY;
            }

            if (EndRecord.StateMoveTo) {
                endPosition.x = EndRecord.MoveX;
                endPosition.y = EndRecord.MoveY;
            }
        }

        i = 0 | i + 1;
    }


    var FillType  = 0;
    var FillStyle = 0;
    length = obj.StartEdges.ShapeRecords.length;
    i = 0;
    while (i < length) {
        var record = StartRecords[i];
        i = 0 | i + 1;

        if (!record.isChange) {
            continue;
        }

        if (record.StateFillStyle0) {
            FillStyle = record.FillStyle0;
        }

        if (FillStyle) {
            record.StateFillStyle0 = 1;
            record.StateFillStyle1 = 1;
            if (FillType) {
                record.FillStyle0 = 0;
                record.FillStyle1 = FillStyle;
            } else {
                record.FillStyle0 = FillStyle;
                record.FillStyle1 = 0;
            }
        } else {
            record.StateFillStyle1 = 1;
            record.FillStyle1 = 0;
        }

        FillType = (FillType) ? 0 : 1;
    }

    stage.setCharacter(obj.CharacterId, obj);
};

/**
 * @param char
 * @param ratio
 * @returns {{data: Array, bounds: {xMax: number, xMin: number, yMax: number, yMin: number}}}
 */
SwfTag.prototype.buildMorphShape = function (char, ratio)
{
    var per = (ratio === undefined) ? 0 : ratio / 65535;
    var startPer = 1 - per;
    var newShapeRecords = [];

    var morphLineStyles = char.MorphLineStyles;
    var lineStyles      = morphLineStyles.lineStyles;
    var lineStyleCount  = morphLineStyles.lineStyleCount;

    var morphFillStyles = char.MorphFillStyles;
    var fillStyles      = morphFillStyles.fillStyles;
    var fillStyleCount  = morphFillStyles.fillStyleCount;

    var StartEdges        = char.StartEdges;
    var StartShapeRecords = StartEdges.ShapeRecords;

    var EndEdges        = char.EndEdges;
    var EndShapeRecords = EndEdges.ShapeRecords;

    var shapes = {
        lineStyles: {
            lineStyleCount: lineStyleCount,
            lineStyles:     []
        },
        fillStyles: {
            fillStyleCount: fillStyleCount,
            fillStyles:     []
        },
        ShapeRecords: []
    };

    var position = {x: 0, y: 0};
    var len = StartShapeRecords.length;
    for (var i = 0; i < len; i++) {
        var StartRecord = StartShapeRecords[i];
        if (!StartRecord) {
            continue;
        }

        var newRecord = {};
        var EndRecord = EndShapeRecords[i];
        if (StartRecord.isChange) {
            var MoveX = 0;
            var MoveY = 0;

            if (StartRecord.StateMoveTo === 1) {
                MoveX      = StartRecord.MoveX * startPer + EndRecord.MoveX * per;
                MoveY      = StartRecord.MoveY * startPer + EndRecord.MoveY * per;
                position.x = MoveX;
                position.y = MoveY;
            }

            newRecord = {
                FillStyle0:       StartRecord.FillStyle0,
                FillStyle1:      StartRecord.FillStyle1,
                LineStyle:       StartRecord.LineStyle,
                MoveX:           MoveX,
                MoveY:           MoveY,
                StateFillStyle0: StartRecord.StateFillStyle0,
                StateFillStyle1: StartRecord.StateFillStyle1,
                StateLineStyle:  StartRecord.StateLineStyle,
                StateMoveTo:     StartRecord.StateMoveTo,
                StateNewStyles:  StartRecord.StateNewStyles,
                isChange:        true
            };
        } else {
            var AnchorX = 0;
            var AnchorY = 0;
            var ControlX = 0;
            var ControlY = 0;

            var startAnchorX = StartRecord.AnchorX;
            var startAnchorY = StartRecord.AnchorY;
            var endAnchorX   = EndRecord.AnchorX;
            var endAnchorY   = EndRecord.AnchorY;

            var startControlX = StartRecord.ControlX;
            var startControlY = StartRecord.ControlY;
            var endControlX   = EndRecord.ControlX;
            var endControlY   = EndRecord.ControlY;

            if (per > 0 && per < 1 && StartRecord.isCurved !== EndRecord.isCurved) {
                if (!StartRecord.isCurved) {
                    startAnchorX  = StartRecord.AnchorX / 2;
                    startAnchorY  = StartRecord.AnchorY / 2;
                    startControlX = startAnchorX;
                    startControlY = startAnchorY;
                }
                if (!EndRecord.isCurved) {
                    endAnchorX  = EndRecord.AnchorX / 2;
                    endAnchorY  = EndRecord.AnchorY / 2;
                    endControlX = endAnchorX;
                    endControlY = endAnchorY;
                }
            }

            ControlX = startControlX * startPer + endControlX * per + position.x;
            ControlY = startControlY * startPer + endControlY * per + position.y;
            AnchorX  = startAnchorX * startPer + endAnchorX * per + ControlX;
            AnchorY  = startAnchorY * startPer + endAnchorY * per + ControlY;

            position.x = AnchorX;
            position.y = AnchorY;

            newRecord = {
                AnchorX:  AnchorX,
                AnchorY:  AnchorY,
                ControlX: ControlX,
                ControlY: ControlY,
                isChange: false,
                isCurved: (StartRecord.isCurved || EndRecord.isCurved)
            };
        }

        newShapeRecords[i] = newRecord;
    }
    newShapeRecords[newShapeRecords.length] = 0;
    shapes.ShapeRecords = newShapeRecords;

    var EndColor;
    var StartColor;
    var color;
    for (i = 0; i < lineStyleCount; i++) {
        var lineStyle = lineStyles[i];
        EndColor      = lineStyle.EndColor;
        StartColor    = lineStyle.StartColor;
        color = {
            R: this.$floor(StartColor.R * startPer + EndColor.R * per),
            G: this.$floor(StartColor.G * startPer + EndColor.G * per),
            B: this.$floor(StartColor.B * startPer + EndColor.B * per),
            A: StartColor.A * startPer + EndColor.A * per
        };

        var EndWidth   = lineStyles[i].EndWidth;
        var StartWidth = lineStyles[i].StartWidth;
        shapes.lineStyles.lineStyles[i] = {
            Width: this.$floor(StartWidth * startPer + EndWidth * per),
            Color: color,
            fillStyleType: 0
        };
    }

    for (i = 0; i < fillStyleCount; i++) {
        var fillStyle     = fillStyles[i];
        var fillStyleType = fillStyle.fillStyleType;

        if (fillStyleType === 0x00) {
            EndColor   = fillStyle.EndColor;
            StartColor = fillStyle.StartColor;
            color = {
                R: this.$floor(StartColor.R * startPer + EndColor.R * per),
                G: this.$floor(StartColor.G * startPer + EndColor.G * per),
                B: this.$floor(StartColor.B * startPer + EndColor.B * per),
                A: StartColor.A * startPer + EndColor.A * per
            };

            shapes.fillStyles.fillStyles[i] = {
                Color:         color,
                fillStyleType: fillStyleType
            };
        } else {
            var EndGradientMatrix = fillStyle.endGradientMatrix;
            var StartGradientMatrix = fillStyle.startGradientMatrix;
            var matrix = [
                StartGradientMatrix[0] * startPer + EndGradientMatrix[0] * per,
                StartGradientMatrix[1] * startPer + EndGradientMatrix[1] * per,
                StartGradientMatrix[2] * startPer + EndGradientMatrix[2] * per,
                StartGradientMatrix[3] * startPer + EndGradientMatrix[3] * per,
                StartGradientMatrix[4] * startPer + EndGradientMatrix[4] * per,
                StartGradientMatrix[5] * startPer + EndGradientMatrix[5] * per
            ];

            var gRecords = [];
            var gradient = fillStyle.gradient;
            var GradientRecords = gradient.GradientRecords;
            var gLen = GradientRecords.length;
            for (var gIdx = 0; gIdx < gLen; gIdx++) {
                var gRecord = GradientRecords[gIdx];
                EndColor    = gRecord.EndColor;
                StartColor  = gRecord.StartColor;

                color = {
                    R: this.$floor(StartColor.R * startPer + EndColor.R * per),
                    G: this.$floor(StartColor.G * startPer + EndColor.G * per),
                    B: this.$floor(StartColor.B * startPer + EndColor.B * per),
                    A: StartColor.A * startPer + EndColor.A * per
                };

                gRecords[gIdx] = {
                    Color: color,
                    Ratio: gRecord.StartRatio * startPer + gRecord.EndRatio * per
                };
            }

            shapes.fillStyles.fillStyles[i] = {
                gradient:       {GradientRecords: gRecords},
                gradientMatrix: matrix,
                fillStyleType:  fillStyleType
            };
        }
    }

    var EndBounds   = char.EndBounds;
    var StartBounds = char.StartBounds;
    var bounds = {
        xMax: StartBounds.xMax * startPer + EndBounds.xMax * per,
        xMin: StartBounds.xMin * startPer + EndBounds.xMin * per,
        yMax: StartBounds.yMax * startPer + EndBounds.yMax * per,
        yMin: StartBounds.yMin * startPer + EndBounds.yMin * per
    };

    return {
        data: this.$vtc.convert(shapes, true),
        bounds: bounds
    };
};

/**
 * @returns {{}}
 */
SwfTag.prototype.parseFrameLabel = function ()
{
    return {
        name:  this.getBitIO().getDataUntil("\0"),
        frame: 0
    };
};

/**
 * @param tagType
 * @returns {*}
 */
SwfTag.prototype.parseRemoveObject = function (tagType)
{
    var bitio = this.getBitIO();
    switch (tagType) {
        case 5:
            console.log("TODO: RemoveObject");
            return {
                CharacterId: bitio.getUI16(),
                Depth:       bitio.getUI16()
            };
        default:
            return {
                Depth: bitio.getUI16()
            };
    }
};

/**
 * @param tagType
 * @param length
 * @returns {*}
 */
SwfTag.prototype.parseDefineButton = function (tagType, length)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var obj = {};
    obj.tagType   = tagType;
    var endOffset = bitio.byte_offset + length;
    obj.ButtonId  = bitio.getUI16();

    var ActionOffset = 0;
    if (tagType !== 7) {
        obj.ReservedFlags = bitio.getUIBits(7);
        obj.TrackAsMenu   = bitio.getUIBits(1);
        ActionOffset      = bitio.getUI16();
    }

    obj.characters = this.buttonCharacters(endOffset);

    // actionScript
    if (tagType === 7) {
        var offset = endOffset - bitio.byte_offset;
        if (offset > 0) {
            obj.actions = this.parseDoAction(offset);
        }
    } else if (ActionOffset > 0) {
        obj.actions = this.buttonActions(endOffset);
    }

    // set layer
    stage.setCharacter(obj.ButtonId, obj);
    if (bitio.byte_offset !== endOffset) {
        bitio.byte_offset = endOffset;
    }

    return obj;
};

/**
 * @param offset
 * @returns {Array}
 */
SwfTag.prototype.buttonCharacters = function (offset)
{
    var bitio = this.getBitIO();

    var characters = [];
    while (bitio.getUI8() !== 0) {
        bitio.incrementOffset(-1, 0);
        var cacheOffset = bitio.byte_offset;

        var record = this.buttonRecord();
        if (bitio.byte_offset > offset) {
            bitio.byte_offset = cacheOffset;
            break;
        }

        var depth = record.Depth;
        if (!(record.Depth in characters)) {
            characters[depth] = [];
        }

        var length = characters[depth].length;
        characters[depth][length] = record;
    }

    return characters;
};

/**
 * @returns {{}}
 */
SwfTag.prototype.buttonRecord = function ()
{
    var bitio = this.getBitIO();

    var obj = {};

    bitio.getUIBits(2); // Reserved
    obj.PlaceFlagHasBlendMode  = bitio.getUIBits(1);
    obj.PlaceFlagHasFilterList = bitio.getUIBits(1);
    obj.ButtonStateHitTest     = bitio.getUIBits(1);
    obj.ButtonStateDown        = bitio.getUIBits(1);
    obj.ButtonStateOver        = bitio.getUIBits(1);
    obj.ButtonStateUp          = bitio.getUIBits(1);
    obj.CharacterId            = bitio.getUI16();
    obj.Depth                  = bitio.getUI16();
    obj.PlaceFlagHasMatrix     = 1;
    obj.Matrix                 = this.matrix();
    obj.ColorTransform         = this.colorTransform();

    obj.PlaceFlagHasColorTransform = (obj.ColorTransform === undefined) ? 0 : 1;
    if (obj.PlaceFlagHasBlendMode) {
        obj.BlendMode = bitio.getUI8();
    }

    if (obj.PlaceFlagHasFilterList) {
        obj.SurfaceFilterList = this.getFilterList();
    }

    obj.PlaceFlagHasRatio     = 0;
    obj.PlaceFlagHasClipDepth = 0;
    obj.Sound                 = null;

    return obj;
};

/**
 * @param endOffset
 * @returns {Array}
 */
SwfTag.prototype.buttonActions = function (endOffset)
{
    var bitio = this.getBitIO();

    var results = [];
    while (true) {
        var obj = {};
        var startOffset    = bitio.byte_offset;
        var CondActionSize = bitio.getUI16();

        obj.CondIdleToOverDown    = bitio.getUIBits(1);
        obj.CondOutDownToIdle     = bitio.getUIBits(1);
        obj.CondOutDownToOverDown = bitio.getUIBits(1);
        obj.CondOverDownToOutDown = bitio.getUIBits(1);
        obj.CondOverDownToOverUp  = bitio.getUIBits(1);
        obj.CondOverUpToOverDown  = bitio.getUIBits(1);
        obj.CondOverUpToIdle      = bitio.getUIBits(1);
        obj.CondIdleToOverUp      = bitio.getUIBits(1);
        obj.CondKeyPress          = bitio.getUIBits(7);
        obj.CondOverDownToIdle    = bitio.getUIBits(1);

        // ActionScript
        var length = endOffset - bitio.byte_offset + 1;

        obj.ActionScript = this.parseDoAction(length);
        results[results.length] = obj;

        if (!CondActionSize) {
            break;
        }

        bitio.byte_offset = startOffset + CondActionSize;
    }

    return results;
};

/**
 * @param tagType
 * @param length
 * @returns {{}}
 */
SwfTag.prototype.parsePlaceObject = function (tagType, length)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var startOffset = bitio.byte_offset;

    var obj = {};
    obj.tagType = tagType;

    switch (tagType) {
        case 4:
            obj.CharacterId = bitio.getUI16();
            obj.Depth       = bitio.getUI16();
            obj.Matrix      = this.matrix();
            obj.PlaceFlagHasMatrix = 1;

            bitio.byteAlign();

            if ((bitio.byte_offset - startOffset) < length) {
                obj.ColorTransform = this.colorTransform();
                obj.PlaceFlagHasColorTransform = 1;
            }
            break;
        default:
            obj.PlaceFlagHasClipActions = bitio.getUIBits(1);
            if (stage.getVersion() < 5) {
                obj.PlaceFlagHasClipActions = 0;
            }

            obj.PlaceFlagHasClipDepth      = bitio.getUIBits(1);
            obj.PlaceFlagHasName           = bitio.getUIBits(1);
            obj.PlaceFlagHasRatio          = bitio.getUIBits(1);
            obj.PlaceFlagHasColorTransform = bitio.getUIBits(1);
            obj.PlaceFlagHasMatrix         = bitio.getUIBits(1);
            obj.PlaceFlagHasCharacter      = bitio.getUIBits(1);
            obj.PlaceFlagMove              = bitio.getUIBits(1);

            // PlaceObject3
            if (tagType === 70) {
                bitio.getUIBits(1); // Reserved
                obj.PlaceFlagOpaqueBackground = bitio.getUIBits(1);
                obj.PlaceFlagHasVisible       = bitio.getUIBits(1);
                obj.PlaceFlagHasImage         = bitio.getUIBits(1);
                obj.PlaceFlagHasClassName     = bitio.getUIBits(1);
                obj.PlaceFlagHasCacheAsBitmap = bitio.getUIBits(1);
                obj.PlaceFlagHasBlendMode     = bitio.getUIBits(1);
                obj.PlaceFlagHasFilterList    = bitio.getUIBits(1);
            }

            obj.Depth = bitio.getUI16();

            if (obj.PlaceFlagHasClassName ||
                (obj.PlaceFlagHasImage && obj.PlaceFlagHasCharacter)
            ) {
                obj.ClassName = bitio.getDataUntil("\0");
            }

            if (obj.PlaceFlagHasCharacter) {
                obj.CharacterId = bitio.getUI16();
            }

            if (obj.PlaceFlagHasMatrix) {
                obj.Matrix = this.matrix();
            }

            if (obj.PlaceFlagHasColorTransform) {
                obj.ColorTransform = this.colorTransform();
            }

            if (obj.PlaceFlagHasRatio) {
                obj.Ratio = bitio.getUI16();
            }

            if (obj.PlaceFlagHasName) {
                obj.Name = bitio.getDataUntil("\0");
            }

            if (obj.PlaceFlagHasClipDepth) {
                obj.ClipDepth = bitio.getUI16();
            }

            if (tagType === 70) {
                if (obj.PlaceFlagHasFilterList) {
                    obj.SurfaceFilterList = this.getFilterList();
                }
                if (obj.PlaceFlagHasBlendMode) {
                    obj.BlendMode = bitio.getUI8();
                }
                if (obj.PlaceFlagHasCacheAsBitmap) {
                    obj.BitmapCache = bitio.getUI8();
                }
                if (obj.PlaceFlagHasVisible) {
                    obj.Visible = bitio.getUI8();
                    obj.BackgroundColor = this.rgba();
                }
            }

            if (obj.PlaceFlagHasClipActions) {
                bitio.getUI16(); // Reserved
                obj.AllEventFlags = this.parseClipEventFlags();

                var endLength = startOffset + length;

                var actionRecords = [];
                while (bitio.byte_offset < endLength) {
                    var clipActionRecord = this.parseClipActionRecord(endLength);
                    actionRecords[actionRecords.length] = clipActionRecord;
                    if (endLength <= bitio.byte_offset) {
                        break;
                    }

                    var endFlag = (stage.getVersion() <= 5) ? bitio.getUI16() : bitio.getUI32();
                    if (!endFlag) {
                        break;
                    }

                    if (stage.getVersion() <= 5) {
                        bitio.byte_offset -= 2;
                    } else {
                        bitio.byte_offset -= 4;
                    }

                    if (clipActionRecord.KeyCode) {
                        bitio.byte_offset -= 1;
                    }
                }
                obj.ClipActionRecords = actionRecords;
            }

            break;
    }

    bitio.byteAlign();
    bitio.byte_offset = startOffset + length;

    return obj;
};

/**
 * @returns {{}}
 */
SwfTag.prototype.parseClipActionRecord = function (endLength)
{
    var bitio = this.getBitIO();

    var obj = {};
    var EventFlags = this.parseClipEventFlags();
    if (endLength > bitio.byte_offset) {
        var ActionRecordSize = bitio.getUI32();
        if (EventFlags.keyPress) {
            obj.KeyCode = bitio.getUI8();
        }

        obj.EventFlags = EventFlags;
        obj.Actions    = this.parseDoAction(ActionRecordSize);
    }

    return obj;
};

/**
 * @returns {{}}
 */
SwfTag.prototype.parseClipEventFlags = function ()
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var obj = {};
    obj.keyUp      = bitio.getUIBits(1);
    obj.keyDown    = bitio.getUIBits(1);
    obj.mouseUp    = bitio.getUIBits(1);
    obj.mouseDown  = bitio.getUIBits(1);
    obj.mouseMove  = bitio.getUIBits(1);
    obj.unload     = bitio.getUIBits(1);
    obj.enterFrame = bitio.getUIBits(1);
    obj.load       = bitio.getUIBits(1);

    if (stage.getVersion() >= 6) {
        obj.dragOver       = bitio.getUIBits(1);
        obj.rollOut        = bitio.getUIBits(1);
        obj.rollOver       = bitio.getUIBits(1);
        obj.releaseOutside = bitio.getUIBits(1);
        obj.release        = bitio.getUIBits(1);
        obj.press          = bitio.getUIBits(1);
        obj.initialize     = bitio.getUIBits(1);
    }

    obj.data = bitio.getUIBits(1);

    if (stage.getVersion() >= 6) {
        bitio.getUIBits(5); // Reserved
        obj.construct = bitio.getUIBits(1);
        obj.keyPress  = bitio.getUIBits(1);
        obj.dragOut   = bitio.getUIBits(1);
        bitio.getUIBits(8); // Reserved
    }

    bitio.byteAlign();

    return obj;
};

/**
 * @returns {Array}
 */
SwfTag.prototype.getFilterList = function ()
{
    var bitio = this.getBitIO();

    var NumberOfFilters = bitio.getUI8();
    var i = 0;
    var result = [];
    while (i < NumberOfFilters) {
        var filter = this.getFilter();
        if (filter) {
            result[result.length] = filter;
        }
        i = 0 | i + 1;
    }

    return (result.length) ? result : null;
};

/**
 * @return {{}}
 */
SwfTag.prototype.getFilter = function ()
{
    var bitio = this.getBitIO();

    var filterId = bitio.getUI8();
    var filter   = null;
    switch (filterId) {
        case 0:
            filter = this.dropShadowFilter();
            break;
        case 1:
            filter = this.blurFilter();
            break;
        case 2:
            filter = this.glowFilter();
            break;
        case 3:
            filter = this.bevelFilter();
            break;
        case 4:
            filter = this.gradientGlowFilter();
            break;
        case 5:
            filter = this.convolutionFilter();
            break;
        case 6:
            filter = this.colorMatrixFilter();
            break;
        case 7:
            filter = this.gradientBevelFilter();
            break;
    }

    return filter;
};

/**
 * @returns {DropShadowFilter}
 */
SwfTag.prototype.dropShadowFilter = function ()
{
    var bitio = this.getBitIO();

    var rgba  = this.rgba();
    var alpha = rgba.A;
    var color = rgba.R << 16 | rgba.G << 8 | rgba.B;

    var blurX      = bitio.getUI32() / 0x10000;
    var blurY      = bitio.getUI32() / 0x10000;
    var angle      = bitio.getUI32() / 0x10000 * 180 / this.$PI;
    var distance   = bitio.getUI32() / 0x10000;
    var strength   = bitio.getFloat16() / 256;
    var inner      = (bitio.getUIBits(1)) ? true  : false;
    var knockout   = (bitio.getUIBits(1)) ? true  : false;
    var hideObject = (bitio.getUIBits(1)) ? false : true;
    var quality    = bitio.getUIBits(5);

    if (!strength) {
        return null;
    }

    return new DropShadowFilter(
        distance, angle, color, alpha, blurX, blurY,
        strength, quality, inner, knockout, hideObject
    );
};

/**
 * @returns {BlurFilter}
 */
SwfTag.prototype.blurFilter = function ()
{
    var bitio   = this.getBitIO();
    var blurX   = bitio.getUI32() / 0x10000;
    var blurY   = bitio.getUI32() / 0x10000;
    var quality = bitio.getUIBits(5);
    bitio.getUIBits(3); // Reserved

    return new BlurFilter(blurX, blurY, quality);
};

/**
 * @returns {GlowFilter}
 */
SwfTag.prototype.glowFilter = function ()
{
    var bitio    = this.getBitIO();
    var rgba     = this.rgba();
    var alpha    = rgba.A;
    var color    = rgba.R << 16 | rgba.G << 8 | rgba.B;
    var blurX    = bitio.getUI32() / 0x10000;
    var blurY    = bitio.getUI32() / 0x10000;
    var strength = bitio.getFloat16() / 256;
    var inner    = (bitio.getUIBits(1)) ? true : false;
    var knockout = (bitio.getUIBits(1)) ? true : false;
    bitio.getUIBits(1); // CompositeSource
    var quality = bitio.getUIBits(5);

    if (!strength) {
        return null;
    }

    return new GlowFilter(
        color, alpha, blurX, blurY,
        strength, quality, inner, knockout
    );
};

/**
 * @returns {BevelFilter}
 */
SwfTag.prototype.bevelFilter = function ()
{
    var bitio = this.getBitIO();

    var rgba;
    rgba = this.rgba();
    var highlightAlpha = rgba.A;
    var highlightColor = rgba.R << 16 | rgba.G << 8 | rgba.B;

    rgba = this.rgba();
    var shadowAlpha = rgba.A;
    var shadowColor = rgba.R << 16 | rgba.G << 8 | rgba.B;

    var blurX    = bitio.getUI32() / 0x10000;
    var blurY    = bitio.getUI32() / 0x10000;
    var angle    = bitio.getUI32() / 0x10000 * 180 / this.$PI;
    var distance = bitio.getUI32() / 0x10000;
    var strength = bitio.getFloat16() / 256;
    var inner    = (bitio.getUIBits(1)) ? true : false;
    var knockout = (bitio.getUIBits(1)) ? true : false;
    bitio.getUIBits(1); // CompositeSource

    var OnTop   = bitio.getUIBits(1);
    var quality = bitio.getUIBits(4);

    var type = "inner";
    if (!inner) {
        if (OnTop) {
            type = "full";
        } else {
            type = "outer";
        }
    }

    if (!strength) {
        return null;
    }

    return new BevelFilter(
        distance, angle, highlightColor, highlightAlpha,
        shadowColor, shadowAlpha, blurX, blurY,
        strength, quality, type, knockout
    );
};

/**
 * @returns {GradientGlowFilter}
 */
SwfTag.prototype.gradientGlowFilter = function ()
{
    var bitio = this.getBitIO();

    var NumColors = 0 | bitio.getUI8();

    var colors = [];
    var alphas = [];

    var i = 0;
    while (i < NumColors) {
        var rgba = this.rgba();
        alphas[alphas.length] = rgba.A;
        colors[colors.length] = (rgba.R << 16 | rgba.G << 8 | rgba.B)|0;
        i = (i + 1)|0;
    }

    i = 0;
    var ratios = [];
    while (i < NumColors) {
        ratios[ratios.length] = +(bitio.getUI8() / 255);
        i = (i + 1)|0;
    }

    var blurX    = bitio.getUI32() / 0x10000;
    var blurY    = bitio.getUI32() / 0x10000;
    var angle    = bitio.getUI32() / 0x10000 * 180 / this.$PI;
    var distance = bitio.getUI32() / 0x10000;
    var strength = bitio.getFloat16() / 256;
    var inner    = (bitio.getUIBits(1)) ? true : false;
    var knockout = (bitio.getUIBits(1)) ? true : false;
    bitio.getUIBits(1); // CompositeSource

    var OnTop   = bitio.getUIBits(1);
    var quality = bitio.getUIBits(4);

    var type = "inner";
    if (!inner) {
        if (OnTop) {
            type = "full";
        } else {
            type = "outer";
        }
    }

    if (!strength) {
        return null;
    }

    return new GradientGlowFilter(
        distance, angle, colors, alphas, ratios,
        blurX, blurY, strength, quality, type, knockout
    );
};

/**
 * @returns {ConvolutionFilter}
 */
SwfTag.prototype.convolutionFilter = function ()
{
    var bitio = this.getBitIO();

    var matrixX = bitio.getUI8();
    var matrixY = bitio.getUI8();
    var divisor = bitio.getFloat32;
    var bias    = bitio.getFloat32;

    // matrix
    var count = matrixX * matrixY;
    var matrix = [];
    while (count) {
        count = (count - 1)|0;
        matrix[matrix.length] = bitio.getFloat32();
    }

    var color = this.rgba();

    // Reserved
    bitio.getUIBits(6);

    var clamp         = (bitio.getUIBits(1)) ? true :false;
    var preserveAlpha = (bitio.getUIBits(1)) ? true :false;

    return new ConvolutionFilter(
        matrixX, matrixY, matrix, divisor, bias,
        preserveAlpha, clamp, color
    );
};

/**
 * @returns {GradientBevelFilter}
 */
SwfTag.prototype.gradientBevelFilter = function ()
{
    var bitio = this.getBitIO();
    var NumColors = 0 | bitio.getUI8();

    var colors = [];
    var alphas = [];

    var i = 0;
    while (i < NumColors) {
        var rgba = this.rgba();
        alphas[alphas.length] = rgba.A;
        colors[colors.length] = rgba.R << 16 | rgba.G << 8 | rgba.B;
        i = 0 | i + 1;
    }

    var ratios = [];

    i = 0;
    while (i < NumColors) {
        ratios[ratios.length] = bitio.getUI8();
        i = 0 | i + 1;
    }

    var blurX    = bitio.getUI32() / 0x10000;
    var blurY    = bitio.getUI32() / 0x10000;
    var angle    = bitio.getUI32() / 0x10000 * 180 / this.$PI;
    var distance = bitio.getUI32() / 0x10000;
    var strength = bitio.getFloat16() / 256;

    var inner    = (bitio.getUIBits(1)) ? true : false;
    var knockout = (bitio.getUIBits(1)) ? true : false;
    bitio.getUIBits(1); // CompositeSource

    var OnTop   = bitio.getUIBits(1);
    var quality = bitio.getUIBits(4);

    var type = "inner";
    if (!inner) {
        if (OnTop) {
            type = "full";
        } else {
            type = "outer";
        }
    }

    if (!strength) {
        return null;
    }

    return new GradientBevelFilter(
        distance, angle, colors, alphas, ratios,
        blurX, blurY, strength, quality, type, knockout
    );
};

/**
 * @returns {ColorMatrixFilter}
 */
SwfTag.prototype.colorMatrixFilter = function ()
{
    var bitio = this.getBitIO();
    var matrix = [];
    for (var i = 0; i < 20; i++) {
        matrix[matrix.length] = bitio.getFloat32();
    }
    return new ColorMatrixFilter(matrix);
};

/**
 * @returns {Array}
 */
SwfTag.prototype.colorTransform = function ()
{
    var bitio = this.getBitIO();
    bitio.byteAlign();

    var result = [1, 1, 1, 1, 0, 0, 0, 0];

    var first6bits    = bitio.getUIBits(6);
    var HasAddTerms   = first6bits >> 5;
    var HasMultiTerms = (first6bits >> 4) & 1;
    var nbits         = first6bits & 0x0f;

    if (HasMultiTerms) {
        result[0] = bitio.getSIBits(nbits) / 256;
        result[1] = bitio.getSIBits(nbits) / 256;
        result[2] = bitio.getSIBits(nbits) / 256;
        result[3] = bitio.getSIBits(nbits) / 256;
    }

    if (HasAddTerms) {
        result[4] = bitio.getSIBits(nbits);
        result[5] = bitio.getSIBits(nbits);
        result[6] = bitio.getSIBits(nbits);
        result[7] = bitio.getSIBits(nbits);
    }

    return result;
};

/**
 * @param length
 */
SwfTag.prototype.parseDefineSprite = function (length)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var characterId = bitio.getUI16();
    bitio.getUI16(); // FrameCount

    stage.setCharacter(characterId, this.parseTags(length, characterId));
};

/**
 * @param length
 * @returns {ActionScript}
 */
SwfTag.prototype.parseDoAction = function (length)
{
    var bitio = this.getBitIO();
    var data  = bitio.getData(length);
    return new ActionScript(data);
};

/**
 * @param length
 */
SwfTag.prototype.parseDoInitAction = function (length)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var spriteId = bitio.getUI16();

    var as = new ActionScript(bitio.getData(length - 2), undefined, undefined, true);
    var mc = stage.getParent();
    mc.variables = {};
    var action = mc.createActionScript2(as);
    var packages = stage.packages;
    if (spriteId in packages) {
        mc.active = true;
        action.apply(mc);
        mc.active = false;
    }
    stage.initActions[spriteId] = action;
};

/**
 * @returns {{}}
 */
SwfTag.prototype.parseDefineSceneAndFrameLabelData = function ()
{

    var bitio = this.getBitIO();

    var obj = {};
    var count = 0 | bitio.getU30();
    obj.SceneCount = count;

    var sceneInfo  = [];
    var i = 0;
    while (i < count) {
        sceneInfo[i] = {
            offset: bitio.getU30(),
            name:   decodeURIComponent(bitio.getDataUntil("\0"))
        };
        i = 0 | i + 1;
    }
    obj.sceneInfo = sceneInfo;

    count = 0 | bitio.getU30();
    obj.FrameLabelCount = count;

    var frameInfo = [];
    i = 0;
    while (i < count) {
        frameInfo[i] = {
            num:   bitio.getU30(),
            label: decodeURIComponent(bitio.getDataUntil("\0"))
        };
        i = 0 | i + 1;
    }
    obj.frameInfo = frameInfo;

    return obj;
};

/**
 * @param tagType
 * @returns {{}}
 */
SwfTag.prototype.parseSoundStreamHead = function (tagType)
{
    var bitio = this.getBitIO();

    var obj = {};
    obj.tagType = tagType;

    bitio.getUIBits(4); // Reserved

    // 0 = 5.5kHz, 1 = 11kHz, 2 = 22kHz, 3 = 44kHz
    obj.PlaybackSoundRate = bitio.getUIBits(2);

    // 0 = 8-bit, 1 = 16-bit
    obj.PlaybackSoundSize = bitio.getUIBits(1);

    // 0 = Mono, 1 = Stereo
    obj.PlaybackSoundType = bitio.getUIBits(1);

    // 0 = Uncompressed(native-endian)
    // 1 = ADPCM
    // 2 = MP3
    // 3 = Uncompressed(little-endian)
    // 4 = Nellymoser 16 kHz
    // 5 = Nellymoser 8 kHz
    // 6 = Nellymoser
    // 11 = Speex
    obj.StreamSoundCompression = bitio.getUIBits(4);

    // 0 = 5.5kHz, 1 = 11kHz, 2 = 22kHz, 3 = 44kHz
    obj.StreamSoundRate = bitio.getUIBits(2);

    // 0 = 8-bit, 1 = 16-bit
    obj.StreamSoundSize = bitio.getUIBits(1);

    // 0 = Mono, 1 = Stereo
    obj.StreamSoundType = bitio.getUIBits(1);

    obj.StreamSoundSampleCount = bitio.getUI16();

    if (obj.StreamSoundCompression === 2) {
        obj.LatencySeek = bitio.getSIBits(2);
    }

    return obj;
};

/**
 * @param tagType
 * @param length
 */
SwfTag.prototype.parseDoABC = function (tagType, length)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    stage.abcFlag = true;

    var startOffset = bitio.byte_offset;

    var obj = {};
    obj.tagType = tagType;
    obj.Flags   = bitio.getUI32();
    obj.Name    = bitio.getDataUntil("\0");

    // ABCBitIO
    var offset   = length - (bitio.byte_offset - startOffset);
    var ABCData  = bitio.getData(offset);
    var ABCBitIO = new BitIO();
    ABCBitIO.setData(ABCData);

    // version
    obj.minorVersion = ABCBitIO.getUI16();
    obj.majorVersion = ABCBitIO.getUI16();

    // integer
    obj.integer = this.ABCInteger(ABCBitIO);

    // uinteger
    obj.uinteger = this.ABCUinteger(ABCBitIO);

    // double
    obj.double = this.ABCDouble(ABCBitIO);

    // string_info
    obj.string = this.ABCStringInfo(ABCBitIO);

    // namespace_info
    obj.namespace = this.ABCNameSpaceInfo(ABCBitIO);

    // ns_set_info
    obj.nsSet = this.ABCNsSetInfo(ABCBitIO);

    // multiname_info;
    obj.multiname_info = this.ABCMultiNameInfo(ABCBitIO);

    var i = 0;

    // method_info
    obj.method = [];
    var methodCount = 0 | ABCBitIO.getU30();
    if (methodCount) {
        var method = [];
        i = 0;
        while (i < methodCount) {
            method[i] = this.ABCMethodInfo(ABCBitIO);
            i = 0 | i + 1;
        }
        obj.method = method;
    }

    // metadata_info
    obj.metadata = [];
    var metadataCount = 0 | ABCBitIO.getU30();
    if (metadataCount) {
        var metadataInfo = [];
        i = 0;
        while (i < metadataCount) {
            metadataInfo[i] = this.ABCMetadataInfo(ABCBitIO);
            i = 0 | i + 1;
        }
        obj.metadata = metadataInfo;
    }

    var classCount = 0 | ABCBitIO.getU30();
    obj.instance   = [];
    obj.class      = [];
    console.log(classCount)
    if (classCount) {
        // instance_info
        var instance = [];
        i = 0;
        while (i < classCount) {
            instance[i] = this.ABCInstanceInfo(ABCBitIO);
            i = 0 | i + 1;
        }
        console.log(instance)
        obj.instance = instance;

        // class_info
        var classInfo = [];
        i = 0;
        while (i < classCount) {
            classInfo[i] = this.ABCClassInfo(ABCBitIO);
            i = 0 | i + 1;
        }
        obj.class = classInfo;
    }

    // script_info
    obj.script = [];
    var scriptCount = ABCBitIO.getU30();
    if (scriptCount) {
        var script = [];
        i = 0;
        while (i < scriptCount) {
            script[i] = this.ABCScriptInfo(ABCBitIO);
            i = 0 | i + 1;
        }
        obj.script = script;
    }

    // method_body_info
    obj.methodBody = [];
    var methodBodyCount  = ABCBitIO.getU30();
    if (methodBodyCount) {
        var methodBody = [];
        i = 0;
        while (i < methodBodyCount) {
            var mBody = this.ABCMethodBodyInfo(ABCBitIO);
            methodBody[mBody.method] = mBody;
            i = 0 | i + 1;
        }
        obj.methodBody = methodBody;
    }

    // build names
    obj = this.ABCMultinameToString(obj);

    // build instance
    this.ABCBuildInstance(obj);
};

/**
 * @param obj
 */
SwfTag.prototype.ABCBuildInstance = function (obj)
{
    var stage = this.getStage();

    var instances  = obj.instance;
    var length     = instances.length|0;
    var namespaces = obj.namespace;
    var string     = obj.string;
    var names      = obj.names;

    var i = 0;
    while (i < length) {
        var instance = instances[i];
        var flag     = instance.flags;

        var nsIndex = null;
        if (flag & 0x08) {
            nsIndex = instance.protectedNs;
        }

        var object = {};
        if (nsIndex) {
            var nObj = namespaces[nsIndex];
            object   = string[nObj.name];
        } else {
            object = names[instance.name];
        }

        var values    = object.split(":");
        var className = values.pop();
        var ns        = values.pop();

        // build parent
        var AVM2 = function (mc) { this["__swf2js__::builder"] = mc; };
        var prop = AVM2.prototype;

        // constructor
        prop[className] = this.ABCCreateActionScript3(obj, instance.iinit, object);

        // prototype
        var traits   = instance.trait;
        var tLength  = 0 | traits.length;
        var register = [];
        var rCount = 1;
        if (tLength) {
            var idx = 0;
            while (idx < tLength) {
                var trait  = traits[idx];
                var tName  = names[trait.name];
                var tNames = tName.split("::");
                var pName  =  tNames.pop();
                var kind   = trait.kind;

                var val = undefined;
                switch (kind) {
                    case 0: // Slot
                        register[rCount] = pName;
                        rCount = 0 | rCount + 1;
                        break;
                    case 1: // Method
                    case 2: // Getter
                    case 3: // Setter
                        val = this.ABCCreateActionScript3(obj, trait.data.info, object);
                        break;
                    case 4: // Class
                        console.log("build: Class");
                        break;
                    case 5: // Function
                        console.log("build: Function");
                        break;
                    case 6: // Const
                        console.log("build: Const");
                        break;
                }

                prop[pName] = val;
                idx = 0 | idx + 1;
            }
        }

        var localName   = "__swf2js__:"+ object;
        prop[localName] = {};

        // extends
        var superName           = instance.superName;
        prop[localName].extends = names[superName];

        // register
        prop[localName].register = register;

        // build
        var abc = stage.abc;
        var classObj = stage.avm2;
        if (ns) {
            var nss  = ns.split(".");
            var nLen = 0 | nss.length;
            var nIdx = 0;
            while (nIdx < nLen) {
                if (!(nss[nIdx] in classObj)) {
                    classObj[nss[nIdx]] = {};
                    abc[nss[nIdx]] = {};
                }

                classObj = classObj[nss[nIdx]];
                abc      = abc[nss[nIdx]];

                nIdx = 0 | nIdx + 1;
            }
        }

        abc[className]      = AVM2;
        classObj[className] = new AVM2();

        i = 0 | i + 1;
    }
};

/**
 * @param obj
 * @param methodId
 * @param abcKey
 */
SwfTag.prototype.ABCCreateActionScript3 = function (obj, methodId, abcKey)
{
    var stage = this.getStage();
    return (function (data, id, ns, stage)
    {
        return function ()
        {
            var as3    = new ActionScript3(data, id, ns, stage);
            as3.caller = this;
            as3.args   = arguments;
            return as3.execute();
        };
    })(obj, methodId, abcKey, stage);
};

/**
 * @param obj
 * @returns {*}
 */
SwfTag.prototype.ABCMultinameToString = function (obj)
{
    var multinames = obj.multiname_info;

    var length = 0 | multinames.length;
    var string = obj.string;

    var ns = obj.namespace;

    var names = [];
    var i = 1;
    while (i < length) {
        var info = multinames[i];
        var str = "";

        switch (info.kind) {
            case 0x07: // QName
            case 0x0D: // QNameA
                var namespace_info = ns[info.ns];
                switch (namespace_info.kind) {
                    default:
                        str += string[namespace_info.name];
                        break;
                    case 0x05:
                        str += "private";
                        break;
                }

                if (str !== "") {
                    str += "::";
                }

                str += string[info.name];
                break;
            case 0x0F: // RTQName
            case 0x10: // RTQNameA
                console.log("RTQName", i, info);
                break;
            case 0x09: // Multiname
            case 0x0E: // MultinameA
                str = string[info.name];
                break;
            case 0x1B: // MultinameL
            case 0x1C: // MultinameLA
                str = null;
                break;
            case 0x11: // RTQNameL
            case 0x12: // RTQNameLA
                console.log("RTQNameL", i, info);

                break;
        }

        names[i] = str;
        i = 0 | i + 1;
    }
    obj.names = names;
    return obj;
};

/**
 * @param ABCBitIO
 * @returns {Array}
 */
SwfTag.prototype.ABCInteger = function (ABCBitIO)
{
    var array = [];
    var count = 0 | ABCBitIO.getU30();
    if (count) {
        var i = 1;
        while (i < count) {
            array[i] = ABCBitIO.getS30();
            i = 0 | i + 1;
        }
    }
    return array;
};

/**
 * @param ABCBitIO
 * @returns {Array}
 */
SwfTag.prototype.ABCUinteger = function (ABCBitIO)
{
    var array = [];
    var count = 0 | ABCBitIO.getU30();
    if (count) {
        var i = 1;
        while (i < count) {
            array[i] = ABCBitIO.getU30();
            i = 0 | i + 1;
        }
    }
    return array;
};

/**
 * @param ABCBitIO
 * @returns {Array}
 */
SwfTag.prototype.ABCDouble = function (ABCBitIO)
{
    var array = [];
    var count = 0 | ABCBitIO.getU30();
    if (count) {
        var i = 1;
        while (i < count) {
            array[i] = ABCBitIO.getFloat64LittleEndian();
            i = 0 | i + 1;
        }
    }
    return array;
};

/**
 * @param ABCBitIO
 * @returns {Array}
 */
SwfTag.prototype.ABCStringInfo = function (ABCBitIO)
{
    var array = [];
    var count = 0 | ABCBitIO.getU30();
    if (count) {
        var i = 1;
        while (i < count) {
            array[i] = ABCBitIO.AbcReadString();
            i = 0 | i + 1;
        }
    }
    return array;
};

/**
 * @param ABCBitIO
 * @returns {Array}
 */
SwfTag.prototype.ABCNameSpaceInfo = function (ABCBitIO)
{
    var array = [];
    var count = 0 | ABCBitIO.getU30();
    if (count) {
        var i = 1;
        while (i < count) {
            array[i] = {
                kind: ABCBitIO.getUI8(),
                name: ABCBitIO.getU30()
            };
            i = 0 | i + 1;
        }
    }
    return array;
};

/**
 * @param ABCBitIO
 * @returns {Array}
 */
SwfTag.prototype.ABCNsSetInfo = function (ABCBitIO)
{
    var array = [];
    var count = 0 | ABCBitIO.getU30();
    if (count) {
        var i = 1;
        while (i < count) {
            var nsCount = 0 | ABCBitIO.getU30();
            var ns = [];
            if (nsCount) {
                var j = 0;
                while (j < nsCount) {
                    ns[j] = ABCBitIO.getU30();
                    j = 0 | j + 1;
                }
            }

            array[i] = ns;
            i = 0 | i + 1;
        }
    }
    return array;
};

/**
 * @param ABCBitIO
 * @returns {Array}
 */
SwfTag.prototype.ABCMultiNameInfo = function (ABCBitIO)
{
    var array = [];
    var count = 0 | ABCBitIO.getU30();
    if (count) {
        var i = 1;
        while (i < count) {
            var obj = {};
            obj.kind = ABCBitIO.getUI8();
            switch (obj.kind) {
                case 0x07: // QName
                case 0x0D: // QNameA
                    obj.ns   = ABCBitIO.getU30();
                    obj.name = ABCBitIO.getU30();
                    break;
                case 0x0F: // RTQName
                case 0x10: // RTQNameA
                    obj.name = ABCBitIO.getU30();
                    break;
                case 0x09: // Multiname
                case 0x0E: // MultinameA
                    obj.name   = ABCBitIO.getU30();
                    obj.ns_set = ABCBitIO.getU30();
                    break;
                case 0x1B: // MultinameL
                case 0x1C: // MultinameLA
                    obj.ns_set = ABCBitIO.getU30();
                    break;
                case 0x11: // RTQNameL
                case 0x12: // RTQNameLA
                    break;
            }
            array[i] = obj;
            i = 0 | i + 1;
        }
    }
    return array;
};

/**
 * @param ABCBitIO
 * @returns {{}}
 */
SwfTag.prototype.ABCMethodInfo = function (ABCBitIO)
{
    var obj = {};
    var i;
    var count = 0 | ABCBitIO.getU30();
    obj.paramCount = count;
    obj.returnType = ABCBitIO.getU30();
    obj.paramType  = [];
    if (count) {
        var paramType = [];
        i = 0;
        while (i < count) {
            paramType[paramType.length] = ABCBitIO.getU30();
            i = 0 | i + 1;
        }
        obj.paramType = paramType;
    }

    obj.name  = ABCBitIO.getU30();
    obj.flags = ABCBitIO.getUI8();

    obj.options = [];
    if (obj.flags === 0x08) {
        var options = [];
        var optionCount = 0 | ABCBitIO.getU30();
        if (optionCount) {
            i = 0;
            while (i < optionCount) {
                options[options.length] = {
                    val:  ABCBitIO.getU30(),
                    kind: ABCBitIO.getUI8()
                };
                i = 0 | i + 1;
            }
        }
        obj.options = options;
    }

    obj.paramName = [];
    if (obj.flags === 0x80) {
        var paramName = [];
        if (count) {
            i = 0;
            while (i < count) {
                paramName[paramName.length] = ABCBitIO.getU30();
                i = 0 | i + 1;
            }
        }
        obj.paramName = paramName;
    }

    return obj;
};

/**
 * @param ABCBitIO
 * @returns {{}}
 */
SwfTag.prototype.ABCMetadataInfo = function (ABCBitIO)
{
    var obj = {};

    obj.name  = ABCBitIO.getU30();
    obj.items = [];

    var count = 0 | ABCBitIO.getU30();
    if (count) {
        var items = [];
        var i = 0;
        while (i < count) {
            items[items.length] = {
                key:   ABCBitIO.getU30(),
                value: ABCBitIO.getU30()
            };
            i = 0 | i + 1;
        }
        obj.items = items;
    }

    return obj;
};

/**
 * @param ABCBitIO
 * @returns {{}}
 */
SwfTag.prototype.ABCInstanceInfo = function (ABCBitIO)
{
    var obj = {};
    obj.name      = ABCBitIO.getU30();
    obj.superName = ABCBitIO.getU30();
    obj.flags     = ABCBitIO.getUI8();
    if (obj.flags & 0x08) {
        obj.protectedNs = ABCBitIO.getU30();
    }

    var count = 0 | ABCBitIO.getU30();
    obj.interfaces = [];
    if (count) {
        var interfaces = [];
        var i = 0;
        while (i < count) {
            interfaces[interfaces.length] = ABCBitIO.getU30();
            i = 0 | i + 1;
        }
        obj.interfaces = interfaces;
    }

    obj.iinit = ABCBitIO.getU30();
    obj.trait = this.ABCTrait(ABCBitIO);

    return obj;
};

/**
 * @param ABCBitIO
 * @returns {{}}
 */
SwfTag.prototype.ABCClassInfo = function (ABCBitIO)
{
    var obj = {};
    obj.cinit = ABCBitIO.getU30();
    obj.trait = this.ABCTrait(ABCBitIO);
    return obj;
};

/**
 * @param ABCBitIO
 */
SwfTag.prototype.ABCScriptInfo = function (ABCBitIO)
{
    var obj = {};
    obj.init  = ABCBitIO.getU30();
    obj.trait = this.ABCTrait(ABCBitIO);
    return obj;
};

/**
 * @param ABCBitIO
 * @returns {{}}
 */
SwfTag.prototype.ABCMethodBodyInfo = function (ABCBitIO)
{
    var obj = {};
    obj.method         = ABCBitIO.getU30();
    obj.maxStack       = ABCBitIO.getU30();
    obj.localCount     = ABCBitIO.getU30();
    obj.initScopeDepth = ABCBitIO.getU30();
    obj.maxScopeDepth  = ABCBitIO.getU30();

    var count = ABCBitIO.getU30();
    var codes = [];
    if (count) {
        codes = this.ABCBuildCode(ABCBitIO, count);
    }
    obj.codes = codes;

    count = 0 | ABCBitIO.getU30();
    var exceptions = [];
    if (count) {
        var i = 0;
        while (i < count) {
            exceptions[exceptions.length] = this.ABCException(ABCBitIO);
            i = 0 | i + 1;
        }
    }

    obj.exceptions = exceptions;
    obj.trait      = this.ABCTrait(ABCBitIO);

    return obj;
};

/**
 * @param ABCBitIO
 * @param count
 * @returns {Array}
 */
SwfTag.prototype.ABCBuildCode = function (ABCBitIO, count)
{
    var array = [];
    var cacheOffset = 0;
    var i = 0;
    while (i < count) {
        var obj = {};
        var offset = 0;

        var code = ABCBitIO.getUI8();
        obj.code = code;
        switch (code) {
            case 0x86: // astype
            case 0x41: // call
            case 0x80: // coerce
            case 0x42: // construct
            case 0x49: // constructsuper
            case 0xf1: // debugfile
            case 0xf0: // debugline
            case 0x94: // declocal
            case 0xc3: // declocal_i
            case 0x6a: // deleteproperty
            case 0x06: // dxns
            case 0x5e: // findproperty
            case 0x5d: // findpropstrict
            case 0x59: // getdescendants
            case 0x6e: // getglobalslot
            case 0x60: // getlex
            case 0x62: // getlocal
            case 0x66: // getproperty
            case 0x6c: // getslot
            case 0x04: // getsuper
            case 0x92: // inclocal
            case 0xc2: // inclocal_i
            case 0x68: // initproperty
            case 0xb2: // istype
            case 0x08: // kill
            case 0x56: // newarray
            case 0x5a: // newcatch
            case 0x58: // newclass
            case 0x40: // newfunction
            case 0x55: // newobject
            case 0x2f: // pushdouble
            case 0x2d: // pushint
            case 0x31: // pushnamespace
            case 0x25: // pushshort
            case 0x2c: // pushstring
            case 0x2e: // pushuint
            case 0x63: // setlocal
            case 0x6f: // setglobalslot
            case 0x61: // setproperty
            case 0x6d: // setslot
            case 0x05: // setsuper
                cacheOffset = ABCBitIO.byte_offset;
                obj.value1  = ABCBitIO.getU30();
                offset += (ABCBitIO.byte_offset - cacheOffset);
                break;
            case 0x1b: // lookupswitch
                obj.value1 = ABCBitIO.getSI24();
                offset += 3;
                cacheOffset = ABCBitIO.byte_offset;
                obj.value2  = ABCBitIO.getSI24();
                offset += (ABCBitIO.byte_offset - cacheOffset);
                obj.value3 = ABCBitIO.getSI24();
                offset += 3;
                break;
            case 0x65: // getscopeobject
            case 0x24: // pushbyte
                obj.value1 = ABCBitIO.getSI8();
                offset += 1;
                break;
            case 0x32: // hasnext2
                obj.value1 = ABCBitIO.getSI8();
                obj.value2 = ABCBitIO.getSI8();
                offset += 2;
                break;
            case 0x13: // ifeq
            case 0x12: // iffalse
            case 0x18: // ifge
            case 0x17: // ifgt
            case 0x16: // ifle
            case 0x15: // iflt
            case 0x0f: // ifnge
            case 0x0e: // ifngt
            case 0x0d: // ifnle
            case 0x0c: // ifnlt
            case 0x14: // ifne
            case 0x19: // ifstricteq
            case 0x1a: // ifstrictne
            case 0x11: // iftrue
            case 0x10: // jump
                obj.value1 = ABCBitIO.getSI24();
                offset += 3;
                break;
            case 0x43: // callmethod
            case 0x46: // callproperty
            case 0x4c: // callproplex
            case 0x4f: // callpropvoid
            case 0x44: // callstatic
            case 0x45: // callsuper
            case 0x4e: // callsupervoid
            case 0x4a: // constructprop
            case 0xef: // debug
                cacheOffset = ABCBitIO.byte_offset;
                obj.value1  = ABCBitIO.getU30();
                obj.value2  = ABCBitIO.getU30();
                offset += (ABCBitIO.byte_offset - cacheOffset);
                break;
        }

        obj.offset = offset;
        array[i] = obj;

        i += offset;
    }
    return array;
};

/**
 * @param ABCBitIO
 * @returns {{}}
 */
SwfTag.prototype.ABCException = function (ABCBitIO)
{
    var obj = {};
    obj.from    = ABCBitIO.getU30();
    obj.to      = ABCBitIO.getU30();
    obj.target  = ABCBitIO.getU30();
    obj.excType = ABCBitIO.getU30();
    obj.varName = ABCBitIO.getU30();
    return obj;
};

/**
 * @param ABCBitIO
 * @returns {Array}
 */
SwfTag.prototype.ABCTrait = function (ABCBitIO)
{
    var count = ABCBitIO.getU30();
    var trait = [];
    if (count) {
        for (var i = 0; i < count; i++) {
            var tObj = {};
            tObj.name = ABCBitIO.getU30();

            var tag  = ABCBitIO.getUI8();
            var kind = tag & 0x0f;
            var attributes = (kind >> 4) & 0x0f;

            var data = {};
            switch (kind) {
                default:
                    console.log("ERROR:"+ kind);
                    break;
                case 0: // Trait_Slot
                case 6: // Trait_Const
                    data.id    = ABCBitIO.getU30();
                    data.name  = ABCBitIO.getU30();
                    data.index = ABCBitIO.getU30();
                    data.kind  = null;
                    if (data.index !== 0) {
                        data.kind = ABCBitIO.getUI8();
                    }
                    break;
                case 1: // Trait_Method
                case 2: // Trait_Getter
                case 3: // Trait_Setter
                    data.id   = ABCBitIO.getU30();
                    data.info = ABCBitIO.getU30();
                    break;
                case 4: // Trait_Class
                    data.id   = ABCBitIO.getU30();
                    data.info = ABCBitIO.getU30();
                    break;
                case 5: // Trait_Function
                    data.id   = ABCBitIO.getU30();
                    data.info = ABCBitIO.getU30();
                    break;
            }
            tObj.kind = kind;
            tObj.data = data;

            if (attributes & 0x04) {
                var metadataCount = ABCBitIO.getU30();
                var metadata = [];
                if (metadataCount) {
                    for (var j = 0; j < metadataCount; j++) {
                        metadata[metadata.length] = ABCBitIO.getU30();
                    }
                }
                tObj.metadata = metadata;
            }

            trait[trait.length] = tObj;
        }
    }

    return trait;
};

/**
 * parseSymbolClass
 */
SwfTag.prototype.parseSymbolClass = function ()
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var symbols = stage.symbols;
    var count   = bitio.getUI16();
    if (count) {
        var i = 0;
        while (i < count) {
            var tagId      = bitio.getUI16();
            symbols[tagId] = bitio.getDataUntil("\0");
            i = 0 | i + 1;
        }
    }
};

/**
 * @param tagType
 * @param length
 */
SwfTag.prototype.parseDefineSound = function (tagType, length)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var startOffset = bitio.byte_offset;

    var obj = {};
    obj.tagType          = tagType;
    obj.SoundId          = bitio.getUI16();
    obj.SoundFormat      = bitio.getUIBits(4);
    obj.SoundRate        = bitio.getUIBits(2);
    obj.SoundSize        = bitio.getUIBit();
    obj.SoundType        = bitio.getUIBit();
    obj.SoundSampleCount = bitio.getUI32();

    var sub = bitio.byte_offset - startOffset;
    var dataLength = 0 | length - sub;
    var data = bitio.getData(dataLength);
    var SoundData = "";
    var i = 0;
    while (i < dataLength) {
        SoundData += this.$fromCharCode(data[i]);
        i = 0 | i + 1;
    }

    bitio.byte_offset = startOffset + length;

    var mimeType = "";
    switch (obj.SoundFormat) {
        case 0: // Uncompressed native-endian
        case 3: // Uncompressed little-endian
            mimeType = "wave";
            break;
        case 1: // ADPCM ? 32KADPCM
            mimeType = "wave";
            break;
        case 2: // MP3
            mimeType = "mpeg";
            break;
        case 4: // Nellymoser 16
        case 5: // Nellymoser 8
        case 6: //
            mimeType = "nellymoser";
            break;
        case 11: // Speex
            mimeType = "speex";
            break;
        case 15:
            mimeType = "x-aiff";
            break;
    }

    obj.base64 = "data:audio/" + mimeType + ";base64," + window.btoa(SoundData);
    stage.sounds[obj.SoundId] = obj;
};

/**
 * @param tagType
 */
SwfTag.prototype.parseStartSound = function (tagType)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var obj = {};
    obj.tagType = tagType;
    obj.SoundId = bitio.getUI16();
    if (tagType === 89) {
        obj.SoundClassName = bitio.getDataUntil("\0");
    }

    obj.SoundInfo = this.parseSoundInfo();
    stage.setCharacter(obj.SoundId, obj);

    var sound = stage.sounds[obj.SoundId];
    var audio = this.$document.createElement("audio");
    audio.onload = function ()
    {
        this.load();
        this.preload = "auto";
        this.autoplay = false;
        this.loop = false;
    };
    audio.src = sound.base64;

    var loadSounds = stage.loadSounds;
    loadSounds[loadSounds.length] = audio;

    return {
        SoundId: obj.SoundId,
        Audio:   audio,
        tagType: tagType
    };
};

/**
 * parseDefineButtonSound
 */
SwfTag.prototype.parseDefineButtonSound = function ()
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var buttonId = bitio.getUI16();
    var btnObj   = stage.getCharacter(buttonId);

    for (var i = 0; i < 4; i++) {
        var soundId = bitio.getUI16();
        if (soundId) {
            var soundInfo = this.parseSoundInfo();
            switch (i) {
                case 0:
                    btnObj.ButtonStateUpSoundInfo = soundInfo;
                    btnObj.ButtonStateUpSoundId   = soundId;
                    break;
                case 1:
                    btnObj.ButtonStateOverSoundInfo = soundInfo;
                    btnObj.ButtonStateOverSoundId   = soundId;
                    break;
                case 2:
                    btnObj.ButtonStateDownSoundInfo = soundInfo;
                    btnObj.ButtonStateDownSoundId   = soundId;
                    break;
                case 3:
                    btnObj.ButtonStateHitTestSoundInfo = soundInfo;
                    btnObj.ButtonStateHitTestSoundId   = soundId;
                    break;
            }
        }
    }

    stage.setCharacter(buttonId, btnObj);
};

/**
 * @returns {{}}
 */
SwfTag.prototype.parseSoundInfo = function ()
{
    var bitio = this.getBitIO();

    var obj = {};
    bitio.getUIBits(2); // Reserved
    obj.SyncStop       = bitio.getUIBit();
    obj.SyncNoMultiple = bitio.getUIBit();
    obj.HasEnvelope    = bitio.getUIBit();
    obj.HasLoops       = bitio.getUIBit();
    obj.HasOutPoint    = bitio.getUIBit();
    obj.HasInPoint     = bitio.getUIBit();

    if (obj.HasInPoint) {
        obj.InPoint = bitio.getUI32();
    }

    if (obj.HasOutPoint) {
        obj.OutPoint = bitio.getUI32();
    }

    if (obj.HasLoops) {
        obj.LoopCount = bitio.getUI16();
    }

    if (obj.HasEnvelope) {
        var point = 0 | bitio.getUI8();
        var i = 0;
        var EnvelopeRecords = [];
        while (i < point) {
            EnvelopeRecords[i] = {
                Pos44:      bitio.getUI32(),
                LeftLevel:  bitio.getUI16(),
                RightLevel: bitio.getUI16()
            };
            i = 0 | i + 1;
        }
        obj.EnvPoints       = point;
        obj.EnvelopeRecords = EnvelopeRecords;
    }

    return obj;
};

/**
 * parseDefineFontAlignZones
 */
SwfTag.prototype.parseDefineFontAlignZones = function ()
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var FontId = bitio.getUI16();
    var tag    = stage.getCharacter(FontId);

    tag.CSMTableHint = bitio.getUIBits(2);
    bitio.getUIBits(6); // Reserved

    var NumGlyphs = 0 | tag.NumGlyphs;
    var ZoneTable = [];
    var i = 0;
    while (i < NumGlyphs) {
        var NumZoneData = 0 | bitio.getUI8();
        var ZoneData = [];
        var idx = 0;
        while (idx < NumZoneData) {
            ZoneData[idx] = bitio.getUI32();
            idx = 0 | idx + 1;
        }

        ZoneTable[i] = {
            ZoneData: ZoneData,
            Mask: bitio.getUI8()
        };

        i = 0 | i + 1;
    }

    bitio.byteAlign();
    tag.ZoneTable = ZoneTable;
    stage.setCharacter(FontId, tag);
};

/**
 * @param tagType
 */
SwfTag.prototype.parseCSMTextSettings = function (tagType)
{
    var bitio = this.getBitIO();

    var obj = {};
    obj.tagType      = tagType;
    obj.TextID       = bitio.getUI16();
    obj.UseFlashType = bitio.getUIBits(2);
    obj.GridFit      = bitio.getUIBits(3);
    bitio.getUIBits(3); // Reserved

    obj.Thickness = bitio.getUI32();
    obj.Sharpness = bitio.getUI32();
    bitio.getUI8(); // Reserved
};

/**
 * @param tagType
 * @param length
 */
SwfTag.prototype.parseSoundStreamBlock = function (tagType, length)
{
    var bitio = this.getBitIO();

    var obj = {};
    obj.tagType    = tagType;
    obj.compressed = bitio.getData(length);
};

/**
 * @param tagType
 */
SwfTag.prototype.parseDefineVideoStream = function (tagType)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var obj = {};
    obj.tagType     = tagType;
    obj.CharacterId = bitio.getUI16();
    obj.NumFrames   = bitio.getUI16();
    obj.Width       = bitio.getUI16();
    obj.Height      = bitio.getUI16();
    bitio.getUIBits(4); // Reserved

    obj.VideoFlagsDeblocking = bitio.getUIBits(3);
    obj.VideoFlagsSmoothing  = bitio.getUIBits(1);
    obj.CodecID              = bitio.getUI8();

    stage.setCharacter(obj.CharacterId, obj);
    console.log(obj);
};

/**
 *
 * @param tagType
 * @param length
 */
SwfTag.prototype.parseVideoFrame = function (tagType, length)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var startOffset = bitio.byte_offset;

    var obj = {};
    obj.tagType  = tagType;
    obj.StreamID = bitio.getUI16();
    obj.FrameNum = bitio.getUI16();

    var StreamData = stage.getCharacter(obj.StreamID);
    var sub        = bitio.byte_offset - startOffset;
    var dataLength = length - sub;
    var VideoData;
    switch (StreamData.CodecID) {
        case 4:
            VideoData = this.parseVp6SwfVideoPacket(dataLength);
            break;
    }

    bitio.byte_offset = startOffset + length;

    // obj.base64 = 'data:image/jpeg;base64,' + window.btoa(VideoData);
    stage.videos[obj.StreamID] = obj;
};

/**
 * @param length
 * @returns {string}
 */
SwfTag.prototype.parseVp6SwfVideoPacket = function (length)
{
    var bitio = this.getBitIO();

    var VideoData = "";
    var data = bitio.getData(length);

    console.log(data);

    return VideoData;
};

/**
 * parseFileAttributes
 */
SwfTag.prototype.parseFileAttributes = function ()
{
    var bitio = this.getBitIO();

    var obj = {};
    bitio.getUIBit(); // Reserved
    obj.UseDirectBlit = bitio.getUIBit();
    obj.UseGPU        = bitio.getUIBit();
    obj.HasMetadata   = bitio.getUIBit();
    obj.ActionScript3 = bitio.getUIBit();
    obj.Reserved2     = bitio.getUIBits(3);
    obj.UseNetwork    = bitio.getUIBit();
    obj.Reserved3     = bitio.getUIBits(24);
};

/**
 * parseDefineScalingGrid
 */
SwfTag.prototype.parseDefineScalingGrid = function ()
{
    var obj         = {};
    var bitio       = this.getBitIO();
    obj.CharacterId = bitio.getUI16();
    obj.Splitter    = this.rect();
};