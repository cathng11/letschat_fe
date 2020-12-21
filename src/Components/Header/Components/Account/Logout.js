import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Login from '../../../../Login/Login';
import { logout } from '../../../../service/UserService';
import dateFormat from 'dateformat';

class Logout extends Component {
    onLogOut = (e) => {
        logout([this.props.username, dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss")]);
        localStorage.removeItem('user');
        this.componentWillUnmount();
        e.preventDefault();
        ReactDOM.render(
            <React.StrictMode>
            <Login/>
            </React.StrictMode>,
            document.getElementById('root')
        );
    }

    render() {
        
        return (
            <div>
                <div className="modal fade" id="modalConfirmLogout" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-sm modal-notify modal-primary " role="document">
                        <div className="modal-content text-center">
                            <div className="modal-header flex-center justify-content-center blue-gradient">
                                <h3>Are you sure?</h3>
                            </div>
                            <div className="modal-body">
                                <i className="fas fa-sign-out-alt fa-4x animated rotateIn logoutIcon"></i>
                            </div>
                            <div className="modal-footer flex-center">
                                <a href="/" className="btn  btn-outline-primary" onClick = {this.onLogOut}>Yes</a>
                                <a href="/#" type="button" className="btn  btn-primary waves-effect morpheus-den-gradient" data-dismiss="modal">No</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Logout
