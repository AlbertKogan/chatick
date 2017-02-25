import axios from 'axios';

import Socket from './../ws.js';
import {
    SUBMIT_MESSAGE,
    MESSAGE_TYPE,
    TYPE_MESSAGE,
    RECIEVE_MESSAGE
} from './../constants.js';


export const sendMessage = (requestBody, errorHandler) => {
    // Ответ приходит и обрабатывается через web socket
    const request = axios(requestBody).catch(errorHandler);

    return {
        type: SUBMIT_MESSAGE,
        payload: request
    };
};

export const typeMessage = data => {
    let message = JSON.stringify(data);

    Socket.send(message);

    return {
        type: TYPE_MESSAGE,
        payload: message
    }
};

export const recieveMessage = handler => {
    Socket.onmessage = (event) => {
        let data = JSON.parse(event.data);

        handler(data);

        return {
            type: RECIEVE_MESSAGE,
            payload: data
        };
    };
};
