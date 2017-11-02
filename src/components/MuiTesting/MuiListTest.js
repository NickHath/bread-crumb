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
      <div style={ {'width':'20%'} }>
        <List>
          <ListItem primaryText='Task 1' hoverColor='#FFA000'/>
          <ListItem primaryText='Task 2' hoverColor='#FFA000'/>
          <ListItem primaryText='Task 3' 
                    hoverColor='#FFA000'
                    initiallyOpen={ false }
                    primaryTogglesNestedList={ true }
                    nestedItems={
                      [
                        <ListItem key={1} primaryText='Prompt 1' hoverColor='#FFA000'/>,
                        <ListItem key={2} primaryText='Hint 1' hoverColor='#FFA000'/>,
                        <ListItem key={3} primaryText='Answer 1' hoverColor='#FFA000'/>
                      ]
                    }
                    />
        </List>
      </div>
    )
  }
}