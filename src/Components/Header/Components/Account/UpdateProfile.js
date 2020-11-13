import React, { Component } from 'react'

class UpdateProfile extends Component {
    render() {
        return (
            <div>
                <div className="modal fade" id="modalUpdateProfile" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <img src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/117001932_1110718096036504_8930080626201132635_n.jpg?_nc_cat=103&ccb=2&_nc_sid=8bfeb9&_nc_ohc=xw3KAt-NZwUAX_HGLgT&_nc_ht=scontent.fsgn2-2.fna&oh=1e4388ad05943c99c9d3f0de159ef9ea&oe=5FD43DFD"
                                    alt="avatar" className="rounded-circle img-responsive modal-title" id="avaModal" />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body mx-3">
                                <h5 className="mt-1 mb-2 text-center"><b>Vinh</b></h5>
                                <div className="md-form">
                                    <i className="fas fa-user prefix grey-text"></i>
                                    <input type="text" id="defaultForm-name" className="form-control" />
                                    <label htmlFor="defaultForm-name">Name user</label>
                                </div>
                                <div className="md-form">
                                    <i className="fas fa-phone-volume prefix grey-text"></i>
                                    <input type="tel" id="defaultForm-phone" className="form-control" />
                                    <label htmlFor="defaultForm-phone">Number phone</label>
                                </div>
                                <div className="md-form">
                                    <i className="fas fa-birthday-cake prefix grey-text"></i>
                                    <input type="date" id="defaultForm-birthday" className="form-control grey-text " />
                                    <label htmlFor="defaultForm-birthday"></label>
                                </div>
                                <div className="md-form">
                                    <i className="fas fa-envelope prefix grey-text"></i>
                                    <input id="defaultForm-email" className="form-control validate" />
                                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-email">Your email</label>
                                </div>
                            </div>
                            <div className="modal-footer d-flex justify-content-center">
                                <button className="btn btn-primary morpheus-den-gradient">Save</button>
                                <button className="btn" data-dismiss="modal" >Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default UpdateProfile
