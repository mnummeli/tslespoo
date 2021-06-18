#!/usr/bin/env node

/* global process */

'use strict';

const express = require('express');
const app = express();
const PORT = process.env.NODE_PORT | 3000;

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/kissat', (req, res) => {
    res.json([
        {name: 'Pekka Töpöhäntä'},
        {name: 'Monni'},
        {name: 'Pilli'},
        {name: 'Pulla'}
    ]);
});

app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}.`);
});
