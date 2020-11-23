#!/usr/bin/env node

'use strict';

/* global process */

const express = require('express');
const app = express();
const os = require('os');
const bunyan = require('bunyan');
const logger = bunyan.createLogger({name: 'server'});

const PORT = process.env.EXPRESS_PORT || 3000;

function trivial(req, res) {
    logger.info(`${req.method} ${req.path}`);
    res.header('Content-Type', 'text/html');
    res.end(`<h1>Hei palvelimelta: ${os.hostname}</h1>`);
}

app.use(trivial);

app.listen(PORT, () => {
    logger.info(`Application responds in http://${os.hostname()}:${PORT}/ .`);
});