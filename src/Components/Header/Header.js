import React, { Component } from 'react'
import './Header.css'
import Notification from './Components/Notification'
import Account from './Components/Account'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoUser: null,
            reload: true
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps) {
            this.setState({reload: !this.state.reload});
        }
    }

    onReload = (data) => {
        this.props.onReload(data);
    }

    render() {
        return (
            <div>
                <div className="mb-1 navbar navbar-expand-sm navbar-bright lighten-1">
                    <a className="navbar-brand " href="window.location.reload()" ><b className="nameApp">LetsChat</b></a>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent-555">

                        {/* Right Header */}
                        <ul className="navbar-nav ml-auto nav-flex-icons ">
                            {/* Notification */}
                            <li className="nav-item notification mr-3 ">
                                <Notification 
                                username = {this.props.username} 
                                reload={this.state.reload} 
                                onReload = {this.onReload}
                                />
                            </li>
                            {/* Account */}
                            <li className="nav-item avatar dropdown">
                                <Account
                                    user={this.props.user}
                                    userFirstname={this.props.userFirstname}
                                    username={this.props.username}
                                    infoUser={this.props.infoUser}
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header
