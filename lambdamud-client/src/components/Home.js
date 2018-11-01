import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
class Home extends Component {
    state = {
    }
    render() {
        return (
            <div className="home-container">
                <Link to='/Login'> <a>Login</a> </Link>
                <Link to='/Register'> <a>Register</a> </Link>
            </div>
        );
    }
}
export default Home; 