'use strict';

import { rm } from 'node:fs';
import { Readable } from 'node:stream';
import gulp from 'gulp';
import Vinyl from 'vinyl';

function clean(cb) {
    rm('dist/', {force: true, recursive: true}, cb);
}

function copyFiles() {
    return gulp.src('src/*').pipe(gulp.dest('dist/'));
}

function createFile() {
    let finished = false;
    const readableStream = new Readable({
        read: function (n) {
            if (!finished) {
                const vinyl = new Vinyl({
                    path: 'teksti2.txt',
                    contents: Buffer.from('Joka ei koodata osaa, ei sen syömänkään pidä!')
                });
                this.push(vinyl);
                finished = true;
            } else {
                this.push(null);
            }
        },
        objectMode: true
    });
    return readableStream.pipe(gulp.dest('dist/'));
}

export {clean};

export default gulp.series(clean, gulp.parallel(copyFiles, createFile));
