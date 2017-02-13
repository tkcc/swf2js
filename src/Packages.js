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
            "AntiAliasType": AntiAliasType,
            "CSMSettings": CSMSettings,
            "Font": Font,
            "FontStyle": FontStyle,
            "FontType": FontType,
            "GridFitType": GridFitType,
            "StaticText": StaticText,
            "StyleSheet": StyleSheet,
            "TextColorType": TextColorType,
            "TextDisplayMode": TextDisplayMode,
            "TextField": TextField,
            "TextFieldAutoSize": TextFieldAutoSize,
            "TextFieldType": TextFieldType,
            "TextFormat": TextFormat,
            "TextFormatAlign": TextFormatAlign,
            "TextLineMetrics": TextLineMetrics,
            "TextRenderer": TextRenderer,
            "TextSnapshot": TextSnapshot
        },
        "media": {
            "AVNetworkingParams": AVNetworkingParams,
            "AVURLLoader": AVURLLoader,
            "AVURLStream": AVURLStream,
            "Camera": Camera,
            "ID3Info": ID3Info,
            "Microphone": Microphone,
            "Sound": Sound,
            "SoundChannel": SoundChannel,
            "SoundCodec": SoundCodec,
            "SoundLoaderContext": SoundLoaderContext,
            "SoundMixer": SoundMixer,
            "SoundTransform": SoundTransform,
            "StageVideo": StageVideo,
            "StageVideoAvailability": StageVideoAvailability,
            "StageVideoAvailabilityReason": StageVideoAvailabilityReason,
            "Video": Video,
            "VideoStatus": VideoStatus
        },
        "filters": {
            "BevelFilter": BevelFilter,
            "BitmapFilter": BitmapFilter,
            "BitmapFilterQuality": BitmapFilterQuality,
            "BitmapFilterType": BitmapFilterType,
            "BlurFilter": BlurFilter,
            "ColorMatrixFilter": ColorMatrixFilter,
            "ConvolutionFilter": ConvolutionFilter,
            "DisplacementMapFilter": DisplacementMapFilter,
            "DisplacementMapFilterMode": DisplacementMapFilterMode,
            "DropShadowFilter": DropShadowFilter,
            "GlowFilter": GlowFilter,
            "GradientBevelFilter": GradientBevelFilter,
            "GradientGlowFilter": GradientGlowFilter,
            "ShaderFilter": ShaderFilter
        },
        "net": {
            "FileFilter": FileFilter,
            "FileReference": FileReference,
            "FileReferenceList": FileReferenceList,
            "GroupSpecifier": GroupSpecifier,
            "LocalConnection": LocalConnection,
            "NetConnection": NetConnection,
            "NetGroup": NetGroup,
            "NetGroupInfo": NetGroupInfo,
            "NetGroupReceiveMode": NetGroupReceiveMode,
            "NetGroupReplicationStrategy": NetGroupReplicationStrategy,
            "NetGroupSendMode": NetGroupSendMode,
            "NetGroupSendResult": NetGroupSendResult,
            "NetStream": NetStream,
            "NetStreamAppendBytesAction": NetStreamAppendBytesAction,
            "NetStreamInfo": NetStreamInfo,
            "NetStreamMulticastInfo": NetStreamMulticastInfo,
            "NetStreamPlayOptions": NetStreamPlayOptions,
            "NetStreamPlayTransitions": NetStreamPlayTransitions,
            "ObjectEncoding": ObjectEncoding,
            "Responder": Responder,
            "SecureSocket": SecureSocket,
            "SharedObject": SharedObject,
            "SharedObjectFlushStatus": SharedObjectFlushStatus,
            "Socket": Socket,
            "URLLoader": URLLoader,
            "URLLoaderDataFormat": URLLoaderDataFormat,
            "URLRequest": URLRequest,
            "URLRequestHeader": URLRequestHeader,
            "URLRequestMethod": URLRequestMethod,
            "URLStream": URLStream,
            "URLVariables": URLVariables,
            "XMLSocket": XMLSocket
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