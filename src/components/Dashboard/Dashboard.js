import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

// Mui components and colors
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {amber500} from 'material-ui/styles/colors';

// models
import ScavHunt from '../../models/ScavHunt';

// styles
const style = {
  margin: 12,
}

const underlineFocusStyle = {
  borderColor: amber500
}

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      scavHunts: [new ScavHunt('25th Anniversary', ['My GF'], ['First Task', 'Second Task', 'Third Task']), new ScavHunt('Freshman Icebreaker', ['Johnny Appleseed', 'Nikola Tesla', 'Sergei Eisenstein'], ['First Task', 'Second Task', 'Third Task', 'Fourth Task']), new ScavHunt('Ms. Clemens 5th Grade History Hunt', ['Little Timmy', 'Jennifer', 'T-bone'], ['First Task', 'Second Task'])]
    }
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
    <div className='wrapper'>
    <div className='dashboard'>
      <div className='dashboard-contents'>
        <div className='header'>
          <h1>BreadCrumb</h1>        
          <p>Send scavenger hunts to your friends using text messaging.</p>
        </div>
        <div className='container scav-hunts'>
          <h2>My scavenger hunts</h2>
          { scavHunts }
        </div>
        <div className='container new-scav-hunt'>
          <h2>Create a new scavenger hunt</h2>
          <TextField placeholder='My scavenger hunt'
                     underlineFocusStyle={underlineFocusStyle} />
          <Link className='link' to='/creator'><RaisedButton label='Begin' style={style}/></Link>
        </div>
      </div>
    </div>
    </div>
    );
  }
}