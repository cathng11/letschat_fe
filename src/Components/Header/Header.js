import React, { Component } from 'react'
import './Header.css'
import SearchUser from './Components/SearchUser'
import Notification from './Components/Notification'
import Account from './Components/Account'
class Header extends Component {
    render() {
        return (
            <div>
                <div className="mb-1 navbar navbar-expand-sm navbar-bright lighten-1">
                    <a className="navbar-brand " href="/#"><b className="nameApp">LetsChat</b></a>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent-555">
                        {/* SearchUser */}
                        <SearchUser />
                        {/* Right Header */}
                        <ul className="navbar-nav ml-auto nav-flex-icons ">
                            {/* Notification */}
                            <li className="nav-item notification mr-3 ">
                            <Notification />
                            </li>
                            {/* Account */}
                            <li className="nav-item avatar dropdown">
                                <Account />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header
