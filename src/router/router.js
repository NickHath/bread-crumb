import React from 'react';
import axios from 'axios';
import { Route, Switch, Redirect } from 'react-router-dom';
import Async from 'react-promise';

// my components
import NavBar from '../components/NavBar/NavBar';
import Login from '../components/Login/Login';
import Dashboard from '../components/Dashboard/Dashboard';
import Editor from '../components/Editor/Editor';
import Creator from '../components/Creator/Creator';
import Settings from '../components/Settings/Settings';


// Async prevents routing users to unauthorized pages
const RouteWithNav = ({component, ...rest}) => {
  // check if user is logged in
  let isLoggedIn = axios.get('/account')
                        .then(res => res.data.length > 0);

  return (
    <Async promise={isLoggedIn} then={ val => {
      return (
        <div className='view-wrapper'>
          <NavBar />
          <Route {...rest} render={() => {
            return val ? 
              React.createElement(component) :
              <Redirect to ='/'/>
          }}/>
        </div>
      )
    }}/>
  )
}

const PageNotFound = () => <h1>Page Not Found</h1>

const loggedIn = async () => {
  let isLoggedIn;
  isLoggedIn = await axios.get('/account')
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

