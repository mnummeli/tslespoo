#!/usr/bin/env node

'use strict';

const {Readable} = require('stream');

function getStream() {
    return new Readable({
        read(size) {
            setTimeout(() => {
                this.push('TSL');
                this.push(null);
            }, 4000);
        }
    });
}

/*
getStream()
        .setEncoding("utf8")
        .on("data", data => {
            console.log(data);
        }).on("end", () => {
    console.log("blah");
});
 */

module.exports = {
    default: getStream
};