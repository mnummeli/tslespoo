#!/usr/bin/env node

'use strict';

/* global process */

const redis = require('redis');

const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

function getRedisClient() {
    return new Promise((Y, N) => {
        const redisClient = redis.createClient({
            host: REDIS_HOST,
            port: REDIS_PORT
        });
        redisClient.on('error', er => {
            return N(er);
        });
    });
}