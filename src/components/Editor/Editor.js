import React from 'react';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHunt: props.currentHunt
    }
  }

  render() {
    return(
      <div>Editor Component</div>      
    )
  }
}
