import React, { Component, createRef } from 'react'
import tempAvatar from '../../../../ava.jpg'
import { updateUserProfile } from '../../../../service/UserService';
import Resizer from 'react-image-file-resizer'
class UpdateProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Firstname: "",
            Lastname: "",
            DateOfBirth: "",
            Phone: "",
            Email: "",
            Address: "",
            City: "",
            Avatar: {
                type: "Buffer",
                data: Array(0)
            },
            Gender: 0,
            Username: "",
            notification: "",
            file: "",
            user: null
        }
        this.inputFile = createRef()
    }
    componentDidMount() {
        var { infoUser } = this.props;
        if (infoUser !== null) {
            this.setState({
                Username: infoUser.Username,
                Firstname: infoUser.Firstname,
                Lastname: infoUser.Lastname,
                DateOfBirth: infoUser.DateOfBirth,
                Phone: infoUser.Phone,
                Email: infoUser.Email,
                Address: infoUser.Address,
                City: infoUser.City,
                Avatar: infoUser.Avatar,
                Gender: infoUser.Gender
            })
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (props.infoUser !== state.infoUser && props.infoUser !== null) {
            return {
                infoUser: props.infoUser
            }
        }
        return null;

    }
    onHandleChange = (event) => {
        var target = event.target;
        var names = target.name;
        var values = target.value;
        if (names === 'Gender') {
            values = target.value === '0' ? 0 : 1;
        }
        this.setState({
            [names]: values
        })
    }
    updateUserProfile = async (e) => {
        e.preventDefault();
        await updateUserProfile(this.state)
            .then(res => {
                this.setState({
                    notification: res.result
                })
            }).catch(err => console.log(err));
    }
    resizeFile = (file) => new Promise(resolve => {
        Resizer.imageFileResizer(file, 150, 150, 'JPEG', 100, 0,
            uri => {
                resolve(uri);
            },
            'base64'
        );
    })
    _onChange = (e) => {
        var target = e.target.files[0];
        const image = this.resizeFile(target);
        image.then(res => {
            var r = res.slice(res.indexOf(',') + 1);
            this.setState({
                Avatar: r,
                file: r
            });
        });
    }
    loadDefaultImage = (e) => {
        e.target.src = tempAvatar;
    }
    close =async () => {
        this.props.newAvatar(this.state);
        await this.setState({
            Firstname: "",
            Lastname: "",
            DateOfBirth: "",
            Phone: "",
            Email: "",
            Address: "",
            City: "",
            Avatar: {
                type: "Buffer",
                data: Array(0)
            },
            Gender: 0,
            Username: "",
            notification: "",
            file: ""
        });
    }
    render() {
        return (
            <div>
                <div className="modal fade"
                    id="modalUpdateProfile" tabIndex="-1" role="dialog" data-backdrop="static" aria-labelledby="myModalLabel">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="file-field text-center">
                                    <div className="mb-1">
                                        <img
                                            src={ this.state.Avatar.data !== undefined ? "data:image/jpg;base64," + (new Buffer(this.state.Avatar.data).toString('base64')) :
                                            "data:image/jpg;base64," + this.state.Avatar}
                                            alt="ava"
                                            onError={this.loadDefaultImage}
                                            className="rounded-circle img-responsive modal-title avatar-pic"
                                        />
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <label className="btn btn-rounded float-center">
                                            <input
                                                type="file"
                                                style={{ display: "none" }}
                                                onChange={this._onChange}
                                                ref={this.inputFile}
                                            />
                                            Upload Avatar
                                        </label>
                                    </div>
                                </div>
                                <button type="button" className="close" onClick={this.close} data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <h5 className="mt-1 text-center"><b>
                                {this.state.Username}</b></h5>
                            <div className="modal-body mx-3 ">
                                <form onSubmit={this.updateUserProfile}>
                                    <table className="tbl-update-profile mb-5">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="md-form form-sm mb-1">
                                                        <i className="fas fa-phone-volume prefix grey-text"></i>
                                                        <input
                                                            type="tel"
                                                            id="phone"
                                                            className="form-control"
                                                            pattern="[0]{1}[0-9]{9}"
                                                            placeholder="Phone"
                                                            name="Phone"
                                                            defaultValue={this.state.Phone}
                                                            onChange={this.onHandleChange}
                                                            required="required"
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="md-form form-sm mb-1">
                                                        <i className="fas fa-envelope prefix grey-text"></i>
                                                        <input
                                                            type="text"
                                                            id="email"
                                                            className="form-control"
                                                            placeholder="Email"
                                                            data-error="wrong"
                                                            data-success="right"
                                                            name="Email"
                                                            defaultValue={this.state.Email}
                                                            onChange={this.onHandleChange}
                                                            required="required"
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="md-form form-sm mb-1">
                                                        <i className="fas fa-signature prefix grey-text"></i>
                                                        <input
                                                            type="text"
                                                            id="firstname"
                                                            className="form-control"
                                                            placeholder="Firstname"
                                                            name="Firstname"
                                                            defaultValue={this.state.Firstname}
                                                            onChange={this.onHandleChange}
                                                            required="required"
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="md-form form-sm mb-1">
                                                        <i className="fas fa-signature prefix grey-text"></i>
                                                        <input
                                                            type="text"
                                                            id="lastname"
                                                            className="form-control"
                                                            placeholder="Lastname"
                                                            name="Lastname"
                                                            defaultValue={this.state.Lastname}
                                                            onChange={this.onHandleChange}
                                                            required="required"
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="md-form form-sm mb-1">
                                                        <i className="fas fa-birthday-cake prefix grey-text"></i>
                                                        <input
                                                            type="date"
                                                            id="dateofbirth"
                                                            className="form-control grey-text "
                                                            name="DateOfBirth"
                                                            defaultValue={this.state.DateOfBirth}
                                                            onChange={this.onHandleChange}
                                                            required="required"
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="md-form form-sm mb-1">
                                                        <i className="fas fa-map-marker-alt prefix grey-text"></i>
                                                        <input
                                                            type="text"
                                                            id="address"
                                                            className="form-control"
                                                            placeholder="Address"
                                                            name="Address"
                                                            defaultValue={this.state.Address}
                                                            onChange={this.onHandleChange}
                                                            required="required"
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="md-form form-sm mb-1">
                                                        <i className="fas fa-building prefix grey-text"></i>
                                                        <input
                                                            type="text"
                                                            id="city"
                                                            className="form-control"
                                                            placeholder="City"
                                                            name="City"
                                                            defaultValue={this.state.City}
                                                            onChange={this.onHandleChange}
                                                            required="required"
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="md-form form-sm mb-1">
                                                        <span className="radio-gender">
                                                            <input
                                                                type="radio"
                                                                name="Gender"
                                                                defaultValue={0}
                                                                checked={this.state.Gender === 0}
                                                                onChange={this.onHandleChange}
                                                            />
                                                &nbsp;Male &nbsp;&nbsp;&nbsp;
                                                <input
                                                                type="radio"
                                                                name="Gender"
                                                                defaultValue={1}
                                                                checked={this.state.Gender === 1}
                                                                onChange={this.onHandleChange}
                                                            />
                                                &nbsp;Female
                                                </span>

                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="modal-footer d-flex justify-content-center">
                                        <span className="update-profile-notification" >{this.state.notification}</span>
                                    </div>
                                    <div className="modal-footer d-flex justify-content-center">
                                        <input
                                            type="submit"
                                            value="Update"
                                            id="updateProf"
                                            className="btn btn-primary morpheus-den-gradient"
                                        />
                                        <button className="btn" data-dismiss="modal" onClick={this.close}>Cancel</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateProfile
