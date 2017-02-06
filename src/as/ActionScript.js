/**
 * @param data
 * @param constantPool
 * @param register
 * @param initAction
 * @constructor
 */
var ActionScript = function (data, constantPool, register, initAction)
{
    this.cache        = [];
    this.params       = [];
    this.constantPool = constantPool || [];
    this.register     = register || [];
    this.variables    = {};
    this.initAction   = (initAction) ? true : false;
    this.scope        = null;
    this.parent       = null;
    this.arg          = null;
    this.version      = 7;
    this.superClass   = null;

    if (data.length) {
        this.initialize(data);
    }

    this.initParam();
};

/**
 * util
 */
ActionScript.prototype = Object.create(Util.prototype);
ActionScript.prototype.constructor = ActionScript;

/**
 * reset
 */
ActionScript.prototype.reset = function ()
{
    this.arg       = null;
    this.variables = {};
    this.initParam();
};

/**
 * initParam
 */
ActionScript.prototype.initParam = function ()
{
    var register = this.register;
    var params   = [];
    var length   = 0 | register.length;

    var i = 0;
    while (i < length) {
        var obj = register[i];
        params[obj.register] = (obj.name === null) ? obj.value : obj.name;
        i = 0 | i + 1;
    }

    this.params = params;
};

/**
 * @param values
 */
ActionScript.prototype.initVariable = function (values)
{
    this.arg      = values;
    var register  = this.register;
    var length    = 0 | register.length;
    var variables = this.variables;

    var key = 0;
    var i   = 0;
    while (i < length) {
        var obj = register[i];
        i = 0 | i + 1;

        if (obj.name === null) {
            continue;
        }

        variables[obj.name] = values[key];
        key = 0 | key + 1;
    }

    this.variables = variables;
    this.initParam();
};

/**
 * @returns {{}}
 */
ActionScript.prototype.getSuperClass = function ()
{
    var superClass = this.superClass;
    if (!superClass) {
        var parent = this.parent;
        if (parent) {
            superClass = parent.getSuperClass();
        }
    }
    return superClass;
};

/**
 * @param name
 * @param value
 */
ActionScript.prototype.setVariable = function (name, value)
{
    var finish = false;
    if (name in this.variables) {
        this.variables[name] = value;
        finish = true;
    }

    if (!finish) {
        var parent = this.parent;
        if (parent) {
            finish = parent.setVariable(name, value);
        }
    }

    return finish;
};

/**
 * @param name
 * @returns {*}
 */
ActionScript.prototype.getVariable = function (name)
{
    var value, parent;
    switch (name) {
        case "this":
            value = this.variables["this"];
            break;
        case "arguments":
            value = this.arg;
            break;
        default:
            value = this.variables[name];
            if (value === undefined) {
                parent = this.parent;
                if (parent) {
                    value = parent.getVariable(name);
                }
            }
            break;
    }
    return value;
};

/**
 * @param value
 * @returns {string}
 */
ActionScript.prototype.valueToString = function (value)
{
    if (typeof value !== "string") {
        value += "";
    }
    return value;
};

/**
 * @param str
 * @param mc
 * @returns {*}
 */
ActionScript.prototype.stringToObject = function(str, mc)
{
    var object = this.getVariable(str);
    if (object === undefined) {
        object = mc.getProperty(str);
    }
    return object;
};

/**
 * @param data
 */
ActionScript.prototype.initialize = function (data)
{
    var asData, register, values, NumParams, payloadLength;

    var isEnd        = false;
    var obj          = {};
    var i            = 0;
    var idx          = 0;
    var cache        = [];
    var indexes      = [];
    var withEndPoint = 0;

    var bitio = new BitIO();
    bitio.setData(data);

    var pBitio   = new BitIO();
    var endPoint = data.length;

    this.initParam();

    while (bitio.byte_offset < endPoint) {
        var startOffset = bitio.byte_offset;
        obj = {};

        if (withEndPoint > 0 && withEndPoint === bitio.byte_offset) {
            withEndPoint        = 0;
            obj.actionCode      = 0x94;
            obj.Size            = 0;
            cache[cache.length] = obj;
            continue;
        }

        var actionCode = bitio.getUI8();
        obj.actionCode = actionCode;

        var payload = null;
        if (actionCode >= 0x80) {
            payloadLength = bitio.getUI16();
            payload       = bitio.getData(payloadLength);

            pBitio.setData(payload);
            pBitio.setOffset(0, 0);
        }

        switch (actionCode) {
            // GotoFrame
            case 0x81:
                obj.frame = 0 | pBitio.getUI16() + 1;
                break;
            // WaitForFrame
            case 0x8A:
                obj.frame     = pBitio.getUI16();
                obj.skipCount = pBitio.getUI8();
                break;
            // SetTarget
            case 0x8B:
                obj.targetName = pBitio.getDataUntil("\0");
                break;
            // GoToLabel
            case 0x8C:
                obj.label = pBitio.getDataUntil("\0");
                break;
            case 0x83:
                var len = payload.length - 1;
                var urls = [[]];

                idx = 0;
                i   = 0;
                while (i < len) {
                    var str = this.$fromCharCode(payload[i]);
                    i  = 0 | i + 1;

                    if (payload[i] === 0) {
                        idx = 0 | idx + 1;
                        urls[idx] = [];
                        continue;
                    }
                    urls[idx] += str;
                }

                var urlString = urls[0];
                if (typeof urlString === "string") {
                    var splitUrl = urlString.split("?");
                    if (2 in splitUrl) {
                        urlString  = splitUrl[0];
                        urlString += "?" + splitUrl[1];

                        var paramLength = 0 | splitUrl.length;
                        i = 2;
                        while (i < paramLength) {
                            urlString += "&" + splitUrl[i];
                            i = 0 | i + 1;
                        }
                    }
                }

                obj.url    = urlString;
                obj.target = urls[1];
                break;
            // Push
            case 0x96:
                values = [];
                while (pBitio.byte_offset < payloadLength) {
                    var type = pBitio.getUI8();
                    switch (type) {
                        case 0: // String
                            values[values.length] = String(pBitio.getDataUntil("\0"));
                            break;
                        case 1: // Float
                            values[values.length] = pBitio.getFloat32();
                            break;
                        case 2: // null
                            values[values.length] = null;
                            break;
                        case 3: // undefined
                            values[values.length] = undefined;
                            break;
                        case 4: // RegisterNumber
                            values[values.length] = {"key": pBitio.getUI8()};
                            break;
                        case 5: // Boolean
                            values[values.length] = (pBitio.getUI8()) ? true : false;
                            break;
                        case 6: // Double
                            values[values.length] = pBitio.getFloat64();
                            break;
                        case 7: // Integer
                            values[values.length] = pBitio.getUI32();
                            break;
                        case 8: // Constant8
                            values[values.length] = this.constantPool[pBitio.getUI8()];
                            break;
                        case 9: // Constant16
                            values[values.length] = this.constantPool[pBitio.getUI16()];
                            break;
                        default:
                            break;
                    }
                }
                obj.values = values;
                break;
            // If
            case 0x9D:
                obj.offset = bitio.byte_offset + bitio.toSI16LE(payload);
                break;
            // Jump
            case 0x99:
                obj.offset = bitio.byte_offset + bitio.toSI16LE(payload);
                break;
            // GetURL2
            case 0x9A:
                obj.LoadVariablesFlag = pBitio.getUIBits(1); // 0=none, 1=LoadVariables
                obj.LoadTargetFlag    = pBitio.getUIBits(1); // 0=web,  1=Sprite
                pBitio.getUIBits(4); // Reserved
                obj.SendVarsMethod    = pBitio.getUIBits(2); // 0=NONE, 1=GET, 2=POST
                break;
            // GoToFrame2
            case 0x9F:
                pBitio.getUIBits(6); // Reserved
                obj.SceneBiasFlag = pBitio.getUIBit();
                obj.PlayFlag      = pBitio.getUIBit();// 0=stop, 1=play
                if (obj.SceneBiasFlag === 1) {
                    obj.SceneBias = pBitio.getUI16();
                }
                break;
            // WaitForFrame2
            case 0x8D:
                obj.skipCount = pBitio.getUI8();
                break;
            // ConstantPool
            case 0x88:
                var count = pBitio.getUI16();
                var constantPool = [];
                if (count > 0) {
                    while (count) {
                        count = 0 | count - 1;
                        constantPool[constantPool.length] = pBitio.getDataUntil("\0");
                    }
                }

                obj.constantPool  = constantPool;
                this.constantPool = constantPool;
                break;
            // ActionDefineFunction
            case 0x9b:
                obj.FunctionName = pBitio.getDataUntil("\0");

                NumParams = pBitio.getUI16();
                register  = [];
                if (NumParams > 0) {
                    idx = 1;
                    while (NumParams) {
                        NumParams = 0 | NumParams - 1;
                        register[register.length] = {
                            register: idx,
                            name:     pBitio.getDataUntil("\0"),
                            value:    null
                        };
                    }
                }

                asData = bitio.getData(pBitio.getUI16());
                obj.ActionScript = new ActionScript(asData, this.constantPool, register, this.initAction);

                break;
            // ActionWith
            case 0x94:
                obj.Size     = pBitio.getUI16();
                withEndPoint = obj.Size + bitio.byte_offset;
                break;
            // ActionStoreRegister
            case 0x87:
                obj.RegisterNumber = pBitio.getUI8();
                break;
            // SWF 7 ***********************************
            // ActionDefineFunction2
            case 0x8e:
                register = [];
                values   = [];

                obj.FunctionName          = pBitio.getDataUntil("\0");
                NumParams                 = pBitio.getUI16();
                var RegisterCount         = pBitio.getUI8();
                obj.PreloadParentFlag     = pBitio.getUIBits(1);
                obj.PreloadRootFlag       = pBitio.getUIBits(1);
                obj.SuppressSuperFlag     = pBitio.getUIBits(1);
                obj.PreloadSuperFlag      = pBitio.getUIBits(1);
                obj.SuppressArgumentsFlag = pBitio.getUIBits(1);
                obj.PreloadArgumentsFlag  = pBitio.getUIBits(1);
                obj.SuppressThisFlag      = pBitio.getUIBits(1);
                obj.PreloadThisFlag       = pBitio.getUIBits(1);
                pBitio.getUIBits(7); // Reserved
                obj.PreloadGlobalFlag     = pBitio.getUIBits(1);

                if (obj.PreloadThisFlag) {
                    values[values.length] = "this";
                }

                if (obj.PreloadArgumentsFlag) {
                    values[values.length] = "arguments";
                }

                if (obj.PreloadSuperFlag) {
                    values[values.length] = "super";
                }

                if (obj.PreloadRootFlag) {
                    values[values.length] = "_root";
                }

                if (obj.PreloadParentFlag) {
                    values[values.length] = "_parent";
                }

                if (obj.PreloadGlobalFlag) {
                    values[values.length] = "_global";
                }

                idx = 1;
                while ( idx < RegisterCount) {
                    var rIdx = idx - 1;
                    if (!(rIdx in values)) {
                        idx = 0 | idx + 1;
                        continue;
                    }

                    register[register.length] = {
                        register: idx,
                        name:     null,
                        value:    values[rIdx]
                    };

                    idx = 0 | idx + 1;
                }

                if (NumParams > 0) {
                    while (NumParams) {
                        NumParams = 0 | NumParams - 1;
                        var Register  = pBitio.getUI8();
                        var ParamName = pBitio.getDataUntil("\0");
                        register[register.length] = {
                            register: Register,
                            name:     ParamName,
                            value:    null
                        };
                    }
                }

                asData = bitio.getData(pBitio.getUI16());
                obj.ActionScript = new ActionScript(asData, this.constantPool, register, this.initAction);
                break;
            // ActionTry
            case 0x8f:
                pBitio.getUIBits(5); // Reserved
                var CatchInRegisterFlag = pBitio.getUIBits(1);
                obj.FinallyBlockFlag    = pBitio.getUIBits(1);
                obj.CatchBlockFlag      = pBitio.getUIBits(1);

                var TrySize     = pBitio.getUI16();
                var CatchSize   = pBitio.getUI16();
                var FinallySize = pBitio.getUI16();

                var CatchName;
                if (!CatchInRegisterFlag) {
                    CatchName = pBitio.getDataUntil("\0");
                } else {
                    CatchName = pBitio.getUI8();
                }

                i = 0;
                var TryBody = [];
                if (TrySize) {
                    while (TrySize) {
                        TryBody[TryBody.length] = bitio.getUI8();
                        TrySize = 0 | TrySize - 1;
                    }
                }

                obj.try = (function (data)
                {
                    var as = new ActionScript(data);
                    return function ()
                    {
                        as.reset();
                        as.variables["this"] = this;
                        return as.execute(this);
                    };
                })(TryBody);

                if (obj.CatchBlockFlag) {
                    var CatchBody = [];
                    if (CatchSize) {
                        while (CatchSize) {
                            CatchBody[CatchBody.length] = bitio.getUI8();
                            CatchSize = 0 | CatchSize - 1;
                        }
                    }

                    obj.catch = (function (data, catchName)
                    {
                        var as = new ActionScript(data);
                        return function ()
                        {
                            as.reset();
                            as.variables["this"] = this;
                            as.variables[catchName] = arguments[0];
                            return as.execute(this);
                        };
                    })(CatchBody, CatchName);
                }

                if (obj.FinallyBlockFlag) {
                    var FinallyBody = [];
                    if (FinallySize) {
                        while (FinallySize) {
                            FinallyBody[FinallyBody.length] = bitio.getUI8();
                            FinallySize = 0 | FinallySize - 1;
                        }
                    }

                    obj.finally = (function (data)
                    {
                        var as = new ActionScript(data);
                        return function ()
                        {
                            as.reset();
                            as.variables["this"] = this;
                            return as.execute(this);
                        };
                    })(FinallyBody);
                }

                break;
            case 0x00:
                isEnd = true;
                break;
        }

        indexes[startOffset] = cache.length;
        cache[cache.length]  = obj;

        if (isEnd) {
            break;
        }
    }

    // If and Jump
    var length = 0 | cache.length;
    i = 0;

    while (i < length) {
        obj = cache[i];
        i = 0 | i + 1;

        var code = obj.actionCode;
        switch (code) {
            case 0x9D:
            case 0x99:
                var index = indexes[obj.offset];

                obj.offset  = (index !== undefined) ? 0 | index - 1 : 0 | length - 1;
                break;
            default:
                break;
        }
    }

    this.cache = cache;
};

/**
 * @param value
 * @returns {*}
 */
ActionScript.prototype.calc = function (value)
{
    var calc;
    switch (typeof value) {
        case "boolean":
            calc = (value) ? 1 : 0;
            break;
        case "object":
            if (value === null) {
                calc = 0;
            } else if (value instanceof Array) {
                calc = value.length;
            } else if (value instanceof Object) {
                calc = 1;
            }
            break;
        default:
            calc = +value;
            break;
    }

    if (this.$isNaN(calc)) {
        calc = 0;
    }

    return calc;
};

/**
 * @param value
 * @returns {*}
 */
ActionScript.prototype.logicValue = function (value)
{
    var calc;
    switch (typeof value) {
        case "boolean":
            calc = (value) ? 1 : 0;
            break;
        case "object":
            if (value === null) {
                calc = 0;
            } else if (value instanceof Array) {
                calc = value.length;
            } else if (value instanceof Object) {
                calc = 1;
            }
            break;
        case "string":
            if (value === "") {
                calc = 0;
            } else {
                calc = 1;
            }
            break;
        case "function":
            calc = 1;
            break;
        default:
            calc = +value;
            if (this.$isNaN(calc)) {
                calc = 0;
            }
            break;
    }
    return calc;
};

/**
 * @param stack
 * @returns {Number}
 */
ActionScript.prototype.operationValue = function (stack)
{
    var value = +stack.pop();
    if (this.$isNaN(value)) {
        value = 0;
    }
    return value;
};

