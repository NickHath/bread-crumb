import React from 'react';
import { Route, Switch } from 'react-router-dom';

// my components
import NavBar from '../components/NavBar';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import Editor from '../components/Editor';
import Creator from '../components/Creator';
import Settings from '../components/Settings';

const RouteWithLayout = ({component, ...rest}) => {
  return (
    <div className='view-wrapper'>
      <NavBar />
      <Route {...rest} render={() => React.createElement(component)}/>
    </div>
  )
}


export default (
  <Switch>
    <Route exact path='/' component={ Login }/>
    <Route path='/dashboard' component={ Dashboard }/>
    <Route path='/editor' component={ Editor }/>
    <Route path='/creator' component={ Creator }/>
    <Route path='/settings' component={ Settings }/>
  </Switch>
);
