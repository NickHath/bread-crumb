import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import styles from './ScavHuntListStyle';

export default class MuiListTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      tasks: props.tasks
    }
  }

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  }

  handleNestedListToggle = (item) => {
    this.setState({ open: item.state.open });
  }

  render() {
    let scavHunts = [];
    if (this.state.tasks) {
      scavHunts = this.state.tasks.map((task, index) => (
      <ListItem primaryText={`${index + 1}:\t${task.task}`}
                hoverColor={styles.mainColor}
                initiallyOpen={ false }
                primaryTogglesNestedList={ true }
                nestedItems={
                      [
                        <ListItem key={2} primaryText={`Hint: ${task.hint}`} hoverColor={styles.hintColor}/>,
                        <ListItem key={3} primaryText={`Answer: ${task.answer}`} hoverColor={styles.answerColor}/>
                      ]
                    }
                />

      ))
    } 

    return (
      <div style={ {'width':'100%'} }>
        <List>
          { scavHunts }
        </List>
      </div>
    )
  }
}