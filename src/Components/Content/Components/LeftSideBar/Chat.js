import React, { Component } from 'react'

class Chat extends Component {
    render() {
        return (
            <div>
                <button className="side-button btn btn-primary blue-gradient">
                    <span className="fas fa-bell side-button-icon" aria-hidden="true"></span>Chats</button>
            </div>
        )
    }
}

export default Chat
