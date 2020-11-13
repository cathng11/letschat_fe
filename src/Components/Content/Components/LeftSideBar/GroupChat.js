import React, { Component } from 'react'

export class GroupChat extends Component {
    render() {
        return (
            <div>
                <button className="side-button btn ">
                    <span className="fas fa-user-friends side-button-icon" aria-hidden="true"></span>Groups</button>
            </div>
        )
    }
}

export default GroupChat
