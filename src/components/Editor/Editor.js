import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import axios from 'axios';

// material ui
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
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
    this.setState({ recipientPhoneNumbers: [...this.state.recipientPhoneNumbers, chip] })
  }
  
  handleDeleteChip(chip, index) {
    let newNumbers = [...this.state.recipientPhoneNumbers];
    let deletedNumber = newNumbers.splice(index, 1)[0];
    this.setState({
      recipientPhoneNumbers: newNumbers, 
      deletedNumbers: [...this.state.deletedNumbers, deletedNumber]
    });
  }

  saveChanges() {
    let newTasks = []; 
    let numTasks = Object.keys(this.refs).length / 3;
    for (let i = 0; i < numTasks; i++) {
      let currentTask = `prompt${i}`, currentHint = `hint${i}`, currentAnswer = `answer${i}`;      
      newTasks.push({
        task_id: this.state.tasks[i].task_id,
        task: this.refs[currentTask].input.value,
        hint: this.refs[currentHint].input.value,
        answer: this.refs[currentAnswer].input.value,
        task_order: i
      })
    }
    axios.put('/task/edit', newTasks);
  }

  render() {
    console.log('EDITOR:\n', this.state);
    const tasks = this.state.tasks.map((task, i) => {
      return(
        <div className='editor-input' key={i}>
          <h2>Task #{i + 1}</h2>
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
                         /* {onChange={(chips) => this.handleChange(chips)}} */
                         underlineFocusStyle={styles.taskFocusStyle}/>
              </div>
            </div>
            { tasks }
            <Link className='link' to='/dashboard'>
              <RaisedButton label='Save Changes' 
                            style={styles.buttonStyle}
                            onClick={() => this.saveChanges()}/>
            </Link>
          </div>
        </div>
      </div>      
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    hunts: state.hunts
  }
}

export default connect(mapStateToProps, { getAllHunts })(Editor);
