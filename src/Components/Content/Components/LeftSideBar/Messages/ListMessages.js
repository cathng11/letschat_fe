import React, { Component } from 'react'
import Message from './Message';

export class ListMessages extends Component {
    render() {
        var { listMessages } = this.props;
        var showAllMess = listMessages.map((mes, index) => {
            return (<Message
                key={mes.Username}
                index={index}
                listMessages={listMessages[index]}
                onShowInfo={this.props.onShowInfo}
                username={this.props.username}
            />);
        })
        var altEmptyList=
        <div>
            <div className="img-alt-empty-list mt-5"
                style={{
                    width: "150px",
                    height: "150px",
                    margin:"auto auto",
                    backgroundImage: "url(\"https://cdn2.iconfinder.com/data/icons/ios7-inspired-mac-icon-set/1024/messages_5122x.png\")",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize:"cover",
                }}></div>
            <div className="text-center mt-5" style={{color:"#1a237e"}}><h4>Start chatting on LetsChat</h4></div>
        </div>
        return (
            <div>
                {Object.keys(showAllMess).length===0?altEmptyList:showAllMess}
            </div>
        );

    }
}

export default ListMessages
