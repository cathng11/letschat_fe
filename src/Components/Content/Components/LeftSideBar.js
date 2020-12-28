import React, { Component } from 'react'
import Action from './LeftSideBar/Action'
import ListMessages from './LeftSideBar/Messages/ListMessages'
import SearchMessage from './LeftSideBar/SearchMessage'
import ListContact from './LeftSideBar/Contact/ListContact'
import ListGroup from './LeftSideBar/Group/ListGroup'
import './LeftSideBar/LeftSideBar.css'
import { getListContact, getListGroup, getListMessages } from '../../../service/UserService'
import NewChat from './LeftSideBar/CreateNew/NewChat'
import NewGroupChat from './LeftSideBar/CreateNew/NewGroupChat'
import NewContact from './LeftSideBar/CreateNew/NewContact'

class LeftSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DisplayList: 'ListMessages',
            modalNewAction: '#ModalNewChat',
            // showInfoGroup: [],
            showInfo: null,
            listContact: [],
            listMessages: [],
            listGroup: [],
            currentForm: 'formSearch',
            btnEnabled: false
        }
    }
    onShowList = (list) => {
        this.setState({btnEnabled: false});
        if (list === 'ListContact') {
            this.setState({
                DisplayList: 'ListContact',
                modalNewAction: '#ModalNewContact'
            });
            this.getListContact('');
        }
        if (list === 'ListMessages') {
            this.setState({
                DisplayList: 'ListMessages',
                modalNewAction: '#ModalNewChat'
            })
            this.getListMessages('');
            // this.getListContact('');
        }
        if (list === 'ListGroup') {
            this.setState({
                DisplayList: 'ListGroup',
                modalNewAction: '#ModalNewGroupChat'
            })
            this.getListGroup('');
            // this.getListContact('');
        }
        this.setState({btnEnabled: true});
    }
    onShowInfo = async (username) => {
        var list;
        if (this.state.DisplayList === 'ListMessages') {
            list = this.state.listMessages;
        } else {
            list = this.state.listContact
        };
        var index = this.findInfo(username);
        var showInfo = list[index];
        await this.setState({
            showInfo: showInfo
        })
        this.props.showInfo(this.state.showInfo);
    }
    findInfo = (username) => {
        var result = -1;
        var list;
        if (this.state.DisplayList === 'ListMessages') {
            list = this.state.listMessages;
        } else {
            list = this.state.listContact
        };
        list.forEach((list, index) => {
            if (list.Username === username)
                result = index;
        })
        return result;
    }
    onShowInfoGroup = async (ID_Room) => {
        var { listGroup } = this.state;
        var indexGr = -1;
        listGroup.forEach((list, index) => {
            if (list.ID_Room === ID_Room)
                indexGr = index;
        })
        var infoGr = listGroup[indexGr];
        this.props.infoGroup(infoGr);
    }
    getListContact = async (txtSearch) => {
        await getListContact([this.props.username, txtSearch])
            .then(res =>
                this.setState({
                    listContact: res
                })
            ).catch(err => console.log(err));
    }
    getListMessages = async (txtSearch) => {
        await getListMessages([this.props.username, txtSearch])
            .then(res =>
                this.setState({
                    listMessages: res
                })
                
            ).catch(err => console.log(err));
    }
    getListGroup = async (txtSearch) => {
        await getListGroup([this.props.username, txtSearch])
            .then(res =>
                this.setState({
                    listGroup: res
                })).catch(err => console.log(err));
    }
    componentDidMount() {
        this.getListMessages('');
        this.getListContact('');
        this.getListGroup('');
        this.setState({
            btnEnabled: true
        })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.searchData('');
        }
    }
    onSearch = (data) => {
        this.searchData(data);
    }
    searchData = (txtSearch) => {
        var {DisplayList} = this.state;
        if (DisplayList === 'ListContact') {
            this.getListContact(txtSearch);
        }
        if (DisplayList === 'ListMessages') {
            this.getListMessages(txtSearch);
        }
        if (DisplayList === 'ListGroup') {
            this.getListGroup(txtSearch);
        }
    }
    setCurrentForm = () => {
        this.setState({
            currentForm: 'formSearch'
        })
    }
    openChatRoom=async(username)=>
    {
        await this.setState({
            DisplayList:'ListContact',
        })
        var list;
        list = this.state.listContact
        var index = this.findInfo(username);
        var showInfo = list[index];
        await this.setState({
            showInfo: showInfo
        })
        this.props.showInfo(this.state.showInfo)
    }
    randomID() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    generateID() {
        return this.randomID() + this.randomID() + '-' + this.randomID();
    }
    loadHeader = (data) => {
        this.props.loadHeader(data);
    }
    render() {
        var { DisplayList, listGroup, listContact, listMessages } = this.state;

        return (
            <div>
                <div className="side-bar">
                    <div className="row search-side-bar">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <SearchMessage  onSearch={this.onSearch}/>
                        </div>
                    </div>
                    <Action
                        onShowList={this.onShowList}
                    />
                    <button
                        className="row btn new-event"
                        disabled = {this.state.btnEnabled ? "" :"disabled"}
                        data-toggle="modal"
                        onClick={this.setCurrentForm}
                        data-target={this.state.modalNewAction}>
                        <i className="fas fa-user-plus"></i>
                        {DisplayList === 'ListMessages' ? 'New chat' : (DisplayList === 'ListContact' ? 'New contact' : 'New group chat')}
                    </button>
                    <div className="side-bar-content">
                        <div className="list-side-bar-content heading">
                            <span className="txt-side-bar">
                                {DisplayList === 'ListMessages' ? 'MY MESSAGES' : (DisplayList === 'ListContact' ? 'MY CONTACT' : 'MY GROUP')}</span>
                        </div>
                        <div className="list-side-bar-content body ">
                            {DisplayList === 'ListMessages' ?
                                <ListMessages username={this.props.username} onShowInfo={this.onShowInfo} listMessages={listMessages} /> : (DisplayList === 'ListContact' ?
                                    <ListContact onShowInfo={this.onShowInfo} listContact={listContact} /> :
                                    <ListGroup username={this.props.username} onShowInfoGroup={this.onShowInfoGroup} listGroup={listGroup} />)}
                        </div>
                    </div>

                </div>
                <NewChat
                    key={this.generateID()}
                    infoUser={this.props.infoUser}
                    listContact={this.state.listContact} 
                    openChatRoom={this.openChatRoom}/>
                <NewGroupChat
                    key={this.generateID()}
                    infoUser={this.props.infoUser}
                    listContact={this.state.listContact}
                    onLoad={this.props.onLoad}
                />
                <NewContact
                    key={this.generateID()}
                    currentForm={this.state.currentForm}
                    infoUser={this.props.infoUser} 
                    loadHeader = {this.loadHeader}
                />


            </div>

        )
    }
}

export default LeftSideBar
