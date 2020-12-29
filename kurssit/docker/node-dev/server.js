#!/usr/bin/env node

/* global process */

'use strict';

const express = require('express');
const app = express();
const os = require('os');
const PORT = process.env.NODE_PORT || 3000;

app.get('/hei', (req, res) => {
    res.set({'Content-Type': 'text/plain; charset=utf-8'});
    res.end(`Hei ${req.query.nimi}!`);
});

app.get('/palvelimen-nimi', (req, res) => {
    res.set({'Content-Type': 'text/plain; charset=utf-8'});
    res.end(`Hei palvelimelta ${os.hostname()}!`);
});

app.post('/x', (req, res) => {
    process.exit(1);
});

app.use((req, res) => {
    res.set({'Content-Type': 'text/html; charset=utf-8'});
    res.status(404);
    res.end(`<h2 style="color: red; background-color: yellow;">Palvelua ei ` +
            `löytynyt polussa ${req.path}.</h2>`);
});

app.listen(PORT, () => {
    console.log(`Sovellus vastaa portissa ${PORT}.`);
});