import React, { Component } from 'react';
import MessageSend from './Conversation/MessageSend';
import MessageReceive from './Conversation/MessageReceive';
// import '../App.css';
// import './conv.css';
class Conversation extends Component {
    render() {
        return (
            <div className="middle-bar">
                <div className="conversation">
                    <div className="row heading no-gutters">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 ">
                            <div className="heading-avatar">
                                <div className="heading-avatar-icon">
                                    <img src="https://pbs.twimg.com/profile_images/1308525962859098114/SFa770Jq_400x400.jpg" alt="ava" />
                                </div>
                            </div>

                        </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 ">
                            <div className="heading-name">
                                <a className="heading-name-meta" href="/#">Zayn</a>
                                <span className="heading-online">Online</span>
                            </div>

                        </div>
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 ">
                            <div className="heading-dot pull-right">
                                <i className="fa fa-ellipsis-v fa-2x pull-right " aria-hidden="true"></i>

                            </div>
                        </div>
                    </div>

                    <div className="row message" id="conversation">
                        <div className="row message-previous">
                            <div className="col-sm-12 previous">
                                <a id="ankitjain28" name="20" href="/#">
                                    Show Previous Message!
                            </a>
                            </div>
                        </div>
                        <MessageReceive />
                        <MessageSend />
                        <MessageReceive />
                        <MessageSend />
                        <MessageReceive />
                        <MessageSend />
                        <MessageReceive />
                        <MessageSend />
                        <MessageReceive />
                        <MessageSend />
                        <MessageReceive />
                        <MessageSend />
                    </div>

                    <div className="row reply">
                        <div className="col-sm-1 col-xs-1 reply-emojis">
                            <i className="fas fa-smile-beam fa-2x"></i>
                        </div>
                        <div className="col-sm-1 col-xs-1 reply-recording">
                            <i className="fas fa-folder-open fa-2x" aria-hidden="true"></i>
                        </div>
                        <div className="col-sm-9 col-xs-9 reply-main">
                            <textarea className="txtConv form-control" rows="1" id="comment" placeholder="Aa" autoFocus></textarea>
                        </div>
                        <div className="col-sm-1 col-xs-1 reply-send">
                            <i className="fas fa-paper-plane fa-2x" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Conversation;
