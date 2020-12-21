import React, { Component } from 'react'
import Group from './Group';

export class ListGroup extends Component {
    render() {
        var { listGroup } = this.props;
        var showAllGroup = listGroup.map((group, index) => {
            return (<Group
                key={group.ID_Room}
                index={index}
                listGroup={listGroup[index]}
                onShowInfoGroup={this.props.onShowInfoGroup}
                username = {this.props.username}
            />);
        })
        var altEmptyList=
        <div>
            <div className="img-alt-empty-list mt-5"
                style={{
                    width: "150px",
                    height: "150px",
                    margin:"auto auto",
                    backgroundImage: "url(\"https://i.pinimg.com/originals/3e/e6/dc/3ee6dc8aec204df4af789d7c21548f4a.png\")",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize:"cover",
                }}></div>
            <div className="text-center mt-5" style={{color:"#1a237e"}}><h4>Start chatting on LetsChat</h4></div>
        </div>
        return (
            <div>
                {Object.keys(showAllGroup).length===0?altEmptyList:showAllGroup}
            </div>                
        );
    }
}

export default ListGroup
