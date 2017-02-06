/*jshint bitwise: false*/
/**
 * @constructor
 */
var BitIO = function ()
{
    this.data        = null;
    this.bit_offset  = 0;
    this.byte_offset = 0;
    this.bit_buffer  = null;
};

/**
 * util
 */
BitIO.prototype = Object.create(Util.prototype);
BitIO.prototype.constructor = BitIO;

/**
 * @param data
 */
BitIO.prototype.generate = function (data)
{
    var length = 0 | data.length;
    var array  = this.createArray(length);

    var i = 0;
    while (i < length) {
        array[i] = data.charCodeAt(i) & 0xff;
        i = (i + 1)|0;
    }

    this.data = array;
};

/**
 * @param str
 * @returns {XML|string|void|*}
 */
BitIO.prototype.decodeToShiftJis = function (str)
{
    var self = this;
    return str.replace(/%(8[1-9A-F]|[9E][0-9A-F]|F[0-9A-C])(%[4-689A-F][0-9A-F]|%7[0-9A-E]|[@-~])|%([0-7][0-9A-F]|A[1-9A-F]|[B-D][0-9A-F])/ig,
        function (s)
        {
            var c = self.$parseInt(s.substring(1, 3), 16);
            var l = s.length;
            return 3 === l ? self.$fromCharCode(c < 160 ? c : c + 65216) : self.$JCT11280.charAt((c < 160 ? c - 129 : c - 193) * 188 + (4 === l ? s.charCodeAt(3) - 64 : (c = self.$parseInt(s.substring(4), 16)) < 127 ? c - 64 : c - 65));
        }
    );
};

/**
 * @param compressed
 * @param size
 * @returns {*}
 */
