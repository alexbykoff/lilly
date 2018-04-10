var gulp = require("gulp");
const babel = require("gulp-babel");
var jasmineBrowser = require("gulp-jasmine-browser");
var watch = require("gulp-watch");

gulp.task("default", function() {
    return gulp
        .src("src/index.js")
        .pipe(
            babel({
                presets: ["stage-0"]
            })
        )
        .pipe(gulp.dest("dist"));
});

gulp.task("test", ["default"], function() {
    var filesForTest = ["dist/**/*.js", "spec/**/*Spec.js"];
    return gulp
        .src(filesForTest)
        .pipe(watch(filesForTest))
        .pipe(jasmineBrowser.specRunner())
        .pipe(jasmineBrowser.server({ port: 8888 }));
});
