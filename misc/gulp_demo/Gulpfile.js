'use strict';

import { rm } from 'node:fs';
import gulp from 'gulp';

function clean(cb) {
    rm('dist/', {force: true, recursive: true}, cb);
}

function copyFiles() {
    return gulp.src('src/*').pipe(gulp.dest('dist/'));
}

function createFile(cb) {
    cb();
}

export {clean};

export default gulp.series(clean, gulp.parallel(copyFiles, createFile));
