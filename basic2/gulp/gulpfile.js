//gulfile.js

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./public/src/scss**/*.scss')
             .pipe(sass.sync().on('error', sass.logError))
             .pipe(gulp.dest('./public/dist/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./public/src/scss**/*.scss', ['sass']);
});

gulp.task('default',['sass:watch','sass']);