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
        var check = this.checkInput();
        if(this.checkInput()===true)
        {
            this.checkRegister(this.state);
        }
        else
        {
            this.setState({
                notification: check
            })
        }
    }
    checkInput=()=>
    {
        var {username, pass,confirmPass}=this.state;
        var countUsername = username.split(' ');
        if (countUsername.length > 1) return "Username must not contain spaces";
        var countPass = pass.split(' ');
        if (countPass.length > 1) return "Password must not contain spaces";
        if (pass.length < 8) return "Password must be at least 8 characters";
        if (pass !== confirmPass) 
            return  "Confirm password doesn't match";
        return true;
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
        this.setState({notification: ""});
		var target=event.target;
		var names=target.name;
        var values=target.value;
        var count = values.split(' ');
        if (count.length > 1) this.setState({notification: "Contain spaces"});
        if (names === 'pass' && values.length < 8) this.setState({notification: "Password must be at least 8 characters"});
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
