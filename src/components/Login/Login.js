import React from 'react';
import './Login.css';

// Mui components and colors
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12
}

const Login = () => (
  <div className='landing-wrapper'>
    <div className='landing-nav'>
      <h1>BreadCrumb</h1>
    </div>
    <div className='landing'>
      <div className='landing-content'>
        <i className='fa fa-book' style={{"color": "white"}}/>      
        <h1>Start your adventure.</h1>
        <div className='login-buttons'>
          <a href={ process.env.REACT_APP_LOGIN }>
            <RaisedButton label={<span style={{ color: '#FFA000', fontWeight: 700 }}>Register</span>} style={ style }></RaisedButton>
          </a>
          <a href={ process.env.REACT_APP_LOGIN }>
            <RaisedButton label={<span style={{ color: '#FFA000', fontWeight: 700 }}>Login</span>} style={ style }></RaisedButton>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Login;