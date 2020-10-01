#!/usr/bin/env node

'use strict';

let taulukko = [];

for(let i=0;i<30;i++) {
    taulukko.push(i);
}

let taulukko2 = taulukko.map(x => {
    return x*2;
});

console.log(JSON.stringify(taulukko2));

let taulukko3 = taulukko2.filter(x => {
    return x % 3 !== 0;
});

console.log(JSON.stringify(taulukko3));

let taulukko4 = taulukko3.sort((x, y) => {
    return y-x;
});

console.log(JSON.stringify(taulukko4));