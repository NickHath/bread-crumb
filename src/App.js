import React, { Component } from 'react';

// components + routes
import router from './router/router';

// SASS styles
import './styles/main.css';

class App extends Component {
  render() {
    return (
      <div className='main-wrapper'>
        { router }
      </div>
    );
  }
}

export default App;
