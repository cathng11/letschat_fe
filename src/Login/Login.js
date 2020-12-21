import './Login.css';
import App from '../Home/App.js';
import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';
import {login} from '../service/UserService';
import Register from '../Register/Register.js';
import dateFormat from 'dateformat';

class Login extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            user : null,
            incorrectLogin : true
        };
        this.userInput=createRef();
        this.passInput=createRef();
    }
    focusUser=()=>
    {
        this.userInput.current.focus();
    }
    focusPass=()=>
    {
        this.passInput.current.focus();
    }
    componentDidMount() {
        if (localStorage && localStorage.getItem('user')) {
            var user = JSON.parse(localStorage.getItem('user'));
            this.userInput.current.value = user[0];
            this.passInput.current.value = user[1];
            this.onLogIn("logged-in");
        }
    }
    onLogIn = (text) => {
        if (text && text==="logged-in") {
            const data = [this.userInput.current.value, this.passInput.current.value, dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"), 'logged-in'];
            login(data).then(result => {
                if  (result !== null) {
                    result.Password = "";
                    this.setState({user: result});
                    ReactDOM.render(
                        <React.StrictMode>
                        <App
                            user = {this.state.user}
                        />
                        </React.StrictMode>,
                        document.getElementById('root')
                    );
                }
                else this.setState({incorrectLogin: false});
            });
        }
        else {
            const data = [this.userInput.current.value, this.passInput.current.value, dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"), 'login'];
            login(data).then(result => {
                if  (result !== null) {
                    localStorage.setItem('user', JSON.stringify([data[0], result.Password]));
                    result.Password = "";
                    this.setState({user: result});
                    ReactDOM.render(
                        <React.StrictMode>
                        <App
                            user = {this.state.user}
                        />
                        </React.StrictMode>,
                        document.getElementById('root')
                    );
                }
                else this.setState({incorrectLogin: false});
            });
        }
        
    }

    onEnterPress = (e) => {
        if (e.key === 'Enter')
        {
            e.preventDefault();
            this.onLogIn();
        }
    }

    onFocus = () => {
        this.setState({incorrectLogin: true});
    }

    render() {
        return (
            <div style={{marginTop:"300px"}} className="login-reg-panel morpheus-den-gradient">
                <div className="login-info-box">
                    <h2>Have an account?</h2>
                    <label id="label-register" htmlFor="log-reg-show">Login</label>
                    <input type="radio" name="active-log-panel" id="log-reg-show" />
                </div>
                            
                <div className="register-info-box">
                    <h2>Don't have an account?</h2>
                    <label id="label-login" htmlFor="log-login-show">Register</label>
                    <input type="radio" name="active-log-panel" id="log-login-show"/>
                </div>
                            
                <div className="white-panel">
                    <div className="login-show">
                        <h2>LOGIN</h2>
                        <input 
                            type="text" 
                            ref={this.userInput} 
                            onClick={this.focusUser}
                            placeholder="Username" 
                        />
                        <input 
                            type="password" 
                            ref={this.passInput}
                            onClick={this.focusPass} 
                            placeholder="Password" 
                            onKeyDown={this.onEnterPress} 
                        />
                        <input type="button" value="Login" onClick={() => this.onLogIn('login')}/>
                        <a href="/#">Forgot password?</a>
                        <p className={this.state.incorrectLogin?"incorrect-login hidden-p":"incorrect-login"}>Username or Password is incorrect</p>
                    </div>
                    
                    <div className="register-show">
                        <h2>REGISTER</h2>
                        <Register/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