BitIO.prototype.unlzma = function (compressed, size)
{

    var self = this;

    /**
     * @param buffer
     * @constructor
     */
    var InputStream = function (buffer)
    {
        this.buffer    = buffer;
        this.processed = 0;
    };

    /**
     * properties
     */
    Object.defineProperties(DisplayObject.prototype, {
        available: {
            get: function () {
                return (this.buffer.length - this.processed)|0;
            }
        }
    });

    /**
     * @returns {*}
     */
    InputStream.prototype.readByte = function ()
    {
        var value = this.buffer[this.processed]|0;

        this.processed = (this.processed + 1)|0;

        return value;
    };

    /**
     * @param size
     * @constructor
     */
    var OutputStream = function (size)
    {
        this.buffer    = self.$canArrayBuffer ? new Uint8Array(size) : [];
        this.processed = 0;
    };

    /**
     * @returns {Array}
     */
    OutputStream.prototype.getBuffer = function ()
    {
        return this.buffer;
    };

    /**
     * @param data
     */
    OutputStream.prototype.add = function (data)
    {
        var length = data.length|0;
        var idx = 0;
        while (idx < length) {
            this.buffer[this.processed] = data[idx]|0;

            this.processed = (this.processed + 1)|0;

            idx = (idx + 1)|0;
        }
    };

    /**
     * @param outStream
     * @constructor
     */
    var OutWindow = function (outStream)
    {
        this.outStream = outStream;
        this.buf       = null;
        this.pos       = 0;
        this.size      = 0;
        this.isFull    = false;
        this.writePos  = 0;
        this.totalPos  = 0;
    };

    /**
     * @param dictSize
     */
    OutWindow.prototype.create = function (dictSize)
    {
        this.buf      = (self.$canArrayBuffer) ? new Uint8Array(dictSize) : [];
        this.pos      = 0;
        this.size     = dictSize;
        this.isFull   = false;
        this.writePos = 0;
        this.totalPos = 0;
    };

    /**
     * @param byte
     */
    OutWindow.prototype.putByte = function (byte)
    {
        this.totalPos = (this.totalPos + 1)|0;

        this.buf[this.pos] = byte;
        this.pos = (this.pos + 1)|0;

        if (this.pos === this.size) {
            this.flush();
            this.pos    = 0;
            this.isFull = true;
        }
    };

    /**
     * @param dist
     * @returns {*}
     */
    OutWindow.prototype.getByte = function (dist)
    {
        return this.buf[dist <= this.pos ? this.pos - dist : this.size - dist + this.pos];
    };

    /**
     * flush
     */
    OutWindow.prototype.flush = function ()
    {
        if (this.writePos < this.pos) {
            var length = this.pos - this.writePos;

            var data   = self.$canArrayBuffer ? new Uint8Array(length) : [];

            var buffer = this.buf;

            var i = this.writePos;
            while (i < this.pos) {
                data[i] = buffer[i];
                i = (i + 1)|0;
            }

            this.outStream.add(data);
            this.writePos = (this.pos === this.size) ? 0 : this.pos|0;
        }
    };

    /**
     * @param dist
     * @param len
     */
    OutWindow.prototype.copyMatch = function (dist, len)
    {
        var pos    = this.pos;
        var size   = this.size;
        var buffer = this.buf;
        var getPos = (dist <= pos) ? pos - dist : size - dist + pos;
        var left   = len;
        while (left > 0) {
            var chunk = self.$min(self.$min(left, size - pos), size - getPos);

            var i = 0;
            while (i < chunk) {
                var b  = buffer[getPos];
                getPos = (getPos + 1)|0;

                buffer[pos] = b;
                pos = (pos + 1)|0;

                i  = (i + 1)|0;
            }

            if (pos === size) {
                this.pos = pos;
                this.flush();
                pos = 0;
                this.isFull = true;
            }

            if (getPos === size) {
                getPos = 0;
            }

            left = (left - chunk)|0;
        }
        this.pos = pos;
        this.totalPos = (this.totalPos + len)|0;

    };

    /**
     * @param dist
     * @returns {boolean}
     */
    OutWindow.prototype.checkDistance = function(dist)
    {
        return (dist <= this.pos) || this.isFull;
    };

    /**
     * @returns {boolean}
     */
    OutWindow.prototype.isEmpty = function()
    {
        return (this.pos === 0) && !this.isFull;
    };

    /**
     * @param inStream
     * @constructor
     */
    var RangeDecoder = function (inStream)
    {
        this.inStream = inStream;
        this.range    = 0;
        this.code     = 0;
    };

    /**
     * init
     */
    RangeDecoder.prototype.init = function ()
    {
        this.inStream.readByte(); // rev

        this.range = 0xFFFFFFFF | 0;

        var code = 0;
        var i = 0;
        while (i < 4) {
            code = (code << 8) | this.inStream.readByte();
            i = (i + 1)|0;
        }

        this.code = code;
    };

    /**
     * @returns {boolean}
     */
    RangeDecoder.prototype.isFinishedOK = function ()
    {
        return (this.code === 0);
    };

    /**
     * @param numBits
     * @returns {number}
     */
    RangeDecoder.prototype.decodeDirectBits = function (numBits)
    {
        var res   = 0;
        var range = this.range;
        var code  = this.code;

        while (numBits) {
            range = (range >>> 1) | 0;
            code = (code - range) | 0;

            var t = code >> 31;
            code = (code + (range & t)) | 0;

            if (range >= 0 && range < 16777216) {
                range = range << 8;
                code = (code << 8) | this.inStream.readByte();
            }

            res = ((res << 1) + t + 1) | 0;

            numBits = (numBits - 1)|0;
        }

        this.range = range;
        this.code  = code;

        return res;
    };

    /**
     * @param prob
     * @param index
     * @returns {*}
     */
    RangeDecoder.prototype.decodeBit = function (prob, index)
    {
        var range = this.range;
        var code  = this.code;

        var v     = prob[index]|0;
        var bound = (range >>> 11) * v;

        var symbol;
        if ((code >>> 0) < bound) {
            v = (v + ((2048 - v) >> 5)) | 0;

            range  = bound | 0;
            symbol = 0;
        } else {
            v = (v - (v >> 5)) | 0;

            code   = (code - bound) | 0;
            range  = (range - bound) | 0;
            symbol = 1;
        }
        prob[index] = v & 0xFFFF;

        if (range >= 0 && range < 16777216) {
            range = range << 8;
            code  = (code << 8) | this.inStream.readByte();
        }

        this.range = range;
        this.code  = code;

        return symbol;
    };

    /**
     * @param numBits
     * @constructor
     */
    var BitTreeDecoder = function (numBits)
    {
        this.numBits = numBits;
        this.probs   = this.createProbsArray(1 << numBits);
    };

    /**
     * @param length
     * @returns {*}
     */
    BitTreeDecoder.prototype.createProbsArray = function (length)
    {
        var p = (self.$canArrayBuffer) ? new Uint16Array(length) : [];
        var i = 0;
        while (i < length) {
            p[i] = 1024;
            i = (i + 1)|0;
        }
        return p;
    };

    /**
     * @param rc
     * @returns {number}
     */
    BitTreeDecoder.prototype.decode = function (rc)
    {
        var m = 1;
        var i = 0;
        var numBits = this.numBits;

        while (i < numBits) {
            i = (i + 1)|0;
            m = (m << 1) + rc.decodeBit(this.probs, m);
        }

        return m - (1 << this.numBits);
    };

    /**
     * @param rc
     * @returns {number|*}
     */
    BitTreeDecoder.prototype.reverseDecode = function (rc)
    {
        return this.bitTreeReverseDecode(this.probs, 0, this.numBits, rc);
    };

    /**
     * @param probs
     * @param offset
     * @param numBits
     * @param rc
     * @returns {number}
     */
    BitTreeDecoder.prototype.bitTreeReverseDecode = function (probs, offset, numBits, rc)
    {
        var m = 1;
        var symbol = 0;
        var i = 0;
        while (i < numBits) {
            var bit = rc.decodeBit(probs, m + offset);
            m = (m << 1) + bit;
            symbol |= bit << i;

            i = (i + 1)|0;
        }

        return symbol;
    };

    /**
     *
     * @constructor
     */
    var LenDecoder = function ()
    {
        this.choice    = this.createProbsArray(2);
        this.lowCoder  = this.createBitTreeDecoderArray(3, 16);
        this.midCoder  = this.createBitTreeDecoderArray(3, 16);
        this.highCoder = new BitTreeDecoder(8);
    };

    /**
     * @param length
     * @returns {*}
     */
    LenDecoder.prototype.createProbsArray = function (length)
    {
        var p = (self.$canArrayBuffer) ? new Uint16Array(length) : [];
        var i = 0;
        while (i < length) {
            p[i] = 1024;
            i = (i + 1)|0;
        }
        return p;
    };

    /**
     * @param numBits
     * @param length
     * @returns {Array}
     */
    LenDecoder.prototype.createBitTreeDecoderArray = function (numBits, length)
    {
        var p = [];
        p.length = length;

        var i = 0;
        while (i < length) {
            p[i] = new BitTreeDecoder(numBits);
            i = (i + 1)|0;
        }

        return p;
    };

    /**
     * @param rc
     * @param posState
     * @returns {*}
     */
    LenDecoder.prototype.decode = function (rc, posState)
    {
        if (rc.decodeBit(this.choice, 0) === 0) {
            return this.lowCoder[posState].decode(rc);
        }

        if (rc.decodeBit(this.choice, 1) === 0) {
            return 8 + this.midCoder[posState].decode(rc);
        }

        return 16 + this.highCoder.decode(rc);
    };

    /**
     * @param data
     * @param size
     * @constructor
     */
    var Decoder = function (data, size)
    {
        var inStream  = new InputStream(data);
        var outStream = new OutputStream(size);

        this.outStream = outStream;
        this.rangeDec  = new RangeDecoder(inStream);
        this.outWindow = new OutWindow(outStream);

        this.lc = 0;
        this.pb = 0;
        this.lp = 0;

        this.dictSize             = 0;
        this.dictSizeInProperties = 0;
        this.leftToUnpack         = undefined;

        this.reps  = (self.$canArrayBuffer) ? new Int32Array(4) : [];
        this.state = 0;

        var header = (self.$canArrayBuffer) ? new Uint8Array(13) : [];
        var i = 0;
        while (i < 13) {
            header[i] = inStream.readByte()|0;
            i = (i + 1)|0;
        }

        var unpackSize = 0;
        var unpackSizeDefined = false;
        i = 0;
        while (i < 8) {
            var b = header[5 + i];
            if (b !== 0xFF) {
                unpackSizeDefined = true;
            }

            unpackSize |= b << (8 * i);

            i = (i + 1)|0;
        }

        this.markerIsMandatory = !unpackSizeDefined;
        this.unpackSize = unpackSizeDefined ? unpackSize : undefined;

        this.decodeProperties(header);
    };

    /**
     * @param properties
     * @returns {Decoder}
     */
    Decoder.prototype.decodeProperties = function (properties)
    {
        var d = properties[0]|0;

        this.lc = d % 9;

        d = (d / 9)|0;
        this.pb = (d / 5)|0;
        this.lp = d % 5;

        this.dictSizeInProperties = 0;

        var i = 0;
        while (i < 4) {
            this.dictSizeInProperties |= properties[i + 1] << (8 * i);
            i = (i + 1)|0;
        }

        this.dictSize = this.dictSizeInProperties;
        if (this.dictSize < 4096) {
            this.dictSize = 4096;
        }
    };

    /**
     * @returns {Decoder}
     */
    Decoder.prototype.create = function ()
    {
        this.outWindow.create(this.dictSize);

        this.init();
        this.rangeDec.init();

        this.reps[0] = 0;
        this.reps[1] = 0;
        this.reps[2] = 0;
        this.reps[3] = 0;

        this.state = 0;
        this.leftToUnpack = this.unpackSize;

        return this;
    };

    /**
     * @param state
     * @param rep0
     * @returns {number}
     */
    Decoder.prototype.decodeLiteral = function (state, rep0)
    {
        var outWindow = this.outWindow;
        var rangeDec  = this.rangeDec;

        var prevByte = 0;
        if (!outWindow.isEmpty()) {
            prevByte = outWindow.getByte(1);
        }

        var symbol     = 1;
        var litState   = ((outWindow.totalPos & ((1 << this.lp) - 1)) << this.lc) + (prevByte >> (8 - this.lc));
        var probsIndex = 0x300 * litState;

        if (state >= 7) {
            var matchByte = outWindow.getByte(rep0 + 1);
            do {
                var matchBit = (matchByte >> 7) & 1;
                matchByte <<= 1;

                var bit = rangeDec.decodeBit(this.litProbs, probsIndex + (((1 + matchBit) << 8) + symbol));

                symbol = (symbol << 1) | bit;
                if (matchBit !== bit) {
                    break;
                }
            } while (symbol < 0x100);
        }

        while (symbol < 0x100) {
            symbol = (symbol << 1) | rangeDec.decodeBit(this.litProbs, probsIndex + symbol);
        }

        return (symbol - 0x100) & 0xFF;
    };

    /**
     * @param length
     * @returns {*}
     */
    Decoder.prototype.decodeDistance = function (length)
    {
        var lenState = length;
        if (lenState > 3) {
            lenState = 3;
        }

        var rangeDec = this.rangeDec;
        var posSlot  = this.posSlotDecoder[lenState].decode(rangeDec);
        if (posSlot < 4) {
            return posSlot;
        }

        var numDirectBits = (posSlot >> 1) - 1;
        var dist = (2 | (posSlot & 1)) << numDirectBits;
        if (posSlot < 14) {
            dist = (dist + this.bitTreeReverseDecode(this.posDecoders, dist - posSlot, numDirectBits, rangeDec)) | 0;
        } else {
            dist = (dist + (rangeDec.decodeDirectBits(numDirectBits - 4) << 4)) | 0;
            dist = (dist + this.alignDecoder.reverseDecode(rangeDec)) | 0;
        }

        return dist;
    };

    /**
     * @param probs
     * @param offset
     * @param numBits
     * @param rc
     * @returns {number}
     */
    Decoder.prototype.bitTreeReverseDecode = function (probs, offset, numBits, rc)
    {
        var m = 1;
        var symbol = 0;
        var i = 0;
        while (i < numBits) {
            var bit = rc.decodeBit(probs, m + offset);
            m = (m << 1) + bit;
            symbol |= bit << i;

            i = (i + 1)|0;
        }

        return symbol;
    };

    /**
     * init
     */
    Decoder.prototype.init = function ()
    {
        this.litProbs       = this.createProbsArray(0x300 << (this.lc + this.lp));

        this.posSlotDecoder = this.createBitTreeDecoderArray(6, 4);
        this.alignDecoder   = new BitTreeDecoder(4);
        this.posDecoders    = this.createProbsArray(115);

        this.isMatch    = this.createProbsArray(192);
        this.isRep      = this.createProbsArray(12);
        this.isRepG0    = this.createProbsArray(12);
        this.isRepG1    = this.createProbsArray(12);
        this.isRepG2    = this.createProbsArray(12);
        this.isRep0Long = this.createProbsArray(192);

        this.lenDecoder    = new LenDecoder();
        this.repLenDecoder = new LenDecoder();
    };

    /**
     * @param numBits
     * @param length
     */
    Decoder.prototype.createBitTreeDecoderArray = function (numBits, length)
    {
        var p = [];
        p.length = length;

        var i = 0;
        while (i < length) {
            p[i] = new BitTreeDecoder(numBits);
            i = (i + 1)|0;
        }

        return p;
    };

    /**
     * @param length
     * @returns {*}
     */
    Decoder.prototype.createProbsArray = function (length)
    {
        var p = (self.$canArrayBuffer) ? new Uint16Array(length) : [];
        var i = 0;
        while (i < length) {
            p[i] = 1024;
            i = (i + 1)|0;
        }
        return p;
    };

    /**
     * @param state
     * @returns {number}
     */
    Decoder.prototype.updateStateLiteral = function (state)
    {
        if (state < 4) {
            return 0;
        } else if (state < 10) {
            return state - 3;
        } else {
            return state - 6;
        }
    };

    /**
     * @returns {*}
     */
    Decoder.prototype.decode = function()
    {
        var rangeDec          = this.rangeDec;
        var outWindow         = this.outWindow;
        var pb                = this.pb;
        var markerIsMandatory = this.markerIsMandatory;
        var leftToUnpack      = this.leftToUnpack;

        var isMatch       = this.isMatch;
        var isRep         = this.isRep;
        var isRepG0       = this.isRepG0;
        var isRepG1       = this.isRepG1;
        var isRepG2       = this.isRepG2;
        var isRep0Long    = this.isRep0Long;
        var lenDecoder    = this.lenDecoder;
        var repLenDecoder = this.repLenDecoder;

        var rep0  = this.reps[0];
        var rep1  = this.reps[1];
        var rep2  = this.reps[2];
        var rep3  = this.reps[3];
        var state = this.state;

        while (true) {
            if (rangeDec.inStream.available < 48) {
                this.outWindow.flush();
                break;
            }

            if (leftToUnpack === 0 && !markerIsMandatory) {
                this.outWindow.flush();
            }

            var posState = outWindow.totalPos & ((1 << pb) - 1);

            if (rangeDec.decodeBit(isMatch, (state << 4) + posState) === 0) {
                outWindow.putByte(this.decodeLiteral(state, rep0));
                state = this.updateStateLiteral(state);

                leftToUnpack = (leftToUnpack - 1)|0;
                continue;
            }

            var length;
            if (rangeDec.decodeBit(isRep, state) !== 0) {
                if (rangeDec.decodeBit(isRepG0, state) === 0) {
                    if (rangeDec.decodeBit(isRep0Long, (state << 4) + posState) === 0) {
                        state = (state < 7) ? 9 : 11;
                        outWindow.putByte(outWindow.getByte(rep0 + 1));
                        leftToUnpack = (leftToUnpack - 1)|0;
                        continue;
                    }
                } else {
                    var dist;
                    if (rangeDec.decodeBit(isRepG1, state) === 0) {
                        dist = rep1;
                    } else {
                        if (rangeDec.decodeBit(isRepG2, state) === 0) {
                            dist = rep2;
                        } else {
                            dist = rep3;
                            rep3 = rep2;
                        }
                        rep2 = rep1;
                    }
                    rep1 = rep0;
                    rep0 = dist;
                }
                length = repLenDecoder.decode(rangeDec, posState);
                state  = (state < 7) ? 8 : 11;
            } else {
                rep3   = rep2;
                rep2   = rep1;
                rep1   = rep0;
                length = lenDecoder.decode(rangeDec, posState);
                state  = (state < 7) ? 7 : 10;
                rep0   = this.decodeDistance(length);

                // end
                if (rep0 === -1) {
                    this.outWindow.flush();
                    return this;
                }
            }

            length = (length + 2)|0;
            if (leftToUnpack !== undefined && leftToUnpack < length) {
                length = leftToUnpack;
            }

            outWindow.copyMatch(rep0 + 1, length);
            leftToUnpack = (leftToUnpack - length)|0;
        }
    };

    /**
     * @returns {Array}
     */
    Decoder.prototype.output = function ()
    {
        return this.outStream.getBuffer();
    };


    // swf header rebuild
    var header = [];

    var idx = 12;
    while (idx < 17) {
        header[header.length] = compressed[idx];
        idx = (idx + 1)|0;
    }

    idx = 4;
    while (idx < 8) {
        header[header.length] = compressed[idx];
        idx = (idx + 1)|0;
    }

    var c = 8;
    var i = 5;
    while (i < 9) {
        if (header[i] >= c) {
            header[i] = (header[i] - c)|0;
            break;
        }
        header[i] = (256 + header[i] - c)|0;
        c = 1;
        i = (i + 1)|0;
    }

    idx = 0;
    while (idx < 4) {
        header[header.length] = 0;
        idx = (idx + 1)|0;
    }

    var length = header.length;
    i = 0;
    idx = 4;
    while (i < length) {
        compressed[i + idx] = header[i]|0;
        i = (i + 1)|0;
    }

    // new data
    var data = (this.$canArrayBuffer) ? new Uint8Array(compressed.slice(4)) : compressed.slice(4);

    var decoder = new Decoder(data, size);

    return decoder
        .create()
        .decode()
        .output();
};

