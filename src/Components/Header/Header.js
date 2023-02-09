import React from 'react'
import  logo  from "../../images/Logo.svg";
import "./Header.css"
const Header = () => {
  let navitem =["order","Order Review","Manage Inventory","Login"];
  return (
    <div className="container">
      <div className='navbar_container'>
          <div className="logo_container">
            <img src={logo} alt="logo" />
          </div>
          <nav className='navbar'>
              <ul>
                  <li className='nav-item '><a href="Order">Order</a></li>
                  <li className='nav-item '><a href="Order-Review">Order Review</a></li>
                  <li className='nav-item '><a href="Manage-Inventory">Manage Inventory</a></li>
                  <li className='nav-item '><a href="Login">Login</a></li>
              </ul>
          </nav>
      </div>
    </div>
  )
}

export default Header