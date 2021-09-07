/* global fileupload */

function main() {
    fileupload.onsubmit = e => {
        e.preventDefault();
    };
}

window.onload = main;