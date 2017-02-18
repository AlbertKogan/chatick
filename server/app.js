'use strict';

const http = require('http');
const net = require('net');
const path = require('path');

const koa = require('koa');
const logger = require('koa-logger');
const router = require('koa-router')();
const hbs = require('koa-hbs');
const send = require('koa-send');

const settings = require(path.resolve('./server/settings.js'));
const wssApp = require(path.resolve('./server/ws.js'));

const app = koa();
const httpServer = http.Server(app.callback());


app.use(logger());

/**
 * Set template engine middleware
 */
app.use(hbs.middleware({
    viewPath: settings.TEMPLATE_DIR
}));

/**
 * Server static files in /static path
 */
router.get(/^\/static(?:\/|$)/, function *(next) {
    let staticPath = this.path ? this.path.replace('/static/', '/static_compiled/') : '';

    yield send(this, path.resolve(staticPath));
});

/**
 * Index page
 */
router.get('/', function *(next) {
    yield this.render('index', {
        STATIC_URL: settings.STATIC_URL
    });
});

/**
 * Initialization router middleware
 */
app.use(router.routes());

app.listen(process.env.PORT || 3000);
