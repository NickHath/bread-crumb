import React, { Component } from 'react';

// Material UI
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import { amber500 } from 'material-ui/styles/colors';

const underlineFocusStyle = {
  borderColor: amber500
}

const styles = {
  chip: {
    margin: 5,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
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
          <h1 className='creator-heading'>Scavenger Hunt Tasks</h1>
          <h2>Recipients:</h2>              
          <div className='recipients' style={ styles.wrapper }>
            <Chip style={ styles.chip } onRequestDelete={this.handleRequestDelete}>+1727654164</Chip>
            <Chip style={ styles.chip } onRequestDelete={this.handleRequestDelete}>+1234567890</Chip>
          </div>
          <div className='creator-task'>
            <h2>Task #1</h2>
            <TextField className='prompt' placeholder='Bring the One Ring to Mordor' underlineFocusStyle={underlineFocusStyle}/>
            <TextField className='hint' placeholder='Try resisting its influence' underlineFocusStyle={underlineFocusStyle}/>
            <TextField className='answers' placeholder='We did it!' underlineFocusStyle={underlineFocusStyle}/>
          </div>
          <div className='creator-task'>
            <h2>Task #2</h2>
            <TextField className='prompt' placeholder='Enlist the help of Gandalf the Grey' underlineFocusStyle={underlineFocusStyle}/>
            <TextField className='hint' placeholder='Do not insult his punctuality' underlineFocusStyle={underlineFocusStyle}/>
            <TextField className='answers' placeholder='Gandalf the White is OP' underlineFocusStyle={underlineFocusStyle}/>
          </div>
          <div className='creator-task'>
            <h2>Task #3</h2>
            <TextField placeholder='Find some trustworthy adventurers' underlineFocusStyle={underlineFocusStyle}/>
            <TextField placeholder='Check out the Council of Elrond' underlineFocusStyle={underlineFocusStyle}/>
            <TextField placeholder='They lent me their bows and axes!' underlineFocusStyle={underlineFocusStyle}/>
          </div>
        </div>
      </div>
     </div>
    );
  }
};
