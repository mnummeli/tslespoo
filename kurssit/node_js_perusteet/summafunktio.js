#!/usr/bin/env node

'use strict'

function summa(args) {
  let s=0;
  for(let arg of args) {
    console.log(arg);
    s += parseInt(arg, 10);
  }
  return s;
}

// Komentorivi
console.log(`Syöttämiesi lukujen summa on: ${summa(process.argv.slice(2))}`);

// Testi
console.log(`Lukujen 2 ja 3 summa on: ${summa([2,3])}`)