/**
 * @param mc
 * @returns {*}
 */
ActionScript.prototype.execute = function (mc)
{
    var scope = this.scope;
    var movieClip = (scope instanceof MovieClip) ? scope : mc;
    if (!movieClip.active) {
        return undefined;
    }
    var stage = movieClip.getStage();
    if (stage) {
        this.version = stage.getVersion();
    }

    var stack   = [];
    var cache   = this.cache;
    var cLength = 0 | cache.length;
    var cIdx    = 0;

    while(cIdx < cLength) {
        // if (!(cIdx in cache)) {
        //     cIdx = 0 | cIdx + 1;
        //     continue;
        // }

        var aScript    = cache[cIdx];
        var actionCode = 0 | aScript.actionCode;
        if (actionCode === 0) {
            break;
        }

        switch (actionCode) {
            // ********************************************
            // SWF 3
            // ********************************************
            case 0x81:
                this.ActionGotoFrame(movieClip, aScript.frame);
                break;
            case 0x04:
                this.ActionNextFrame(movieClip);
                break;
            case 0x05:
                this.ActionPreviousFrame(movieClip);
                break;
            case 0x06:
                this.ActionPlay(movieClip);
                break;
            case 0x07:
                this.ActionStop(movieClip);
                break;
            case 0x08: // ActionToggleQuality
            case 0x8A: // ActionWaitForFrame
                break;
            case 0x09:
                this.ActionStopSounds(movieClip);
                break;
            case 0x8B:
                movieClip = this.ActionSetTarget(movieClip, mc, aScript.targetName);
                break;
            case 0x8C:
                this.ActionGoToLabel(movieClip, aScript.label);
                break;
            case 0x83:
                this.ActionGetURL(movieClip, aScript.url, aScript.target);
                break;

            // ********************************************
            // SWF 4
            // ********************************************
            case 0x0A: // ActionAdd
                this.ActionOperation(stack, 0);
                break;
            case 0x0B: // ActionSubtract
                this.ActionOperation(stack, 1);
                break;
            case 0x0C: // ActionMultiply
                this.ActionOperation(stack, 2);
                break;
            case 0x0D: // ActionDivide
                this.ActionOperation(stack, 3);
                break;
            case 0x0E:
                this.ActionEquals(stack);
                break;
            case 0x0F:
                this.ActionLess(stack);
                break;
            case 0x10:
                this.ActionAnd(stack);
                break;
            case 0x11:
                this.ActionOr(stack);
                break;
            case 0x12:
                this.ActionNot(stack);
                break;
            case 0x13:
                this.ActionStringEquals(stack);
                break;
            case 0x14: // ActionStringLength
            case 0x31: // ActionMBStringLength
                this.ActionStringLength(stack);
                break;
            case 0x21:
                this.ActionStringAdd(stack);
                break;
            case 0x15:// ActionStringExtract
            case 0x35:// ActionMBStringExtract
                this.ActionStringExtract(stack);
                break;
            case 0x29:
                this.ActionStringLess(stack);
                break;
            case 0x17: // ActionPop
                stack.pop();
                break;
            case 0x96:
                this.ActionPush(stack, movieClip, aScript.values);
                break;
            case 0x33: // ActionAsciiToChar
            case 0x37: // ActionMBAsciiToChar
                this.ActionAsciiToChar(stack);
                break;
            case 0x36: // ActionMBCharToAscii
            case 0x32: // ActionCharToAscii
                this.ActionCharToAscii(stack);
                break;
            case 0x18:
                this.ActionToInteger(stack);
                break;
            case 0x9E:
                this.ActionCall(stack, movieClip);
                break;
            case 0x9D:
                cIdx = 0 | this.ActionIf(stack, aScript.offset, cIdx);
                break;
            case 0x99: // ActionJump
                cIdx = 0 | aScript.offset;
                break;
            case 0x1C:
                this.ActionGetVariable(stack, movieClip);
                break;
            case 0x1D:
                this.ActionSetVariable(stack, movieClip);
                break;
            case 0x9A:
                this.ActionGetURL2(stack, aScript, movieClip);
                break;
            case 0x22:
                this.ActionGetProperty(stack, movieClip);
                break;
            case 0x9F:
                this.ActionGoToFrame2(stack, aScript, movieClip);
                break;
            case 0x20:
                movieClip = this.ActionSetTarget2(stack, movieClip, mc);
                break;
            case 0x23:
                this.ActionSetProperty(stack, movieClip);
                break;
            case 0x27:
                this.ActionStartDrag(stack, movieClip);
                break;
            case 0x8D: // ActionWaitForFrame2
                stack.pop();
                break;
            case 0x24:
                this.ActionCloneSprite(stack, movieClip);
                break;
            case 0x25:
                this.ActionRemoveSprite(stack, movieClip);
                break;
            case 0x28:
                this.ActionEndDrag(movieClip);
                break;
            case 0x34:
                this.ActionGetTime(stack);
                break;
            case 0x30:
                this.ActionRandomNumber(stack);
                break;
            case 0x26:
                this.ActionTrace(stack);
                break;
            case 0x00:
                break;
            case 0x2D:
                this.ActionFsCommand2(stack, movieClip);
                break;

            // ********************************************
            // SWF 5
            // ********************************************
            case 0x52:
                this.ActionCallMethod(stack, movieClip);
                break;
            case 0x88: // ActionConstantPool
                this.constantPool = aScript.constantPool;
                break;
            case 0x3d:
                this.ActionCallFunction(stack, movieClip);
                break;
            case 0x9b:
                this.ActionDefineFunction(stack, aScript, movieClip);
                break;
            case 0x3c:
                this.ActionDefineLocal(stack, movieClip);
                break;
            case 0x41:
                this.ActionDefineLocal2(stack, movieClip);
                break;
            case 0x3a:
                this.ActionDelete(stack, movieClip);
                break;
            case 0x3b:
                this.ActionDelete2(stack, movieClip);
                break;
            case 0x46:
                this.ActionEnumerate(stack, movieClip);
                break;
            case 0x49:
                this.ActionEquals2(stack);
                break;
            case 0x4e:
                this.ActionGetMember(stack, movieClip);
                break;
            case 0x42:
                this.ActionInitArray(stack);
                break;
            case 0x43:
                this.ActionInitObject(stack);
                break;
            case 0x53:
                this.ActionNewMethod(stack, movieClip);
                break;
            case 0x40:
                this.ActionNewObject(stack, movieClip);
                break;
            case 0x4f:
                this.ActionSetMember(stack, movieClip);
                break;
            case 0x45:
                this.ActionTargetPath(stack);
                break;
            case 0x94:
                movieClip = this.ActionWith(stack, aScript.Size, mc);
                break;
            case 0x4a:
                this.ActionToNumber(stack);
                break;
            case 0x4b:
                this.ActionToString(stack);
                break;
            case 0x44:
                this.ActionTypeOf(stack);
                break;
            case 0x47:
                this.ActionAdd2(stack);
                break;
            case 0x48:
                this.ActionLess2(stack);
                break;
            case 0x3f:
                this.ActionModulo(stack);
                break;
            case 0x60:
                this.ActionBitAnd(stack);
                break;
            case 0x63:
                this.ActionBitLShift(stack);
                break;
            case 0x61:
                this.ActionBitOr(stack);
                break;
            case 0x64:
                this.ActionBitRShift(stack);
                break;
            case 0x65:
                this.ActionBitURShift(stack);
                break;
            case 0x62:
                this.ActionBitXor(stack);
                break;
            case 0x51:
                this.ActionDecrement(stack);
                break;
            case 0x50:
                this.ActionIncrement(stack);
                break;
            case 0x4c:
                this.ActionPushDuplicate(stack);
                break;
            case 0x3e: // ActionReturn
                return stack.pop();
            case 0x4d:
                this.ActionStackSwap(stack);
                break;
            case 0x87:
                this.ActionStoreRegister(stack, aScript.RegisterNumber);
                break;

            // ********************************************
            // SWF 6
            // ********************************************
            case 0x54:
                this.ActionInstanceOf(stack);
                break;
            case 0x55:
                this.ActionEnumerate(stack, movieClip);
                break;
            case 0x66:
                this.ActionStrictEquals(stack);
                break;
            case 0x67: // ActionGreater
            case 0x68: // ActionStringGreater
                this.ActionGreater(stack);
                break;

            // ********************************************
            // SWF 7
            // ********************************************
            case 0x8e: // ActionDefineFunction2
                this.ActionDefineFunction(stack, aScript, movieClip);
                break;
            case 0x69:
                this.ActionExtends(stack);
                break;
            case 0x2b:
                this.ActionCastOp(stack);
                break;
            case 0x2c:
                this.ActionImplementsOp(stack);
                break;
            case 0x8f:
                this.ActionTry(aScript, movieClip);
                break;
            case 0x2a:
                this.ActionThrow(stack);
                break;

            default:
                console.log("[ActionScript Error] Code: " + actionCode);
                break;
        }

        cIdx = 0 | cIdx + 1;
    }
};

