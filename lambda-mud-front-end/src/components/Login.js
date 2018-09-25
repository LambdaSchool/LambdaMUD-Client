import React from 'react';
import '../App.css';

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  }

  handleUsername = event => {
    this.setState({ username: event.target.value });
  }

  handlePassword = event => {
    this.setState({ password: event.target.value });
  }

  login = () => {
    localStorage.setItem("username", this.state.username);
    localStorage.setItem("password", this.state.password);
    window.location.reload();
  }

  render() {
    return (
      <div className="login-container">
        <form onSubmit={this.login}>
          <input type="text"
                 placeholder="Username"
                 value={this.state.username}
                 onChange={this.handleUsername} />
          <input type="password"
                 placeholder="Password"
                 value={this.state.password}
                 onChange={this.handlePassword} />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