/**
 * @param compressed
 * @param isDeCompress
 * @returns {Array}
 */
BitIO.prototype.unzip = function (compressed, isDeCompress)
{
    var sym        = 0;
    var i          = 0;
    var length     = 0;
    var data       = [];
    var bitLengths = [];

    var bitio = new BitIO();
    bitio.setData(compressed);

    var ORDER =
        [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];

    var LEXT = [
        0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2,
        3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99
    ];

    var LENS = [
        3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
        35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
    ];

    var DEXT = [
        0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6,
        7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13
    ];

    var DISTS = [
        1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
        257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
        8193, 12289, 16385, 24577
    ];

    if (this.$canArrayBuffer) {
        ORDER = new Uint8Array(ORDER);
        LEXT  = new Uint8Array(LEXT);
        DEXT  = new Uint8Array(DEXT);
        LENS  = new Uint16Array(LENS);
        DISTS = new Uint16Array(DISTS);
    }

    var startOffset = 2;
    if (isDeCompress) {
        startOffset = 10;
    }
    bitio.setOffset(startOffset, 8);

    var flag = 0;
    while (!flag) {
        flag = bitio.readUB(1);

        var type = bitio.readUB(2);

        var distTable      = {};
        var litTable       = {};
        var fixedDistTable = false;
        var fixedLitTable  = false;

        if (type) {
            if (type === 1) {
                distTable = fixedDistTable;
                litTable  = fixedLitTable;

                if (!distTable) {
                    bitLengths = [];
                    i = 32;
                    while (i) {
                        i = (i - 1)|0;
                        bitLengths[bitLengths.length] = 5;
                    }
                    distTable = fixedDistTable = this.buildHuffTable(bitLengths);
                }

                if (!litTable) {
                    bitLengths = [];

                    i = 0;
                    while (i < 144) {
                        i = (i + 1)|0;
                        bitLengths[bitLengths.length] = 8;
                    }

                    while (i < 256) {
                        i = (i + 1)|0;
                        bitLengths[bitLengths.length] = 9;
                    }

                    while (i < 280) {
                        i = (i + 1)|0;
                        bitLengths[bitLengths.length] = 7;
                    }

                    while (i < 288) {
                        i = (i + 1)|0;
                        bitLengths[bitLengths.length] = 8;
                    }

                    litTable = fixedLitTable = this.buildHuffTable(bitLengths);
                }
            } else {
                var numLitLengths  = bitio.readUB(5) + 257;
                var numDistLengths = bitio.readUB(5) + 1;
                var numCodeLengths = bitio.readUB(4) + 4;
                var codeLengths    = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                if (this.$canArrayBuffer) {
                    codeLengths = new Uint8Array(codeLengths);
                }

                i = 0;
                while (i < numCodeLengths) {
                    codeLengths[ORDER[i]] = bitio.readUB(3);
                    i = (i + 1)|0;
                }

                var codeTable = this.buildHuffTable(codeLengths);
                codeLengths   = null;

                var litLengths  = [];
                var prevCodeLen = 0;
                var maxLengths  = (numLitLengths + numDistLengths)|0;
                while (litLengths.length < maxLengths) {
                    sym = this.decodeSymbol(bitio, codeTable);
                    switch (sym) {
                        case 16:
                            i = (bitio.readUB(2) + 3)|0;
                            while (i) {
                                i = (i - 1)|0;
                                litLengths[litLengths.length] = prevCodeLen;
                            }
                            break;
                        case 17:
                            i = (bitio.readUB(3) + 3)|0;
                            while (i) {
                                i = (i - 1)|0;
                                litLengths[litLengths.length] = 0;
                            }
                            break;
                        case 18:
                            i = (bitio.readUB(7) + 11)|0;
                            while (i) {
                                i = (i - 1)|0;
                                litLengths[litLengths.length] = 0;
                            }
                            break;
                        default:
                            if (sym <= 15) {
                                litLengths[litLengths.length] = sym;
                                prevCodeLen = sym;
                            }
                            break;
                    }
                }
                distTable = this.buildHuffTable(litLengths.splice(numLitLengths, numDistLengths));
                litTable  = this.buildHuffTable(litLengths);
            }

            sym = 0;
            while (sym !== 256) {
                sym = this.decodeSymbol(bitio, litTable)|0;
                if (sym < 256) {
                    data[data.length] = sym;
                } else if (sym > 256) {
                    var mapIdx = (sym - 257)|0;
                    length     = (LENS[mapIdx] + bitio.readUB(LEXT[mapIdx]))|0;

                    var distMap = this.decodeSymbol(bitio, distTable);
                    var dist    = (DISTS[distMap] + bitio.readUB(DEXT[distMap]))|0;

                    i = (data.length - dist)|0;
                    while (length) {
                        length = (length - 1)|0;
                        data[data.length] = data[i];
                        i = (i + 1)|0;
                    }
                }
            }
        } else {
            bitio.bit_offset = 8;
            bitio.bit_buffer = null;

            length = bitio.readNumber(2)|0;
            bitio.readNumber(2); // nlen

            while (length) {
                length = (length - 1)|0;
                data[data.length] = bitio.readNumber(1);
            }
        }
    }
    return data;
};

