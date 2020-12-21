import React, { Component, createRef } from 'react'
import { changePass } from '../../../../service/UserService';

export class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: "",
            username: ""
        }
        this.oldpass = createRef();
        this.newpass = createRef();
        this.confpass = createRef();
    }
    changePass = async (e) => {

        e.preventDefault();
        var oldpass = this.oldpass.current.value;
        var newpass = this.newpass.current.value;
        var confpass = this.confpass.current.value;
        if (newpass === confpass) {
            if (oldpass === newpass) {
                await this.setState({
                    notification: "Old password and New password cannot be same"
                })
            }
            else {
                await changePass(oldpass, newpass, this.props.username)
                    .then(res => {
                        this.setState({
                            notification: res.result
                        })
                    }).catch(err => console.log(err));
                if (this.state.notification === "Change password successfully!") {
                    this.oldpass.current.value = null;
                    this.newpass.current.value = null;
                    this.confpass.current.value = null;
                }
            }
        }
        else {
            await this.setState({
                notification: "Confirm password doesn't match"
            })
        }

    }
    close = () => {
        this.oldpass.current.value = null;
        this.newpass.current.value = null;
        this.confpass.current.value = null;
        this.setState({
            notification: ""
        })
    }
    render() {
        return (
            <div>
                <div className="modal fade" id="modalChangePass" tabIndex="-1" role="dialog" data-backdrop="static" aria-labelledby="myModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <i className="fas fa-lock prefix grey-text"></i>
                                <h4 className="modal-title w-100 font-weight-bold">Change password</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body mx-3">
                                <form onSubmit={this.changePass}>
                                    <div className="md-form mb-5">
                                        <input
                                            type="password"
                                            id="orangeForm-oldPass"
                                            name="oldPass"
                                            ref={this.oldpass}
                                            placeholder="Old password"
                                            required="required"
                                            className="form-control" />
                                    </div>
                                    <div className="md-form mb-5">
                                        <input
                                            type="password"
                                            id="orangeForm-newPass"
                                            ref={this.newpass}
                                            name="newPass"
                                            required="required"
                                            placeholder="New password"
                                            className="form-control" />
                                    </div>
                                    <div className="md-form mb-4">
                                        <input
                                            type="password"
                                            id="orangeForm-confirmPass"
                                            ref={this.confpass}
                                            name="confirmPass"
                                            required="required"
                                            placeholder="Confirm new password"
                                            className="form-control" />
                                    </div>
                                    <div className="modal-footer d-flex justify-content-center">
                                        <span className="change-pass-notification" >{this.state.notification}</span>
                                    </div>
                                    <div className="modal-footer d-flex justify-content-center">
                                        <input
                                            className="btn btn-unique"
                                            type="submit"
                                            value="Save"
                                        />
                                        <button className="btn" data-dismiss="modal" onClick={this.close}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChangePassword
