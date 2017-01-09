(function () {
    const socket = new WebSocket('ws://localhost:3001');

    socket.onopen = function (event) {
        // send a message to the server
        socket.send('Hello server!');
    };

    socket.onmessage = function (event) {
    // print message from server
        console.log('recieved: ', event.data);
    };

    let messageInput = document.querySelector('.js-message-input');

    messageInput.addEventListener('input', function (e) {
        socket.send(e.target.value);
    });
})();
