'use strict';

const TITLE = 'Express-esimerkki';

function main() {
    document.title = TITLE;
    document.getElementById('heading').innerHTML = TITLE;
}

window.onload = main;
