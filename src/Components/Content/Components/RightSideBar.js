import React, { Component } from 'react';
import './RightSideBar/RightSideBar.css'
import tempAvatar from '../../../ava.jpg'
import tempGrAva from '../../../camera.jpg'
import { checkStatusFr, getInfoRoom, getListContact, getListMembers, updateRoom } from '../../../service/UserService';
import Resizer from 'react-image-file-resizer'
import io from 'socket.io-client';
import AddNewMember from './RightSideBar/addNewMember'
class RightSideBar extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            isFriend: "",
            members: [],
            avaGr: '',
            listContact:'',
            group: this.props.infoGroup ? this.props.infoGroup : ''

        }
        this.socket = null;
    }
    componentDidMount() {
        this._isMounted = true;
        if (this.props.showInfo)
            this.isFriend();
        else {
            this.getListMembers()
            this.getInfoRoom()
            this.getListContact('')
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            if (this.props.showInfo)
                this.isFriend();
            else {
                this.getListMembers()
                this.getInfoRoom();
                this.getListContact('')
            }

        }
    }
    componentWillUnmount() {
        this._isMounted = false;
      }
    getListContact = async (txtSearch) => {
        await getListContact([this.props.username, txtSearch])
            .then(res =>
                {
                    if(this._isMounted)
                    {
                        this.setState({
                            listContact: res
                        })
                    }
                }

            ).catch(err => console.log(err));
    }
    getInfoRoom = async () => {
        await getInfoRoom(this.props.infoGroup.ID_Room)
            .then(res => {
                if(this._isMounted)this.setState({ group: res[0] })
            })
    }
    getListMembers = async () => {
        await getListMembers(this.props.infoGroup.ID_Room)
            .then(res => {
                if(this._isMounted)this.setState({ members: res })
            })
    }
    isFriend = async () => {
        var isFr = '';
        await checkStatusFr(this.props.username, this.props.showInfo.Username)
            .then(res => {
                if (res.result === 'Not friend')
                    isFr = false;
                if (res.result === 'Already friend')
                    isFr = true;
                    if(this._isMounted) this.setState({
                    isFriend: isFr
                })
            })
    }

    loadDefaultImage = (e) => {
        if (this.props.showInfo)
            e.target.src = tempAvatar;
        else
            e.target.src = tempGrAva;

    }
    resizeFile = (file) => new Promise(resolve => {
        Resizer.imageFileResizer(file, 150, 150, 'JPEG', 100, 0,
            uri => {
                resolve(uri);
            },
            'base64'
        );
    })
    onChangeFile = async (e) => {
        var target = e.target.files[0];
        const image = this.resizeFile(target);
        await image.then(res => {
            var r = res.slice(res.indexOf(',') + 1);
            this.setState({
                avaGr: r,
            })
            this.updateRoom();
        });

    }
    updateRoom = async () => {
        await updateRoom(this.props.infoGroup.ID_Room, this.state.avaGr)
            .then(res => {
                if (res.results === 'Updated') {
                    this.socket = io('https://letschat-bb.herokuapp.com/');
                    this.socket.emit('updateroom', { id: this.props.infoGroup.ID_Room, user: this.props.username })
                }
            })
    }

    randomID() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    generateID() {
        return this.randomID() + this.randomID() + '-' + this.randomID();
    }
    render() {
        var { showInfo, infoGroup } = this.props;
        var { members } = this.state
        if (infoGroup !== null && showInfo === null) {
            var memberGroup = members.map((info, index) => {
                return (
                    <div className="info-member" key={info.Username}>
                        <img
                            src={"data:image/*;base64," + info.Avatar.data}
                            className="img-responsive avatar"
                            alt="img"
                            onError={this.loadDefaultImage}
                        />
                        <div>
                            <span className="name-receiver">
                                {info.Firstname === '' && info.Lastname === '' ?
                                    info.Username : info.Firstname + " " + info.Lastname}
                            </span>
                        </div>
                    </div>
                );
            })
        }
        if (showInfo !== null) {
            var { isFriend } = this.state;
            return (
                <div className="card show-info">
                    <h5 className="card-header info-color blue-gradient white-text text-center py-4">
                        <div>
                            <img
                                src={"data:image/jpg;base64," + showInfo.Avatar.data}
                                alt="avatar"
                                className="rounded-circle img-responsive modal-title"
                                onError={this.loadDefaultImage}
                                id="avaReceiver" />
                            <span className="name-receiver"><h5><strong>{showInfo.Firstname === '' && showInfo.Lastname === '' ?
                                showInfo.Username : showInfo.Firstname + " " + showInfo.Lastname}</strong></h5></span>
                            {isFriend ? <span className="status-activity">
                            {(showInfo.Time_Online !== null && showInfo.Time_Offline === null) ? 'Online' : 'Offline'}</span> : ''}

                        </div>

                    </h5>
                    <div className="card-body">
                        <span className="txt-side-bar">INFORMATION</span>
                        <span className="divider"></span>
                        <hr className="solid" />
                        {isFriend ? <table className="table table-sm text-left">
                            <tbody>
                                <tr>
                                    <td><i className="fas fa-phone-alt "></i></td>
                                    <td>{showInfo.Phone}</td>
                                </tr>
                                <tr>
                                    <td><i className="fas fa-mail-bulk"></i></td>
                                    <td>{showInfo.Email}</td>
                                </tr>
                                <tr>
                                    <td><i className="fas fa-birthday-cake "></i></td>
                                    <td>{showInfo.DateOfBirth}</td>
                                </tr>
                                <tr>
                                    <td><i className="fas fa-home "></i></td>
                                    <td>{showInfo.Address}</td>
                                </tr>
                                <tr>
                                    <td><i className="fas fa-city "></i></td>
                                    <td>{showInfo.City}</td>
                                </tr>
                                <tr>
                                    <td><i className="fas fa-venus-mars "></i></td>
                                    <td>{showInfo.Gender === 1 ? 'Female' : 'Male'}</td>
                                </tr>
                            </tbody>
                        </table>
                            : <div className='text-center mt-5'>Just friends could see this information</div>}
                    </div>
                </div>
            )
        }


        if (infoGroup !== null)
            return (
                <div className="card show-info-member-gr">
                    <h5 className="card-header info-color blue-gradient white-text text-center py-4">
                        <div>
                            <label src={"data:image/jpg;base64," + this.state.group.Avatar.data}
                                alt="ava"
                                onError={this.loadDefaultImage}
                                className="rounded-circle img-responsive modal-title avatar-pic-gr mb-0 mt-3"
                                style={this.state.group.Avatar.data === '' ? { backgroundImage: "url('" + tempGrAva + "')" }
                                    : { backgroundImage: "url('data:image/jpg;base64," + this.state.group.Avatar.data + "')" }}
                            >
                                <input
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={this.onChangeFile}
                                />
                            </label>
                            <span className="name-receiver"><h5><strong>{infoGroup.NameRoom}</strong></h5></span>
                        </div>
                    </h5>
                    <div className="card-body show-info-member-gr">
                        <span className="txt-side-bar">LIST MEMBERS</span>
                        <hr className="solid" />
                        <div 
                            className="add-new-member" 
                            onClick={this.addNewMember}
                            data-toggle="modal"
                            data-target="#ModalAddNewMember"
                        ><i className="fas fa-plus"></i> Add member</div>
                        <AddNewMember 
                        key={this.generateID()}
                        listContact={this.state.listContact}
                        members={this.state.members}
                        id={infoGroup.ID_Room}
                        username={this.props.username}
                        />
                        {memberGroup}
                    </div>
                </div>
            )
    }
}
export default RightSideBar
