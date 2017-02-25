import React from 'react';
import ReactDOM from 'react-dom';

export default function Preview (props) {
    return (
        <div>
            <div>
                <span>{props.msg.name}</span>
                <span>&nbsp;пишет:</span>
                <span>{props.msg.msg}</span>
            </div>
        </div>
    );
};
