import React, { Component } from 'react'

class Logout extends Component {
    render() {
        return (
            <div>
                <div className="modal fade" id="modalConfirmLogout" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-sm modal-notify modal-primary " role="document">
                        <div className="modal-content text-center">
                            <div className="modal-header d-flex justify-content-center blue-gradient">
                                <p className="heading">Are you sure?</p>
                            </div>
                            <div className="modal-body">
                                <i className="fas fa-sign-out-alt fa-4x animated rotateIn logoutIcon"></i>
                            </div>
                            <div className="modal-footer flex-center">
                                <a href="/#" className="btn  btn-outline-primary">Yes</a>
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
