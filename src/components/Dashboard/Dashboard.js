import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';
import './Dashboard.css';

// Mui components and colors
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {yellow500} from 'material-ui/styles/colors';

// models
import ScavHunt from '../../models/ScavHunt';

// styles
const style = {
  margin: 12
}

const underlineFocusStyle = {
  borderColor: yellow500
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
    <NavBar />  
    <div className='dashboard'>
      <div className='dashboard-contents'>
        <div className='header'>
          <h1>Bread Crumb</h1>        
          <p>Start your journey. Create and manage multiple scavenger hunts at once.</p>
        </div>
        <div className='container scav-hunts'>
          { scavHunts }
        </div>
        <div className='container new-scav-hunt'>
          <TextField placeholder='Create a new scavenger hunt'
                     underlineFocusStyle={underlineFocusStyle} />
          <Link className='link' to='/creator'><RaisedButton label='Begin' style={style}/></Link>
        </div>
      </div>
    </div>
    </div>
    );
  }
}