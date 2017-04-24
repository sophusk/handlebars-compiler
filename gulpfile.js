//
'use strict'
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	//sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    //sass = require('gulp-sass'),
    ////notify = require('gulp-notify'),
    ////-reporter = require('postcss-reporter'),
    ////-watchify = require('watchify'),
    ////-browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    index = require('gulp-index'),
    runSequence = require('run-sequence'),
    stringify = require('stringify'),
    clean = require('gulp-clean'),

    ////-buffer = require('vinyl-buffer'),
    ////-uglify = require('gulp-uglify'),
    ////-imagemin = require('gulp-imagemin'),
    handlebars = require('gulp-compile-handlebars'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),

    
	config = {
		app: 'source',
		dist: 'build',
		reload: browserSync.reload	
	},

	//loremIpsum = require('./app/partials/loremIpsum.json'),
    datafile = require(/*'./' + config.app + */'./source/hbs/partials/hbs-data.json');
//

// ##################################################
// ##################################################


// Gulp watch
gulp.task('watch', [/*'sass',*/ 'buildTemplates'/*, 'images', 'fonts', 'json', 'browserify'*/], function () {
	// Start localhost
	browserSync.init({
		server: {
			baseDir: config.dist,
			index: "/index.html"
		}
	});

	// // Watch sass
	// gulp.watch(config.app + '/sass/**/*.scss', ['sass']);
	
	// // Watch javascript
	// gulp.watch(config.app + '/js/**/*.js', ['browserify', 'json']);

	// Watch handlebars templates
	// OLD SOURCE: // gulp.watch([config.app + '/templates/**/*.html', config.app + '/partials/**/*.html'], ['buildTemplates'/*, 'images'*/]);
	//gulp.watch([config.app + '/source/hbs/**/*.html', config.app + '/partials/**/*.html'], ['buildTemplates'/*, 'images'*/]);
	gulp.watch([config.app + '/hbs/**/*.html', config.app + '/partials/**/*.html'], ['buildTemplates'/*, 'images'*/]);
});



// ##################################################
// Handlebars compiler
gulp.task('index', function () {
	gulp.src(config.app + '/hbs/index.css')
		.pipe(gulp.dest(config.dist + '/hbs'));

	// If running on windows, path indicators are different from unix (path\to  or  path/to)
	if (/^win/.test(process.platform)) {
		return gulp.src(config.dist + '/templates/sections/**/*.html')
			.pipe(index({
				'relativePath': config.app,
				'item-template': (filepath, filename) => '<li class="index__item"><a class="index__item-link" href="' + filepath.replace('..\\dist','') + '">' + filepath + '</a></li>',
			}))
			.pipe(gulp.dest('./build'));
	} else {
		return gulp.src(config.dist + '/templates/sections/**/*.html')
			.pipe(index({
				'prepend-to-output': () => '<head><title>TITLE OF PAGE</title><link rel="stylesheet" type="text/css" href="./templates/index.css"></head><body><div class="wrapper">',
				'append-to-output': () => '</div></body>',
				'title': 'Handlebars compiler',
				'title-template': (title) =>'<h1 class="index__title">Handlebars compiler</h1>',
				'pathDepth': 5,
				'section-template': (sectionContent) => '<section class="index__section">' + sectionContent + '</section>',
				'section-heading-template': (heading) => '<h2 class="index__section-heading" style="text-transform: capitalize;">' + heading.replace('../dist/templates/sections/', '') + '</h2>',
				'list-template': (listContent) => '<ul class="index__list">' + listContent + '</ul>',
				'item-template': (filepath, filename) => '<li class="index__item"><a class="index__item-link" href="./templates/' + filepath.replace('dist/', '') + '/' + filename + '">' + filename.replace('../dist/templates/', '') + '</a></li>',
				'relativePath': config.app,
				'outputFile': './index.html',
				'tab-depth': 0,
				'tab-string': '  '
			}))
			.pipe(gulp.dest('./build'));
	}
});


// ##################################################
// Handlebars compiler
gulp.task('handlebars', function () {
	var options = {
		batch : [
			'./source/hbs/partials',
			'./source/hbs/components',
			'./source/hbs/modules',
			'./source/hbs/sections'
		]
	};

	return gulp.src('./source/hbs/views/**/*.html')
		//.pipe(handlebars(loremIpsum, options))
		.pipe(handlebars(datafile, options))
		.pipe(gulp.dest('./build'))
		.pipe(config.reload({ stream: true }));
});


// ##################################################
// Handlebars compiler

gulp.task('buildTemplates', function () {
	runSequence('handlebars', 'index')
});

// ##################################################





// ##################################################

gulp.task('default', ['watch']);

// ##################################################
