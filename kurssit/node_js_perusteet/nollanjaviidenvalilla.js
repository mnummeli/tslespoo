#!/usr/bin/env node

'use strict'

const luku = parseInt(process.argv[2], 10);
if(luku >= 0 && luku <= 5) {
  console.log(`Syöttämäsi luku ${luku} on välillä 0-5.`);
} else {
  console.log(`Syöttämäsi luku ${luku} ei ole välillä 0-5.`)
}
