import React, { Component } from 'react';
import {getNotifications, acceptFriendRequest, readNotification} from '../../../service/UserService';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            isOpened: true
        };
        this.socket = null;

    }

    componentDidMount() {
        this.getNotifications();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.getNotifications();
        }
    }

    getNotifications = async() => {
        await getNotifications(this.props.username)
            .then(res => 
                this.setState({
                    notifications: res,
                    isOpened: !this.state.isOpened
                })
            ).catch(err => console.log(err));
    }

    onAccept = (sender, check) => {
        acceptFriendRequest([sender, this.props.username, check]);
        if (check === 0) this.props.onReload(sender);
        this.getNotifications();
    }

    onRead = () => {
        var {isOpened} = this.state;
        if (isOpened) {
            readNotification(this.props.username);
            this.getNotifications();
        }
        else this.setState({isOpened: true});
        
    }

    render() {
        var {notifications} = this.state;
        var listNotis = notifications.map((noti, index) => {
            if (noti.IsFriend === 0) {
                return  <div key = {index}>
                            <a className="dropdown-item waves-effect waves-light" href="/#">
                                <div className="bold-text">{noti.Firstname} {noti.Lastname}</div> has accepted your friend request.
                            </a>
                        </div>
            } 
            else {
                return  <div key = {index}>
                            <a className="dropdown-item waves-effect waves-light" href="/#">
                                <div className="bold-text">{noti.Firstname} {noti.Lastname}</div> send you a friend request.
                                <div style={{height:"30px"}}>
                                    <span onClick = {() => this.onAccept(noti.ID_Sender, 0)} className="btn-noti btn btn-outline-primary">Accept</span>
                                    <span onClick = {() => this.onAccept(noti.ID_Sender, 1)} className="btn-noti btn btn-primary waves-effect morpheus-den-gradient">Deny</span>
                                </div>
                            </a>
                        </div>
            }
        });
        
        return (
            <div>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item avatar dropdown">
                        <a  
                            className="nav-link dropdown-toggle" 
                            onClick={this.onRead}
                            id="notification-drop" 
                            data-toggle="collapse" 
                            href="#listNotis" 
                            aria-expanded="true">
                            <span className="badge badge-danger ml-2">{notifications.length}</span>
                            <i className="fas fa-bell bell"></i>
                        </a>
                        <div 
                            id="listNotis" 
                            className="width-300 dropdown-menu dropdown-menu-lg-right dropdown-secondary" 
                            aria-labelledby="notification-drop">
                            {listNotis}
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Notification
