'use strict';

const http = require('http');
const net = require('net');
const path = require('path');

const koa = require('koa');
const logger = require('koa-logger');
const router = require('koa-router')();
const hbs = require('koa-hbs');
const send = require('koa-send');
const uws = require('uws');

// TODO: module resolver?
const devSettings = require(path.resolve('./server/settings/dev.js'));

const app = koa();
const httpServer = http.Server(app.callback());
const wss = new uws.Server({
    port: 3001
});

app.use(logger());

app.use(hbs.middleware({
    viewPath: devSettings.TEMPLATE_DIR
}));

/**
Serve static
*/
router.get(/^\/static(?:\/|$)/, function *(next) {
    let staticPath = this.path ? this.path.replace('/static/', '/static_compiled/') : '';

    yield send(this, path.resolve(staticPath));
});

router.get('/', function *(next) {
    yield this.render('index', {
        // TODO: Add initial render data
    });
});

app.use(router.routes());

function onMessage (message) {
    this.send(message);
}

wss.on('connection', function(ws) {
    ws.on('message', onMessage);
    ws.send('Connection succesfull!');
});

app.listen(3000);
