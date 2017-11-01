import React, { Component } from 'react';

// components + routes
import router from './router/router';
import NavBar from './components/NavBar';

// SASS styles
import './styles/main.css';

class App extends Component {
  render() {
    return (
      <div className='main-wrapper'>
        <NavBar />
        { router }
      </div>
    );
  }
}

export default App;
