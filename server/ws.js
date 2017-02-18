const uws = require('uws');

const wss = new uws.Server({
    port: process.env.SOCKET_SERVER_PORT
});

let connections = [];

function onMessage (message) {
    connections.map((wss) => {
        wss.send(message);
    });
}

/**
 * WebSocket initialization
 */
wss.on('connection', function (ws) {
    connections.push(ws);
    ws.on('message', onMessage);
});

module.exports = {
    onMessage: onMessage
}
