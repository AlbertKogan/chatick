import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
// DRAFT
import axios from 'axios';

import Socket from './../actions/ws.js';
import MessageList from './../tpl/list.jsx';


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

    inputMessage (e) {
        let message = e.target.value;

        this.setState({
            message: message
        });

        Socket.send(JSON.stringify({
            type: 'preview',
            name: this.state.name,
            msg: message
        }));
    };

    submitMessage (e) {
        e.preventDefault();

        const form = e.currentTarget;
        let self = this;

        axios({
            method: form.getAttribute('type'),
            url: form.getAttribute('action'),
            data: {
                type: 'message',
                name: this.state.name,
                msg: this.state.message
            }
        }).then(function (response) {
            self.messages.push(response.data);
            self.renderMessages();
        }).catch(function (error) {
            console.log(error);
        });
    };

    renderMessages () {
        ReactDOM.render(
            <MessageList messages={self.messages} />,
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
