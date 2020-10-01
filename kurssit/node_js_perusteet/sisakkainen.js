#!/usr/bin/env node

'use strict'

const luku = parseInt(process.argv[2], 10);

for(let i=0; i<luku; i++) {
  for(let j=0; j<luku; j++) {
    if(i==j || i==luku-j-1) { // MUOKKAA TÄTÄ
      process.stdout.write('#');
    } else {
      process.stdout.write(' ');
    }
  }
  console.log();
}
