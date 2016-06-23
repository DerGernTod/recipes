"use-strict";
const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const fileInclude = require('gulp-file-include');
const browserSync = require('browser-sync');
const del = require('del');
const imagemin = require('gulp-imagemin');
const express = require('express');
const fs = require('fs');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const minifyCSS = require('gulp-minify-css');
const couch = require("./gulptasks/couch");

gulp.task('default', ['clean'], function(){
    return gulp.start('build');
});

gulp.task('build', ['scripts', 'less', 'html', 'images']);

gulp.task('clean', function(cb){
    del(['public'], { force: true }, cb);
    return gulp.src(['src/**']);
});

gulp.task('server', require('./gulptasks/serverTask'));
gulp.task('couchdb', function initDb(){
    couch.initDatabase();
})

gulp.task('images', function(){
    return gulp.src(['src/img/**/*'])
        .pipe(imagemin())
        .pipe(gulp.dest('public/img'));
});


gulp.task('less', function(){
    return gulp.src(['src/less/**/*.less'])
        .pipe(less())
        .pipe(sourcemaps.init())
        .pipe(minifyCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('scripts', function(){
    return gulp.src([
        'src/scripts/comment/*.js',
        'src/scripts/BuildPage.js'
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('html', function() {
    return gulp.src(['src/*.html'])
        .pipe(fileInclude())
        .pipe(gulp.dest('public'));
});

gulp.task('dev', ['default', 'couchdb'], function(){
    gulp.watch(['scripts/**/*'], ['scripts', browserSync.reload]);
    gulp.watch(['src/**/*.html'], ['html', browserSync.reload]);
    gulp.watch(['src/less/**/*'], ['less']);
    gulp.watch(['src/img/**/*'], ['images', browserSync.reload]);
    
    browserSync.init(null, {
        proxy: "http://localhost:3000"
    });
    gulp.start('server');
});


gulp.start('dev');