/**
 * @param data
 * @returns {{}}
 */
BitIO.prototype.buildHuffTable = function (data)
{
    var length   = data.length|0;
    var code     = 0;
    var idx      = 0;
    var maxBits  = 0;
    var blCount  = [];
    var nextCode = [];
    var table    = {};

    var i = 0;
    while (i < length) {
        maxBits = this.$max(maxBits, data[i]);
        i = (i + 1)|0;
    }

    maxBits = (maxBits + 1)|0;

    i = length;
    while (i) {
        i = (i - 1)|0;

        idx = data[i];
        blCount[idx] = (blCount[idx] || 0) + (idx > 0);
    }

    i = 1;
    while (i < maxBits) {
        idx = (i - 1)|0;
        if (!(idx in blCount)) {
            blCount[idx] = 0;
        }

        code = (code + blCount[idx]) << 1;
        nextCode[i] = code|0;

        i = (i + 1)|0;
    }

    i = 0;
    while (i < length) {
        idx = data[i];
        if (idx) {
            table[nextCode[idx]] = {
                length: idx,
                symbol: i
            };

            nextCode[idx] = (nextCode[idx] + 1)|0;
        }

        i = (i + 1)|0;
    }

    return table;
};

/**
 * @param bitio
 * @param table
 * @returns {*}
 */
