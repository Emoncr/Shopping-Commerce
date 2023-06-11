import React from 'react'
import logo from "../../images/Logo.svg";
import "./Header.css"
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../../App';


const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  return (
    <div className="container_custom">
      <div className='navbar_container'>
        <div className="logo_container">
          <img src={logo} alt="logo" />
        </div>
        <nav className='navbar'>
          <ul>
            <li className='nav-item '><Link to="shop">Shop</Link></li>
            <li className='nav-item '><Link to="order">Order</Link></li>
            <li className='nav-item '><Link to="review">Order Review</Link></li>
            <li className='nav-item '><Link to="inventory">Manage Inventory</Link></li>
            {/* <li className='nav-item '><Link to="login">Login</Link></li> */}

          </ul>
          {
            loggedInUser.email?
            <button className='singout_btn' onClick={() => { setLoggedInUser({}) }} >Log Out</button>
            :
            <Link to="login">
            <button className='singout_btn' onClick={() => { setLoggedInUser({}) }} >LogIn</button>
            </Link>
          }
        </nav>
      </div>
    </div>
  )
}

export default Header