import React, { Component } from 'react'
import tempAvatar from '../../../../../../ava.jpg'

export class Contact extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            currentColor:"white",
        }
    }
    addMember=()=>
    {
        if(this.props.newGrChat)
        {
            this.props.addMember(this.props.contact.Username)
            this.setState({
                currentColor:"#d0d6e2"
            })
        }
        else
        {
            this.props.openChatRoom(this.props.contact.Username);
        }

    }
    removeMember=()=>
    {
        this.props.removeMember(this.props.contact.Username)
        this.setState({
            currentColor:"white"
        })
    }
    loadDefaultImage = (e) => {
        e.target.src = tempAvatar;
    }
    render() {
        var {contact}=this.props;
        var {newGrChat}=this.props;
        if(newGrChat)
        {
            return (
                <div className="contact create-new"
                    style={{backgroundColor: this.state.currentColor}}
                    onClick={this.addMember}
                    data-dismiss={this.state.dataDismiss}
                    onDoubleClick={this.removeMember}>
                    <img
                        src={"data:image/*;base64,"+contact.Avatar.data}
                        className="img-responsive avatar"
                        onError={this.loadDefaultImage}
                        alt="img" />
                    <div>
                        <span className="username-receiver">{contact.Username}</span>
                        <span className="fullname-receiver grey-text">{contact.Firstname+" "+contact.Lastname}</span>
                    </div>
                </div>
            )
        }
        else
        {
            return (
                <div className="contact create-new"
                    style={{backgroundColor: this.state.currentColor}}
                    onClick={this.addMember}
                    data-dismiss="modal">
                    <img
                        src={"data:image/*;base64,"+contact.Avatar.data}
                        className="img-responsive avatar"
                        onError={this.loadDefaultImage}
                        alt="img" />
                    <div>
                        <span className="username-receiver">{contact.Username}</span>
                        <span className="fullname-receiver grey-text">{contact.Firstname+" "+contact.Lastname}</span>
                    </div>
                </div>
            )
        }

    }
}

export default Contact
