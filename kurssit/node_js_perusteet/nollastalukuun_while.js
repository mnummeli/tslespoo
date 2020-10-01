#!/usr/bin/env node

'use strict'

const luku = parseInt(process.argv[2], 10);

let i=0;
while(i<=luku) {
  console.log(i);
  i++;
}
