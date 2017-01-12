const path = require('path');
const url = require('url');
const env = require('dotenv');

/**
 * Enviroment variables initialization
 */
env.config();

let STATIC_URL;

if (process.env.DEV) {
    STATIC_URL = url.format({
        hostname: process.env.DEV_HOST,
        port: process.env.DEV_STATIC_PORT,
        pathname: '/static_compiled'
    });
} else {
    STATIC_URL = '/static';
}

module.exports = {
    TEMPLATE_DIR: path.resolve('./templates'),
    STATIC_URL: STATIC_URL
};
