var gulp = require('gulp');
var flatten = require('gulp-flatten');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var args = require('yargs').argv;
var isProduction = args.env === 'production';
var destination = isProduction ? 'dist' : 'test';

//move html, javascript and css files to production / test environment
gulp.task('move', function(){
	if(!isProduction){
		gulp.src(['./src/unit-tests.html','./src/index.html']).pipe(gulp.dest('./'+destination))
	}else{
		gulp.src(['./src/index.html']).pipe(gulp.dest('./'+destination))
	}

	gulp.src(['./bower_components/angular/angular.min.js','./bower_components/angular-ui-router/release/angular-ui-router.min.js','./bower_components/bootstrap/dist/js/bootstrap.min.js','./bower_components/jquery/dist/jquery.min.js','./bower_components/qunit/qunit/qunit.js']).pipe(gulp.dest('./'+destination+'/js'))
	gulp.src(['./src/style.css','./bower_components/bootstrap/dist/css/bootstrap.min.css','./bower_components/qunit/qunit/qunit.css']).pipe(gulp.dest('./'+destination+'/css'))
	gulp.src(['!./src/index.html','!./src/unit-tests.html', './src/**/*.html']).pipe(flatten()).pipe(gulp.dest('./'+destination+'/templates'))
});

//combine js scripts into one file
gulp.task('scripts', function(){
	if(!isProduction){
		gulp.src(['!./src/components/data/production/*','./src/app.js', './src/**/*.js']).pipe(concat('all.js')).pipe(gulp.dest('./'+destination+'/js'))
	}else{
		gulp.src(['!./src/components/data/test/*','./src/app.js', './src/**/*.js']).pipe(concat('all.js')).pipe(gulp.dest('./'+destination+'/js'))
	}
});

//start server
gulp.task('serve', function(){
	gulp.src('.').pipe(webserver({
		port: 48080,
		livereload: true,
		open: 'http://localhost:48080/'+destination
	}));
});

//watcher
gulp.task('watch', ['serve'], function(){
	gulp.start(['scripts', 'move']);
	gulp.watch(['./src/**/*.js'], ['scripts']);
	gulp.watch(['./src/**/*.html'], ['move']);
});




















