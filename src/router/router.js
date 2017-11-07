import React from 'react';
import { Route, Switch } from 'react-router-dom';

// my components
import NavBar from '../components/NavBar/NavBar';
import Login from '../components/Login/Login';
import Dashboard from '../components/Dashboard/Dashboard';
import Editor from '../components/Editor/Editor';
import Creator from '../components/Creator/Creator';
import Settings from '../components/Settings/Settings';

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
    <RouteWithNav path='/editor/:hunt_id' component={ Editor }/>
    <RouteWithNav path='/creator/:hunt_id' component={ Creator }/>
    <RouteWithNav path='/settings' component={ Settings }/>
    <Route path='*' component={ PageNotFound }/>
  </Switch>
);
