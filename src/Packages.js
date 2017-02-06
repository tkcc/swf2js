/**
 * @constructor
 * @param stage
 */
var Packages = function (stage)
{
    this.stage = stage;
};

/**
 * @type {*}
 */
Packages.prototype = {
    "flash": {
        "display": {
            "MovieClip": MovieClip,
            "Sprite": Sprite,
            "DisplayObjectContainer": DisplayObjectContainer,
            "InteractiveObject": InteractiveObject,
            "DisplayObject": DisplayObject,
            "Graphics": Graphics
        },
        "events": {
            "Event": Event,
            "EventDispatcher": EventDispatcher,
            "MouseEvent": Util.prototype.$clipEvent
        },
        "text": {
            "StaticText": StaticText,
            "TextField": TextField,
            "TextFormat": TextFormat,
            "TextSnapshot": TextSnapshot
        },
        "media": {
            "Sound": Sound,
            "SoundTransform": SoundTransform
        },
        "filters": {
            "DropShadowFilter": DropShadowFilter,
            "BlurFilter": BlurFilter,
            "GlowFilter": GlowFilter,
            "BevelFilter": BevelFilter,
            "GradientGlowFilter": GradientGlowFilter,
            "ConvolutionFilter": ConvolutionFilter,
            "ColorMatrixFilter": ColorMatrixFilter,
            "GradientBevelFilter": GradientBevelFilter,
            "BitmapFilter": BitmapFilter
        },
        "net": {
            "URLRequest": URLRequest
        },
        "system": {
            "fscommand": function ()
            {
                var command = arguments[0];
                var args    = arguments[1];
                if (args === undefined) {
                    args = "";
                }

                switch (command) {
                    case "quit":
                    case "fullscreen":
                    case "allowscale":
                    case "showmenu":
                    case "exec":
                    case "trapallkeys":
                        break;
                    default:
                        if (command) {
                            var method    = (this.tagId) ? this.tagId : this.getName();
                            var body      = method +"_DoFSCommand(command, args);";
                            var fscommand = new Func("command", "args", body);
                            fscommand(command, args);
                        }
                        break;
                }

                return true;
            }
        }
    }
};