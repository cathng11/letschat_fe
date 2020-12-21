import React, { Component } from 'react'
import Feedback from './Account/Feedback'
import UpdateProfile from './Account/UpdateProfile'
import ChangePassword from './Account/ChangePassword'
import Logout from './Account/Logout'
import tempAvatar from '../../../ava.jpg'

class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newAvatar: "",
            Firstname: "",
            Lastname: "",
            DateOfBirth: "",
            Phone: "",
            Email: "",
            Address: "",
            City: "",
            Avatar: '',
            Gender: 0,
            Username: ""
        }
    }

    componentDidMount() {
        var { infoUser } = this.props;
        if (infoUser !== null) {
            this.setState({
                Username: infoUser.Username,
                Firstname: infoUser.Firstname,
                Lastname: infoUser.Lastname,
                DateOfBirth: infoUser.DateOfBirth,
                Phone: infoUser.Phone,
                Email: infoUser.Email,
                Address: infoUser.Address,
                City: infoUser.City,
                Avatar: infoUser.Avatar,
                Gender: infoUser.Gender
            })
        }
    }

    loadDefaultImage = (e) => {
        e.target.src = tempAvatar;
    }
    newAvatar = (data) => {
        this.setState({
            Username: data.Username,
            Firstname: data.Firstname,
            Lastname: data.Lastname,
            DateOfBirth: data.DateOfBirth,
            Phone: data.Phone,
            Email: data.Email,
            Address: data.Address,
            City: data.City,
            Avatar: data.Avatar,
            Gender: data.Gender
        })
    }
    randomID() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    generateID() {
        return this.randomID() + this.randomID() + '-' + this.randomID();
    }
    render() {
        var {Firstname} = this.state;
        return (
            <div>
                <div className="account">
                    <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-55" data-toggle="dropdown"
                        aria-expanded="false" href="/#">
                        <img
                             src={ this.state.Avatar.data !== undefined ? "data:image/jpg;base64," + (new Buffer(this.state.Avatar.data).toString('base64')) :
                                "data:image/jpg;base64," + this.state.Avatar}
                            className="rounded-circle z-depth-0"
                            alt="ava"
                            id="avatar"
                            onError={this.loadDefaultImage}
                        />
                        {Firstname === '' ? this.props.username : Firstname}
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg-right dropdown-secondary "
                        aria-labelledby="navbarDropdownMenuLink-55 ">
                        <a className="dropdown-item" href="/#" data-toggle="modal" data-target="#modalUpdateProfile">Profile</a>
                        <a className="dropdown-item" href="/#" data-toggle="modal" data-target="#modalChangePass">Change password</a>
                        <a className="dropdown-item" href="/#" data-toggle="modal" data-target="#modalFeedback">Help and Feedback</a>
                        <a className="dropdown-item" href="/#" data-toggle="modal" data-target="#modalConfirmLogout">Logout</a>
                    </div>
                </div>
                <div>
                    <UpdateProfile
                        key={this.generateID()}
                        infoUser={this.state}
                        newAvatar={this.newAvatar}
                    />
                    <ChangePassword
                        key={this.generateID()}
                        username={this.props.username}
                    />
                    <Feedback />
                    <Logout username={this.props.username}/>
                </div>
            </div>

        )
    }
}

export default Account
