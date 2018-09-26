import React, { Component } from 'react';

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value })
  };

  render() {
    return (
      <div>
        <form>
          <input type='text' placeholder='username' onChange={this.handleInput} value={this.state.username} />
          <input type='password' placeholder='password' onChange={this.handleInput} value={this.state.password} />
          <button>Login!</button>
        </form>
        <div>
          <p>New to LambdaMUD?</p>
          <button>Register!</button>
        </div>
      </div>
    );
  };
};



export default Login;