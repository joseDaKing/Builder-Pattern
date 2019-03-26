const paths = {
    src: "src/app.js",
    dest: "dest"
};

const gulp = require("gulp");
const babel = require("gulp-babel");

const task = gulp.task;
const src = gulp.src;
const dest = gulp.dest;
const watch = gulp.watch;
const series = gulp.series;

gulp.task("compile", function() {
    return (
        gulp.src(paths.src)
            .pipe(babel())
            .pipe(gulp.dest(paths.dest))
    );
});

gulp.task("watch", function() {
    gulp.watch(paths.src, gulp.series("compile"))
});