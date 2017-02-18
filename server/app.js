'use strict';

const http = require('http');
const net = require('net');
const path = require('path');

const koa = require('koa');
const koaBody = require('koa-body')();
const logger = require('koa-logger');
const router = require('koa-router')();
const hbs = require('koa-hbs');
const send = require('koa-send');
const redis = require('ioredis');
const moment = require('moment');

const settings = require(path.resolve('./server/settings.js'));
const wssApp = require(path.resolve('./server/ws.js'));

const app = koa();
const httpServer = http.Server(app.callback());
const redisClient = redis();


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

router.get('/chat/:id', function *(next) {
    let chatId = this.params.id;
    let isChat = redisClient.exists(chatId);
    let chatData;

    if (isChat) {
        chatData = yield redisClient.get(chatId);
    } else {
        redisClient.set(chatId, "DATA", redis.print);
    }

    yield this.render('index', {
        STATIC_URL: settings.STATIC_URL,
        chatData: chatData
    });
});

router.post('/api/message', koaBody, function *(next) {
    let data = this.request.body;

    data.date = moment.utc().format();

    let msg = JSON.stringify(data);

    wssApp.onMessage(msg);
    this.body = msg;
});

/**
 * Initialization router middleware
 */
app.use(router.routes());

app.listen(3000);
