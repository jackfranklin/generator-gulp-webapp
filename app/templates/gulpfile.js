'use strict';
// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>

var gulp = require('gulp');

// Load plugins
var $ = require('gulp-load-plugins')();

// Styles
gulp.task('styles', function () {
    return gulp.src('app/styles/main.scss')
        .pipe($.sass({
          style: 'expanded',
          loadPath: ['app/bower_components']
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe($.csso())
        .pipe(gulp.dest('dist/styles'))
        .pipe($.size());
});

// Scripts
gulp.task('scripts', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.jshint('.jshintrc'))
        .pipe($.jshint.reporter('default'))
        .pipe($.concat('main.js'))
        .pipe($.uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe($.size());
});

// HTML
gulp.task('html', function () {
    return gulp.src('app/*.html')
      .pipe(gulp.dest('dist'))
      .pipe($.size());
});

// Images
gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});

// Clean
gulp.task('clean', function () {
    return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false}).pipe($.clean());
});

// Build
gulp.task('build', ['html', 'styles', 'scripts', 'images']);

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

// Connect
gulp.task('connect', $.connect.server({
    root: __dirname + '/app',
    port: 9000,
    livereload: true
}));

// Watch
gulp.task('watch', ['connect'], function () {
    // Watch for changes in `app` folder
    gulp.watch([
        'app/*.html',
        'app/styles/**/*.css',
        'app/scripts/**/*.js',
        'app/images/**/*'
    ], $.connect.reload);

    // Watch .scss files
    gulp.watch('app/styles/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('app/scripts/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('app/images/**/*', ['images']);
});
