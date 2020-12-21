import React, { Component, createRef } from 'react'
import tempAvatar from '../../../../../ava.jpg'
import dateFormat from 'dateformat';
import { checkStatusFr, searchUser, sendRequest } from '../../../../../service/UserService';
import './CreateNew.css'
export default class NewContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentForm: this.props.currentForm,
            notificationSearch: '',
            resultSearch:null,
            statusFr:''
        }
        this.inputSearch = createRef();
    }

    onSearch = async (e) => {
        e.preventDefault();
        await searchUser(this.inputSearch.current.value)
        .then(res=>
            {
                this.setState({
                    resultSearch:res.string,
                    notificationSearch:res.result
                })
            }).catch(err=>console.log(err));
        if(this.state.notificationSearch==='Phone number is existing')
        {
            this.setState({
                currentForm: 'formResult'
            })

        }

    }
    randomID() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    generateID() {
        return this.randomID() + this.randomID() + '-' + this.randomID();
    }
    insertFriend=async()=>
    {
        await sendRequest(this.generateID(),this.props.infoUser.Username,this.state.resultSearch.Username,dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"))
        .then(res=>
            this.setState({
                statusFr:res.result
            })
            ).catch(err=>console.log(err));
    }
    sendRequest=async(e)=>
    {
        e.preventDefault();
        await checkStatusFr(this.props.infoUser.Username,this.state.resultSearch.Username)
        .then(res=>
            {
                if(res.result==="Not friend")
                {
                    this.props.loadHeader(this.state.resultSearch.Username);
                    this.insertFriend();
                }
                else
                    this.setState({
                        statusFr:res.result
                    })
            }
            ).catch(err=>console.log(err));
    }
    onPrevious = (e) => {
        e.preventDefault();
        this.setState({
            currentForm: 'formSearch',
            notificationSearch:''
        })
    }
    loadDefaultImage = (e) => {
        e.target.src = tempAvatar;
    }
    componentDidMount() {
        this.setState({
            currentForm: 'formSearch',
            notificationSearch:'',
            statusFr:''
        })
    }
    close=()=>
    {
        this.setState({
            currentForm: 'formSearch',
            notificationSearch:'',
            statusFr:''
        })
    }
    render() {
        var current;
        if (this.state.currentForm === 'formSearch') {
            current = <div >
                <div className="md-form ">
                    <div className="md-form mt-0">
                        <input
                            type="tel"
                            id="phoneSearch"
                            pattern="[0]{1}[0-9]{9}"
                            className="form-control text-center"
                            placeholder="Enter phone number"
                            aria-label="Search"
                            ref={this.inputSearch}
                        />
                    </div>
                    <span className="notification-search d-flex justify-content-center">
                        {this.state.notificationSearch}
                    </span>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                    <button
                        className="btn blue-gradient"
                        id="btnSearch"
                        onClick={this.onSearch}
                    >Search</button>

                    <button
                        className="btn "
                        id="btnCancel"
                        data-dismiss="modal"
                        onClick={this.close}
                    >Cancel</button>
                </div>
            </div>
        }
        else {
            var {resultSearch}=this.state;
            current = <div >
                <div className="modal-header md-form result-search">

                    <img
                        src={"data:image/jpg;base64," + this.state.resultSearch.Avatar.data}
                        alt="ava"
                        onError={this.loadDefaultImage}
                        className="rounded-circle avatar-search-user"
                    />

                </div>
                <h5 className="mt-1 text-center"><b>{resultSearch.Firstname===''?resultSearch.Username:(resultSearch.Firstname+" "+resultSearch.Lastname)}</b></h5>
                <table className="md-form modal-body tbl-info-result-search">
                    <tbody>
                        <tr>
                            <td>Phone:</td>
                            <td >{resultSearch.Phone}</td>
                        </tr>
                        <tr>
                            <td>Gender:</td>
                            <td >{resultSearch.Gender===0?'Male':'Female'}</td>
                        </tr>
                        <tr>
                            <td>Birthday:</td>
                            <td >{resultSearch.DateOfBirth}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="modal-footer d-flex justify-content-center notification-result-search">
                    {this.state.statusFr}
                </div>
                <div className="modal-footer d-flex justify-content-center">
                    <button
                        className="btn"
                        id="btnPrevious"
                        onClick={this.onPrevious}
                    >Previous</button>
                    <button
                        className="btn blue-gradient"
                        id="btnAdd"
                        onClick={this.sendRequest}
                    >Send request</button>
                    <button
                        className="btn "
                        id="btnCancel"
                        data-dismiss="modal"
                        onClick={this.close}
                    >Cancel</button>
                </div>
            </div>
        }
        return (
            <div>
                <div className="modal fade " id="ModalNewContact" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                    aria-hidden="false" data-backdrop="static">
                    <div className="modal-dialog " role="document">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <h4 className="modal-title w-100 font-weight-bold">Add New Contact</h4>
                                <button type="button" className="close" data-dismiss="modal" onClick={this.close} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div >
                                <form className="modal-body mx-3">
                                    {current}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
