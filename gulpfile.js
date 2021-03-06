/*
*Default task requires Chrome LiveReload plugin for livereload development.
*otherwise this can be run just for browserify bundleing.
*/
var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    source = require('vinyl-source-stream'),
    gutil = require('gulp-util'),
    watchify = require('watchify'),
    browserify = require('gulp-browserify'),
    react = require('gulp-react'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    path = require('path');

gulp.task('default',function(){
    function buildReact(){
      return  gulp.src("./public/player/js/react/src/**/*.js")
        .pipe(react())
        .pipe(gulp.dest('./public/player/js/react/build'))
    }
    buildReact();

    gulp.watch(['public/player/js/react/src/**']).on('change',function(){
        buildReact();
    })

    var bundle = watchify('./public/player/js/main.js');
    bundle.transform('reactify');
    bundle.on('update',rebundle);

    function rebundle(){
        return bundle.bundle()
        .on('error',function(e){
            gutil.log('Browserify Error:', e);
        })
        //.pipe(uglify())
        .pipe(source('player.js'))
        .pipe(gulp.dest('./public/js'))
    }
    //live reload of compiled files
    livereload.listen();
    gulp.watch(['views/*','public/js/player.js','public/css/*']).on('change',livereload.changed);

    //build less css changes
    gulp.watch('public/player/less/**').on('change', function(){
        return gulp.src('./public/player/less/**/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./public/css'));
    })
    return rebundle();
});
