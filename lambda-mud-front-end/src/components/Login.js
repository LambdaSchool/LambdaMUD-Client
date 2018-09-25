import React from 'react';
import '../App.css';

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  login = () => {
    // localStorage.setItem("username", this.state.username);
    // localStorage.setItem("password", this.state.password);
    // window.location.reload();
  }

  render() {
    return (
      <div className="login-container">
        <form onSubmit={this.login}>
          <input type="text"
                 name="username"
                 placeholder="Username"
                 value={this.state.username}
                 onChange={this.handleInputChange} />
          <input type="password"
                 name="password"
                 placeholder="Password"
                 value={this.state.password}
                 onChange={this.handleInputChange} />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
