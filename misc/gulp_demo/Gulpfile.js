'use strict';

import { rm } from 'node:fs';
import { Readable, Writable, Transform, Duplex } from 'node:stream';
import gulp from 'gulp';
import Vinyl from 'vinyl';

function clean(cb) {
    rm('dist/', {force: true, recursive: true}, cb);
}

function copyFiles() {
    return gulp.src('src/teksti1.txt')
            .pipe(gulp.dest('dist/'));
}

function createFile() {
    let finished = false;
    const readableStream = new Readable({
        read: function () {
            if (!finished) {
                const vinyl = new Vinyl({
                    path: 'teksti2.txt',
                    contents: Buffer.from('-----\r\nJoka ei koodata osaa, ei sen syömänkään pidä!\r\n-----\r\n')
                });
                this.push(vinyl);
                finished = true;
            } else {
                this.push(null);
            }
        },
        objectMode: true
    });
    return readableStream
            .pipe(gulp.dest('dist/'));
}

function consumeFiles() {
    const writableStream = new Writable({
        write: function (chunk, encoding, cb) {
            console.log(`Chunk type: ${typeof chunk}`);
            console.log(`Chunk constructor: ${chunk.constructor.name}`);
            console.log(`Path: ${chunk.path}`);
            console.log(`Contents: ${chunk.contents.toString()}`);
            console.log('-----');
            cb();
        },
        objectMode: true
    });
    return gulp.src('src/*')
            .pipe(writableStream);
}

function reverseFiles() {
    const transformStream = new Transform({
        transform: function (data, encoding, cb) {
            const reversedString = data.contents
                    .toString().split('').reverse().join('');
            const reversedData = new Vinyl({
                path: data.relative,
                contents: Buffer.from(reversedString)
            });
            cb(null, reversedData);
        },
        objectMode: true
    });
    return gulp.src('src/teksti{3,4}.txt')
            .pipe(transformStream)
            .pipe(gulp.dest('dist/'));
}

function concatFiles() {
    let concatenatedContent = '';
    const duplexStream = new Duplex({
        read: function () {
            // luo Vinyl-tiedoston, syötetään katenoitu tiedosto ja suljetaan seuraavalla lukukerralla
        },
        write: function (chunk, encoding, cb) {
            // hakee tiedostot sisään yksi kerrallaan, katenoidaan concatenatedContent:iin
        },
        objectMode: true
    });
    return gulp.src('src/teksti*.txt')
            .pipe(duplexStream)
            .pipe(gulp.dest('dist/'));
}

export { clean };

export default gulp.series(clean, gulp.parallel(copyFiles, createFile,
        consumeFiles, reverseFiles));
