import React, { Component } from 'react';
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
      tasks: []
    }
  }
  
  componentWillMount() {
    this.props.getAllHunts().then(() => {
      for (let i = 0; i < this.props.hunts.length; i++) {
        let hunt = this.props.hunts[i];
        console.log(window.location.pathname.split('/')[2]);
        if (hunt.hunt_id === 1*window.location.pathname.split('/')[2]) {
          this.setState({
            huntName: hunt.title,
            recipients: hunt.recipients.map(recipient => recipient.phone),
            tasks: hunt.tasks
          })
        }
      }
    });  
    
  }

  handleChange(chips) {
    this.setState({ recipients: chips });
  }

  saveChanges() {
    console.log(this.refs);    
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
              <ChipInput defaultValue={this.state.recipients}
                         onChange={(chips) => this.handleChange(chips)}
                         underlineFocusStyle={styles.taskFocusStyle}/>
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
  console.log(state)
  return {
    currentHunt: state.currentHunt,
    hunts: state.hunts
  }
}

export default connect(mapStateToProps, { getAllHunts })(Editor);
