import React, { Component } from 'react'
import tempAvatar from '../../../../ava.jpg'
import { addParticipants } from '../../../../service/UserService';
import io from 'socket.io-client';

export class addNewMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            listContact: this.props.listContact,
            notification: '',
            members: this.props.members
        }
        this.socket=null;
    }
    onSearch = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }
    addMember=(data)=>
    {
        var result=-1;
        var {members}=this.state;
        members.forEach((element,index) => {
            if(element.Username===data)
            {
                result=index;
            }
        });
        if(result===-1)
        {
            this.addParticipants(data);
        }
        else
        {
            alert("This user already exists in group")
        }
    }
    addParticipants=async(data)=>
    {
        var list=[];
        list.push(data)
        await addParticipants(this.generateID(),this.props.id,list)
        .then(res=>
            {
                this.socket = io('localhost:3070');
                this.socket.emit('updateroom', { id: this.props.id, user: this.props.username })
            })
    }
    randomID() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    generateID() {
        return this.randomID() + this.randomID() + '-' + this.randomID();
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
        if(listContact)
        {
            var showResult = listContact.map((contact, index) => {
                return (
                    <div className="contact add-new-member"
                        key={contact.Username}
                        style={{backgroundColor: this.state.currentColor}}
                        onClick={() => this.addMember(contact.Username)}
                        data-dismiss="modal"
                        >
                        <img
                            src={"data:image/*;base64,"+contact.Avatar.data}
                            className="img-responsive avatar"
                            onError={this.loadDefaultImage}
                            alt="img" />
                        <div>
                            <span className="username-receiver">{contact.Username}</span>
                            <span className="fullname-receiver grey-text">{contact.Firstname+" "+contact.Lastname}</span>
                        </div>
                    </div>
                )
            });
        }

        return (
            <div>
                <div 
                    className="modal fade" 
                    id="ModalAddNewMember" 
                    tabIndex="-1" 
                    data-backdrop="static" 
                    role="dialog" 
                    aria-labelledby="myModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <h4 className="modal-title w-100 font-weight-bold">Add new member</h4>
                                <button 
                                    type="button" 
                                    className="close" 
                                    data-dismiss="modal" 
                                    aria-label="Close">
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
                                <div className="result-search ml-1 mb-3">
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

export default addNewMember
