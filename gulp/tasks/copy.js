var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var runSequence = require('run-sequence');
var config = require('../config.js');

gulp.task('copy:fonts', function() {
    return gulp
        .src(config.src.fonts + '/**/*.{ttf,eot,woff,woff2}')
        .pipe(gulp.dest(config.dest.fonts));
});

gulp.task('copy:libs', function() {
    return gulp
        .src(config.src.libs + '/**/*.*')
        .pipe(gulp.dest(config.dest.libs));
});

gulp.task('copy:rootfiles', function() {
    return gulp
        .src([config.src.root + '/*.*', '!' + config.src.assets + '/**/*.*'])
        .pipe(gulp.dest(config.dest.root));
});

gulp.task('copy:img', function() {
    return gulp
        .src([
            config.src.img + '/**/*.{jpg,png,jpeg,svg,gif}',
            '!' + config.src.img + '/svgo/**/*.*'
        ])
        .pipe(gulp.dest(config.dest.img));
});

gulp.task('copy:img:minify', function() {
    return gulp
        .src([
            config.src.img + '/**/*.{jpg,png,jpeg,svg,gif}',
            '!' + config.src.img + '/svgo/**/*.*'
        ])
        .pipe(
            imagemin({
                optimizationLevel: 3
            })
        )
        .pipe(gulp.dest(config.dest.img));
});

gulp.task('copy', function(cp) {
    runSequence(
        'copy:img',
        'copy:rootfiles',
        'copy:fonts',
        // 'copy:libs',
        cp
    );
});

gulp.task('copy:production', function(cp) {
    runSequence(
        'copy:img:minify',
        'copy:rootfiles',
        'copy:fonts',
        // 'copy:libs',
        cp
    );
});

gulp.task('copy:watch', function() {
    gulp.watch(config.src.img + '/**/*.{jpg,png,jpeg,svg,gif}', ['copy:img']);
});
