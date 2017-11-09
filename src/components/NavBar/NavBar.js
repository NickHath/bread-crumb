import React from 'react';
import { Link } from 'react-router-dom'

const NavBar = () => (
  <div className='nav'>
    <div className='logo'>
      <Link className='link' to='/dashboard'><p>Home</p></Link>
    </div>
    <div className='nav-content'>
      <div className='nav-link'>
        <Link className='link' to='/settings'><p>Settings</p></Link>
      </div>
      <div className='nav-link'>      
        <a className='link' href={ process.env.REACT_APP_LOGOUT }><p>Sign Out</p></a>
      </div>
    </div>
  </div>
)

export default NavBar;