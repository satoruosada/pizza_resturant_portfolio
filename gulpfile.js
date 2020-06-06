var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync  = require('browser-sync');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var imageminPngquant = require("imagemin-pngquant");
var imageminMozjpeg = require("imagemin-mozjpeg");


gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./",
          index: "index.html"
      }
  });
});
gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('mincss', function() {
  return gulp.src("css/*.css")
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('css/'));
});

gulp.task('minjs', function() {
  return gulp.src("js/*.js")
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('js/'));
});

var imageminOption = [
  imageminPngquant({ quality: [0.65, 0.8] }),
  imageminMozjpeg({ quality: 85 }),
  imagemin.gifsicle({
    interlaced: false,
    optimizationLevel: 1,
    colors: 256
  }),
  imagemin.mozjpeg(),
  imagemin.optipng(),
  imagemin.svgo()
];

gulp.task( 'images', function() {
  return gulp
    .src( './img/base/*.{png,jpg,gif,svg}' )
    .pipe( imagemin( imageminOption ) )
    .pipe( gulp.dest( './img' ) );
});

gulp.task('sass', function() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('./css'));
});

gulp.task( 'default', gulp.series( gulp.parallel( 'browser-sync' )), function(done) {
  gulp.watch( './*.html', gulp.series( gulp.parallel( 'bs-reload' )));
  gulp.watch( './css/*.css', gulp.series( gulp.parallel( 'bs-reload' )));
  gulp.watch( './js/*.js', gulp.series( gulp.parallel( 'bs-reload' )));
  done();
});

gulp.task( 'watch', function() {
  gulp.watch( './sass/**/*.scss', gulp.task( 'sass' ) );
});





