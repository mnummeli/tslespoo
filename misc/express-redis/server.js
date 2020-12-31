#!/usr/bin/env node

'use strict';

/* global process, __dirname */

const express = require('express');
const app = express();
const format = require('date-format');
const os = require('os');
const path = require('path');
const bunyan = require('bunyan');
const logger = bunyan.createLogger({name: 'server'});

const {getRedisClient} = require('./redisService,js');

const PORT = process.env.EXPRESS_PORT || 3000;

logger.info(`Application starting on server ${os.hostname()}.`);

app.set('view engine', 'pug');

app.post('/crash', () => {
    logger.fatal(`Application is going to crash on server ${os.hostname()}: ${new Error('Bang')}`);
    process.exit(1);
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res) => {
    const redisClient = await getRedisClient();
    logger.info(`Received ${req.method} request to path ${req.path} on server ${os.hostname()} .`);
    const ts = new Date();
    redisClient.incr('visits', (er, visits) => {
        if (er) {
            logger.warn(`Redis returned error: ${er.message}`);
        }
        logger.info(`Redis returned: ${visits} visits.`);
        res.render('index', {
            title: "Palvelimen tiedot",
            hostname: os.hostname(),
            method: req.method,
            path: req.path,
            current_date: format('dd.MM.yyyy', ts),
            current_time: format('hh:mm:ss', ts),
            visits: visits
        });
    });
});

app.listen(PORT, () => {
    logger.info(`Application responds in http://${os.hostname()}:${PORT}/ .`);
});