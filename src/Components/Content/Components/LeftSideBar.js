import React, { Component } from 'react'
import Chat from './LeftSideBar/Chat'
import Contact from './LeftSideBar/Contact'
import GroupChat from './LeftSideBar/GroupChat'
import ListMessages from './LeftSideBar/ListMessages'
import SearchMessage from './LeftSideBar/SearchMessage'

class LeftSideBar extends Component {
    render() {
        return (
            <div className="side-bar">
                <div className="row search-side-bar">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <SearchMessage />
                    </div>
                </div>
                <div className="row container side-button-list no-gutters">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <Chat />
                    </div>
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <GroupChat />
                    </div>
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <Contact />
                    </div>
                </div>

                <div className="side-bar-content">
                    <ListMessages />
                </div>
            </div>
        )
    }
}

export default LeftSideBar
