import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// SASS styles
import './styles/main.css';

// my components
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Editor from './components/Editor';
import Creator from './components/Creator';
import Settings from './components/Settings';

import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <div className='main-wrapper'>
        <NavBar />
        <Switch>
          <Route exact path='/' component={ Login }/>
          <Route path='/dashboard' component={ Dashboard }/>
          <Route path='/editor' component={ Editor }/>
          <Route path='/creator' component={ Creator }/>
          <Route path='/settings' component={ Settings }/>
        </Switch>
      </div>
    );
  }
}

export default App;
