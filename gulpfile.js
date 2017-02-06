var gulp    = require("gulp");
var browser = require("browser-sync").create();
var concat  = require("gulp-concat");
var uglify  = require("gulp-uglify");

gulp.task("server", function() {
    browser.init({
        server: {
            baseDir: "./",
            index: "index.html"
        }
    });
});

gulp.task("reload", function () {
    browser.reload();
});

gulp.task("concat", function() {
    gulp.src([
        "copyright.file",
        "header.file",
        "src/util/Setting.js",
        "src/util/CanvasToWebGL.js",
        "src/util/Util.js",
        "src/flash/*.js",
        "src/flash/events/Swf2jsEvent.js",
        "src/flash/events/*.js",
        "src/flash/filters/BitmapFilter.js",
        "src/flash/filters/*.js",
        "src/flash/accessibility/*.js",
        "src/flash/display/DisplayObject.js",
        "src/flash/display/InteractiveObject.js",
        "src/flash/display/DisplayObjectContainer.js",
        "src/flash/display/Sprite.js",
        "src/flash/display/*.js",
        "src/flash/text/*.js",
        "src/flash/media/*.js",
        "src/flash/net/*.js",
        "src/as/*.js",
        "src/*.js",
        "src/parser/*.js",
        "src/player/*.js",
        "footer.file"
        ])
        .pipe(concat("swf2js.js"))
        // .pipe(uglify({ preserveComments: "license" }))
        .pipe(gulp.dest("."));
});

gulp.task("default", ["server"], function() {
    gulp.watch(["src/**/*.js"], ["concat"]);
    gulp.watch(["swf2js.js"], ["reload"]);
});
