import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// components
import ScavHuntList from '../ScavHuntList/ScavHuntList';

// Mui components and colors
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import styles from './DashboardMuiStyles';

// models
import ScavHunt from '../../models/ScavHunt';

// redux
import { connect } from 'react-redux';
import { updateCurrHunt } from '../../ducks/reducer';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      hunts: [],
      huntName: '',
      error: ''
    }
  }

  componentWillMount() { 
    axios.get('/scav/hunts') 
         .then(res => this.setState({ hunts: res.data }))
  } 

  handleInput(huntName) {
    this.setState({ huntName });
  }

  handleClick() {
    if (!this.state.huntName) {
      this.setState({ error: 'Please name your scavenger hunt' })
    } else {
      let scavHunt = { title: this.state.huntName, description: '' };
      axios.post('/scav/create', scavHunt)
           .then(res => this.props.updateCurrHunt(res.data[0].hunt_id));
    }
  }

  render() {
    const scavHunts = this.state.hunts.map((hunt, index) => {
      let tasks, recipients;
      if (hunt.tasks && hunt.recipients) {
        tasks = hunt.tasks.map(task => <li>{task.task}</li>);
        recipients = [];
        hunt.recipients.forEach(recipient => recipients.push(recipient.phone));
        recipients = 'with ' + recipients.join(', ');
      }
      return(
        <Card key={ index } className='scav-hunt-summary'>
          <CardHeader
            title={hunt.title + ` ${hunt.hunt_id}`}
            subtitle={recipients}
            actasExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <ScavHuntList tasks={ hunt.tasks }/>
            <Link className='link' to='/editor'>
              <RaisedButton label='Edit'
                            style={ styles.buttonStyle }/>
            </Link>
            <RaisedButton label='Send'
                          style={ styles.buttonStyle }/>
          </CardText>
        </Card>
      );
    })
    return(
    <div className='dashboard'>
      <div className='dashboard-contents'>
        <div className='header'>
          <h1>BreadCrumb</h1>        
          <p>Create and send scavenger hunts to your friends</p>
        </div>
        <div className='container scav-hunts'>
          <div className='dashboard-header existing-header'>
            <h2>My scavenger hunts</h2>
          </div>
          { scavHunts }
        </div>
        <div className='container new-scav-hunt'>
          <div className='dashboard-header new-header'>
            <h2>Create a new scavenger hunt</h2>
          </div>
          <TextField placeholder='My scavenger hunt'
                     underlineFocusStyle={styles.underlineFocusStyle} 
                     onChange={ (e) => this.handleInput(e.target.value) }
                     errorText={ this.state.error }
                     />
          {
            this.state.huntName ?
             <Link className='link' to='/creator'>
              <RaisedButton label='Begin' 
                            style={styles.buttonStyle}
                            onClick={ () => this.handleClick() }/>
             </Link> :
             <RaisedButton label='Begin' 
                           style={styles.buttonStyle}
                           onClick={ () => this.handleClick() }/>
          }
        </div>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentHunt: state.currentHunt
  }
}

export default connect(mapStateToProps, { updateCurrHunt })(Dashboard);