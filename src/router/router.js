import React from 'react';
import { Route, Switch } from 'react-router-dom';

// my components
import NavBar from '../components/NavBar/NavBar';
import Login from '../components/Login/Login';
import Dashboard from '../components/Dashboard/Dashboard';
import Editor from '../components/Editor/Editor';
import Creator from '../components/Creator/Creator';
import Settings from '../components/Settings/Settings';

import MuiListTest from '../components/MuiTesting/MuiListTest';

const RouteWithNav = ({component, ...rest}) => {
  return (
    <div className='view-wrapper'>
      <NavBar />
      <Route {...rest} render={() => React.createElement(component)}/>
    </div>
  )
}

const PageNotFound = () => <h1>Page Not Found</h1>

export default (
  <Switch>
    <Route exact path='/' component={ Login }/>
    <RouteWithNav path='/dashboard' component={ Dashboard }/>
    <RouteWithNav path='/editor' component={ Editor }/>
    <RouteWithNav path='/creator' component={ Creator }/>
    <RouteWithNav path='/settings' component={ Settings }/>
    <Route path='/list' component={ MuiListTest }/>
    <Route path='*' component={ PageNotFound }/>
  </Switch>
);
