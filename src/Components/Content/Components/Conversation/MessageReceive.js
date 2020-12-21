import React, { Component } from 'react';
import tempAvatar from '../../../../ava.jpg'
class MessageReceive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ""
        };
    }

    componentDidMount() {
        if (this.props.type === "image") {
            this.setState({id: this.generateID().toString()});
        }
    }

    randomID() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    generateID() {
        return this.randomID() + this.randomID();
    }
    
    loadDefaultImage = (e) => {
        e.target.src = tempAvatar;
    }

    render() {
        return (
            <div className="row message-body">
                <div className="col-sm-12 message-main-receiver">
                    <div className="message-avatar" style={{ display: "inline" }}>
                        <div className="heading-avatar-icon" style={{ display: "inline" }}>
                            <img
                                src={"data:image/jpg;base64," + this.props.image}
                                onError={this.loadDefaultImage}
                                alt="ava"
                                id="img-mess" />
                        </div>
                    </div>
                    <div className="receiver ">
                        <div className="message-text">
                            {this.props.type === "image"
                                ? 
                                <div>
                                    <span style={{width:"60%"}} data-toggle="modal" data-target={`#Modal${this.state.id}`}>
                                        <img src={"data:image/jpg;base64," + this.props.message} alt="imagesend"></img>
                                    </span>
                                    <div className="modal fade" id={`Modal${this.state.id}`} tabIndex="-1" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel"
                                        aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header text-center">
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <img style={{ width: "100%" }} src={"data:image/jpg;base64," + this.props.message} alt="imagesend"></img>
                                                </div>
                                                <div className="modal-footer d-flex justify-content-center">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : this.props.message}
                        </div>
                        <span className="message-time pull-right">
                            {this.props.time}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default MessageReceive;