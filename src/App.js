import React, { Component } from 'react';
import LoginForm from './Login';
import GameScreen from './GameScreen';
import Register from './Register';

class App extends Component {
  render() {
    
    return ( 
      <div className="App">
        <Register/>
      </div>
    );
  }
}

export default App;
