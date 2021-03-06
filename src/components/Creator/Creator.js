import React, { Component } from 'react';
import axios from 'axios';
import phone from 'phone';
import ChipInput from 'material-ui-chip-input';

// Material UI and styling
import styles from './CreatorMuiStyles';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ControlPoint from 'material-ui-icons/ControlPoint';
import DeleteForever from 'material-ui-icons/DeleteForever';
import redDeleteIcon from '../../assets/delete_red_500.png';
import blackDeleteIcon from '../../assets/delete_black.png';

// // redux
import { connect } from 'react-redux';
import { getAllHunts } from '../../ducks/reducer';

class Creator extends Component{
  constructor() {
    super();
    this.state = {
      recipients: [],
      tasks: [true],
      hunt_id: window.location.pathname.split('/')[2]
    }
    this.sendScavengerHunt = this.sendScavengerHunt.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  addTask() {
    this.setState({ tasks: [...this.state.tasks, true] })
  }

  handleRequestDelete() {
    console.log('Someone is tring to delete me!');
  }

  handleChange(chips) {
    chips = chips.map(phoneNumber => {
      let parsedNumber = phone(phoneNumber);
      return parsedNumber.length === 0 ? '' : parsedNumber[0];
    })
    this.setState({ recipients: chips });
  }

  handleFocusOut(number) {
    number = phone(number);
    number = number.length === 0 ? '' : number[0];
    if (this.state.recipients.length === 0) {
      this.setState({ recipients: [...this.state.recipients, number] })      
    }
  }

  // stores recipients and tasks (which are associated to a hunt_id)
  sendScavengerHunt() {
    // send recipients as an array of objects
    let recipients = [], tasks = [];
    this.state.recipients.forEach(recipient => {
      recipients.push({ 
        first_name: '', 
        last_name: '', 
        phone: recipient, 
        hunt_id: this.state.hunt_id
      })
    })
    
    // send tasks as an array of objects
    for (let i = 0; i < this.state.tasks.length; i++) {
      // if there is no ref for this index, skip!
      if (!this.state.tasks[i]) {
        continue;
      }

      let currentTask = `prompt${i}`, currentHint = `hint${i}`, currentAnswer = `answer${i}`;
      let task = {
        task: this.refs[currentTask].input.value,
        hint: this.refs[currentHint].input.value,
        answer: this.refs[currentAnswer].input.value,
        hunt_id: this.state.hunt_id,
        task_order: i
      }
      tasks.push(task);
    }
    axios.post('/recipient/create', recipients)
    axios.post('/task/create', tasks)
         .then(() => window.location = '/dashboard')
  }

  deleteTask(e) {
    console.log('deleting:\n', e.target)
    let newTasks = this.state.tasks;
    newTasks[e.target.id] = false;
    this.setState({ tasks: newTasks })
  }

  render() {
    console.log('CREATOR:\n', this.refs);    
    console.log(this.state);
    let allTasks = [], taskNum = 1;
    for (let i = 0; i < this.state.tasks.length; i++) {
      if (this.state.tasks[i]) {
        allTasks.push(
          <div key={i} className='creator-task'>
            <div className='task-header'>
              <h2>Task #{taskNum}</h2>              
              <img className='delete' 
                   src={redDeleteIcon} 
                   id={i} 
                   onClick={e => this.deleteTask(e)}/>
            </div>
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
        taskNum++;
      }      
    }

    return(
      <div className='creator-wrapper'>
      <div className='creator'>
        <div className='container creator-contents'>
          <h1 className='creator-heading'>New Scavenger Hunt</h1>
          <h2>Recipients:</h2>              
          <div className='recipients' style={ styles.wrapper }>
            <ChipInput defaultValue={this.state.recipients}
                       onChange={(chips) => this.handleChange(chips)}
                       underlineFocusStyle={styles.taskFocusStyle}
                       clearOnBlur={false}
                       onBlur={(e) => this.handleFocusOut(e.target.value)}
                       placeholder='(555) 555 5555'/>
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
          <RaisedButton label='Finalize' 
                        style={ styles.buttonStyle } 
                        onClick={ this.sendScavengerHunt }/>
        </div>
      </div>
     </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    hunts: state.hunts
  }
}

export default connect(mapStateToProps, { getAllHunts })(Creator);
