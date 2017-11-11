import React, { Component } from 'react';
import ChipInput from 'material-ui-chip-input';
import axios from 'axios';
import phone from 'phone';

// material ui
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ControlPoint from 'material-ui-icons/ControlPoint';
import redDeleteIcon from '../../assets/delete_red_500.png';
import styles from './EditorMuiStyles';

// redux 
import { connect } from 'react-redux';
import { getAllHunts } from '../../ducks/reducer';

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      huntName: '',
      recipients: [],
      recipientPhoneNumbers: [],
      deletedNumbers: [],
      tasks: []
    }
    this.deleteTask = this.deleteTask.bind(this);
  }
  
  componentWillMount() {
    this.props.getAllHunts().then(() => {
      for (let i = 0; i < this.props.hunts.length; i++) {
        let hunt = this.props.hunts[i];
        if (hunt.hunt_id === 1*window.location.pathname.split('/')[2]) {
          this.setState({
            hunt_id: 1 * window.location.pathname.split('/')[2],
            huntName: hunt.title,
            recipients: hunt.recipients,
            recipientPhoneNumbers: hunt.recipients.map(recipient => recipient.phone),
            tasks: hunt.tasks
          })
        }
      }
    });  
    
  }

  handleAddChip(chip) {
    chip = phone(chip);
    if (chip.length > 0) {
      this.setState({ recipientPhoneNumbers: [...this.state.recipientPhoneNumbers, chip[0]] })      
    }
  }
  
  handleDeleteChip(chip, index) {
    let newNumbers = [...this.state.recipientPhoneNumbers];
    let deletedNumber = newNumbers.splice(index, 1)[0];
    this.setState({
      recipientPhoneNumbers: newNumbers, 
      deletedNumbers: [...this.state.deletedNumbers, deletedNumber]
    });
  }

  addTask() {
    this.setState({
      tasks: [
        ...this.state.tasks, 
        { task: '', hint: '', answer: '', hunt_id: this.state.hunt_id }
      ]
    })
  }

  deleteTask(e) {
    // splice an index from this.state.tasks
    // and delete the task by task_id from database
    console.log('INDEX OF TASK I WANT TO DELETE:\n', e.target.id);    
    let task_id = this.state.tasks[e.target.id].task_id;
    let updatedTasks = [...this.state.tasks];
    updatedTasks.splice(e.target.id, 1, false);

    task_id ? axios.delete(`/task/delete/${task_id}`) : null;
    this.setState({ tasks: updatedTasks })
  }

  saveChanges() {
    // create recipients
    let newRecipients = [];
    let existingRecipients = this.state.recipients.map(recipient => recipient.phone);   

    for (let i = 0; i < this.state.recipientPhoneNumbers.length; i++) {
      let currNum = this.state.recipientPhoneNumbers[i];
      console.log(existingRecipients, currNum);
      console.log('TEST:\n', existingRecipients.includes(currNum));
      if (!existingRecipients.includes(currNum)) {
        newRecipients.push({ hunt_id: this.state.hunt_id, phone: currNum })        
      }
    }
    axios.post('/recipient/create', newRecipients);

    // create & update tasks
    let putTasks = [], postTasks = [], newTasks = []; 
    // let numTasks = Object.keys(this.refs).length / 3;
    for (let i = 0; i < this.state.tasks.length; i++) {
      if (!this.state.tasks[i]) { continue }
      let currentTask = `prompt${i}`, currentHint = `hint${i}`, currentAnswer = `answer${i}`;  
      newTasks = this.state.tasks[i].task_id ? putTasks : postTasks;
      newTasks.push({
        task_id: this.state.tasks[i].task_id,
        task: this.refs[currentTask].input.value,
        hint: this.refs[currentHint].input.value,
        answer: this.refs[currentAnswer].input.value,
        hunt_id: this.state.hunt_id,
        task_order: i
      })        
    }
    
    // delete recipients
    const { deletedNumbers } = this.state;
    for (let i = 0; i < deletedNumbers.length; i++) {
      let recipients = this.state.recipients;
      for (let j = 0; j < recipients.length; j++) {
        if (deletedNumbers[i] === recipients[j].phone) {
          console.log('recipient_id:\n', recipients[j].recipient_id);
          axios.delete(`/recipient/delete/${recipients[j].recipient_id}`);
        }
      }
    }

    // might cause dashboard to not render data immediately
    console.log('TASKS WE\'RE ADDING', postTasks);
    console.log('TASKS WE\'RE UPDATING', putTasks);
    axios.post(`/task/create`, postTasks)
    axios.put('/task/edit', putTasks)
         .then(() => window.location='/dashboard')
  }

  render() {
    console.log('EDITOR:\n', this.state);
    console.log('EDITOR REFS:\n', this.refs);
    let taskNum = 0;
    const tasks = this.state.tasks.map((task, i) => {
      if (!this.state.tasks[i]) { return }
      taskNum++;
      return(
        <div className='editor-input' key={i}>
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
                     ref={`prompt${i}`}
                     defaultValue={task.task}/>
          <TextField className='hint' 
                     placeholder='Hint' 
                     underlineFocusStyle={styles.hintFocusStyle}
                     ref={`hint${i}`}
                     defaultValue={task.hint}/>
          <TextField className='answers' 
                     placeholder='Accepted Answers' 
                     underlineFocusStyle={styles.answerFocusStyle}
                     ref={`answer${i}`}
                     defaultValue={task.answer}/>
      </div>
      );
    })
    return(
      <div className='editor-wrapper'>
        <div className='editor'>
          <div className='container editor-contents'>
            <h1>Editor</h1>
            <div className='editor-input'>
              <h2>Recipients</h2>
              <div className='recipients' style={ styles.wrapper }>
              <ChipInput value={this.state.recipientPhoneNumbers}
                         onRequestAdd={(chip) => this.handleAddChip(chip)}
                         onRequestDelete={(chip, index) => this.handleDeleteChip(chip, index)}
                         placeholder='(555) 555 5555'
                         underlineFocusStyle={styles.taskFocusStyle}/>
              </div>
            </div>
            { tasks }
            <div className='new-task'>
              <h2>Add New Task</h2>            
              <IconButton iconStyle={ styles.iconStyle } 
                          style={ styles.iconWrapper }
                          onClick={ () => this.addTask() }>
                <ControlPoint />
              </IconButton>
            </div>
            <RaisedButton label='Save Changes' 
                          style={styles.buttonStyle}
                          onClick={() => this.saveChanges()}/>
          </div>
        </div>
      </div>      
    )
  }
}

function mapStateToProps(state) {
  return {
    hunts: state.hunts
  }
}

export default connect(mapStateToProps, { getAllHunts })(Editor);
