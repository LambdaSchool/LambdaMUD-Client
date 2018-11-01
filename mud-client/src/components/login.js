// This component handles login actions

import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  // Makes a request and stores the response as a token
  signin = e => {
    e.preventDefault();
    console.log(this.state);

    axios
      .post('https://lambdamud-jp.herokuapp.com/api/login/', this.state)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('jwt', res.data.key);
        this.props.history.push('/adventure');
      })
      .catch(err => {
        console.error(err);
      });
  };

  // Handles the text input and pushes to state
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    console.log('login');
    return (
      <form onSubmit={this.signin}>
        <div>
          <label>Username</label>
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            type="text"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </div>
        <div>
          <button type="submit">Signin</button>
        </div>
      </form>
    );
  }
}

export default Login;
