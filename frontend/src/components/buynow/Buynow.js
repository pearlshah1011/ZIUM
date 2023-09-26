import React from 'react';
import "./buynow.css"
import { Divider } from '@material-ui/core';
import Option from './Option';
import Right from './Right';
const Buynow = () => {
  return (
    <div className='buynow_section'>
      <div className='buynow_container'>
        <div className='left_buy'>
            <h1>Shopping Cart</h1>
            <p>Select all items</p>
            <span className='leftbuyprice'>Price</span>
            <Divider/>
            <div className='item_containert'>
             {/* img */}
             <div className='item_details'>
                <h3>Item title</h3>
                <h3>Section</h3>
                <h3 className='diffrentprice'>Some price</h3>
                <p>FREE shipping</p>
                <Option/>
             </div>
             <h3 className='item_price'>1049</h3>
          

            </div>
            <Divider/>
        </div>
       < Right/>
      </div>
    </div>
  );
}

export default Buynow;
