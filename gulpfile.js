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
            styles : 'source/assets/styles'

        },

        debug : 'build/debug',
        release : 'build/release'

    },

};

const gulp = require('gulp');
const argv = require('yargs').argv;
const del = require('del');

const plugins = require('gulp-load-plugins')();

/**
 * Copies the website favicon images.
 */
gulp.task('copy:favicons', function() {

    var outdir = argv.release ? refriger.path.release : refriger.path.debug;
    
    return gulp.src(refriger.path.source.favicons + '/*.{png,ico}', { base : refriger.path.source.root })
        .pipe(plugins.newer('test'))
        .pipe(plugins.if('**/favicon.ico', plugins.rename(function(path) { path.dirname = ''; })))
        .pipe(gulp.dest(outdir));

});

/**
 * The main Gulp task (by default).
 * 
 * Supports flags:
 *   --release: starts task for the release build. 
 */
gulp.task('default', function() {
   
}).on('start', function() {

    plugins.util.log("%s (%s)", refriger.title, refriger.website);
    plugins.util.log(refriger.copyright);
    plugins.util.log("\x1b[32m>>\x1b[0m Executing '\x1b[36m%s\x1b[0m' tasks:", argv.release ? "release" : "debug");    
 
}).on('stop', function() {

    plugins.util.log("\x1b[32m>>\x1b[0m Modified '\x1b[33m%s\x1b[0m' directory", argv.release ? refriger.path.release : refriger.path.debug);

});

/**
 * Cleans the selected build folder.
 */
gulp.task('build:clean', function() {

    var outdir = argv.release ? refriger.path.release : refriger.path.debug

    return del([outdir + '/**', '!' + outdir]);

}).on('task_stop', function() {

    plugins.util.log("\x1b[31mRemoved\x1b[0m content from '\x1b[33m%s\x1b[0m' directory", argv.release ? refriger.path.release : refriger.path.debug);

});