BitIO.prototype.decodeSymbol = function (bitio, table)
{
    var code   = 0;
    var length = 0;

    while (true) {
        code   = (code << 1) | bitio.readUB(1);
        length = (length + 1)|0;
        if (!(code in table)) {
            continue;
        }

        var entry = table[code];
        if (entry.length === length) {
            return entry.symbol;
        }
    }
};

/**
 * @param length
 * @returns {Array}
 */
BitIO.prototype.createArray = function (length)
{
    return (this.$canArrayBuffer) ? new Uint8Array(length) : [];
};

/**
 * @param data
 */
BitIO.prototype.setData = function (data)
{
    this.data = data;
};

/**
 * @returns {string}
 */
BitIO.prototype.getHeaderSignature = function ()
{
    var str   = "";
    var count = 3;
    while (count) {
        var code = this.getUI8();
        switch (code) {
            // trim
            case 32:
            case 96:
            case 127:
                continue;
            default:
                break;
        }

        str  += this.$fromCharCode(code);
        count = (count - 1)|0;
    }

    return str;
};

/**
 * @returns {number}
 */
BitIO.prototype.getVersion = function ()
{
    return this.getUI8();
};

/**
 * byteAlign
 */
BitIO.prototype.byteAlign = function ()
{
    if (!this.bit_offset) {
        return;
    }

    this.byte_offset = (this.byte_offset + (this.bit_offset + 7) / 8)|0;
    this.bit_offset  = 0;
};

