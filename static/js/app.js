import React from 'react';
import ReactDOM from 'react-dom';

import Message from './tpl/message.jsx';

const socket = new WebSocket('ws://localhost:3001');

socket.onmessage = function (event) {
    let data = JSON.parse(event.data),
        element = document.getElementById('js-messages-wrapper');

    ReactDOM.render(
        <Message msg={data} />,
        element
    );
};

let messageInput = document.querySelector('.js-message-input');

messageInput.addEventListener('input', function (e) {
    socket.send(JSON.stringify({
        name: 'DEMO NAME',
        msg: e.target.value
    }));
});
