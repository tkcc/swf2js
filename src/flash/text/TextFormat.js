/**
 * @constructor
 */
var TextFormat = function ()
{
    this.align         = "left";
    this.font          = "'HiraKakuProN-W3', 'sans-serif'";
    this.size          = 8;
    this.color         = {R: 0, G: 0, B: 0, A: 1};
    this.bold          = 0;
    this.italic        = 0;
    this.underline     = 0;
    this.bullet        = 0;
    this.kerning       = 0;
    this.blockIndent   = 0;
    this.indent        = 0;
    this.leading       = 80;
    this.leftMargin    = 0;
    this.rightMargin   = 0;
    this.letterSpacing = 0;
    this.tabStops      = [];
    this.url           = null;
    this.target        = null;
};