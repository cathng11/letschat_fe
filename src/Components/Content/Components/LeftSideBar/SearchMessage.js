import React, { Component } from 'react'

export class SearchMessage extends Component {
    render() {
        return (
            <div>
                <span className="search-area side-search">
                    <form className="form-inline d-flex justify-content-center md-form form-sm mt-0">
                        <i className="fas fa-search mb-1" aria-hidden="true"></i>
                        <input className="txtSearchSideBar form-control form-control-sm ml-3 w-75 mb-0"
                            type="text"
                            placeholder="Search"
                            aria-label="Search" />
                    </form>
                </span>
            </div>
        )
    }
}

export default SearchMessage
