import React from 'react';
import axios from 'axios';
import { Route, Switch, Redirect } from 'react-router-dom';

// my components
import NavBar from '../components/NavBar/NavBar';
import Login from '../components/Login/Login';
import Dashboard from '../components/Dashboard/Dashboard';
import Editor from '../components/Editor/Editor';
import Creator from '../components/Creator/Creator';
import Settings from '../components/Settings/Settings';

const RouteWithNav = ({component, ...rest}) => {
  let isLoggedIn = loggedIn();
  return (
    <div className='view-wrapper'>
      <NavBar />
        <Route {...rest} render={() => (
          isLoggedIn ? (
            <Redirect to='/'/>) : (
            React.createElement(component))
          )
        }/>
    </div>
  )
}

const PageNotFound = () => <h1>Page Not Found</h1>

const loggedIn = () => {
  return axios.get('/account')
       .then(res => res.data.length > 0);
}

export default (
  <Switch>
    <Route exact path='/' component={ Login } />
    <RouteWithNav path='/dashboard' component={ Dashboard }/>
    <RouteWithNav path='/editor/:hunt_id' component={ Editor }/>
    <RouteWithNav path='/creator/:hunt_id' component={ Creator }/>
    <RouteWithNav path='/settings' component={ Settings }/> 
    <Route path='*' component={ PageNotFound }/>
  </Switch>
);
