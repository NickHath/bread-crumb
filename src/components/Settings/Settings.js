import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './SettingsMuiStyles';

// redux
import { connect } from 'react-redux';
import { updateAccount } from '../../ducks/reducer';

class Settings extends Component {
  sendUpdatedSettings() {
    // update db with new user data
    let first_name = this.refs.first.input.value;
    let last_name = this.refs.last.input.value;
    let email = this.refs.email.input.value;
    this.props.updateAccount(first_name, last_name, email);
    axios.put(`/account/edit`, { first_name, last_name, email });
  }

  render() {
    console.log(this.props);
    return(
      <div className='settings-wrapper'>
        <div className='settings'>
          <div className='container settings-contents'>
            <h1>Settings</h1>
            <div className='settings-input'>
              <h2>First Name</h2>
              <TextField underlineFocusStyle={styles.underlineFocusStyle}
                         ref='first'
                         defaultValue={this.props.first}/>
            </div>
            <div className='settings-input'>
              <h2>Last Name</h2>
              <TextField underlineFocusStyle={styles.underlineFocusStyle}
                         ref='last'
                         defaultValue={this.props.last}/>
            </div>
            <div className='settings-input'>
              <h2>Email</h2>
              <TextField underlineFocusStyle={styles.underlineFocusStyle}
                         ref='email'
                         defaultValue={this.props.email}/>
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

function mapStateToProps(state) {
  return {
    first: state.first,
    last: state.last,
    email: state.email
  }
}

export default connect(mapStateToProps, { updateAccount })(Settings);