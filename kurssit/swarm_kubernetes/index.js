#!/usr/bin/env node

'use strict';

/* global process */

const PORT = process.env.EXPRESS_PORT || 3000;

import format from 'date-format';
import express from 'express';
import os from 'os';

const app = express();
let visits = 0;

function handleRequest(_req, res) {
	const ts = new Date();
	return res.json({
		"hostname": os.hostname(),
		"time": format('dd.MM.yyyy hh:mm:ss', ts),
		"visits": ++visits
	});
}

function appInfo() {
	console.log(`Sovellus vastaa osoitteessa ` +
		`http://${os.hostname()}:${PORT}`);
}

function appExit() {
	console.log(`\nHei hei ...`);
	process.exit(0);
}

process.on('SIGINT', appExit);
process.on('SIGTERM', appExit);

app.use(handleRequest);
app.listen(PORT, appInfo);