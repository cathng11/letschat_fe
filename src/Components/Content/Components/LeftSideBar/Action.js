import React, { Component } from 'react'

class Action extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: 'ListMessages'
        }
    }
    onClick = (list) => {
        this.props.onShowList(list);
    }
    render() {
        return (
            <div className="row container side-button-list no-gutters">
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <button 
                        className="side-button btn blue-gradient"
                        onClick={() => this.onClick('ListMessages')}
                    >
                        <span className="fas fa-bell side-button-icon" aria-hidden="true"></span>Chats</button>
                </div>
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <button 
                    className="side-button btn"
                    onClick={() => this.onClick('ListGroup')}
                    >
                        <span className="fas fa-user-friends side-button-icon" aria-hidden="true"></span>GroupChat</button>
                </div>
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <button 
                    className="side-button btn blue-gradient" 
                    onClick={() => this.onClick('ListContact')}
                    >
                        <span className="fas fa-address-book side-button-icon"aria-hidden="true"></span>Contacts</button>
                </div>
            </div>
        )
    }
}

export default Action
