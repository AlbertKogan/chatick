import React from 'react';
import ReactDOM from 'react-dom';

export default function Message (props) {
    return (
        <div>
            <div>
                <span>Написал(а): </span>
                <span>{props.msg.name}</span>
            </div>
            <div>
                {props.msg.msg}
            </div>
        </div>
    );
};
