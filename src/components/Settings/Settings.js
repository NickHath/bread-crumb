import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './SettingsMuiStyles';

// redux
// import { connect } from 'react-redux';
// import { updateAccount } from '../../ducks/reducer';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      first: '',
      last: '',
      email: ''
    }
  }
  sendUpdatedSettings() {
    // update db with new user data
    let first_name = this.refs.first.input.value;
    let last_name = this.refs.last.input.value;
    let email = this.refs.email.input.value;
    // this.props.updateAccount(first_name, last_name, email);
    axios.put(`/account/edit`, { first_name, last_name, email });
  }

  componentWillMount() {
    axios.get('/account')
         .then(res => {
           console.log('SETTINGS:\n', res.data);
           const { first_name, last_name, email } = res.data[0];
           this.setState({ first: first_name, last: last_name, email: email })
          //  this.props.updateAccount(first_name, last_name, email);
         })
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
                         ref='first'
                         onChange={(e) => this.setState({ first: e.target.value })}
                         value={this.state.first ? this.state.first[0].toUpperCase() + this.state.first.slice(1) : ''}/>
            </div>
            <div className='settings-input'>
              <h2>Last Name</h2>
              <TextField underlineFocusStyle={styles.underlineFocusStyle}
                         ref='last'
                         onChange={(e) => this.setState({ last: e.target.value })}
                         value={this.state.last ? this.state.last[0].toUpperCase() + this.state.last.slice(1) : ''}/>
            </div>
            <div className='settings-input'>
              <h2>Email</h2>
              <TextField underlineFocusStyle={styles.underlineFocusStyle}
                         ref='email'
                         onChange={(e) => this.setState({ email: e.target.value })}
                         value={this.state.email}/>
            </div>
            <Link className='link' to='/dashboard'>
              <RaisedButton label='Save' 
                            style={styles.buttonStyle}
                            onClick={() => this.sendUpdatedSettings()}/>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return {
//     first: state.first,
//     last: state.last,
//     email: state.email
//   }
// }

// export default connect(mapStateToProps, { updateAccount })(Settings);
export default Settings;