var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var sourcemaps = require('gulp-sourcemaps');

gulp.task("default", ["build", "test", "tslint"]);

gulp.task("build", function () {
    return tsProject.src('typings/')
        //.pipe(sourcemaps.init())
        .pipe(ts(tsProject)).js
        //.pipe(sourcemaps.write('./', {sourceRoot:'/src'}))
        .pipe(gulp.dest("./"));
});

var tslint = require("gulp-tslint");

gulp.task("tslint", function () {
    tsProject.src()
        .pipe(tslint())
        .pipe(tslint.report("verbose"))
});

const jasmine = require('gulp-jasmine');

gulp.task('test', ['build'], function () {
    gulp.src('test/*.spec.js')
        .pipe(jasmine())
});

const del = require('del');

gulp.task('clean', function () {
    del(['src/*.js', 'test/*.js', 'src/*.map', 'test/*.map', '*.log']).then(function (paths) {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});

