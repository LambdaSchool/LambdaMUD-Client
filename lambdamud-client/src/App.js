import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login';
import Register from './components/Register';
import Game from './components/Game';
import './App.css';
class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Route exact path="/" component={Home} />
        <Route exact path='/login' component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/play" component={Game} />
      </div>
    );
  }
}
export default App;