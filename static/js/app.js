import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import Preview from './tpl/preview.jsx';
import MessageForm from './components/messageForm.js';
import configureStore from './store/chat.js';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <MessageForm />
    </Provider>,
    document.getElementById('js-form-wrapper')
);
