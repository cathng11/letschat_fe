import React, { Component } from 'react'

class Feedback extends Component {
    render() {
        return (
            <div>
                <div className="modal fade right" id="modalFeedback" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true" data-backdrop="false">
                    <div className="modal-dialog modal-full-height modal-right modal-notify modal-info" role="document">

                        <div className="modal-content">
                            <div className="modal-header blue-gradient">
                                <p className="heading lead">Feedback request</p>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" className="white-text">×</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="text-center">
                                    <i className="far fa-file-alt fa-4x mb-3 animated rotateIn"></i>
                                    <p><strong>Your opinion matters</strong></p>
                                    <p>Have some ideas how to improve our product?
                    <strong>Give us your feedback.</strong>
                                    </p>
                                </div>

                                <hr></hr>

                                <p className="text-center">
                                    <strong>Your rating</strong>
                                </p>
                                <div className="form-check mb-4">
                                    <input className="form-check-input" name="group1" type="radio" id="radio-179" value="option1" defaultChecked />
                                    <label className="form-check-label" htmlFor="radio-179">Very good</label>
                                </div>

                                <div className="form-check mb-4">
                                    <input className="form-check-input" name="group1" type="radio" id="radio-279" value="option2" />
                                    <label className="form-check-label" htmlFor="radio-279">Good</label>
                                </div>

                                <div className="form-check mb-4">
                                    <input className="form-check-input" name="group1" type="radio" id="radio-379" value="option3" />
                                    <label className="form-check-label" htmlFor="radio-379">Mediocre</label>
                                </div>
                                <div className="form-check mb-4">
                                    <input className="form-check-input" name="group1" type="radio" id="radio-479" value="option4" />
                                    <label className="form-check-label" htmlFor="radio-479">Bad</label>
                                </div>
                                <div className="form-check mb-4">
                                    <input className="form-check-input" name="group1" type="radio" id="radio-579" value="option5" />
                                    <label className="form-check-label" htmlFor="radio-579">Very bad</label>
                                </div>

                                <p className="text-center">
                                    <strong>What could we improve?</strong>
                                </p>
                                <div className="md-form">
                                    <textarea type="text" id="form79textarea" className="md-textarea form-control" rows="3"></textarea>
                                    <label htmlFor="form79textarea">Your message</label>
                                </div>
                            </div>

                            <div className="modal-footer justify-content-center">
                                <a type="button" className="btn btn-primary waves-effect waves-light morpheus-den-gradient" href="/#">Send
                  <i className="fa fa-paper-plane ml-1"></i>
                                </a>
                                <a type="button" className="btn btn-outline-primary waves-effect" data-dismiss="modal" href="/#">Cancel</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Feedback
