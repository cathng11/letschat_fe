import React, { Component } from 'react'
import tempAvatar from '../../../../../ava.jpg'

export class Contact extends Component {
    onShowInfo = () => {
        this.props.onShowInfo(this.props.listContact.Username)
    }
    loadDefaultImage = (e) => {
        e.target.src = tempAvatar;
    }
    render() {
        var { listContact } = this.props;
        return (
            <div className="contact"
                
                onClick={this.onShowInfo}
                >
                <img
                    src={"data:image/*;base64," + listContact.Avatar.data}
                    className="img-responsive avatar"
                    onError={this.loadDefaultImage}
                    alt="img" />
                <div>
                    <span className="name-receiver">{listContact.Firstname === '' ? listContact.Username : listContact.Firstname+" "+listContact.Lastname}</span>
                </div>
            </div>
        )
    }
}

export default Contact
