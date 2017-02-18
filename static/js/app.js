import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import Preview from './tpl/preview.jsx';
import MessageForm from './components/messageForm.js';
import Socket from './actions/ws.js';
import configureStore from './store/chat.js';

const store = configureStore();

let formWrapper = document.getElementById('js-form-wrapper');

ReactDOM.render(
    <MessageForm />,
    formWrapper
);
