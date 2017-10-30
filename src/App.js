import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import OldDashboard from './components/OldDashboard/OldDashboard';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={ Login }/>
          <Route path='/dashboard' component={ Dashboard }/>
          <Route path='/olddashboard' component={ OldDashboard }/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
