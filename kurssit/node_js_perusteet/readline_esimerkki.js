#!/usr/bin/env node

/* global process */

'use strict';

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let sum = 0;

// rl on tietovuo, josta kuuntelemme tapahtumia line ja close
rl.on('line', line => {
    // Yritetään muuntaa syöte merkkijonosta desimaaliluvuksi
    const num = parseInt(line, 10);
    if (num < 0) {
        // Jos on syötetty negatiivinen luku, suljemme vuon
        rl.close();
    } else if (num >= 0) {
        // Ei-negatiiviset luvut lisätään summaan, muut kuin numerot hylätään
        sum += num;
    }
}).on('close', () => {
    // Sulkemisen jälkeen suoritetaan tämä koodilohko
    console.log(`Syöttämiesi lukujen summa on: ${sum}`);
});