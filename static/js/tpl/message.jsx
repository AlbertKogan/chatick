import React from 'react';
import ReactDOM from 'react-dom';

export default function Message (props) {
    let style = {
        marginBottom: 20,
        border: '1px solid grey',
        padding: 5
    };

    return (
        <div style={style}>
            <div>{props.msg.name}</div>
            <div>{props.msg.date}</div>
            <div>{props.msg.msg}</div>
        </div>
    );
};
