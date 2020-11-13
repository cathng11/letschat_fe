import React, { Component } from 'react'
import './Content.css'
import Conversation from './Components/Conversation'
import LeftSideBar from './Components/LeftSideBar'
import InfoRecipent from './Components/InfoRecipent'
class Content extends Component {
    render() {
        return (
            <div>
                <div className="row no-gutters">
                    {/* List message */}
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <LeftSideBar />
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <Conversation />
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <InfoRecipent />
                    </div>
                </div>
            </div>
        )
    }
}

export default Content
