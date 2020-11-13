import React, { Component } from 'react';

class MessageReceive extends Component {
    render() {
        return (
            <div className="row message-body">
                <div className="col-sm-12 message-main-receiver">
                    <div className="receiver ">
                        <div className="message-text">
                            Hi
                        </div>
                        <span className="message-time pull-right">Sun</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default MessageReceive;