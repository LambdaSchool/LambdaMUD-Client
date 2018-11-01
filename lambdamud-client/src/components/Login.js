import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';
class Login extends Component {
    state = {
        username: '',
        password: '',
        authorized: false,
        response: {
            status: 201,
            content: {}
        }
    }
    inputChangeHandler = event => {
        this.setState({ [event.target.name]: event.target.value })
    };
    submitHandler = event => {
        event.preventDefault();
        const credentials = {
            username: this.state.username,
            password: this.state.password
        }
        //const local = 'http://127.0.0.1:8000'
        const herokuUrl = 'https://jenniferplayer-lambdamud.herokuapp.com'
        axios.post(`${herokuUrl}/api/login`, credentials).then(res => {
            console.log(res.data);
            const token = res.data.key;
            localStorage.setItem('key', token);
            this.setState({ 
                authorized: true,
                response: { status: 201, content: {} }
             });
        })
            .catch(err => {
                const error = {
                    status: err.response.status,
                    content: err.response.data
                }
                this.setState({
                    response: error
                })
            });
        console.log('state', this.state);
    };
    render() {
        return (
            <div className="login-container">
                <form className='login-form' onSubmit={this.submitHandler}>
                    <h1>Sign In</h1>
                    <div>
                        <p>Username</p>
                        <input
                            value={this.state.username}
                            onChange={this.inputChangeHandler}
                            placeholder="Username"
                            type="text"
                            name="username" />
                    </div>
                    <div>
                        <p>Password</p>
                        <input
                            value={this.state.password}
                            onChange={this.inputChangeHandler}
                            placeholder="Password"
                            type="password"
                            name="password" />
                    </div>
                    <div>
                        <button type="submit">
                            Sign In
                        </button>
                    </div>
                    <Link to='/Register'> <a>Don't have an account? Register Here</a> </Link>
                    <div> <p>{this.state.response.content.error}</p></div>
                    {this.state.authorized ? <div className='play-link'><Link to="/play"> Start</Link></div> : null}
                </form>
            </div>
        );
    }
}
export default Login; 