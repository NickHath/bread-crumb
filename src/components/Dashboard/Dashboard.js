import React, { Component } from 'react';
import axios from 'axios';
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
      // scavHunts: [new ScavHunt('25th Anniversary', ['My GF'], ['First Task', 'Second Task', 'Third Task']), new ScavHunt('Freshman Icebreaker', ['Johnny Appleseed', 'Nikola Tesla', 'Sergei Eisenstein'], ['First Task', 'Second Task', 'Third Task', 'Fourth Task']), new ScavHunt('Ms. Clemens 5th Grade History Hunt', ['Little Timmy', 'Jennifer', 'T-bone'], ['First Task', 'Second Task'])],
      hunts: [],
      dummyHunts: [
        {
          title: '25th Wedding Anniversary',
          recipients: ['+14657838457'],
          tasks: [
            {
              task: 'Go to the restaurant where we met',
              hint: 'It\'s Italian',
              answer: 'Grimaldi\'s'
            },
            {
              task: 'Find the park with the blue tree',
              hint: 'South of 42nd',
              answer: 'Old Town\'s Maple'
            }
          ]
        },
        {
          title: 'Ms. Frizzle\' Wacky Ride',
          recipients: ['+16577688349', '+12345678475', '+17689435678', '+11234957687'],
          tasks: [
            {
              task: 'Travel into the bloodstream of an unsuspecting human',
              hint: 'We use magic here',
              answer: 'We didn\'t go to jail, yay!'
            }
          ]
        },
        {
          title: 'Cafe Nero\'s Scavenger Hunt',
          recipients: ['+16577688349', '+12345678475', '+17689435678', '+11234957687', '+15829457689'],
          tasks: [
            {
              task: 'Name the first mayor of Placeholdertown',
              hint: 'Starts with a W',
              answer: 'William Williamson III'
            }
          ]
        },
    ]
    }
    this.refresh = this.refresh.bind(this);
  }

//   componentDidMount() {
//     let hunts = {};
//     axios.get('/scav/hunts')
//          .then(res => {
//             hunts = res.data;
//             hunts.forEach(hunt => {
//               axios.get(`/task/${hunt.hunt_id}`)
//                    .then(res => hunt.tasks = res.data)
//                    .then(() => {
//                       axios.get(`/recipient/${hunt.hunt_id}`)
//                            .then(res => hunt.recipients = res.data)
//                            .then(() => hunts);
//                     })
//             })
//           })
//            .then(() => {
//              console.log('setstate', hunts);
//              this.setState({ hunts: hunts })
//           });
// }

  componentWillMount() { 
    let hunts = []; 
    axios.get('/scav/hunts') 
        .then(res => { 
          hunts = [...res.data]; 
          hunts.forEach(hunt => { 
            axios.get(`/task/${hunt.hunt_id}`) 
                .then(res => hunt.tasks = [...res.data]); 
            axios.get(`/recipient/${hunt.hunt_id}`) 
                .then(res => hunt.recipients = [...res.data]); 
          }) 
          }) 
          .then(() => this.setState({ hunts: hunts }))
    this.refresh();
  } 

  handleInput(huntName) {
    this.setState({ huntName });
  }

  refresh() {
    this.setState(this.state);
  }

  render() {
    console.log('FROM STATE', this.state.hunts);
    console.log('FROM STATE JSON', JSON.stringify(this.state.hunts));
    const scavHunts = this.state.hunts.map((hunt, index) => {
      console.log('hunt from this.state.hunts.map:', hunt);      
      console.log('hunt from this.state.hunts.map JSON:', JSON.stringify(hunt));
      
      console.log('tasks and recipients', hunt.tasks, hunt.recipients);
      let tasks, recipients;
      if (hunt.tasks && hunt.recipients) {
        console.log('We made it into our task and recipient maps!!!');
        tasks = hunt.tasks.map(task => <li>{task.task}</li>);
        recipients = 'with ' + hunt.recipients.join(', ');
      }
      return(
        <Card key={ index } className='scav-hunt-summary'>
          <CardHeader
            title={hunt.title}
            subtitle={recipients}
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