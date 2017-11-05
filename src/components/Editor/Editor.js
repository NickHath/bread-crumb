import React, { Component } from 'react';
import ChipInput from 'material-ui-chip-input';
import axios from 'axios';

// material ui
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import styles from './EditorMuiStyles';

// redux 
import { connect } from 'react-redux';

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      huntName: '',
      recipients: [],
      tasks: []
    }
  }
  
  componentWillMount() {
    axios.get(`/scav/hunt/${this.props.currentHunt}`)
         .then(res => this.setState({ huntName: res.data[0].title })); 
    axios.get(`/recipients/${this.props.currentHunt}`)
         .then(res => this.setState({ recipients: res.data }));
    axios.get(`/tasks/${this.props.currentHunt}`)
         .then(res => this.setState({ tasks: res.data }));
  }

  handleChange(chips) {
    this.setState({ recipients: chips });
  }

  saveChanges() {
    console.log(this.refs);    
  }

  render() {
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
              <ChipInput defaultValue={this.state.recipients}
                         onChange={(chips) => this.handleChange(chips)}/>
              </div>
            </div>
            { tasks }
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
    currentHunt: state.currentHunt
  }
}

export default connect(mapStateToProps)(Editor);
