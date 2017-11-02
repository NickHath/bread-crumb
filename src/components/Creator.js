import React, { Component } from 'react';
import axios from 'axios';

// Material UI
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import { amber500, red500, green500 } from 'material-ui/styles/colors';

const styles = {
  chip: {
    margin: 5,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  taskFocusStyle: {
    borderColor: amber500
  },
  hintFocusStyle: {
    borderColor: red500
  },
  answerFocusStyle: {
    borderColor: green500
  },
  buttonStyle: {
    margin: 12
  }
};

export default class Creator extends Component{
  constructor() {
    super();
    this.state = {
      recipients: ['+1234567890', '+1234567890'],
      numTasks: 4
    }
    this.sendScavengerHunt = this.sendScavengerHunt.bind(this);
  }

  handleRequestDelete() {
    console.log('Someone is tring to delete me!');
  }

  // stores recipients and tasks (which are associated to a hunt_id)
  sendScavengerHunt() {
    // SEND ARRAY OF RECIPIENTS, ONE AT A TIME
    // console.log(this.refs.answer1.input.value);
    // test with boilerplate
    // this.state.recipients.forEach(recipient => {
    //   axios.post('http://localhost:4200/recipient/create', 
    //   { 
    //     first_name: '', 
    //     last_name: '', 
    //     phone: recipient, 
    //     hunt_id: 3 
    //   });
    // })
    
    // hardcoded hunt_id 3
    for (let i = 1; i <= this.state.numTasks; i++) {
      let currentTask = `prompt${i}`, currentHint = `hint${i}`, currentAnswer = `answer${i}`;
      let task = {
        task: this.refs[currentTask].input.value,
        hint: this.refs[currentHint].input.value,
        answer: this.refs[currentAnswer].input.value,
        hunt_id: 3
      }
      console.log(task);
      // axios.post('http://localhost:4200/task/create', task);
    }
  }

  render() {
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
          <div className='creator-task'>
            <h2>Task #1</h2>
            <TextField className='prompt' 
                       placeholder='Task Description' 
                       underlineFocusStyle={styles.taskFocusStyle}
                       ref='prompt1'/>
            <TextField className='hint' 
                       placeholder='Hint' 
                       underlineFocusStyle={styles.hintFocusStyle}
                       ref='hint1'/>
            <TextField className='answers' 
                       placeholder='Accepted Answers' 
                       underlineFocusStyle={styles.answerFocusStyle}
                       ref='answer1'/>
          </div>
          <div className='creator-task'>
            <h2>Task #2</h2>
            <TextField className='prompt' 
                       placeholder='Bring the One Ring to Mordor' 
                       underlineFocusStyle={styles.taskFocusStyle}
                       ref='prompt2'/>
            <TextField className='hint' 
                       placeholder='Try resisting its influence' 
                       underlineFocusStyle={styles.hintFocusStyle}
                       ref='hint2'/>
            <TextField className='answers' 
                       placeholder='We did it!' 
                       underlineFocusStyle={styles.answerFocusStyle}
                       ref='answer2'/>
          </div>
          <div className='creator-task'>
            <h2>Task #3</h2>
            <TextField className='prompt' 
                       placeholder='Enlist the help of Gandalf the Grey' 
                       underlineFocusStyle={styles.taskFocusStyle}
                       ref='prompt3'/>
            <TextField className='hint' 
                       placeholder='Do not insult his punctuality' 
                       underlineFocusStyle={styles.hintFocusStyle}
                       ref='hint3'/>
            <TextField className='answers' 
                       placeholder='Gandalf the White is OP' 
                       underlineFocusStyle={styles.answerFocusStyle}
                       ref='answer3'/>
          </div>
          <div className='creator-task'>
            <h2>Task #4</h2>
            <TextField 
                       placeholder='Find some trustworthy adventurers' 
                       underlineFocusStyle={styles.taskFocusStyle}
                       ref='prompt4'/>
            <TextField 
                       placeholder='Check out the Council of Elrond' 
                       underlineFocusStyle={styles.hintFocusStyle}
                       ref='hint4'/>
            <TextField 
                       placeholder='They lent me their bows and axes!' 
                       underlineFocusStyle={styles.answerFocusStyle}
                       ref='answer4'/>
          </div>
          <RaisedButton label='Finalize' style={ styles.buttonStyle } onClick={ this.sendScavengerHunt }></RaisedButton>
        </div>
      </div>
     </div>
    );
  }
};
