#!/usr/bin/env node

'use strict';

const app = require('express')();
const format = require('date-format');
const os = require('os');

app.use((req, res) => {
    const ts = new Date();
    res.json({
        'Palvelimen nimi': os.hostname(),
        'Metodi': req.method,
        'Polku': req.path,
        'Päivämäärä': format('dd.MM.yyyy', ts),
        'Kellonaika': format('hh:mm:ss', ts)
    });
});

app.listen(3000);