/**
 * @type {{}}
 */
ActionScript.prototype.methods = {
    gotoandstop: "gotoAndStop",
    gotoandplay: "gotoAndPlay",
    play: "play",
    stop: "stop",
    duplicatemovieclip: "duplicateMovieClip",
    getproperty: "getProperty",
    removemovieclip: "removeMovieClip",
    setproperty: "setProperty",
    startdrag: "startDrag",
    stopdrag: "stopDrag",
    targetpath: "targetPath",
    updateafterevent: "updateAfterEvent",
    nextframe: "nextFrame",
    nextscene: "nextScene",
    prevframe: "prevFrame",
    prevscene: "prevScene",
    stopallsounds: "stopAllSounds",
    setmask: "setMask",
    geturl: "getURL",
    loadmovie: "loadMovie",
    loadmovienum: "loadMovieNum",
    loadvariables: "loadVariables",
    loadvariablesnum: "loadVariablesNum",
    unloadmovie: "unloadMovie",
    unloadmovienum: "unloadMovieNum",
    swapdepths: "swapDepths",
    getinstanceatdepth: "getInstanceAtDepth",
    attachmovie: "attachMovie",
    attachaudio: "attachAudio",
    attachbitmap: "attachBitmap",
    getnexthighestdepth: "getNextHighestDepth",
    getbytesloaded: "getBytesLoaded",
    getbytestotal: "getBytesTotal",
    assetpropflags: "ASSetPropFlags",
    linestyle: "lineStyle",
    linegradientstyle: "lineGradientStyle",
    beginfill: "beginFill",
    begingradientfill: "beginGradientFill",
    beginbitmapfill: "beginBitmapFill",
    clear: "clear",
    moveto: "moveTo",
    lineto: "lineTo",
    curveto: "curveTo",
    endfill: "endFill",
    hittest: "hitTest",
    getdepth: "getDepth",
    createemptymovieclip: "createEmptyMovieClip",
    createtextfield: "createTextField",
    getbounds: "getBounds",
    getrect: "getRect",
    getswfversion: "getSWFVersion",
    gettextsnapshot: "getTextSnapshot",
    globaltolocal: "globalToLocal",
    localtoglobal: "localToGlobal"
};

/**
 * @param method
 * @returns {*}
 */
ActionScript.prototype.checkMethod = function (method)
{
    if (!method || typeof method !== "string") {
        return method;
    }

    var lowerMethod = method.toLowerCase();
    return this.methods[lowerMethod] || null;
};

/**
 * @param mc
 * @param frame
 */
ActionScript.prototype.ActionGotoFrame = function (mc, frame)
{
    if (mc !== undefined) {
        mc.stop();
        mc.setNextFrame(frame);
    }
};

/**
 * @param mc
 */
ActionScript.prototype.ActionNextFrame = function (mc)
{
    if (mc !== undefined) {
        mc.nextFrame();
    }
};

/**
 * @param mc
 */
ActionScript.prototype.ActionPreviousFrame = function (mc)
{
    if (mc !== undefined) {
        mc.prevFrame();
    }
};

/**
 * @param mc
 */
ActionScript.prototype.ActionPlay = function (mc)
{
    if (mc !== undefined) {
        mc.play();
    }
};

/**
 * @param mc
 */
ActionScript.prototype.ActionStop = function (mc)
{
    if (mc !== undefined) {
        mc.stop();
    }
};

/**
 * @param mc
 */
ActionScript.prototype.ActionStopSounds = function (mc)
{
    if (mc !== undefined) {
        mc.stopAllSounds();
    }
};

/**
 * @param movieClip
 * @param mc
 * @param target
 * @returns {*}
 */
ActionScript.prototype.ActionSetTarget = function (movieClip, mc, target)
{
    if (target !== "") {
        var targetMc = movieClip;
        if (!targetMc) {
            targetMc = mc;
        }
        return targetMc.getDisplayObject(target);
    } else {
        if (mc.active) {
            return mc;
        } else {
            return undefined;
        }
    }
};

/**
 * @param mc
 * @param label
 */
ActionScript.prototype.ActionGoToLabel = function (mc, label)
{
    if (mc !== undefined) {
        var frame = mc.getLabel(label);
        mc.stop();

        if (typeof frame === "number" && frame) {
            mc.setNextFrame(frame);
        }
    }
};

/**
 * @param mc
 * @param url
 * @param target
 */
ActionScript.prototype.ActionGetURL = function (mc, url, target)
{
    if (mc !== undefined) {
        mc.getURL(url, target);
    }
};

/**
 * @param stack
 * @param operation
 */
ActionScript.prototype.ActionOperation = function (stack, operation)
{
    var a = 0 | this.operationValue(stack);
    var b = 0 | this.operationValue(stack);
    var value;
    switch (operation) {
        case 0:
            value = b + a;
            break;
        case 1:
            value = b - a;
            break;
        case 2:
            value = b * a;
            break;
        case 3:
            value = b / a;
            break;
    }
    stack[stack.length] = value;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionEquals = function (stack)
{
    var a = this.calc(stack.pop());
    var b = this.calc(stack.pop());
    if (this.version > 4) {
        stack[stack.length] = (a === b);
    } else {
        stack[stack.length] = (a === b) ? 1 : 0;
    }
};

/**
 * @param stack
 */
ActionScript.prototype.ActionLess = function (stack)
{
    var a = this.calc(stack.pop());
    var b = this.calc(stack.pop());
    if (this.version > 4) {
        stack[stack.length] = (b < a);
    } else {
        stack[stack.length] = (b < a) ? 1 : 0;
    }
};

/**
 * @param stack
 */
ActionScript.prototype.ActionAnd = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    if (this.version > 4) {
        a = this.logicValue(a);
        b = this.logicValue(b);
        stack[stack.length] = (a !== 0 && b !== 0);
    } else {
        a = this.calc(a);
        b = this.calc(b);
        stack[stack.length] = (a !== 0 && b !== 0) ? 1 : 0;
    }
};

/**
 * @param stack
 */
ActionScript.prototype.ActionOr = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    if (this.version > 4) {
        a = this.logicValue(a);
        b = this.logicValue(b);
        stack[stack.length] = (a !== 0 || b !== 0);
    } else {
        a = this.calc(a);
        b = this.calc(b);
        stack[stack.length] = (a !== 0 || b !== 0) ? 1 : 0;
    }
};

/**
 * @param stack
 */
ActionScript.prototype.ActionNot = function (stack)
{
    var a = stack.pop();
    if (this.version > 4) {
        a = this.logicValue(a);
        stack[stack.length] = (a === 0);
    } else {
        a = this.calc(a);
        stack[stack.length] = (a === 0) ? 1 : 0;
    }
};

/**
 * @param stack
 */
ActionScript.prototype.ActionStringEquals = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();

    if (a instanceof MovieClip) {
        a = a.getTarget();
    } else {
        a += "";
    }

    if (b instanceof MovieClip) {
        b = b.getTarget();
    } else {
        b += "";
    }

    if (this.version > 4) {
        stack[stack.length] = (b === a);
    } else {
        stack[stack.length] = (b === a) ? 1 : 0;
    }
};

