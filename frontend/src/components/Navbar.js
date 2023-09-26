import React from 'react';
import "./Navbar.css";
import SearchIcon from '@material-ui/icons/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Avatar } from '@material-ui/core';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <div>
      <header>
    <nav>
          <div className='left'>
                <div className='navlogo'>
                <NavLink to ="/">  <img src="./logo192.png" alt=''/> </NavLink>
                </div>
                <div className='nav_searchbaar'>
                   <input type='text' name='' id=''/>
                   <div className='search_icon'>
                      <SearchIcon id="search"/>
                   </div>
                </div>

         
          </div>
          
           <div className='right'>
              <div className='nav_btn'>
                <NavLink to ="/login">LOGIN</NavLink>
              </div>
              <div className='cart_btn'>
                <Badge badgeContent={4} color="primary">
                  <ShoppingCartIcon id ="icon"/>
                </Badge>
                <p>CART</p>
              </div>
             <Avatar className='avtar'/>
             <Badge badgeContent={4} color="primary">
                  <NotificationsNoneIcon id ="icon"/>
                </Badge>
           </div>
    </nav>
   </header>
     
    </div>
  );
}

export default Navbar;
