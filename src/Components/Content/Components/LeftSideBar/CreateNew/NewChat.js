import React, { Component } from 'react'
import tempAvatar from '../../../../../ava.jpg'
import { } from '../../../../../service/UserService';
import './CreateNew.css'
import Contact from './NewGroupChat/Contact';

export default class NewChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            listContact: this.props.listContact,
            notification: '',
        }
    }

    onSearch = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    loadDefaultImage = (e) => {
        e.target.src = tempAvatar;
    }
    close = () => {
        this.setState({
            keyword: '',

        })
    }
    render() {
        var { listContact } = this.state;
        if (this.state.keyword) {
            listContact = listContact.filter((list) => {
                return list.Username.toLowerCase().indexOf(this.state.keyword) !== -1
                    || list.Lastname.toLowerCase().indexOf(this.state.keyword) !== -1
                    || list.Firstname.toLowerCase().indexOf(this.state.keyword) !== -1

            })
        }
        var showResult = listContact.map((contact, index) => {
            return <Contact
                key={contact.Username}
                index={index + 1}
                contact={contact}
                newGrChat={false}
                openChatRoom={this.props.openChatRoom}
            />
        });
        return (
            <div>
                <div className="modal fade" id="ModalNewChat" tabIndex="-1" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <h4 className="modal-title w-100 font-weight-bold">NewChat</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body  ">
                                <div className="md-form ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="keyword"
                                        defaultValue={this.state.keyword}
                                        onChange={this.onSearch}
                                        placeholder="Search"
                                        aria-label="Search" />
                                </div>
                                <span className="txt-side-bar ml-0">PEOPLE</span>
                                <div className="result-search ml-1 mb-3 ModalNewChat-people">
                                    {showResult}
                                </div>
                            </div>
                            <span className="text-center">{this.state.notification}</span>
                            <div className="modal-footer d-flex justify-content-center">
                                <button
                                    className="btn "
                                    id="btnClose"
                                    onClick={this.close}
                                    data-dismiss="modal"
                                >Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
