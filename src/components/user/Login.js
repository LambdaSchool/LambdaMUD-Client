import React, { Component } from 'react';
import axios from 'axios';

import { Section, Form } from './UserStyles';


class Login extends Component {
  state = {
    logFetching: false, // loading
    logfetchSuccess: null, // new state
    logfetchFailure: null, // error mssg
    username: '',
    password: ''
  }

  onInputChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  onLoginSubmit = (e) => {
    e.preventDefault();
    // logFetching: true
    // Loader START current view
    axios({
      method: 'post',
      url: 'https://heromudapp.herokuapp.com/api/login',
      data: {
        username: this.state.username,
        password: this.state.password
      }
    })
    .then(res => {
      // logFetching: false
      // logfetchSuccess: true

      // DO
      // Loader END current view
      // Send new View - Initializing player
      this.setState({username: '', password: ''});
      this.props.initPlayer(res.data.key);
    })
    .catch(err => {
      // logFetching: false
      // logfetchFailure: true

      // errors
      // user does not exist
      // wrong password

      // DO
      // Loader END current view
      // Update current view to reflect error
      console.log('ERROR', err.response.data.error);
    });
  }

  render() {
    return (
      <Section log>
        <h2>Login</h2>
        <Form onSubmit={this.onLoginSubmit}>
          <div>
            <label htmlFor="loginUsername">Username</label>
            <input
              type="text"
              id="loginUsername"
              name="username"
              value={this.state.username}
              onChange={this.onInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="loginPassword">Password</label>
            <input
              type="password"
              id="loginPassword"
              name="password"
              value={this.state.password}
              onChange={this.onInputChange}
              required
            />
          </div>
          <button type="submit">Log In</button>
        </Form>
      </Section>
    )
  }
}

export default Login;
