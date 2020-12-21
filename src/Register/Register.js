import React, { Component } from 'react'
import { checkRegister } from '../service/UserService';
import ava from '../ava.jpg';
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            pass: "",
            confirmPass: "",
            phone: "",
            notification:"",
            avatar: {ava}
        }
    }
    onRegister = (event) => {
        event.preventDefault();
        if(this.checkInput()===true)
        {
            this.checkRegister(this.state);
        }
        else
        {
            this.setState({
                notification: "Confirm password doesn't match"
            })
        }
    }
    checkInput=()=>
    {
        var {pass,confirmPass}=this.state;
        if(pass!==confirmPass) return false;
        else return true;
    }
    checkRegister=(data)=>
    {
         checkRegister(data)
        .then(res=>
            {
                this.setState({
                    notification : res.result
                })
            }).catch(err => console.log(err));
    }
    onHandleChange=(event)=>
    {
		var target=event.target;
		var names=target.name;
		var values=target.value;
		this.setState({
			[names]: values
        });
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onRegister}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    required="required"
                    value={this.state.username}
                    onChange={this.onHandleChange} />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    required="required"
                    pattern="[0]{1}[0-9]{9}"
                    value={this.state.phone}
                    onChange={this.onHandleChange} />
                <input
                    type="password"
                    name="pass"
                    placeholder="Password"
                    required="required"
                    value={this.state.pass}
                    onChange={this.onHandleChange} />
                <input
                    type="password"
                    name="confirmPass"
                    placeholder="Confirm Password"
                    required="required"
                    value={this.state.confirmPass}
                    onChange={this.onHandleChange} />
                <span div="register-notification" style={{color:"red"}}>{this.state.notification}</span>
                <input type="submit" value="Register" />
                </form>
            </div>
        )
    }
}
