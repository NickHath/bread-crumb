import React from 'react';
import { Link } from 'react-router-dom'

const NavBar = () => (
  <div className='nav'>
    <div className='logo'>
      <Link className='link' to='/dashboard'><p>Home</p></Link>
    </div>
    <div className='nav-content'>
      <Link className='link' to='/settings'><p>Settings</p></Link>
      <a className='link' href='http://localhost:4200/logout'><p>Sign Out</p></a>
    </div>
  </div>
)

export default NavBar;