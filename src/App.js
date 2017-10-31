import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

// my components
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Editor from './components/Editor/Editor';
import Creator from './components/Creator/Creator';
import Settings from './components/Settings/Settings';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={ Login }/>
          <Route path='/dashboard' component={ Dashboard }/>
          <Route path='/editor' component={ Editor }/>
          <Route path='/creator' component={ Creator }/>
          <Route path='/settings' component={ Settings }/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
