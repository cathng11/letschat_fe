import React, { Component } from 'react'
import Contact from './Contact'
export class ListContact extends Component {

    render() {
        var { listContact } = this.props;
        var showAllContact = listContact.map((contact, index) => {
            return (<Contact
                key={contact.Username}
                index={index}
                onShowInfo={this.props.onShowInfo}
                listContact={listContact[index]}
            />);
        })
        var altEmptyList=
        <div>
            <div className="img-alt-empty-list mt-5"
                style={{
                    width: "150px",
                    height: "150px",
                    margin:"auto auto",
                    backgroundImage: "url(\"https://cdn4.iconfinder.com/data/icons/communication-179/64/x-18-512.png\")",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize:"cover",
                }}></div>
            <div className="text-center mt-5" style={{color:"#1a237e"}}><h4>Empty contact</h4></div>
        </div>
        return (
            <div >
                {Object.keys(showAllContact).length===0?altEmptyList:showAllContact }
            </div>
        )
    }
}

export default ListContact
