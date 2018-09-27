import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Registration.css';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password1: '',
            password2: ''
        }
    }
    handleInputChange = (e) => {this.setState({[e.target.name]: e.target.value})}
    handleRegistration = (e) => {
        e.preventDefault()
        const creds = { username: this.state.username, password1: this.state.password1, password2: this.state.password2 }
        axios.post('https://lam-mud.herokuapp.com/api/registration/', creds)
            .then(response => {
                sessionStorage.setItem('token', response.data.key)
                this.props.history.push('/game')
            })
            .catch(error => console.log(`Registration: ${error}`))
    }
    render() { 
        return (
            <form className='Registration' onSubmit={this.handleRegistration} autoComplete='off'>
                <h1 className='title'>Create Account Screen</h1>
                <input className='input' name='username' value={this.state.username} placeholder='Username' onChange={this.handleInputChange} />
                <input className='input' name='password1' value={this.state.password1} placeholder='Password' onChange={this.handleInputChange} type='password' />
                <input className='input' name='password2' value={this.state.password2} placeholder='Password again' onChange={this.handleInputChange} type='password' />
                <button className='btn' type='submit' onClick={this.handleRegistration}>Connect</button>
            </form>
        );
    }
}
 
export default Registration;