'use strict';

const taustaVarit = ['red', 'orange', 'yellow', 'green', 'blue', 'magenta'];
const tekstiVarit = ['white', 'black', 'black', 'white', 'white', 'white'];
let i = 0;
const nelio = document.getElementById('nelio');
const lomake = document.getElementById('lomake');
const polku = document.getElementById('polku');

function vaihdaVari() {
  nelio.style.backgroundColor = taustaVarit[i];
  nelio.style.color = tekstiVarit[i];
  nelio.innerHTML = `<p>${i}</p>`;
  polku.innerHTML = window.location.pathname;
  i = (i + 1) % taustaVarit.length;
}

lomake.addEventListener('submit', function(e) {
  e.preventDefault();
  vaihdaVari();
});

vaihdaVari();