#!/usr/bin/env node

'use strict';

const {tulo, osamaara} = require('./kompleksiluvut.js');

console.log(tulo([2,0], [3,0]));
console.log(tulo([2,1], [2,-1]));
console.log(tulo([3,0], [3,-1]));
console.log(tulo([2,2], [2,2]));

console.log(osamaara([-1,5],[2,3]));
console.log(osamaara([0,1],[1,1]));