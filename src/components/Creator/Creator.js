import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ChipInput from 'material-ui-chip-input';

// Material UI
import styles from './CreatorMuiStyles';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ControlPoint from 'material-ui-icons/ControlPoint';

// redux
import { connect } from 'react-redux';

class Creator extends Component{
  constructor() {
    super();
    this.state = {
      recipients: [],
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

  handleChange(chips) {
    this.setState({ recipients: chips });
  }

  // stores recipients and tasks (which are associated to a hunt_id)
  sendScavengerHunt() {
    // send recipients one at a time
    this.state.recipients.forEach(recipient => {
      axios.post('/recipient/create', 
      { 
        first_name: '', 
        last_name: '', 
        phone: recipient, 
        hunt_id: this.props.currentHunt 
      });
    })
    
    // send hunts one at a time
    for (let i = 1; i <= this.state.numTasks; i++) {
      let currentTask = `prompt${i}`, currentHint = `hint${i}`, currentAnswer = `answer${i}`;
      let task = {
        task: this.refs[currentTask].input.value,
        hint: this.refs[currentHint].input.value,
        answer: this.refs[currentAnswer].input.value,
        hunt_id: this.props.currentHunt,
        task_order: i
      }
      axios.post('/task/create', task);
    }
  }

  render() {
    console.log(this.props);
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
            <ChipInput defaultValue={this.state.recipients}
                       onChange={(chips) => this.handleChange(chips)}/>
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

function mapStateToProps(state) {
  return {
    currentHunt: state.currentHunt
  }
}

export default connect(mapStateToProps)(Creator);