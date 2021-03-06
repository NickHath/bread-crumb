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

const RouteWithNav = ({component, ...rest}) => {
  return (
    <div className='view-wrapper'>
      <NavBar />
      <Route {...rest} render={() => React.createElement(component)}/>
    </div>
  )
}

// Async prevents routing users to unauthorized pages
const RouteWithNavAndAuth = ({component, ...rest}) => {
  // check if user is logged in
  let isLoggedIn = axios.get('/account')
                        .then(res => res.data.length > 0);

  return (
    <div className='view-wrapper'>
     <NavBar />
      <Async promise={isLoggedIn} then={ val => {
        return (

            <Route {...rest} render={() => {
              return val ? 
                React.createElement(component) :
                <Redirect to ='/'/>
            }}/>
        )
      }}/>      
    </div>
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
    <RouteWithNavAndAuth path='/editor/:hunt_id' component={ Editor }/>
    <RouteWithNavAndAuth path='/creator/:hunt_id' component={ Creator }/>
    <RouteWithNavAndAuth path='/settings' component={ Settings }/> 
    <Route path='*' component={ PageNotFound }/>
  </Switch>
);

