/**
 * Copyright © 2017 Aleksey Grigoriev <aggpys@live.com>. All rights reserved.
 * Licensed under the MIT License. See LICENSE file for full license information.
 */

'use strict';

// Defines the project and files organization structure configuration.
const refriger = {
    
    title : 'Refriger Project',
    website : 'http://www.refriger.ru',
    copyright : 'Copyright © 2017 Aleksey Grigoriev <aggpys@live.com>',

    path : {

        source : {

            root : 'source',
            assets : 'source/assets',
            images : 'source/assets/images',
            favicons : 'source/assets/favicons',
            scripts : 'source/assets/scripts',
            styles : 'source/assets/styles',
            fonts : 'source/assets/fonts'

        },

        debug : 'build/debug',
        release : 'build/release'

    },

};

const gulp = require('gulp');
const chalk = require('chalk');
const argv = require('yargs').argv;
const del = require('del');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const cssimport = require('postcss-import');

const plugins = require('gulp-load-plugins')();

/**
 * Copies the website favicon images.
 * Copies a 'favicon.ico' file to the build root directory.
 */
gulp.task('copy:favicons', function() {

    return gulp.src(refriger.path.source.favicons + '/*.{png,ico}', { base : refriger.path.source.root })
        .pipe(plugins.newer(gulp.outdir))
        .pipe(plugins.if('**/favicon.ico', plugins.rename(function(path) { path.dirname = ''; })))
        .pipe(gulp.dest(gulp.outdir));

});

/**
 * Copies raster and vector graphics using the lossless compression.
 */
gulp.task('copy:images', function() {

    return gulp.src(refriger.path.source.images + '/*.{png,jpg,svg}', { base : refriger.path.source.root })
        .pipe(plugins.newer(gulp.outdir))
        .pipe(plugins.imagemin([
            plugins.imagemin.jpegtran(), 
            plugins.imagemin.optipng(), 
            plugins.imagemin.svgo()]))
        .pipe(gulp.dest(gulp.outdir));

});

/**
 * Copies vendor CSS, JavaScript, fonts files and the other static data.
 */
gulp.task('copy:misc', function() {

    return gulp.src([
        refriger.path.source.root + '/*.{html,xml,txt}', 
        refriger.path.source.fonts + '/*.{ttf,eot,woff,woff2,svg}',
        refriger.path.source.styles + '/*.min.css',
        refriger.path.source.scripts + '/*.min.js'], { base : refriger.path.source.root })
        .pipe(plugins.newer(gulp.outdir))
        .pipe(gulp.dest(gulp.outdir));

})

/**
 * Bundles website CSS. Generates source maps for the debug build.
 */
gulp.task('bundle:css', function() {

    return gulp.src(refriger.path.source.styles + '/default.css', { base : refriger.path.source.root })
        .pipe(plugins.if(gulp.debug, plugins.sourcemaps.init()))
        .pipe(plugins.postcss([cssimport, autoprefixer, cssnano]))
        .pipe(plugins.if(gulp.debug, plugins.sourcemaps.write()))
        .pipe(gulp.dest(gulp.outdir));

});

/**
 * The main Gulp task (by default).
 * 
 * Supports flags:
 *   --release: starts task for the release build. 
 */
gulp.task('default', function() {
    
    plugins.util.log("%s (%s)", refriger.title, refriger.website);
    plugins.util.log(refriger.copyright);
    plugins.util.log(chalk.green('Executing') + " '" + chalk.grey("%s") + "' tasks:", argv.release ? "release" : "debug"); 

    return gulp.start(['copy:misc', 'copy:images', 'copy:favicons', 'bundle:css']);

}).on('start', function() {

    gulp.outdir = argv.release ? refriger.path.release : refriger.path.debug;
    gulp.debug = !argv.release;  
 
}).on('stop', function() {

    plugins.util.log(chalk.green('Modified') + " '" + chalk.yellow("%s") + "' directory", gulp.outdir);

});

/**
 * Cleans the selected build folder.
 */
gulp.task('build:clean', function() {

    return del([gulp.outdir + '/**', '!' + gulp.outdir]).then(function(deleted) {

        plugins.util.log(chalk.red('Removed') + " total " + chalk.red('%s') + " elements", deleted.length);
    
    });

});