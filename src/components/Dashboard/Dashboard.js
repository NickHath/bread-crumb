import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Mui components and colors
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import styles from './DashboardMuiStyles';

// models
import ScavHunt from '../../models/ScavHunt';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      scavHunts: [new ScavHunt('25th Anniversary', ['My GF'], ['First Task', 'Second Task', 'Third Task']), new ScavHunt('Freshman Icebreaker', ['Johnny Appleseed', 'Nikola Tesla', 'Sergei Eisenstein'], ['First Task', 'Second Task', 'Third Task', 'Fourth Task']), new ScavHunt('Ms. Clemens 5th Grade History Hunt', ['Little Timmy', 'Jennifer', 'T-bone'], ['First Task', 'Second Task'])],
      huntName: ''
    }
  }

  handleInput(huntName) {
    this.setState({ huntName });
  }

  render() {
    const scavHunts = this.state.scavHunts.map(hunt => {
      const tasks = hunt.tasks.map(task => <li>{task}</li>);
      return(
        <Card className='scav-hunt-summary'>
          <CardHeader
            title={hunt.title}
            subtitle={`with ${hunt.recipients.join(', ')}`}
            actasExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <ul>
              {tasks}
            </ul>
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
          <h2>My scavenger hunts</h2>
          { scavHunts }
        </div>
        <div className='container new-scav-hunt'>
          <h2>Create a new scavenger hunt</h2>
          <TextField placeholder='My scavenger hunt'
                     underlineFocusStyle={styles.underlineFocusStyle} 
                     onChange={ (e) => this.handleInput(e.target.value) }/>
          <Link className='link' to='/creator'><RaisedButton label='Begin' style={styles.buttonStyle}/></Link>
        </div>
      </div>
    </div>
    );
  }
}