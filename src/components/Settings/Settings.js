import React from 'react';
import './Settings.css';
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';

const Settings = () => (
  <div className='settings-wrapper'>
    <NavBar />
    <div className='settings'>
      <div className='settings-contents'>
        <h1>Settings</h1>
      </div>
    </div>
  </div>
);

export default Settings;