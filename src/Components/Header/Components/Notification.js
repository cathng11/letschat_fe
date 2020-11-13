import React, { Component } from 'react'

class Notification extends Component {
    render() {
        return (
            <div>
                <ul className="navbar-nav ml-auto ">
                    <li className="nav-item avatar dropdown ">
                        <a className="nav-link dropdown-toggle "
                            id="navbarDropdownMenuLink-5" data-toggle="dropdown" aria-expanded="true" href="/#">
                            <span className="badge badge-danger ml-2 ">4</span>
                            <i className="fas fa-bell bell"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg-right dropdown-secondary" aria-labelledby="navbarDropdownMenuLink-5">
                            <a className="dropdown-item waves-effect waves-light" href="/#">New friend</a>
                            <a className="dropdown-item waves-effect waves-light" href="/#">New friend</a>
                            <a className="dropdown-item waves-effect waves-light" href="/#">New friend</a>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Notification
