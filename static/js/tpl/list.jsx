import React from 'react';
import ReactDOM from 'react-dom';

import Message from './message.jsx';

export default function MessageList (props) {
    const messages = props.messages;
    const listItems = messages.map((msg, index) => <Message key={index} msg={msg} />);

    return (
        <div>
            {listItems}
        </div>
    );
};