/**
 * @param length
 * @returns {Array}
 */
BitIO.prototype.getData = function (length)
{
    this.byteAlign();

    var array = this.createArray(length);
    var key   = 0;
    var data  = this.data;
    var limit = length;

    while (limit) {
        array[key] = data[this.byte_offset];

        key = (key + 1)|0;

        this.byte_offset = (this.byte_offset + 1)|0;

        limit = (limit - 1)|0;
    }

    return array;
};

/**
 * @param value
 * @param isJis
 * @returns {string}
 */
BitIO.prototype.getDataUntil = function (value, isJis)
{
    this.byteAlign();

    var data   = this.data;
    var bo     = this.byte_offset|0;
    var offset = 0;
    if (value === null) {
        offset = -1;
    } else {
        var length = data.length|0;
        while (true) {
            var val = data[bo + offset];
            offset  = (offset + 1)|0;

            if (val === 0 || (bo + offset) >= length) {
                break;
            }
        }
    }

    var n = (offset === -1) ? data.length - bo : offset;
    var array = [];
    var ret = "";
    var _join = Array.prototype.join;
    var i = 0;
    if (value !== null) {
        i = 0;
        while (i < n) {
            var code = data[bo + i];
            i = (i + 1)|0;

            if (code === 10 || code === 13) {
                array[array.length] = "\n";
            }
            if (code < 32) {
                continue;
            }
            array[array.length] = "%" + code.toString(16);
        }

        if (array.length) {
            var str = _join.call(array, "");
            if (str.length > 5 && str.substr(-5) === "\n") {
                str = str.slice(0, -5);
            }

            if (isJis) {
                ret = this.decodeToShiftJis(str);
            } else {
                try {
                    ret = decodeURIComponent(str);
                } catch (e) {
                    ret = this.decodeToShiftJis(str);
                }
            }
        }
    } else {
        i = 0;
        while (i < n) {
            ret += this.$fromCharCode(data[bo + i]);
            i = (i + 1)|0;
        }
    }

    this.byte_offset = bo + n;

    return ret;
};

