import React, { Component } from 'react';
import './Dashboard.css'

export default class Dashboard extends Component {
  render() {
    return(
    <div className='dashboard'>
      <div className='dashboard-contents'>
        <div className='header'>
          <h1>Bread Crumb</h1>        
          <p>Start your journey. Create and manage scavenger hunts in the dashboard.</p>
        </div>
        <div className='container scav-hunts'>
          <p>SCAV</p>
        </div>
        <div className='container new-scav-hunt'>
          <input placeholder='create new scav hunt'/>
        </div>
      </div>
    </div>
    );
  }
}