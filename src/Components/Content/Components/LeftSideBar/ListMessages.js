import React, { Component } from 'react'

export class ListMessages extends Component {
    render() {
        return (
            <div>
                <div className="chat-message">
                    <img src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/124700874_1653281861730981_4414471665256987462_o.jpg?_nc_cat=1&ccb=2&_nc_sid=8bfeb9&_nc_ohc=6Mh2bIqY8coAX8O_9MJ&_nc_ht=scontent.fsgn2-2.fna&oh=fd86aa0f71990e85350d79b4ff26c4c8&oe=5FD48406"
                        className="img-responsive avatar" alt="img" />
                    <div>
                        <span className="nameUser">Kha</span>
                        <span className="side-message">You: Hi</span>
                    </div>
                </div>
                <div className="chat-message">
                    <img src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/117001932_1110718096036504_8930080626201132635_n.jpg?_nc_cat=103&ccb=2&_nc_sid=8bfeb9&_nc_ohc=xw3KAt-NZwUAX_HGLgT&_nc_ht=scontent.fsgn2-2.fna&oh=1e4388ad05943c99c9d3f0de159ef9ea&oe=5FD43DFD"
                        className="img-responsive avatar" alt="img" />
                    <div>
                        <span className="nameUser">Vinh</span>
                        <span className="side-message">You: Hello</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListMessages
