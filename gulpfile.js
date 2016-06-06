var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", ["build", "test", "tslint"]);

gulp.task("build", function () {
    return tsProject.src('typings/')
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest("./"));
});

var tslint = require("gulp-tslint");

gulp.task("tslint", () =>
    tsProject.src()
        .pipe(tslint())
        .pipe(tslint.report("verbose"))
);

const jasmine = require('gulp-jasmine');

gulp.task('test', ['build'], () =>
    gulp.src('test/mcUtil.spec.js')
        .pipe(jasmine())
);
