import React, { Component } from 'react';

// material ui
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './EditorMuiStyles';

class Editor extends Component {

  render() {
    return(
      <div className='editor-wrapper'>
        <div className='editor'>
          <div className='container editor-contents'>
            <h1>Editor</h1>
            <div className='editor-input'>
              <h2>Recipients</h2>
              <TextField underlineFocusStyle={styles.underlineFocusStyle}
                         ref='first'/>
            </div>
            <div className='editor-input'>
              <h2>Task #1</h2>
              <TextField underlineFocusStyle={styles.underlineFocusStyle}
                         ref='last'/>
            </div>
            <div className='editor-input'>
              <h2>Task #2</h2>
              <TextField underlineFocusStyle={styles.underlineFocusStyle}
                         ref='last'/>
            </div>
          </div>
        </div>
      </div>      
    )
  }
}

export default Editor;
