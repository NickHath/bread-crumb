import React from 'react';
import './Creator.css';
import NavBar from '../NavBar/NavBar';

// Material UI
import TextField from 'material-ui/TextField';
import {amber500} from 'material-ui/styles/colors';

const underlineFocusStyle = {
  borderColor: amber500
}

const Creator = () => (
  <div className='creator-wrapper'>
    <NavBar />    
    <div className='creator'>
      <div className='creator-contents'>
        <h1 className='creator-heading'>Scavenger Hunt Tasks</h1>
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

export default Creator;