/**
 * @param stack
 */
ActionScript.prototype.ActionStringLength = function (stack)
{
    var value  = stack.pop();
    value      = this.valueToString(value);
    var sLen   = value.length;

    var length = 0;
    var i      = 0;
    while (i < sLen) {
        var code = 0 | value.charCodeAt(i);
        i = (i + 1)|0;

        length = (length + 1)|0;
        if (255 > code) {
            continue;
        }

        // jp string
        length = (length + 1)|0;
    }

    stack[stack.length] = length;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionStringAdd = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();

    if (a === null || a === undefined) {
        a = "";
    }

    if (b === null || b === undefined) {
        b = "";
    }

    stack[stack.length] = b + a;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionStringExtract = function (stack)
{
    var count  = stack.pop();
    var index  = stack.pop();
    var string = stack.pop();
    string = this.valueToString(string);

    index -= 1;
    if (index < 0) {
        index = 0;
    }

    stack[stack.length] = (count < 0) ? string.substr(index) : string.substr(index, count);
};

/**
 * @param stack
 */
ActionScript.prototype.ActionStringLess = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    if (this.version > 4) {
        stack[stack.length] = (b < a);
    } else {
        stack[stack.length] = (b < a) ? 1 : 0;
    }
};

/**
 * @param stack
 * @param mc
 * @param values
 */
ActionScript.prototype.ActionPush = function (stack, mc, values)
{
    var length = 0 | values.length;
    var params = this.params;

    var i = 0;
    while (i < length) {
        var value = values[i];
        i = 0 | i + 1;

        if (this.version > 4 && value instanceof Object) {
            var key = value.key;
            value   = undefined;
            if (key in params) {
                var name = params[key];
                if (typeof name === "string") {
                    value = this.getVariable(name);
                    if (value === undefined && !(name in this.variables)) {
                        value = name;
                    }
                } else {
                    value = name;
                }
            }
        }

        stack[stack.length] = value;
    }
};

/**
 * @param stack
 */
ActionScript.prototype.ActionAsciiToChar = function (stack)
{
    var value = stack.pop();
    stack[stack.length] = this.$fromCharCode(value);
};

/**
 * @param stack
 */
ActionScript.prototype.ActionCharToAscii = function (stack)
{
    var value = stack.pop();
    value     = this.valueToString(value);
    stack[stack.length] = value.charCodeAt(0);
};

/**
 * @param stack
 */
