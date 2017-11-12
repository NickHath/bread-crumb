import React from 'react';

// Mui components and colors
import RaisedButton from 'material-ui/RaisedButton';
import styles from './LoginMuiStyles';
import textLogo from '../../assets/text-logo-white.png';
import breadLogo from '../../assets/bread-logo-white.png';

const Login = () => (
  <div className='landing-wrapper'>
    <div className='landing-nav'>
      <div className='top-left-header'>
        <img className='text-logo' src={ textLogo } />
        <h1>BreadCrumb</h1>
      </div>
    </div>
    <div className='landing'>
      <div className='landing-content'>
        <img className='bread-logo' src={ breadLogo } />
        <h1>Start your adventure.</h1>
        <div className='login-buttons'>
          <a href={ process.env.REACT_APP_LOGIN }>
            <RaisedButton label={<span style={styles.buttonText}>Register</span>} style={ styles.buttonStyle }></RaisedButton>
          </a>
          <a href={ process.env.REACT_APP_LOGIN }>
            <RaisedButton label={<span style={styles.buttonText}>Login</span>} style={ styles.buttonStyle }></RaisedButton>
          </a>
        </div>
        <p>
          Bread crumb is a tool that lets you create and manage scavenger hunts. 
          Using Twilio’s texting API, you can send out your first clue to a friend’s number, then we’ll handle the rest. 
          Plan anything from an anniversary to an interactive history lesson using our scavenger hunt dashboard.
        </p>
      </div>
    </div>
  </div>
);

export default Login;