import React, { Component } from 'react'
import Feedback from './Account/Feedback'
import UpdateProfile from './Account/UpdateProfile'
import Setting from './Account/Setting'
import Logout from './Account/Logout'

class Account extends Component {
    render() {
        return (
            <div>
                <div className="account">
                    <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-55" data-toggle="dropdown"
                        aria-expanded="false" href="/#">
                        <img src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/117001932_1110718096036504_8930080626201132635_n.jpg?_nc_cat=103&ccb=2&_nc_sid=8bfeb9&_nc_ohc=xw3KAt-NZwUAX_HGLgT&_nc_ht=scontent.fsgn2-2.fna&oh=1e4388ad05943c99c9d3f0de159ef9ea&oe=5FD43DFD"
                            className="rounded-circle z-depth-0"
                            alt="avatar" id="avatar" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg-right dropdown-secondary "
                        aria-labelledby="navbarDropdownMenuLink-55 ">
                        <a className="dropdown-item" href="/#" data-toggle="modal" data-target="#modalUpdateProfile">Profile</a>
                        <a className="dropdown-item" href="/#">Setting</a>
                        <a className="dropdown-item" href="/#" data-toggle="modal" data-target="#modalFeedback">Help and Feedback</a>
                        <a className="dropdown-item" href="/#" data-toggle="modal" data-target="#modalConfirmLogout">Logout</a>
                    </div>
                </div>
                <div>
                    {/* modalUpdateProfile */}
                    <UpdateProfile />
                    {/* modalSetting */}
                    <Setting />
                    {/* ModelFeedback */}
                    <Feedback />
                    {/* modalConfirmLogout */}
                    <Logout />
                </div>
            </div>

        )
    }
}

export default Account
