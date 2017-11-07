import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TaskList from '../TaskList/TaskList';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import styles from './ScavHuntMuiStyles';

// redux
import { connect } from 'react-redux';
import { updateCurrHunt, getAllHunts } from '../../ducks/reducer';

class ScavHunt extends Component {
  beginScavHunt() {
    this.props.recipients.map(recipient => {
      let updateTask = { phone: recipient, next_task: '0' };
      axios.post(`/recipient/updatetask/${this.props.hunt.hunt_id}`, updateTask)
           .then(() => {axios.post('/send', { to: recipient, body: this.props.hunt.tasks[0].task })});
    })
  }

  editHunt() {
    this.props.updateCurrHunt(this.props.hunt.hunt_id);
  }

  deleteScavHunt() {
    axios.delete(`/task/delete/${this.props.hunt.hunt_id}`)
         .then(() => {
            axios.delete(`/recipient/delete/${this.props.hunt.hunt_id}`)
                 .then(() => {
                   axios.delete(`/scav/delete/${this.props.hunt.hunt_id}`)
                        .then(() => this.props.getAllHunts())
                })
         })
  }

  render() {
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
          <Link className='link' to='/editor'>
            <RaisedButton label='Edit'
                          style={ styles.buttonStyle }
                          onClick={ () => this.editHunt() }/>
          </Link>
          <RaisedButton label='Send'
                        style={ {...styles.buttonStyle, ...styles.sendButton } }
                        onClick={() => this.beginScavHunt()}/>
          <RaisedButton label='Delete'
                        style={ styles.buttonStyle }
                        onClick={() => this.deleteScavHunt()}/>
        </CardText>
      </Card>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentHunt: state.currentHunt
  }
}

export default connect(mapStateToProps, { updateCurrHunt, getAllHunts })(ScavHunt);