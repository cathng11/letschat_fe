import React, { Component, createRef } from 'react';
import './Conversation/Conversation.css'
import io from 'socket.io-client';
import dateFormat from 'dateformat';
import { getMessages, addMessage, checkStatusFr, sendRequest } from '../../../service/UserService';
import MessageSend from './Conversation/MessageSend';
import MessageReceive from './Conversation/MessageReceive';
import tempAvatar from '../../../ava.jpg';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import Resizer from 'react-image-file-resizer';

class ConvNonGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            isFriend: "",
            text: "",
            type: "",
            id: ""
        };
        this.socket = null;
        this.txtMessage = createRef();
        this.inputFile = createRef();
    }
    focusTxtMess = () => {
        this.txtMessage.current.focus();
    }
    getChat = () => {
        getMessages(this.props.id)
            .then(res => {
                var chats = [];
                res.forEach((mess, index) => {
                    if (mess.ID_Sender === this.props.showInfo.Username) {
                        var data = [false, mess.Message, mess.TimeSend];
                        chats.push(data);
                    } else {
                        data = [true, mess.Message, mess.TimeSend];
                        chats.push(data);
                    }
                });
                this.setState({ messages: chats });
            }
            ).catch(err => console.log(err));
    }
    isFriend = async () => {
        var isFr = '';
        await checkStatusFr(this.props.username, this.props.showInfo.Username)
            .then(res => {
                if (res.result === 'Not friend')
                    isFr = false;
                if (res.result === 'Already friend')
                    isFr = true;
                this.setState({
                    isFriend: isFr
                })
            })
    }
    componentDidMount() {
        this.socket = io('localhost:3070');
        this.socket.emit('joinRoom', this.props.id);
        this.socket.on('newMessage', (response) => { this.newMessage(response) }); //lắng nghe event 'newMessage' và gọi hàm newMessage khi có event
        this.getChat();
        this.isFriend();
        // this.setState({id: this.state.id});
    }
    componentWillUnmount() {
        this.socket.disconnect();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.isFriend();
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps && this.props !== null)
        {
            this.isFriend()
        }
        this.messagesEnd.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
    newMessage(m) {
        var messages = this.state.messages;
        var data = [false, m[0], dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"), m[1]];
        messages.push(data);
        this.setState({
            messages: messages
        });
    }
    onSendMessage = () => {
        var { messages } = this.state;
        if (this.state.type === "image") {
            var data = [true, this.state.text, dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"), 'image'];
            messages.push(data);
            this.socket.emit("newMessage", [this.props.id, this.state.text, 'image']);
            this.txtMessage.current.value = "";
            this.setState({
                messages: messages,
                text: "",
                type: ""
            });
        }

        if (this.txtMessage.current.value !== "") {
            data = [true, this.txtMessage.current.value, dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"), 'text'];
            messages.push(data);
            this.socket.emit("newMessage", [this.props.id, this.txtMessage.current.value]);
            this.txtMessage.current.value = "";
            addMessage([this.props.username, this.props.id, data[1], data[2]]);
            this.setState({
                messages: messages
            });

        }
        else return;
    }
    onEnterPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.onSendMessage();
        }
    }
    closeConvTab = () => {
        this.props.closeConvTab(this.props.showInfo)
    }
    loadDefaultImage = (e) => {
        e.target.src = tempAvatar;
    }
    addEmoji = e => {
        let emoji = e.native;
        this.txtMessage.current.value += emoji;
    };
    onUnfriend = () => {
        this.socket.emit('unfriend', { idroom: this.props.id, user: this.props.username, friend: this.props.showInfo.Username });
    }
    onAddfriend = async() => {
        await this.sendRequest();
    }
    sendRequest = async () => {
        await sendRequest(this.props.id, this.props.username, this.props.showInfo.Username, dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"))
            .then(res => {
                if (res.result === "Sent friend request") {
                    this.setState({
                        isFriend: "",
                        id: `${this.props.username}-${this.props.showInfo.Username}`
                    })
                }
                
                if (res.idroom_temp) {
                    this.props.loadHeader(this.props.showInfo.Username);
                    this.props.idroom_temp(res.idroom_temp);
                }
            })
    }
    resizeFile = (file) => new Promise(resolve => {
        Resizer.imageFileResizer(file, 250, 250, 'JPEG', 100, 0,
        uri => {
            resolve(uri);},
            'base64'
        );
    })
    _onChange = (e) => {
        var target = e.target.files[0];
        const image =  this.resizeFile(target);
        image.then(res => {
            var r = res.slice(res.indexOf(',')+1);
            this.setState({text: r, type: 'image'});
            this.txtMessage.current.value = "(image)";
        });
    }
    onChangeMessage = (e) => {
        var target = e.target;
        var value = target.value;
        this.setState({
            text: value,
            type: 'text'
        });
    }
    render() {
        var { messages, isFriend } = this.state;
        var { showInfo } = this.props;

        var listMessage = messages.map((message, index) => {
            if (message[0])
                return <MessageSend
                    key={index}
                    message={message[1]}
                    time={message[2]}
                    type={message[3]} />
            else
                return <MessageReceive
                    key={index}
                    message={message[1]}
                    time={message[2]}
                    type={message[3]}
                    image={showInfo.Avatar.data}
                />
        });

        return (
            <div className="conversation">
                <div className="row heading no-gutters">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 ">
                        <div className="heading-avatar">
                            <div className="heading-avatar-icon">
                                <img
                                    src={"data:image/jpg;base64," + showInfo.Avatar.data}
                                    alt="ava"
                                    id="img-header"
                                    onError={this.loadDefaultImage}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 ">
                        <div className="heading-name">
                            <a className="heading-name-meta" href="/#">{showInfo.Firstname === '' ? showInfo.Username : showInfo.Firstname}</a>
                            <span className="heading-online">
                                {(showInfo.Time_Online !== null && showInfo.Time_Offline === null) ? 'Online' : 'Offline'}
                            </span>
                        </div>
                    </div>
                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 ">
                        <a
                            className="heading-dots dropdown mt-2 ml-4 w-75"
                            type="button"
                            data-toggle="dropdown"
                            aria-expanded="false"
                            href="/#">
                            <i className="fa fa-ellipsis-v fa-2x " aria-hidden="true"></i></a>
                        <div className="heading-dots dropdown-menu dropdown-menu-right">
                            <a
                                className="dropdown-item"
                                href="/#"
                                onClick={this.closeConvTab}
                            >Close</a>
                            <a
                                className="dropdown-item"
                                href="/#"
                                onClick={isFriend === true ? this.onUnfriend : (isFriend === '' ? e => e.preventDefault() : this.onAddfriend)}
                            >{isFriend === true ? 'Unfriend' : (isFriend === '' ? 'Not accept' : 'Add friend')}</a>
                        </div>
                    </div>
                </div>

                <div className="row message" id="conversation">
                    <div className="row message-previous">
                        <div className="col-sm-12 previous">
                            <a id="ankitjain28" name="20" href="/#">
                                Show Previous Message!
                            </a>
                        </div>
                    </div>
                    {listMessage}
                    <div
                        ref={el => {
                            this.messagesEnd = el;
                        }}
                        style={{ float: "left", clear: "both" }}
                    />
                </div>
                <div className="list-emoji">
                    <span id="emoji"
                        className="width-300 dropdown-menu dropdown-menu-lg-left dropdown-secondary">
                        <Picker onSelect={this.addEmoji} />
                    </span>
                </div>
                <div className="row reply">
                    <div className="col-sm-1 col-xs-1 reply-emojis">
                        <i className="fas fa-smile-beam fa-2x" data-toggle="collapse" data-target="#emoji"></i>
                    </div>
                    <div className="col-sm-1 col-xs-1 reply-recording">
                        <form>
                            <label htmlFor="file-upload">
                                <i className="fas fa-folder-open fa-2x"></i>
                            </label>
                            <input 
                                id="file-upload" accept="image/*"
                                type="file"
                                ref={this.inputFile}
                                style={{display:'none'}} 
                                onChange = {this._onChange}
                            />
                        </form>
                    </div>
                    <div className="col-sm-9 col-xs-9 reply-main">
                        <textarea
                            className="txtConv form-control"
                            rows="1" id="comment" placeholder="Aa" autoFocus
                            ref={this.txtMessage}
                            onClick={this.focusTxtMess}
                            onKeyDown={this.onEnterPress}
                            onChange = {this.onChangeMessage}
                        ></textarea>
                    </div>
                    <div className="col-sm-1 col-xs-1 reply-send">
                        <i
                            className="fas fa-paper-plane fa-2x" aria-hidden="true"
                            onClick={this.onSendMessage}
                        ></i>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConvNonGroup;
