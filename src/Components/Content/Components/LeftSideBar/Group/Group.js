import React, { Component } from 'react'
import tempAvatar from '../../../../../ava.jpg'

export class Group extends Component {
    onShowInfoGroup=()=>
    {
        this.props.onShowInfoGroup(this.props.listGroup.ID_Room)
    }
    loadDefaultImage = (e) => {
        e.target.src = tempAvatar;
    }
    render() {
        var {listGroup, username}=this.props;
        return (
            <div>
                <div className="group" onClick={this.onShowInfoGroup}>
                    <img 
                        src={"data:image/*;base64,"+listGroup.Avatar.data}
                        className="img-responsive avatar" 
                        onError={this.loadDefaultImage}
                        alt="img" />
                    <div>
                        <span className="name-receiver">{listGroup.NameRoom}</span>
                        <span className="side-message">
                            {username === listGroup.ID_Sender ? "You: " : (listGroup.ID_Sender!==''?`${listGroup.Firstname}: `:'')}{listGroup.Message}
                        </span>

                    </div>
                </div>                
            </div>
        )
    }
}

export default Group
