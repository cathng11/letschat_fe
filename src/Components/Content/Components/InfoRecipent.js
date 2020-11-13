import React, { Component } from 'react'

class InfoRecipent extends Component {
    render() {
        return (
            <div className="right-bar card">
                <h5 className="card-header info-color blue-gradient white-text text-center py-4">
                    <div>
                        <img src="https://pbs.twimg.com/profile_images/1308525962859098114/SFa770Jq_400x400.jpg"
                            alt="avatar" className="rounded-circle img-responsive modal-title" id="avaRecipent" />
                        <span className="name-recipent"><h5><strong>Zayn</strong></h5></span>
                        <span className="status-activity">Online</span>
                    </div>

                </h5>
                <div className="card-body">
                    <ul className="text-center" style={{ color: "#757575" }} action="#!">
                        <li className="card-info md-form ">
                            <a id="phone-recipent" href="/#"> <i className="fas fa-phone-alt "></i>0905-555-111</a>
                        </li>
                        <li className="card-info md-form ">
                            <a id="mail-recipent" href="/#"><i className="fas fa-mail-bulk"></i>zayn@gmail.com</a>
                        </li>
                        <li className="card-info md-form ">
                            <a id="birthday-recipent" href="/#"><i className="fas fa-phone-alt "></i>12-01-1993</a>
                        </li>
                        <li className="card-info md-form ">
                            <a id="address-recipent" href="/#"><i className="fas fa-home "></i>zayn@gmail.com</a>
                        </li>
                        <li className="card-info md-form ">
                            <a id="relatioship-recipent" href="/#"><i className="fas fa-user-friends "></i>Friend</a>
                        </li>
                        <li className="card-info md-form ">
                            <a id="date-start-relationship-recipent" href="/#"><i className="fas fa-tree "></i>Friend since December 2019</a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default InfoRecipent
