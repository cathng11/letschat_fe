import React, { Component } from 'react'

export class Contact extends Component {
    render() {
        return (
            <div>
                <button className="side-button btn btn-primary blue-gradient">
                    <span className="fas fa-address-book side-button-icon" aria-hidden="true"></span>Contacts</button>
            </div>
        )
    }
}

export default Contact
