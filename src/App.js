import React, { Component } from 'react';

// components + routes
import router from './router/router';

// SASS styles
import './styles/main.css';

class App extends Component {
  componentWillMount() {
    console.log(window.location.pathname);
    // if (window.location.pathname)
  }

  render() {
    return (
      <div className='main-wrapper'>
        { router }
      </div>
    );
  }
}

export default App;
