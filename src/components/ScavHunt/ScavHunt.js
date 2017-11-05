import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ScavHuntList from '../ScavHuntList/ScavHuntList';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import styles from './ScavHuntMuiStyles';

export default class ScavHunt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hunt_id: props.hunt.hunt_id
    }
  }

  beginScavHunt() {
    ;
  }

  // reverse task list when passing to ScavHuntList
  render() {
    return(
      <Card className='scav-hunt-summary'>
        <CardHeader
          title={this.props.hunt.title + ` ${this.state.hunt_id}`}
          subtitle={this.props.recipients}
          actasExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <ScavHuntList tasks={ this.props.hunt.tasks.reverse() }/>
          <Link className='link' to='/editor'>
            <RaisedButton label='Edit'
                          style={ styles.buttonStyle }/>
          </Link>
          <RaisedButton label='Send'
                        style={ styles.buttonStyle }/>
        </CardText>
      </Card>
    )
  }
}