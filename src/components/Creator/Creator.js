import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Material UI
import styles from './CreatorMuiStyles';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ControlPoint from 'material-ui-icons/ControlPoint';


export default class Creator extends Component{
  constructor() {
    super();
    this.state = {
      recipients: ['+1234567890', '+1234567890'],
      numTasks: 1,
    }
    this.sendScavengerHunt = this.sendScavengerHunt.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  addTask() {
    this.setState({ numTasks: ++this.state.numTasks });
  }

  handleRequestDelete() {
    console.log('Someone is tring to delete me!');
  }

  // stores recipients and tasks (which are associated to a hunt_id)
  sendScavengerHunt() {
    // SEND ARRAY OF RECIPIENTS, ONE AT A TIME
    // test with boilerplate
    this.state.recipients.forEach(recipient => {
      axios.post('/recipient/create', 
      { 
        first_name: '', 
        last_name: '', 
        phone: recipient, 
        hunt_id: 3 
      });
    })
    
    // send hunts one at a time
    // hardcoded hunt_id 3
    for (let i = 1; i <= this.state.numTasks; i++) {
      let currentTask = `prompt${i}`, currentHint = `hint${i}`, currentAnswer = `answer${i}`;
      let task = {
        task: this.refs[currentTask].input.value,
        hint: this.refs[currentHint].input.value,
        answer: this.refs[currentAnswer].input.value,
        hunt_id: 3
      }
      axios.post('/task/create', task);
    }
  }

  render() {
    let allTasks = [];
    for (let i = 1; i <= this.state.numTasks; i++) {
      allTasks.push(
        <div key={i} className='creator-task'>
          <h2>Task #{i}</h2>
          <TextField className='prompt' 
                    placeholder='Task Description' 
                    underlineFocusStyle={styles.taskFocusStyle}
                    ref={`prompt${i}`}/>
          <TextField className='hint' 
                    placeholder='Hint' 
                    underlineFocusStyle={styles.hintFocusStyle}
                    ref={`hint${i}`}/>
          <TextField className='answers' 
                    placeholder='Accepted Answers' 
                    underlineFocusStyle={styles.answerFocusStyle}
                  ref={`answer${i}`}/>
        </div> 
      )
    }

    return(
      <div className='creator-wrapper'>
      <div className='creator'>
        <div className='container creator-contents'>
          <h1 className='creator-heading'>New Scavenger Hunt</h1>
          <h2>Recipients:</h2>              
          <div className='recipients' style={ styles.wrapper }>
            <Chip style={ styles.chip } onRequestDelete={this.handleRequestDelete}>+1727654164</Chip>
            <Chip style={ styles.chip } onRequestDelete={this.handleRequestDelete}>+1234567890</Chip>
          </div>
          { allTasks }
          <div className='new-task'>
            <h2>Add New Task</h2>            
            <IconButton iconStyle={ styles.iconStyle } 
                        style={ styles.iconWrapper }
                        onClick={ this.addTask }>
              <ControlPoint />
            </IconButton>
          </div>
          <Link className='link' to='/dashboard'>
            <RaisedButton label='Finalize' 
                          style={ styles.buttonStyle } 
                          onClick={ this.sendScavengerHunt }/>
          </Link>
        </div>
      </div>
     </div>
    );
  }
};
