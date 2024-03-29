#!/usr/bin/env node

'use strict';

/* global __dirname, system, process */

const express = require('express');
const app = express();
const os = require('os');
const bunyan = require('bunyan');
const path = require('path');
const logger = bunyan.createLogger({name: 'server'});

const PORT = process.env.EXPRESS_PORT || 3000;

function trivial(req, res) {
    logger.info(`${req.method} ${req.path}`);
    if (req.method === 'DELETE') {
        logger.info('Exiting ...');
        system.exit(-1);
    }
    res.header('Content-Type', 'text/html');
    res.end(`<h1>Hei palvelimelta: ${os.hostname}</h1>`);
}

app.use('/trivial', trivial);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    logger.info(`Application responds in http://${os.hostname()}:${PORT}/ .`);
});