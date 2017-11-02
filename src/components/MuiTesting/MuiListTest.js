import React, { Component } from 'react';
import MobileTearSheet from './MobileTearSheet/MobileTearSheet';
import { List, ListItem } from 'material-ui/List';

export default class MuiListTest extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    }
  }

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  }

  handleNestedListToggle = (item) => {
    this.setState({ open: item.state.open });
  }

  render() {
    return (
      <div>
        <MobileTearSheet>
          <List>
            <ListItem primaryText='Task 1'/>
            <ListItem primaryText='Task 2'/>
            <ListItem primaryText='Task 3'
                      initiallyOpen={ false }
                      primaryTogglesNestedList={ true }
                      nestedItems={
                        [
                          <ListItem key={1} primaryTest='Prompt 1'/>,
                          <ListItem key={2} primaryTest='Hint 1'/>,
                          <ListItem key={3} primaryTest='Answer 1'/>
                        ]
                      }
                      />
          </List>
        </MobileTearSheet>
      </div>
    )
  }
}