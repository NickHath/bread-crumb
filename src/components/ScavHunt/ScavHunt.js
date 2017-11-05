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
import { updateCurrHunt } from '../../ducks/reducer';

class ScavHunt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hunt_id: props.hunt.hunt_id
    }
  }

  beginScavHunt() {
    this.props.recipients.map(recipient => {
      let updateTask = { phone: recipient, next_task: '0' };
      axios.post(`/recipient/updatetask/${this.state.hunt_id}`, updateTask)
           .then(() => {axios.post('/send', { to: recipient, body: this.props.hunt.tasks[0].task })});
    })
  }

  editHunt() {
    this.props.updateCurrHunt(this.state.hunt_id);
  }

  render() {
    return(
      <Card className='scav-hunt-summary'>
        <CardHeader
          title={this.props.hunt.title + ` ${this.state.hunt_id}`}
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
                        style={ styles.buttonStyle }
                        onClick={() => this.beginScavHunt()}/>
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

export default connect(mapStateToProps, { updateCurrHunt })(ScavHunt);