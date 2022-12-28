import React, { Component } from 'react'
import './Content.css'
import LeftSideBar from './Components/LeftSideBar.js'
import RightSideBar from './Components/RightSideBar.js'
import ConvNonGroup from './Components/ConvNonGroup.js'
import ConvGroup from './Components/ConvGroup.js'
import io from 'socket.io-client';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInfo: null,
            infoGroup: null,
            onReload: true,
        }
        this.socket = null;
    }
    componentDidMount() {
        this.socket = io('http://localhost:3070/');
        this.socket.emit('joinUser', this.props.username);
        this.socket.on('onShowNewMessage', (response) => { this.setState({ onReload: !this.state.onReload }) });
        this.socket.on('to-friend-reloadHeader', (response) => this.reloadHeader());
        this.socket.on('unfriend', (res) => 
        {
            var {showInfo} = this.state;
            if(showInfo!==null)
            {
                if(showInfo.ID_Room===res.idroom)
                {
                    showInfo.ID_Room = res.idroomTemp;
                    this.setState({showInfo: showInfo});
                }
            }
            this.changeOnReload()
        });
        this.socket.on('userleavedgr', (res) => { this.changeOnReload() });
        this.socket.on('removegroup', (res) => {
            if (this.state.infoGroup !== null) {
                if (this.state.infoGroup.ID_Room === res.idroom)
                    this.closeConvTab();
            }
            this.changeOnReload()
        });
        this.socket.on('addgroup', (res) => { this.changeOnReload() })
        this.socket.on('updateroom', (res) => { this.changeOnReload() })

    }
    changeOnReload = async () => {
        await this.setState({
            onReload: !this.state.onReload
        })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.onReload) {
            this.loadHeader(nextProps.onReload);
            if (nextProps.onReload !== "" && this.state.showInfo!==null) {
                var {showInfo} = this.state;
                showInfo.ID_Room = `${nextProps.onReload}-${this.props.username}`;
                this.setState({showInfo: showInfo});
            }
            this.setState({
                onReload: !this.state.onReload
            })
        }
    }
    reloadHeader = () => {
        this.props.reloadHeader();
    }
    showInfo = (data) => {
        this.setState({
            showInfo: data,
            infoGroup: null,
        })
    }
    infoGroup = (data) => {
        this.setState({
            infoGroup: data,
            showInfo: null
        })
    }
    closeConvTab = () => {
        this.setState({
            showInfo: null,
            infoGroup: null
        })
    }
    idroom_temp = (data) => {
        var {showInfo} = this.state;
        showInfo.ID_Room = data;
        this.setState({showInfo: showInfo});
        this.changeOnReload();
    }
    loadHeader = (data) => {
        this.socket.emit('reloadHeader', data);
    }
    onLoad = () => {
        this.changeOnReload();
    }
    randomID() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    generateID() {
        return this.randomID() + this.randomID() + '-' + this.randomID();
    }
    render() {
        var { showInfo, infoGroup, onReload } = this.state;
        var welcome=<div className="welcome">
            <div className="text-center mt-5"><h1>Welcome, {this.props.username}</h1></div>
            <div className="text-center mt-2" style={{color:"#1a237e"}}><h3>Let's chat together</h3></div>
            <div className="img-welcome text-center mt-5" ></div>
            <div className="text-center mt-5 grey-text"><span>Search for someone to start chatting with or go to Contacts to see who avaiable</span></div>
            </div>
        var altEmptyRightBar=<div>
            <div className="alt-empty-right-bar"></div>
            <div className="alt-empty-right-bar-text">
            <span>Communicate with your friends </span>
            <br/><br/>
            <span >Everywhere</span>
            <br/><br/>
            <span>Everytime</span>
            <br/>
            </div>

        </div>    
        
        return (
            <div>
                <div className="row no-gutters">
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <LeftSideBar
                            showInfo={this.showInfo}
                            infoGroup={this.infoGroup}
                            username={this.props.username}
                            infoUser={this.props.infoUser}
                            onReload={onReload}
                            loadHeader={this.loadHeader}
                            onLoad={this.onLoad}
                        />
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div className="middle-bar">
                            {(showInfo === null && infoGroup === null) ? welcome : (infoGroup !== null ?
                                <ConvGroup
                                    key={this.state.infoGroup.ID_Room}
                                    infoGroup={infoGroup}
                                    username={this.props.username}
                                    onReload={onReload}
                                    id={infoGroup.ID_Room}
                                    closeConvTab={this.closeConvTab}
                                /> :
                                <ConvNonGroup
                                    key={this.state.showInfo.ID_Room}
                                    showInfo={showInfo}
                                    id={this.state.showInfo.ID_Room}
                                    username={this.props.username}
                                    closeConvTab={this.closeConvTab}
                                    onReload={onReload}
                                    idroom_temp={this.idroom_temp}
                                    isFriend={this.state.isFriend}
                                    loadHeader={this.loadHeader}
                                />
                            )}
                        </div>
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <div className="right-bar ">
                            {(showInfo === null && infoGroup === null) ? altEmptyRightBar :
                                <RightSideBar
                                    key={this.generateID()}
                                    infoGroup={infoGroup}
                                    username={this.props.username}
                                    onReload={onReload}
                                    showInfo={showInfo}
                                />}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Content
