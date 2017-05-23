/**
 * Copyright © 2017 «АиТ» Co., Ltd. All rights reserved.
 * Licensed under the MIT License. See LICENSE file for full license information.
 */

'use strict';

const refriger = {
    
    title : 'Refriger Project',
    website : 'http://www.refriger.ru',
    copyright : 'Copyright © 2017 «АиТ» Co., Ltd.',

    path : {

        source : 'src',
        debug : 'build/debug',
        release : 'build/release'

    }

};

const gulp = require('gulp');
const argv = require('yargs').argv;

/**
 * The main Gulp task (by default).
 * 
 * Supports flags:
 *   --release: starts task for the release build. 
 */
gulp.task('default', function(){
   
}).on('start', function() {

    console.log("\n%s (%s)\n%s\n", refriger.title, refriger.website, refriger.copyright);
    console.log("    \x1b[32m>>\x1b[0m     Executing '\x1b[36m%s\x1b[0m' tasks...", argv.release ? "release" : "debug");    
 
}).on('stop', function() {

    console.log("    \x1b[32m>>\x1b[0m     Modified '\x1b[33m%s\x1b[0m' directory\n", argv.release ? refriger.path.release : refriger.path.debug);

});