ActionScript.prototype.ActionToInteger = function (stack)
{
    var value = stack.pop();
    stack[stack.length] = 0 | value;
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionCall = function (stack, mc)
{
    var value = stack.pop();
    if (mc !== undefined) {
        var frame;

        value = this.valueToString(value);

        var splitData = value.split(":");
        var label     = splitData[0];
        var targetMc  = mc;

        if (splitData.length > 1) {
            targetMc = mc.getDisplayObject(splitData[0]);
            label    = splitData[1];
        }

        if (targetMc !== undefined) {
            frame = (typeof label === "string") ? targetMc.getLabel(label) : label;
            targetMc.executeActions(frame);
        }
    }
};

/**
 * @param stack
 * @param offset
 * @param index
 * @returns {*}
 */
ActionScript.prototype.ActionIf = function (stack, offset, index)
{
    var condition = stack.pop();
    switch (typeof condition) {
        case "boolean":
            break;
        case "string":
            if (!this.$isNaN(condition)) {
                condition = +condition;
            }
            break;
    }

    if (condition) {
        return offset;
    }

    return index;
};

/**
 * @param stack
 * @param mc
 * @returns {undefined}
 */
ActionScript.prototype.ActionGetVariable = function (stack, mc)
{
    var name = stack.pop();
    var value;
    if (name instanceof MovieClip) {
        value = name;
    } else {
        value = this.getNativeClass(name);
        if (value === undefined) {
            value = this.getVariable(name);
            if (value === undefined && mc) {
                value = mc.getProperty(name);
            }
        }
    }
    stack[stack.length] = value;
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionSetVariable = function (stack, mc)
{
    var value = stack.pop();
    var name  = stack.pop();
    if (!this.setVariable(name, value)) {
        mc.setProperty(name, value);
    }
};

/**
 * @param stack
 * @param aScript
 * @param mc
 */
ActionScript.prototype.ActionGetURL2 = function (stack, aScript, mc)
{
    var target = stack.pop();
    var value  = stack.pop();

    var LoadVariablesFlag = aScript.LoadVariablesFlag; // 0=none, 1=LoadVariables
    var LoadTargetFlag    = aScript.LoadTargetFlag;    // 0=web,  1=Sprite
    var SendVarsMethod    = aScript.SendVarsMethod;    // 0=NONE, 1=GET, 2=POST

    var method = "GET";
    if (SendVarsMethod === 2) {
        method = "POST";
    }

    var url;
    if (mc instanceof MovieClip) {
        if (value) {
            value = this.valueToString(value);

            var urls  = value.split("?");
            var uLen  = 0 | urls.length;
            var query = "";
            if (uLen === 1) {
                query = "?";
            }

            if (uLen > 2) {
                url = urls[0] + "?";
                url = url + urls[1];

                var u = 2;
                while (u < uLen) {
                    var params = urls[u];
                    u = 0 | u + 1;
                    url = url + "&" + params;
                }
            } else {
                url = value;
            }

            // local variables
            if (SendVarsMethod) {
                var variables   = mc.variables;
                var queryString = "";
                for (var key in variables) {
                    if (!variables.hasOwnProperty(key)) {
                        continue;
                    }

                    var val = variables[key];
                    if (val === null) {
                        val = "";
                    }

                    if (typeof val !== "string") {
                        var typeText = typeof val;
                        typeText = typeText.replace(/^[a-z]/g, function (str)
                        {
                            return str.toUpperCase();
                        });
                        val = "%5Btype+" + typeText + "%5D";
                    }

                    queryString += "&" + key + "=" + val;
                }

                if (query !== "" && queryString !== "") {
                    queryString = query + queryString.slice(1);
                }
                url += queryString;
            }

            if (LoadVariablesFlag) {
                mc.loadVariables(url, target, method);
            } else if (LoadTargetFlag) {
                if (target instanceof MovieClip) {
                    target.loadMovie(url, null, SendVarsMethod);
                } else {
                    mc.loadMovie(url, target, SendVarsMethod);
                }
            } else {
                mc.getURL(url, target, method);
            }
        } else {
            mc.unloadMovie(target);
        }
    }
};

/**
 * @param stack
 * @param mc
 * @returns {*}
 */
ActionScript.prototype.ActionGetProperty = function (stack, mc)
{
    var index  = stack.pop();
    var target = stack.pop();

    if (!this.$isNaN(index)) {
        index = this.$floor(index);
    }

    var value = this.getVariable(index);
    if (value === undefined && mc) {
        var targetMc = mc;
        if (target) {
            target  += "";
            targetMc = mc.getDisplayObject(target);
        }

        if (targetMc instanceof MovieClip) {
            value = targetMc.getProperty(index);
        }
    }

    stack[stack.length] = value;
};

/**
 * @param stack
 * @param aScript
 * @param mc
 */
ActionScript.prototype.ActionGoToFrame2 = function (stack, aScript, mc)
{
    var SceneBiasFlag = aScript.SceneBiasFlag;
    var PlayFlag      = aScript.PlayFlag; // 0=stop, 1=play

    if (SceneBiasFlag === 1) {
        var SceneBias = aScript.SceneBias;
        console.log("SceneBias", SceneBias);
    }

    var frame = stack.pop();
    if (frame && mc) {
        if (this.$isNaN(frame)) {
            var splitData = frame.split(":");
            if (splitData.length > 1) {
                var targetMc = mc.getDisplayObject(splitData[0]);
                if (targetMc) {
                    frame = targetMc.getLabel(splitData[1]);
                }
            } else {
                frame = mc.getLabel(splitData[0]);
            }
        }

        if (typeof frame === "string") {
            frame |= 0;
        }

        if (typeof frame === "number" && frame > 0) {
            mc.setNextFrame(frame);
            if (PlayFlag) {
                mc.play();
            } else {
                mc.stop();
            }
        }
    }
};

/**
 * @param stack
 * @param movieClip
 * @param mc
 * @returns {*}
 */
ActionScript.prototype.ActionSetTarget2 = function (stack, movieClip, mc)
{
    var target = stack.pop();
    if (!movieClip) {
        movieClip = mc;
    }
    return movieClip.getDisplayObject(target);
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionSetProperty = function (stack, mc)
{
    var value  = stack.pop();
    var index  = stack.pop();
    var target = stack.pop();

    if (!this.$isNaN(index)) {
        index = this.$floor(index);
    }

    if (mc) {
        var targetMc = mc;
        if (target !== undefined) {
            targetMc = mc.getDisplayObject(target);
        }

        if (targetMc !== undefined && targetMc.getClassName() === "MovieClip") {
            targetMc.setProperty(index, value);
        }
    }
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionStartDrag = function (stack, mc)
{
    var target = stack.pop();
    var lock = stack.pop();
    var constrain = stack.pop();
    var y2 = null;
    var x2 = null;
    var y1 = null;
    var x1 = null;
    if (constrain) {
        y2 = stack.pop();
        x2 = stack.pop();
        y1 = stack.pop();
        x1 = stack.pop();
    }

    var targetMc = mc;
    if (target instanceof MovieClip) {
        targetMc = target;
    }

    if (typeof target === "string" && target) {
        targetMc = mc.getDisplayObject(target);
    }

    if (targetMc instanceof MovieClip) {
        targetMc.startDrag(lock, x1, y1, x2, y2);
    }
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionCloneSprite = function (stack, mc)
{
    var depth = +stack.pop();
    var target = stack.pop();
    var source = stack.pop();
    if (mc) {
        mc.duplicateMovieClip(target, source, depth);
    }
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionRemoveSprite = function (stack, mc)
{
    var target = stack.pop();
    if (mc) {
        mc.removeMovieClip(target);
    }
};

/**
 * @param mc
 */
ActionScript.prototype.ActionEndDrag = function (mc)
{
    if (mc) {
        mc.stopDrag();
    }
};

/**
 * @param stack
 */
ActionScript.prototype.ActionGetTime = function (stack)
{
    var now = new Date();
    stack[stack.length] = now.getTime() - this.$Date.getTime();
};

/**
 * @param stack
 */
ActionScript.prototype.ActionRandomNumber = function (stack)
{
    var maximum = stack.pop();
    stack[stack.length] = this.$floor(this.$random() * maximum);
};

/**
 * @param stack
 */
ActionScript.prototype.ActionTrace = function (stack)
{
    var value = stack.pop();
    if (value instanceof DisplayObject && value.removeFlag) {
        value = "";
    }
    if (value && typeof value === "object") {
        if ("callee" in value) {
            value = Array.prototype.slice.call(value);
        }
        value = value.toString();
    }
    console.log("[trace] " + value);
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionFsCommand2 = function (stack, mc)
{
    stack.pop(); // count
    var method = stack.pop();
    var now = new Date();
    switch (method.toLowerCase()) {
        case "getdateyear":
            stack[stack.length] = now.getFullYear();
            break;
        case "getdatemonth":
            stack[stack.length] = now.getMonth() + 1;
            break;
        case "getdateday":
            stack[stack.length] = now.getDate();
            break;
        case "getdateweekday":
            stack[stack.length] = now.getDay();
            break;
        case "gettimehours":
            stack[stack.length] = now.getHours();
            break;
        case "gettimeminutes":
            stack[stack.length] = now.getMinutes();
            break;
        case "gettimeseconds":
            stack[stack.length] = now.getSeconds();
            break;
        case "startvibrate":
            stack.pop();
            stack.pop();
            stack.pop();
            stack[stack.length] = -1;
            break;
        case "gettimezoneoffset":
            mc.setVariable(stack.pop(), now.toUTCString());
            mc.setVariable(stack.pop(), 0);
            break;
        case "getlocalelongdate":
            mc.setVariable(stack.pop(), now.toLocaleDateString());
            mc.setVariable(stack.pop(), 0);
            break;
        case "getlocaleshortdate":
            mc.setVariable(stack.pop(), now.toDateString());
            mc.setVariable(stack.pop(), 0);
            break;
        case "getlocaletime":
            mc.setVariable(stack.pop(), now.toLocaleTimeString());
            mc.setVariable(stack.pop(), 0);
            break;
        case "getnetworkname":
        case "getdevice":
        case "getdeviceid":
            mc.setVariable(stack.pop(), "");
            mc.setVariable(stack.pop(), -1);
            break;
        case "getlanguage":
            var language = this.$navigator.userLanguage ||
                this.$navigator.language ||
                this.$navigator.browserLanguage ||
                "ja-JP";
            mc.setVariable(stack.pop(), language);
            mc.setVariable(stack.pop(), 0);
            break;
        case "setsoftkeys":
            stack.pop();
            stack.pop();
            stack[stack.length] = -1;
            break;
        case "fullscreen":
            stack.pop(); // bool
            stack[stack.length] = -1;
            break;
        case "setquality":
        case "getfreestagememory":
        case "gettotalstagememory":
            stack.pop();
            stack[stack.length] = -1;
            break;
        default:
            stack[stack.length] = -1;
            break;
    }
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionCallMethod = function (stack, mc)
{
    var method = stack.pop();
    var object = stack.pop();
    var count = +stack.pop();

    var params = [];
    if (count > 0) {
        while (count) {
            count = 0 | count - 1;

            var param = stack.pop();
            if (param && typeof param === "object" && "callee" in param) {
                param = Array.prototype.slice.call(param);
            }
            params[params.length] = param;
        }
    }

    if (typeof object === "string" && object[method] === undefined) {
        var target = this.stringToObject(object, mc);
        if (target) {
            object = target;
        }

        if (object === "super") {
            var caller     = this.variables["this"];
            var SuperClass = this.getSuperClass();
            if (!method && SuperClass) {
                var sc = new SuperClass();
                switch (SuperClass) {
                    case MovieClip:
                        var loadStage = mc.getStage();
                        sc.setStage(loadStage);
                        sc.setParent(mc);
                        sc._extend = true;
                        break;
                }

                var proto = Object.getPrototypeOf(caller);
                proto.constructor = SuperClass;
                Object.setPrototypeOf(proto, sc);
                Object.setPrototypeOf(caller, proto);
            } else {
                object = caller;
            }
        }
    }

    var value;
    if (object && method) {
        var func;
        if (typeof object === "object") {
            var variables = object.variables;
            if (variables) {
                func = variables[method];
                if (!func && variables.registerClass) {
                    func = variables.registerClass[method];
                }
            }
        }

        if (!func) {
            var originMethod = this.checkMethod(method);
            if (originMethod) {
                func = object[originMethod];
            }
        }

        if (!func) {
            func = object[method];
        }

        if (!func && object instanceof MovieClip) {
            func = object.getVariable(method);
        }

        if (!func && object instanceof Global) {
            func = window[method];
            if (func) {
                params = this.ActionNativeFunction(params, mc);
                object = window;
            }
        }

        if (method === "call" || method === "apply") {
            func = object;
            object = params.shift();
            if (method === "apply") {
                var args = params.shift();
                params = [];
                if (args) {
                    params = Array.prototype.slice.call(args);
                }
            }
        }

        if (func && typeof func === "function") {
            switch (true) {
                case object instanceof MovieClipLoader:
                    if (method === "loadClip" && typeof params[1] === "string") {
                        var targetStr = params[1];
                        params[1] = mc.getDisplayObject(targetStr);
                    }
                    break;
            }
            value = func.apply(object, params);
        }

        if (!func && object instanceof Object && typeof method === "string") {
            switch (method.toLowerCase()) {
                case "registerclass":
                    value = false;
                    var _root = mc.getDisplayObject("_root");
                    var stage = _root.getStage();
                    var characterId = stage.exportAssets[params[0]];
                    if (characterId) {
                        stage.registerClass[characterId] = params[1];
                        value = true;
                    }
                    break;
                case "addproperty":
                    this.addProperty(object, params);
                    break;
            }
        }
    } else {
        if (!method && typeof object === "function") {
            value = object.apply(this.variables["this"], params);
        }
    }

    stack[stack.length] = value;
};

/**
 * @param target
 * @param params
 * @returns {boolean}
 */
ActionScript.prototype.addProperty = function (target, params)
{
    var property = params[0];
    if (typeof property !== "string" || property === "") {
        return false;
    }

    var getter = params[1];
    if (!getter) {
        getter = function () {};
    }
    var setter = params[2];
    if (!setter) {
        setter = function () {};
    }

    if (typeof getter !== "function" || typeof setter !== "function") {
        return false;
    }

    Object.defineProperty(target, property,
        {
            get: getter,
            set: setter
        });

    return true;
};

/**
 * @param args
 * @param mc
 * @returns {Array}
 */
ActionScript.prototype.ActionNativeFunction = function (args, mc)
{
    var targetMc = mc;
    var params   = args;
    if (args[0] instanceof MovieClip) {
        // setInterval, setTimeout
        targetMc = args.shift();
        if (args.length > 0) {
            var obj = args.shift();
            var as;
            if (typeof obj === "string") {
                as = this.getVariable(obj);
                if (typeof as !== "function") {
                    as = targetMc.getVariable(obj);
                }
            }
            if (typeof as === "function") {
                var time = args.shift();
                var action = (function (script, mc, args)
                {
                    return function ()
                    {
                        script.apply(mc, args);
                    };
                })(as, targetMc, args);
                params = [];
                params[params.length] = action;
                params[params.length] = time;
            } else {
                console.log("DEBUG: ", params);
                args.unshift(obj);
                params = args;
            }
        }
    }
    return params;
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionCallFunction = function (stack, mc)
{
    var name  = stack.pop();
    var count = +stack.pop();

    var params = [];
    if (count > 0) {
        while (count) {
            count = 0 | count - 1;

            var param = stack.pop();
            if (param && typeof param === "object" && "callee" in param) {
                param = Array.prototype.slice.call(param);
            }
            params[params.length] = param;
        }
    }

    if (mc) {
        var caller = mc;
        var func;
        var method = this.checkMethod(name);
        if (method) {
            func = mc[method];
        } else {
            func = mc.variables[name];
            if (!func) {
                var registerClass = mc.variables.registerClass;
                if (registerClass && typeof registerClass === "object") {
                    func = registerClass[name];
                }

                if (!func) {
                    if (window[name]) {
                        caller = window;
                        params = this.ActionNativeFunction(params, mc);
                        func   = window[name];
                    } else {
                        func = mc.getVariable(name);
                    }
                }
            }
        }
        stack[stack.length] = (func) ? func.apply(caller, params) : undefined;
    }
};

/**
 * @param stack
 * @param aScript
 * @param mc
 */
ActionScript.prototype.ActionDefineFunction = function (stack, aScript, mc)
{
    var action = mc.createActionScript2(aScript.ActionScript, this);
    var name   = aScript.FunctionName;
    if (name !== "") {
        mc.setVariable(name, action);
    } else {
        stack[stack.length] = action;
    }
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionDefineLocal = function (stack, mc)
{
    var value = stack.pop();
    var name  = stack.pop();

    if (this.parent) {
        this.variables[name] = value;
    } else {
        mc.setVariable(name, value);
    }
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionDefineLocal2 = function (stack, mc)
{
    var name = stack.pop();
    if (this.parent) {
        this.variables[name] = undefined;
    } else {
        mc.setVariable(name, undefined);
    }
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionDelete = function (stack, mc)
{
    var name   = stack.pop();
    var object = stack.pop();

    if (typeof object === "string") {
        var target = this.stringToObject(object, mc);
        if (target) {
            object = target;
        }
    }

    if (object instanceof MovieClip) {
        object.setVariable(name, undefined);
    }
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionDelete2 = function (stack, mc)
{
    var name = stack.pop();
    if (mc) {
        mc.setVariable(name, undefined);
    }
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionEnumerate = function (stack, mc)
{
    var object = stack.pop();
    stack[stack.length] = null;

    if (typeof object === "string") {
        object = this.stringToObject(object, mc);
    }

    if (object instanceof Object) {
        var name;
        switch (true) {
            case object instanceof DisplayObject:
                var container = object.getTags();
                var stage = object.getStage();
                for (name in container) {
                    if (!container.hasOwnProperty(name)) {
                        continue;
                    }
                    var id = container[name];
                    var instance = stage.getInstance(id);
                    var prop = "instance" + id;
                    if (instance.getName()) {
                        prop = instance.getName();
                    }
                    stack[stack.length] = prop;
                }
                var variables = object.variables;
                for (name in variables) {
                    if (!variables.hasOwnProperty(name)) {
                        continue;
                    }
                    stack[stack.length] = name;
                }
                break;
            default:
                for (name in object) {
                    if (!object.hasOwnProperty(name)) {
                        continue;
                    }
                    stack[stack.length] = name;
                }
                break;
        }
    }
};

/**
 * @param stack
 */
ActionScript.prototype.ActionEquals2 = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    var A = a;
    var B = b;
    if (a instanceof MovieClip) {
        A = a.getTarget();
    }
    if (b instanceof MovieClip) {
        B = b.getTarget();
    }
    stack[stack.length] = (B == A);
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionGetMember = function (stack, mc)
{
    var property;
    var name   = stack.pop();
    var object = stack.pop();

    if (typeof object === "string") {
        var target = this.stringToObject(object, mc);
        if (target) {
            object = target;
        }
    }

    if (object) {
        switch (true) {
            default:
                property = object[name];
                break;
            case object instanceof DisplayObject:
            case object instanceof Global:
                if (!object._extend) {
                    property = object.getProperty(name, false);
                    if (property === undefined &&
                        typeof name === "string" &&
                        name.substr(0, 8) === "instance"
                    ) {
                        var stage = object.getStage();
                        var id = name.split("instance")[1];
                        property = stage.getInstance(id);
                    }

                    if (property === undefined && this.checkMethod(name)) {
                        property = object[name];
                    }

                } else {
                    property = object[name];
                }
                break;
            case object instanceof Element && name === "childNodes":
                var childNodes = object[name];
                var length = childNodes.length;
                property = [];
                if (length) {
                    for (var i = 0; i < length; i++) {
                        var node = childNodes[i];
                        if (node.nodeType !== 1) {
                            continue;
                        }
                        property[property.length] = node;
                    }
                }
                break;
            case object instanceof window.NamedNodeMap:
                var item = object.getNamedItem(name);
                property = item.value;
                break;
        }
    }
    stack[stack.length] = property;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionInitArray = function (stack)
{
    var number = stack.pop();
    var array  = [];
    if (number > 0) {
        while (number) {
            number = 0 | number - 1;
            array[array.length] = stack.pop();
        }
    }
    stack[stack.length] = array;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionInitObject = function (stack)
{
    var number = stack.pop();
    var object = {};
    if (number > 0) {
        while (number) {
            number = 0 | number - 1;

            var value    = stack.pop();
            var property = stack.pop();

            object[property] = value;
        }
    }
    stack[stack.length] = object;
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionNewMethod = function (stack, mc)
{
    var method = stack.pop();
    var object = stack.pop();
    var number = stack.pop();
    var params = [];
    if (number > 0) {
        while (number--) {
            var param = stack.pop();
            if (param && typeof param === "object" && "callee" in param) {
                param = Array.prototype.slice.call(param);
            }
            params[params.length] = param;
        }
    }

    var constructor;
    if (method === "") {
        constructor = object.apply(object, params);
    }
    if (!constructor && method in object) {
        constructor = this.CreateNewActionScript(object[method], mc, params);
    }
    if (!constructor && method in window) {
        if (method === "CSSStyleDeclaration") {
            constructor = undefined;
        } else {
            constructor = this.CreateNewActionScript(window[method], mc, params);
        }
    }
    stack[stack.length] = constructor;
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionNewObject = function (stack, mc)
{
    var object  = stack.pop();
    var numArgs = +stack.pop();
    var params = [];
    if (numArgs > 0) {
        while (numArgs) {
            numArgs = 0 | numArgs - 1;

            var param = stack.pop();
            if (param && typeof param === "object" && "callee" in param) {
                param = Array.prototype.slice.call(param);
            }
            params[params.length] = param;
        }
    }

    var obj = {};
    if (object in window) {
        params.unshift(window[object]);
        obj = new (Function.prototype.bind.apply(window[object], params))();
    } else {
        switch (object) {
            case "Object":
                obj = {};
                break;
            case "MovieClip":
                obj = new MovieClip();
                var stage = mc.getStage();
                obj.setStage(stage);
                obj.setParent(mc);
                break;
            case "Sound":
                obj = new Sound(mc);
                obj.movieClip = mc;
                break;
            case "XML":
                obj = new Xml();
                break;
            case "LoadVars":
                obj = new LoadVars();
                break;
            case "Color":
                obj = new Color(params[0]);
                break;
            case "TextFormat":
                obj = new TextFormat();
                break;
            case "MovieClipLoader":
                obj = new MovieClipLoader();
                break;
            default:
                if (mc) {
                    var self = this;
                    var func = self.getVariable(object) || mc.getVariable(object);
                    obj      = self.CreateNewActionScript(func, mc, params);
                }
                break;
        }
    }
    stack[stack.length] = obj;
};

/**
 * @param name
 * @returns {*}
 */
ActionScript.prototype.getNativeClass = function (name)
{
    var value;
    switch (name) {
        case "MovieClip":
            value = MovieClip;
            break;
        case "Sprite":
            value = Sprite;
            break;
        case "SimpleButton":
            value = SimpleButton;
            break;
        case "TextField":
            value = TextField;
            break;
        case "Shape":
            value = Shape;
            break;
        case "Sound":
            value = Sound;
            break;
        case "XML":
            value = Xml;
            break;
        case "LoadVars":
            value = LoadVars;
            break;
        case "Color":
            value = Color;
            break;
        case "TextFormat":
            value = TextFormat;
            break;
        case "MovieClipLoader":
            value = MovieClipLoader;
            break;
    }
    return value;
};

/**
 * @param Constr
 * @param mc
 * @param params
 * @returns {*}
 */
ActionScript.prototype.CreateNewActionScript = function (Constr, mc, params)
{
    if (Constr) {
        params.unshift(Constr);
        return new (Function.prototype.bind.apply(Constr, params))();
    }
    return undefined;
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionSetMember = function (stack, mc)
{
    var value  = stack.pop();
    var name   = stack.pop();
    var object = stack.pop();
    if (object) {
        if (typeof object === "string") {
            var target = this.stringToObject(object, mc);
            if (target) {
                object = target;
            }
        }

        if (typeof object === "object" || typeof object === "function") {
            switch (true) {
                default:
                case object === MovieClip.prototype:
                case object === TextField.prototype:
                case object === SimpleButton.prototype:
                case object === Sprite.prototype:
                case object === Shape.prototype:
                    object[name] = value;
                    break;
                case object instanceof DisplayObject:
                case object instanceof Global:
                    if (!object._extend) {
                        object.setProperty(name, value, false);
                    } else {
                        object[name] = value;
                    }
                    break;
            }
        }
    }
};

/**
 * @param stack
 */
ActionScript.prototype.ActionTargetPath = function (stack)
{
    console.log("ActionTargetPath");
    var object = stack.pop();
    var path   = null;
    if (object instanceof MovieClip) {
        path = object.getName();
        if (path !== null) {
            while (true) {
                var parent = object.getParent();
                if (parent === null) {
                    path = "/" + path;
                    break;
                }

                var name = parent.getName();
                if (name === null) {
                    path = null;
                    break;
                }

                path = name + "/" + path;
            }
        }
    }
    stack[stack.length] = path;
};

/**
 * @param stack
 * @param size
 * @param mc
 * @returns {*}
 */
ActionScript.prototype.ActionWith = function (stack, size, mc)
{
    var object = mc;
    if (size) {
        object = stack.pop();
    }
    return object;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionToNumber = function (stack)
{
    var object = +stack.pop();
    stack[stack.length] = object;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionToString = function (stack)
{
    var object = stack.pop();
    stack[stack.length] = this.valueToString(object);
};

/**
 * @param stack
 */
ActionScript.prototype.ActionTypeOf = function (stack)
{
    var object = stack.pop();
    var str    = "";
    switch (true) {
        case object instanceof MovieClip:
            str = "movieclip";
            break;
        default:
            str = typeof object;
            break;
    }
    stack[stack.length] = str;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionAdd2 = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    stack[stack.length] = b + a;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionLess2 = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    stack[stack.length] = (b < a);
};

/**
 * @param stack
 */
ActionScript.prototype.ActionModulo = function (stack)
{
    var y = stack.pop();
    var x = stack.pop();
    stack[stack.length] = x % y;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionBitAnd = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    stack[stack.length] = b & a;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionBitLShift = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    stack[stack.length] = b << a;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionBitOr = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    stack[stack.length] = b | a;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionBitRShift = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    stack[stack.length] = b >> a;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionBitURShift = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    stack[stack.length] = b >> a;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionBitXor = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    stack[stack.length] = a ^ b;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionDecrement = function (stack)
{
    var value = stack.pop();
    value     = 0 | value - 1;
    stack[stack.length] = value;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionIncrement = function (stack)
{
    var value = stack.pop();
    value     = 0 | value + 1;
    stack[stack.length] = value;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionPushDuplicate = function (stack)
{
    var length    = stack.length;
    stack[length] = stack[length - 1];
};

/**
 * @param stack
 */
ActionScript.prototype.ActionStackSwap = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    stack[stack.length] = a;
    stack[stack.length] = b;
};

/**
 * @param stack
 * @param number
 */
ActionScript.prototype.ActionStoreRegister = function (stack, number)
{
    this.params[number] = stack[stack.length - 1];
};

/**
 * @param stack
 */
ActionScript.prototype.ActionInstanceOf = function (stack)
{
    var constr = stack.pop();
    var object = stack.pop();
    stack[stack.length] = (object instanceof constr);
};

/**
 * @param stack
 */
ActionScript.prototype.ActionStrictEquals = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    stack[stack.length] = (b === a);
};

/**
 * @param stack
 */
ActionScript.prototype.ActionGreater = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    stack[stack.length] = (b > a);
};

/**
 * @param stack
 */
ActionScript.prototype.ActionExtends = function (stack)
{
    var SuperClass = stack.pop();
    var SubClass   = stack.pop();
    if (SuperClass && SubClass) {
        this.superClass = SuperClass;
    }
};

/**
 * @param stack
 */
ActionScript.prototype.ActionCastOp = function (stack)
{
    var object = stack.pop();
    var func   = stack.pop();
    stack[stack.length] = (typeof func === "function" &&
    object instanceof func.prototype.constructor) ? object : null;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionImplementsOp = function (stack)
{
    console.log("ActionImplementsOp");
    var func = stack.pop();
    console.log(func);

    var count  = 0 | stack.pop();
    var params = [];
    if (count > 0) {
        while (count) {
            count = 0 | count - 1;
            params[params.length] = stack.pop();
        }
    }
    stack[stack.length] = null;
};

/**
 * @param script
 * @param mc
 */
ActionScript.prototype.ActionTry = function (script, mc)
{
    try {
        script.try.apply(mc);
    } catch (e) {
        if (script.CatchBlockFlag) {
            script.catch.apply(mc,[e]);
        }
    } finally {
        if (script.FinallyBlockFlag) {
            script.finally.apply(mc);
        }
    }
};

/**
 * ActionThrow
 */
ActionScript.prototype.ActionThrow = function (stack)
{
    var value = stack.pop();
    throw value.message;
};