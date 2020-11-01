#!/usr/bin/env node

'use strict';

/* global process, __dirname */

const express = require('express');
const app = express();
const format = require('date-format');
const os = require('os');
const path = require('path');

const PORT = process.env.EXPRESS_PORT || 3000;

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
    const ts = new Date();
    res.render('index', {
        title: "Palvelimen tiedot",
        hostname: os.hostname(),
        method: req.method,
        path: req.path,
        current_date: format('dd.MM.yyyy', ts),
        current_time: format('hh:mm:ss', ts)
    });
});

app.listen(PORT, () => {
    console.log(`Sovellus vastaa portissa ${PORT}.`);
});