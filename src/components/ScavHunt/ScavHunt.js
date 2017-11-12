import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TaskList from '../TaskList/TaskList';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import checkMark from '../../assets/checkmark.jpg';
import styles from './ScavHuntMuiStyles';

// redux
import { connect } from 'react-redux';
import { getAllHunts } from '../../ducks/reducer';

class ScavHunt extends Component {

  // state for dialog box
  constructor() {
    super();
    this.state = {
      open: false,
      buttonPressed: ''
    }
  }

  beginScavHunt() {
    this.props.recipients.map(recipient => {
      let updateTask = { phone: recipient, next_task: '0' };
      axios.post('/send', { 
        to: recipient, 
        body: this.props.hunt.tasks[0].task, 
        hunt_id: this.props.hunt.hunt_id 
      })
    });
    this.setState({ open: false });    
  }

  deleteScavHunt() {
    axios.delete(`/tasks/delete/${this.props.hunt.hunt_id}`)
         .then(() => {
            axios.delete(`/recipients/delete/${this.props.hunt.hunt_id}`)
                 .then(() => {
                   axios.delete(`/scav/delete/${this.props.hunt.hunt_id}`)
                        .then(() => this.props.getAllHunts())
                })
         })
    this.setState({ open: false });     
  }

  handleOpen(buttonPressed) {
    this.setState({ buttonPressed, open: true });
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleEdit() {
    // edit current scavenger hunt... set ongoing to TRUE
    // axios.put('/scav/edit')
  }

  render() {

    const sendActions = [
      <RaisedButton
        label='Cancel'
        style={styles.buttonStyle}
        onClick={() => this.handleClose()}
      />,
      <RaisedButton
        label='Send'
        style={styles.buttonStyle}
        onClick={() => this.beginScavHunt()}
      />
    ];

    const deleteActions = [
      <RaisedButton
        label='Cancel'
        style={styles.buttonStyle}
        onClick={() => this.handleClose()}
      />,
      <RaisedButton
        label='Delete'
        style={styles.buttonStyle}
        onClick={() => this.deleteScavHunt()}
      />
    ];

    return(
      <Card className='scav-hunt-summary'>
        <CardHeader
          title={this.props.hunt.title}
          subtitle={this.props.textRecipients}
          actasExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <TaskList tasks={ this.props.hunt.tasks }/>
          <Link className='link' to={`/editor/${this.props.hunt.hunt_id}`}>
          <RaisedButton label='Edit'
                        style={ styles.buttonStyle }
                        onClick={() => this.handleEdit()}/>
          </Link>
          <RaisedButton label='Send'
                        style={ {...styles.buttonStyle, ...styles.sendButton } }
                        onClick={() => this.handleOpen('send')}/>
          <RaisedButton label='Delete'
                        style={ styles.buttonStyle }
                        onClick={() => this.handleOpen('delete')}/>
          {
            this.props.progress ? 
              <img className='checkmark' src={ checkMark }/> :
              null
          }
          <Dialog 
            title={`Are you sure you want to ${this.state.buttonPressed} ${this.props.hunt.title}?`}
            actions={this.state.buttonPressed === 'send' ? sendActions : deleteActions}
            modal={true}
            titleStyle={styles.dialogTitle}
            maxWidth='xs'
            open={this.state.open}
          />
        </CardText>
      </Card>
    )
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { getAllHunts })(ScavHunt);