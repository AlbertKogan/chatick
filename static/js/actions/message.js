import axios from 'axios';

import Socket from './ws.js';

export const SUBMIT_MESSAGE = 'SUBMIT_MESSAGE';
export const TYPE_MESSAGE = 'TYPE_MESSAGE';
export const RECIEVE_MESSAGE = 'RECIEVE_MESSAGE';


export submitMessage (url, data) => {
    const request = axios({
        method: 'post',
        url: url,
        data: data
    });

    return {
        type: SUBMIT_MESSAGE,
        payload: request
    };
};

export typeMessage () => {

};

export recieveMessage () => {

};

Socket.onmessage = function (event) {
    let data = JSON.parse(event.data);
    console.log(data.type);
    console.log('MessageForm.messages', MessageForm);

    // TODO: refactor this
    if (data.type = 'message') {
        MessageForm.messages.push(data);
        MessageForm.renderMessages();
    } else if (data.type = 'preview') {
        let element = document.getElementById('js-preview-wrapper');

        ReactDOM.render(
            <Preview msg={data} />,
            element
        );
    }
};