/**
 * byteCarry
 */
BitIO.prototype.byteCarry = function ()
{
    if (this.bit_offset > 7) {
        this.byte_offset  = this.byte_offset + (0 | (this.bit_offset + 7) / 8);
        this.bit_offset  &= 0x07;
    } else {
        while (this.bit_offset < 0) {
            this.byte_offset = (this.byte_offset - 1)|0;
            this.bit_offset  = (this.bit_offset + 8)|0;
        }
    }
};

/**
 * @param number
 * @returns {number}
 */
BitIO.prototype.getUIBits = function (number)
{
    var value = 0;
    while (number) {
        value <<= 1;
        value  |= this.getUIBit();
        number  = (number - 1)|0;
    }
    return value;
};

/**
 * @returns {number}
 */
BitIO.prototype.getUIBit = function ()
{
    this.byteCarry();

    var number = (this.data[this.byte_offset] >> (7 - this.bit_offset)) & 0x1;

    this.bit_offset = (this.bit_offset + 1)|0;

    return number;
};

/**
 * @param number
 * @returns {number}
 */
BitIO.prototype.getSIBits = function (number)
{
    var value = this.getUIBits(number);
    var msb   = value & (0x1 << (number - 1));
    if (msb) {
        return -(value ^ (2 * msb - 1)) - 1;
    }
    return value;
};

/**
 * @returns {number}
 */
BitIO.prototype.getUI8 = function ()
{
    this.byteAlign();
    var value = this.data[this.byte_offset];
    this.byte_offset = (this.byte_offset + 1)|0;
    return value;
};

/**
 * @returns {number}
 */
BitIO.prototype.getUI16 = function ()
{
    this.byteAlign();
    return (this.getUI8() | (this.getUI8()) << 8);
};

/**
 * @returns {number}
 */
BitIO.prototype.getUI24 = function ()
{
    this.byteAlign();
    return (this.getUI8() | (this.getUI8() | (this.getUI8()) << 8) << 8);
};

/**
 * @returns {number}
 */
BitIO.prototype.getUI32 = function ()
{
    this.byteAlign();
    return (this.getUI8() | (this.getUI8() | (this.getUI8() | (this.getUI8()) << 8) << 8) << 8);
};

/**
 * @returns {number}
 */
BitIO.prototype.getUI16BE = function ()
{
    this.byteAlign();
    return (((this.getUI8()) << 8) | (this.getUI8()));
};

/**
 * @returns {*}
 */
BitIO.prototype.getFloat16 = function ()
{
    var data  = this.getData(2);
    var float = 0;
    float |= data[1] << 8;
    float |= data[0] << 0;
    return float;
};

/**
 * @returns {*}
 */
BitIO.prototype.getFloat32 = function ()
{
    var data = this.getData(4);
    var rv   = 0;
    rv |= data[3] << 24;
    rv |= data[2] << 16;
    rv |= data[1] << 8;
    rv |= data[0] << 0;

    var sign     = rv & 0x80000000;
    var exp      = (rv >> 23) & 0xff;
    var fraction = rv & 0x7fffff;
    if (!rv || rv === 0x80000000) {
        return 0;
    }

    return (sign ? -1 : 1) *
        (fraction | 0x800000) *
            this.$pow(2, (exp - 127 - 23));
};

/**
 * @returns {number}
 */
BitIO.prototype.getFloat64 = function ()
{
    var upperBits     = this.getUI32();
    var lowerBits     = this.getUI32();
    var sign          = upperBits >>> 31 & 0x1;
    var exp           = upperBits >>> 20 & 0x7FF;
    var upperFraction = upperBits & 0xFFFFF;

    return (!upperBits && !lowerBits) ? 0 : ((sign === 0) ? 1 : -1) *
        (upperFraction / 1048576 + lowerBits / 4503599627370496 + 1) *
            this.$pow(2, exp - 1023);
};

/**
 * @returns {number}
 */
BitIO.prototype.getFloat64LittleEndian = function ()
{
    var signBits     = 1;
    var exponentBits = 11;
    var fractionBits = 52;
    var min          = -1022;
    var max          = 1023;

    var str = "";
    var i   = 0;
    while (i < 8) {
        var bits = this.getUI8().toString(2);
        while (bits.length < 8) {
            bits = "0" + bits;
        }
        str = bits + str;
        i = (i + 1)|0;
    }

    var sign            = (str.charAt(0) === "1") ? -1 : 1;
    var exponent        = this.$parseInt(str.substr(signBits, exponentBits), 2) - max;
    var significandBase = str.substr(signBits + exponentBits, fractionBits);
    var significandBin  = "1"+ significandBase;

    var val         = 1;
    var significand = 0;
    if (exponent === -max) {
        if (significandBase.indexOf("1") === -1) {
            return 0;
        } else {
            exponent       = min;
            significandBin = "0"+ significandBase;
        }
    }

    var l = 0;
    while (l < significandBin.length) {
        var sb = significandBin.charAt(l)|0;
        significand = significand + val * sb;

        val = val / 2;
        l   = (l + 1)|0;
    }

    return sign * significand * this.$pow(2, exponent);
};

