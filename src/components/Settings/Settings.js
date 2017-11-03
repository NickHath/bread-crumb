import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './SettingsMuiStyles';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      first: '',
      last: '',
      email: '',
      phone: ''
    }
  }

  sendUpdatedSettings() {
    // update db with new user data
    this.setState({
      first: this.refs.first.input.value,
      last: this.refs.last.input.value,
      email: this.refs.email.input.value,
      phone: this.refs.phone.input.value
    })
    console.log(this.state);
  }

  componentWillUpdate() {
    // set state to user info, render as placeholders for input fields
    axios.get('/account')
         .then(account => console.log('In Settings:', account));
  }

  render() {
    return(
      <div className='settings-wrapper'>
        <div className='settings'>
          <div className='container settings-contents'>
            <h1>Settings</h1>
            <div className='settings-input'>
              <h2>First Name</h2>
              <TextField underlineFocusStyle={styles.underlineFocusStyle}
                         ref='first'/>
            </div>
            <div className='settings-input'>
              <h2>Last Name</h2>
              <TextField underlineFocusStyle={styles.underlineFocusStyle}
                         ref='last'/>
            </div>
            <div className='settings-input'>
              <h2>Email</h2>
              <TextField underlineFocusStyle={styles.underlineFocusStyle}
                         ref='email'/>
            </div>
            <div className='settings-input'>
              <h2>Phone</h2>
              <TextField underlineFocusStyle={styles.underlineFocusStyle}
                         ref='phone'/>
            </div>
            <Link className='link' to='/dashboard'>
              <RaisedButton label='Save' 
                            style={styles.buttonStyle}
                            onClick={() => this.sendUpdatedSettings}/>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings;