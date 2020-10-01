#!/usr/bin/env node

'use strict'

const luku = parseInt(process.argv[2], 10);

let i=0;
while(true) {
  if(i>luku) {
    break;
  }
  console.log(i);
  i++;
}