/**
 * @param data
 * @returns {number}
 */
BitIO.prototype.toUI16 = function (data)
{
    return data[0] + (data[1] << 8);
};

/**
 * @param data
 * @returns {number}
 */
BitIO.prototype.toSI16LE = function (data)
{
    var value = this.toUI16(data);
    return (value < 0x8000) ? value : (value - 0x10000);
};

/**
 * @returns {number}
 */
BitIO.prototype.getSI8 = function ()
{
    var value = this.getUI8();
    if (value >> 7) { // nBits = 8;
        value = (value - 256)|0; // Math.pow(2, 8)
    }
    return value;
};

/**
 * @returns {*}
 */
BitIO.prototype.getSI24 = function ()
{
    var _this = this;
    var value = _this.getUI24();
    if (value >> 23) { // nBits = 24;
        value = (value - 16777216)|0; // Math.pow(2, 24)
    }
    return value;
};

/**
 * @param byteInt
 * @param bitInt
 */
BitIO.prototype.incrementOffset = function (byteInt, bitInt)
{
    this.byte_offset = (this.byte_offset + byteInt)|0;
    this.bit_offset  = (this.bit_offset  + bitInt)|0;
    this.byteCarry();
};

/**
 * @param byteInt
 * @param bitInt
 */
BitIO.prototype.setOffset = function (byteInt, bitInt)
{
    this.byte_offset = byteInt;
    this.bit_offset  = bitInt;
};

/**
 * @returns {number}
 */
BitIO.prototype.getU30 = function ()
{
    var value = 0;
    var i = 0;
    while (i < 5) {
        var num = this.getUI8();

        value |= ((num & 0x7f) << (7 * i));

        if (!(num & 0x80)) {
            break;
        }

        i = (i + 1)|0;
    }
    return value;
};

/**
 * @returns {number}
 */
BitIO.prototype.getS30 = function ()
{
    var startOffset = this.byte_offset;
    var value       = this.getU30();
    var nBits       = ((this.byte_offset - startOffset) * 8)|0;
    if (value >> (nBits - 1)) {
        value = (value - this.$pow(2, nBits))|0;
    }
    return value;
};

/**
 * @param offset
 * @returns {number}
 */
BitIO.prototype.ReadU30 = function (offset)
{
    var value = 0;
    var data = this.data;
    var i = 0;
    while (i < 5) {
        var num = data[offset];
        offset  = (offset + 1)|0;

        value |= ((num & 0x7f) << (7 * i));
        if (!(num & 0x80)) {
            break;
        }

        i = (i + 1)|0;
    }
    return value;
};

/**
 * @returns {string}
 */
BitIO.prototype.AbcReadString = function ()
{
    var offset = this.byte_offset;
    var length = this.ReadU30(offset) + 1;

    var ret = [];
    var i = 0;
    while (i < length) {
        i = (i + 1)|0;

        var code = this.getUI8();
        if (code < 33) {
            continue;
        }

        switch (code) {
            default:
                break;
            case 34:
            case 35:
            case 36:
            case 37:
            case 38:
            case 39:
            case 43:
            case 45:
                continue;
        }

        ret[ret.length] = this.$fromCharCode(code);
    }

    return ret.join("");
};

/**
 * @param length
 * @returns {number}
 */
BitIO.prototype.readUB = function (length)
{
    var value = 0;
    var i = 0;

    while (i < length) {
        if (this.bit_offset === 8) {
            this.bit_buffer = this.readNumber(1);
            this.bit_offset = 0;
        }

        value |= (this.bit_buffer & (0x01 << this.bit_offset) ? 1 : 0) << i;
        this.bit_offset = (this.bit_offset + 1)|0;

        i = (i + 1)|0;
    }

    return value;
};

/**
 * @returns {number}
 */
BitIO.prototype.readNumber = function (n)
{
    var value = 0;

    var o = this.byte_offset;
    var i = o + n;
    while (i > o) {
        i = (i - 1)|0;
        value = (value << 8) | this.data[i];
    }

    this.byte_offset = this.byte_offset + n;
    return value;
};

/**
 * @param size
 * @param mode
 */
BitIO.prototype.deCompress = function (size, mode)
{
    var cacheOffset  = this.byte_offset;
    this.byte_offset = 0;

    // header
    var data = this.getData(cacheOffset);

    var deCompress;
    switch (mode) {
        case "ZLIB":
            deCompress = this.unzip(this.data, true);
            break;
        case "LZMA":
            deCompress = this.unlzma(this.data, size - cacheOffset);
            break;
    }

    // create new array
    var array  = this.createArray(size);

    // header
    var i      = 0;
    var key    = 0;
    var length = data.length;
    while (i < length) {
        array[key] = data[i]|0;

        key = (key + 1)|0;
        i   = (i + 1)|0;
    }

    // data
    i = 0;
    length = deCompress.length;
    while (i < length) {
        array[key] = deCompress[i]|0;

        key = (key + 1)|0;
        i   = (i + 1)|0;
    }

    this.data        = array;
    this.byte_offset = cacheOffset;
};