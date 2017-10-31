import React from 'react';
import { Link } from 'react-router-dom'
import './NavBar.css';

const NavBar = () => (
  <div className='nav'>
    <div className='logo'>
      <Link className='link' to='/dashboard'><p>Home</p></Link>
    </div>
    <div className='nav-content'>
      <Link className='link' to='/settings'><p>Settings</p></Link>
      <Link className='link' to='#'><p>Sign Out</p></Link>
    </div>
  </div>
)

export default NavBar;