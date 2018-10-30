import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Game from './components/game';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app-container">
      <Route exact path="/" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/Game" component={Game}/>
      </div>
    );
  }
}

export default App;
