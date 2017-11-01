import React, { Component } from 'react';

// Material UI
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
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
  }
};

export default class Creator extends Component{
  handleRequestDelete() {
    console.log('Someone is tring to delete me!');
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
            <TextField className='prompt' placeholder='Task Description' underlineFocusStyle={styles.taskFocusStyle}/>
            <TextField className='hint' placeholder='Hint' underlineFocusStyle={styles.hintFocusStyle}/>
            <TextField className='answers' placeholder='Accepted Answers' underlineFocusStyle={styles.answerFocusStyle}/>
          </div>
          <div className='creator-task'>
            <h2>Task #1</h2>
            <TextField className='prompt' placeholder='Bring the One Ring to Mordor' underlineFocusStyle={styles.taskFocusStyle}/>
            <TextField className='hint' placeholder='Try resisting its influence' underlineFocusStyle={styles.hintFocusStyle}/>
            <TextField className='answers' placeholder='We did it!' underlineFocusStyle={styles.answerFocusStyle}/>
          </div>
          <div className='creator-task'>
            <h2>Task #2</h2>
            <TextField className='prompt' placeholder='Enlist the help of Gandalf the Grey' underlineFocusStyle={styles.taskFocusStyle}/>
            <TextField className='hint' placeholder='Do not insult his punctuality' underlineFocusStyle={styles.hintFocusStyle}/>
            <TextField className='answers' placeholder='Gandalf the White is OP' underlineFocusStyle={styles.answerFocusStyle}/>
          </div>
          <div className='creator-task'>
            <h2>Task #3</h2>
            <TextField placeholder='Find some trustworthy adventurers' underlineFocusStyle={styles.taskFocusStyle}/>
            <TextField placeholder='Check out the Council of Elrond' underlineFocusStyle={styles.hintFocusStyle}/>
            <TextField placeholder='They lent me their bows and axes!' underlineFocusStyle={styles.answerFocusStyle}/>
          </div>
        </div>
      </div>
     </div>
    );
  }
};
