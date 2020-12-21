import React, { Component } from 'react'
import tempAvatar from '../../../../../ava.jpg'
export class Message extends Component {
    onShowInfo = () => {
        this.props.onShowInfo(this.props.listMessages.Username)
    }
    loadDefaultImage = (e) => {
        e.target.src = tempAvatar;
    }
    render() {
        var { listMessages, username } = this.props;
        return (
            <div>
                <div className="chat-message" onClick={this.onShowInfo}>
                    <img
                        src={"data:image/*;base64," + listMessages.Avatar.data}
                        className="img-responsive avatar"
                        onError={this.loadDefaultImage}
                        alt="img" />
                    <div>
                        <span className="name-receiver">{listMessages.Firstname}</span>
                        <span className="side-message">
                            {username === listMessages.ID_Sender ? "You: " : `${listMessages.Firstname}: `}{listMessages.Message}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Message
