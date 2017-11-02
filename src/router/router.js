import React from 'react';
import { Route, Switch } from 'react-router-dom';

// my components
import NavBar from '../components/NavBar';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import Editor from '../components/Editor';
import Creator from '../components/Creator';
import Settings from '../components/Settings';

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
    <Route path='*' component={ PageNotFound }/>
  </Switch>
);
