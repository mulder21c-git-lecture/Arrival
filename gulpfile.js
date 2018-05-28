var gulp = require("gulp"),
    webserver = require("gulp-webserver"),
    livereload = require("gulp-livereload"),
    watch = require("gulp-watch"),
    sass = require("gulp-sass"),
    clean = require("gulp-clean");

var scssOpts = {
  outputStyle: "compressed",
  sourceComments: false
};

gulp.task("clean", function () {
  return gulp.src("./dist/**/*", {read: false})
    .pipe(clean());
});

gulp.task("html", function () {
  return gulp.src("./source/html/**/*.html")
    .pipe(gulp.dest("./dist/"))
    .pipe(livereload());
});

gulp.task("scss", function () {
  return gulp.src("./source/scss/**/index.scss")
    .pipe(sass(scssOpts).on("error", sass.logError))
    .pipe(gulp.dest("./dist/css"))
    .pipe(livereload());
});

gulp.task("css", function () {
  return gulp.src(["./source/css/**/*.css", ".!/source/css/index.css"])
    .pipe(gulp.dest("./dist/css"))
    .pipe(livereload());
});

gulp.task("js", function () {
  return gulp.src(["./source/js/**/*.js"])
    .pipe(gulp.dest("./dist/js/"))
    .pipe(livereload());
});

gulp.task("images", function () {
  return gulp.src(["./source/images/**/*.{png,jpg,gif,jpeg}"])
    .pipe(gulp.dest("./dist/images/"));
});

gulp.task("webserver", function () {
  return gulp.src("./dist/")
    .pipe(webserver({
      livereload: true,
      host: "localhost",
      port: 8888,
      open: true
    }));
});

gulp.task("watch", function () {
  livereload.listen();
  gulp.watch(["source/**/*.html"], ["html"]);
  gulp.watch(["source/**/*.scss"], ["scss"]);
  gulp.watch(["source/**/*.css"], ["css"]);
  gulp.watch(["source/**/*.js"], ["js"]);
});

gulp.task("default", ["clean"], function () {
  gulp.start(["html", "scss", "css", "js", "images", "webserver", "watch"]);
});

gulp.task("build", ["clean"], function(){
	gulp.start(["html", "scss", "css", "js", "images"]);
});