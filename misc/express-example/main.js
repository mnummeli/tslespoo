#!/usr/bin/env node

'use strict';

import express from 'express'

const PORT = process.env.PORT || 3000;

(function() {
    let count = 0;
    const app = express();

    // Hello JSON
    app.get('/rs/hello', (req, res) => {
	res.json({
	    id: count++,
	    name: `Hello ${req.query.name || 'World'}!`
	});
    });

    // Static files
    app.use('/', express.static('static'));
    
    app.listen(PORT, () => {
	console.log(`Application listening on port ${PORT}`);
    });
})();
