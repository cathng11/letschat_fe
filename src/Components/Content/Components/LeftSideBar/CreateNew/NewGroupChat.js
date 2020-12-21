import React, { Component } from 'react'
import tempAvatar from '../../../../../camera.jpg'
import { addParticipants, createChatRoom } from '../../../../../service/UserService';
import './CreateNew.css'
import Contact from './NewGroupChat/Contact';
import Resizer from 'react-image-file-resizer'
import io from 'socket.io-client';

export default class NewGroupChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            keyword: '',
            listContact: this.props.listContact,
            listMemberGr: [],
            avaGr: '',
            notification: '',
            id_room: '',
            disabled:''
        }
        this.socket=null;
        this.inputFile = React.createRef();
    }
    componentDidMount() {
        
        var {listMemberGr} = this.state;
        listMemberGr.push(this.props.infoUser.Username);
        this.setState({listMemberGr: listMemberGr});
    }
    randomID() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    generateID() {
        return this.randomID() + this.randomID() + '-' + this.randomID();
    }
    resizeFile = (file) => new Promise(resolve => {
        Resizer.imageFileResizer(file, 150, 150, 'JPEG', 100, 0,
            uri => {
                resolve(uri);
            },
            'base64'
        );
    })
    onChangeFile = (e) => {
        var target = e.target.files[0];
        const image = this.resizeFile(target);
        image.then(res => {
            var r = res.slice(res.indexOf(',') + 1);
            this.setState({
                avaGr: r,
                file: URL.createObjectURL(e.target.files[0])
            })
        });
    }
    onSearch = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    addMember = (data) => {
        this.state.listMemberGr.push(data);
    }
    removeMember = (data) => {
        this.setState({
            listMemberGr: this.state.listMemberGr.filter((list) => {
                return list !== data
            })
        })
    }
    createChatRoom = async () => {
        await createChatRoom(this.generateID(), this.inputFile.current.value, this.state.avaGr)
            .then(res => {
                this.setState({
                    id_room: res.id_room
                })
            })
    }
    addParticipants = async () => {
        await addParticipants(this.generateID(), this.state.id_room, this.state.listMemberGr)
            .then(res => {
                this.setState({
                    notification: res.result,
                    disabled: true
                })
                if(this.state.notification==='Create group successfully')
                {
                    this.socket = io('localhost:3070');
                     this.socket.emit('creategroup',{id:this.state.id_room,user:this.props.infoUser.Username})
                }
            })
    }
    createNewGr = async(e) => {
        //remove duplicate data in listMemberGr
        const array = new Set(this.state.listMemberGr)
        this.setState({
            listMemberGr: Array.from(new Set(array))
        })
        if (this.inputFile.current.value && this.state.listMemberGr.length >2) {
            await this.createChatRoom();
            if (this.state.id_room!==-1 && this.state.id_room) {
                await this.addParticipants();
            }
        }
        else {
            if (!this.inputFile.current.value)
                this.setState({
                    notification: "Group name can not be empty"
                })
            if (this.state.listMemberGr.length <2)
                this.setState({
                    notification: "Number of members must be more than 2"
                })
        }
    }
    loadDefaultImage = (e) => {
        e.target.src = tempAvatar;
    }
    close=(e)=>
    {
        this.setState({
            file: '',
            keyword: '',
            listContact: this.props.listContact,
            listMemberGr: [],
            avaGr: '',
            notification: '',
            id_room: '',
            disabled:''
        })
        this.props.onLoad();
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
                newGrChat={true}
                contact={contact}
                addMember={this.addMember}
                removeMember={this.removeMember}
            />
        });
        return (
            <div>
                <div className="modal fade" id="ModalNewGroupChat" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                    aria-hidden="true" data-backdrop="static">
                    <div className="modal-dialog cascading-modal modal-avatar" role="document">
                        <div className="modal-content">
                            <div className="modal-header mb-0 pb-0">
                                <div className="file-field text-center">
                                    <div className="d-flex justify-content-center mb-1">
                                        <label src={this.state.file}
                                            alt="ava"
                                            onError={this.loadDefaultImage}
                                            className="rounded-circle img-responsive modal-title avatar-pic-gr"
                                            style={this.state.file === '' ? { backgroundImage: "url('" + tempAvatar + "')" }
                                             : { backgroundImage: "url('" + this.state.file + "')" }}
                                        >
                                            <input
                                                type="file"
                                                style={{ display: "none" }}
                                                onChange={this.onChangeFile}
                                            />
                                        </label>
                                    </div>
                                </div>

                            </div>
                            <div className="modal-body  ">
                                <div className="md-form ml-0 mr-0 ">
                                    <input
                                        type="text"
                                        placeholder="Group name"
                                        id="txtEnterGroupName"
                                        name="grName"
                                        ref={this.inputFile}
                                        className="enter-group-name form-control form-control-sm text-center ml-0" />
                                </div>
                                <h5 className="text-center">Add member of group</h5>
                                <div className="md-form ">
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
                                    <div className="result-search ml-1 mb-3">
                                        {showResult}
                                    </div>
                                </div>
                            </div>
                            <span className="text-center">{this.state.notification}</span>

                            <div className="modal-footer d-flex justify-content-center">
                                <button
                                    className="btn blue-gradient"
                                    id="btnDone"
                                    disabled={this.state.disabled}
                                    onClick={this.createNewGr}
                                >Create</button>
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
