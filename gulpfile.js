var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var fileInclude = require('gulp-file-include');
var browserSync = require('browser-sync');
var del = require('del');
var imagemin = require('gulp-imagemin');

gulp.task('default', ['clean'], function(){
    return gulp.start('build');
});

gulp.task('build', ['scripts', /* 'less', 'templates', 'images'*/]);

gulp.task('clean', function(cb){
    del(['build'], { force: true }, cb);
    console.log("clean");
    return gulp.src(['app/**']);
});


gulp.task('images', function(){
    return gulp.src(['src/img/**/*'])
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
});

gulp.task('server', function(){
    browserSync({
        server: {
            baseDir: './build'
        }
    });
});

gulp.task('less', function(){
    return gulp.src(['src/less/**/*.less'])
        .pipe(less())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('scripts', function(){
    return gulp.src([
        // 'bower_components/bootstrap/js/modal.js',
        // 'bower_components/bootstrap/js/transition.js',
        // 'bower_components/bootstrap/js/tab.js',
        'app/main.js'
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('templates', function() {
    return gulp.src(['src/templates/*.html'])
        .pipe(fileInclude())
        .pipe(gulp.dest('build'));
});

gulp.task('dev', ['default'], function(){
    gulp.watch(['app/**/*'], ['scripts']);
    // gulp.watch(['src/less/**/*'], ['less']);
    // gulp.watch(['src/templates/**/*'], ['templates', browserSync.reload]);
    // gulp.watch(['src/img/**/*'], ['images', browserSync.reload]);
    gulp.start('server');
});