#!/usr/bin/env node

'use strict';

function tulo(z1, z2) {
    return [z1[0] * z2[0] - z1[1] * z2[1],
        z1[0] * z2[1] + z1[1] * z2[0]];
}

function osamaara(z1, z2) {
    const mod2 = z2[0] * z2[0] + z2[1] * z2[1];
    return [(z1[0] * z2[0] + z1[1] * z2[1]) / mod2,
        (-z1[0] * z2[1] + z1[1] * z2[0]) / mod2];
}

module.exports = {tulo, osamaara};