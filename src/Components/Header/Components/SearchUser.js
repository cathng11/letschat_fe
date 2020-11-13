import React, { Component } from 'react'
class SearchUser extends Component {
    render() {
        return (
            <div>
                <form className="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-4">
                    <input className="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search"
                        aria-label="Search" id="searchForm" />
                    <i className="fas fa-search mb-2" aria-hidden="true"></i>
                </form>
            </div>
        )
    }
}

export default SearchUser;
