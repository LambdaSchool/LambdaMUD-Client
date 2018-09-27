import React from "react";
import Login from "./Login";

const Authenticate = App =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoggedIn: false
      };
    }
    componentDidMount() {
      if (!localStorage.getItem("user")) {
        this.setState({ isLoggedIn: false });
      } else {
        this.setState({ isLoggedIn: true });
      }
    }
    render() {
      if (this.state.isLoggedIn) return <App />;
      return <Login />;
    }
  };

export default Authenticate;