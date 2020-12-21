import React, { Component, createRef } from 'react'

export class SearchMessage extends Component {
    
    constructor(props) {
        super(props);
        this.txtSearch = createRef();
    }

    onSearch = () => {
        this.props.onSearch(this.txtSearch.current.value);
    }

    onEnterPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.onSearch();
        }
    }
    
    render() {
        return (
            <div>
                <span className="search-area side-search">
                    <form className="form-inline d-flex justify-content-center md-form form-sm mt-0">
                        <i className="fas fa-search mb-1" aria-hidden="true"
                            onClick={this.onSearch}
                        ></i>
                        <input className="txtSearchSideBar form-control-sm shadow-none border-bottom-0 ml-3 w-75 mb-0"
                            type="text"
                            placeholder="Search"
                            aria-label="Search" 
                            ref = {this.txtSearch}
                            onKeyPress={this.onEnterPress}
                        />
                    </form>
                </span>
            </div>
        )
    }
}

export default SearchMessage
