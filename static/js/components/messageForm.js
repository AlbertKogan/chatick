import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { typeMessage, sendMessage, recieveMessage } from './../actions/message.js';
import MessageList from './../tpl/list.jsx';
import Preview from './../tpl/preview.jsx';
import { MESSAGE_TYPE } from './../constants.js';


export default class MessageForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            name: 'DEMO NAME'
        };

        this.messages = [];

        this.inputMessage = this.inputMessage.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
    }

    componentWillMount () {
        this.processMessage();
    }

    inputMessage (e) {
        let message = e.target.value;

        this.setState({
            message: message
        });

        typeMessage({
            type: MESSAGE_TYPE.PREVIEW,
            name: this.state.name,
            msg: message
        });
    };

    submitMessage (e) {
        e.preventDefault();

        const form = e.currentTarget;
        let self = this;

        sendMessage({
            method: form.getAttribute('type'),
            url: form.getAttribute('action'),
            data: {
                type: MESSAGE_TYPE.MESSAGE,
                name: this.state.name,
                msg: this.state.message
            }
        }, (error) => {
            console.log(error);
        });
    };

    processMessage () {
        let self = this;

        recieveMessage((data) => {
            if (data.type === MESSAGE_TYPE.MESSAGE) {
                self.messages.push(data);
                self.renderMessages();
            } else if (data.type === MESSAGE_TYPE.PREVIEW) {
                self.renderPreview(data);
            }
        });
    }

    renderPreview (data) {
        ReactDOM.render(
            <Preview msg={data} />,
            document.getElementById('js-preview-wrapper')
        );
    }

    renderMessages () {
        ReactDOM.render(
            <MessageList messages={this.messages} />,
            document.getElementById('js-messages-wrapper')
        );
    }

    render (props) {
        return (
            <form className="js-message-form" action="/api/message" type="POST" onSubmit={this.submitMessage}>
                <div>
                    <textarea required className="js-message-input" name="message" onChange={this.inputMessage}></textarea>
                </div>

                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        );
    }
};
